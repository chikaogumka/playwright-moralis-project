import { test } from '@playwright/test';
import dotenv from "dotenv";

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('can login to Moralis Admin Platform', async ({ page }) => {
  await page.goto('https://admin.moralis.io/login');
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.getByTestId('test-email').getByTestId('test-input-label').click();
  await page.getByTestId('test-email').getByTestId('test-input-input').fill(`${email}`);
  await page.getByTestId('test-email').getByTestId('test-input-input').press('Tab');
  await page.getByTestId('test-password').getByTestId('test-input-input').fill(`${password}`);
  await page.getByTestId('test-button').click();

  await page.waitForURL('https://admin.moralis.io/');
  // Aseert Admin page is loaded with all elements.
  await page.locator('#main_top').getByRole('main').click();
  
  await page.locator('#main_top').getByRole('main').click();
});
