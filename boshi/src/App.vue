<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import rem from './rem/rem.js'
import { mapState } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  mounted() {
    //更新版本
    console.log("更新版本2020.4.28.13.42");
    // mapState([
    //   "isLogin"
    // ]),
    // console.log("%c -----进入app-----","color:red")
    // console.log("%c 初始获取sessionId","color:green",localStorage["sessionId"])
    // console.log("%c 初始获取登录状态isLogin","color:green",this.$store.state.isLogin)
  },
  methods: {
    // reload () {
    //   this.isRouterAlive = false
    //   this.$nextTick(function () {
    //     this.isRouterAlive = true
    //   })
    // }
    clickbool(num) {
      this.pagestart = num;
    }
  }
};
</script>

<style>
@import "styles/reset.css";
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
body {
  background: #f4f4f4;
}
@media only screen and (min-device-height: 812px) and (max-device-width: 400px) {
  section {
    padding-bottom: 120px;
  }
}
.vl-notify {
  z-index: 999999 !important;
}
.default {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.default img {
  width: 80%;
}
</style>
