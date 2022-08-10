import { createApp } from "vue";
import App from "./App.vue";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";
import axios from "../src/http";
import * as ElIconModules from "@element-plus/icons-vue";
const app = createApp(App); //建立一个vue3app

app.config.productionTip = false;
app.config.globalProperties.$axios = axios;
Object.keys(ElIconModules).forEach(function (key) {
  app.component(ElIconModules[key].name, ElIconModules[key]);
});
app.use(store).use(router).use(elementPlus).mount("#app");
