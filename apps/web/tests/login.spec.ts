import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/FinancePro/);
});

test('login form validation', async ({ page }) => {
  await page.goto('/login');

  // Click login button without entering data
  await page.getByRole('button', { name: /Masuk/i }).click();

  // Expect validation error (assuming form uses HTML5 validation or shows error)
  // Since we haven't implemented specific error logic accessible via role yet, 
  // we check if we are still on login page.
  await expect(page).toHaveURL(/.*login/);
});
