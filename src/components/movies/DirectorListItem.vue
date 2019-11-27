<template>
  <div>
    <a href data-toggle="modal" v-bind:data-target="`#gg-${movie.id}`">
      <img class="movie--poster my-3" v-bind:src="movie.poster_url" v-bind:alt="movie.title" />
    </a>
    <h4>
      {{movie.title}}
    </h4>

    <DirectorListItemModal :movie="movie" :genres="genres" :directors="directors" />
  </div>
</template>

<script>
import DirectorListItemModal from "./DirectorListItemModal.vue";

export default {
  name: "DirectorListItem",

  components: {
    DirectorListItemModal
  },

  props: {
    movie: Object,
    genres: Array,
    directors: Array
  },

  data() {
    return {};
  }
};
</script>

<style>
.movie--poster {
  width: 200px;
}
</style>