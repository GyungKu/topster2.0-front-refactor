<template>
  <div>
    <TopsterCard :topster="topster" v-if="topster != null" :no-post="'no'" :centerAlign="true"/>

    <PostContent :post="post" />

    <CommentList :comments="comments" @delete-comment="deleteComment" @edit-comment="editComment" />
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1" class="pagination-button">이전</button>
      <span class="pagination-current-page">{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage >= lastPage" class="pagination-button">다음</button>
    </div>

    <CommentForm @submit-comment="submitComment" />
  </div>
</template>

<script>
import PostContent from "@/components/PostContent.vue";
import axios from 'axios';
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import router from "@/scripts/router";
import TopsterCard from "@/components/TopsterCard.vue";

export default {
  components: {
    TopsterCard,
    CommentList,
    PostContent,
    CommentForm
  },
  data() {
    return {
      post: {},
      comments: [],
      topster: null,
      currentPage: 1,
      lastPage: null,
    };
  },
  mounted() {
    // 게시글 정보와 댓글 목록을 불러오는 API 호출
    const postId = this.$route.params.postId;

    axios.get(`/posts/${postId}`)
    .then(response => {
      this.post = response.data;

      axios.get(`/topsters/${response.data.topsterId}`)
      .then((res) => {
        this.topster = res.data;
      })
    })
    .catch(() => {
      router.push('/posts');
      alert('존재하지 않는 게시글입니다.');
    });

    axios.get(`/posts/${postId}/comments`)
    .then(response => {
      this.comments = response.data.content;
      this.lastPage = response.data.totalPages;
    })
    .catch(() => {
      alert('댓글 목록을 불러오는 중 오류 발생:');
    });
  },


  methods: {
    submitComment(newComment,) {
      // 댓글 작성 API 호출
      const postId = this.$route.params.postId;
      axios.post(`/posts/${postId}/comments`, {
        content: newComment,
      })
      .then((res) => {
        if (res.data.code == '1009') {
          alert('로그인을 먼저 해주세요');
          const redirect = this.$route.path;
          router.push({name: 'login', query: {redirect: redirect}});
        }
        // 댓글 목록 다시 불러오기
        this.loadComments();
      })
      .catch(error => {
        console.error('댓글 작성 중 오류 발생:', error);
      });
    },

    loadComments() {
      // 댓글 목록을 다시 불러오는 API 호출
      const postId = this.$route.params.postId;
      axios.get(`/posts/${postId}/comments`, {
        params: {
          page: this.currentPage,
        }
      })
      .then(response => {
        this.comments = response.data.content;
        this.lastPage = response.data.totalPages;
      })
      .catch(error => {
        console.error('댓글 목록을 불러오는 중 오류 발생:', error);
      });
    },

    editComment(comment) {
      const dataForm = {
        content: comment.content,
      };
      axios.patch(`/comments/${comment.id}`, dataForm)
      .then(() => {
        alert('수정 성공');
        this.loadComments();
      })
      .catch(() => {
        alert('무언가 오류가 발생');
      })
    },

    deleteComment(commentId) {
      axios.delete(`/comments/${commentId}`)
      .then(() => {
        alert('삭제 완료');
        this.loadComments();
      })
      .catch(() => {
        alert('본인의 댓글이 아닙니다.');
      })
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadComments();
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {  // 현재 페이지가 마지막 페이지보다 작은 경우에만 다음 페이지로 이동
        this.currentPage++;
        this.loadComments();
      }
    },

  },
};
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