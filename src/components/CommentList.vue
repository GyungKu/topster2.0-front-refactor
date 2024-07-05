<template>
  <div class="comment-list">
    <ul>
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div v-if="!isEditing(comment.id)">
          {{ comment.content }} - 작성자: {{ comment.author }} - 작성일:
          {{ formatDate(comment.createdAt) }}
        </div>
        <div v-if="isEditing(comment.id)" class="editing-comment">
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
        <div
          v-if="store.state.token && !isEditing(comment.id)"
          class="comment-buttons"
        >
          <button
            @click="toggleEdit(comment.id)"
            class="btn btn-primary btn-sm"
          >
            수정
          </button>
          <button
            @click="deleteComment(comment.id)"
            class="btn btn-danger btn-sm"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>
  </div>

  <div class="pagination">
    <button
      @click="prevPage"
      :disabled="currentPage <= 1"
      class="pagination-button"
    >
      이전
    </button>
    <span class="pagination-current-page">{{ currentPage }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage >= lastPage"
      class="pagination-button"
    >
      다음
    </button>
  </div>

  <form @submit.prevent="submitComment" class="comment-form">
    <label for="newComment" class="form-label">댓글 작성:</label>
    <div class="form-input-container">
      <textarea
        v-model="newComment"
        id="newComment"
        class="form-textarea"
        required
      ></textarea>
      <button type="submit" class="form-button">댓글 작성</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({ postId: Number });
const router = useRouter();
const route = useRoute();
const store = useStore();
const currentPage = ref(1);
const lastPage = ref(0);
const comments = ref([]);
const editingCommentIds = ref([]);
const newComment = ref('');

const loadComments = () => {
  // 댓글 목록을 다시 불러오는 API 호출
  axios
    .get(`/posts/${props.postId}/comments`, {
      params: {
        page: currentPage.value,
      },
    })
    .then((response) => {
      comments.value = response.data.content;
      lastPage.value = response.data.totalPages;
    })
    .catch((error) => {
      console.error('댓글 목록을 불러오는 중 오류 발생:', error);
    });
};

const submitComment = () => {
  axios
    .post(`/posts/${props.postId}/comments`, {
      content: newComment.value,
    })
    .then((res) => {
      if (res.data.code === '1009') {
        alert('로그인을 먼저 해주세요');
        const redirect = route.path;
        router.push({ name: 'login', query: { redirect } });
      }
      newComment.value = '';
      loadComments();
    })
    .catch((error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    });
};

const editComment = async (comment) => {
  const dataForm = {
    content: comment.content,
  };
  await axios
    .patch(`/comments/${comment.id}`, dataForm)
    .then(() => {
      alert('수정 성공');
      cancelEdit(comment.id);
      loadComments();
    })
    .catch(() => {
      alert('무언가 오류가 발생');
    });
};

const deleteComment = (commentId) => {
  axios
    .delete(`/comments/${commentId}`)
    .then(() => {
      alert('삭제 완료');
      loadComments();
    })
    .catch(() => {
      alert('본인의 댓글이 아닙니다.');
    });
};

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
  return formattedDate;
};

const isEditing = (commentId) => {
  return editingCommentIds.value.includes(commentId);
};

const toggleEdit = (commentId) => {
  axios
    .get(`/comments/${commentId}/isAuthor`)
    .then(() => {
      editingCommentIds.value.push(commentId);
    })
    .catch(() => {
      alert('본인의 댓글이 아닙니다.');
    });
};

const cancelEdit = (commentId) => {
  editingCommentIds.value = editingCommentIds.value.filter(
    (id) => id !== commentId,
  );
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    loadComments();
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    // 현재 페이지가 마지막 페이지보다 작은 경우에만 다음 페이지로 이동
    currentPage.value += 1;
    loadComments();
  }
};

watch(
  () => props.postId,
  (postId) => {
    if (postId) {
      loadComments();
      console.log(`watch = ${postId}`);
    }
  },
);

onMounted(() => {
  if (props.postId) {
    loadComments();
    console.log(props.postId);
  }
});
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 10px;
  margin: 0 5px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.pagination-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination-current-page {
  padding: 10px;
}

.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-label {
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
}

.form-input-container {
  display: flex;
  align-items: center;
  width: 50%; /* 폼 전체 폭을 사용 */
}

.form-textarea {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  flex: 1; /* 입력칸이 남은 공간을 모두 차지하도록 */
  box-sizing: border-box; /* padding, border를 포함한 전체 크기로 설정 */
}

.form-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px; /* 입력칸과의 간격 조절 */
}

.form-button:hover {
  background-color: #45a049;
}
</style>
