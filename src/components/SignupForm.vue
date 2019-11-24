<template>
  <div>

    <!-- 회원가입화면 -->
    <div class="signup-div col-6 offset-3">

      <div v-if="errors.length" class="error-list alert alert-danger">
        <!-- idx는 for문을 돌았을 때의 idx를 말한다. -->
        <!-- 에러 목록 -->
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>


      <div class="form-group">
        <label for="id">ID</label>
        <input id="id" class="form-control" type="text" v-model="credential.username">
      </div>
      <div class="form-group">
        <label for="password1">PASSWORD</label>
        <input id="password1" class="form-control" type="password" v-model="credential.password1">
      </div>
      <div class="form-group">
        <label for="password2">PASSWORD확인</label>
        <input id="password2" class="form-control" type="password" v-model="credential.password2">
      </div>
      <div class="form-group">
        <label for="email">email</label>
        <input id="email" class="form-control" type="email" v-model="credential.email">
      </div>
      <button class="btn btn-primary" @click="signup">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data: function(){
    return {
      credential: {
        username: '',
        password1: '',
        password2: '',
        email: ''
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    signup(){
      if (this.checkForm()){
        console.log('회원가입 시도!!!')

        axios.post('http://localhost:8000/rest-auth/registration/', this.credential)
        .then((res)=>{
          console.log(res)
          router.push('/login')
        })
        .catch((e)=>{
          this.loading = true
          console.log(e)
        })
      }
    },

    checkForm(){
      this.errors = []

      if (this.credential.password1.length < 8) {this.errors.push("비밀번호는 8글자가 넘어야합니다.")}
      if (!this.credential.username) {this.errors.push("아이디를 입력해주세요.")}
      if (this.credential.password1 !== this.credential.password2) {this.errors.push("비밀번호가 서로 다릅니다.")}
      if (!this.credential.email.includes("@")) {this.errors.push("올바르지않은 이메일 형식입니다.")}
      if (this.errors.length === 0) {
        return true
      }
    }
  }
}
</script>

<style>

</style>