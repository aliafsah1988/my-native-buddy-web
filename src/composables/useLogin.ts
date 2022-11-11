import { ref, type Ref } from "vue";
import { authService } from "@/services/index";
import { useRouter } from "vue-router";

interface IUseLogin {
  login: () => void;
  email: Ref<string>;
  password: Ref<string>;
  error: Ref<string | undefined>;
}

export function useLogin(): IUseLogin {
  const email = ref<string>("");
  const password = ref<string>("");
  const router = useRouter();
  const error: Ref<string | undefined> = ref(undefined);

  const login = async () => {
    try {
      const result = await authService.login(email.value, password.value);
      if (result !== undefined && result.length > 0) {
        error.value = undefined;
        router.push({ name: "practiceGroup" });
        return;
      }
      error.value = "Username or password is wrong!";
    } catch (err) {
      console.log(err);
      error.value = "Username or password is wrong!";
    }
  };

  return {
    email,
    password,
    login,
    error,
  };
}
