import { test } from "../fixtures/fixtures";
import { UserService } from "../../api/services/user.service";
import { authHeader } from "../../helpers/auth-case";

test("get single user", async ({ baseClient, createUser, token }) => {
  // create a user first
  const createdUser = await createUser();

  const userService = new UserService(baseClient);

  // fetch user by id
  const response = await userService.getSingleUser(
    createdUser.id,
    authHeader(token, "raw")
  );

  const resTest = await response.text()

  console.log("id", createdUser.id)
  console.log(resTest)

});