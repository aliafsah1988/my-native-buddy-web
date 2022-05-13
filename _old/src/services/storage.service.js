const TOKEN_KEY = "access_token";
const EMAIL_KEY = "email";

/**
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const LoggedInUserService = {
  getEmail() {
    return localStorage.getItem(EMAIL_KEY);
  },

  saveEmail(email) {
    localStorage.setItem(EMAIL_KEY, email);
  },

  removeEmail() {
    localStorage.removeItem(EMAIL_KEY);
  }
};

export { TokenService, LoggedInUserService };
export default TokenService;
