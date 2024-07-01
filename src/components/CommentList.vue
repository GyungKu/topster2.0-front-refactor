<template>
  <div class="comment-list">
    <ul>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div v-if="!comment.isEditing">
          {{ comment.content }} - 작성자: {{ comment.author }} - 작성일: {{ formatDate(comment.createdAt) }}
        </div>
        <div v-if="comment.isEditing" class="editing-comment">
          <textarea v-model="comment.content" class="form-control"></textarea>
          <div class="comment-buttons">
            <button @click="editComment(comment)" class="btn btn-success btn-sm">저장</button>
            <button @click="comment.isEditing = false" class="btn btn-secondary btn-sm">취소</button>
          </div>
        </div>
        <div v-if="!comment.isEditing" class="comment-buttons">
          <button v-if="store.state.token" @click="toggleEdit(comment)" class="btn btn-primary btn-sm">수정</button>
          <button v-if="store.state.token" @click="deleteComment(comment.id)" class="btn btn-danger btn-sm">삭제</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/scripts/store";
import axios from "axios";

export default {
  computed: {
    store() {
      return store
    }
  },
  props: {
    comments: Array,
  },
  methods: {
    formatDate(createdAt) {
      const date = new Date(createdAt);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      return formattedDate;
    },

    toggleEdit(comment) {
      axios.get(`/comments/${comment.id}/isAuthor`)
      .then(() => {
        comment.isEditing = true;
      }).catch(() => {
        alert('본인의 댓글이 아닙니다.');
      })
    },

    cancelEdit(comment) {
      comment.isEditing = false;
    },

    editComment(comment) {
      this.$emit("editComment", comment);
    },

    deleteComment(id) {
      this.$emit("deleteComment", id);
    }

  },
};

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
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