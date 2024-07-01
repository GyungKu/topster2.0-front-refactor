<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="page === 1">이전</button>
    <span v-for="pageNumber in totalPageArray" :key="pageNumber">
      <button :disabled="page === pageNumber" @click="gotoPage(pageNumber)" :class="{ active: pageNumber === page }">{{ pageNumber }}</button>
    </span>
    <button @click="nextPage" :disabled="page === totalPages">다음</button>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 계산된 속성을 통해 페이지 숫자 배열 생성
    totalPageArray() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },
  methods: {
    prevPage() {
      if (this.page > 1) {
        this.$emit('pageChange', this.page - 1);
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.$emit('pageChange', this.page + 1);
      }
    },
    gotoPage(pageNumber) {
      this.$emit('pageChange', pageNumber);
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

.pagination button {
  background-color: #2c3e50;
  color: #fff;
  border: 1px solid #2c3e50;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #1d2731;
  border-color: #1d2731;
}

.pagination button:disabled {
  background-color: #4a627a;
  color: #7f8c8d;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #34495e;
  border-color: #34495e;
}
</style>