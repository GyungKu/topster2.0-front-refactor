<template>
  <div>
    <TopsterCard v-if="topster != null" :topster="topster" :no-btn="'no'" :center-align="true" />
    <form @submit.prevent="submitPost">
      <label for="title">제목:</label>
      <input type="text" v-model="post.title" id="title" required>

      <label for="content">내용:</label>
      <textarea v-model="post.content" id="content" required></textarea>

      <button type="submit">게시글 수정</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/scripts/router";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  components: {
    TopsterCard,
  },

  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      topster:null,
      topsterId: 0,
    }
  },

  created() {
    const postId = this.$route.params.postId;

    axios.get(`/posts/${postId}`)
    .then(response => {
      this.post = response.data;
      this.topsterId = response.data.topsterId;

      axios.get(`/topsters/${this.topsterId}`)
      .then((res) => {
        this.topster = res.data;
      });
    })
    .catch(error => {
      console.error('게시글 정보를 불러오는 중 오류 발생:', error);
    });

  },

  methods: {
    submitPost() {
      const formData = {
        title: this.post.title,
        content: this.post.content,
      };

      const postId = this.$route.params.postId;
      axios.patch(`/posts/${postId}`, formData)
      .then(() => {
        alert("수정 완료!");
        router.push(`/posts/${postId}`);
      })
      .catch((err) => {
        alert(err.response.data.message);
        router.push('/');
      })
    }

  }

}
;
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>