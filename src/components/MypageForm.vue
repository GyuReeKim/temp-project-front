<template>
  <div class="container">
    <h3>😍{{username}}님의 페이지😍</h3>
    <p>내가 등록한 평점</p>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-3 my-3" v-for="review in reviews" :key="review.id">
        <div class="card bg-dark text-white m-2">
          <img :src="review.movie.poster_url" class="card-img" style="opacity: 0.4" />
          <div class="card-img-overlay row align-items-center">
            <div class="col">
              <div class="p-2">
                <h5>{{review.movie.title}}</h5>
              </div>
              <div class="my-3">
                <p>{{review.comment}}</p>
              </div>
              <div class="my-3">
                <p>{{review.score}}점</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  name: "MypageForm",
  data() {
    return {
      reviews: [],
      username: '',
    };
  },
  methods: {
    // 함수
    getReviews() {
      this.$session.start();
      const token = this.$session.get("jwt");
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken)
      const user_id = decodedToken.user_id;
      // console.log(user_id);

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
          // console.log(this.reviews);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.getReviews();
  }
};
</script>

<style>
</style>