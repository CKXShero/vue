import {leanCloud} from '../utils/request'
export const toRegUser = (user)=>{
    return leanCloud.post('/1.1/users',{
       username:user.username,
       password:user.password,
    })
}
export const toLogin = (user)=>{
    return leanCloud.post('/1.1/login',{
       username:user.username,
       password:user.password,
    })
}