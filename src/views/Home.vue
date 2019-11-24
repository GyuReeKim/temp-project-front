<template>
  <div class="home">
    <MovieList v-bind:movies="movies" v-bind:genres="genres"/>
  </div>
</template>

<script>
import router from '../router'
import MovieList from "../components/movies/MovieList.vue";
import axios from 'axios'

export default {
  name: 'home',
  components: {
    MovieList,
  },
  data: function(){
    return {
    movies: [],
    genres: [],
    }
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
    const movies_URL = "http://127.0.0.1:8000/movies/moviesinfo/"
    axios
      .get(movies_URL)
      .then(response => {
        console.log(response)
        this.movies = response.data
      })
      .catch(error => {
        console.log(error)
      })
    
    const genres_URL = "http://127.0.0.1:8000/movies/genresinfo/"
    axios
      .get(genres_URL)
      .then(response => {
        this.genres = response.data
      })
      .catch(error => {
        console.log(error)
      })  
  },
}
</script>
