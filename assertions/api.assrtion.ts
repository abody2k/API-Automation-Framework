import { APIResponse } from "playwright";
import { expect } from "playwright/test";
import { ZodObject } from "zod";



export async function checkResponse({ statusCode, statusText, message, response, schema }: { statusCode?: number, statusText?: string, message?: string, schema?: ZodObject, response: APIResponse }) {



    let data = (await response.json());

    if (statusCode) {

        expect(response.status()).toBe(statusCode)
    }

    if (statusText) {

        expect(response.statusText()).toBe(statusText)
    }
    if (message) {

        expect(data.message).toBe(message)
    }

    if (schema) {

        expect(schema.safeParse(data).success).toBeTruthy();

    }



}