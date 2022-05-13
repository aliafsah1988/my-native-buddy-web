import ApiService from "./api.service";
import { TokenService, LoggedInUserService } from "./storage.service";

// when user hits F5 , base url and headers is going to remove, so we set them again
ApiService.init();
ApiService.setHeader();

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns x-access-token
   * @throws AuthenticationError
   **/
  login: async function(email, password) {
    try {
      TokenService.removeToken();
      ApiService.removeHeader();
      const requestData = {
        method: "post",
        url: "/auth/getToken",
        data: {
          email: email,
          password: password
        }
      };

      const response = await ApiService.customRequest(requestData);
      LoggedInUserService.saveEmail(email);
      return this.processToken(response);
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },
  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `x-access-token <token>` header from future requests.
   **/
  logout: async function() {
    // Remove the token and remove Authorization header from Api Service as well
    TokenService.removeToken();
    ApiService.removeHeader();
    LoggedInUserService.removeEmail();

    // NOTE: Again, we'll cover the 401 Interceptor a bit later.
    ApiService.unmount401Interceptor();
  },

  /**
   * register
   *
   * @returns
   * @throws AuthenticationError
   **/
  register: async function(email, password) {
    try {
      TokenService.removeToken();
      ApiService.removeHeader();

      const requestData = {
        method: "post",
        url: "/auth/register",
        data: {
          email: email,
          password: password
        }
      };
      const response = await ApiService.customRequest(requestData);
      LoggedInUserService.saveEmail(email);
      return this.processToken(response);
    } catch (error) {
      throw new AuthenticationError(error.errorCode, error.message);
    }
  },
  processToken(response) {
    TokenService.saveToken(response.data["x-access-token"]);
    ApiService.setHeader();

    return response.data["x-access-token"];
  }
};

export default AuthService;

export { AuthService, AuthenticationError };
