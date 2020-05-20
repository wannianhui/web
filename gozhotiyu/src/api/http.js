import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

const vm = new Vue();


// 配置API接口地址
const URL = process.env.API_ROOT
// alert(URL)

//axios是否需要携带Cookie
// axios.defaults.withCredentials = true

// axios 配置
//发送一般请求
const http = axios.create({
  // timeout: 5000,
  baseURL: URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})
// 提交json数据
const json = axios.create({
  // timeout: 5000,
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 提价表单
const form = axios.create({
  // timeout: 100000,
  baseURL: URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
//添加请求拦截器
http.interceptors.request.use(config => {
  // Do something before request is sent
  // console.log(config)
  // vm.$toast.loading({
  //   mask: false,
  //   message: '加载中...'
  // });
  return config

}, err => {

  return Promise.reject(error);
})

export default {
  get( url,params = {} ){
    return new Promise (async (resolve, reject) => {
      try {
        const data = await http.get(url,{params})
        const code = Number(data.data.code)
        const desc = data.data.desc
        console.log(data.data);
        if (code != 1) {
          vm.$toast(desc)
          console.error('code != 1: ', desc, 'url: ', url);
          if(desc=="用户不存在"){ // code==2
            sessionStorage.removeItem('sessionId');
          }
        }else{
          resolve(data.data)
          vm.$toast.clear()
        }
      }
      catch(err) {
        console.log(err)
        vm.$toast('网络错误,请稍后再试')
      }
    })
  },
  post(url, params = {}, back = true) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.post(url, qs.stringify(params))
        const code = Number(data.data.code)
        const desc = data.data.desc
        if (code != 1) {
          vm.$toast(desc)
        }else{
          resolve(data.data)
          vm.$toast.clear()
        }
      } catch (err) {
        console.log(err)
        vm.$toast('网络错误,请稍后再试')
      }

    })
  },
  json(url, params = {}, back = true) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await json.post(url, JSON.stringify(params))
        const code = Number(data.data.code)
        const desc = data.data.desc
        if (code != 1) {
          vm.$toast(desc)
        }else{
          resolve(data.data)
          vm.$toast.clear()
        }
      } catch (err) {
        console.log(err)
        vm.$toast('网络错误,请稍后再试')
      }

    })
  },
  form(url, params = {}) {
    return new Promise(async (reslove, reject) => {
      try {
        const data = await form.post(url, params)
        const code = Number(data.data.code)
        const desc = data.data.desc
        if (code != 1) {
          vm.$toast(desc)
        }else{
          reslove(data.data)
          vm.$toast.clear()
        }
      } catch (err) {
        console.log(err)
        vm.$toast('网络错误,请稍后再试')
      }
    })
  },
  session() {
    return sessionStorage.getItem('sessionId')
  }
}
