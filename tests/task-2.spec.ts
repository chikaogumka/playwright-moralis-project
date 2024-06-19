import { test, expect } from '@playwright/test';
import Moralis from 'moralis';
import dotenv from "dotenv";

dotenv.config();

const moralisWeb3ApiKey = {
    moralisWeb3ApiKeyCorrect: process.env.MORALIS_WEB3_API_KEY_CORRECT,
    moralisWeb3ApiWrong: process.env.MORALIS_WEB3_API_KEY_WRONG,
};

test('Test Moralis getWalletNFTs function works as expected', async ({}) => {
  try {
    // Start Moralis with the provided API key
    await Moralis.start({
      apiKey: `${moralisWeb3ApiKey.moralisWeb3ApiKeyCorrect}`
    });

    // Call the getWalletNFTs method
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "mediaItems": false,
      "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e"
    });

    console.log(response.raw);

    // Assertions to verify the response
    expect(response.raw).toHaveProperty('result');
    expect(Array.isArray(response.raw.result)).toBe(true);

    if (response.raw.result.length > 0) {
      expect(response.raw.result[0]).toHaveProperty('token_id');
    }
  } catch (e) {
    console.error(e);
    // Fail the test if there's an error
    expect(e).toBeNull();
  }
});

test('Moralis getWalletNFTs function test fails when error is thrown', async ({}) => {
    try {
      // Start Moralis with the provided API key
      await Moralis.start({
        apiKey: `${moralisWeb3ApiKey.moralisWeb3ApiWrong}`
      });
  
      // Call the getWalletNFTs method
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        "chain": "0x1",
        "format": "decimal",
        "mediaItems": false,
        "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e"
      });
  
      console.log(response.raw);
  
      // Assertions to verify the response
      expect(response.raw).toHaveProperty('result');
      expect(Array.isArray(response.raw.result)).toBe(true);
  
      if (response.raw.result.length > 0) {
        expect(response.raw.result[0]).toHaveProperty('token_id');
      }
    } catch (e) {
      console.error(e);
      // Fail the test if there's an error
      expect(e).toBeNull();
    }
  });
