import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'//首页
import homeContent from '@/components/home/homeContent'//首页内容
// import forumCenter from '@/components/home/forumCenter'//论坛中心
const forumCenter = ()=>import ('@/components/home/forumCenter')//懒加载 论坛中心
// import post from '@/components/advisory/post'//发帖
const post =()=>import ('@/components/advisory/post')//发帖 懒加载
// import postList from '@/components/advisory/postList'//论坛中心,帖子列表
const postList =()=>import ('@/components/advisory/postList')//论坛中心,帖子列表 懒加载
// import postDetail from '@/components/advisory/postDetail'//论坛中心,帖子详情
const postDetail =()=>import ('@/components/advisory/postDetail')//论坛中心,帖子详情 懒加载
import search from '@/components/home/search'//搜索
import newsList from '@/components/advisory/newsList'//文章列表
// import newsDetail from '@/components/advisory/newsDetail'//文章详情
const newsDetail = ()=>import("@/components/advisory/newsDetail")//文章详情 懒加载
// import login from '@/components/login/login'//登录注册页面
const login = ()=>import("@/components/login/login")//懒加载 登录注册页面
// import bindMobile from '@/components/login/bindMobile'//第三方绑定手机号码
const bindMobile = ()=>import("@/components/login/bindMobile")//第三方绑定手机号码 懒加载
// import WXLogin from '@/components/login/WXLogin'//微信登录
const WXLogin = ()=>import("@/components/login/WXLogin")
// import mineOthers from '@/components/mine/mineOthers'//个人中心，他人
const mineOthers = ()=>import("@/components/mine/mineOthers")// 懒加载 个人中心，他人
// import mine from '@/components/mine/mine'//个人中心，自己
const mine = ()=>import("@/components/mine/mine") //懒加载 个人中心，自己
import basicInfo from '@/components/mine/basicInfo'//个人中心，基本资料
// const basicInfo = ()=>import("@/components/mine/basicInfo") //个人中心，基本资料 懒加载
// import setting from '@/components/mine/setting'//个人中心，账号与设置
const setting = ()=>import("@/components/mine/setting") //懒加载个人中心，账号与设置
// import myPost from '@/components/mine/myPost'//个人中心，我的帖子
const myPost = ()=>import("@/components/mine/myPost")//个人中心，我的帖子 懒加载
// import message from '@/components/mine/message'//个人中心，我的消息
const message = ()=>import("@/components/mine/message") //懒加载 个人中心，我的消息
// import collection from '@/components/mine/collection'//个人中心，我的收藏
const collection = ()=>import("@/components/mine/collection")//懒加载 个人中心，我的收藏
// import attention from '@/components/mine/attention'//个人中心，我的关注
const attention = ()=>import("@/components/mine/attention") // 懒加载 个人中心，我的关注
// import wealth from '@/components/mine/wealth'//个人中心，我的财富
const wealth = ()=>import("@/components/mine/wealth") //懒加载 个人中心，我的财富
// import addressModule from '@/components/mine/addressModule'//个人中心，我的地址
const addressModule = ()=>import("@/components/mine/addressModule") //懒加载 个人中心，我的地址
// import bankCard from '@/components/mine/bankCard'//个人中心，我的银行卡
const bankCard = ()=>import("@/components/mine/bankCard") //懒加载 我的银行卡
// import integral from '@/components/mine/integral'//个人中心，积分兑换
const integral = ()=>import("@/components/mine/integral") //懒加载 积分兑换
// import userGroup from '@/components/mine/userGroup'//个人中心，用户组
const userGroup = ()=>import("@/components/mine/userGroup") //懒加载 个人中心，用户组
import official from '@/components/proof/official'//官方认证
// const official = ()=>import("@/components/proof/official") //懒加载 官方认证
import commissioner from '@/components/proof/commissioner'//产品专员
import vip from '@/components/proof/vip'//会员申请
import address from '@/components/advisory/address'//联系地址
import aboutUs from '@/components/advisory/aboutUs'//关于我们
import feedback from '@/components/advisory/feedback'//意见反馈
import payment from '@/components/advisory/payment'//支付方式
import store from '@/vuex/index'

import about from '@/components/mine/about'   //关于我们

Vue.use(Router)


const router = new Router({
  base:'/',
  mode: 'hash',
  routes: [
    { 
      path: '/',
      component: Home,
      children:[
        {path:'', component:homeContent},
        {path:'/homeContent', component:homeContent},
        {
          path:'forumCenter',
          component:forumCenter,
          children:[
            {path:'', component:postList},
            {
              path: '/postDetail', component: postDetail,
              meta: {
                title: '五区机器人'
              }
            }
          ]
        },
        {path: '/about', component: about},
        {path:'/search', component:search},
        {path:'/newsList', component:newsList},
        {path:'/newsDetail', component:newsDetail,
          meta: {
            title: '五区机器人'
          }
        },
        {path:'/mineOthers', component:mineOthers},
        {
          path:'/mine',
          component:mine,
          children:[
            {path:'', component:basicInfo},
            {path:'/basicInfo', component:basicInfo},
            {path:'/setting', component:setting},
            {path:'/myPost', component:myPost},
            {path:'/message', component:message},
            {path:'/collection', component:collection},
            {path:'/attention', component:attention},
            {path:'/integral', component:integral},
            {path:'/userGroup', component:userGroup},
            {path:'/bankCard', component:bankCard},
            {path:'/wealth', component:wealth},
          ]
        },
        {path:'/official', component:official},
        {path:'/commissioner', component:commissioner},
        {path:'/vip', component:vip},
        {path:'/address', component:address},
        {path:'/aboutUs', component:aboutUs},
        {path:'/feedback', component:feedback},
        {path:'/post', component:post},
        {path:'/payment', component:payment},
      ]
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/bindMobile',
      component: bindMobile,
    },
    {
      path: '/WXLogin',
      component: WXLogin,
    },
    // {path:'*',redirect:'/homeContent'}
  ]
})
export default router;
// 全局路由守卫
router.beforeEach((to, from, next) => {

  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  const nextRoute = ['/basicInfo', '/feedback', '/good-detail', '/cart', '/profile','/vip','/commissioner','/official',"/mine"];
  // let isLogin = store.getters.isLogin; // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.fullPath) >= 0) {
   if (localStorage["sessionId"]||sessionStorage["sessionId"]) {
    // router.push({ path: to.fullPath })

   }else{
    store.dispatch('sendTips', {isTip:true,content:'请先登录'});
    return ;
   }
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
  // 已登录状态；当路由到login时，跳转至home
  // if (to.name === 'login') {
  //  if (isLogin) {
  //   router.push({ name: 'home' });
  //  }
  // }

 });
