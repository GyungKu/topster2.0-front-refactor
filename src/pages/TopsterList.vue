<template>
  <div class="home">
    <h2 class="title">탑스터 조회</h2>

    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard v-for="(topster, idx) in topsters" :key="idx" :topster="topster"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  components: {TopsterCard},
  setup() {
    const topsters = ref([])
    let page = 1
    const size = 9

    let isLoading = false;

    const loadItems = async () => {
      if (!isLoading) {
        isLoading = true;
        try {
          const response = await axios.get(`topsters?page=${page}&size=${size}`)
          const data = response.data.content;
          topsters.value = [...topsters.value, ...data];
          page++;
        } catch (error) {
          window.removeEventListener('scroll', handleScroll);
          alert('더 이상 불러올 데이터가 없습니다.');
        } finally {
          isLoading = false;
        }
      }
    }

    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
      if (nearBottom) {
        loadItems();
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      loadItems();
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    })

    return {
      topsters
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>