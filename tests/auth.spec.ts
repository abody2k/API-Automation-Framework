import { test, expect } from '@playwright/test';
import { loginSchema } from '../schemas/auth.schema';
import { login } from '../api/auth.api';
import { login_data } from '../data/auth_sample.data';


test.describe("Auth tests", () => {





  test("Login with valid username and password", async ({ }) => {

    let data = await login({ username: process.env.LOGIN_USERNAME as string, password: process.env.PASSWORD as string })

    let schemaResult = loginSchema.safeParse(data)

    if (!schemaResult.success) {
      console.log(schemaResult.error);

    }
    expect(schemaResult.success).toBeTruthy();

  })




  login_data.forEach((dataItem) => {

    test(`Login with ${dataItem.msg}`, async ({ }) => {

      let data = await login({ username: dataItem.username, password: dataItem.password })

      let schemaResult = loginSchema.safeParse(data)


      expect(schemaResult.success).toBeFalsy();
    })
  })







})