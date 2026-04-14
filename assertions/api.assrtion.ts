import { APIResponse } from "playwright";
import { expect } from "playwright/test";



export async function checkResponse({ statusCode, statusText, message, response }: { statusCode?: number, statusText?: string, message?: string, response: APIResponse }) {


    if (statusCode) {

        expect(response.status()).toBe(statusCode)
    }

    if (statusText) {

        expect(response.statusText()).toBe(statusText)
    }
    if (message) {

        expect((await response.json()).message).toBe(message)
    }


}