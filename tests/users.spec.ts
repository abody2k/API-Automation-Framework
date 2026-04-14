import test, { expect } from "playwright/test";
import { addNewUser, deleteUser, getAllUsers, getUserTodos, updateUser } from "../api/users.api";
import { login, RESPONSE_STATUS } from "../api/auth.api";
import { checkResponse } from "../assertions/api.assrtion";
import { loginSchema } from "../schemas/auth.schema";

test.describe("Users related tests", () => {




    test("Deleting a user using their ID", async () => {



        let req = await deleteUser("1")
        await checkResponse({ response: req, statusCode: 200, statusText: RESPONSE_STATUS.OK })



    })



    test("Deleting a user using an invalid ID", { annotation: { type: "negative case", description: "The response should be not found" } }, async () => {

        let req = await deleteUser("5676567")
        await checkResponse({ response: req, statusCode: 404, statusText: RESPONSE_STATUS.NOT_FOUND })


    })

    test("Deleting a user without sending an ID", { annotation: { type: "negative", description: "The response should be not found" } }, async () => {

        let req = await deleteUser()
        await checkResponse({ response: req, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })


    })

    test("Updating a user's info using their ID", async () => {

        let res = await updateUser({ userID: "1", updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })



    test("Updating a user's info using invalid ID", async () => {

        let res = await updateUser({ userID: "1xd23", updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })



    test("Updating a user's info without an ID", async () => {

        let res = await updateUser({ updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })



    test.skip("Updating a user's info by only sending ID without sending data", { annotation: { type: "negative case", description: "Trying to update a user with missing fields to be updated should be flagged as bad request" } }, async () => {

        let res = await updateUser({ userID: "1" })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })







    test("Adding a new user", async () => {

        let res = await addNewUser({

            firstName: "Kong",
            lastName: ""
        })

        await checkResponse({ response: res, statusCode: 201, statusText: RESPONSE_STATUS.CREATED })
    })



    test.skip("Adding a new user without passing any data", { annotation: { type: "Negative case", description: "It should not be ok to create a user without sending any data" } }, async () => {

        let res = await addNewUser()




        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })




    test.skip("Adding a new user while passing invalid fields", { annotation: { type: "Negative case", description: "It should not be ok create a user with fields that does not fit the schema" } }, async () => {

        let res = await addNewUser({

            lifeSpands: 777,
            luckyNumber: 7
        })
        console.log(await res.json());




        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })






    test("Get a user todos using their ID", async () => {

        let res = await getUserTodos("1");


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })






    test("Get all users", async () => {

        let res = await getAllUsers();


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })



    test("Login with valid credentials", async () => {

        let res = await login({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD });

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK, schema: loginSchema })
    })

})