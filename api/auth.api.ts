import { request } from "playwright";
import * as zod from 'zod'
import { loginSchema } from "../schemas/auth.schema";
/**
 * login function that takes username and password and returns a token
 * @param username 
 * @param password 
 */
export async function login({ username, password }: { username?: string, password?: string }) {



    let context = await request.newContext({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            "Content-Type": "application/json"
        },
    });

    let data = await (await context.post("/auth/login", {

        data: {
            username: username,
            password: password
        }
    })).json();

    return data;



}