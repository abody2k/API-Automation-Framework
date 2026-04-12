import { request } from "playwright";

export async function getAllUsers() {


    let apiRequest = await request.newContext({

        baseURL:process.env.BASE_URL
    });


    let data =await (await apiRequest.get("/users")).json()

    console.log(data);
    
    
}