<!-- Footer.vue -->

<template>
  <footer>
    <div class="github-icons">
      <a
        v-for="(profile, index) in githubProfiles"
        :key="index"
        :href="profile.url"
        target="_blank"
      >
        <div class="github-icon-container">
          <img :src="profile.image" :alt="profile.alt" class="github-icon" />
          <p class="github-username">{{ profile.username }}</p>
        </div>
      </a>
    </div>
    <p class="copyright">&copy; 2024 Topster 2</p>
  </footer>
</template>

<script setup>
const githubProfiles = [
  {
    url: 'https://github.com/GyungKu/topster2.0',
    image: 'https://cdn-icons-png.flaticon.com/256/25/25231.png',
    alt: 'GitHub Profile 1',
    username: 'Backend',
  },
  {
    url: 'https://github.com/GyungKu/topster-front',
    image: 'https://cdn-icons-png.flaticon.com/256/25/25231.png',
    alt: 'GitHub Profile 2',
    username: 'Frontend',
  },
];
</script>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.github-icons {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.github-icon-container {
  margin: 0 10px; /* 각 로고 간격을 원하는 만큼 조절 가능 */
}

.github-icon {
  width: 70px; /* 조절 가능한 이미지 크기 */
  height: 70px;
  margin-bottom: 5px; /* 각 로고 아래 간격 조절 */
}

.github-username {
  color: white; /* 사용자 이름 색상 조절 가능 */
}

.copyright {
  margin-top: 10px;
}
</style>
