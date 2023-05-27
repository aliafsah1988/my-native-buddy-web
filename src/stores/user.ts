import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { LoggedInUserService, TokenService } from "@/services/storage.service";
import type IUserDbModel from "@/types/IUserDbModel";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(!!TokenService.getToken());
  const user = reactive<IUserDbModel>({
    _id: {},
    email: "",
    password: "",
    role: "",
    active: false,
    firstName: "",
    lastName: "",
    phone_number: "",
    location: "",
    birth_date: 0,
    deleted: false,
    persistDate: 0,
    createDate: 0,
  });

  const setToken = (token: string) => {
    TokenService.saveToken(token);
    isLoggedIn.value = true;
  };

  const setUser = (newUser: IUserDbModel) => {
    user.email = newUser.email;
  };

  const logout = () => {
    TokenService.removeToken();
    LoggedInUserService.removeEmail();
  };

  return {
    isLoggedIn,
    setToken,
    logout,
    setUser,
    user,
  };
});
