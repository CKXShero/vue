<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" to="/reg">没有账号？去注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {toLogin} from '../../api/user.js'
export default {
    data() {
        return {
            username: '',
            password:'',
            target:'/'
        }
    },
    methods: {
        onSubmit(values) {
            console.log(values);
            toLogin(values).then(res=>{
                console.log(res);
                //用户登录成功后将信息存储到状态机和本地缓存中
                this.$store.commit('user/userMut',res.data);
                localStorage.setItem('user',JSON.stringify(res.data));
                //跳转到用户之前想去的页面
                if(this.$route.params.target){
                  this.target = this.$route.params.target;
                  this.$router.push(this.target);
                }else{
                  this.$router.push(this.target);
                }
            })
        }
    },
};
</script>

<style lang="less" scoped>
</style>