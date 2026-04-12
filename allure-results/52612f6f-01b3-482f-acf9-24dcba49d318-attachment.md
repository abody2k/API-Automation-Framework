# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth tests >> Login with valid username and password
- Location: tests\auth.spec.ts:12:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { loginSchema } from '../schemas/auth.schema';
  3  | import { login } from '../api/auth.api';
  4  | 
  5  | 
  6  | test.describe("Auth tests", () => {
  7  | 
  8  | 
  9  | 
  10 | 
  11 | 
  12 |   test("Login with valid username and password", async ({ }) => {
  13 | 
  14 |     let data = await login({ username: process.env.USERNAME as string, password: process.env.PASSWORD as string})
  15 |     console.log(data);
  16 |     
  17 |     let schemaResult = loginSchema.safeParse(data)
  18 | 
  19 |     if (!schemaResult.success) {
  20 |       console.log(schemaResult.error);
  21 | 
  22 |     }
> 23 |     expect(schemaResult.success).toBeTruthy();
     |                                  ^ Error: expect(received).toBeTruthy()
  24 | 
  25 |   })
  26 | 
  27 | 
  28 | })
```