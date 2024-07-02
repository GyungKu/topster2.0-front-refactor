<template>
  <div class="topster-card" @click="handleCardClick">
    <img :src="albumImage" alt="Item Image" class="item-img" />
  </div>
</template>

<script setup>
import { defineProps, defineOptions } from 'vue';

const props = defineProps({
  album: {},
  albumImage: String,
});
const { album } = props;
const { albumImage } = props;
const emit = defineEmit(['card-clicked']);

const handleCardClick = () => {
  emit('card-clicked', album);
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
