import { test, expect } from '@playwright/test';

test.describe('Transaction Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/', { timeout: 5000 });
  });

  test('should create a new transaction', async ({ page }) => {
    await page.goto('/transactions');
    await page.getByRole('button', { name: 'Tambah Transaksi' }).click();
    
    // Fill form
    await page.getByTitle('Masukkan Jumlah').fill('50000');
    // Select Account (hardcoded options)
    await page.locator('label:has-text("Akun Pembayaran") select').selectOption('Chase Checking');
    
    // Select Category (assuming at least one exists, selecting by index 1)
    // We might need to wait for categories to load
    const categorySelect = page.locator('label:has-text("Kategori") select');
    await expect(categorySelect).not.toBeDisabled();
    // Wait for options to be populated
    await page.waitForTimeout(1000); // Small wait for fetch
    const options = await categorySelect.locator('option').allTextContents();
    console.log('Category options loaded:', options);
    
    if (options.length <= 1) {
        console.error('Available categories:', options);
        throw new Error('No categories loaded from API');
    }
    await categorySelect.selectOption({ index: 1 });

    await page.getByPlaceholder('Masukkan nama...').fill('Test E2E Merchant');
    
    // Submit
    await page.getByRole('button', { name: 'Simpan Transaksi' }).click();
    
    // Verify
    await expect(page.locator('table')).toContainText('Test E2E Merchant');
  });
});

test.describe('Payment Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/', { timeout: 5000 });
  });

  test('should verify QRIS payment', async ({ page }) => {
    await page.goto('/transactions');
    
    // Find a pending transaction's pay button
    const payButton = page.locator('button[title="Bayar Sekarang"]').first();
    
    if (await payButton.count() > 0) {
        await payButton.click();
        
        // Check Modal
        await expect(page.locator('text=Pembayaran QRIS')).toBeVisible();
        await expect(page.locator('img[alt="QRIS Code"]')).toBeVisible();
        
        // Confirm Payment
        await page.click('button:has-text("Saya Sudah Bayar")');
        
        // Expect Success
        await expect(page.locator('text=Pembayaran Berhasil!')).toBeVisible();
    } else {
        console.log('No pending transactions found to test payment.');
    }
  });
});
