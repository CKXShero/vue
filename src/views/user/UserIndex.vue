<template>
  <div>
      <div class="avator">
        <van-image round
                width="100px" height="100px" 
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                
        />
      </div>
    <div class="fav">
       <van-cell title="个人收藏" is-link to="index" />
    </div>
    <div class="logout">
       <van-button type="primary" block @click="logout">退出登录</van-button>
    </div>
   
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      //前端退出的登录
      //清空状态机和本地缓存
      this.$store.commit('user/userMut',null);
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  },
};
</script>

<style lang="less" scoped>
.avator{
    width:100px;
    height:100px;
    //border:1px solid red;
    margin:10px 8px;
}
.fav{
    margin-bottom:50px;
}
</style>