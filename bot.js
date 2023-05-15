import dotenv from 'dotenv';
dotenv.config();
// Importing libraries
import constants from './Config/constants.js';

process.on("uncaughtException", function (err) {
  console.error(`Uncaught Exception: ${err.message}`);
});


var init = async function () {
    var customWsProvider = new constants.ethers.providers.WebSocketProvider(constants.wss);
    const account = constants.wallet.connect(customWsProvider);
    const iface = new constants.ethers.utils.Interface([
      "function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)",
      "function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)",
      "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin,address[] calldata path,address to,uint deadline)",
    ]);
  
    customWsProvider.on("pending", (tx) => {
    
        try {
            customWsProvider.getTransaction(tx).then(async function (transaction) {
              // now we will only listen for pending transaction on pancakesswap factory
              if (
                transaction &&
                transaction.to === "0x10ED43C718714eb63d5aA57B78B54704E256024E"
              ) {
                const value = constants.web3.utils.fromWei(transaction.value.toString());
                const gasPrice = constants.web3.utils.fromWei(transaction.gasPrice.toString());
                const gasLimit = constants.web3.utils.fromWei(transaction.gasLimit.toString());
                // for example we will be only showing transaction that are higher than 30 bnb
                if (value > constants.minValue) {
                  console.log("value : ", value);
                  console.log("gasPrice : ", gasPrice);
                  console.log("gasLimit : ", gasLimit);
                  //we can print the sender of that transaction
                  console.log("from", transaction.from);
          
                  let result = [];
                  //we will use try and catch to handle the error and decode the data of the function used to swap the token
                  try {
                    result = iface.decodeFunctionData(
                      "swapExactETHForTokens",
                      transaction.data
                    );
                  } catch (error) {
                    try {
                      result = iface.decodeFunctionData(
                        "swapExactETHForTokensSupportingFeeOnTransferTokens",
                        transaction.data
                      );
                    } catch (error) {
                      try {
                        result = iface.decodeFunctionData(
                          "swapETHForExactTokens",
                          transaction.data
                        );
                      } catch (error) {
                        console.log("final err : ", transaction);
                      }
                    }
                  }
                  if (result.length > 0) {
                    let tokenAddress = "";
                    if (result[1].length > 0) {
                      tokenAddress = result[1][1];
                      console.log("tokenAddress", tokenAddress);
          
                      // Check if the token address is in the whitelist
                      if (constants.whitelist.includes(tokenAddress)) {
                        console.log(`Token Address: ${tokenAddress} is in the whitelist, so we will proceed with this transaction.`);
                      } else {
                        // If it's not in the whitelist, then check if it's in the blacklist
                        if (constants.blacklist.includes(tokenAddress)) {
                          console.log(`Token Address: ${tokenAddress} is in the blacklist, so we will ignore this transaction.`);
                          return; // Ignore this transaction and look for the next one
                        }
                      }
                      
                      // Calculate the gas price for buying and selling
                      const buyGasPrice = constants.calculate_gas_price(
                        "buy",
                        transaction.gasPrice
                      );
                      const sellGasPrice = constants.calculate_gas_price(
                        "sell",
                        transaction.gasPrice
                      );
                      // after calculating the gas price we buy the token
                      console.log("going to buy");
                      await constants.buyToken(
                        account,
                        tokenAddress,
                        transaction.gasLimit,
                        buyGasPrice
                      );
                      // after buying the token we sell it
                      console.log("going to sell the token");
                      await constants.sellToken(
                        account,
                        tokenAddress,
                        transaction.gasLimit,
                        sellGasPrice
                      );
                    }
                  }
                }
              }
            });
          } catch (error) {
            if (error.message.includes("TRANSACTION_REPLACED")) {
              console.log(`Transaction ${tx} has been replaced`);
            } else if (
              error.message.includes("INSUFFICIENT_INPUT_AMOUNT") &&
              error.message.includes("CALL_EXCEPTION")
            ) {
              console.log(`Transaction ${tx} failed with INSUFFICIENT_INPUT_AMOUNT`);
      } else {
        console.log(
          `Error occurred while processing transaction ${tx}: ${error.message}`
        );
        return;
      }
    }
});

customWsProvider._websocket.on("error", async (ep) => {
  console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
  setTimeout(init, 3000);
});
customWsProvider._websocket.on("close", async (code) => {
  console.log(`Connection lost with code ${code}! Attempting reconnect in 3s...`);
  customWsProvider._websocket.terminate();
  setTimeout(init, 3000);
});
};


init();
//now we create the express server
const server = constants.http.createServer(constants.app);
// we launch the server
server.listen(constants.PORT, () => {
console.log(`Listening on port ${constants.PORT}`);
});
