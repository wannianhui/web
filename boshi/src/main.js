// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// window.localPath='https://www.quatechschool.com:8080/kksy/api';
// import Vue from 'vue'
// import Vue from "./assets/vue"
import App from './App'
// import ELEMENT  from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
// import axios from 'axios'
import layer from 'vue-layer' //弹出层
import store from './vuex/index'
import 'babel-polyfill'; // 解决ie下显示空白的问题
// import 'swiper/dist/css/swiper.css'; //引入swiper样式
import qs from 'qs'
Vue.prototype.$qs = qs;

import {
  emoji
} from './utils/emoji.js'

// 导入共用组件
import global from './common/common'

Vue.prototype.global = global;
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
// Vue.prototype.$api = 'https://www.quatechschool.com:8080/kksy/api'

// let serverAddress = 'http://finet.asuscomm.com:8084/lbs'; // 8082是俊杰 8081
//let serverAddress = 'http://www.drluck.club:8080/lbs'; // 正式服
let serverAddress = 'http://www.drluck.cn:8080/lbs'; // 正式服 去掉8080端口
let ossAddress = "https://mingze.oss-cn-shenzhen.aliyuncs.com"; //图片的地址，部署在oss中
// let serverAddress = 'http://10.0.0.160/LeBoShi_BM';
Vue.prototype.$httpImg = ossAddress;
Vue.prototype.$api = serverAddress + '/api';
Vue.prototype.$event = new Vue();
Vue.prototype.emoji = emoji

// axios.defaults.baseURL= process.env.API_ROOT;
axios.defaults.withCredentials = true; // 让 ajax 携带 cookie
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* eslint-disable no-new */

// 跳转后返回顶部
// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('real-img', async function (el, binding) { //指令名称为：real-img
  let imgURL = binding.value; //获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute('src', imgURL);
    }
  }
})

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function () {
      console.log("ok", 63)
      resolve(false);
      img = null;
    }
    img.src = url;
  })
}
Vue.use(ELEMENT);
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})


const oldSetItem = window.localStorage.setItem
window.localStorage.setItem = function (k, v) {
  if (k === 'accessToken') {
    console.log("ok", 85)
  }
  oldSetItem(k, v)
}
