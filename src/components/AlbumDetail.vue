<template>
  <div class="album-detail">
    <!-- 모달 내용 및 닫기 버튼 등을 추가 -->
    <div class="modal-content" v-if="album">
      <!-- 앨범 상세 정보를 표시하는 내용 -->
      <img :src="album.image" class="img">
      <h2>{{ album.title }}</h2>
      <!-- 다른 앨범 정보 표시 -->
      <p>가수 {{ album.artist }}</p>
      <p>발매일 {{ album.releaseDate }}</p>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: Object, // 부모로부터 받은 앨범 정보
  },
  methods: {
    closeModal() {
      // 부모에게 모달 닫기 이벤트 전달
      this.$emit("close-modal");
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
/* 모달 스타일을 추가하고 필요한 경우 중앙 정렬 및 스타일링을 수행합니다. */
.album-detail {
  /* 모달 스타일 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 기타 스타일링 */
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
}
.img {
  width: 500px;
  height: 500px;
}
</style>