import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '*.spec.ts', timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:3001', headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--single-process', '--no-zygote', '--disable-gpu'],
    } : undefined,
  },
  webServer: {
    command: 'VITE_SUPABASE_URL=https://ccl-test.supabase.co VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_test npm run dev -- --host=127.0.0.1 --port=3001',
    url: 'http://127.0.0.1:3001', reuseExistingServer: false,
  },
});
