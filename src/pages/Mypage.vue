<template>
  <div>
    <h1>내 정보 페이지</h1>
    <router-link :to="{name: 'myProfile'}" class="mypage-button">내 프로필</router-link>
    <router-link :to="{name: 'myTopster'}" class="mypage-button">내 탑스터</router-link>
    <router-link :to="{name: 'myPosts'}" class="mypage-button">내 게시글</router-link>
  </div>
</template>

<script>
export default {
  name: "Mypage",
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.mypage-button, router-link {
  background-color: #555; /* 회색으로 변경 */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  text-decoration: none; /* 밑줄 제거 */
}

button:hover, router-link:hover {
  background-color: #333; /* 호버 시 어두운 회색으로 변경 */
}
</style>