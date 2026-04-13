import { test, expect } from '@playwright/test';
import { loginSchema } from '../schemas/auth.schema';
import { login, RESPONSE_STATUS } from '../api/auth.api';
import { login_data } from '../data/auth_sample.data';


test.describe("Auth tests", () => {





  test("Login with valid username and password", async ({ }) => {

    let loginRes = await login({ username: process.env.LOGIN_USERNAME as string, password: process.env.PASSWORD as string })
    let data = await loginRes.json();
    let schemaResult = loginSchema.safeParse(data)

    if (!schemaResult.success) {
      console.log(schemaResult.error);

    }
    expect(loginRes.status()).toBe(200);
    expect(schemaResult.success).toBeTruthy();

  })




  login_data.forEach((dataItem) => {

    test(`Login with ${dataItem.msg}`, async ({ }) => {

      let loginRes = await login({ username: dataItem.username, password: dataItem.password })
      let data = await loginRes.json();
      let schemaResult = loginSchema.safeParse(data)

      expect(loginRes.status()).toBe(400);
      expect(loginRes.statusText()).toBe(RESPONSE_STATUS.BAD_REQUEST)

      expect(schemaResult.success).toBeFalsy();
    })
  })




  test("Login without username and password", async ({ }) => {

    let loginRes = await login({})
    let data = await loginRes.json()
    let schemaResult = loginSchema.safeParse(data)
    expect(loginRes.status()).toBe(400);
    expect(loginRes.statusText()).toBe(RESPONSE_STATUS.BAD_REQUEST)
    expect(schemaResult.success).toBeFalsy();

  })


})