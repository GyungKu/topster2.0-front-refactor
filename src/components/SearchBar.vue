<template>
  <div id="board-search">
    <div class="container">
      <div class="search-window">
        <div class="search-wrap">
          <select v-model="searchCond.searchKey">
            <option
              v-for="(item, idx) in selectList"
              :key="idx"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
          <input
            id="search"
            type="search"
            name=""
            placeholder="검색어를 입력해주세요."
            value=""
            v-model="searchCond.query"
            @keydown.enter="searchPost(searchCond)"
          />
          <button
            type="submit"
            class="btn btn-dark"
            @click="searchPost(searchCond)"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  my: {
    type: [String],
    default: null,
  },
});

const emit = defineEmits(['searchCond']);

const selectList = ref([]);
const searchCond = ref({
  searchKey: '',
  query: '',
});

if (props.my === null) {
  selectList.value = [
    { name: '선택해주세요', value: '' },
    { name: '제목', value: 'title' },
    { name: '내용', value: 'content' },
    { name: '작성자', value: 'author' },
  ];
} else {
  selectList.value = [
    { name: '선택해주세요', value: '' },
    { name: '제목', value: 'title' },
    { name: '내용', value: 'content' },
  ];
}

const searchPost = (searchCondition) => {
  emit('searchCond', searchCondition);
};
</script>
