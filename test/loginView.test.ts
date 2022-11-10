import { describe, expect, it, vi } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import LoginView from "../src/views/Login/LoginView.vue";
import { authService } from "../src/services/index";

describe("LoginView", () => {
  const authServiceSpy = vi.spyOn(authService, "login");

  it("call the auth api after login click", async () => {
    vi.mocked(authService.login).mockReturnValueOnce(
      new Promise((resolve) => resolve(""))
    );

    expect(LoginView).toBeTruthy();
    const wrapper = shallowMount(LoginView, { stubs: ["router-link"] });

    await wrapper.get("button").trigger("click");
    expect(authServiceSpy).toBeCalledTimes(1);
  });

  it("hide error message by default", async () => {
    expect(LoginView).toBeTruthy();
    const wrapper = mount(LoginView, {});

    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("show error message when login failed", async () => {
    vi.mocked(authService.login).mockReturnValueOnce(
      new Promise((resolve, reject) => reject())
    );

    expect(LoginView).toBeTruthy();
    const wrapper = shallowMount(LoginView, { stubs: ["router-link"] });

    await wrapper.get("button").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").exists()).toBe(true);
    });
  });

  it("hide error message when login succeed", async () => {
    vi.mocked(authService.login).mockReturnValueOnce(
      new Promise((resolve) => resolve("token"))
    );

    expect(LoginView).toBeTruthy();
    const wrapper = shallowMount(LoginView, { stubs: ["router-link"] });

    await wrapper.get("button").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").exists()).toBe(false);
    });
  });
});
