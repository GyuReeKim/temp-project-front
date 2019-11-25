<template>
  <div>
    <h3>🎬 장르별 영화 🎬</h3>
    <select class="form-control" v-model="selectedGenreId">
      <option value="">전체보기</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
    </select >

    <div class="row">
      <div class="col-12 col-md-6 col-lg-3 my-3"  v-for="movie in onselectedGenreMovies" :key="movie.id">
        <MovieListItem :movie="movie" :genres="genres" />
      </div>
    </div>
  </div>
</template>

<script>

import MovieListItem from "./MovieListItem.vue";

export default {
  name: 'MovieList',
  components: {
    MovieListItem
  },
  data () {
    return {
      selectedGenreId : '',
    }
  },
  props: ['genres', 'movies'],
  computed: {
    onselectedGenreMovies: function(){      
      if (this.selectedGenreId === ''){
        return this.movies
      } else {       
        return this.genres[this.selectedGenreId - 1].movies
      }
    }
  }
}
</script>

<style>
select {
  display: block;
  width: 50% !important;
  margin: 2rem auto !important;
}
</style>