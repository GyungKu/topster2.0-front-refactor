<template>
  <form @submit.prevent="submitSort">
    <label for="sortBy">정렬 기준:</label>
    <select v-model="sortBy" id="sortBy">
      <option value="createdAt">생성일</option>
      <option value="title">제목</option>
    </select>

    <label for="sortOrder">정렬 순서:</label>
    <select v-model="sortOrder" id="sortOrder">
      <option value="asc">오름차순</option>
      <option value="desc">내림차순</option>
    </select>

    <button type="submit">적용</button>
  </form>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      sortBy: this.value,
      sortOrder: "desc", // 초기값
    };
  },
  methods: {
    submitSort() {
      this.$emit("submit-sort", this.sortBy, this.sortOrder);
    },
  },
};
</script>