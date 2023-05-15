import dotenv from 'dotenv';
dotenv.config();

import Web3 from "web3";
import { providers, Wallet } from "ethers";
import chalk from 'chalk';
import Winston from "winston";
import fs from 'fs';
import express from "express";
const app = express();
import http from "http";
import ethers from 'ethers';

// List imports
import { blacklist, whitelist } from '../Lists/index.js';

// ABI imports
import { abi, erc20, swapAbi } from '../ABIs/index.js';

// Function imports
import { calculate_gas_price, buyToken, sellToken, router } from '../Functions/index.js';


// Global ENV variables
const PORT = process.env.PORT || 3888;
let wss = process.env.WSS;
const secretKey = process.env.PRIVATE_KEY;
const minValue = process.env.MINVALUE || 2;
const BNBCONTRACT = process.env.BNB_CONTRACT || "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const PANROUTERADDRESS = process.env.PAN_ROUTER_ADDRESS;
const Budget = process.env.BUDGET || 0.01;
const Slippage = process.env.SLIPPAGE || 0;
const gas_percent = process.env.GAS_PERCENT || 10;
const web3 = new Web3(wss);

// Global variables for provider and wallet
const provider = new providers.WebSocketProvider(wss);
const wallet = new Wallet(secretKey, provider);

export default {
    abi,
    app,
    BNBCONTRACT,
    blacklist,
    Budget,
    buyToken,
    calculate_gas_price,
    chalk,
    erc20,
    ethers,
    express,
    fs,
    gas_percent,
    http,
    minValue,
    PANROUTERADDRESS,
    PORT,
    router,
    sellToken,
    Slippage,
    swapAbi,
    wallet,
    web3,
    Web3,
    whitelist,
    Winston,
    wss
}
