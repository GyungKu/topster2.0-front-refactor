<template>
  <div class="post-content">
    <h2>{{ props.post.title }}</h2>
    <p>{{ props.post.content }}</p>
    <div class="meta-info">
      <p>작성자: {{ props.post.author }}</p>
      <p>작성일: {{ formatDate(props.post.createdAt) }}</p>
    </div>
    <div class="buttons" v-if="store.state.token !== null">
      <!-- 수정 버튼 -->
      <button @click="editPost" class="edit-button">수정</button>
      <!-- 삭제 버튼 -->
      <button @click="deletePost" class="delete-button">삭제</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import router from '@/scripts/router';
import { useStore } from 'vuex';

const props = defineProps({ post: {} });
const store = useStore();

const formatDate = (dateTimeString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

const deletePost = () => {
  axios
    .delete(`/posts/${post.value.id}`)
    .then((res) => {
      alert(res.data.message);
      router.push({ name: 'board' });
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

const editPost = () => {
  axios
    .get(`/posts/${post.value.id}/isAuthor`)
    .then(() => {
      router.push({ name: 'postEdit', params: { postId: post.value.id } });
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
</script>

<style scoped>
.post-content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

p {
  color: #666;
}

.meta-info {
  margin-top: 15px;
  font-size: 14px;
  color: #888;
}

.buttons {
  margin-top: 20px;
}

.edit-button,
.delete-button {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50; /* 수정 버튼 색상 */
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.delete-button {
  background-color: #f44336; /* 삭제 버튼 색상 */
}

.edit-button:hover,
.delete-button:hover {
  background-color: #45a049; /* 버튼에 호버 효과 시 색상 변경 */
}

/* 추가적인 스타일링을 원하시면 여기에 계속 추가할 수 있습니다. */
</style>
