<template>
  <div :class="{ 'topster-card-container-no-center': !centerAlign }">
    <div :class="{ 'topster-card-container-center': centerAlign }">
      <div class="card shadow-sm">
        <div class="image-container">
          <!-- TopsterCard 컴포넌트를 사용하여 이미지 표시 -->
          <ImageCard
            v-for="(album, idx) in props.topster.albums || []"
            :key="idx"
            :albumImage="album.image"
            :album="album"
            class="img"
            @card-clicked="handleCardClicked(album)"
          />
          <!-- 9개의 빈 아이템을 추가 -->
          <div
            v-for="index in Math.max(
              9 - (props.topster.albums?.length || 0),
              0,
            )"
            :key="`empty-${index}`"
            class="item empty"
          ></div>
        </div>
        <div class="card-body">
          <p class="card-text">제목 : {{ props.topster.title }}</p>
          <div>작성자 : {{ props.topster.author }}</div>
          <div>작성일 : {{ formatDate(props.topster.createdAt) }}</div>
          <div v-if="likes != null">좋아요 : {{ likes.likeCount }}</div>
        </div>
        <div
          v-if="!noBtn && store.state.token !== null"
          class="d-flex justify-content-between align-items-center"
        >
          <div>
            <button v-if="!noPost" @click="isAuthor" class="btn btn-primary">
              게시글 작성하기
            </button>
            <button
              v-if="!noPost"
              @click="deleteTopster"
              class="btn btn-danger"
            >
              삭제
            </button>
          </div>
          <div v-if="likes !== null">
            <button
              v-if="likes.status === false"
              @click="likeTopster"
              class="btn btn-success"
            >
              좋아요
            </button>
            <button
              v-else
              @click="likeTopster"
              class="btn btn-success btn-danger"
            >
              좋아요 취소
            </button>
          </div>
        </div>

        <AlbumDetail
          v-if="isModalOpen"
          :album="album"
          @close-modal="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import AlbumDetail from '@/components/AlbumDetail.vue'; // AlbumDetail 컴포넌트 추가
import ImageCard from '@/components/ImageCard.vue';
import router from '@/scripts/router';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  topster: {},
  noPost: String,
  noBtn: String,
  centerAlign: null,
});

const store = useStore();

const isModalOpen = ref(false);
const album = ref({});
const likes = ref({});

const handleCardClicked = (clickAlbum) => {
  album.value = clickAlbum;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const formatDate = (dateTimeString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

const deleteTopster = () => {
  axios
    .delete(`/topsters/${props.topster.id}`)
    .then(() => {
      alert('삭제 성공');
      window.location.reload();
    })
    .catch((err) => {
      alert(err.response.message);
    });
};

const reloadLike = () => {
  axios.get(`topsters/${props.topster.id}/like-count/status`).then((res) => {
    likes.value = res.data;
  });
};

const likeTopster = () => {
  console.log(`likeTopster() = ${props.topster.id}`);
  axios
    .post(`topsters/${props.topster.id}/like`)
    .then((res) => {
      alert(res.data.message);
      reloadLike();
    })
    .catch(() => {
      alert('좋아요 실패!');
    });
};

const isAuthor = () => {
  axios
    .get(`/topsters/${props.topster.id}/isAuthor`)
    .then(() => {
      router.push({
        name: 'postRegister',
        params: { topsterId: props.topster.id },
      });
    })
    .catch(() => {
      alert('본인의 탑스터가 아닙니다.');
    });
};

// const reversAlbums = computed(() => {
//   return props.topster.albums.slice().reverse();
// });

watch(
  () => props.topster,
  (topster) => {
    if (topster && topster.id) {
      reloadLike();
      console.log('실행!');
    }
  },
);

onMounted(() => {
  if (props.topster && props.topster.id) {
    reloadLike();
  }
});
</script>

<style scoped>
.card .img {
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 150px;
  margin: 5px;
  background-color: #f0f0f0;
  object-fit: contain; /* 이미지가 잘리지 않고 가로세로 비율을 유지하도록 설정합니다. */
}

.image-container {
  display: flex;
  flex-wrap: wrap;
}

.item.empty {
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 150px;
  margin: 5px;
  background-color: #f0f0f0;
}

.album-detail {
  /* 모달 스타일 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 기타 스타일링 */
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 999; /* 원하는 높은 숫자로 설정 */
}

.topster-card-container-center {
  /* 추가한 스타일: 최대 너비를 400px로 지정 (혹은 원하는 크기로 조절) */
  max-width: 400px;
  /* 추가한 스타일: 가로 중앙 정렬 */
  margin: 0 auto;
}

.topster-card-container-no-center {
  /* 추가한 스타일: 최대 너비를 400px로 지정 (혹은 원하는 크기로 조절) */
  max-width: 400px;
}
</style>
