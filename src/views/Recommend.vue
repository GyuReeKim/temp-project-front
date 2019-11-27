<template>
  <div class="recommend">
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