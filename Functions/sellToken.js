import constants from '../Config/constants.js';

// Helper function to delay execution
const delay = ms => new Promise(res => setTimeout(res, ms));

const sellToken = async (account, tokenContract, gasLimit, gasPrice, value = 99) => {
  let attempts = 10; // max attempts
  let slippage = constants.Slippage; // starting slippage

  while (attempts > 0) {
    try {
      const contract = new constants.ethers.Contract(constants.PANROUTERADDRESS, constants.abi, account);
      const accountAddress = account.address;
      const tokenBalance = await constants.erc20(account, tokenContract).balanceOf(
        accountAddress
      );
      let amountOutMin = 0;
      const amountIn = tokenBalance.mul(value).div(100);

      const sellTokenContract = new constants.ethers.Contract(
        tokenContract,
        constants.swapAbi,
        account
      );
      const allowance = await sellTokenContract.allowance(account.address, constants.PANROUTERADDRESS);

      // If allowance is less than double the amount we want to sell, approve double the spending
      if (allowance.lt(amountIn.mul(2))) {
        const approve = await sellTokenContract.approve(constants.PANROUTERADDRESS, amountIn.mul(2));
        const receipt_approve = await approve.wait();
        if (
          receipt_approve &&
          receipt_approve.blockNumber &&
          receipt_approve.status === 1
        ) {
          const message = `INFO - Approved https://bscscan.com/tx/${receipt_approve.transactionHash} ${constants.chalk.green('✅')}`;
          console.log(constants.chalk.green(message));
          constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
        }
      }

      const amounts = await constants.router(account).getAmountsOut(amountIn, [
        tokenContract,
        constants.BNBCONTRACT
      ]);

      // increment slippage by 2% for each attempt
      slippage += 2;

      if (parseInt(slippage) !== 0) {
        amountOutMin = amounts[1].sub(amounts[1].mul(slippage.toString()).div(100));
      } else {
        amountOutMin = amounts[1];
      }

      const swap_txn = await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountIn,
        amountOutMin,
        [tokenContract, constants.BNBCONTRACT],
        accountAddress,
        Date.now() + 1000 * 60 * 10,
        {
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        }
      );
      const receipt = await swap_txn.wait();
      if (receipt && receipt.blockNumber && receipt.status === 1) {
        // 0 - failed, 1 - success
        const message = `INFO - Transaction https://bscscan.com/tx/${receipt.transactionHash} mined, status success ${constants.chalk.green('✅')}`;
        console.log(constants.chalk.green(message));
        constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
        // if the sell transaction is successful, break the loop
        break;
      } else if (receipt && receipt.blockNumber && receipt.status === 0) {
        const message = `ERROR - Transaction https://bscscan.com/tx/${receipt.transactionHash} mined, status failed ${constants.chalk.red('❌')}`;
        console.log(constants.chalk.red(message));
        constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
      } else {
        const message = `WARNING - Transaction https://bscscan.com/tx/${receipt.transactionHash} not mined ${constants.chalk.yellow('⚠️')}`;
        console.log(constants.chalk.yellow(message));
        constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
      }
      // decrement the value by 10 each time
      value -= 10;
      attempts--;

      // delay execution for 5 second (5000 milliseconds) between each sell attempt
      await delay(5000);
    } catch (error) {
      let errorMessage = error.message;
      const errorReasonIndex = errorMessage.indexOf("(reason=");
    
      // Extract error reason if it exists
      if (errorReasonIndex !== -1) {
        errorMessage = errorMessage.substring(errorReasonIndex + 9, errorMessage.indexOf(","));
        errorMessage = `Error reason: ${errorMessage}`;
      } 
    
      const message = `ERROR - Error while selling token: ${errorMessage} ${constants.chalk.red('❌')}`;
      console.error(constants.chalk.red(message));
      constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
      attempts--;
    
      // delay execution for 1 second (1000 milliseconds) between each sell attempt
      await delay(1000);
    }
    
  } // closing brace for while loop
  // If all attempts have been made and the token couldn't be sold, add to blacklist
  if (attempts === 0) {
    constants.blacklist.push(tokenContract);
    constants.fs.writeFile('./Lists/blacklist.json', JSON.stringify(constants.blacklist), (err) => {
      if (err) {
        const message = `ERROR - Error while updating blacklist: ${err} ${constants.chalk.red('❌')}`;
        console.error(constants.chalk.red(message));
        constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
      } else {
        const message = `INFO - Token ${tokenContract} added to blacklist after unsuccessful sell attempts ${constants.chalk.green('✅')}`;
        console.log(constants.chalk.green(message));
        constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
      }
    });
  }
}

export default sellToken;
