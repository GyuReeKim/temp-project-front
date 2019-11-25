<template>
  <div>
    <h3>🎬 영화 검색 🎬</h3>
    <select class="form-control" v-model="selectedGenreId">
      <option value="">전체보기</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
    </select >

    <div class="row">
      <MovieListItem v-for="movie in onselectedGenreMovies" :key="movie.id" :movie="movie"/>
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
        return this.genres[0].movies
      } else {
        // 배열안에 찾고싶은 값이 있을 때 includes()사용        
        return this.genres[this.selectedGenreId-1].movies
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