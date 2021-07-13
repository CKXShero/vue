<template>
  <div id="app">
    <!-- <Nav/> -->
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
//import HelloWorld from './components/HelloWorld.vue'
//import Cart from './components/Cart.vue'
//import Nav from './components/Nav'
export default {
  name: "App",
  components: {
    //Nav
  },
  created() {
    let songList = localStorage.getItem("songList");
    let current = localStorage.getItem("current");
    if (songList) {
      this.$store.commit("song/initCurrentSongListMut", JSON.parse(songList));
      this.$store.commit("song/getCurrentSongIndexMut", current);
    }
  
  }
};
</script>
