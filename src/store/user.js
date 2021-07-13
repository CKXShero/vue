export default{
    namespaced:true,
    state:()=>({
       userInfo:'',
    }),
    mutations:{
        userMut(state,user){
            state.userInfo = user
        }
    }
}