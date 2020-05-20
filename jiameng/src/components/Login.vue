<template>
  <div class="login" :style="backgroundImg">
    <!-- top -->
    <Top :text = "loginText"/>
    <!-- 头像 -->
    <div class="loginImg">
      <img src="../assets/img/login/pic_touxiang.png" alt />
      <p>微信账号ID:{{id}}</p>
      <div style="font-size:0px;padding-top:0.5rem;">
        <input type="text" value placeholder="请输入用户名" />
        <input type="text" value placeholder="请输入密码" />
      </div>
    </div>
    <!-- 登录 -->
    <div class="loginRegister">
      <input type="button" value="登录" @click = "IndexClick"/>
    </div>
  </div>
</template>
<script>
// 引入top组件
import Top from "./common/Top"
export default {
  name: "Login",
  data() {
    return {
      backgroundImg: {
        backgroundImage:
          "url(" + require("../assets/img/login/pic_beijing.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      id: "WX18215456874",
      loginText:"登录"
    };
  },
  methods: {
    IndexClick(){
      this.$router.push("/Index");
    }
  },
  components:{
    Top
  }
};
</script>
<style scoped>
.login {
  width: 100%;
}
.loginImg p {
  font-size: 0.14rem;
  color: #666666;
}
@media only screen and (min-device-height: 812px) and (max-device-width: 400px) {
  .loginRegister {
    height: 4.56rem !important;
  }
}
.loginImg input {
  font-size: 0.14rem;
  color: #dddddd;
  background: none;
  outline: none;
  height: 0.6rem;
  line-height: 0.6rem;
  margin: 0px;
  width: 73%;
  border: none;
  border-bottom: 1px solid #dddddd;
  padding: 0px;
}
input:focus {
  color: chocolate;
  outline: none;
}
.loginRegister {
  height: 3.44rem;
}
.loginRegister input {
  width: 70%;
  height: 0.4rem;
  border: none;
  color: white;
  background: cornflowerblue;
  font-size: 0.16rem;
  border-radius: 0.2rem;
}
</style>
