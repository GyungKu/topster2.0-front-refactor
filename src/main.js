import {createApp} from 'vue'
import store from "@/scripts/store";
import router from "@/scripts/router";
import App from './App.vue'
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = '/api/v1';
axios.defaults.headers.common['Content-Type'] = 'application/json';

router.beforeEach((to, from, next) => {

  const accessToken = localStorage.getItem("accessToken");

  // access token이 존재하고, 유효기간이 지나지 않았다면 이동
  if (accessToken && Date.now() < accessToken.expire) {
    next();
    return;
  }

  localStorage.removeItem("accessToken"); // localStorage에 있는 accessToken을 제거
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  if (!refreshToken || Date.now() >= refreshToken.expire) {
    axios.defaults.headers.common['authorization'] = null;
    localStorage.removeItem("refreshToken");

    const needLogin = ['mypage', 'topsterRegister', 'postRegister'];
    if (needLogin.includes(to.name)) {
      alert('로그인이 필요합니다');
      next({
        name: 'login',
        query: {redirect: to.fullPath},
      });
    }
    next();
    return;
  }

  axios.get("/users/refresh-token", {
    headers: {
      refreshToken: refreshToken.token
    }
  }).then(res => {
    const newAccess = res.headers['authorization'];
    const accessToken = {
      token: newAccess,
      expire: Date.now() + (58 * 60 * 1000),
    }
    axios.defaults.headers.common['authorization'] = newAccess;
    store.commit('setToken', newAccess);
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    next();
  })

})

app.config.globalProperties.axios = axios;

app.use(store).use(router).mount('#app');
