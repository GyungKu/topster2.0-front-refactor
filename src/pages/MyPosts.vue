<template>
    <div class="page-title">
      <div class="container">
        <h3>내 게시글</h3>
      </div>
    </div>

    <!-- board seach area -->
    <SearchBar :searchCond="searchCond" :my="'my'" @searchCond="searchCondSet"></SearchBar>

    <!-- board list area -->
    <div id="board-list">
      <div class="container">
        <!-- 추가: 최대 항목 수(max) 설정 -->
        <div class="max-per-page">
          <label for="maxPerPage">최대 항목 수:</label>
          <select v-model="max" @change="search">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <!-- 필요에 따라 다양한 옵션 추가 가능 -->
          </select>
        </div>
        <table class="board-table">
          <thead>
          <tr>
            <th scope="col" class="th-num">번호</th>
            <th scope="col" class="th-title">제목</th>
            <th scope="col" class="th-date">작성자</th>
            <th scope="col" class="th-date">등록일</th>
          </tr>
          </thead>
          <tbody v-for="post in posts" :key="post.id">
          <tr>
            <td>{{ post.id }}</td>
            <th>
              <router-link :to="{name: 'postDetail', params: {postId: post.id}}">{{ post.title }}</router-link>
            </th>
            <td>{{ post.author }}</td>
            <td>{{ formatDate(post.createdAt) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 컨트롤 -->
    <Pagination :page="page" :totalPages="totalPages" @pageChange="handlePageChange" />

</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    Pagination,
    SearchBar,
  },

  data() {
    return {
      searchCond: {
        searchKey: '',
        query: '',
      },
      sortBy: 'created_at',
      sortAsc: true,
      page: 1,
      max: 10,
      posts: [],
      totalPages: 1, // totalPages를 추가합니다.
      totalPageArray: [],
    };
  },

  mounted() {
    axios.get("/posts/my").then((res) => {
      const content = res.data.content;
      if (content.length === 0) {
        alert('결과가 없습니다.');
      }
      this.posts = content;
    })
  },
  methods: {
    search() {
      const queryString = `?key=${this.searchCond.searchKey}&query=${this.searchCond.query}&page=${this.page}&max=${this.max}`;

      axios.get(`/posts/my${queryString}`)
      .then(response => {
        const content = response.data.content;
        if (content.length === 0) {
          alert('결과가 없습니다.');
        }
        this.posts = content;
        this.totalPages = response.data.totalPages;
        this.totalPageArray = this.generatePageArray;
      })
      .catch(error => {
        console.error('게시물을 불러오는 중 에러 발생:', error);
      });
    },

    searchCondSet(searchCond) {
      this.searchCond = searchCond;
      this.page = 1; // 검색 시 페이지를 1로 초기화
      this.search(); // 검색 시에도 게시물을 다시 가져오도록 수정
    },

    formatDate(createdAt) {
      const date = new Date(createdAt);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      return formattedDate;
    },

    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.search();
      }
    },

    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.search();
      }
    },

    gotoPage(pageNumber) {
      this.page = pageNumber;
      this.search();
    },

    handlePageChange(newPage) {
      this.page = newPage;
      this.search(); // 페이지 변경 시에도 게시물을 다시 가져오도록 수정
    },

  },

  computed: {
    // 계산된 속성을 통해 페이지 숫자 배열 생성
    generatePageArray() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },

  watch: {
    // 페이지가 바뀔 때마다 totalPageArray 업데이트
    page() {
      this.totalPageArray = this.generatePageArray;
    },
  },

};

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
  /*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}
#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th, .board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p{
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover, .btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #2c3e50; /* 어두운 색으로 변경 */
  color: #fff;
  border: 1px solid #2c3e50; /* 어두운 색으로 변경 */
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #1d2731; /* 어두운 색으로 변경 */
  border-color: #1d2731; /* 어두운 색으로 변경 */
}

.pagination button:disabled {
  background-color: #4a627a; /* 어두운 색으로 변경 */
  color: #7f8c8d;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #34495e; /* 어두운 색으로 변경 */
  border-color: #34495e; /* 어두운 색으로 변경 */
}
</style>