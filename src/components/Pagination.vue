<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="props.page === 1">이전</button>
    <span v-for="pageNumber in totalPageArray" :key="pageNumber">
      <button
        :disabled="props.page === pageNumber"
        @click="gotoPage(pageNumber)"
        :class="{ active: pageNumber === props.page }"
      >
        {{ pageNumber }}
      </button>
    </span>
    <button @click="nextPage" :disabled="props.page === props.totalPages">
      다음
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ page: Number, totalPages: Number });
const emit = defineEmits(['pageChange']);

const prevPage = () => {
  if (props.page > 1) {
    emit('pageChange', props.page - 1);
  }
};

const nextPage = () => {
  if (props.page < props.totalPages) {
    emit('pageChange', props.page + 1);
  }
};

const gotoPage = (pageNumber) => {
  emit('pageChange', pageNumber);
};

const totalPageArray = computed(() => {
  return Array.from({ length: props.totalPages }, (_, index) => index + 1);
});
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
