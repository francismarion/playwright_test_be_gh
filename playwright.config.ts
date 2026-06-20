import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.API_BASE_URL, "ss")
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: { accept: 'application/json' },
    headless: true
  },
  reporter: [
    // ['json', { outputFile: 'test-results/results.json' }], // For code parsing
    // ['html', { outputFolder: 'reports' }],                 // For human viewing
    // ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],
  globalSetup: require.resolve('./global-setup')
});