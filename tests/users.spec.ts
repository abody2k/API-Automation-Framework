import test, { expect } from "playwright/test";
import { deleteUser, updateUser } from "../api/users.api";
import { RESPONSE_STATUS } from "../api/auth.api";
import { checkResponse } from "../assertions/api.assrtion";

test.describe("Users related tests", () => {




    test("Deleting a user using their ID", async () => {



        let req = await deleteUser("1")
        await checkResponse({ response: req, statusCode: 200, statusText: RESPONSE_STATUS.OK })



    })



    test("Deleting a user using an invalid ID", { annotation: { type: "edge", description: "The response should be not found" } }, async () => {

        let req = await deleteUser("5676567")
        await checkResponse({ response: req, statusCode: 404, statusText: RESPONSE_STATUS.NOT_FOUND })


    })

    test("Deleting a user without sending an ID", { annotation: { type: "edge", description: "The response should be not found" } }, async () => {

        let req = await deleteUser()
        await checkResponse({ response: req, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })


    })

    test("Updating a user's info using their ID", async () => {




        let res = await updateUser(1, {


            firstName: "Anderson"
        })


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })

    })
})