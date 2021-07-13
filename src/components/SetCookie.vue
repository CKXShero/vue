<template>
    <div>
        <button @click="handleCookie">设置cookie</button>
        <button @click="getCookie">获取cookie</button>
    </div>
</template>

<script>
    import {instance} from '../utils/request'
    export default {
        methods: {
            handleCookie() {
            instance.post('/user/setCookie',{
                data:`RK=7hQNKojPTE; ptcz=23c7b318d8c7f8ba08b764a0785cf453277641bb74ad46420d19acc43c2b4a2a; pgv_pvid=7142709988; fqm_pvqid=62f69634-6368-4848-a587-c9c28837af6c; ts_refer=jsososo.github.io/; ts_uid=4866069720; euin=oKEFoiEioioA7v**; tmeLoginType=2; fqm_sessionid=212f8eb6-4342-4f7f-b2e8-d44a271c6c88; pgv_info=ssid=s7110235880; ts_last=y.qq.com/; _qpsvr_localtk=0.9002937124330883; login_type=1; uin=1983933325; qm_keyst=Q_H_L_28uFa360emk_KopyXPc2NY6vAbnB8J1ROnaH9TZpyfKLdpYbuRk8UWNprhYW_r6; psrf_qqrefresh_token=DBEED7C0B78F5C40D037E9D78BE5AF20; wxopenid=; qqmusic_key=Q_H_L_28uFa360emk_KopyXPc2NY6vAbnB8J1ROnaH9TZpyfKLdpYbuRk8UWNprhYW_r6; psrf_qqunionid=; psrf_access_token_expiresAt=1633347202; psrf_musickey_createtime=1625571202; psrf_qqaccess_token=54AB3152F21A7773737C7B71B6F15E6D; psrf_qqopenid=C82E0ABD20385BA4B3D698BE2120B583; wxrefresh_token=; wxunionid=; qm_keyst=Q_H_L_28uFa360emk_KopyXPc2NY6vAbnB8J1ROnaH9TZpyfKLdpYbuRk8UWNprhYW_r6`
            }).then(res=>{
                console.log(res);
            })
                
            },
            getCookie() {
            instance.get('/user/cookie',{
               
            }).then(res=>{console.log(res)})
                
            }
        },
    }
</script>

<style lang="less" scoped>

</style>