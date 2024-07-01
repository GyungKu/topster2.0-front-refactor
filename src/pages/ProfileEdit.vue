<template>
  <div class="form-signup w-100">
    <div class="form-floating">
      <input type="nickname" class="form-control" id="floatingInput" placeholder="nickname"
             v-model="userInfo.nickname">
      <label for="floatingInput">닉네임을 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="intro" class="form-control" id="floatingInput" placeholder="intro"
             v-model="userInfo.intro">
      <label for="floatingInput">자기소개를 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
             v-model="userInfo.password">
      <label for="floatingPassword">원래 비밀번호를 입력해 주세요</label>
    </div>
    <button class="btn btn-primary w-100 py-2" @click="submit()">수정</button>
  </div>

</template>
<script>

import axios from "axios";
import router from "@/scripts/router";

export default {
  data() {
    return {
      userInfo: {},
    }
  },

  mounted() {
    axios.get('/users')
    .then(res => {
      this.userInfo = res.data;
    })
  },

  methods: {
    submit() {
      axios.patch("/users/update", this.userInfo)
      .then(() => {
        alert('정보 수정 완료');
        router.push({name: 'myProfile'});
      }).catch((err) => {
        const code = err.response.data.code;
        if (code === '1002') {
          alert('중복된 닉네임 입니다.');
        }
        if (code === '1010') {
          alert('비밀번호가 틀렸습니다.');
        }
      })
    }
  }

}

</script>


<style scoped>
.form-signup {
  margin: 200px auto;
  max-width: 330px;
  padding: 1rem;
}

.form-signup .form-floating:focus-within {
  z-index: 2;
}

.form-signup input {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-control {
  padding-right: 100px;
}
.form-floating {
  position: relative;
}

.form-floating .form-control {
  padding-right: 100px; /* 버튼이 있을 자리를 비워두기 위해 오른쪽 패딩을 추가합니다. */
}

.form-floating .btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%; /* 버튼의 높이를 input 필드와 동일하게 맞춥니다. */
  z-index: 10; /* 필요하다면 z-index를 조절하여 버튼이 다른 요소 위에 오도록 합니다. */
}
</style>