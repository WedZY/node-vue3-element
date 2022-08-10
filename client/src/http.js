import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import router from "./router";

function startLoading() {
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: 'Loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  // setTimeout(() => {
  //   loading.close();
  // }, 2000);
}

// function endLoading() {

// }

// 请求拦截

axios.interceptors.request.use(
  (config) => {
    // startLoading();
    if (localStorage.eleToken) {
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 错误提醒
    const { status } = error.response;
    if (status === 401) {
      ElMessage.error("token失效,请重新登录");
      router.push("/login");
    }
    if (status === 301) {
      ElMessage.error("用户不存在，请先去注册");
    } else {
      ElMessage.error("网络繁忙，请稍后重试");
    }

    return Promise.reject(error);
  }
);

export default axios;
