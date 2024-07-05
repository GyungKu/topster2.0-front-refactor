<template>
  <div class="container">
    <div class="up">
      <font size="4px" style="font-weight: bold">{{ userInfo.username }}</font>
      <br /><br />
      <font color="#888888">
        {{ userInfo.email }}
      </font>
      <router-link :to="{ name: 'profileEdit' }" class="settingbutton"
        >프로필 수정</router-link
      >
    </div>

    <hr size="1px" color="#CCCCCC" />

    <img
      src="https://cdn.pixabay.com/photo/2023/09/13/07/29/ghost-8250317_1280.png"
      width="130px"
      height="130px"
      alt="프로필 사진"
    />

    <ul class="gray">
      <li>아이디</li>
      <li>닉네임</li>
      <li>자기소개</li>
      <li>이메일</li>
    </ul>

    <ul>
      <li>{{ userInfo.username }}</li>
      <li>{{ userInfo.nickname }}</li>
      <li>{{ userInfo.intro }}</li>
      <li>{{ userInfo.email }}</li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userInfo = ref({});
const router = useRouter();

onMounted(() => {
  axios
    .get('/users')
    .then((res) => {
      userInfo.value = res.data;
    })
    .catch(() => {
      alert('로그인을 먼저 해주세요!!!');
      router.push({ name: 'login' });
    });
});
</script>

<style scoped>
.container {
  margin: 200px auto;
  width: 600px;
  border: solid 5px #eeeeee;
  padding: 20px;
}

.up {
  position: relative;
}

.settingbutton {
  position: absolute;
  right: 0;
  top: 10px;
  padding: 3px 11px;
  color: #3b72ff;
  border: solid 1px;
  border-radius: 26px;
  font-size: 15px;
  text-decoration: none;
}

.down {
  position: relative;
}

img {
  border-radius: 130px;
}

ul {
  list-style-type: none;
  display: inline-block;
}

li {
  margin: 5px 0px;
}

ul.gray {
  color: #88888a;
}

a {
  color: black;
}
</style>
