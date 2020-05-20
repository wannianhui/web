<template>
  <div :style="{backgroundImage: 'url('+ httpImg +'bg_sign.jpg)'}" class="homePage">
    <section>
      <div class="boxModule">
        <div v-show="ISLogin!=2" class="loginModule">
          <div class="title">
            <router-link to="/homeContent"></router-link>
          </div>
          <ul>
            <li :class="{'loginHover':ISLogin==0}" @click="ISLoginModele()">账号登录</li>
            <li :class="{'loginHover':ISLogin==1}" @click="ISLoginModele()">注册</li>
          </ul>
          <!-- //登录 -->
          <div class="ISLogin" v-show="ISLogin==0">
            <div class="inputCom">
              <input
              type="text"
              placeholder="手机号/邮箱"
              v-model="accounts"
              @blur="inputFunc('accounts')"
              >
              <p v-show="inputState!=0">
                手机或邮箱格式错误
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(inputState==0)&&(accounts!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom lastInput">
              <input type="password" placeholder="请输入密码" v-model="password" class="lastInput" @blur="inputFunc('password')">
              <p v-show="passwordState!=0">
                密码格式错误
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(passwordState==0)&&(password!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>

            <div class="select">
              <div @click="isSelect('login')">
                <img src="../../../static/img/icon_square_1.png" alt v-show="!isSelected">
                <img src="../../../static/img/icon_square.png" alt v-show="isSelected">
                <span>下次自动登录</span>
              </div>
              <span @click="reset()">忘记密码</span>
            </div>
            <div class="loginFailed loginButton" v-show="isThrough" @click="login()">登录</div>
            <div class="loginThrough loginButton" v-show="!isThrough">登录</div>
          </div>
          <!-- 注册 -->
          <div class="isRegister" v-show="ISLogin==1">
            <div class="inputCom">
              <input type="text" placeholder="用户名" v-model="name" @blur="inputFunc('name')">
              <p v-show="(name!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom">
              <input
              type="text"
              placeholder="手机号或邮箱"
              v-model="accounts"
              @blur="inputFunc('accounts')"
              >
              <!-- <p v-show="inputState!=0"><span>*</span>手机或邮箱格式错误</p> -->
              <p v-show="inputState!=0">
                手机或邮箱格式错误
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(inputState==0)&&(accounts!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom code">
              <div>
                <input
                  type="text"
                  name="code"
                  v-model="inputCode"
                  placeholder="验证码"
                  @blur="inputFunc()"
                >
              </div>
              <button
                @click="getCode('register')"
                :class="{ 'count': !show,}"
                class="code-btn"
                :disabled="!show"
              >
                <span v-show="show">获取验证码</span>
                <span v-show="!show">重新发送{{count}}s</span>
              </button>
            </div>
            <div class="inputCom">
              <input
              type="password"
              placeholder="输入密码6-16位，字母+数字"
              v-model="password"
              @blur="inputFunc('password')"
              >
              <!-- <p v-show="passwordState!=0"><span>*</span>密码必须由6-16位数字或者字母组成</p> -->
              <p v-show="passwordState!=0">
                密码格式错误
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(passwordState==0)&&(password!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom lastInput">
              <input
              type="password"
              placeholder="确认密码"
              v-model="againPassw"
              class="lastInput"
              @blur="inputFunc('againPassw')"
              autocomplete="new-password"
              >
              <p v-show="againPasswState!=0">
                两次输入不一致
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(againPasswState==0)&&(againPassw!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="select">
              <div @click="isSelect('protocol')">
                <img src="../../../static/img/icon_square_1.png" alt v-show="!read">
                <img src="../../../static/img/icon_square.png" alt v-show="read">
                <span>我已经阅读<a @click.stop="goAbout">《五区机器人网站》</a>相关协议</span>
              </div>
            </div>
            <div class="loginFailed loginButton" v-show="isThrough" @click="register()">注册</div>
            <div class="loginThrough loginButton" v-show="!isThrough">注册</div>
          </div>
        </div>
        <!-- 找回密码 -->
        <div v-show="ISLogin==2" class="reset">
          <div class="borderTop">
            <span></span>
            <span></span>
          </div>
          <div class="resetBox">
            <h2>找回密码</h2>
            <div class="inputCom">
              <input
              type="text"
              placeholder="请输入手机号"
              v-model="accounts"
              @blur="inputFunc('phone')"
              >
              <p v-show="inputState!=0">
                手机号不合法
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(inputState==0)&&(accounts!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom code">
              <div>
                <input
                  type="text"
                  name="code"
                  v-model="inputCode"
                  placeholder="验证码"
                  @blur="inputFunc()"
                >
                <p v-show="codeState==1&&(inputCode!='')">
                  验证码错误
                  <img src="../../../static/img/icon_mark.png" alt>
                </p>
                <p v-show="(codeState==0)&&(inputCode!='')">
                  <img src="../../../static/img/icon_ok.png" alt>
                </p>
              </div>
              <button
                @click="getCode('find')"
                :class="{ 'count': !show,}"
                class="code-btn"
                :disabled="!show"
              >
                <span v-show="show">获取验证码</span>
                <span v-show="!show">重新发送{{count}}s</span>
              </button>
            </div>
            <div class="inputCom">
              <input
              type="password"
              placeholder="输入密码6-16位，字母+数字"
              v-model="password"
              @blur="inputFunc('password')"
              >
              <p v-show="passwordState!=0">
                密码格式错误
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(passwordState==0)&&(password!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="inputCom">
              <input
              type="password"
              placeholder="确认密码"
              v-model="againPassw"
              @blur="inputFunc('againPassw')"
              >
              <p v-show="againPasswState!=0">
                两次输入不一致
                <img src="../../../static/img/icon_mark.png" alt>
              </p>
              <p v-show="(againPasswState==0)&&(againPassw!='')">
                <img src="../../../static/img/icon_ok.png" alt>
              </p>
            </div>
            <div class="loginFailed loginButton" v-show="isThrough" @click="resetPass()">重置</div>
            <div class="loginThrough loginButton" v-show="!isThrough">重置</div>
            <h3>
              记起来了，
              <span @click="isSelect('returnLogin')">返回登录</span>
            </h3>
          </div>
        </div>

        <div class="thirdParty" v-show="ISLogin!=2">
          <a
            href="https://graph.qq.com/oauth2.0/authorize?client_id=101540935&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3a%2f%2fwww.drluck.club%2fhomeContent"
          >
            <img src="../../../static/img/log_qq_hoverActive.png" alt>
          </a>
          <a href="javascript:void(0);" id="wx_qrcode" @click="wxBtn()">
            <img src="../../../static/img/log_wechat_hoverActive.png" alt>
          </a>
          <a href="https://api.weibo.com/oauth2/authorize?client_id=302770164&response_type=code&redirect_uri=http://www.drluck.club/homeContent" @click="weiboBtn()">
            <img
              src="../../../static/img/log_blog_hoverActive.png"
              alt
            >
            <!--onmouseover="this.src='../../../static/img/log_blog_hoverActive.png'"
              onmouseout="this.src='../../../static/img/log_blog_dufalut.png'"-->
          </a>
        </div>
      </div>

      <div class="verCodeTips" v-show="isCode">
        <div>
          <h3>验证码已发送至手机</h3>
          <p>{{accounts}}</p>
          <span>测试验证码为1234</span>
          <button @click="tips()">确 定</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";

export default {
  data() {
    return {
      qqMsg: "", //qq登录
      ISLogin: 0, // 是否处于登录中 0登录 1注册 2忘记密码
      isCode: false, //是否点击获取验证码
      isSelected: true, // 选择记录密码
      read: true, // 默认已阅读
      isThrough: false, // 验证是否全部通过
      httpImg: this.global.httpImg, //全局的图片路径
      accounts: "", //登录账号
      password: "", //登录密码
      inputState: "", //验证账号 0是通过 1邮箱验证错误 2手机号验证错误 3密码验证错误
      passwordState: "", //验证0是通过 1是密码格式错误
      againPasswState: "", //0通过，1不通过
      codeState: "", //验证码状态值
      name: "", //注册的用户名
      againPassw: "", //重复写入的密码
      inputCode: "", //输入的验证码
      show: true,
      count: "",
      timer: null
      // verCode:'', //验证码
    };
  },
  components: {},
  mounted: function() {
    const that = this;
    var ISLogin = this.$route.query.ISLogin;
    ISLogin == undefined ? (ISLogin = 0) : "";
    this.ISLogin = ISLogin;
  },
  watch: {
  },
  methods: {
    //跳转关于我们
    goAbout(){
      this.$router.push({path: '/about'});
    },
    wbBtn() {
      WB2.login(function() {
        //登录授权
        WB2.anyWhere(function(W) {
          W.parseCMD(
            "/account/get_uid.json",
            function(oResult1, bStatus) {
              //获取用户uid
              if (bStatus) {
                W.parseCMD(
                  "/users/show.json",
                  function(oResult2, bStatus) {
                    //通过uid获取用户信息
                    if (bStatus) {
                      var args = {
                        openid: oResult2.id, //获取用户openid
                        access_token: WB2.oauthData.access_token, //获取用户access_token
                        username: oResult2.name, //获取用户名
                        userHeadImg: oResult2.profile_image_url //获取用户微博头像
                      };
                      //然后根据实际情况进行自己网站的一些认证处理
                    }
                  },
                  { uid: oResult1.uid },
                  { method: "get", cache_time: 30 }
                );
              }
            },
            {},
            { method: "get", cache_time: 30 }
          ); //默认是post请求方法

        });
      });
    },
    /*
     * 微信登录
     * */
    wxBtn() {
      this.$router.push({ path: "/WXLogin" });
    },
    /*
     * 微博登录
     * */
    weiboBtn() {
      // WB2.anyWhere(function(W) {
      //   //数据交互
      //   W.parseCMD(
      //     "/users/show.json",
      //     function(oResult, bStatus) {
      //       // console.log(oResult, bStatus, 376);
      //       if (bStatus) {
      //         console.log(oResult);
      //         console.log(bStatus);
      //       }
      //     },
      //     {
      //       screen_name: "姚晨"
      //     },
      //     {
      //       method: "get",
      //       cache_time: 30
      //     }
      //   );
      // });
      // WB2.login(function() {
      // });
    },
    isSelect(name) {
      // 是否选择记录密码
      if (name == "login") {
        this.isSelected = !this.isSelected;
      } else if (name == "protocol") {
        if (this.read == false) {
          this.read = true;
          this.isThrough = true;
        } else {
          this.read = false;
          this.isThrough = false;
        }
      } else if (name == "returnLogin") {
        this.ISLogin = 0;
      }
    },
    ISLoginModele() {
      // 是否处于登录中
      if (this.ISLogin == 0) {
        this.ISLogin = 1;
        this.password = "";
        this.passwordState = 0;
      } else {
        this.ISLogin = 0;
        this.accounts = "";
        this.password = "";
        this.passwordState = 0;
      }
    },
    reset() {
      //密码
      this.ISLogin = 2;
      this.password = "";
      this.accounts = "";
      this.inputState = 0;
      this.passwordState = 0;
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
      this.clearData();
    },
    login() {
      //登录
      let that = this;
      let password = this.password;
      let accounts = this.accounts;
      let isEmail = this.isEmail == true ? (isEmail = 1) : (isEmail = 0);

      that.$http
        .post(
          that.$api + "/user/login",
          qs.stringify({
            mobile: accounts,
            email: accounts,
            password: password,
            type: isEmail
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(function(res) {
          // console.log("%c 登录信息", "color:green", res);
          that.$layer.msg(res.data.desc);
          if (res.data.code != 1) {
            //登录未成功
          } else {
            //登录成功
            that.$store.dispatch("isLogin", true); //在vuex记录登录状态
            that.$store.state.userInfo = res.data.data;
            if (that.isSelected == true) {
              localStorage.sessionId = res.data.data.sessionId;
            } else {
              sessionStorage.setItem("sessionId", res.data.data.sessionId);
            }

            setTimeout(function() {
              that.$router.go(-1);
            }, 500);
          }
        })
        .catch(function(error) {
          that.$layer.msg(error);
          console.log(error);
        });
    },
    register() {
      //注册
      let that = this;
      let name = this.name;
      let password = this.password;
      let accounts = this.accounts;
      let inputCode = this.inputCode;
      let isEmail = this.isEmail == true ? (isEmail = 1) : (isEmail = 0);
      //请求注册接口
      that.clearData(); //重置数据
      that.$http
        .post(
          that.$api + "/user/register",
          qs.stringify({
            name: name,
            mobile: accounts,
            code: inputCode,
            password: password,
            repeatPassword: password,
            type: isEmail,
            email: accounts
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(function(res) {
          // console.log("%c 注册信息", "color:green", res);
          that.$layer.msg(res.data.desc);
          if (res.data.code != 1) {
            //注册未成功
          } else {
            //注册成功
            that.$store.dispatch("isLogin", true); //在vuex记录登录状态
            sessionStorage.setItem("sessionId", res.data.data.sessionId);
            setTimeout(function() {
              that.$router.go(-1);
            }, 500);
          }
        })
        .catch(function(error) {
          that.$layer.msg(error);
          // console.log(error);
        });
    },
    clearData() {
      //重置数据
      this.password = "";
      this.accounts = "";
      this.inputState = 0;
      // this.verCode = '';
      this.passwordState = 0;
      this.timer = null;
    },
    resetPass() {
      //重置密码
      let that = this;
      let accounts = that.accounts;
      let inputCode = that.inputCode;
      let password = that.password;
      //请求注册接口

      that.$http
        .post(
          that.$api + "/user/updateForgetPassword",
          qs.stringify({
            mobile: accounts,
            code: inputCode,
            password: password,
            repeatPassword: password

          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(function(res) {
          // console.log("%c 重置密码", "color:green", res);

          if (res.data.code != 1) {
            //重置未成功
            that.$layer.msg(res.data.desc);
          } else {
            //重置成功
            that.clearData(); //重置数据
            that.ISLogin = 0;
            setTimeout(function() {
              that.$layer.msg("修改成功，请登录");
            }, 500);
          }
          // that.ISLogin = 0; //跳转到登录组件
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },

    // 封装的一个input事件，name为input的名字
    inputFunc(name) {
      //初始化
      let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; //验证密码
      let regMailbox = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //验证邮箱
      let regPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //验证手机号
      let password = this.password.replace(/(^\s*)|(\s*$)/g, ""); //密码
      let accounts = this.accounts.replace(/(^\s*)|(\s*$)/g, ""); //账号
      let againPassw = this.againPassw.replace(/(^\s*)|(\s*$)/g, ""); //再次输入的密码
      let inputCode = this.inputCode.replace(/(^\s*)|(\s*$)/g, ""); //输入的验证码
      let login = this.ISLogin;

      if (name == "accounts") {
        if (accounts == "") {
          this.inputState = 0;
        } else if (accounts.indexOf("@") != -1) {
          //邮箱
          if (!regMailbox.test(accounts)) {
            this.inputState = 1; //邮箱错误
          } else {
            this.inputState = 0;
            this.isEmail = true;
          }
        } else {
          //手机号
          if (!regPhone.test(accounts)) {
            this.inputState = 2; //手机号错误
          } else {
            this.inputState = 0;
            this.isEmail = false;
          }
        }
      } else if (name == "phone") {
        if (accounts == "") {
          this.inputState = 0;
        } else if (!regPhone.test(accounts)) {
          this.inputState = 2; //手机号错误
        } else {
          this.inputState = 0;
        }
      } else if (name == "password") {
        if (password == "") {
          this.passwordState = 0;
        } else if (!regPassword.test(password)) {
          this.passwordState = 1; //1邮箱错误
        } else {
          this.passwordState = 0;
        }
      } else if (name == "againPassw") {
        if (againPassw == "") {
          this.againPasswState = 0;
        } else if (againPassw != password) {
          this.againPasswState = 1;
        } else {
          this.againPasswState = 0;
        }
      }

      if (inputCode != "") {
        this.codeState = 0;
      } else {
        this.codeState = 1;
      }

      if (login == 0) {
        //如果是登录中
        if (this.inputState == 0 && this.passwordState == 0) {
          this.isThrough = true;
        } else {
          this.isThrough = false;
        }
      } else if (login == 1) {
        //如果是注册
        // console.log(this.inputCode + "--" + this.verCode);
        if (
          this.inputState == 0 &&
          this.passwordState == 0 &&
          this.againPasswState == 0 &&
          this.name != ""
        ) {
          //isThrough
          this.isThrough = true;
        } else {
          this.isThrough = false;
        }
      } else if (login == 2) {
        //如果是忘记密码
        if (
          this.codeState == 0 &&
          this.passwordState == 0 &&
          this.againPasswState == 0
        ) {
          // if( (this.codeState == 0) && (this.passwordState == 0) && (this.againPasswState == 0) ) {
          this.isThrough = true;
        } else {
          this.isThrough = false;
        }
      }
    },
    //获取验证码
    getCode(type) {
      let typeCode = "";
      this.timer = null;
      if (type == "find") {
        //如果是找回密码验证码
        typeCode = "getForgetCode";
      } else {
        //如果是注册验证码
        typeCode = "getRegisterCode";
      }
      let isEmail = this.isEmail == true ? (isEmail = 1) : (isEmail = 0);
      if (this.accounts == "") {
        // alert("发送账号不能为空！")
        this.$layer.msg("发送账号不能为空！");
      } else if (!this.timer) {
        // console.log("code:1234")
        //注册验证码
        this.$http
          .get(
            this.$api +
              "/user/" +
              typeCode +
              "?mobile=" +
              this.accounts +
              "&type=" +
              isEmail +
              "&email=" +
              this.accounts
          )
          .then(res => {
            if (res.data.code == 0) {
            } else {
              this.count = 60;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= 60) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            this.data = res.data.data;
            // console.log("%c 验证码", "color:green", res.data);
            this.$layer.msg(res.data.desc);
          });
        this.verCode = 1234;
        // this.tips();
      }
    },
    //提示
    tips() {
      this.isCode = !this.isCode;
    }
  },
  computed: {
    ...mapState(["isLogin", "accessToken"])
  }
};
</script>

<style scoped lang="scss">
@import "../../common/common.scss";
section{
  padding-bottom:0px;
}
.verCodeTips {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.1);
  & > div {
    width: 334px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 40px 0px rgba(63, 63, 63, 0.71);
    box-sizing: border-box;
    padding: 29px 0 35px 0;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    color: rgba(51, 51, 51, 1);
    & > h3 {
      font-size: 18px;
      font-weight: 400;
    }
    & > p {
      font-size: 18px;
      font-weight: bold;
      margin: 10px 0 0 0;
    }
    & > button {
      border: none;
      outline: none;
      width: 106px;
      height: 38px;
      background: rgba(73, 189, 255, 1);
      border-radius: 2px;
      color: white;
      cursor: pointer;
      display: block;
      margin: 20px auto 0 auto;
    }
  }
}

.homePage {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
  section {
    width: 100%;
    height: 100%;
    position: relative;
    .boxModule {
      width: 460px;
      background: white;
      box-sizing: border-box;
      box-shadow: 0px 3px 50px 0px rgba(0, 0, 0, 0.56);
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loginModule {
      padding: 80px 58px 22px 58px;
      .title {
        width: 232px;
        height: 103px;
        // background:rgba(12,29,43,1);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -36px;
        background-image: url("../../../static/img/logo_login.png");
        background-size: 100% 100%;
        a {
          display: block;
          height: 100%;
        }
      }
      & > ul {
        text-align: center;
        display: inline-block;
        li {
          float: left;
          text-align: center;
          margin-right: 120px;
          padding: 0 6px 10px 6px;
          color: #8d8d8d;
          cursor: pointer;
          box-sizing: border-box;
          height: 34px;
          font-size: 16px;
          &:hover {
            border-bottom: 1px solid #49bdff;
            color: #49bdff;
          }
          &:last-child {
            margin-right: 0;
          }
        }
        .loginHover {
          border-bottom: 1px solid #49bdff;
          color: #49bdff;
        }

        @include clearFloat();
      }
    }
    .ISLogin,
    .isRegister,
    .reset {
      .inputCom {
        position: relative;
        margin-bottom: 20px;

        input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          border-bottom: 1px solid #d9d9d9;
          padding: 7px 0;
        }

        p {
          position: absolute;
          right: 0;
          top: 8px;
          color: #e43d3d;
          font-size: 12px;
          span {
            color: red;
            display: inline-block;
            vertical-align: middle;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
          }
        }

        &:last-child {
          & > input {
            margin-bottom: 0;
          }
        }
      }
      .code {
        div {
          width: 60%;
          float: left;
          position: relative;
          input {
            width: 100%;
          }
        }

        button {
          cursor: pointer;
          border: none;
          outline: none;
          background: white;
          width: 120px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid #49bdff;
          font-size: 14px;
          color: #49bdff;
          float: right;
        }
        .count {
          background: #cacaca;
          color: white;
          border: none;
        }
        @include clearFloat();
      }
      .lastInput {
        margin-bottom: 0 !important;
      }

      .select {
        height: 40px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 12px;
          height: 12px;
          cursor: pointer;
        }
        span {
          font-size: 14px;
          color: #8d8d8d;
          cursor: pointer;
        }
      }
      .loginButton {
        height: 52px;
        line-height: 52px;
        text-align: center;
        color: #ffffff;
        font-size: 18px;
        border-radius: 2px;
        cursor: pointer;
      }
      .loginThrough {
        background: #e5e5e5;
      }
      .loginFailed {
        background: #49bdff;
      }
    }
    .reset {
      .resetBox {
        padding: 36px 60px 55px 60px;
        box-sizing: border-box;
        position: relative;
        & > h3 {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(192, 192, 192, 1);
          position: absolute;
          right: 59px;
          bottom: 33px;
          span {
            color: #49bdff;
            cursor: pointer;
          }
        }
      }
      .borderTop {
        font-size: 0;
        height: 8px;
        span {
          height: 100%;
          display: inline-block;
          &:nth-of-type(1) {
            background: #0c1d2b;
            width: 85px;
          }
          &:nth-of-type(2) {
            background: #cfe300;
            width: 375px;
          }
        }
      }
      h2 {
        font-size: 24px;
        color: #49bdff;
      }
    }
    .thirdParty {
      display: flex;
      padding: 0 66px 40px 66px;
      justify-content: space-between;
      align-items: center;
      img {
        // filter: grayscale(100%);
        cursor: pointer;
        // opacity: 0.6;
        &:hover {
          filter: none;
          opacity: 1;
        }
      }
    }
  }
}
</style>
