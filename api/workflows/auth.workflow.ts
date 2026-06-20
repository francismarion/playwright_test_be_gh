import { AuthService } from "../services/auth.service";

export class AuthWorkflow {
  constructor(private authService: AuthService) {}

  async loginAndGetToken(username: string, password: string) {
    const response = await this.authService.login(username, password);

    const body = await response.json()
    return {
      response,
      token: body.token
    };
  }
}