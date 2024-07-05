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

<script setup>
import { ref } from 'vue';

const props = defineProps({ value: String });
const emit = defineEmits(['submit-sort']);
const sortBy = ref(props.value);
const sortOrder = ref('desc');

const submitSort = () => {
  emit('submit-sort', sortBy.value, sortOrder.value);
};
</script>
