<template>
  <div class="signup">
    <h1>회원가입 페이지 입니다.</h1>
    <SignupForm/>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'

export default {
  name: 'Signup',
  components: {
    SignupForm
  }
}
</script>

<style>

</style>