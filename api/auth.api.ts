import { ApiClient } from "./client/apiClient";


/**
 * Static response status codes and messages to be used in all API calls
 */
export enum RESPONSE_STATUS {

    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    OK = "OK",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    CREATED = "Created"

}


/**
 * Static response messages that to be compared to message field returned by
 * some API calls
 */
export enum RESPONSE_MSGS {
    USERNAME_AND_PASS_REQ = "Username and password required",
    INVALID_CRED = "Invalid credentials",
    ACCESS_TOKEN_REQUIRED = "Access Token is required",
    REFRESH_TOKEN_REQUIRED = "Refresh token required",
    INVALID_REFRESH_TOKEN = "Invalid refresh token",
    INVALID_LIMIT = `Invalid 'limit' - must be a number`
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



/**
 * 
 * @param token a string token you get from login api or refresh token api
 * @returns returns all user info
 */
export async function getCurrentUser(token?: string) {

    const client = await ApiClient.createClient();
    return await client.get("/auth/me", { token: token })

}




export async function refreshAuthSession(token?: string) {

    const client = await ApiClient.createClient();
    return await client.post("/auth/refresh", {

        refreshToken: token
    })
}