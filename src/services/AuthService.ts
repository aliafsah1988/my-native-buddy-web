import type ApiService from "./ApiService";
import { useUserStore } from "@/stores/user";

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

    const { setToken } = useUserStore();
    setToken(result.body["x-access-token"]);
    return result.body["x-access-token"];
  }
  async logout() {
    const { logout } = useUserStore();
    logout();
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

    const { setToken } = useUserStore();

    setToken(result.body["x-access-token"]);
    return result.body["x-access-token"];
  }
}
export default AuthService;
