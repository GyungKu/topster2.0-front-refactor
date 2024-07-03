<template>
  <div class="album-detail">
    <!-- 모달 내용 및 닫기 버튼 등을 추가 -->
    <div class="modal-content" v-if="props.album">
      <!-- 앨범 상세 정보를 표시하는 내용 -->
      <img :src="props.album.image" class="img" />
      <h2>{{ props.album.title }}</h2>
      <!-- 다른 앨범 정보 표시 -->
      <p>가수 {{ props.album.artist }}</p>
      <p>발매일 {{ props.album.releaseDate }}</p>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ album: {} });
const emit = defineEmits(['close-modal']);
const closeModal = () => emit('close-modal');
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
