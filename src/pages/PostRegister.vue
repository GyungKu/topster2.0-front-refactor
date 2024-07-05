<template>
  <div>
    <TopsterCard :topster="topster" :no-btn="'no'" v-if="topster != null" />
    <form @submit.prevent="submitPost">
      <label for="title"
        >제목:
        <p class="inputError" v-if="titleError != null">
          {{ titleError.message }}
        </p></label
      >
      <input type="text" v-model="title" id="title" required />

      <label for="content"
        >내용:
        <p class="inputError" v-if="contentError != null">
          {{ contentError.message }}
        </p></label
      >
      <textarea v-model="content" id="content" required></textarea>

      <button type="submit">게시글 작성</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const topster = ref({});
const route = useRoute();
const router = useRouter();
const id = ref(0);
const title = ref('');
const content = ref('');
const titleError = ref(null);
const contentError = ref(null);

const submitPost = () => {
  const formData = {
    title: this.title,
    content: this.content,
  };

  const { topsterId } = route.params;

  axios
    .post(`/topster/${topsterId}/posts`, formData)
    .then((res) => {
      const postId = res.data.message;
      alert('등록 완료!');
      router.push({ name: 'postDetail', params: { postId } });
    })
    .catch((err) => {
      const errors = err.response.data.data;
      titleError.value = null;
      contentError.value = null;
      errors.forEach((error) => {
        const { field } = error;
        if (field === 'title') {
          titleError.value = error;
        }
        if (field === 'content') {
          contentError.value = error;
        }
      });
    });
};

onMounted(() => {
  id.value = route.params.topsterId;
  axios
    .get(`/topsters/${id.value}`)
    .then((res) => {
      topster.value = res.data;
    })
    .catch((err) => {
      const errInfo = err.response;
      alert(errInfo.data);
      router.push('/');
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

.inputError {
  color: red;
}
</style>
