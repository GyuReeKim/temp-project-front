<template>
  <div class="col-12 col-md-6 col-lg-3 my-3">

      <img class="movie--poster my-3" v-bind:src="movie.poster_url" v-bind:alt="movie.title">

      <h3>{{movie.title}}</h3>

      <button class="btn btn-primary" data-toggle="modal" v-bind:data-target="`#gg-${movie.id}`">영화 정보 상세보기</button>
      
      <MovieListItemModal :movie="movie"/>
  </div>
</template>

<script>

import MovieListItemModal from "./MovieListItemModal.vue";

export default {
  name: 'MovieListItem',

  components: {
    MovieListItemModal
  },

   props: {
    movie: Object,
  },

  data () {

    return {}
  }
}
</script>

<style>
.movie--poster {
  width: 200px;
}
</style>