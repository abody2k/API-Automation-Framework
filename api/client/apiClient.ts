import { APIRequestContext, request, Request } from "playwright";

export class ApiClient {


    request: APIRequestContext


    constructor(req: APIRequestContext) {


        this.request = req
    }

    async createClient() {

        return new ApiClient(await request.newContext());

    }
}