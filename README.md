# 🚀 Ultimate FrontRunning Bot

============================

This bot is designed to listen for transactions on PancakeSwap and automatically perform token buying and selling based on predefined conditions. The bot listens to the mempool for any pending transactions and acts upon them. It uses the Ethers.js library to interact with the EVM Blockchain.

## 🎯 Features

-----------

- 💹 Real-time transaction monitoring on PancakeSwap.
- ✅ Whitelisting and blacklisting of tokens.
- 💰 Automated token buying and selling.
- 🔀 Dynamic slippage adjustment for sell orders.
- ⛔ Auto-blacklisting of unsellable tokens.
- 🛠️ Error and exception handling.
- 🔄 Auto-reconnection on WebSocket connection loss.
- 📝 Logging of transaction data and errors for review and debugging.

## 👀 What is FrontRunning?

-----------

FrontRunning is a practice in which a bot makes a transaction based on prior knowledge of pending transactions in the mempool which are waiting to be mined. In essence, the bot 'jumps' the queue by paying a higher gas fee to get its transaction mined first.

## 📂 Project Structure

-----------

- root
  - bot.js
  - .env
  - package.json
  - node_modules/
  - ABIs/
    - swapABI.json
    - abi.json
    - erc20.js
  - Lists/
    - blacklist.json
    - whitelist.json
  - config/
    - constants.js
  - functions/
    - calculateGasPrice.js
    - router.js
    - buyToken.js
    - sellToken.js
  - error_logs/
    - log.txt


## 🛠️ How to Run the Bot

-----------

1. Clone this repository to your local machine.
2. Install Node.js and NPM on your machine.
3. Run `npm install` in the root directory of the bot to install all the required dependencies.
4. Create a `.env` file in the root directory of the bot and configure it based on the provided `.env.example` file. You will need to provide your own environment variables.
5. Obtain a WSS node URL. I used GetBlock.io for my bot running (they provide 40,000 requests/day for free.) You can Sign up with this referral link: [GetBlock](https://account.getblock.io/sign-in?ref=MDFkYzRhOWYtZjVmMC01MGQxLTkyY2ItNThkMWJjZWQxMjY0) or you can use [QuickNode](https://www.quicknode.com?tap_a=67226-09396e&tap_s=3858549-ab57d2&utm_source=affiliate&utm_campaign=generic&utm_content=affiliate_landing_page&utm_medium=generic).

<a href="https://www.quicknode.com?tap_a=111183-6cbd63&tap_s=3858549-ab57d2" target="_BLANK" rel="nofollow"><img src="https://static.tapfiliate.com/625dbbffb97c2953575167.png?a=111183-6cbd63" border="0"></a>

6. Run `node bot.js` to start the bot.

## 📝 .env Configuration

-----------

Here's an example of what your `.env` file should look like:

```
env
PORT=3888
WSS=wss://bsc.getblock.io/<your-key>/mainnet/
PRIVATE_KEY=12345678abcdefg
BNB_CONTRACT=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
PAN_ROUTER_ADDRESS=0x10ED43C718714eb63d5aA57B78B54704E256024E
BUDGET=0.01
MINVALUE=2
SLIPPAGE=11
GAS_PERCENT=10
```

## ⚠️ Disclaimer

-----------

Please note that this bot is provided as-is, and I am not responsible for any losses you may incur while using it. The bot is not foolproof and does not directly detect scam or honeypot tokens. While it does include functionality for a blacklist and whitelist, these measures are not guaranteed to be 100% effective. Please use this bot responsibly and at your own risk.

## 💖 Donations

-----------

If you find this bot useful and would like to support its development, you can send donations to the following address: 

`0xE4d3D0DD2693D978442fd75Dd7176A7551aE282e`

Donations can be made in any of the following cryptocurrencies: ETH, BNB, MATIC, CRO, etc. Any amount is appreciated and will go a long way in helping support the further development of this bot. Thank you in advance for your generosity!

## 📚 Key Components

-----------------

- `bot.js`: The main entry point to the application. It connects to the Ethereum network, listens for transactions, checks token lists, and triggers buying and selling actions.
- `buyToken.js`: Handles the purchasing of tokens on PancakeSwap.
- `sellToken.js`: Manages the selling of tokens on PancakeSwap. If a token cannot be sold after several attempts, it gets automatically added to the blacklist.
- `calculateGasPrice.js`: Calculates the gas price for buying and selling tokens based on the current gas price and the gas percentage set in the .env file.
- `whitelist.json`: Contains a list of tokens that the bot will buy and sell. Currently this is populated manually, but I am working on a way to automate this process.
- `blacklist.json`: Contains a list of tokens that the bot will ignore, this works with the whitelist. If a token is in the whitelist and blacklist, the whitelist takes precedence. If a token is in the blacklist, the bot will ignore it. Auto-blacklisting is also implemented for tokens that cannot be sold after several attempts.

## 📦 Costants Configuration

-----------------

- `constants.js`: Contains all the constants used in the application. These include pulling in the .env variables like the contract addresses, gas price, slippage, and other values.
- `router.js`: Handles the routing through the PancakeSwap Router functions.
- `erc20.js`: Contains the ERC20 ABI for interacting with ERC20 tokens.
- `swapABI.json`: Contains the ABI for interacting with the PancakeSwap Router.
- `abi.json`: Contains the ABI for interacting with the PancakeSwap Factory.

## 🔄 Operation

------------

The bot operates by:

1. Listening for pending transactions from the PancakeSwap Factory.
2. Checking if a transaction's value is higher than a set minimum.
3. Retrieving the token address from the transaction data.
4. Checking if the token is in the whitelist or blacklist. If it's in the whitelist, the bot proceeds with the transaction. If it's in the blacklist, the bot ignores the transaction.
5. If the token passes the checks, the bot calculates the gas price for buying and selling, buys the token, and then sells it.
6. If a token cannot be sold after several attempts, the bot increases the slippage for each try. If all attempts fail, the token is added to the blacklist.

## 🔧 Versioning

-------
We are using for versioning in this program follows the principles of Semantic Versioning (SemVer). Semantic Versioning is a versioning scheme that consists of three numbers separated by dots: MAJOR.MINOR.PATCH.

1. 📦 MAJOR version is incremented when you make incompatible API changes. This means that there are breaking changes that could impact existing functionality and require modifications in the code that uses your program.

2. ⚡️ MINOR version is incremented when you add functionality in a backwards-compatible manner. This means that you introduce new features or enhancements that do not break existing functionality.

3. 🐛 PATCH version is incremented when you make backwards-compatible bug fixes. This means that you address issues or bugs in the program without introducing any new features or breaking changes.

Following this versioning methodology helps provide clarity about the nature of changes in each release and allows users to understand the impact of upgrading to a new version. It also helps ensure compatibility and enables users to make informed decisions when incorporating new versions into their projects.

### 📌 Using Bump

-------

- Using the package bump to handle versioning and releases

- Install bump globally using npm:
```npm install -g @fabiospampinato/bump```

- Run bump to see the available commands:
```bump --help```


## 📝 TODO

------

- Portfolio Tracking 📊: Develop a feature to track the bot's token portfolio, showing Profit and Loss. Implement a database for this functionality.
- Database Schema 🗄️: Develop a schema for a database to manage the bot's portfolio and other necessary aspects to track.
- Improved Error Handling 🐞: Enhance the bot's error handling and console logging for easier debugging and more comprehensive error coverage.
- Deployment Strategy 🚀: Create a strategy for deploying the bot remotely, setting the stage for frontend development.
- Frontend Web App 💻: Develop a frontend web application that can be used to manage the bot remotely via a desktop browser or mobile device.
- Backend API 📡: Develop a backend API to support the frontend web app, allowing users to manage the bot remotely.
- Telegram Integration 📱: Integrate the bot with Telegram to allow users to manage the bot remotely via the Telegram app.
- Discord Integration 🎮: Integrate the bot with Discord to allow users to manage the bot remotely via the Discord app.
- Twitter Integration 🐦: Integrate the bot with Twitter to allow users to manage the bot remotely via the Twitter app.
- Multi-chain Functionality ⛓️: Expand the bot's capability to manage multiple EVM-based networks, moving beyond BSC to other chains like Ethereum, Polygon, etc.
- Performance Optimization ⚡: Monitor the bot's performance and identify areas for optimization to ensure it runs efficiently under different network conditions.
- Security Improvements 🔒: Constantly review and improve the bot's security, ensuring that sensitive information like account details remains secure.
- User Customization 🛠️: Allow users to customize bot settings, such as the minimum transaction value or the list of whitelisted/blacklisted tokens.
- Fix Token Approval issue 🐞: Fix the issue where the bot is approving same token contract over and over.

Remember to keep your Ethereum account and network details secure, as they are sensitive data. Trading involves risks and automated trading can result in a loss of funds, so use this bot responsibly. 🤖
