import constants from '../Config/constants.js';

const router = (account, PANROUTERADDRESS) => {
  return new constants.ethers.Contract(
    constants.PANROUTERADDRESS,
    [
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external",
      "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable",
      "function swapExactTokensForETH (uint amountOutMin, address[] calldata path, address to, uint deadline) external",
    ],
    account
  );
}

export default router;
