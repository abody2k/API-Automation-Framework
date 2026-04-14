import { ApiClient } from "./client/apiClient";

export async function deleteUser(userID?: string) {


    let client = await ApiClient.createClient()


    return await client.delete(`/users/${userID}`)

}



export async function updateUser(userID: number, updatedFields?: object) {

    let client = await ApiClient.createClient()

    return await client.put(`/users/${userID}`, updatedFields)

}