// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Footer from "./components/common/Footer";
//添加rem适配
import "./assets/js/rem"
// 全局的css初始化
import "./assets/css/init.css"
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
//定义一个全局的footer
Vue.component('Footer', Footer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
