<template>
  <div>
    <van-form @submit="toReg">
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
        <van-button round block type="info" native-type="submit" >注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {toRegUser} from '../../api/user.js'
import { Toast } from 'vant';
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        toReg(values) {
            console.log(values);
            toRegUser(values).then(res=>{
                console.log(res);
                Toast.success('注册成功');
                this.$router.push('/login');
            }).catch(err=>{
                console.log(err);
                Toast.fail('该账号不可用');
            })
        }
    },
};
</script>

<style lang="less" scoped>
</style>