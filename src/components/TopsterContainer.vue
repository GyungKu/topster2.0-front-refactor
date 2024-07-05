<template>
  <div class="topster-container">
    <ImageCard
      v-for="(image, index) in props.topster.images"
      :key="index"
      :albumImage="image.url"
    />
    <div
      v-for="emptyIndex in Math.max(9 - props.topster.images.length, 0)"
      :key="`empty-${emptyIndex}`"
      class="item empty"
    ></div>
  </div>
</template>

<script setup>
import ImageCard from './ImageCard.vue';

const props = defineProps({ topster: {} });
</script>
