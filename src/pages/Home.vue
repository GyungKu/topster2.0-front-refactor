<template>
  <div class="home">

    <div class="album py-5 bg-body-tertiary">
      <div class="container">

        <h2 class="title">좋아요 Top 3</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <TopsterCard v-for="(topster, idx) in state.topsters" :key="idx" :topster="topster" no-post="no" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, reactive} from "vue";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  name: "Home",
  components: {TopsterCard,},
  setup() {
    const state = reactive({
      topsters: []
    });
    onMounted(() => {

      // if (this.$router.currentRoute.meta.headers && this.$router.currentRoute.meta.headers.authorization) {
      //   const headers = this.$router.currentRoute.meta.headers;
      //   const access = headers.authorization;
      //   const refresh = headers.refreshToken;
      //   axios.defaults.headers.common['authorization'] = access;
      //   this.$store.dispatch('setToken', access);
      //   const accessToken = {
      //     token: access,
      //     expire: Date.now() + (58 * 60 * 1000),
      //   }
      //   const refreshToken = {
      //     token: refresh,
      //     expire: Date.now() + (60 * 60 * 1000 * 24 * 7) - 6000
      //   }
      //   localStorage.setItem("accessToken", JSON.stringify(accessToken));
      //   localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
      //   location.reload();
      // }

      axios.get(`/topsters/top-three`).then((res) => {
        state.topsters = res.data;
      })
    })
    return {state}
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin: 0 auto 30px auto;
}
</style>