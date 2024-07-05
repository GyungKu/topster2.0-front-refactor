<template>
  <div>
    <TopsterCard
      v-if="topster != null"
      :topster="topster"
      :no-btn="'no'"
      :center-align="true"
    />
    <form @submit.prevent="submitPost">
      <label for="title">제목:</label>
      <input type="text" v-model="post.title" id="title" required />

      <label for="content">내용:</label>
      <textarea v-model="post.content" id="content" required></textarea>

      <button type="submit">게시글 수정</button>
    </form>
  </div>
</template>

<script setup>
import TopsterCard from '@/components/TopsterCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref({
  title: '',
  content: '',
});
const topster = ref({});
const topsterId = ref(0);
const route = useRoute();
const router = useRouter();

const submitPost = () => {
  const formData = {
    title: post.value.title,
    content: post.value.content,
  };

  const { postId } = route.params;
  axios
    .patch(`/posts/${postId}`, formData)
    .then(() => {
      alert('수정 완료!');
      router.push(`/posts/${postId}`);
    })
    .catch((err) => {
      alert(err.response.data.message);
      router.push('/');
    });
};

onMounted(() => {
  const { postId } = route.params;

  axios
    .get(`/posts/${postId}`)
    .then((response) => {
      post.value = response.data;
      topsterId.value = response.data.topsterId;

      axios.get(`/topsters/${topsterId.value}`).then((res) => {
        topster.value = res.data;
      });
    })
    .catch((error) => {
      console.error('게시글 정보를 불러오는 중 오류 발생:', error);
    });
});
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
  background-color: #4caf50;
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
