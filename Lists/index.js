import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blacklist = JSON.parse(fs.readFileSync(path.join(__dirname, 'blacklist.json'), 'utf-8'));
const whitelist = JSON.parse(fs.readFileSync(path.join(__dirname, 'whitelist.json'), 'utf-8'));

export { blacklist, whitelist};