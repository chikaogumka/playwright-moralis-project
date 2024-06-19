import http from 'k6/http';
import { check, sleep } from 'k6';

const moralisNodeApiKey = __ENV.MORALIS_NODE_API_KEY;
const moralisWeb3ApiKey = __ENV.MORALIS_WEB3_API_KEY;

const endpointUrl = `https://site1.moralis-nodes.com/eth/${moralisNodeApiKey}`;

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 virtual users over 30 seconds
    { duration: '1m', target: 10 }, // Stay at 10 virtual users for 1 minute
    { duration: '30s', target: 0 }, // Ramp-down to 0 virtual users over 30 seconds
  ],
};

export default function () {
  //Eth_getTransactionByHash endpoint
  const endpoint = endpointUrl;
  const payload1 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_getTransactionByHash",
    "params": [
      "0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3"
    ]
  });

  const params1 = {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
  };

  const res1 = http.post(endpoint, payload1, params1);

  // Check that the response status is 200
  check(res1, {
    'is status 200': (r) => r.status === 200,
  });

  // Check that the response body contains the expected structure
  check(res1, {
    'response has jsonrpc property': (r) => r.json().jsonrpc === '2.0',
    'response has id property': (r) => r.json().id === 1,
    'response has result property': (r) => r.json().hasOwnProperty('result'),
  });

  // Sleep for 1 second between iterations to mimic real users
  sleep(1);

  //Eth_blockNumber endpoint
  const endpoint2 = endpointUrl;
  const payload2 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_blockNumber"
  });

  const params2 = {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
  };

  const res2 = http.post(endpoint2, payload2, params2);

  // Check that the response status is 200
  check(res2, { 'status is 200': (r) => r.status === 200 });

  // Check that the response body contains the expected structure
  const responseBody2 = res2.json();
  check(responseBody2, {
    'has jsonrpc property': (r) => r.jsonrpc === '2.0',
    'has id property': (r) => r.id === 1,
    'has result property': (r) => r.hasOwnProperty('result'),
  });

  // Optional: Log the response for debugging
  console.log(JSON.stringify(responseBody2));

  // Sleep for 1 second between iterations
  sleep(1);

  //Eth_getBlockByNumber endpoint
  const endpoint3 = endpointUrl
  const payload3 = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_getBlockByNumber",
    "params": [
      "latest",
      true
    ]
  });

  const params3 = {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
  };

  const res3 = http.post(endpoint3, payload3, params3);

  // Check that the response status is 200
  check(res3, { 'status is 200': (r) => r.status === 200 });

  // Check that the response body contains the expected structure
  const responseBody3 = res3.json();
  check(responseBody3, {
    'has jsonrpc property': (r) => r.jsonrpc === '2.0',
    'has id property': (r) => r.id === 1,
    'has result property': (r) => r.hasOwnProperty('result'),
  });

  // Optional: Log the response for debugging
  console.log(JSON.stringify(responseBody3));

  // Sleep for 1 second between iterations
  sleep(1);

  //getWalletNFTs endpoint
  const endpoint4 = 'https://deep-index.moralis.io/api/v2.2/0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e/nft?chain=eth&format=decimal&media_items=false';
  const params4 = {
    headers: {
      'accept': 'application/json',
      'X-API-Key': `${moralisWeb3ApiKey}`,
    },
  };

  const res4 = http.get(endpoint4, params4);

  // Check that the response status is 200
  check(res4, { 'status is 200': (r) => r.status === 200 });

  // Check that the response body contains the expected structure
  check(res4, {
    'response is json': (r) => r.headers['Content-Type'] === 'application/json',
  });

  // Optional: Log the response for debugging
  console.log(JSON.stringify(res4.json()));

  // Sleep for 1 second between iterations
  sleep(1);
}
