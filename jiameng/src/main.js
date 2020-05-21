// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Footer from "./components/common/Footer";
import http from "./http/http"
import {Toast} from "vant"
import 'vant/lib/index.css';
Toast.setDefaultOptions({
  duration: 1500
})
Vue.use(Toast);
//添加rem适配
import "./assets/js/rem"
// 全局的css初始化
import "./assets/css/init.css"
import echarts from 'echarts'
// import Axios from 'axios';
Vue.prototype.$echarts = echarts;

// Axios
Vue.prototype.$api = http;

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
