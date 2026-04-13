import { APIRequestContext, request, Request } from "playwright";
import { ur } from "zod/locales";
import { process } from "zod/v4/core";

export class ApiClient {


    request: APIRequestContext


    constructor(req: APIRequestContext) {


        this.request = req
    }

    async createClient() {

        return new ApiClient(await request.newContext({

            baseURL: process.env.BASE_URL
        }));

    }



    async post(url: string, data: object, options: {}) {

        this.request.post(url, {
            data: data,
            headers: options

        })

    }
}