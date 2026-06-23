import { expect } from "@playwright/test";
import { test } from '../fixtures/fixtures'
import { Assertions } from "../../utils/assertions";
import { UserService } from "../../api/services/user.service";
import { USERNAME, PASSWORD } from "../../helpers/dotenv-loader";
import { authHeader } from "../../helpers/auth-case";

test('get all user', async ({ authWorkflow, baseClient }) => {
  const {token} = await authWorkflow.loginAndGetToken(
        USERNAME,
        PASSWORD
    )

    const userService = new UserService(baseClient)

    const response = userService.getAllUser(
        authHeader(token, 'invalid')
        
    )

    const responseBody = await response
    console.log(await responseBody.json())
   
});