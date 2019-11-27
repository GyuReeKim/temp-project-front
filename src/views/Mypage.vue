<template>
  <div class="mypage">
    <h3>😍마이페이지😍</h3>
    <p>내가 등록한 평점</p>
    <MypageForm />
  </div>
</template>

<script>
import MypageForm from "../components/MypageForm.vue";
export default {
  name: "Mypage",
  components: {
    MypageForm
  }
};
</script>

<style>
</style>