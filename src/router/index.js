import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingerList from '../views/singer/SingerList.vue'
import SingerIndex from '../views/singer/SingerIndex.vue'
import Play from '../views/singer/Play.vue'
import SetCookie from '../components/SetCookie.vue'
import Main from '../components/Main.vue'
import UserIndex from '../views/user/UserIndex.vue'
import Login from '../views/user/Login.vue'
import Reg from '../views/user/Reg.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'singerList',
        name: 'SingerList',
        component: SingerList
      },
      {
        path: 'userIndex',
        name: 'UserIndex',
        component: UserIndex
      },
    ]
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/singerList',
    name: 'SingerList',
    component: SingerList
  },
  {
    path: '/singerIndex',
    name: 'SingerIndex',
    component: SingerIndex
  },
  {
    path: '/cookie',
    name: 'SetCookie',
    component: SetCookie
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  console.log(next);
  if(!(to.path.indexOf('/userIndex')== -1)){
     //用户要访问user相关页面
    // 先判断用户是否已登录
     let userInfo = localStorage.getItem('user');
     if(userInfo){
       next();
     }else{
       //next('/login');
       next({
         name:'Login',
         params:{
           target:to.path,
         }
       })
     }
  }else{
    next();
  }

})
export default router
