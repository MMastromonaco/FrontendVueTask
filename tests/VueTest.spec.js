// @ts-check
const { test, expect } = require('@playwright/test');

const new_Expense = {
  amount: 1500,
  category: "stocks",
  name: "Ehang"
}

test('Add a expense', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

<<<<<<< HEAD
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
    page.click('.expand-button')
  ]);

  const deleteButton = await page.$('#delete-transaction-1')
  await deleteButton?.click();

  // Submit the delete
  await page.click('button[id="deleteButton"]');

  const transaction = await page.$('#transaction-1');
  expect(transaction).toBeNull();
});
=======
    const addAmount = page.locator('#overlay');
    const selectCategory = page.locator('#expenseCategory');
    const addName = page.locator('#objectName')
    
    // Enter expense details
    await addAmount.fill('50')
    await selectCategory.selectOption('Food')
    await addName.fill('Ice cream')

    // Submit the form
    await page.click('button[type="submit"]');

  // Expect to see the new expense in the expenses list
    let tracker = await page.locator('.transactionThisMonth')
    let trackerText = await tracker.textContent();
    
    await expect(trackerText).toEqual('Ice cream: 50 Kr (food) ');
});

test('Total Amount', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');

    const addAmount = page.locator('#overlay');
    const selectCategory = page.locator('#expenseCategory');
    const addName = page.locator('#objectName')
    
    // Enter expense details
    await addAmount.fill('100')
    await selectCategory.selectOption('Salary')
    await addName.fill('Swish')

    // Submit the form
    await page.click('button[type="submit"]');
    // repeat with diferent values
    await addAmount.fill('50')
    await selectCategory.selectOption('Food')
    await addName.fill('Ice cream')

    await page.click('button[type="submit"]');

    let tracker = await page.locator('#totalAmount')
    let trackerText = await tracker.textContent();

    await expect(trackerText).toEqual('Total amount: 50.00');
});

test('Delete transaction', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');

    const addAmount = page.locator('#overlay');
    const selectCategory = page.locator('#expenseCategory');
    const addName = page.locator('#objectName')
    
    // Enter expense details
    await addAmount.fill('100')
    await selectCategory.selectOption('Salary')
    await addName.fill('Swish')

    // Submit the form
    await page.click('button[type="submit"]');

    // repeat with diferent values
    await addAmount.fill('50')
    await selectCategory.selectOption('Food')
    await addName.fill('Ice cream')

    await page.click('button[type="submit"]');

    //go to history
    await page.click('.expand-button');
    //select the month
    const selectMonth = page.locator('#expenseMonth');
    await selectMonth.selectOption('Mar');

    const deleteButtons = await page.$$('#deleteButton');
    const lastDeleteButton = deleteButtons[1];
    await lastDeleteButton.click();

    await page.click('.close-button')

    let tracker = await page.locator('#totalAmount')
    let trackerText = await tracker.textContent();

    await expect(trackerText).toEqual('Total amount: 100.00');
});
>>>>>>> 5d6c95cf699b3be84a95994963f761d8abe7c4c8
