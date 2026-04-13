import { test, expect } from '@playwright/test';
import { loginSchema } from '../schemas/auth.schema';
import { getCurrentUser, login, RESPONSE_MSGS, RESPONSE_STATUS } from '../api/auth.api';
import { login_data } from '../data/auth_sample.data';


test.describe("Auth tests", () => {





  test("Login with valid username and password", async ({ }) => {

    let loginRes = await login({ username: process.env.LOGIN_USERNAME as string, password: process.env.PASSWORD as string })
    let data = await loginRes.json();
    let schemaResult = loginSchema.safeParse(data)

    if (!schemaResult.success) {
      console.log(schemaResult.error);

    }

    expect(data.accessToken).toBeDefined()
    expect(data.refreshToken).toBeDefined()
    expect(loginRes.status()).toBe(200);
    expect(schemaResult.success).toBeTruthy();


    let newReq = await getCurrentUser(data.accessToken);
    console.log(await newReq.json());
    
  })




  login_data.forEach((dataItem) => {

    test.skip(`Login with ${dataItem.msg}`, async ({ }) => {

      let loginRes = await login({ username: dataItem.username, password: dataItem.password })
      let data = await loginRes.json(); // get data
      let schemaResult = loginSchema.safeParse(data) // check schema

      expect(loginRes.status()).toBe(400); // it has to fail, we are using faulty data

      expect(loginRes.statusText()).toBe(RESPONSE_STATUS.BAD_REQUEST) // checking if the status message is set correctly
      expect(data.accessToken).toBeUndefined() //making sure it is not sending data back on invalid login
      expect(data.refreshToken).toBeUndefined()
      expect(data.message).toBe(dataItem.responseMsg) // check if body error message is set correctly
      expect(schemaResult.success).toBeFalsy(); //checking the schema
    })
  })




  test.skip("Login without username and password", async ({ }) => {

    let loginRes = await login({})
    let data = await loginRes.json()
    let schemaResult = loginSchema.safeParse(data)
    expect(loginRes.status()).toBe(400);
    expect(loginRes.statusText()).toBe(RESPONSE_STATUS.BAD_REQUEST)
    console.log(data);
    expect(data.message).toBe(RESPONSE_MSGS.USERNAME_AND_PASS_REQ)

    expect(data.accessToken).toBeUndefined()
    expect(data.refreshToken).toBeUndefined()
    expect(schemaResult.success).toBeFalsy();


  })


})