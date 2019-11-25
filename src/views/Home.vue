<template>
  <div class="home">
    <MovieList v-bind:genres="genres" v-bind:movies="movies" />
  </div>
</template>

<script>
// import router from '../router'
import MovieList from "../components/movies/MovieList.vue";
import axios from 'axios'

export default {
  name: 'home',
  components: {
    MovieList,
  },
  data: function(){
    return {
    genres: [],
    movies: [],
    }
  },
  mounted() {    
    const movies_URL = "http://127.0.0.1:8000/api/v1/movies/movies/"
    axios
      .get(movies_URL)
      .then(response => {
        console.log(response)
        this.movies = response.data
      })
      .catch(error => {
        console.log(error)
      })  

    const genres_URL = "http://127.0.0.1:8000/api/v1/movies/genres/"
    axios
      .get(genres_URL)
      .then(response => {
        console.log(response)
        this.genres = response.data
      })
      .catch(error => {
        console.log(error)
      })  
  },
}
</script>
