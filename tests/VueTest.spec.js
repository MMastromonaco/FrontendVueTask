// @ts-check
const { test, expect } = require('@playwright/test');

const new_Expense = {
  amount: 1500,
  category: "stocks",
  name: "Ehang"
}

test('Add a expense', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  // Enter expense details
  await page.fill('input[id="overlay"]', '50');
  await page.selectOption('select[id="expenseCategory"]', 'Food');
  await page.fill('input[id="objectName"]', 'Ice cream');

  // Submit the form
  await page.click('button[type="submit"]');

  // Expect to see the new expense in the expenses list
  expect(await page.isVisible('ul > li:last-child')).toBeTruthy();
});

test('delete a expense', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  await Promise.all([
    page.click('#expand-button'),
    page.waitForNavigation()
  ]);

  const deleteButton = await page.$('#delete-transaction-1')
  await deleteButton?.click();

  await page.click('#confirm-delete-button');

  const transaction = await page.$('#transaction-1');
  expect(transaction).toBeNull();
  
  // Submit the delete
  // await page.click('button[id="deleteButton"]');
});
