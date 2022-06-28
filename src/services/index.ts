import ApiService from "./ApiService";
import GroupService from "./GroupService";
import WordService from "./WordService";

const apiService = new ApiService("-/");
const groupService = new GroupService(apiService);
const wordService = new WordService(apiService);

export { groupService, wordService };
