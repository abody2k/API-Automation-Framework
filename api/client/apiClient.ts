import { APIRequestContext, request, Request } from "playwright";
import { ur } from "zod/locales";

export class ApiClient {


    request: APIRequestContext


    constructor(req: APIRequestContext) {


        this.request = req
    }

    static async createClient() {

        return new ApiClient(await request.newContext({

            baseURL: process.env.BASE_URL
        }));

    }


    /**
     * 
     * @param url the url to be appended after the base url *NOTE: DON'T ADD THE WHOLE HTTP:// link, just add the part after the domain*
     * @param data 
     * @param options 
     * @returns 
     */
    async post(url: string, data: object, options?: {}) {

        return await this.request.post(url, {
            data: data,
            headers: {

                'Content-Type': "application/json",
                ...options
            }

        })

    }


    async get(url: string, options?: { token?: string }) {


        return this.request.get(url, {
            headers: {

                'Content-Type': "application/json",
                ...(options?.token ? { 'Authorization': options.token } : {})
            }
        })

    }


    async delete(url: string) {


        return this.request.delete(url, {
            headers: {
                'Content-Type': "application/json",
            }
        })

    }

    async put(url: string, data?: object, options?: object) {



        return await this.request.put(url, {
            data: data,
            headers: {

                'Content-Type': "application/json",
                ...options
            }

        })

    }
}