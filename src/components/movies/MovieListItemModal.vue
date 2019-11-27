<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    v-bind:id="`gg-${movie.id}`"
    data-backdrop="static"
    data-keypress="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">🎬 {{movie.title}} ({{movie.title_en}})</h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <img
            class="movie--poster my-3"
            v-bind:src="movie.poster_url"
            v-bind:alt="movie.title"
            style="width:50%"
          />
          
          <hr style="background-color:white" />
        <div>
          <p class="text-center">DETAIL</p>
          <div class="mb-1">평점 : {{movie.score}}</div>
          <div class="mb-1">등급 : {{movie.grade.name}}</div>
          <div class="mb-1">
            <span>장르 : </span>
              <span v-for="(genre, index) in movie.movie_genres" :key="genre.id">
              <span v-if="index !== movie.movie_genres.length-1"> {{genre.name}},</span>
              <span v-else> {{genre.name}}</span>
            </span>
          </div>
          <div class="mb-1">
            <span>감독 : </span>
              <span v-for="(director, index) in movie.movie_directors" :key="director.id">
              <span v-if="index !== movie.movie_directors.length-1"> {{director.name}},</span>
              <span v-else> {{director.name}}</span>
            </span>
          </div>
          <div class="mb-1">누적 관람객 : {{Number(movie.audience).toLocaleString()}}명</div>
          <div class="mb-1">
            <div>줄거리</div>
            <p>{{movie.summary}}</p>
          </div>
        </div>

          <hr style="background-color:white" />
          
          <p class="text-center">예고편</p>
          <span v-if="movie.video_url">
            <iframe :src="movie.video_url" frameborder="0" style="width:100% ;height:300px;"></iframe>
          </span>
          <span v-else>😱</span>

          <hr style="background-color:white" />
          <p class="text-center">OST</p>
          <span v-if="movie.ost_url">
            <iframe :src="movie.ost_url" frameborder="0" style="width:100% ;height:300px;"></iframe>
          </span>
          <span v-else>😱</span>

          <hr style="background-color:white" />
          <p class="text-center">REVIEW</p>
          <span v-if="isAuthenticated">
            <div>
              <div class="input-group">
                <label for="comment">comment :</label>
                <input id="comment" class="form-control ml-3" type="text" v-model="review.comment" />
              </div>
              <div class="input-group my-3">

                <label for="score">score :</label>
                <input id="score" class="form-control ml-4" type="range" min="0" max="10" step="1" v-model="review.score" />
                <font v-model="review.score">{{review.score}}</font>
              </div>
              <button class="btn btn-primary my-3" @click="createreview">리뷰생성</button>
            </div>
            <hr style="background-color:white" />
            <p class="text-center">REVIEW</p>

            <div>
              <div v-for="review in reviews" :key="review.id" class="my-3">
                <p class="text-left">
                  [{{review.review_user['username']}}]
                  [{{review.score}}] {{review.comment}}
                </p>
                <div>
                  {{review.create_at}}
                  <button
                    class="btn btn-success mx-2"
                    @click="updatereview(review)"
                  >수정</button>
                  <button class="btn btn-danger" @click="deletereview(review)">삭제</button>
                </div>
              </div>
            </div>
          </span>
          <span v-else>로그인 후 볼 수 있습니다.</span>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
export default {
  name: "movielistitemmodal",
  props: {
    movie: Object,
    genres: Array
  },
  data() {
    return {
      review: {
        comment: "",
        score: "5"
      },
      isAuthenticated: this.$session.has("jwt"),
      reviews: [],
    };
  },
  methods: {
    createreview() {
      const token = this.$session.get("jwt");
      const header = {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
      axios
        .post(
          `http://127.0.0.1:8000/api/v1/movies/${this.movie.id}/reviews/`,
          this.review,
          header
        )
        .then(response => {
          const data = response.data;
          this.reviews.push(data);
          this.comment = "";
          this.score = "";
          // 왜 초기화 안됨ㅠ 수정 필요
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletereview: function(review) {
      const token = this.$session.get("jwt");
      const header = {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
      axios
        .delete(
          `http://127.0.0.1:8000/api/v1/movies/reviews/${review.id}/`,
          header
        )
        .then(() => {
          const targetreview = this.reviews.find(function(el) {
            return el === review;
          });
          const idx = this.reviews.indexOf(targetreview);
          if (idx > -1) {
            this.reviews.splice(idx, 1);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updatereview: function(review) {
      const token = this.$session.get("jwt");
      const header = {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
      axios
        .put(
          `http://127.0.0.1:8000/api/v1/movies/reviews/${review.id}/`,
          this.review,
          header
        )
        .then(response => {
          const targetreview = this.reviews.find(function(el) {
            return el === review;
          });
          const idx2 = this.reviews.indexOf(targetreview);
          this.reviews[idx2].comment = response.data.comment
          this.reviews[idx2].score = response.data.score


        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/movies/${this.movie.id}/reviewall/`)
      .then(res => {
        this.reviews = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>