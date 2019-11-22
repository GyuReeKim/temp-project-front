<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import router from '../router'

export default {
  name: 'home',
  components: {
    
  },
  methods: {
    checkLoggedIn(){
      this.$session.start() 
      if (!this.$session.has('jwt')){
        router.push('/login')
      }
    }
  },
  mounted: function(){
    this.checkLoggedIn()
  }
}
</script>
