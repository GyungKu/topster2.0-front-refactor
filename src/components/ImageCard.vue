<template>
  <div class="topster-card" @click="handleCardClick">
    <img :src="props.albumImage" alt="Item Image" class="item-img" />
  </div>
</template>

<script setup>
const props = defineProps({
  album: {},
  albumImage: String,
});
const emit = defineEmits(['card-clicked']);

const handleCardClick = () => {
  emit('card-clicked', props.album);
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
