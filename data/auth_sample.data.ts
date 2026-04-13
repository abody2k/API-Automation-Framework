import { RESPONSE_MSGS } from "../api/auth.api";

export const login_data = [

    // { username: "emilys", password: "emilyspass", msg: "correct username and password" },
    { username: "emilyssss", password: "emilyspass", msg: "invalid username and valid password", responseMsg: RESPONSE_MSGS.INVALID_CRED },
    { username: "emilys", password: "emilys", msg: "valid username and invalid password", responseMsg: RESPONSE_MSGS.INVALID_CRED },
    { username: "", password: "", msg: "wrong username and password", responseMsg: RESPONSE_MSGS.USERNAME_AND_PASS_REQ },
]