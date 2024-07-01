<template>
  <div class="register-main">
    <div class="form-container">
      <h1>등록 메인 화면</h1>
      <label for="title">제목:</label>
      <input type="text" v-model="title" id="title" />


      <!-- 검색 모달 창 -->
      <SearchModal :items="searchModalItems" @item-selected="handleItemSelected" v-if="isSearchModalOpen"
      @close-modal="closeSearchModal" />
      <div class="button-container">
        <button class="search-button" @click="openSearchModal">가수 검색 하기</button>
        <button class="submit-button" @click="submitPost">등록 완료</button>
      </div>
    </div>

    <!-- 오른쪽 영역에 이미지 표시 -->
    <div class="topster-container">
      <!-- TopsterCard 컴포넌트를 사용하여 이미지 표시 -->
      <ImageCard v-for="(selectedItem, idx) in selectedItems" :key="selectedItem.id"
                 :albumImage="selectedItem.image" @card-clicked="removeCard(idx)" />
      <!-- 9개의 빈 아이템을 추가 -->
      <div v-for="index in Math.max(9 - selectedItems.length, 0)" :key="`empty-${index}`"
          class="item empty" />
    </div>

  </div>
</template>

<script>
import SearchModal from "@/components/SearchModal.vue";
import axios from "axios";
import ImageCard from "@/components/ImageCard.vue";
import router from "@/scripts/router";

export default {
  components: {
    ImageCard,
    SearchModal,
  },
  data() {
    return {
      isSearchModalOpen: false,
      searchModalItems: [],
      selectedItems: [],
      title: "", // 추가: 제목을 담을 데이터
      content: "" // 추가: 내용을 담을 데이터
    };
  },
  methods: {
    openSearchModal() {
      this.isSearchModalOpen = true;
    },
    closeSearchModal() {
      this.isSearchModalOpen = false;
    },
    handleItemSelected(item) {
      if (this.selectedItems.length == 9) {
        alert('더이상 추가할 수 없습니다.');
        return;
      }
      this.selectedItems.push(item);
    },
    submitPost() {
      // 추가: 제목, 내용, 앨범 정보를 서버에 POST 요청 보내기
      const postData = {
        title: this.title,
        content: this.content,
        albums: this.selectedItems
      };

      axios.post("/topsters", postData)
      .then(response => {

        if (response.data.code == '1009') {
          alert('로그인이 필요한 기능입니다.');
          router.push('/login');
        }

        alert('탑스터 등록 완료!');

        // 성공적으로 등록되면 데이터 초기화 또는 다른 동작 수행
        this.title = "";
        this.selectedItems = [];
      })
      .catch(error => {
        console.error("등록 중 오류 발생:", error);
      });
    },
    removeCard(idx) {
      this.selectedItems.splice(idx, 1);
    },
  }
};
</script>

<style scoped>
.register-main {
  display: flex;
  justify-content: space-between;
}

.form-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-container input,
.form-container textarea {
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px; /* 폰트 사이즈 키우기 */
  padding: 12px; /* 패딩 크기 키우기 */
  border: 1px solid #ccc; /* 테두리 추가 */
  border-radius: 5px; /* 테두리 둥글게 만들기 */
}

.button-container {
  display: flex;
  gap: 10px;
}

/* 가수 검색하기 버튼 스타일 추가 */
.search-button {
  background-color: #4caf50; /* 초록색 */
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

/* 등록 완료 버튼 스타일 추가 */
.submit-button {
  background-color: #008CBA; /* 파란색 */
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}


.topster-container {
  width: 40%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background-color: black;
  padding: 12px;
}

.item {
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 200px;
  margin: 5px;
  background-color: #f0f0f0;
  object-fit: contain; /* 이미지가 잘리지 않고 가로세로 비율을 유지하도록 설정합니다. */
}

.empty {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  flex: 0 0 calc(33.33% - 10px); /* 한 줄에 3개씩 배치하고 간격을 조절합니다. */
  height: 200px;
  margin: 5px;
  background-color: #f0f0f0;
  object-fit: contain; /* 이미지가 잘리지 않고 가로세로 비율을 유지하도록 설정합니다. */
}

/* 이미지가 정사각형으로 유지되도록 설정 및 크기 조절 */
.item img,
.empty img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>