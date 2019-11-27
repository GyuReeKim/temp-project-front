<template>
  <div class="container">
    <h3>👍 {{username}}고객님의 맞춤영화 👍</h3>
      <div class="card bg-dark text-white m-2">
        <div v-if="choice.poster_url">
          <img :src="choice.poster_url" class="card-img" style="opacity: 0.4" />
          <div class="card-img-overlay row align-items-center">
            <div class="col">
              <div class="p-2">
                <h5>{{choice.title}}</h5>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>리뷰를 작성해주세요</p>
        </div>
      </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  name: "MovieRecommend",
  data() {
    return {
      reviews: [],
      fgenre: [],
      username: '',
      genremovie: [],
      fgenreid: [],
      choice: []
    };
  },
  methods: {
    getReviews() {
      this.$session.start();
      const token = this.$session.get("jwt");
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.user_id;
      const requestHeader = {
        headers: {
          Authorization: "JWT " + token
        }
      };
      axios
        .get(`http://localhost:8000/api/v1/accounts/${user_id}/`, requestHeader)
        .then(response => {
          this.username =  response.data.username
          this.reviews = response.data.review_set;
          let maxscore = 0
          if (this.reviews.length > 0){
            for (let review of this.reviews){
              if (review.score === maxscore){
                  this.fgenre.push(review.movie.movie_genres)
              } else if (review.score > maxscore){
                this.fgenre = review.movie.movie_genres
                maxscore = review.score
              }
            }
            for (let genre of this.fgenre){
              this.fgenreid.push(genre.id)
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getGenres() {
      this.$session.start();
      const token = this.$session.get("jwt");
      const requestHeader = {
        headers: {
          Authorization: "JWT " + token
        }
      };
      axios
        .get(`http://localhost:8000/api/v1/movies/genres/`, requestHeader)
        .then(response => {
          this.genremovie = response.data
          if (this.fgenreid.length > 0){
            for (let gid of this.fgenreid){
              for (let idx=0; idx<=27; idx++){
                if (gid === idx){
                  let maxvalue = 0
                  for (let temp of response.data[idx-1].movies){
                    if (temp.score === maxvalue){
                      this.choice.push(temp)
                    } else if (temp.score > maxvalue){
                      this.choice = temp
                      maxvalue = temp.score
                    }
              }
              }
            }
          }
        }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.getReviews();
    this.getGenres();
  }
};
</script>

<style>
</style>