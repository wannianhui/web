<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}" @click="setActive(0)">偏好设置</li>
        <li :class="{ 'active': isActive != 0}" @click="setActive(1)">账号安全</li>
      </ul>
    </h3>
    <div>
      <ul v-show="isActive == 0">
        <li>
          <span>系统通知</span>
          <p>随时随地知道帖子审核结果、加精、置顶等等</p>
          <!-- <transition name="show"> -->
          <div :class="{ 'circleActive': is_system_notice==1}" @click="circleCli('isCircle')">
            <span></span>
          </div>
          <!-- </transition> -->
        </li>
        <li>
          <span>消息通知</span>
          <p>评论的实时通知</p>
          <div :class="{ 'circleActive': is_notice==1}" @click="circleCli('isMessage')">
            <!-- <transition name="show"> -->
            <span></span>
            <!-- </transition> -->
          </div>
        </li>
      </ul>
      <ol v-show="isActive == 1">
        <li>
          <span>手机账号</span>
          <p>可以使用手机{{xingMobile}}登录</p>
          <button @click="openPopups({type:'phone'})" v-if="userDatas.username!=null">修改</button>
          <button @click="openPopups({type:'phone'})" v-else>绑定</button>
        </li>
        <li>
          <span>邮箱账号</span>
          <p v-if="userDatas.userExtend.email!=null">可以使用邮箱{{newEmail}}登录</p>
          <p v-else>绑定邮箱，让你的账号更安全，登录更方便</p>
          <button @click="openPopups({type:'email'})" v-if="userDatas.userExtend.email!=null">修改</button>
          <button @click="openPopups({type:'email'})" v-else>绑定</button>
        </li>
        <li>
          <span>登录密码</span>
          <p>密码要求密码长度6-16位，字母或数字组合，建议您经常修改密码，以保证账号安全</p>
          <button @click="openPopups({type:'passw'})">更换</button>
        </li>
        <li>
          <span>支付密码</span>
          <p>设置支付密码，让钱包安全</p>
          <button @click="openPopups({type:'pay'})">更换</button>
        </li>
      </ol>
      <div class='modifyPhone' v-show="openTips">
        <div>
          <h3>修改绑定手机号<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="openPopups({type:'phone'})"></h3>
          <ul>
            <li>
              <span>现绑手机</span>
              <p>{{xingMobile}}</p>
            </li>
            <li>
              <span>新手机号</span>
              <input type="text" placeholder="输入新手机号码" v-model="new_mobile">
            </li>
            <li>
              <span>验证码</span>
              <!-- <input type="text" placeholder="输入6位数验证码"> -->
              <div class="code">
                <div>
                  <input type="text" name="code" v-model="inputCode" placeholder="请输入验证码" v-on:input='inputFunc()'>
                </div>
                <button @click="getCode(1)" :class="{ 'count': !show,}" class="code-btn" :disabled="!show">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show">重新发送{{count}}s</span>
                </button>
              </div>
            </li>
          </ul>
          <button @click="modifyPhone({name:'phone'})">确认修改</button>
        </div>
      </div>

      <div class='modifyPhone' v-show="openEmail">
        <div class="email241">
          <h3>更换邮箱<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="openPopups({type:'email'})"></h3>
          <ul>
            <li>
              <span>邮箱</span>
              <input type="text" placeholder="输入邮箱" v-model="email">
            </li>
            <li>
              <span>验证码</span>
              <!-- <input type="text" placeholder="输入6位数验证码"> -->
              <div class="code">
                <div>
                  <input type="text" name="code" v-model="inputCode" placeholder="请输入验证码" v-on:input='inputFunc()'>
                </div>
                <button @click="getCode(2)" :class="{ 'count': !show,}" class="code-btn" :disabled="!show">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show">重新发送{{count}}s</span>
                </button>
              </div>
            </li>
          </ul>
          <button @click="modifyPhone({name:'email'})">确认修改</button>
        </div>
      </div>

      <div class='modifyPhone ' v-show="openPassw">
        <div class="password312">
          <h3>修改登录密码<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="openPopups({type:'passw'})"></h3>
          <ul>
            <li>
              <span>手机号码</span>
              <p>{{xingMobile}}</p>
            </li>
            <li>
              <span>验证码</span>
              <!-- <input type="text" placeholder="输入6位数验证码"> -->
              <div class="code">
                <div>
                  <input type="text" name="code" v-model="inputCode" placeholder="请输入验证码" v-on:input='inputFunc()'>
                </div>
                <button @click="getCode(3)" :class="{ 'count': !show,}" class="code-btn" :disabled="!show">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show">重新发送{{count}}s</span>
                </button>
              </div>
            </li>
            <li>
              <span>新密码</span>
              <input type="password" placeholder="输入密码6-16位，字母或数字组合" autocomplete="new-password" v-model="password">
            </li>
            <li>
              <span>重复密码</span>
              <input type="password" placeholder="重复密码" autocomplete="new-password" v-model="respassword">
            </li>
          </ul>
          <button @click="modifyPhone({name:'passw'})">确认修改</button>
        </div>
      </div>

      <div class='modifyPhone ' v-show="openPay">
        <div class="password312">
          <h3>重置支付密码<img :src="httpImg+'icon_cancle_card_black.png'" alt="" @click="openPopups({type:'pay'})"></h3>
          <ul>
            <li>
              <span>手机号码</span>
              <p>{{xingMobile}}</p>
            </li>
            <li>
              <span>验证码</span>
              <!-- <input type="text" placeholder="输入6位数验证码"> -->
              <div class="code">
                <div>
                  <input type="text" name="code" v-model="inputCode" placeholder="请输入验证码" v-on:input='inputFunc()'
                    maxlength="4">
                </div>
                <button @click="getCode(4)" :class="{ 'count': !show,}" class="code-btn" :disabled="!show">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show">重新发送{{count}}s</span>
                </button>
              </div>
            </li>
            <li>
              <span>支付密码</span>
              <input type="password" placeholder="请输入6位数字密码" v-model="payword" maxlength="6"
                autocomplete="new-password">
            </li>
            <li>
              <span>重复密码</span>
              <input type="password" placeholder="重复密码" v-model="respayword" maxlength="6" autocomplete="new-password">
            </li>
          </ul>
          <button @click="modifyPhone({name:'pay'})">确认修改</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import pagination from '@/common/pagination';
  import { mixin } from "@/common/mixin.js";
  import {
    mapState
  } from 'vuex';
  // import { parse } from 'querystring';

  export default {
    mixins: [mixin],
    data() {
      return {
        isActive: 0, //默认下标
        sessionId: '',
        httpImg: this.global.httpImg, //全局的图片路径
        is_system_notice: 0, //系统通知 0关闭，1 开启'
        is_notice: 0, //消息通知 0关闭，1 开启
        new_mobile: '', //输入新手机号码
        email: '', //输入绑定邮箱
        password: '', //新密码
        respassword: '', //重复新密码
        payword: '', //支付密码
        respayword: '', //重复支付密码
        openTips: false, //打开提示窗
        openEmail: false, //打开邮箱窗口
        openPassw: false, //打开密码窗口
        openPay: false, //打开支付窗口
        inputCode: '', //输入的验证码
        show: true,
        count: '',
        timer: null,
        verCode: '', //验证码
        userDatas: {
          userExtend: {
            email: ''
          }
        }, //用户信息
        xingMobile: '', //处理过的手机号码
        newEmail: '', //处理过的邮箱
        mobile: '', //用户原电话号码
        pay: 1,
      }
    },
    created: function () {
      const that = this;
    },
    mounted: function () {
      this.postsShow = this.latestRanking;
      let that = this;

      if (that.$route.query.Active) {
        that.isActive = that.$route.query.Active
      }
      if (that.$route.query.pay == 0) {
        that.openPay = true;
        that.isActive = 1;
        that.pay = 0;
      }
      let userInfo = that.userInfo;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.xingMobile = userInfo.username.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2"); //用户号码
      if (userInfo.userExtend.email != null) {
        that.newEmail = userInfo.userExtend.email.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
        console.log(that.newEmail, 233)
      }
      that.userDatas = userInfo;
      // console.log(that.userDatas,231)
      that.is_system_notice = userInfo.is_system_notice; //系统通知  0关闭，1 开启',
      that.is_notice = userInfo.is_notice; //系统通知

    },

    components: {
      // 'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "userInfo",
      ])
    },
    methods: {
      setActive(index) {
        if (index != this.isActive) {
          this.isActive = index;
        }
      },
      circleCli(cont) {
        let that = this;
        let isSystemNotice = that.is_system_notice;
        let isNotice = that.is_notice;
        if (cont == 'isCircle') { //系统通知
          isSystemNotice == 0 ? isSystemNotice = 1 : isSystemNotice = 0;
        } else {
          isNotice == 0 ? isNotice = 1 : isNotice = 0;
        }
        that.$http.get(that.$api + "/user/updateUser", {
          params: {
            sessionId: that.sessionId,
            isSystemNotice: isSystemNotice,
            isNotice: isNotice
          }
        }).then((res) => {
          console.log('%c 设置系统通知:', 'color:green', res)
          const that = this;
          let userInfo = that.userInfo;
          if (res.data.code == 1) {
            cont == 'isCircle' ? that.is_system_notice = isSystemNotice : that.is_notice = isNotice;
            if (cont == 'isCircle') { //系统通知
              that.is_system_notice = isSystemNotice;
              userInfo.is_system_notice = isSystemNotice;
            } else {
              that.is_notice = isNotice;
              userInfo.is_notice = isNotice;
            }
            that.$store.dispatch('userInfo', userInfo)

            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '操作成功'
            });
          }
          // that.$layer.msg(res.data.desc);
        })
      },
      openPopups({
        type = ''
      } = {}) {
        if (type == 'phone') {
          this.openTips = !this.openTips;
        } else if (type == 'email') {
          this.openEmail = !this.openEmail;
        } else if (type == 'passw') {
          this.openPassw = !this.openPassw;
        } else if (type == 'pay') {
          this.openPay = !this.openPay;
        }

      },
      // 封装的一个input事件，name为input的名字
      inputFunc(name) {
        //初始化
        let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; //验证密码
        let regMailbox = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //验证邮箱
        let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/; //验证手机号
        // let password = this.password.replace(/(^\s*)|(\s*$)/g, ""); //密码
        // let accounts = this.accounts.replace(/(^\s*)|(\s*$)/g, ""); //账号
        // let againPassw = this.againPassw.replace(/(^\s*)|(\s*$)/g, ""); //再次输入的密码
        // let inputCode = this.inputCode.replace(/(^\s*)|(\s*$)/g, ""); //输入的验证码
        // let login = this.ISLogin;




      },
      //修改手机
      modifyPhone({
        name = ''
      } = {}) {
        // console.log(this.$layer)
        // this.$layer.msg('获取用户信息成功');
        let that = this;
        // return false;
        let inputCode = that.inputCode;
        if (name == 'phone') {
          let new_mobile = that.new_mobile;
          that.openTips = false;
          that.$http.get(that.$api + "/user/changePhone?sessionId=" + that.sessionId + "&mobile=" + new_mobile +
            '&code=' + inputCode).then((res) => {
            that.data = res.data.data;
            that.inputCode = ''; //重置验证码输入框
            if (res.data.code == 1) {
              that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
            }
            //重置验证码倒计时
            that.show = true;
            clearInterval(that.timer);
            that.timer = null;
            that.$layer.msg(res.data.desc)
            console.log('%c 修改手机:', 'color:green', res)
          })
        } else if (name == 'email') {
          let email = that.email;
          that.openTips = false;
          that.$http.get(that.$api + "/user/bindEmailAddress?sessionId=" + that.sessionId + "&email=" + email +
            '&code=' + inputCode).then((res) => {

            that.inputCode = ''; //重置验证码输入框
            if (res.data.code == 1) {
              that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
              let userDatas = that.userDatas;
              userDatas.userExtend.email = email;
              that.userDatas = userDatas;
              that.$store.dispatch('userInfo', that.userDatas);
            }
            that.openEmail = false; //成功后关闭弹窗
            //重置验证码倒计时
            that.show = true;
            clearInterval(that.timer);
            that.timer = null;
            that.$layer.msg(res.data.desc)
            console.log('%c 绑定手机:', 'color:green', res)
          })
        } else if (name == 'passw') {
          let password = that.password;
          let respassword = that.respassword;
          let inputCode = that.inputCode;
          that.openTips = false;
          that.$http.get(that.$api + "/user/amendPassword", {
            params: { //接口更换前  /user/changePassword
              sessionId: that.sessionId,
              mobile: that.userDatas.username,
              password: password,
              code: inputCode,
              confirmPassword: respassword
            }
          }).then((res) => {
            that.inputCode = ''; //重置验证码输入框
            if (res.data.code == 1) {
              // that.$store.dispatch('sendTips', {isTip:true,content:'修改手机成功'});
            }
            that.openPassw = false; //成功后关闭弹窗
            //重置验证码倒计时
            that.show = true;
            clearInterval(that.timer);
            that.timer = null;
            that.$layer.msg(res.data.desc)
            console.log('%c 修改密码:', 'color:green', res)
          })
          this.password = '';
          this.respassword = '';
          // that.$store.dispatch('sendTips', {isTip:true,content:'修改密码成功'});
        } else if (name == 'pay') {
          let payword = that.payword;
          let respayword = that.respayword;
          let inputCode = that.inputCode;
          if (inputCode == '') {
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '请设置验证码'
            });
            return
          }
          if(payword == ''){
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '请输入支付密码'
            });
            return
          }
          if(respayword == ''){
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '请重复密码'
            });
            return
          }
          if(payword != respayword){
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '两次输入支付密码不一致'
            });
            return
          }
          that.openTips = false;
          let reg = /^\d{6}$/;
          if (!reg.test(payword)) {
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '密码格式有误'
            });
            return;
          }
          that.$http.get(that.$api + "/user/password/setPaymentPassword", {
            params: {
              sessionId: that.sessionId,
              password: payword,
              code: inputCode,
              repeatPassword: respayword
            }
          }).then((res) => {
            that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
            if (res.data.code == 1) {
              that.getinformation(localStorage["sessionId"] || sessionStorage["sessionId"] || "")
              that.inputCode = ''; //重置验证码输入框
              if (that.pay == 0) {
                console.log('g');
                that.$router.go(-1);
              }
              that.openPay = false; //成功后关闭弹窗
              //重置验证码倒计时
              that.show = true;
              clearInterval(that.timer);
              that.timer = null;
              // that.$layer.msg(res.data.desc)
              // that.$store.dispatch('userInfo',res.data.desc)
              console.log('%c 设置支付密码:', 'color:green', res)
            }
          })
        }
      },
      //获取验证码
      getCode(type) { //type 1 修改手机验证码 2 绑定邮箱的验证码 3 登录密码验证码 4 支付密码验证码 5修改邮箱
        let that = this;
        if (type == 1) { //修改手机号码
          let mobile = that.new_mobile;
          let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/; //验证手机号
          if (mobile == '') {
            that.$layer.msg('手机号码不能为空');
            return;
          } else if (!regPhone.test(mobile)) {
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '请填写正确的手机号码'
            })
            return
          }
          //修改手机号码验证码请求
          that.$http.get(this.$api + "/user/getBindingPhoneCode?sessionId=" + that.sessionId + '&mobile=' + mobile)
            .then((res) => {
              // that.data = res.data.data;
              console.log('%c 获取验证码', 'color:green', res)
              that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
            })
        } else if (type == 2) { //绑定邮箱的验证码
          // let mobile = that.userDatas.username;
          let email = that.email;
          console.log(email)
          if (email == '') {
            that.$layer.msg('邮箱不能为空');
            return;
          }
          //修改手机号码验证码请求
          that.$http.get(this.$api + "/user/getBindEmailAddress?sessionId=" + that.sessionId + '&email=' + email +
            '&type=1').then((res) => {
            // that.data = res.data.data;
            console.log('%c 获取验证码', 'color:green', res)
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: res.data.desc
            });
          })
        } else if (type == 3) { //修改登录密码
          let mobile = that.userDatas.username;
          if (mobile == '') {
            that.$layer.msg('登录密码不能为空');
            return;
          }
          //修改登录密码
          that.$http.get(this.$api + "/user/getCodeAmendPassword?sessionId=" + that.sessionId + '&mobile=' + mobile)
            .then((res) => {
              // that.data = res.data.data;
              console.log('%c 获取验证码', 'color:green', res)
              that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
            })
        } else if (type == 4) {
          let mobile = that.userDatas.username;
          if (mobile == '') {
            that.$layer.msg('支付密码不能为空');
            return;
          }
          //修改登录密码payword
          that.$http.get(this.$api + "/user/password/getPaymentCode?sessionId=" + that.sessionId + '&mobile=' + mobile)
            .then((res) => {
              // that.data = res.data.data;
              console.log('%c 获取验证码', 'color:green', res)
              that.$store.dispatch('sendTips', {
                isTip: true,
                content: res.data.desc
              });
            })
        }
        if (!this.timer) {
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
          }, 1000)
          // console.log("code:1234")
          // this.verCode = 1234;
          // this.tips();
        }
      }
    },
  }

</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .code {
    div {
      width: 180px;
      @include ibMid();
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
      width: 97px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #49BDFF;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(73, 189, 255, 1);
    }

    .count {
      background: #CACACA;
      color: white;
      border: none;
    }

    @include clearFloat();
  }

  .modifyPhone {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);

    &>div {
      width: 457px;
      height: 276px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 40px 0px rgba(63, 63, 63, 0.71);
      box-sizing: border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 25px;

      &>h3 {
        height: 44px;
        line-height: 44px;
        background: rgba(242, 242, 242, 1);
        border-radius: 2px;
        position: relative;

        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
          position: absolute;
          top: 15px;
          right: 20px;
        }
      }

      &>ul {
        padding: 28px 0;

        // box-sizing:border-box;
        li {
          text-align: left;
          font-size: 0;
          font-family: MicrosoftYaHei;
          color: #383838;
          font-weight: 400;
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          &>span {
            @include ibMid();
            width: 80px;
            text-align: right;
            font-size: 13px;
            margin-right: 14px;
          }

          &>input {
            border: none;
            outline: none;
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 2px;
            width: 290px;
            height: 28px;
            @include ibMid();
            font-size: 14px;
            padding: 0 11px;
            box-sizing: border-box;
            color: rgba(192, 192, 192, 1);

          }

          &>p {
            @include ibMid();
            font-size: 13px;

          }

          &>div {
            font-size: 13px;
            @include ibMid();
            font-size: 0;

            input {
              border: none;
              outline: none;
              height: 28px;
              border: 1px solid rgba(230, 230, 230, 1);
              border-radius: 2px;
              font-size: 14px;
              padding: 0 11px;
              box-sizing: border-box;
              color: rgba(192, 192, 192, 1);
            }

            button {
              @include ibMid();
              margin-left: 12px;
            }
          }
        }
      }

      &>button {
        border: none;
        outline: none;
        width: 95px;
        height: 30px;
        background: #E5E5E5;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        display: block;
        margin: 0 auto 0 auto;

        &:hover {
          background: #69C9FF;
        }
      }

    }
  }

  .module {
    box-sizing: border-box;
    min-height: 518px;

    .show-enter-active,
    .show-leave-active {
      transition: all 0.4s ease;
      padding-left: 10px;
    }

    .show-enter,
    .show-leave-active {
      padding-left: 100px;
    }

    &>h3 {
      background: white;
      height: 68px;
      line-height: 68px;
      padding: 0 40px;
      border-bottom: 1px solid #F2F2F2;

      ul {
        font-size: 0;

        .active {
          color: #333333;
          border-bottom: 2px solid #333333;
        }

        li {
          @include ibMid();
          height: 68px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          box-sizing: border-box;
          cursor: pointer;
          color: #8D8D8D;
          margin-right: 40px;

          &:last-child {
            margin-right: 0;
          }

          border-bottom:2px solid white;

          &:hover {
            color: #333333;
            border-bottom: 2px solid #333333;
          }
        }
      }
    }

    &>div {
      padding: 35px 40px 0 40px;
      box-sizing: border-box;
      min-height: 450px;
      background: white;

      &>ul,
      &>ol {
        &>li {
          font-size: 0;
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          &>span {
            @include ibMid();
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 34px;
          }

          &>p {
            @include ibMid();
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(202, 202, 202, 1);
          }

          &>div {
            @include ibMid();
            float: right;
            width: 68px;
            height: 30px;
            background: rgba(242, 242, 242, 1);
            border-radius: 16px;
            box-sizing: border-box;
            font-size: 0;
            cursor: pointer;
            position: relative;

            span {
              display: inline-block;
              width: 30px;
              height: 30px;
              border: 1px solid #F2F2F2;
              background: white;
              border-radius: 50%;
              box-sizing: border-box;
              position: absolute;
              transition: all 0.3s ease-in-out;
              left: 0;
            }
          }

          .circleActive {
            background: #1371F9;

            span {
              left: 40px;
            }
          }

          &>button {
            border: none;
            outline: none;
            float: right;
            cursor: pointer;
            width: 72px;
            height: 30px;
            background: rgba(73, 189, 255, 1);
            border-radius: 2px;
            color: white;
            font-size: 14px;
          }

          @include clearFloat();

        }
      }
    }
  }

  .password312 {
    height: 312px !important;
  }

  .email241 {
    height: 241px !important;
  }

</style>
