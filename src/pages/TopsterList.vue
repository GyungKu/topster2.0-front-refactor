<template>
  <div class="home">
    <h2 class="title">탑스터 조회</h2>

    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard
            v-for="(topster, idx) in topsters"
            :key="idx"
            :topster="topster"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import TopsterCard from '@/components/TopsterCard.vue';

const topsters = ref([]);
const page = ref(1);
const size = ref(9);
const isLoading = ref(false);

const loadItems = async () => {
  if (!isLoading.value) {
    isLoading.value = true;
    try {
      const response = await axios.get(
        `topsters?page=${page.value}&size=${size.value}`,
      );
      const data = response.data.content;
      topsters.value = [...topsters.value, ...data];
      page.value += 1;
    } catch (error) {
      window.removeEventListener('scroll', handleScroll);
      alert('더 이상 불러올 데이터가 없습니다.');
    } finally {
      isLoading.value = false;
    }
  }
};

const handleScroll = () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
  if (nearBottom) {
    loadItems();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  loadItems();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
