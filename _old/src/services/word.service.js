import ApiService from "./api.service";

// when user hits F5 , base url and headers is going to remove, so we set them again
ApiService.init();
ApiService.setHeader();

class WordError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const WordService = {
  /**
   * add a new word
   *
   * @returns a boolean
   * @throws WordError
   **/
  add: async function (
    text,
    description,
    synonyms,
    translation,
    groupId,
    langId
  ) {
    try {
      const requestData = {
        method: "post",
        url: `/word`,
        data: {
          text,
          description,
          synonyms,
          translation,
          groupId,
          langId,
        },
      };
      const response = await ApiService.customRequest(requestData);
      return response.data && response.data.id;
    } catch (error) {
      throw new WordError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * update a word
   *
   * @returns a boolean
   * @throws WordError
   **/
  update: async function (
    wordId,
    text,
    description,
    synonyms,
    translation,
    groupId,
    langId
  ) {
    try {
      const requestData = {
        method: "put",
        url: `/word`,
        params: {
          id: wordId,
        },
        data: {
          text,
          description,
          synonyms,
          translation,
          groupId,
          langId,
        },
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new WordError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * get a word by it's id
   *
   * @returns a word
   * @throws WordError
   **/
  getById: async function (wordId) {
    try {
      const requestData = {
        method: "get",
        url: `/word`,
        params: {
          id: wordId,
        },
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new WordError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * gets words belongs to a user
   *
   * @returns a list of words
   * @throws WordError
   **/
  getMyWords: async function () {
    try {
      const requestData = {
        method: "get",
        url: `/word/user`,
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new WordError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * deletes a word by it's id
   *
   * @returns a Boolean
   * @throws WordError
   **/
  deleteById: async function (wordId) {
    try {
      const requestData = {
        method: "delete",
        url: `/word`,
        params: {
          id: wordId,
        },
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new WordError(error.response.status, error.response.data.detail);
    }
  },
};

export default WordService;

export { WordService, WordError };
