import test, { expect } from "playwright/test";
import { deleteUser } from "../api/users.api";
import { RESPONSE_STATUS } from "../api/auth.api";

test.describe("Users related tests", () => {




    test("Deleting a user using their ID", async () => {



        let req = await deleteUser("1")
        let data = await req.json()
        expect(req.status()).toBe(200)
        expect(req.statusText()).toBe(RESPONSE_STATUS.OK);


    })
})