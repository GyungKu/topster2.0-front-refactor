<template>
  <div class="topster-container">
    <TopsterCard v-for="(image, index) in topster.images" :key="index" :albumImage="image.url" />
    <div v-for="emptyIndex in Math.max(9 - topster.images.length, 0)" :key="`empty-${emptyIndex}`" class="item empty"></div>
  </div>
</template>

<script>
import TopsterCard from "@/components/ImageCard.vue";

export default {
  props: {
    topster: Object,
  },
  components: { TopsterCard },
};
</script>

<style scoped>
/* Add styles for topster-container if needed */
</style>