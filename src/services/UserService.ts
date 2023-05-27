import type IUserDbModel from "@/types/IUserDbModel";
import type ApiService from "./ApiService";

class UserService {
  private readonly _apiService: ApiService;

  constructor(apiService: ApiService) {
    this._apiService = apiService;
  }

  async getUser(): Promise<IUserDbModel> {
    const result = await this._apiService.request("GET", "user", {}, {});
    return result.body;
  }
}
export default UserService;
