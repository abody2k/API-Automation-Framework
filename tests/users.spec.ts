import test, { expect } from "playwright/test";
import { deleteUser, updateUser } from "../api/users.api";
import { RESPONSE_STATUS } from "../api/auth.api";
import { checkResponse } from "../assertions/api.assrtion";

test.describe("Users related tests", () => {




    test("Deleting a user using their ID", async () => {



        let req = await deleteUser("1")
        await checkResponse({ response: req, statusCode: 200, statusText: RESPONSE_STATUS.OK })



    })





    test("Updating a user's info using their ID", async () => {




        let res = await updateUser(1,{


            firstName:"Anderson"
        })


        await checkResponse({response:res,statusCode:200,statusText:RESPONSE_STATUS.OK})
        
    })
})