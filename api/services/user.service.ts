import { BaseClient } from "../clients/base.client";
import { ENDPOINTS } from "../routes/endpoints";


export class UserService {
    constructor(private client: BaseClient) {}

    addUser(id: String, username: String, email: String, password: String, headers?: Record<string, string>) {
        return this.client.post(ENDPOINTS.ADD_USER, {
                id, 
                username, 
                email, 
                password
                },
                {
                    headers
                }
            )
        }
}