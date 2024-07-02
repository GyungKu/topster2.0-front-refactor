<script setup>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import useStore from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const code = ref('');

onMounted(() => {
  code.value = route.query.code;
  axios
    .get(`/users/kakao/callback?code=${code.value}`)
    .then((res) => {
      const access = res.headers.authorization;
      const refresh = res.headers.refreshtoken;
      axios.defaults.headers.common.authorization = access;
      store.dispatch('setToken', access);
      const accessToken = {
        token: access,
        expire: Date.now() + 58 * 60 * 1000,
      };
      const refreshToken = {
        token: refresh,
        expire: Date.now() + 60 * 60 * 1000 * 24 * 7 - 6000,
      };
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    })
    .then(() => router.push('/'));
});
</script>
