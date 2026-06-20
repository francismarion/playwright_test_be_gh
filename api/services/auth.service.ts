import { BaseClient } from "../clients/base.client";
import { ENDPOINTS } from "../routes/endpoints";

export class AuthService {
  constructor(private client: BaseClient) {}

  login(username: string, password: string) {
    return this.client.post(ENDPOINTS.LOGIN, {
      username,
      password
    });
  }
}
