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

    const response = userService.addUser(
        "1",
        "test",
        "test",
        "test",
        authHeader(token, 'invalid')
        
    )
    console.log((await response).status())
    console.log((await response).text())
});