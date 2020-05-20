import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/components/Index') //主界面
const My = () => import("@/components/My") //我的
const Shop = () => import("@/components/Shop") //门店
const Statement = () => import("@/components/Statement") //报表
import Login from '@/components/Login' //登录界面
const FreshAffirm = () => import("@/components/FreshAffirm") //确认订单
const Select = () => import("@/components/Select") //食材分类
const Classify = () => import("@/components/Classify") //分类组件
const FreshMining = () => import("@/components/FreshMining") //鲜采组件
const MakeList = () => import("@/components/MakeList") //制作列表组件
const Practical = () => import("@/components/Practical") //实际消费组件
const Audit = () => import("@/components/Audit") //实际消费组件
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: "/Index",
    name: "Index",
    component: Index
  }, {
    path: "/My",
    name: "My",
    component: My
  }, {
    path: "/Shop",
    name: "Shop",
    component: Shop
  }, {
    path: "/Statement",
    name: "Statement",
    component: Statement
  }, {
    path: "/FreshAffirm",
    name: "FreshAffirm",
    component: FreshAffirm
  }, {
    path: "/Select",
    name: "Select",
    component: Select,
    redirect:"Classify",
    children:[{
      path: "/Classify",
      name: "Classify",
      component: Classify,
      children:[]
    }]
  },{
    path: "/FreshMining",
    name: "FreshMining",
    component: FreshMining
  },{
    path: "/MakeList",
    name: "MakeList",
    component: MakeList
  },{
    path: "/Practical",
    name: "Practical",
    component: Practical
  },{
    path: "/Audit",
    name: "Audit",
    component: Audit
  }]
})
