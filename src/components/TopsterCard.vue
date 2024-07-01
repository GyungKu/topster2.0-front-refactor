<template>
  <div :class="{ 'topster-card-container-no-center': !centerAlign }">
    <div :class="{ 'topster-card-container-center': centerAlign }">
      <div class="card shadow-sm">
        <div class="image-container">
          <!-- TopsterCard 컴포넌트를 사용하여 이미지 표시 -->
          <ImageCard v-for="(album, idx) in topster.albums || []" :key="idx"
                     :albumImage="album.image" :album="album" class="img"
                     @card-clicked="handleCardClicked(album)"/>
          <!-- 9개의 빈 아이템을 추가 -->
          <div v-for="index in Math.max(9 - (topster.albums?.length || 0), 0)"
               :key="`empty-${index}`" class="item empty"></div>
        </div>
        <div class="card-body">
          <p class="card-text">제목 : {{ topster.title }}</p>
          <div>작성자 : {{ topster.author }}</div>
          <div>작성일 : {{ formatDate(topster.createdAt) }}</div>
          <div v-if="likes != null">좋아요 : {{ likes.likeCount }}</div>
        </div>
        <div v-if="!noBtn && store.state.token !== null" class="d-flex justify-content-between align-items-center">
          <div>
            <button v-if="!noPost" @click="isAuthor" class="btn btn-primary">게시글 작성하기</button>
            <button v-if="!noPost" @click="deleteTopster" class="btn btn-danger">삭제</button>
          </div>
          <div v-if="likes != null">
            <button v-if="likes.status == false" @click="likeTopster" class="btn btn-success">좋아요</button>
            <button v-else @click="likeTopster" class="btn btn-success btn-danger">좋아요 취소</button>
          </div>
        </div>

        <AlbumDetail v-if="isModalOpen" :album="album" @close-modal="closeModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumDetail from "@/components/AlbumDetail.vue"; // AlbumDetail 컴포넌트 추가
import ImageCard from "@/components/ImageCard.vue";
import axios from "axios";
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  name: "TopsterCard",
  components: {ImageCard, AlbumDetail}, // AlbumDetail 컴포넌트 등록
  props: {
    topster: Object,
    noPost: {
      type: String,
      default: null,
    },
    noBtn: {
      type: String,
      default: null,
    },
    centerAlign: null,
  },

  data() {
    return {
      isModalOpen: false,
      album: null,
      likes: null,
    };
  },

  created() {
    axios.get(`topsters/${this.topster.id}/like-count/status`)
    .then((res) => {
      this.likes = res.data;
    })
  },

  computed: {
    store() {
      return store
    },
    reversAlbums() {
      return this.topster.albums.slice().reverse();
    }
  },
  methods: {
    handleCardClicked(album) {
      this.album = album;
      this.isModalOpen = true;
      // API 호출로 앨범 정보 가져오기 ( topster.album안에는 id, image만 갖고 id를 통해 api를 호출한다는 가정하에 한 것임)
      // axios.get(`/album/${id}`)
      // .then(response => {
      //   this.albums = response.data;
      //   this.isModalOpen = true; // 모달 열기
      // })
      // .catch(error => {
      //   console.error("앨범 정보를 불러오는 중 오류 발생:", error);
      // });
    },
    closeModal() {
      this.isModalOpen = false; // 모달 닫기
    },

    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    },

    deleteTopster() {
      axios.delete(`/topsters/${this.topster.id}`)
      .then(() => {
        alert('삭제 성공');
        location.reload();
      })
      .catch((err) => {
        alert(err.response.message);
      })
    },

    likeTopster() {
      axios.post(`topsters/${this.topster.id}/like`)
      .then(() => {
        axios.get(`topsters/${this.topster.id}/like-count/status`)
        .then((res) => {
          const status = res.data.status;
          if (status) {
            alert('좋아요');
          }else {
            alert('좋아요 취소');
          }
        })
        this.reloadLike();
      })
      .catch(() => {
        alert('좋아요 실패!');
      })
    },

    reloadLike() {
      axios.get(`topsters/${this.topster.id}/like-count/status`)
      .then((res) => {
        this.likes = res.data;
      })
    },

    isAuthor() {
      axios.get(`/topsters/${this.topster.id}/isAuthor`).then(() => {
        router.push({name: 'postRegister', params: {topsterId: this.topster.id}})
      }).catch(() => {
        alert('본인의 탑스터가 아닙니다.');
      })
    }

  },
};
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