const TOKEN_KEY = "access_token";
const EMAIL_KEY = "email";

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

const LoggedInUserService = {
  getEmail() {
    return localStorage.getItem(EMAIL_KEY);
  },

  saveEmail(email: string) {
    localStorage.setItem(EMAIL_KEY, email);
  },

  removeEmail() {
    localStorage.removeItem(EMAIL_KEY);
  },
};

export { TokenService, LoggedInUserService };
