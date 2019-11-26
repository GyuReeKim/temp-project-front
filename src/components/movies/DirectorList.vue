<template>
  <div>
    <h3 class="my-5">🎥 감독별 영화 🎥</h3>
    <select class="form-control" v-model="selectedDirectorId">
      <option value="">전체보기</option>
      <option v-for="director in directors" :key="director.id" :value="director.id">{{director.name}}</option>
    </select >

    <div class="row">
      <div class="col-12 col-md-6 col-lg-3 my-3"  v-for="movie in onselectedGenreMovies" :key="movie.id">
        <DirectorListItem :movie="movie" :genres="genres" :directors="directors" />
      </div>
    </div>
  </div>
</template>

<script>

import DirectorListItem from "./DirectorListItem.vue";

export default {
  name: 'MovieList',
  components: {
    DirectorListItem
  },
  data () {
    return {
      selectedDirectorId : '',
    }
  },
  props: ['genres', 'movies', 'directors'],
  computed: {
    onselectedGenreMovies: function(){      
      if (this.selectedDirectorId === ''){
        return this.movies
      } else {       
        return this.directors[this.selectedDirectorId - 1].director_movies
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