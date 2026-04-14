import { ApiClient } from "./client/apiClient";

export async function deleteUser(userID?: string) {


    let client = await ApiClient.createClient()


    return await client.delete(`/users/${userID}`)

}



export async function updateUser({ userID, updatedFields }: { userID?: string, updatedFields?: object }) {

    let client = await ApiClient.createClient()

    return await client.put(`/users/${userID}`, updatedFields)

}



export async function addNewUser(userData?: object) {

    let client = await ApiClient.createClient()

    return await client.post(`/users/add`, userData)

}



export async function getUserTodos(userID?: string) {

    let client = await ApiClient.createClient()

    return await client.get(`/users/${userID}/todos`)

}