import { ApiClient } from "./client/apiClient";


/**
 * Deletes a user with the given userID.
 * @param userID 
 * @returns returns a message in an object indicating if user is deleted or not
 */
export async function deleteUser(userID?: string) {


    let client = await ApiClient.createClient()


    return await client.delete(`/users/${userID}`)

}


/**
 * updates a user given their userID and the fields to be updated in an object
 * @param param0 
 * @returns 
 */
export async function updateUser({ userID, updatedFields }: { userID?: string, updatedFields?: object }) {

    let client = await ApiClient.createClient()

    return await client.put(`/users/${userID}`, updatedFields)

}



/**
 * Adds a new user with the given user data. It only simulates doing that and does not actually
 * creates a new user on the server.
 * @param userData 
 * @returns the new user info.
 */
export async function addNewUser(userData?: object) {

    let client = await ApiClient.createClient()

    return await client.post(`/users/add`, userData)

}



export async function getUserTodos(userID?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/${userID}/todos`)

}



export async function getAllUsers() {

    let client = await ApiClient.createClient()

    return await client.get(`/users`)

}



export async function login(obj?: { username: string, password: string, expiresInMins?: number }) {


    let client = await ApiClient.createClient()

    return await client.post(`/users/login`, { username: obj?.username, password: obj?.password, expiresInMins: obj?.expiresInMins })
}



export async function getCurrentAuthenticatedUser(token: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/me`, { token })

}



export async function getUser(userID?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/${userID}`)

}


export async function searchForUser(userName?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/search?q=${userName}`)

}


export async function filterUsers(options?: { key: string, value: string }) {

    let client = await ApiClient.createClient()
    let search = "";
    if (options) {
        search += `key=${options.key}&value=${options.value}`
    }
    return await client.get(`/users/filter?${search}`)

}





export async function getUserPosts(userID?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/${userID}/posts`)

}


export async function getUserCarts(userID?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/${userID}/carts`)

}



export async function sortAndOrderUsers(sortBy?: string, order?: "asc" | "desc") {

    let client = await ApiClient.createClient()

    return await client.get(`/users?sortBy=${sortBy}${order ? `&order=${order}` : ""} `)

}

export async function limitAndSkipUsers(limit?: number, skip?: number, select?: (string)[]) {

    let client = await ApiClient.createClient()

    return await client.get(`/users?limit=${limit}&skip=${skip}&select=${select?.length! > 0 ? `${select?.join(",")}` : ""} `)

}
