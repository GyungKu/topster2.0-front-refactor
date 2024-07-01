<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }} - {{ post.createdAt }}
      </li>
    </ul>
    <Pagination
        v-if="totalPages > 1"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  props: ["posts", "totalPages", "currentPage", "loading"],
  components: { Pagination },
  setup(props) {
    const handlePageChange = (page) => {
      if (!props.loading) {
        props.handlePageChange(page);
      }
    };

    return { handlePageChange };
  },
};
</script>