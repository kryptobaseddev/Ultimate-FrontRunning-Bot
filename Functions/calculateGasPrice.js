import constants from '../Config/constants.js';

function calculate_gas_price(action, amount) {
    amount = constants.ethers.BigNumber.from(amount.toString());
    let gasPercent = constants.gas_percent;
    if (action === "buy") {
      const gasLimit = amount.add(constants.ethers.BigNumber.from("1000000000"));
      const percent = gasLimit.div(gasPercent);
      return gasLimit.add(percent);
    } else {
      const gasLimit = amount.sub(constants.ethers.BigNumber.from("1000000000"));
      const percent = gasLimit.div(gasPercent);
      return gasLimit.add(percent);
    }
  }

  export default calculate_gas_price;