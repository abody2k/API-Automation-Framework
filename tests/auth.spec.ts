import { test, expect } from '@playwright/test';
import { getUserSchema, loginSchema, refreshTokenSchema } from '../schemas/auth.schema';
import { getCurrentUser, login, refreshAuthSession, RESPONSE_MSGS, RESPONSE_STATUS } from '../api/auth.api';
import { login_data } from '../data/auth_sample.data';
import { loginFlow } from '../flows/auth.flow';
import process from 'process';
import { checkResponse } from '../assertions/api.assrtion';


test.describe("Auth tests", () => {





  test("Login with valid username and password", async ({ }) => {


    loginFlow({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD })


  })




  login_data.forEach((dataItem) => {

    test(`Login with ${dataItem.msg}`, async ({ }) => {

      let loginRes = await login({ username: dataItem.username, password: dataItem.password })
      let data = await loginRes.json(); // get data
      let schemaResult = loginSchema.safeParse(data) // check schema

      await checkResponse({ statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST, message: dataItem.responseMsg, response: loginRes })

      expect(data.accessToken).toBeUndefined() //making sure it is not sending data back on invalid login
      expect(data.refreshToken).toBeUndefined()
      expect(schemaResult.success).toBeFalsy(); //checking the schema
    })
  })




  test("Login without username and password", async ({ }) => {

    let loginRes = await login({})
    let data = await loginRes.json()
    let schemaResult = loginSchema.safeParse(data)
    checkResponse({ response: loginRes, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST, message: RESPONSE_MSGS.USERNAME_AND_PASS_REQ })
    expect(data.accessToken).toBeUndefined()
    expect(data.refreshToken).toBeUndefined()
    expect(schemaResult.success).toBeFalsy();


  })





  test("get current user using valid login token", async ({ }) => {

    //Get the data from the API call
    let data = await loginFlow({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD })
    //Make get current user API request using the token we got from login flow
    let newReq = await getCurrentUser(data.accessToken);
    let newData = await newReq.json()
    //expecting it to have a valid schema
    expect(getUserSchema.safeParse(newData).success).toBeTruthy()

    if (getUserSchema.safeParse(newData).error) {
      console.log(getUserSchema.safeParse(newData).error);

    }

    expect(newReq.status()).toBe(200); // checking status code

  })



  test("get current user without passing a login token", async ({ }) => {

    let newReq = await getCurrentUser();
    let newData = await newReq.json()

    expect(newData.message).toBe(RESPONSE_MSGS.ACCESS_TOKEN_REQUIRED)
    expect(newReq.statusText()).toBe(RESPONSE_STATUS.UNAUTHORIZED)
    //expecting it to have an invalid schema



    expect(getUserSchema.safeParse(newData).success).toBeFalsy()

    expect(newReq.status()).toBe(401); // checking status code

  })





  test("Refresh authentication session using a token", async () => {

    let loginData = await loginFlow({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD })

    let refreshResponse = await refreshAuthSession(loginData.refreshToken)

    let refreshData = await refreshResponse.json();


    await checkResponse({ statusCode: 200, statusText: RESPONSE_STATUS.OK, response: refreshResponse, schema: refreshTokenSchema })
    expect(refreshData.refreshToken).toBeDefined()
    expect(refreshData.accessToken).toBeDefined()


  })




  test("Refresh authentication session without using a token", async () => {


    let refreshResponse = await refreshAuthSession()

    let refreshData = await refreshResponse.json();


    await checkResponse({ response: refreshResponse, message: RESPONSE_MSGS.REFRESH_TOKEN_REQUIRED, statusCode: 401, statusText: RESPONSE_STATUS.UNAUTHORIZED })
    expect(refreshTokenSchema.safeParse(refreshData).success).toBeFalsy();




  })


  test("Refresh authentication session with an invalid token", async () => {


    let refreshResponse = await refreshAuthSession("kjnsdkjcnsdjkcndncjnkjsn")

    let refreshData = await refreshResponse.json();

    expect(refreshTokenSchema.safeParse(refreshData).success).toBeFalsy();

    await checkResponse({ response: refreshResponse, message: RESPONSE_MSGS.INVALID_REFRESH_TOKEN, statusCode: 403, statusText: RESPONSE_STATUS.FORBIDDEN })

  })


})