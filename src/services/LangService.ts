import type ApiService from "./ApiService";

class LangService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }
  public async getLangs(): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
      "/lang/list",
      undefined,
      {}
    );
    return respnse.body;
  }
  public async getLangById(langId: string): Promise<any> {
    const harchi: any[] = await this.getLangs();
    return harchi.find((lang: any) => lang._id === langId);
  }
}

export default LangService;
