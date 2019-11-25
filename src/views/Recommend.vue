<template>
  <div class="recommend">
    <h3>영화 추천</h3>
    <MovieRecommend/>
  </div>
</template>

<script>
import router from '../router'
import MovieRecommend from "../components/movies/MovieRecommend.vue";

export default {
  name: 'Recommend',
  components: {
    MovieRecommend
  },
  methods: {
        checkLoggedIn(){
      this.$session.start() 
      if (!this.$session.has('jwt')){
        router.push('/login')
      }
    }
  },
  mounted() {
    this.checkLoggedIn()
  }
}
</script>

<style>

</style>