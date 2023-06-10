import { Contract } from 'ethers'; // Assuming you have ethers in this file

function erc20(account, tokenAddress) {
  return new Contract(
    tokenAddress,
    [
        {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            payable: false,
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              { name: "_spender", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: true,
            inputs: [
              { name: "_owner", type: "address" },
              { name: "_spender", type: "address" }
            ],
            name: "allowance",
            outputs: [{ name: "remaining", type: "uint256" }],
            type: "function",
          },
          
    ],
    account
  );
}

export default erc20;
