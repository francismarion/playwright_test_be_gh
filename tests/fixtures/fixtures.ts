import { test as base, type APIRequestContext } from "@playwright/test";
import { BaseClient } from "../../api/clients/base.client";
import { AuthService } from "../../api/services/auth.service";
import { AuthWorkflow } from "../../api/workflows/auth.workflow";
import { UserService } from "../../api/services/user.service";
import { Client } from "pg";
import { USERNAME, PASSWORD } from "../../helpers/dotenv-loader";

export type CreatedUser = {
  id: string;
  username: string;
  email: string;
};

type Fixtures = {
  baseClient: BaseClient;
  authWorkflow: AuthWorkflow;
  token: string;
  db: Client;

  createUser: (data?: Partial<CreatedUser>) => Promise<CreatedUser>;
};

export const test = base.extend<Fixtures>({

  baseClient: async ({ request }: { request: APIRequestContext }, use) => {
    await use(new BaseClient(request));
  },

  authWorkflow: async ({ baseClient }, use) => {
    const authService = new AuthService(baseClient);
    const authWorkflow = new AuthWorkflow(authService);

    await use(authWorkflow);
  },

  token: async ({ authWorkflow }, use) => {
    const username = USERNAME;
    const password = PASSWORD;

    if (!username || !password) {
      throw new Error("Missing credentials");
    }

    const { token } = await authWorkflow.loginAndGetToken(username, password);

    await use(token);
  },

  createUser: async ({ baseClient }, use) => {
  const userService = new UserService(baseClient);

  const create = async (data?: any) => {
    const response = await userService.addUser({
      username: data?.username ?? `test_${Date.now()}`,
      email: data?.email ?? "test@mail.com",
      password: "123456",
    });

    const body = await response.json();

    return body;
  };

  await use(create);
},

  db: async ({}, use) => {
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "test123",
      database: "testdb",
    });

    await client.connect();

    await use(client);

    await client.end();
  },
});