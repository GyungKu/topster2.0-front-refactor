<template>
  <div class="form-signup w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="username" class="form-control" id="floatingInput" placeholder="name@example.com"
             v-model="username">
      <label for="floatingInput">아이디를 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="nickname" class="form-control" id="floatingInput" placeholder="nickname"
             v-model="nickname">
      <label for="floatingInput">닉네임을 입력해 주세요</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
             v-model="password">
      <label for="floatingPassword">비밀번호를 입력해 주세요</label>
    </div>
    <div class="d-flex align-items-center">
      <div class="form-floating flex-grow-1">
        <input type="email" class="form-control" id="floatingInput" placeholder="email"
               v-model="email">
        <label for="floatingInput">이메일을 입력해 주세요</label>
      </div>
      <button class="btn btn-outline-secondary ms-2" @click="checkEmail">이메일 인증</button>
    </div>
    <div>
      <p class="timer" v-if="timer">{{ minutes }}:{{ seconds }}</p>
      <p class="timer" v-if="timeOff">시간이 초과 되었습니다.</p>
    </div>
    <div class="d-flex align-items-center mt-2">
      <div class="form-floating flex-grow-1">
        <input type="text" class="form-control" id="floatingVerificationCode"
               placeholder="Verification Code" v-model="certification">
        <label for="floatingVerificationCode">인증번호를 입력해 주세요</label>
      </div>
      <!--      <button class="btn btn-outline-secondary ms-2" @click="verifyCode">인증번호 확인</button>-->
    </div>
    <div class="form-floating">
      <input type="intro" class="form-control" id="floatingInput" placeholder="intro"
             v-model="intro">
      <label for="floatingInput">자기소개를 입력해 주세요</label>
    </div>

    <button class="btn btn-primary w-100 py-2" @click="submit()">회원 가입</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {

  mounted() {
    if (store.state.token != null) {
      router.push('/');
    }
  },

  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      email: "",
      certification: "",
      intro: "",
      timer: null,
      minutes: 4,
      seconds: 59,
      timeOff: false,
    }
  },
  methods: {
    checkEmail() {
      axios.post("/users/mail?email=" + encodeURIComponent(this.email))
      .then(() => {
        window.alert("인증번호가 발송되었습니다.");
        this.startTimer();
      })
      .catch((err) => {
        console.error(err);
        window.alert("인증번호 발송에 실패했습니다.")
      });
    },

    submit() {
      const form = {
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        email: this.email,
        certification: this.certification,
        intro: this.intro,
      }
      axios.post("/users/signup", form)
      .then((res) => {

        if (res.data) {
          window.alert("회원가입이 완료되었습니다.");
          router.push('/');
        } else {
          window.alert("회원가입이 실패하였습니다.");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    },

    verifyCode() {
      const form = {
        email: this.email,
        certification: this.certification,
      }
      axios.post("/users/mail/certification", form)
      .then(() => {
        alert("인증번호가 확인되었습니다.")
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    },

    startTimer() {
      // 타이머가 이미 실행 중이라면 초기화
      if (this.timer) {
        clearInterval(this.timer);
        this.minutes = 4;
        this.seconds = 59;
      }
      // 1초마다 카운트다운
      this.timer = setInterval(() => {
        if (this.seconds === 0) {
          if (this.minutes === 0) {
            // 5분이 모두 지났다면 타이머를 멈춤
            clearInterval(this.timer);
            this.timer = null;
            this.timeOff = true;
          } else {
            this.minutes--;
            this.seconds = 59;
          }
        } else {
          this.seconds--;
        }
      }, 1000);
    },

  },

  beforeUnmount() {
    // 컴포넌트가 사라지기 전에 타이머를 꼭 정리해줍니다.
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

}


</script>

<style scoped>
.form-signup {
  max-width: 400px;
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
  padding-right: 10px; /* 예시: 작은 값으로 조정 */
}

.form-floating {
  width: 100%;
}

.form-floating .form-control,
.form-floating .form-floating,
.form-floating .btn {
  position: relative;
  width: 100%;
}

.form-floating .form-floating {
  padding-right: 0;
}

.form-floating .btn {
  right: 0;
}

.btn-outline-secondary {
  width: 100px;
}

.timer {
  color: red;
}
</style>