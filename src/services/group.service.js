import ApiService from "./api.service";

// when user hits F5 , base url and headers is going to remove, so we set them again
ApiService.init();
ApiService.setHeader();

class GroupError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const GroupService = {
  /**
   * add a new group
   *
   * @returns a boolean
   * @throws GroupError
   **/
  add: async function(name, description) {
    try {
      const requestData = {
        method: "post",
        url: `/group`,
        data: {
          name,
          description
        }
      };
      const response = await ApiService.customRequest(requestData);
      return response.data && response.data.id;
    } catch (error) {
      throw new GroupError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * update a group
   *
   * @returns a boolean
   * @throws GroupError
   **/
  update: async function(groupId, name, description) {
    try {
      const requestData = {
        method: "put",
        url: `/group`,
        params: {
          id: groupId
        },
        data: {
          name,
          description
        }
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new GroupError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * get a group by it's id
   *
   * @returns a group
   * @throws GroupError
   **/
  getById: async function(groupId) {
    try {
      const requestData = {
        method: "get",
        url: `/group`,
        params: {
          id: groupId
        }
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new GroupError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * gets groups belongs to a user
   *
   * @returns a list of groups
   * @throws GroupError
   **/
  getMyGroups: async function() {
    try {
      const requestData = {
        method: "get",
        url: `/group/user`
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new GroupError(error.response.status, error.response.data.detail);
    }
  },
  /**
   * deletes a group by it's id
   *
   * @returns a Boolean
   * @throws GroupError
   **/
  deleteById: async function(groupId) {
    try {
      const requestData = {
        method: "delete",
        url: `/group`,
        params: {
          id: groupId
        }
      };
      const response = await ApiService.customRequest(requestData);
      return response.data;
    } catch (error) {
      throw new GroupError(error.response.status, error.response.data.detail);
    }
  }
};

export default GroupService;

export { GroupService, GroupError };
