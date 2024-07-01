<script>

import axios from "axios";
import router from "@/scripts/router";

export default {

  data() {
    return {
      code: null,
    }
  },

  created() {
    this.code = this.$route.query.code;
    axios.get(`/users/kakao/callback?code=` + this.code)
    .then((res) => {
      const access = res.headers['authorization'];
      const refresh = res.headers['refreshtoken'];
      axios.defaults.headers.common['authorization'] = access;
      this.$store.dispatch('setToken', access);
      const accessToken = {
        token: access,
        expire: Date.now() + (58 * 60 * 1000),
      }
      const refreshToken = {
        token: refresh,
        expire: Date.now() + (60 * 60 * 1000 * 24 * 7) - 6000
      }
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    }).then(() => router.push('/'))
  },



}

</script>