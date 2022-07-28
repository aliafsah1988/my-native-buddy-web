import type ApiService from "./ApiService";

class WordService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public async getMyWords(query?: { groupId?: string }): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
      "/word/user",
      query,
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
  public async add(
    text: string,
    description: string,
    synonyms: string,
    translation: string,
    groupId: string,
    langId: string
  ): Promise<any> {
    const respnse = await this.apiService.request(
      "POST",
      "/word",
      {},
      {
        body: {
          text,
          description,
          synonyms,
          translation,
          groupId,
          langId,
        },
      }
    );
    return respnse.body;
  }
  public async update(
    wordId: string,
    text: string,
    description: string,
    synonyms: string,
    translation: string,
    groupId: string,
    langId: string
  ): Promise<any> {
    const respnse = await this.apiService.request(
      "PUT",
      "/word",
      { id: wordId },
      {
        body: {
          text,
          description,
          synonyms,
          translation,
          groupId,
          langId,
        },
      }
    );
    return respnse.body;
  }
  public async getById(wordId: string): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
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
