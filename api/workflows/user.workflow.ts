import { expect } from "@playwright/test";
import { UserService } from "../services/user.service";

export class UserWorkflow {
    constructor(private userService: UserService) {}

        async createUser(id: String, username: String, email: String, password: String) {
            const response = await this.userService.addUser(
                id,
                username,
                email,
                password
            )

            expect(response.status()).toBe(201)
            const body = await response.json()

            expect(body.username).toBe(username)
            expect(body.email).toBe(email)
            expect(body.password).toBe(password)

            return {
                response
            }
        }

    async getAllUser() {
        const response = await this.userService.getAllUser()
        expect(response.status()).toBe(200)

        return response
    }
}