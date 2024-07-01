<template>
  <form @submit.prevent="submitComment" class="comment-form">
    <label for="newComment" class="form-label">댓글 작성:</label>
    <div class="form-input-container">
      <textarea v-model="newComment" id="newComment" class="form-textarea" required></textarea>
      <button type="submit" class="form-button">댓글 작성</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newComment: "",
    };
  },
  methods: {
    submitComment() {
      this.$emit("submit-comment", this.newComment);
      this.newComment = ""; // 작성한 댓글 초기화
    },
  },
};
</script>

<style scoped>
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
  background-color: #4CAF50;
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