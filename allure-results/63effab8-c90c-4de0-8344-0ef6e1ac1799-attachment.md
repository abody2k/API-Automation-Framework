# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> has title
- Location: tests\example.spec.ts:3:5

# Error details

```
Error: page.waitForTimeout: Test ended.
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('has title', async ({ page }) => {
> 4 |   await page.waitForTimeout(300000)
    |              ^ Error: page.waitForTimeout: Test ended.
  5 |    expect(1+1).toBe(2);
  6 | });
  7 | 
  8 | 
```