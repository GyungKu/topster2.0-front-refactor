<template>
  <div class="comment-list">
    <ul>
      <li
        v-for="comment in props.comments"
        :key="comment.id"
        class="comment-item"
      >
        <div v-if="!comment.isEditing">
          {{ comment.content }} - 작성자: {{ comment.author }} - 작성일:
          {{ formatDate(comment.createdAt) }}
        </div>
        <div v-if="comment.isEditing" class="editing-comment">
          <textarea v-model="comment.content" class="form-control"></textarea>
          <div class="comment-buttons">
            <button
              @click="editComment(comment)"
              class="btn btn-success btn-sm"
            >
              저장
            </button>
            <button @click="cancelEdit" class="btn btn-secondary btn-sm">
              취소
            </button>
          </div>
        </div>
        <div v-if="comment.isEditing" class="comment-buttons">
          <button
            v-if="store.state.token"
            @click="toggleEdit(comment)"
            class="btn btn-primary btn-sm"
          >
            수정
          </button>
          <button
            v-if="store.state.token"
            @click="deleteComment(comment.id)"
            class="btn btn-danger btn-sm"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const props = defineProps({ comments: [] });
const emit = defineEmits(['editComment', 'deleteComment']);
const store = useStore();
const isEditing = ref(false);

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
  return formattedDate;
};

const toggleEdit = (comment) => {
  axios
    .get(`/comments/${comment.id}/isAuthor`)
    .then(() => {
      isEditing.value = true;
    })
    .catch(() => {
      isEditing.value = false;
      alert('본인의 댓글이 아닙니다.');
    });
};

const cancelEdit = () => {
  isEditing.value = false;
};

const editComment = (comment) => {
  emit('editComment', comment);
};

const deleteComment = (id) => {
  emit('deleteComment', id);
};
</script>

<style scoped>
.comment-list {
  margin-top: 10px;
}

.comment-item {
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editing-comment {
  flex: 1; /* 시도: 자식이 확장되도록 flex 속성 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수정: 가로 중앙 정렬 추가 */
}

.comment-buttons {
  display: flex;
  gap: 5px;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
