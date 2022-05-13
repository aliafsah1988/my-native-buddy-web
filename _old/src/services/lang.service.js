import ApiService from "./api.service";

// when user hits F5 , base url and headers is going to remove, so we set them again
ApiService.init();
ApiService.setHeader();

class LangError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
    this.langs = [];
  }
}

const LangService = {
  /**
   * gets list of available languages
   *
   * @returns a list of languages
   * @throws LangError
   **/
  getLangs: async function() {
    try {
      if (!this.langs || this.langs.length < 1) {
        const requestData = {
          method: "get",
          url: `/lang/list`
        };
        const response = await ApiService.customRequest(requestData);
        this.langs = response.data;
      }
      return this.langs;
    } catch (error) {
      throw new LangError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * gets a language
   *
   * @returns a language
   * @throws LangError
   **/
  getLangById: async function(langId) {
    try {
      await this.getLangs();
      return this.langs.find(lang => lang._id === langId);
    } catch (error) {
      throw new LangError(error.response.status, error.response.data.detail);
    }
  }
};

export default LangService;

export { LangService, LangError };
