import type ApiService from "./ApiService";
import { TokenService, LoggedInUserService } from "./storage.service";

class AuthService {
  private readonly _apiService: ApiService;

  constructor(apiService: ApiService) {
    this._apiService = apiService;
  }

  async login(email: string, password: string): Promise<string> {
    const result = await this._apiService.request(
      "POST",
      "/auth/getToken",
      {},
      {
        body: {
          email: email,
          password: password,
        },
      }
    );

    TokenService.saveToken(result.body["x-access-token"]);
    return result.body["x-access-token"];
  }
  async logout() {
    TokenService.removeToken();
    LoggedInUserService.removeEmail();
  }
  async register(email: string, password: string) {
    const result = await this._apiService.request(
      "POST",
      "/auth/register",
      {},
      {
        body: {
          email: email,
          password: password,
        },
      }
    );

    TokenService.saveToken(result.body["x-access-token"]);
    return result.body["x-access-token"];
  }
}
export default AuthService;
