import { ApiClient } from "./client/apiClient";



export enum RESPONSE_STATUS {

    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized"

}

export enum RESPONSE_MSGS {
    USERNAME_AND_PASS_REQ = "Username and password required",
    INVALID_CRED = "Invalid credentials",
    ACCESS_TOKEN_REQUIRED = "Access Token is required"
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


export async function getCurrentUser(token?: string) {

    const client = await ApiClient.createClient();
    return await client.get("/auth/me", { token: token })

}




export async function refreshAuthSession(token?: string) {

    const client = await ApiClient.createClient();
    client.post("/auth/refresh", {

        refreshToken: token
    })
}