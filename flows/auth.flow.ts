import { expect } from "playwright/test";
import { login } from "../api/auth.api";
import { loginSchema } from "../schemas/auth.schema";


/**
 * login flow that takes uername and password, uses the login API, tests
 * if schema is correct and if the access token and refresh token are sent back, and if the status code is 200
 * @param param0 username and password passed
 * @returns the data sent back from login API.
 */
export async function loginFlow({ username, password }: { username: string, password: string }) {



    let loginRes = await login({ username: username, password: password })
    let data = await loginRes.json();
    let schemaResult = loginSchema.safeParse(data)

    if (!schemaResult.success) {
        console.log(schemaResult.error);

    }

    expect(data.accessToken).toBeDefined()
    expect(data.refreshToken).toBeDefined()
    expect(loginRes.status()).toBe(200);
    expect(schemaResult.success).toBeTruthy();

    return data;

}