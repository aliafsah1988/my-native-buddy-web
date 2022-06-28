import type ApiService from "./ApiService";
import { TokenService } from "./storage.service";

class AuthService {
  private readonly _apiService: ApiService;

  constructor(apiService: ApiService) {
    this._apiService = apiService;
  }

  async login(email: string, password: string) {
    const result = await this._apiService.request(
      "POST",
      "/auth/getToken",
      {},
      {
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    TokenService.saveToken(result.body["x-access-token"]);
  }
}
export default AuthService;
