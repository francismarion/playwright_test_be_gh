import { test } from "../fixtures/fixtures";
import { UserService } from "../../api/services/user.service";
import { authHeader } from "../../helpers/auth-case";

test("update single user", async ({ baseClient, createUser, token }) => {
  // create a user first
  const createdUser = await createUser();

  const userService = new UserService(baseClient);

  // update user by id
  const response = await userService.updateUser({
    idParam: createdUser.id,
    id: crypto.randomUUID(),
    username: "test",
    password: "test",
    email: "test@gmail.com",
    headers: authHeader(token, "bearer")
  }
  );

  const resTest = await response.text()

  console.log("id", createdUser.id)
  console.log(resTest)

});