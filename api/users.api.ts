import { ApiClient } from "./client/apiClient";

export async function deleteUser(userID?: string) {


    let client = await ApiClient.createClient()


    return await client.delete(`/users/${userID}`)

}