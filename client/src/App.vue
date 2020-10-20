<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted () {
    let user = localStorage.getItem('user');
    if (user) {
      this.$store.commit('setUser', user)
    }
  }
}
</script>
