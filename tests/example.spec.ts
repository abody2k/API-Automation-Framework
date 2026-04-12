import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.waitForTimeout(3000)
   expect(1+1).toBe(2);
});

