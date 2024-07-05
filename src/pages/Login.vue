<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
        type="username"
        class="form-control"
        id="floatingInput"
        v-model="username"
      />
      <label for="floatingInput" @keydown.enter="submit">아이디</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        v-model="password"
        @keydown.enter="submit"
      />
      <label for="floatingPassword">비밀번호</label>
    </div>

    <button class="btn btn-primary w-100 py-2" @click="submit">로그인</button>
    <a href="#" @click="kakaoLogin"
      ><img src="@/assets/kakao_login_medium.png"
    /></a>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const username = ref('');
const password = ref('');

const submit = () => {
  const userData = {
    username: username.value,
    password: password.value,
  };

  axios
    .post('/users/login', userData, { withCredentials: true })
    .then((res) => {
      const access = res.headers.authorization;
      const refresh = res.headers.refreshtoken;
      axios.defaults.headers.common.authorization = access;
      store.dispatch('setToken', access);
      const accessToken = {
        token: access,
        expire: Date.now() + 58 * 60 * 1000,
      };
      const refreshToken = {
        token: refresh,
        expire: Date.now() + 60 * 60 * 1000 * 24 * 7 - 6000,
      };
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      window.location.reload();
    })
    .then(() => router.push('/'))
    .catch(() => {
      alert('아이디 또는 비밀번호를 다시 확인해 주세요');
    });
};

const kakaoLogin = () => {
  const redirectUrl = process.env.VUE_APP_KAKAO_REDIRECT_URL;
  const clientId = process.env.VUE_APP_KAKAO_CLIENT_ID;
  const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
  window.location.href = authUrl;
};

onMounted(() => {
  if (store.state.token != null) router.push('/');
});
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='username'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
