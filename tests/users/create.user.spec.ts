import { expect } from "@playwright/test";
import { test } from '../fixtures/fixtures'
import { Assertions } from "../../utils/assertions";
import { UserService } from "../../api/services/user.service";
import { USERNAME, PASSWORD } from "../../helpers/dotenv-loader";
import { authHeader } from "../../helpers/auth-case";

test('create new user', async ({ authWorkflow, baseClient }) => {
  const {token} = await authWorkflow.loginAndGetToken(
        USERNAME,
        PASSWORD
    )

    const userService = new UserService(baseClient)

    const response = await userService.addUser({
        username:"test",
        password: "test",
        email: "test",
        headers: authHeader(token, 'invalid')
        
})
    console.log(await response.json())
    // console.log((await response).status())
    // console.log((await response).text())
    // expect((await response).status()).toBe(201)
});