# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth tests >> Login with valid username and invalid password
- Location: tests\auth.spec.ts:17:9

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
  4  | import { login_data } from '../data/auth_sample.data';
  5  | 
  6  | 
  7  | test.describe("Auth tests", () => {
  8  | 
  9  | 
  10 | 
  11 | 
  12 | 
  13 | 
  14 | 
  15 |   login_data.forEach((dataItem) => {
  16 | 
  17 |     test(`Login with ${dataItem.msg}`, async ({ }) => {
  18 | 
  19 |       let data = await login({ username: dataItem.username, password: dataItem.password })
  20 | 
  21 |       let schemaResult = loginSchema.safeParse(data)
  22 | 
  23 |       if (!schemaResult.success) {
  24 |         console.log(schemaResult.error);
  25 | 
  26 |       }
> 27 |       expect(schemaResult.success).toBeTruthy();
     |                                    ^ Error: expect(received).toBeTruthy()
  28 |     })
  29 |   })
  30 | 
  31 | 
  32 | 
  33 | 
  34 | 
  35 | 
  36 | 
  37 | })
```