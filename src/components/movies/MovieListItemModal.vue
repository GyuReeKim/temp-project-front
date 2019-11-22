<template>
  <div class="modal fade" tabindex="-1" role="dialog" v-bind:id="`gg-${movie.id}`">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">

          <h5 class="modal-title">{{movie.title}}</h5>
          <!-- <h6>영문제목 : {{movie.title_en}}</h6>
          <h6>평점 : {{movie.score}}</h6> -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <img class="movie--poster my-3" v-bind:src="movie.poster_url" v-bind:alt="movie.title">
          <hr/>
          <p>{{movie.audience}}</p>
          <p>{{movie.summary}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movielistitemmodal',

  props: {
    movie: Object,
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>