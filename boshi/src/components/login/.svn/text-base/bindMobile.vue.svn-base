<template>
  <div :style="{backgroundImage: 'url('+ httpImg +'bg_sign.jpg)'}" class="homePage">
    <section>
      <div class="boxModule">

        <div  class="loginModule">
          <div class="title">
            <router-link to="/homeContent"></router-link>
          </div>
          <ul>
            <li class='loginHover'>绑定手机/邮箱号码</li>
          </ul>
          <!-- 注册 -->
          <div class="isRegister" >
            <div class="inputCom">
              <input type="text" placeholder="手机号或邮箱" v-model="accounts" v-on:input='inputFunc("accounts")' >
              <!-- <p v-show="inputState!=0"><span>*</span>手机或邮箱格式错误</p> -->
              <p v-show="inputState!=0">手机或邮箱格式错误<img src="../../../static/img/icon_mark.png" alt=""></p>
              <p v-show="(inputState==0)&&(accounts!='')"><img src="../../../static/img/icon_ok.png" alt=""></p>
            </div>
            <div class="inputCom code" >
              <div>
                <input type="text" name="code" v-model="inputCode" placeholder="验证码" v-on:input='inputFunc()'>
              </div>
              <button @click="getCode('register')" :class="{ 'count': !show,}" class="code-btn" :disabled="!show" >
                <span v-show="show" >获取验证码</span>
                <span  v-show="!show">重新发送{{count}}s</span>
              </button>
            </div>

            <div class="loginFailed loginButton"  @click="bindNumber({head:head,nick:nick})">绑定号码</div>
            <!-- <div class="loginThrough loginButton" v-show="!isThrough">注册</div> -->
          </div>
        </div>
      </div>

      <div class='verCodeTips' v-show="isCode">
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
  import { mapState } from 'vuex';
  import qs from 'qs';
  export default{
    data(){
      return{
        qqMsg:'', //qq登录
        ISLogin:2, // 是否处于登录中 0登录 1注册 2忘记密码
        isCode:false, //是否点击获取验证码
        isSelected:true, // 选择记录密码
        read:true, // 默认已阅读
        isThrough:false, // 验证是否全部通过
        httpImg:this.global.httpImg, //全局的图片路径
        accounts:'', //登录账号
        password:'', //登录密码
        inputState:'', //验证账号 0是通过 1邮箱验证错误 2手机号验证错误 3密码验证错误
        passwordState:'', //验证0是通过 1是密码格式错误
        againPasswState:'', //0通过，1不通过
        codeState:'', //验证码状态值
        name:'', //注册的用户名
        againPassw:'', //重复写入的密码
        inputCode:'', //输入的验证码
        show: true,
        count: '',
        timer: null,
        // verCode:'', //验证码
      }
    },
    components:{

    },
    mounted:function(){
      const that = this;
      that.obj = that.$route.query;
      let head = that.$route.query.head;
      let nick = that.$route.query.nick;
      console.log(head,nick,87)
      if(head == null && head == undefined){ //qq登录授权返回的信息
        that.head = '';
        that.nick = '';
      }else {
        that.head = head
        that.nick = nick
      }
      console.log(that.obj,85)
      // return;
    },
    methods:{
      bindNumber({
        weChatId = '',
        microBlogId= '',
        head='',
        nick=''
      }={}) { //注册
        let that = this;
        // let name = this.name;
        // let password = this.password;
        let accounts = this.accounts;
        let inputCode = this.inputCode;
        let obj = that.obj;
        let isEmail = this.isEmail==true?isEmail=1:isEmail=0;


        that.$http.get(that.$api+"/user/thirdPartyLoginBindings",{
          params:{
            accessToken: obj.accessToken,
            head:head,
            nick:nick,
            type:obj.type,
            mobile:accounts,
            email:accounts,
            loginType:isEmail, //1是邮箱 0是手机
            weChatId:obj.weChatId,
            microBlogId: obj.microBlogId,
            code:inputCode
          }
        }).then((res)=>{
          console.log('%c 三方登录返回结果','color:green',res);
          //return;
          that.$layer.msg(res.data.desc)
          if( res.data.code === 1 ){
            that.$store.dispatch('isLogin',true);//在vuex记录登录状态
            console.log(res.data.data.sessionId)
            sessionStorage.setItem("sessionId",res.data.data.sessionId);//存储sessionId
            setTimeout(function(){
              that.$router.push({
                path: 'homeContent',
              })
            },500)
          }
        }).catch(function (error) {
          console.log('_______________', error)
        });

        //请求注册接口
      //   that.clearData();//重置数据
      //   that.$http.post(that.$api+"/user/register", qs.stringify({
      //       "mobile": accounts,
      //       "code": inputCode,
      //       "type":isEmail,
      //       "email":accounts
      //   }),
      //   {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      //   .then(function (res) {
      // 　　 console.log('%c 注册信息','color:green',res);
      //     that.$layer.msg(res.data.desc)
      //     if(res.data.code!=1){//注册未成功

      //     }else{//注册成功
      //       that.$store.dispatch('isLogin',true);//在vuex记录登录状态
      //       localStorage.setItem("sessionId",res.data.data.sessionId);//存储sessionId
      //       setTimeout(function(){
      //         that.$router.go(-1);
      //       },500)
      //     }
      //     // that.ISLogin = 0; //跳转到登录组件

      //   }).catch(function (error) {
      //       that.$layer.msg(error)
      //   });

      },
      clearData(){ //重置数据
        this.password ='';
        this.accounts ='';
        this.inputState = 0;
        // this.verCode = '';
        this.passwordState = 0;
        this.timer = null;
      },
      // 封装的一个input事件，name为input的名字
      inputFunc(name) {
        //初始化
        let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; //验证密码
        let regMailbox = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //验证邮箱
        let regPhone = /^[1][3,4,5,7,8][0-9]{9}$/; //验证手机号
        let password = this.password.replace(/(^\s*)|(\s*$)/g, ""); //密码
        let accounts = this.accounts.replace(/(^\s*)|(\s*$)/g, ""); //账号
        let againPassw = this.againPassw.replace(/(^\s*)|(\s*$)/g, ""); //再次输入的密码
        let inputCode = this.inputCode.replace(/(^\s*)|(\s*$)/g, ""); //输入的验证码
        let login = this.ISLogin;

        if( name == "accounts") {
          if( accounts=="" ) {
            this.inputState = 0;
          }
          else if( accounts.indexOf("@") != -1) { //邮箱
            if(!regMailbox.test(accounts) ){
              this.inputState = 1; //1邮箱错误
            }
            else {
              this.inputState = 0;
              this.isEmail = true;
            }
          }
          else { //手机号
            if(!regPhone.test(accounts)){
              this.inputState = 2; //手机号错误
            }
            else {
              this.inputState = 0;
              this.isEmail = false;
            }
          }
        }
        else if(name == "phone") {
          if( accounts=="" ) {
            this.inputState = 0;
          }else if( !regPhone.test(accounts) ) {
            this.inputState = 2; //手机号错误
          }
          else {
            this.inputState = 0;
          }
        }
        else if( name == "password") {
          if( password=="" ){
            this.passwordState = 0;
          }
          else if(!regPassword.test(password)){
            this.passwordState = 1; //1邮箱错误
          }
          else {
            this.passwordState = 0;
          }
        }
        else if( name == "againPassw"  ){
          if( againPassw=="" ){
            this.againPasswState = 0;
          }else if( againPassw != password ){
            this.againPasswState = 1;
          }else {
            this.againPasswState = 0;
          }
        }

        if( inputCode!='') {
          this.codeState = 0;
        }else {
          this.codeState = 1;
        }

        if( login == 0 ){//如果是登录中
          if( (this.inputState==0) && (this.passwordState == 0)){
            this.isThrough = true;
          }
          else {
            this.isThrough = false;
          }
        }else if( login == 1 ){//如果是注册
          console.log(this.inputCode+"--"+this.verCode)
          if( (this.inputState==0) && (this.passwordState == 0) && (this.againPasswState == 0) && (this.name != '') ){//isThrough
            this.isThrough = true;
          }
          else {
            this.isThrough = false;
          }
        }else if( login==2 ){//如果是忘记密码
          console.log("ok")
          if(  (this.codeState == 0) && (this.passwordState == 0) && (this.againPasswState == 0) ) {
          // if( (this.codeState == 0) && (this.passwordState == 0) && (this.againPasswState == 0) ) {
            this.isThrough = true;
          }
          else {
            this.isThrough = false;
          }
        }
      },
      //获取验证码
      getCode(type){
        const that = this;
        let accounts = that.accounts;
        let isEmail = this.isEmail==true?isEmail=1:isEmail=0;
        that.$http.get(that.$api+"/user/getThirdPartyLoginBindingsCode",{
          params:{
            mobile: that.accounts,
            type: isEmail,
            emial: accounts,
          }
        }).then((res)=>{
          // console.log('%c 获取论坛列表','color:green',res);
          this.$layer.msg(res.data.desc);
          if(res.data.code == 1){
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
          }
        }).catch(function (error) {

        });


      },
      //提示
      tips() {
        this.isCode = !this.isCode;
      }


    },
    computed: {
      ...mapState([
        "isLogin"
      ])
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

    .verCodeTips {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index:9999;
      background: rgba(0,0,0,0.1);
      &>div {
        width:334px;
        height:200px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 40px 0px rgba(63,63,63,0.71);
        box-sizing:border-box;
        padding:29px 0 35px 0;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align:center;
        font-family:MicrosoftYaHei-Bold;
        color:rgba(51,51,51,1);
        &>h3 {
          font-size:18px;
          font-weight:400;
        }
        &>p {
          font-size:18px;
          font-weight:bold;
          margin:10px 0 0 0;
        }
        &>span {

        }
        &>button {
          border:none;
          outline:none;
          width:106px;
          height:38px;
          background:rgba(73,189,255,1);
          border-radius:2px;
          color:white;
          cursor:pointer;
          display:block;
          margin:20px auto 0 auto;
        }
      }
    }


  .homePage {
    width:100%;
    height:100%;
    background-size:cover;
    position:absolute;
    section {
      width:100%;
      height:100%;
      position:relative;
      .boxModule {
        width:460px;
        background:white;
        box-sizing:border-box;
        box-shadow:0px 3px 50px 0px rgba(0, 0, 0, 0.56);
        text-align: center;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
      }
      .loginModule {
        padding:80px 58px 22px 58px;
        .title {
          width:232px;
          height:103px;
          // background:rgba(12,29,43,1);
          position:absolute;
          left:50%;
          transform: translateX(-50%);
          top:-36px;
          background-image:url('../../../static/img/logo_login.png');
          background-size:100% 100%;
          a {
            display:block;
            height:100%;
          }
        }
        &>ul {
          text-align:center;
          display:inline-block;
          li {
            float:left;
            text-align:center;
            margin-right:120px;
            padding:0 6px 10px 6px;
            color:#8D8D8D;
            cursor:pointer;
            box-sizing:border-box;
            height:34px;
            font-size:16px;
            &:hover {
              border-bottom:1px solid #49BDFF;
              color:#49BDFF;
            }
            &:last-child {
              margin-right:0;
            }
          }
          .loginHover {
            border-bottom:1px solid #49BDFF;
            color:#49BDFF;
          }

          @include clearFloat();
        }
      }
      .ISLogin,.isRegister,.reset {
        .inputCom {
          position:relative;
          margin-bottom:20px;

          input {
            border:none;
            outline:none;
            width:100%;
            font-size:14px;
            border-bottom:1px solid #D9D9D9;
            padding:7px 0;

          }

          p {
            position:absolute;
            right:0;
            top: 8px;
            color:#E43D3D;
            font-size:12px;
            span {
            color:red;
            display:inline-block;
            vertical-align:middle;
            }
            img {
              display:inline-block;
              vertical-align:middle;
              margin-left:5px;
            }
          }

          &:last-child {
            &>input {
              margin-bottom:0;
            }
          }
        }
        .code {
          div {
            width:60%;
            float:left;
            position:relative;
            input {
              width:100%;
            }
          }

          button {
            cursor:pointer;
            border:none;
            outline:none;
            background:white;
            width:120px;
            height:36px;
            line-height:36px;
            text-align:center;
            box-sizing:border-box;
            border:1px solid #49BDFF;
            font-size:14px;
            color:#49BDFF;
            float:right;
          }
          .count {
            background:#CACACA;
            color:white;
            border:none;
          }
          @include clearFloat();
        }
        .lastInput {
          margin-bottom:0!important;
        }


        .select {
          height:40px;
          margin-bottom: 8px;
          display:flex;
          align-items: center;
          justify-content: space-between;
          img {
            width:12px;
            height:12px;
            cursor:pointer;
          }
          span {
            font-size:14px;
            color:#8D8D8D;
            cursor:pointer;
          }
        }
        .loginButton {
          height:52px;
          line-height:52px;
          text-align:center;
          color:#FFFFFF;
          font-size:18px;
          border-radius:2px;
          cursor:pointer;
        }
        .loginThrough {
          background:#E5E5E5;
        }
        .loginFailed {
          background:#49BDFF;
        }
      }
      .reset {
        .resetBox {
          padding:36px 60px 55px 60px;
          box-sizing:border-box;
          position:relative;
          &>h3 {
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(192,192,192,1);
            position:absolute;
            right:59px;
            bottom:33px;
            span {
              color:#49BDFF;
              cursor:pointer;
            }
          }
        }
        .borderTop {
          font-size:0;
          height:8px;
          span {
            height:100%;
            display:inline-block;
            &:nth-of-type(1) {
              background:#0C1D2B;
              width:85px;
            }
            &:nth-of-type(2) {
              background:#CFE300;
              width:375px;
            }
          }
        }
        h2 {
          font-size:24px;
          color:#49BDFF;
        }

      }
      .thirdParty {
        display:flex;
        padding:0 66px 40px 66px;
        justify-content:space-between;
        align-items:center;
        img {
          // filter: grayscale(100%);
          cursor:pointer;
          // opacity: 0.6;
          &:hover{
            filter: none;
            opacity: 1;
          }
        }
      }
    }

  }
</style>
