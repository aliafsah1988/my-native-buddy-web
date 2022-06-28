import ApiService from "./ApiService";

class GroupService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public async getMyGroups(): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
      "/group/user",
      undefined,
      {}
    );
    return respnse.body;
  }

  public async deleteById(groupId: string): Promise<any> {
    const respnse = await this.apiService.request(
      "DELETE",
      "/group",
      {
        id: groupId,
      },
      {}
    );
    return respnse.body;
  }
  public async add(
    name: string,
    description: string,
    langId: string
  ): Promise<any> {
    const respnse = await this.apiService.request(
      "POST",
      "/group",
      {},
      {
        body: {
          name,
          description,
          langId,
        },
      }
    );
    return respnse.body;
  }
  public async update(
    groupId: string,
    name: string,
    description: string,
    langId: string
  ): Promise<any> {
    const respnse = await this.apiService.request(
      "PUT",
      "/group",
      { id: groupId },
      {
        body: {
          name,
          description,
          langId,
        },
      }
    );
    return respnse.body;
  }
  public async getById(groupId: string): Promise<any> {
    const respnse = await this.apiService.request(
      "GET",
      "/group",
      {
        id: groupId,
      },
      {}
    );
    return respnse.body;
  }
}

export default GroupService;
