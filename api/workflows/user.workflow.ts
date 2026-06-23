import { expect } from "@playwright/test";
import { UserService } from "../services/user.service";

export class UserWorkflow {
    constructor(private userService: UserService) {}

        async createUser(id: string, username: string, email: string, password: string) {
            const response = await this.userService.addUser({
                id,
                username,
                email,
                password
        })

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
    
    async getSingleUser(id: string) {
        const response = await this.userService.getSingleUser(id)
        expect(response.status()).toBe(200)

        return response
    }
}