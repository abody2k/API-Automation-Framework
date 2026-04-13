import { request } from "playwright";
import { ApiClient } from "./client/apiClient";



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