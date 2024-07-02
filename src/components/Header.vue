<template>
  <header data-bs-theme="dark">
    <div class="collapse text-bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <h4>사이트맵</h4>
          <div class="col-sm-4 py-4">
            <ul class="list-unstyled">
              <li>
                <router-link :to="{ name: 'home' }" class="text-white"
                  >메인화면</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'login' }"
                  class="text-white"
                  v-if="!store.state.token"
                  >로그인</router-link
                >
                <a href="#" class="text-white" @click="logout()" v-else
                  >로그아웃</a
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'signup' }"
                  class="text-white"
                  v-if="!store.state.token"
                  >회원가입</router-link
                >
              </li>
            </ul>
          </div>

          <div class="col-sm-4 py-4">
            <ul class="list-unstyled">
              <li>
                <router-link
                  :to="{ name: 'topsterRegister' }"
                  class="text-white"
                  v-if="store.state.token"
                  >탑스터 등록</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'topsters' }" class="text-white"
                  >탑스터 조회</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'board' }" class="text-white"
                  >게시판</router-link
                >
              </li>
            </ul>
          </div>

          <div class="col-sm-4 py-4" v-if="store.state.token">
            <ul class="list-unstyled">
              <li>
                <router-link :to="{ name: 'mypage' }" class="text-white"
                  >마이페이지</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'myProfile' }" class="text-white"
                  >내 프로필</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'myTopster' }" class="text-white"
                  >내 탑스터</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'myPosts' }" class="text-white"
                  >내 게시글</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <a href="/" class="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            aria-hidden="true"
            class="me-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <strong>Topster2</strong>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';

defineOptions({ name: 'CustomHeader' });

const store = useStore();

const logout = () => {
  store.dispatch('logout');
  window.location.reload();
};
</script>
<style scoped>
.text-white {
  text-decoration: none;
}
</style>
