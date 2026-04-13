import { ApiClient } from "./client/apiClient";



export enum RESPONSE_STATUS {

    BAD_REQUEST = "Bad Request",

}

export enum RESPONSE_MSGS {
    USERNAME_AND_PASS_REQ = "Username and password required",
    INVALID_CRED = "Invalid credentials"
}

/**
 * login function that takes username and password and returns a token
 * @param username 
 * @param password 
 * @param options the headers needed to be passed if any
 */
export async function login({ username, password, options }: { username?: string, password?: string, options?: {} }) {


    const client = await ApiClient.createClient()


    return await client.post("auth/login", {
        username: username,
        password: password
    });



}