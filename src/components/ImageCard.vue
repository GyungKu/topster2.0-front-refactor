<template>
  <div class="topster-card" @click="handleCardClick">
    <img :src="albumImage" alt="Item Image" class="item-img" />
  </div>
</template>

<script>
export default {
  props: {
    album: Object,
    albumImage: String
  },
  methods: {
    handleCardClick() {
      // 부모 컴포넌트에 클릭 이벤트를 전달
      this.$emit("card-clicked", this.album);
    },
  }
};
</script>

<style scoped>
.topster-card {
  width: 100%; /* 변경: 컨테이너가 가득 차도록 설정 */
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>