import { describe, expect, it, vi, afterEach } from "vitest";
import { useLogin } from "@/composables/useLogin";
import { authService } from "@/services/index";

const routerPush = vi.fn();

describe("useLogin", () => {
  const authServiceSpy = vi.spyOn(authService, "login");

  vi.mock("vue-router", () => ({
    __esModule: true,
    useRouter: function () {
      return {
        push: routerPush,
      };
    },
  }));

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("call the auth api after login click", async () => {
    vi.mocked(authService.login).mockReturnValueOnce(Promise.resolve);

    const { login } = useLogin();
    await login();
    expect(authServiceSpy).toBeCalledTimes(1);
  });

  it("set error when api call failed", async () => {
    authServiceSpy.mockImplementation(() => {
      return new Promise((resolve, reject) => reject());
    });
    const { login, error } = useLogin();
    await login();
    expect(error.value).not.toBe(undefined);
  });

  it("empty error when api call succeed", async () => {
    const { login, error } = useLogin();

    authServiceSpy.mockImplementation(() => {
      return new Promise((resolve) => resolve("token"));
    });

    await login();
    expect(error.value).toBe(undefined);
  });

  it("push router when api call succeed", async () => {
    const { login } = useLogin();

    authServiceSpy.mockImplementation(() => {
      return new Promise((resolve) => resolve("token"));
    });

    await login();
    expect(routerPush).toHaveBeenCalledOnce();
    expect(routerPush).toHaveBeenCalledWith({ name: "practiceGroup" });
  });
});
