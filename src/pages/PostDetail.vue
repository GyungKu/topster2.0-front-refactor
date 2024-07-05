<template>
  <div>
    <TopsterCard
      :topster="topster"
      v-if="topster != null"
      :no-post="'no'"
      :centerAlign="true"
    />

    <PostContent :post="post" />

    <CommentList
      :comments="comments"
      @delete-comment="deleteComment"
      @edit-comment="editComment"
    />
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

    <CommentForm @submit-comment="submitComment" />
  </div>
</template>

<script setup>
import CommentForm from '@/components/CommentForm.vue';
import CommentList from '@/components/CommentList.vue';
import PostContent from '@/components/PostContent.vue';
import TopsterCard from '@/components/TopsterCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref({});
const comments = ref([]);
const topster = ref({});
const currentPage = ref(1);
const lastPage = ref(0);

const submitComment = (newComment) => {
  const { postId } = route.params;
  axios
    .post(`/posts/${postId}/comments`, {
      content: newComment,
    })
    .then((res) => {
      if (res.data.code === '1009') {
        alert('로그인을 먼저 해주세요');
        const redirect = route.path;
        router.push({ name: 'login', query: { redirect } });
      }
      // 댓글 목록 다시 불러오기
      this.loadComments();
    })
    .catch((error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    });
};

const loadComments = () => {
  // 댓글 목록을 다시 불러오는 API 호출
  const { postId } = route.params.id;
  axios
    .get(`/posts/${postId}/comments`, {
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

const editComment = (comment) => {
  const dataForm = {
    content: comment.content,
  };
  axios
    .patch(`/comments/${comment.id}`, dataForm)
    .then(() => {
      alert('수정 성공');
      this.loadComments();
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
      this.loadComments();
    })
    .catch(() => {
      alert('본인의 댓글이 아닙니다.');
    });
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
    this.loadComments();
  }
};

onMounted(() => {
  // 게시글 정보와 댓글 목록을 불러오는 API 호출
  const { postId } = route.params;

  axios
    .get(`/posts/${postId}`)
    .then((response) => {
      post.value = response.data;

      axios.get(`/topsters/${response.data.topsterId}`).then((res) => {
        topster.value = res.data;
      });
    })
    .catch(() => {
      router.push('/posts');
      alert('존재하지 않는 게시글입니다.');
    });

  axios
    .get(`/posts/${postId}/comments`)
    .then((response) => {
      comments.value = response.data.content;
      lastPage.value = response.data.totalPages;
    })
    .catch(() => {
      alert('댓글 목록을 불러오는 중 오류 발생:');
    });
});
</script>

<style scoped>
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
</style>
