import { test as base } from "@playwright/test";
import { BaseClient } from "../../api/clients/base.client";
import { AuthService } from "../../api/services/auth.service";
import { AuthWorkflow } from "../../api/workflows/auth.workflow";
import { Client } from "pg";
import { USERNAME, PASSWORD } from "../../helpers/dotenv-loader"

type Fixtures = {
  baseClient: BaseClient;
  authWorkflow: AuthWorkflow;
  token: string;
  db: Client;
};

export const test = base.extend<Fixtures>({
  baseClient: async ({ request }, use) => {
    await use(new BaseClient(request));
  },

  authWorkflow: async ({ baseClient }, use) => {
    const authService = new AuthService(baseClient);
    const authWorkflow = new AuthWorkflow(authService);

    await use(authWorkflow);
  },

  token: async ({ authWorkflow }, use) => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error("Missing credentials");
  }

  const { token } = await authWorkflow.loginAndGetToken(
    username,
    password
  );

  await use(token);
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
  }
});
