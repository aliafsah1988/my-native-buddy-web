import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./services/api.service";
import TokenService from "./services/storage.service";
import { Plugin } from "vue-fragment";
import Notifications from "vue-notification";

Vue.use(Plugin);
Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// Set the base URL of the API
ApiService.init();

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}
