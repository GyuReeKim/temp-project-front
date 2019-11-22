<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="isAuthenticated">      
        <a href="#" @click.prevent="logout">Logout</a>
      </span>
      <span v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </span>
    </div>
    
    <div class="container">
      <router-view/>
      <MovieList v-bind:movies="movies" v-bind:genres="genres"/>
    </div>
  </div>
</template>


<script>
import MovieList from "./components/movies/MovieList.vue";
import axios from 'axios'

export default {
  name: 'App',
  components: {
    MovieList,
  },
  data: function(){
    return {
      isAuthenticated: this.$session.has('jwt'),
      movies: [],
      genres: [],
    }
  },
  methods: {
    logout: function(){
      this.$session.destroy()
      this.$router.push('/login')
    }
  },
  updated: function(){
    this.isAuthenticated = this.$session.has('jwt')
  },
  mounted() {
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


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
