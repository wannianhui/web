<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}"  @click="setActive(0)">我的积分</li>
        <li :class="{ 'active': isActive == 1}"  @click="setActive(1)">积分规则</li>
      </ul>
    </h3>
    <div :class="{ 'bacWhite': isActive == 1}" class="container">
      <div class="integral" v-show="isActive==0">
        <h3 @click="exchange()">
          <div></div>
          <span>兑换乐豆</span>
        </h3>
        <div>
          <div>
            <img src="../../../static/img/icon_integral_white.png" alt="">
          </div>
          <span>我的积分</span>
          <p><span>{{integral}}</span>分</p>
          <h3>兑换乐豆最低分：<span>{{appInfos.minimum_integral}}分</span></h3>
        </div>
      </div>
      <div class="rule"  v-show="isActive==1">
        <h2>获取积分明细</h2>
        <table class="signIn">
          <thead>
            <tr>
              <th>行为</th><th>周期范围</th><th>周期内奖励次数</th><th>积分</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in integralRulesList.listIntegral" :key="index">
              <td v-if="item.type==1">签到</td>
              <td v-else-if="item.type==2">被点赞</td>
              <td v-else-if="item.type==3">发布帖子</td>
              <td v-else-if="item.type==4">发起分享</td>
              <td v-else-if="item.type==5">被收藏</td>
              <td v-else-if="item.type==6">购买帖子</td>
              <td v-else-if="item.type==7">看文章</td>
              <td v-else-if="item.type==8">三种专员认证</td>
              <td v-else-if="item.type==9">被回复1到10</td>
              <td v-else-if="item.type==10">被回复11到15</td>
              <td v-else-if="item.type==11">被回复16到30</td>
              <td v-else-if="item.type==12">被回复31到50</td>
              <td v-else-if="item.type==13">被回复51到100</td>
              <td v-else-if="item.type==14">被回复大于100</td>
              <td v-if="item.state==0">有限制</td>
              <td v-else-if="item.state==1">无限制</td>
              <td>{{item.number}}</td>
              <td>+{{item.integral}}</td>
            </tr>
          </tbody>
        </table>
   <!--      <h2>帖子说明</h2>
        <table class="post">
          <thead>
            <tr>
              <th>发布主题帖</th><th>有效回复</th><th>获取积分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="6">帖子被他人回复：按用户去重，即1个用户对同一个帖子回复N次，仅算作1个有效回复</td><td>1-10</td><td>10分</td>
            </tr>
            <tr>
              <td>11-15</td><td></td>
            </tr>
            <tr>
              <td>16-30</td><td></td>
            </tr>
            <tr>
              <td>31-50</td><td></td>
            </tr>
            <tr>
              <td>51-100</td><td></td>
            </tr>
            <tr>
              <td>大于100</td><td></td>
            </tr>
          </tbody>
        </table> -->
        <h2>等级说明</h2>
        <table class="grade">
          <thead>
            <tr>
              <th>积分</th><th>等级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in integralRulesList.listIntegralClass" :key="index"> 
              <td>{{item.integral}}</td><td>{{item.name}}</td>
            </tr>
          </tbody>
        </table>
        <div v-html="appInfos.integral_remarks">
<!--           <p>备注：</p>
          <p>1.进行以上动作事件，会得到积分奖励。一周内，最多的得到的奖励次数设有限制。</p>
          <p>2.到达一定数量的积分，可以自动升级。</p> -->
        </div>
      </div>
    </div>
    <div class='popIntegral' v-show="isExchange">
      <div>
        <h3>
          <span>积分兑换</span>
          <img @click="exchange()" src="../../../static/img/icon_cancle_card_black.png" alt="">
        </h3>
        <div>
          <p>当前最多可兑换{{integral}}积分<span>（{{appInfos.integral}}积分={{appInfos.integral_in_lohas}}乐豆）</span><span @click="redeemAll()">全部兑换</span></p>
          <h3>
            <input type="number" v-model="inputIntegral">
            <span>分</span>
          </h3>
          <h4>
            兑换为：<span>{{ledou}}乐豆</span>兑换数量最低为{{appInfos.minimum_integral}}积分<span @click="switchPoints()">积分规则？</span>
          </h4>
        </div>
        <button @click="save()">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { mixin } from "../../common/mixin.js";

  export default{
    mixins: [mixin],
    data(){
      return{
        isActive: 0, //默认下标
        integral:0,
        ledou:0,
        integralRulesList:{
          listIntegral:{},
          listIntegralClass:{}
        },
        isExchange:false, // 是否触发兑换按钮
        curIntegral:'100', //当前积分
        inputData:'', //计算之后输入框的数据
        appInfos:{},
        inputIntegral:'', //输入框的积分
      }
    },
    mounted:function(){
      const that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';
      if( that.integralRules.length === 0){
        that.getIntegralRules();
      }else {
        that.integralRulesList = that.integralRules;
      }

      if( !this.global.isBlank( this.$route.query.isActive ) ){
        // console.log( this.$route.query.isActive ,153 )
        this.isActive = this.$route.query.isActive;
      }
      else if ( this.$route.query.isActive == 1 ){
        this.isActive = 1;
      }
      console.log(that.userInfo,158)
      console.log(this.appInfo)
      that.appInfos = that.appInfo;
      that.integral = that.userInfo.userExtend.integral;


    },

    components:{
    },
    watch:{
      userInfo: {
        handler(newVal) {
          this.integral = newVal.userExtend.integral;
        }
      },
      inputIntegral(val,oldVal){
        const that = this;
        let integral = that.integral;
        let minimum_integral = that.appInfos.minimum_integral;
        if(val>integral){
          that.inputIntegral = integral;
        }else if( val<minimum_integral ){
          that.inputIntegral = minimum_integral;
        }
        let proportion = that.appInfos.integral/that.appInfos.integral_in_lohas;
        that.ledou = val/proportion;
      }
    },
    computed: {
      ...mapState([
        "integralRules",
        "userInfo",
        "appInfo"
      ])

    },
    methods: {
      uploadInfos(){
        const that = this;
        that.$http.get(that.$api + "/user/information?sessionId=" + that.sessionId).then((res) => {
          console.log('%c 获取用户信息', 'color:green', res);
          if (res.data.code == 1) {
            that.$store.dispatch('userInfo', res.data.data)
            // console.log(that.userInfo,199)
            // that.userDatas = res.data.data;
            // that.ISLogin = true;basicInfo
          }
        }).catch(function (error) {
          that.$layer.msg(error)
        });
      },
      //获取积分规则
      getIntegralRules(){
        const that = this;
        that.$http.get(that.$api+"/integral/get").then((res)=>{
          // console.log('%c 获取积分规则','color:green',res);
          let list = res.data.data;
          that.$store.dispatch('integralRules', list);
          that.integralRulesList = list;

        }).catch(function (error) {
        });
      },
      setActive(index) {
        if( index!=this.isActive ){
          this.isActive = index;
        }

      },
      exchange() {
        this.isExchange = !this.isExchange;
      },
      save() {
        const that = this;
        that.$http.get(that.$api+"/integral/record/save",{
          params:{
            sessionId: that.sessionId,
            integral: that.inputIntegral
          }
        }).then((res)=>{
          console.log('%c 积分兑换乐斗','color:green',res);
          let list = res.data.data;
          //通知更新金额
          this.$event.$emit("integral");
          that.$store.dispatch('sendTips', {isTip:true,content:res.data.desc});
          if(res.data.code == 1){
            that.uploadInfos()
          }

        }).catch(function (error) {
        });

        this.isExchange = !this.isExchange;
      },
      redeemAll() {
        this.inputData = this.integral;
        this.inputIntegral = this.integral;
      },
      switchPoints() { //切换成积分
        this.isExchange = !this.isExchange;
        this.isActive = 1;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";


  .module {
    box-sizing:border-box;
    &>h3 {
      height:68px;
      line-height:68px;
      padding:0 40px;
      background:white;
      border-bottom:1px solid #F2F2F2;
      ul {
        font-size:0;
        .active {
          color:#333333;
          border-bottom:2px solid #333333;
        }
        li {
          @include ibMid();
          height:68px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          box-sizing:border-box;
          cursor:pointer;
          color:#8D8D8D;
          margin-right:40px;
          &:last-child {
            margin-right:0;
          }
          border-bottom:2px solid white;
          &:hover {
            color:#333333;
            border-bottom:2px solid #333333;
          }
        }
      }
    }
    .container {
      padding:11px 40px 100px 40px;
      box-sizing:border-box;
      min-height:450px;
      .integral {
        width:278px;
        height:333px;
        margin:57px 0 0 298px;
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 21px 0px rgba(12,29,43,0.24);
        border-radius:2px;
        position:relative;
        &>h3 {
          text-align:center;
          position:absolute;
          bottom:9px;
          left:50%;
          transform: translateX(-50%);
          cursor:pointer;
          div {
            @include ibMid();
            width:24px;
            height:24px;
            background-size:100% 100%;
            background-image:url('../../../static/img/icon_exchange_black.png');
          }
          span  {
            @include ibMid();
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
          &:hover {
            span {
              color:#EA6F44;
            }
            div {
              background-image:url('../../../static/img/icon_exchange_yellow2.png');
            }
          }
        }
        &>div {
          width:306px;
          height:308px;
          background-image:url('../../../static/img/pic_integral_green.png');
          background-size:100% 100%;
          position:absolute;
          top:-15px;
          left:-15px;
          text-align:center;
          padding:0 16px 0 16px;
          box-sizing:border-box;
          &>div {
            width:78px;
            height:78px;
            margin: 43px auto 24px auto;
            position:relative;
            border-radius:50%;
            box-sizing:border-box;
            border:2px solid white;
            img {
              width:34px;
              height:44px;
              position:absolute;
              left:50%;
              top:50%;
              transform: translate(-50%, -50%);
            }
          }
          &>span {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          &>p {
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin:13px 0 50px 0;
            span {
              display:inline-block;
              font-size:30px;
              font-family:MicrosoftYaHei-Bold;
              font-weight:bold;
              color:rgba(255,255,255,1);
              margin-right:7px;
              border-bottom:1px solid #FFFFFF;
            }
          }
          &>h3 {
            text-align:left;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            span {
              font-weight:bold;
            }
          }
        }
      }
      .rule {
        &>h2 {
          font-size:18px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
          margin-bottom:10px;
        }
        .signIn,.post,.grade {
          margin-bottom:40px;
          border:1px solid #E5E5E5;
          box-sizing:border-box;
          thead {
            background:#49BDFF;
          }
          tr {
            box-sizing:border-box;
            font-family:MicrosoftYaHei;
            font-weight:400;
            font-size:14px;
            th {
              height:33px;
              color:rgba(31,31,31,1);
              text-align:left;
              font-weight:400;
            }
            td {
              height:37px;
              color:rgba(71,71,71,1);
            }
            td,th {
              border-right:1px solid #E5E5E5;
              padding:0 14px 0 14px;
              box-sizing:border-box;
              &:last-child {
                border-right:0;
              }
            }
          }
          tbody {
            tr {
              &:nth-child(even) {
                background:#EFF3F5;
              }
            }
          }
        }
        .signIn {
          width:768px;
        }
        .post {
          width: 510px;
          tr {
            th {
              border-right:0;
              &:first-child {
                width:202px;
              }
            }
          }
        }
        .grade {
          width:338px;
          margin-bottom:24px;
          thead {
            background:#FFCA3B;
            th {
              width:50%;
            }
          }
          tr {
            th,td {
              border-right:0;
            }
          }
        }
        &>div {
          p {
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(71,71,71,1);
          }
        }
      }
    }
    .bacWhite {
      background:white;
    }
    .popIntegral {
      position: fixed;
      top: 62px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index:9999;
      background: rgba(0,0,0,0.1);
      &>div {
        width:600px;
        height:312px;
        min-height:312px;
        background:white;
        box-sizing:border-box;
        border:7px solid #656565;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        &>h3 {
          height:44px;
          line-height:44px;
          padding:0 20px;
          box-sizing:border-box;
          span {
            @include ibMid();
            font-size:16px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
          img {
            @include ibMid();
            width:14px;
            height:14px;
            float:right;
            margin-top: 15px;
            cursor:pointer;
          }
        }
        &>div {
          padding:34px 30px;
          background:#EFF3F5;
          height:184px;
          box-sizing:border-box;
          &>p {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-bottom:24px;
            span {
              &:nth-of-type(1) {
                font-size:12px;
                color:rgba(228,61,61,1);
                margin:0 10px;
              }
              &:nth-of-type(2) {
                font-size:14px;
                color:#EF6B3C;
                cursor:pointer;
              }
            }
          }
          &>h3 {
            font-size:0;
            margin-bottom:19px;
            input {
              @include ibMid();
              border:none;
              outline:none;
              width:172px;
              height:28px;
              font-size:14px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(230, 230, 230, 1);
              border-radius:2px;
              margin-right:6px;
              padding-left:9px;
              color:#333;
            }
            span {
              @include ibMid();
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
            }
          }
          &>h4 {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            span {
              &:nth-of-type(1) {
                font-size:12px;
                color:#E43D3D;
                margin-right:10px;
              }
              &:nth-of-type(2) {
                font-size:14px;
                color:#49BDFF;
                margin-left: 6px;
                cursor:pointer;
              }
            }
          }
        }
        &>button {
          border:none;
          outline:none;
          width:84px;
          height:30px;
          background:rgba(73,189,255,1);
          border-radius:2px;
          color:white;
          cursor:pointer;
          display:block;
          margin:20px auto 0 auto;
        }
      }
    }
  }

</style>
