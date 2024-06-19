# Test Automation for Moralis Endpoints Using Playwright

This project contains automated tests using [Playwright](https://playwright.dev/) and [k6](https://k6.io/docs/) for the following Moralis endpoints:
- [Get Block Number](https://docs.moralis.io/rpc-nodes/reference/eth_blockNumber?jsonrpc=2.0&id=1&method=eth_blockNumber&params=[]&chain=eth&apiKey=YOUR_API_KEY)
- [Get Block By Number](https://docs.moralis.io/rpc-nodes/reference/eth_getBlockByNumber?jsonrpc=2.0&id=1&method=eth_getBlockByNumber&params=[%22latest%22,true]&chain=eth&apiKey=YOUR_API_KEY)
- [Get Transaction By Hash](https://docs.moralis.io/rpc-nodes/reference/eth_getTransactionByHash?jsonrpc=2.0&id=1&method=eth_getTransactionByHash&params=[%220xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3%22]&chain=eth&apiKey=YOUR_API_KEY)
- [Get NFTs by wallet](https://docs.moralis.io/web3-data-api/evm/reference/wallet-api/get-nfts-by-wallet?address=0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e&chain=eth&format=decimal&token_addresses=[]&media_items=false)

## How To Run test project
1. Clone this repository:

   ```bash
   git clone https://github.com/your_username/playwright-moralis-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd playwright-moralis-project
   ```
3. Install all project dependencies:

   ```bash
   $npm install //This installs all Playwright dependencies
   ```
   and
   ```bash
   $brew install k6 //This installs k6 and its dependencies
   ```
5. To run Playwright tests, create a .env file, copy paste the following code and edit file with valid values
    ```
    MORALIS_NODE_API_KEY_CORRECT=
    MORALIS_WEB3_API_KEY_CORRECT=
    MORALIS_NODE_API_KEY_WRONG=
    MORALIS_WEB3_API_KEY_WRONG=
    EMAIL=
    PASSWORD=
    ```
    The values for Moralis keys were gotten after creating an account and signing into [Moralis Admin](https://admin.moralis.io/)

    Then run tests using the below commands:
   ```bash
   $npm run test //This will run all playwright test files
   ```
   or
    ```bash
   $npm run test tast-1.spec.ts //This runs specific playwright test files
   ```
   The test runs with headless mode set to false so the test's interraction with the browser is visible and all test results are displayed in a UI at the end of each test run
6. To run load test with k6, from root folder, run
    ```bash
   $k6 run k6-load-test.js //This will faill all load test which is a negative test case to ensure users use the correct authentication for each end point.
   ``` 
   To run k6 tests with valid authentication, set an environment variable in terminal using your personal moralis endpoint API and and Web3 endpoint keys gotten after creating an account and signing into [Moralis Admin](https://admin.moralis.io/)
   ```bash
   $k6 run k6-load-test.js -e <moralis-node-api-key> -e <moralis-web3-api-key>
   ``` 
## Automated Tests Performed on Endpoints
- Functional Tests
- UI Tests
- API Contract tests
- Load tests
