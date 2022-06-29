import ApiService from "./ApiService";
import GroupService from "./GroupService";
import WordService from "./WordService";
import LangService from "./LangService";

const apiService = new ApiService("/-");
const groupService = new GroupService(apiService);
const wordService = new WordService(apiService);
const langService = new LangService(apiService);

export { groupService, wordService, langService };
