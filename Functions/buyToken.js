import constants from '../Config/constants.js';

const buyToken = async (account, tokenContract, gasLimit, gasPrice) => {
  //buyAmount how much are we going to pay for example 0.1 BNB
  const buyAmount = constants.Budget;
  
  //Slippage refers to the difference between the expected price of a trade and the price at which the trade is executed
  const slippage = constants.Slippage;

  //amountOutMin how many token we are going to receive
  let amountOutMin = 0;
  const amountIn = constants.ethers.utils.parseUnits(buyAmount.toString(), "ether");
  if (parseInt(slippage) !== 0) {
    const amounts = await constants.router(account).getAmountsOut(amountIn, [
      constants.BNBCONTRACT,
      tokenContract,
    ]);
    amountOutMin = amounts[1].sub(amounts[1].div(100).mul(`${slippage}`));
  }
  try {
    const tx = await constants.router(
      account
    ).swapExactETHForTokensSupportingFeeOnTransferTokens(
      amountOutMin,
      [constants.BNBCONTRACT, tokenContract],
      account.address,
      Date.now() + 1000 * 60 * 10,
      {
        value: amountIn,
        gasLimit: gasLimit,
        gasPrice: gasPrice, 
      }
    );
    const receipt = await tx.wait();
    if (receipt && receipt.blockNumber && receipt.status === 1) {
      // 0 - failed, 1 - success
      const message = `INFO - Transaction https://bscscan.com/tx/${receipt.transactionHash} mined, status success ${constants.chalk.green('✅')}`;
      console.log(constants.chalk.green(message));
      constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
    } else if (receipt && receipt.blockNumber && receipt.status === 0) {
      const message = `ERROR - Transaction https://bscscan.com/tx/${receipt.transactionHash} mined, status failed ${constants.chalk.red('❌')}`;
      console.log(constants.chalk.red(message));
      constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
    } else {
      const message = `WARNING - Transaction https://bscscan.com/tx/${receipt.transactionHash} not mined ${constants.chalk.yellow('⚠️')}`;
      console.log(constants.chalk.yellow(message));
      constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
    }
  } catch (error) {
    let errorMessage = error.message;
    const errorReasonIndex = errorMessage.indexOf("(reason=");
  
    // Extract error reason if it exists
    if (errorReasonIndex !== -1) {
      errorMessage = errorMessage.substring(errorReasonIndex + 9, errorMessage.indexOf(","));
      errorMessage = `Error reason: ${errorMessage}`;
    } 
  
    const message = `ERROR - Error while buying token: ${errorMessage} ${constants.chalk.red('❌')}`;
    console.error(constants.chalk.red(message));
    constants.fs.appendFileSync('./error_logs/log.txt', `${new Date().toLocaleString()} - ${message}\n`);
  }
  
}

export default buyToken;