<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Genre & Director</router-link> |   
      <span v-if="isAuthenticated">      
        <router-link to="/recommend">Recommend Movie</router-link> |
        <router-link to="/mypage">{{username}}</router-link> |
        <a href="#" @click.prevent="logout">Logout</a>
      </span>
      <span v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </span>
    </div>
    
    <div class="container my-3">
      <router-view/>
    </div>
  </div>
</template>


<script>
import jwtDecode from "jwt-decode";

export default {
  name: 'App',
  components: {
  },
  data: function(){
    return {
      isAuthenticated: this.$session.has('jwt'),
      username: '',
    }
  },
  methods: {
    logout: function(){
      this.$session.destroy()
      this.$router.push('/login')
    },
    getusername: function(){
      this.$session.start();
      const token = this.$session.get("jwt");
      const decodedToken = jwtDecode(token);
      this.username = decodedToken.username
    }
  },
  updated: function(){
    this.isAuthenticated = this.$session.has('jwt')
    this.getusername()
  },
  mounted(){
    this.getusername()
  }
}
</script>


<style>
@font-face { font-family: 'HangeulNuri-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/HangeulNuri-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'HangeulNuri-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

#nav {
  padding: 30px;
  background-color: rgb(148, 24, 20);
}

#nav a {
  font-weight: bold;
  color: rgba(65, 165, 83, 0.747);
}

#nav a.router-link-exact-active {
  color: #ffe96e;
}
</style>
