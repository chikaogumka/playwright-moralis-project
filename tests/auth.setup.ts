// import { test as setup, expect } from '@playwright/test';

// const authFile = 'playwright/.auth/user.json';

// setup('authenticate', async ({ page }) => {
//     // Login to Moralis Admin steps.
//     await page.goto('https://admin.moralis.io/login');
//     await page.getByRole('button', { name: 'Accept all' }).click();
//     await page.getByTestId('test-email').getByTestId('test-input-label').click();
//     await page.getByTestId('test-email').getByTestId('test-input-input').fill('saintshemmer@gmail.com');
//     await page.getByTestId('test-email').getByTestId('test-input-input').press('Tab');
//     await page.getByTestId('test-password').getByTestId('test-input-input').fill('kGsScNZ65AxhWMs');
//     await page.getByTestId('test-button').click();

//     await page.waitForURL('https://admin.moralis.io/');
//     // Aseert Admin page is loaded with all elements.
//     await page.locator('#main_top').getByRole('main').click();

//     // End of authentication steps.

//     await page.context().storageState({ path: authFile });
// });

import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  // Send authentication request. Replace with your own.
  await request.post('https://api.dashboard.moralis.io/auth/login', {
    form: {"email":"saintshemmer@gmail.com","password":"kGsScNZ65AxhWMs","keepmeLoggedin":false}
  });
  await request.storageState({ path: authFile });
});
