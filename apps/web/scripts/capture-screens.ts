import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Ensure docs/images exists
  const docsDir = path.resolve(__dirname, '../../../docs/images');
  if (!fs.existsSync(docsDir)){
    fs.mkdirSync(docsDir, { recursive: true });
  }

  console.log('Navigating to app...');
  // Assuming Docker is running on default port 8080
  try {
    await page.goto('http://localhost:8080', { timeout: 10000 });
  } catch (e) {
    console.error('Error: Could not connect to http://localhost:8080. Is the Docker container running?');
    await browser.close();
    process.exit(1);
  }

  // Handle Login/Register
  // We'll try to register a new demo user for the screenshot
  // If redirected to login, we click register
  
  if (page.url().includes('login')) {
    console.log('On Login page, switching to Register...');
    await page.click('text=Register'); // Adjust selector based on actual UI
    await page.waitForURL('**/register');
  }

  console.log('Registering demo user...');
  await page.fill('input[name="name"]', 'Demo User');
  await page.fill('input[name="email"]', `demo_${Date.now()}@example.com`);
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for Dashboard
  await page.waitForURL('**/'); // Dashboard usually at root
  console.log('Login successful. Taking Dashboard screenshot...');
  
  // Add some delay for charts to animate
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: path.join(docsDir, 'dashboard.png'), fullPage: true });

  // Go to Transactions
  console.log('Navigating to Transactions...');
  const transactionLink = await page.$('a[href="/transactions"]'); // Adjust selector
  if (transactionLink) {
    await transactionLink.click();
    await page.waitForURL('**/transactions');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(docsDir, 'transactions.png'), fullPage: true });
  } else {
    console.log('Could not find link to /transactions');
  }

  await browser.close();
  console.log('Screenshots saved to docs/images/');
}

capture();
