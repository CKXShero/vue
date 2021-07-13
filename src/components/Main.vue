<template>
  <div>
    <router-view/>
    <van-tabbar v-model="active" @change="handleTabIdx">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/singerList">歌手</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/userIndex">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active:0,
    };
  },
  created () {
      console.log(this.$route);
     
  },
  methods: {
      handleTabIdx(index) {
          //当切换tab时将当前激活的tab存储到本地缓存
          localStorage.setItem('tabbar',index);
      }
  },
  mounted () {
      //当组件挂载后再将当前tab从缓存中读取出来
      let curTab = localStorage.getItem('tabbar');
      if(curTab){
          this.active = Number(curTab);
      }
  },
};
</script>

<style lang="less" scoped>
</style>