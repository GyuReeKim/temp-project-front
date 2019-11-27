<template>
  <div>
    <a href data-toggle="modal" v-bind:data-target="`#gg-${movie.id}`">
      <img id="img" class="movie--poster my-3" v-bind:src="movie.poster_url" v-bind:alt="movie.title" />
    </a>
    <h4>
      {{movie.title}}
    </h4>

    <MovieListItemModal :movie="movie" :genres="genres" />
  </div>
</template>

<script>
import MovieListItemModal from "./MovieListItemModal.vue";

export default {
  name: "MovieListItem",

  components: {
    MovieListItemModal
  },

  props: {
    movie: Object,
    genres: Array
  },

  data() {
    return {};
  }
};
</script>

<style>
#img {
  transition: transform .2s; /* Animation */
}
#img:hover {
  opacity: 75%;
  background-color: white;
  /* -webkit-transform: scale(1.2); */
  /* transform: scale(1.2); */
}
.movie--poster {
  width: 200px;
}
</style>