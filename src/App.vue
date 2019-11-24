<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="isAuthenticated">      
        <router-link to="/signup">mypage</router-link> |
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

export default {
  name: 'App',
  components: {
  },
  data: function(){
    return {
      isAuthenticated: this.$session.has('jwt'),
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
