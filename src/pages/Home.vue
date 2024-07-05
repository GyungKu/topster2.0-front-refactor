<template>
  <div class="home">
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <h2 class="title">좋아요 Top 3</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard
            v-for="(topster, idx) in topsters"
            :key="idx"
            :topster="topster"
            no-post="no"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import TopsterCard from '@/components/TopsterCard.vue';

defineOptions({ name: 'Home' });
const topsters = ref([]);

onMounted(() => {
  axios.get(`/topsters/top-three`).then((res) => {
    topsters.value = res.data;
  });
});
</script>

<style scoped>
.title {
  text-align: center;
  margin: 0 auto 30px auto;
}
</style>
