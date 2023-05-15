import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi.json'), 'utf-8'));
const swapAbi = JSON.parse(fs.readFileSync(path.join(__dirname, 'swapAbi.json'), 'utf-8'));
import erc20 from './erc20.js';

export { abi, swapAbi, erc20};