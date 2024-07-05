<template>
  <div>
    <TopsterCard :topster="topster" :no-post="'no'" :centerAlign="true" />

    <PostContent :post="post" />

    <CommentList
      :postId="post.id"
      @delete-comment="deleteComment"
      @edit-comment="editComment"
    />
  </div>
</template>

<script setup>
import CommentList from '@/components/CommentList.vue';
import PostContent from '@/components/PostContent.vue';
import TopsterCard from '@/components/TopsterCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref({});
const topster = ref({});

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
});
</script>
