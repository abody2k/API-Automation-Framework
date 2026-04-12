import { test, expect } from '@playwright/test';
import { loginSchema } from '../schemas/auth.schema';
import { login } from '../api/auth.api';


test.describe("Auth tests", () => {





  test("Login with valid username and password", async ({ }) => {

    let data = await login({ username: process.env.LOGIN_USERNAME as string, password: process.env.PASSWORD as string})
    
    let schemaResult = loginSchema.safeParse(data)

    if (!schemaResult.success) {
      console.log(schemaResult.error);

    }
    expect(schemaResult.success).toBeTruthy();

  })



})