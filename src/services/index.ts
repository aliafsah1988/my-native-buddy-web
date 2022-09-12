import ApiService from "./ApiService";
import GroupService from "./GroupService";
import WordService from "./WordService";
import LangService from "./LangService";
import AuthService from "./AuthService";

const apiService = new ApiService(import.meta.env.VITE_SERVER_BASE_URL);
const groupService = new GroupService(apiService);
const wordService = new WordService(apiService);
const langService = new LangService(apiService);
const authService = new AuthService(apiService);

export { groupService, wordService, langService, authService };
