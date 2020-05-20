import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  // mode: 'history',
  scrollBehavior (to, from ,savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }//对于所有路由导航，简单地让页面滚动到顶部。
    }
    // 与keepAlive结合，如果keepAlive的话，保存停留的位置
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   if (from.meta.keepAlive) {
    //     from.meta.savedPosition = document.body.scrollTop;
    //   }
    //   return { x: 0, y: to.meta.savedPosition || 0}
    // }
  },
  // router.beforeEach((to, from, next) => {
  //   // ...
  // })
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/pages/index'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/pages/detail'),
    },
    {
      path: '/reward',
      name: 'reward',
      component: () => import('@/pages/reward'),
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import('@/pages/introduce'),
    },
    {
      path: '/company',
      name: 'company',
      component: () => import('@/pages/company'),
    },
    
  ]
})
