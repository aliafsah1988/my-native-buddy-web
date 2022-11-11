import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import LoginView from "@/views/Login/LoginView.vue";

import { ref, type Ref } from "vue";

const mockedLogin = vi.fn();
const error: Ref<string | undefined> = ref(undefined);
mockedLogin.mockImplementation(() => {
  error.value = "some error";
});

describe("LoginView", () => {
  beforeEach(() => {
    vi.mock("@/composables/useLogin", () => ({
      __esModule: true,
      useLogin: function () {
        return {
          error,
          login: mockedLogin,
        };
      },
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("hide error message by default", async () => {
    expect(LoginView).toBeTruthy();

    const wrapper = mount(LoginView, {
      global: {
        stubs: ["router-link", "router-view"],
      },
    });

    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("show error message when login failed", async () => {
    expect(LoginView).toBeTruthy();

    const wrapper = mount(LoginView, { stubs: ["router-link"] });

    await wrapper.get("button").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error").exists()).toBe(true);
  });

  it("hide error message when login succeed", async () => {
    expect(LoginView).toBeTruthy();

    mockedLogin.mockImplementation(() => {
      error.value = undefined;
    });

    const wrapper = mount(LoginView, { stubs: ["router-link"] });

    await wrapper.get("button").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".error").exists()).toBe(false);
  });
});
