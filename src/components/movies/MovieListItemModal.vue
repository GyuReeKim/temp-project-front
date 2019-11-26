<template>
  <div class="modal fade" tabindex="-1" role="dialog" v-bind:id="`gg-${movie.id}`" data-backdrop="static" data-keypress="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">🎬 {{movie.title}} ({{movie.title_en}})</h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img class="movie--poster my-3" v-bind:src="movie.poster_url" v-bind:alt="movie.title" style="width:50%">
          
          
          <hr style="background-color:white"/>
          <p class="text-center">DETAIL</p>
          <div>평점 : {{movie.score}}</div>
          <span>등급 : {{movie.grade.name}}</span>
          <div>
          <span>장르 : </span>
          <span v-for="genre in movie.movie_genres" :key="genre.id">{{genre.name}} </span>
          </div>
          <div>
          <span>감독 : </span>
          <span v-for="director in movie.movie_directors" :key="director.id">{{director.name}} </span>
          </div>
          <p>누적 관람객 : {{movie.audience}}명</p>
          <p>{{movie.summary}}</p>


          <hr style="background-color:white"/>
          <p class="text-center">예고편</p>
          <iframe v-if="movie.video_url" :src="movie.video_url" frameborder="0" style="width:100% ;height:300px;"></iframe>
          <hr style="background-color:white"/>
          <p class="text-center">OST</p>
          <iframe v-if="movie.ost_url" :src="movie.ost_url" frameborder="0" style="width:100% ;height:300px;"></iframe>


          <hr style="background-color:white"/>
          <div>
          <p class="text-center">REVIEW</p>
          <div class="form-group">
            <label for="comment">comment</label>
            <input id="comment" class="form-control" type="text" v-model="review.comment">
          </div>
          <div class="form-group">
            <label for="score">score</label>
            <input id="score" class="form-control" type="number" v-model="review.score">
          </div>
          <button class="btn btn-primary" @click="createreview">리뷰생성</button>
          </div>
        
    
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
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
    genres: Object
  },
  data() {
    return {
      review: {
        comment: '',
        socre: ''
      }
    }
  },
  methods: {
    createreview(){
    }
  }
}
</script>

<style>

</style>