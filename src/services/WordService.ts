import ApiService from "./ApiService";

class WordService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public async getMyWords(): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
      "/word/user",
      undefined,
      {}
    );
    return respnse.body;
  }

  public async deleteById(wordId: string): Promise<any> {
    const respnse = await this.apiService.request(
      "DELETE",
      "/word",
      {
        id: wordId,
      },
      {}
    );
    return respnse.body;
  }
}

export default WordService;
