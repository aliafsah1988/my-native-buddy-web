import ApiService from "./api.service";
import config from "../config";

// when user hits F5 , base url and headers is going to remove, so we set them again
ApiService.init();
ApiService.setHeader();

class PracticeError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const PracticeService = {
  /**
   * getting today's practices
   *
   * @returns array of practices
   * @throws PracticeError
   **/
  getToday: async function(groupId) {
    try {
      const requestData = {
        method: "get",
        url: `/practice`,
        params: {
          limit: config.MAX_PRACTICE,
          groupId: groupId
        }
      };
      const response = await ApiService.customRequest(requestData);
      return this.changeArrangement(response.data);
    } catch (error) {
      throw new PracticeError(
        error.response.status,
        error.response.data.detail
      );
    }
  },
  /**
   * getting today's practices
   *
   * @returns array of practices
   * @throws PracticeError
   **/
  check: async function(wordId, text) {
    try {
      const requestData = {
        method: "put",
        url: `/practice`,
        data: {
          wordId,
          text
        }
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new PracticeError(
        error.response.status,
        error.response.data.detail
      );
    }
  },
  changeArrangement: async function(list) {
    const tempList = [...list];
    const result = [];
    for (let i = 0; i < list.length; i++) {
      let word = tempList[Math.floor(Math.random() * tempList.length)];
      result.push(word);
      let index = tempList.indexOf(word);
      if (index !== -1) tempList.splice(index, 1);
    }
    return result;
  }
};

export default PracticeService;

export { PracticeService, PracticeError };
