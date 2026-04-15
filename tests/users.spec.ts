import test, { expect } from "playwright/test";
import { addNewUser, deleteUser, filterUsers, getAllUsers, getCurrentAuthenticatedUser, getUser, getUserCarts, getUserPosts, getUserTodos, limitAndSkipUsers, searchForUser, sortAndOrderUsers, updateUser } from "../api/users.api";
import { login, RESPONSE_MSGS, RESPONSE_STATUS } from "../api/auth.api";
import { checkResponse } from "../assertions/api.assrtion";
import { loginSchema } from "../schemas/auth.schema";

import { login as apiLogin } from "../api/users.api";
import process from "process";
import { searchForUserSchema } from "../schemas/users.schema";

test.describe("Users related tests", () => {




    test("Deletes a user when user ID is provided", async () => {



        let req = await deleteUser("1")
        await checkResponse({ response: req, statusCode: 200, statusText: RESPONSE_STATUS.OK })



    })



    test("Fails to delete a user when invalid user ID is provided", { annotation: { type: "negative case", description: "The response should be not found" } }, async () => {

        let req = await deleteUser("5676567")
        await checkResponse({ response: req, statusCode: 404, statusText: RESPONSE_STATUS.NOT_FOUND })


    })

    test("Fails to delete a user when user ID is not provided", { annotation: { type: "negative", description: "The response should be not found" } }, async () => {

        let req = await deleteUser()
        await checkResponse({ response: req, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })


    })

    test("Upadtes user info when both user ID and info are provided", async () => {

        let res = await updateUser({ userID: "1", updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })



    test("Fails to update user info when invalid user ID is provided", async () => {

        let res = await updateUser({ userID: "1xd23", updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })



    test("Fails to update user info when user ID is not provided", async () => {

        let res = await updateUser({ updatedFields: { firstName: "Anderson" } })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })



    test("Fails to update user info when new info is not provided", { annotation: { type: "negative case", description: "Trying to update a user with missing fields to be updated should be flagged as bad request" } }, async () => {

        let res = await updateUser({ userID: "1" })


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })







    test("Creates new user with valid user info", async () => {

        let res = await addNewUser({

            firstName: "Kong",
            lastName: ""
        })

        await checkResponse({ response: res, statusCode: 201, statusText: RESPONSE_STATUS.CREATED })
    })



    test("Fails to create new user when user info is not provided", { annotation: { type: "Negative case", description: "It should not be ok to create a user without sending any data" } }, async () => {

        let res = await addNewUser()




        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })




    test("Fails to create a new user when invalid user info fields are provided", { annotation: { type: "Negative case", description: "It should not be ok create a user with fields that does not fit the schema" } }, async () => {

        let res = await addNewUser({

            lifeSpands: 777,
            luckyNumber: 7
        })
        console.log(await res.json());




        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })








    test("returns all users", async () => {

        let res = await getAllUsers();


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })



    test("Logs in with valid credentials", async () => {

        let res = await apiLogin({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD });

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK, schema: loginSchema })
    })



    test("fails to logs in with invalid credentials", async () => {

        let res = await apiLogin({ username: process.env.LOGIN_USERNAME, password: "Wrong password" });


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })




    test("fails to log in when credentials are not provided", async () => {

        let res = await apiLogin();


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })



    test("returns current authenticated user with valid token", async () => {

        let loginRes = await apiLogin({ username: process.env.LOGIN_USERNAME, password: process.env.PASSWORD });
        let token = (await loginRes.json()).accessToken;

        let res = await getCurrentAuthenticatedUser(token);
        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })

    })



    test("returns single user with user ID", async () => {
        let res = await getUser("1");
        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })

    })


    // an edge case
    test("fails to get user when invalid ID is provided", async () => {
        let res = await getUser("-999");
        await checkResponse({ response: res, statusCode: 404, statusText: RESPONSE_STATUS.NOT_FOUND })

    })



    test("Searches for a user with name", async () => {
        let res = await searchForUser("Jessi");

        console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK, schema: searchForUserSchema })

    })


    test("Searches for a user without passing name", async () => {
        let res = await searchForUser();

        console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK, schema: searchForUserSchema })

    })








    test("Filter a user with key and value", async () => {
        let res = await filterUsers({ key: "lastName", value: "Baker" });

        console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })

    });




    test("returns user posts with user ID", async () => {

        let res = await getUserPosts("1");

        // console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })

    test("Fails to get user posts when user ID is not provided", async () => {

        let res = await getUserPosts();


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })


    test("returns a user todos with user ID", async () => {

        let res = await getUserTodos("1");


        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })


    test("Fails to get user todos when user ID is not provided", async () => {

        let res = await getUserTodos();


        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST })
    })


    test("returns user carts with user ID", async () => {

        let res = await getUserCarts("1");
        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })


    test("returns sorted and ordered users list by firstname", async () => {

        let res = await sortAndOrderUsers("firstName");
        // console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })




    test("returns users list when limit and skip are provided", async () => {

        let res = await limitAndSkipUsers(10, 10, ["firstName", "lastName"]);
        console.log(await res.json());

        await checkResponse({ response: res, statusCode: 200, statusText: RESPONSE_STATUS.OK })
    })


    test("Fails to get users lists when limit and skip are not provided", async () => {

        let res = await limitAndSkipUsers();

        await checkResponse({ response: res, statusCode: 400, statusText: RESPONSE_STATUS.BAD_REQUEST, message: RESPONSE_MSGS.INVALID_LIMIT })
    })
})