import { test, expect } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();

const moralisNodeApiKey = { 
  moralisNodeApiKeyCorrect: process.env.MORALIS_NODE_API_KEY_CORRECT,
  moralisNodeApiWrong: process.env.MORALIS_NODE_API_KEY_WRONG,
};

test('Eth_blockNumber endpoint should return valid json data when response is 200', async ({ request }) => {

  const response = await request.post(`/eth/${moralisNodeApiKey.moralisNodeApiKeyCorrect}`, {
    data: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_blockNumber"
    })
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody).toHaveProperty('jsonrpc', '2.0');
  expect(responseBody).toHaveProperty('id', 1);
  expect(responseBody).toHaveProperty('result');
});

test('Eth_getBlockByNumber endpoint should return valid json data when response is 200', async ({ request }) => {

  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
  };

  const response = await request.post(`/eth/${moralisNodeApiKey.moralisNodeApiKeyCorrect}`, {
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "id": 1,
      "method": "eth_getBlockByNumber",
      "params": [
        "latest",
        true
      ]
    })
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody).toHaveProperty('jsonrpc', '2.0');
  expect(responseBody).toHaveProperty('id', 1);
  expect(responseBody).toHaveProperty('result');
  expect(responseBody.result).toHaveProperty('number');
});

test('Test eth_getTransactionByHash endpoint should return valid json data when response is 200', async ({ request }) => {

  const response = await request.post(`/eth/${moralisNodeApiKey.moralisNodeApiKeyCorrect}`, {
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "id": 1,
      "method": "eth_getTransactionByHash",
      "params": [
        "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3"
      ]
    })
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody).toHaveProperty('jsonrpc', '2.0');
  expect(responseBody).toHaveProperty('id', 1);
  expect(responseBody).toHaveProperty('result');
});

test('Eth_blockNumber endpoint should fail to return data with 401 response if authentication is wrong', async ({ request }) => {

  const response = await request.post(`/eth/${moralisNodeApiKey.moralisNodeApiWrong}`, {
    data: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_blockNumber"
    })
  });

  expect(response.status()).toBe(401);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody).toHaveProperty('name', 'UnauthorizedException');
});
