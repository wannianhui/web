<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}" @click="setActive(0)">我的财富</li>
        <li :class="{ 'active': isActive == 1}" @click="setActive(1)">消费账单</li>
        <li :class="{ 'active': isActive == 2}" @click="setActive(2)">提现</li>
        <li :class="{ 'active': isActive == 3}" @click="setActive(3)">充值中心</li>
      </ul>
    </h3>

    <div v-show="isActive==2" class="curWealth">
      <p>
        当前财富：
        <span>{{curIntegral}}乐豆</span>（
        <span>{{(curIntegral*(appInfos.lohas_in_money/appInfos.lohas)).toFixed(2)}}</span>人民币）
        <span @click="redeemAll()">全部兑换</span>
      </p>
      <h3>
        <span>金额：</span>
        <input type="number" v-model="inputIntegral" placeholder="输入提现乐豆" />
        <span>乐豆</span>
      </h3>
      <h4>
        提现金额为
        <span>{{rmb}}元</span>，提现金额最低为
        <span>{{appInfos.minimum_lohas}}乐豆</span>
      </h4>
    </div>

    <div :class="{ 'bacWhite': isActive != 0}" class="container">
      <div class="integral" v-show="isActive==0">
        <h3 @click="switchRecharge(3)">
          <div></div>
          <span>充 值</span>
        </h3>
        <div>
          <div>
            <img src="../../../static/img/icon_bean_white.png" alt />
          </div>
          <span>我的财富</span>
          <p>
            <span>{{curIntegral}}</span>乐豆
          </p>
          <h3>
            <div @click="switchWithdraw(2)">
              <img src="../../../static/img/icon_cash.png" alt />
              <span>提现</span>
            </div>
            <div @click="switchPoints(8)">
              <img src="../../../static/img/icon_exchange.png" alt />
              <span>积分兑换</span>
            </div>
          </h3>
        </div>
      </div>
      <div class="rule" v-show="isActive==1">
        <!-- <h2>签到说明</h2> -->
        <table class="bill" border="1">
          <thead>
            <tr>
              <th>操作</th>
              <th>消费</th>
              <th>剩余</th>
              <th>详情</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in billList" :key="index">
              <td>
                <!--    <span v-if="item.type == 0">购买文章</span>
                 <span v-else-if="item.type == 1">文章被购买</span>
                 <span v-else-if="item.type == 2">充值</span>
                 <span v-else-if="item.type == 3">提现</span>
                 <span v-else-if="item.type == 4">兑换</span>
                <span v-else>出错啦</span>-->
                <span>{{item.title}}</span>
              </td>
              <td>
                <span
                  v-if="(item.title=='提现' && item.content=='提现成功') || (item.title=='提现' && item.content=='审核中')"
                >{{item.price}}</span>
                <!--state=0-->
                <span v-else>{{item.price}}</span>
              </td>
              <td>{{item.remain_price}}乐豆</td>
              <!-- <td>{{userInfos.userExtend.balance}}乐豆</td> -->
              <td>
                <!--           <p v-if="item.type == 0">
                          购买了<span class="name"><router-link to="/mineOthers">{{item.name}}</router-link></span>的文章<span class="article"><router-link to="/newsDetail">{{item.post}}</router-link></span>
                        </p>
                        <p v-else-if="item.type == 1">
                          <span class="name"><router-link to="/mineOthers">{{item.name}}</router-link></span >购买了你的文章<span class="article"><router-link to="/newsDetail">{{item.post}}</router-link></span>
                        </p>
                        <p v-else-if="item.type == 2">
                          已完成
                        </p>
                        <p v-else-if="item.type == 3">
                          <span>审核中</span>
                        </p>
                        <p v-else-if="item.type == 4">
                          300积分兑换乐豆
                        </p>
                <p v-else>出错啦</p>-->
                <p>{{item.content}}</p>
              </td>
              <td>{{item.create_time}}</td>
            </tr>
          </tbody>
        </table>
        <div class="pager">
          <v-pagination
            :total="total"
            :display="display"
            :current-page="current"
            @pagechange="pagechange"
          ></v-pagination>
        </div>
      </div>
      <div class="withdraw" v-show="isActive==2">
        <p>提现到银行卡：</p>
        <address-module v-on:listenToAddressId="showAddressId"></address-module>
        <button v-if="chooseCard==''" @click="openWithdrawPop('false')">提 现</button>
        <button v-else class="chooseButton" @click="openWithdrawPop('true')">提 现</button>
      </div>
      <div v-show="isActive==3" class="recharge">
        <p>
          充值乐豆：
          <input type="text" v-model="withdrawInput" placeholder="请输入充值数量" />
          <span>乐豆</span>所需人民币
          <span>{{withdrawInput/(appInfos.lohas/appInfos.lohas_in_money)}}</span>元。
        </p>
        <h3>
          <span>选择支付方式：</span>
          <label>
            <input type="radio" value="0" v-model="payMethods" />
            <img src="../../../static/img/alipay.png" alt />
          </label>
          <label>
            <input type="radio" value="1" v-model="payMethods" />
            <img src="../../../static/img/wechatpay.png" alt />
          </label>
        </h3>
        <button @click="confirm()">确认付款</button>
        <!-- <button v-if="payMethods==''||withdrawInput==''" @click="confirm('false')">确认付款</button>
        <button v-else-if="payMethods!=''&&withdrawInput!=''" class="confirm" @click="confirm('true')">确认付款</button>-->
      </div>
    </div>
    <!--付款提示框-->
    <div class="payTips" v-show="payTipsState">
      <div>
        <h3>
          支付密码
          <img @click="popUps('pay')" src="../../../static/img/icon_cancle_card_black.png" alt />
        </h3>
        <p>
          确认将
          <span>￥{{rmb}}</span>
          转入银行卡（{{defaultAccount}}）？
        </p>
        <input type="password" placeholder="请输入支付密码" v-model="payPassword" />
        <button @click="withdraw()">确定</button>
      </div>
    </div>
    <div class="payTips" v-show="setTips">
      <div style="height:170px">
        <h3>
          支付密码
          <img
            @click="popUps('setTips')"
            src="../../../static/img/icon_cancle_card_black.png"
            alt
          />
        </h3>
        <p>尚未设置支付密码，请设置</p>
        <button @click="toset">去设置</button>
      </div>
    </div>
    <!--删除提示框-->
    <div class="modifyPhone" v-show="openTips">
      <div>
        <h3>
          提示
          <img :src="httpImg+'icon_cancle_card_black.png'" alt @click="determine()" />
        </h3>
        <p>确定删除该银行卡？</p>
        <button @click="determine('true')">确定</button>
      </div>
    </div>
    <!--申请提示框-->
    <div class="application" v-show="application">
      <div>
        <img :src="httpImg+'icon_popup_correct.png'" alt />
        <h4>您的申请已提交！</h4>
        <p>
          提现金额将在1-5个工作日以内到账，
          请耐心等候！
        </p>
        <button @click="save('apply')">知道了</button>
      </div>
    </div>
    <!--跳起支付-->
    <div ref="htstr" v-html="arousePayment"></div>
  </div>
</template>

<script>
import pagination from "@/common/pagination";
import addressModule from "./addressModule";
import { mapState } from "vuex";
import { mixin } from "@/common/mixin.js";

export default {
  mixins: [mixin],
  data() {
    return {
      arousePayment: "", //唤起支付
      total: 0, // 记录总条数
      display: 0, // 每页显示条数
      current: 1, // 当前的页数
      count: "", //传过去的页面数量
      isActive: 0, //默认下标
      isAddBankCard: false, // 是否新增银行卡
      isEditBankCard: false, // 是否编辑银行卡
      curIntegral: 0, //当前乐豆
      withdrawInput: 0, //提现接口的乐豆
      inputData: "", //实际输入框的数据
      realActive: "", //实际的下标，需要vuex
      holder: "", //开户人
      bankAccount: "", //开户银行
      bankCardNum: "", //银行卡号
      backCardState: false, //0是正确，1是错误
      inputIntegral: 0, //输入框的乐豆
      rmb: 0, //popIntegral
      userInfos: {}, //
      saveState: false, //绑定和编辑银行卡的状态
      payTipsState: false, //付款提示框状态
      application: false, //申请提示框
      deleteBankC: false, //删除银行卡的弹窗
      isDefault: "", //是否默认选中
      httpImg: this.global.httpImg, //全局的图片路径
      chooseCard: "", //单选框选择的下标
      defaultAddressId: "", //默认地址的id
      defaultAccount: "", //默认银行卡的号码
      // bankCardList:[], //银行卡列表
      payMethods: "", //0是支付宝 1是微信
      payPassword: "", //支付密码
      openTips: false, //删除提示
      billList: [
        //type:0购买文章 1文章被购买 2充值 3提现 4兑换
      ],
      setTips: false //没有设置支付密码的弹框
    };
  },
  inject: ["reload"],
  created: function() {
    const that = this;
    that.sessionId =
      localStorage["sessionId"] || sessionStorage["sessionId"] || "";
    // console.log(that.userInfo,389)
    // that.getinformation(that.sessionId);
    that.$http
      .get(that.$api + "/user/information?sessionId=" + that.sessionId)
      .then(res => {
        console.log("%c minxin获取用户信息", "color:green", res);
        if (res.data.code == 1) {
          that.curIntegral = res.data.data.userExtend.balance;
          that.$store.dispatch("userInfo", res.data.data);
          that.userInfos = res.data.data;
        }
      })
      .catch(function(error) {
        that.$layer.msg(error);
      });
    if (that.userInfo) {
      console.log(that.userInfo, 389);
      let userInfos = that.userInfo;
      that.userInfos = userInfos;
      that.curIntegral = userInfos.userExtend.balance;
    }
    if (that.appInfo) {
      let appInfos = that.appInfo;
      that.appInfos = appInfos;
    }
  },
  mounted: function() {
    const that = this;

    if (!this.global.isBlank(this.$route.query.isActive)) {
      // console.log( this.$route.query.isActive ,153 )
      this.isActive = this.$route.query.isActive;
      console.log(this.isActive, "sssss");
      // this.isActive= 1;
    } else if (this.$route.query.isActive == 3) {
      this.isActive = 3;
    }

    if (this.$route.query.isActive) {
      // this.isActive = this.$route.query.isActive;
      // console.log(this.isActive,'sssselses');
      this.isActive = 0;
    }
  },

  components: {
    "v-pagination": pagination,
    addressModule
  },
  computed: {
    ...mapState(["userInfo", "appInfo"])
    // appInfo() {
    //   return this.$store.state.appInfo
    // },
    //     userInfos() {
    //   return this.$store.state.userInfo
    // },
  },
  prop: [
    "realActive" //从父组件拿来的下标
  ],
  watch: {
    inputIntegral(val, oldVal) {
      const that = this;
      let balance = that.curIntegral;
      let minimum_lohas = that.appInfos.minimum_lohas;
      if (val > balance) {
        that.inputIntegral = balance;
      } else if (val < 0) {
        that.inputIntegral = 0;
      }
      let proportion = that.appInfos.lohas / that.appInfos.lohas_in_money;
      that.rmb = val / proportion;
    },
    "$store.state.appInfo.minimum_lohas": function() {
      this.appInfos = this.$store.state.appInfo;
    },
    "$store.state.userInfo": function() {
      console.log("userInfo更新了........");
      console.log(this.$store.state.userInfo, "this.$store.state.userInfo");

      this.userInfos = this.$store.state.userInfo;
      this.curIntegral = this.$store.state.userInfo.userExtend.balance;
    }
  },
  methods: {
    //去设置
    toset() {
      this.$store.dispatch("reActive", 1);
      this.$router.push({
        path: "setting",
        query: {
          Active: 1
        }
      });
    },
    //提现
    withdraw: function() {
      const that = this;
      let payPassword = that.payPassword;
      let account = that.defaultAccount;
      let id = that.defaultAddressId;
      if (payPassword == "") {
        that.$store.dispatch("sendTips", {
          isTip: true,
          content: "支付密码不能为空"
        });
      } else {
        that.$http
          .get(that.$api + "/withdrawal/save", {
            params: {
              sessionId: that.sessionId,
              price: that.rmb,
              bankCardId: id,
              payPassword: payPassword
            }
          })
          .then(res => {
            console.log("%c 提现状态", "color:green", res);
            if (res.data.code === 1) {
              this.payTipsState = !this.payTipsState;
              this.application = !this.application;
              that.$http
                .get(
                  that.$api +
                    "/user/information?sessionId=" +
                    localStorage["sessionId"] ||
                    sessionStorage["sessionId"] ||
                    ""
                )
                .then(res => {
                  console.log("%c 获取用户信息", "color:green", res);
                  if (res.data.code == 1) {
                    that.$store.dispatch("userInfo", res.data.data);
                    that.userInfos = res.data.data;
                    that.curIntegral = userInfos.userExtend.balance;
                    // that.ISLogin = true;
                  }
                })
                .catch(function(error) {
                  that.$layer.msg(error);
                });
            } else {
              that.$store.dispatch("sendTips", {
                isTip: true,
                content: res.data.desc
              });
            }
          })
          .catch(function(error) {});
      }
      console.log(payPassword, id, account, 408);
    },
    //从子组件带过来的id
    showAddressId: function({ id = "", account = "" }) {
      const that = this;
      that.defaultAddressId = id;
      that.defaultAccount = account;
    },
    pagechange: function(currentPage) {
      const that = this;
      that.pageNumber = currentPage;
      that.getConsumptionList({ pageNumber: currentPage });
    },
    //获取消费列表
    getConsumptionList: function({ pageNumber = 1, pageSize = 10 } = {}) {
      const that = this;
      that.$http
        .get(that.$api + "/balance/record/page", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        })
        .then(res => {
          console.log("%c 获取消费列表", "color:green", res);
          let list = res.data.data;
          that.billList = list.list;
          for (var i = 0; i < that.billList.length; i++) {
            if (!that.billList[i].title.indexOf("购买")) {
              that.billList[i].price = "-" + that.billList[i].price;
            } else if(!that.billList[i].title.indexOf("提现")){
              that.billList[i].price =  "-"+that.billList[i].price;
            }else if(!that.billList[i].title.indexOf("兑换")||!that.billList[i].title.indexOf("充值")){
              that.billList[i].price =  "+"+that.billList[i].price;
            }
          }
          that.total = list.totalRow;
          that.display = list.pageSize;
        })
        .catch(function(error) {});
    },
    setActive(index) {
      const that = this;
      if (index != this.isActive) {
        this.isActive = index;
        this.$router.push({ path: "/wealth", query: { isActive: index } });
        if ((index = 1)) {
          that.getConsumptionList();
        }
      }
    },
    //各种弹窗
    popUps(type) {
      if (type == "add") {
        this.isAddBankCard = !this.isAddBankCard;
      } else if (type == "edit") {
        this.isEditBankCard = !this.isEditBankCard;
      } else if (type == "pay") {
        this.payTipsState = !this.payTipsState;
      } else if (type == "delete") {
        // this.$store.dispatch('sendTips', {isTip:true,content:'银行卡删除成功'});
        console.log(this.openTips, 450);
        this.openTips = !this.openTips;
      } else if (type == "setTips") {
        this.setTips = !this.setTips;
      }
    },
    save(type) {
      // if( type == 'add' ){
      //   this.isAddBankCard = !this.isAddBankCard;
      // }
      // else if( type == 'edit' ) {
      //   this.isEditBankCard = !this.isEditBankCard;
      // }
      // else
      if (type == "pay") {
        let payPassword = this.payPassword.replace(/(^\s*)|(\s*$)/g, ""); //支付密码
        let setPayPassword = "1234";
        if (payPassword == setPayPassword) {
          // this.$store.dispatch('sendTips', {isTip:true,content:'跳转到支付页面'});
          this.application = !this.application;
        } else {
          this.$store.dispatch("sendTips", {
            isTip: true,
            content: "支付密码错误，请重新输入"
          });
        }
        this.payTipsState = !this.payTipsState;
      } else if (type == "apply") {
        this.application = !this.application;
        this.reload();
      }
    },
    confirm() {
      // console.log(bool,445)
      const that = this;
      let payMethods = that.payMethods;
      let appInfos = that.appInfos;
      let withdrawInput =
        that.withdrawInput / (appInfos.lohas / appInfos.lohas_in_money);
      if (payMethods == "") {
        that.$store.dispatch("sendTips", {
          isTip: true,
          content: "请选择支付方式"
        });
        return;
      } else if (withdrawInput == 0) {
        that.$store.dispatch("sendTips", {
          isTip: true,
          content: "充值金额不能为0"
        });
        return;
      } else if (withdrawInput < 0.1) {
        that.$store.dispatch("sendTips", {
          isTip: true,
          content: "充值金额最少要为0.1元"
        });
        return;
      }

      that.$http
        .get(that.$api + "/pay/topUp", {
          params: {
            sessionId: that.sessionId,
            price: withdrawInput,
            type: payMethods,
            lohas: this.withdrawInput
          }
        })
        .then(res => {
          console.log("%c 调取支付", "color:green", res.data);
          //that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          if (payMethods == 0) {
            console.log(res.data);
            let arousePayment = res.data.data;
            that.arousePayment = arousePayment;
            arousePayment.replace(
              /<script.*?>([\s\S]+?)<\/script>/gim,
              function(_, js) {
                //正则匹配出script中的内容
                arousePayment = js;
              }
            );
            that.$nextTick(() => {
              let ele = document.createElement("script");
              ele.innerHTML = arousePayment;
              that.$refs.htstr.append(ele);
              // console.log(that.$refs.htstr,189)
            });
          } else if (payMethods == 1) {
            console.log(res.data, "%c 调取支付");
            if (res.data.code == 1) {
              let link = res.data.data;
              that.$router.push({
                path: "payment",
                query: {
                  type: payMethods,
                  price: withdrawInput,
                  link: link,
                  desc: res.data.desc
                }
              });
            }
          }
        })
        .catch(function(error) {});
    },
    openWithdrawPop(bool) {
      if (this.inputIntegral == 0) {
        this.$store.dispatch("sendTips", {
          isTip: true,
          content: "提现金额不能为0"
        });
      } else if (this.defaultAddressId == "") {
        this.$store.dispatch("sendTips", {
          isTip: true,
          content: "请设置提现的默认地址"
        });
      } else if (this.inputIntegral < this.appInfos.minimum_lohas) {
        this.$store.dispatch("sendTips", {
          isTip: true,
          content: "应多于最低提现乐豆"
        });
      } else if (this.userInfos.isUserPassword == 0) {
        this.setTips = !this.setTips;
      } else {
        this.payTipsState = !this.payTipsState;
      }
    },
    determine(name) {
      this.openTips = !this.openTips;
      if (name == "true") {
        this.$store.dispatch("sendTips", { isTip: true, content: "删除成功" });
      }
    },
    redeemAll() {
      this.inputData = this.curIntegral;
      this.inputIntegral = this.curIntegral;
    },
    switchPoints(index) {
      //切换成积分路由，并向父组件传递下标
      this.$emit("changeActive", index);
      this.$router.push({
        path: "integral"
      });
    },
    switchWithdraw(index) {
      //打开提现版块
      this.isActive = index;
    },
    switchRecharge(index) {
      //打开充值版块
      this.isActive = index;
    },
    inputFunc(name) {
      let reg = /^([1-9]{1})(\d{14}|\d{18})$/; //验证银行卡号
      let bankCardNum = this.bankCardNum.replace(/(^\s*)|(\s*$)/g, ""); //银行卡号
      let holder = this.holder.replace(/(^\s*)|(\s*$)/g, ""); //开户人
      let bankAccount = this.bankAccount.replace(/(^\s*)|(\s*$)/g, ""); //开户银行

      if (name == "bankCard") {
        if (bankCardNum == "") {
          this.backCardState = false;
        } else if (reg.test(bankCardNum)) {
          this.backCardState = true;
        } else {
          this.backCardState = false;
        }
      }
      // else if( name == 'holder' ){
      //   if( holder == '' ){
      //     this.saveState = false;
      //   }
      // }
      console.log(this.backCardState == true, 549);
      holder != "" && bankAccount != "" && this.backCardState == true
        ? (this.saveState = true)
        : (this.saveState = false);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../common/common.scss";

.pager {
  height: 56px;
  font-size: 14px;
  color: white;
  text-align: center;
  position: relative;
  bottom: -20px;
}

.modifyPhone {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.1);
  & > div {
    width: 371px;
    height: 163px;
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
    padding-bottom: 20px;
    & > h3 {
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
    & > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(228, 61, 61, 1);
      margin: 30px 0 20px 28px;
      text-align: left;
    }
    & > button {
      border: none;
      outline: none;
      width: 60px;
      height: 30px;
      background: #e5e5e5;
      border-radius: 2px;
      color: white;
      cursor: pointer;
      display: block;
      float: right;
      margin-right: 20px;
      &:hover {
        background: #69c9ff;
      }
    }
  }
}

.module {
  box-sizing: border-box;
  & > h3 {
    height: 68px;
    line-height: 68px;
    padding: 0 40px;
    background: white;
    border-bottom: 1px solid #f2f2f2;
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
        color: #8d8d8d;
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
        border-bottom: 2px solid white;
        &:hover {
          color: #333333;
          border-bottom: 2px solid #333333;
        }
      }
    }
  }
  .container {
    padding: 11px 40px 100px 40px;
    box-sizing: border-box;
    min-height: 450px;
    .integral {
      width: 278px;
      height: 333px;
      margin: 57px 0 0 298px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 21px 0px rgba(12, 29, 43, 0.24);
      border-radius: 2px;
      position: relative;
      & > h3 {
        text-align: center;
        position: absolute;
        bottom: 9px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        div {
          @include ibMid();
          width: 24px;
          height: 24px;
          background-size: 100% 100%;
          background-image: url("../../../static/img/icon_exchange_white.png");
        }
        span {
          @include ibMid();
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        &:hover {
          span {
            color: #ea6f44;
          }
          div {
            background-image: url("../../../static/img/icon_exchange_yellow.png");
          }
        }
      }
      & > div {
        width: 306px;
        height: 308px;
        background-image: url("../../../static/img/pic_wealth_red.png");
        background-size: 100% 100%;
        position: absolute;
        top: -15px;
        left: -15px;
        text-align: center;
        padding: 0 16px 0 16px;
        box-sizing: border-box;
        & > div {
          width: 78px;
          height: 78px;
          margin: 43px auto 24px auto;
          position: relative;
          border-radius: 50%;
          box-sizing: border-box;
          border: 2px solid white;
          img {
            width: 40px;
            height: 32px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        & > span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        & > p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin: 13px 0 50px 0;
          span {
            display: inline-block;
            font-size: 30px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            margin-right: 7px;
            border-bottom: 1px solid #ffffff;
          }
        }
        & > h3 {
          text-align: left;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          & > div {
            font-size: 0;
            cursor: pointer;
            &:nth-of-type(1) {
              float: left;
            }
            &:nth-of-type(2) {
              float: right;
            }
            a {
              color: white;
            }
            img,
            span {
              @include ibMid();
            }
            span {
              font-size: 14px;
              margin-left: 6px;
            }
            img {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
    .rule {
      & > h2 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }
      .bill {
        width: 100%;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        thead {
          background: #fada05;
        }
        tbody {
          td {
            .name {
              font-size: 14px;
              margin: 0 6px;
              a {
                color: rgba(55, 162, 241, 1);
              }
            }
            .article {
              font-size: 14px;
              margin: 0 6px;
              a {
                color: rgba(228, 61, 61, 1);
              }
            }
          }
        }
        tr {
          box-sizing: border-box;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          font-size: 14px;
          th {
            height: 33px;
            color: rgba(31, 31, 31, 1);
            text-align: left;
            font-weight: 400;
          }
          td {
            height: 37px;
            color: rgba(71, 71, 71, 1);
            &:nth-of-type(3) {
              color: #e43d3d;
            }
          }
          td,
          th {
            border-right: 1px solid #e5e5e5;
            padding: 0 14px 0 14px;
            box-sizing: border-box;
            height: 56px;
            &:last-child {
              border-right: 0;
            }
          }
        }
      }
    }
    .withdraw {
      & > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 22px;
      }
      & > div {
        background: rgba(239, 243, 245, 1);
        padding: 17px 0 28px 0;
        & > img {
          width: 206px;
          height: 158px;
          display: block;
          margin: 0 auto 0 auto;
        }
        & > ul {
          width: 444px;
          margin: 0 auto auto;
          & > li {
            height: 116px;
            box-shadow: 0px 2px 6px 0px rgba(45, 45, 45, 0.2);
            border-radius: 2px;
            margin-bottom: 30px;
            &:last-child {
              margin-bottom: 0;
            }
            .infos {
              height: 81px;
              background: #ff5454;
              box-sizing: border-box;
              padding: 16px 16px 0 16px;
              & > div {
                font-size: 0;
                &:nth-of-type(1) {
                  width: 32px;
                  height: 32px;
                  background-size: 100% 100%;
                  @include ibMid();
                  margin-right: 3px;
                }
                &:nth-of-type(2) {
                  @include ibMid();
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  p {
                    margin-bottom: 8px;
                    &:last-child {
                      margin-bottom: 0;
                    }
                  }
                }
                &:nth-of-type(3) {
                  @include ibMid();
                  font-size: 14px;
                  float: right;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  span:nth-of-type(1) {
                    margin-right: 22px;
                  }
                }
              }
            }
            .operating {
              height: 35px;
              line-height: 35px;
              padding: 0 32px;
              label {
                @include ibMid();
                input[type="radio"] {
                  width: 16px;
                  height: 16px;
                  background: url("../../../static/img/icon_nochoice.png")
                    no-repeat center;
                  -webkit-appearance: none;
                  outline: none;
                }
                input[type="radio"]:checked {
                  background: url("../../../static/img/icon_choice.png")
                    no-repeat center;
                  background-size: 100% 100%;
                }
                font-size: 0;
                input {
                  @include ibMid();
                  cursor: pointer;
                  margin-right: 3px;
                }
                span {
                  font-size: 12px;
                  @include ibMid();
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(141, 141, 141, 1);
                }
              }
              p {
                @include ibMid();
                float: right;
                span {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(192, 192, 192, 1);
                  cursor: pointer;
                  &:nth-of-type(1) {
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
        & > button {
          border: none;
          outline: none;
          width: 124px;
          font-size: 14px;
          height: 38px;
          display: block;
          margin: 37px auto 0 auto;
          line-height: 38px;
          background: rgba(251, 206, 0, 1);
          border-radius: 2px;
          color: white;
          cursor: pointer;
          &:hover {
            background: #ffd71f;
          }
        }
      }
      & > button {
        width: 124px;
        height: 38px;
        border: none;
        outline: none;
        background: #e6e6e6;
        border-radius: 2px;
        display: block;
        margin: 50px auto 0 auto;
        color: white;
        cursor: pointer;
        &:hover {
          background: #69c9ff;
        }
      }
      .chooseButton {
        background: rgba(73, 189, 255, 1);
      }
    }
  }
  .curWealth {
    background: white;
    padding: 11px 40px 28px 40px;
    border-bottom: 1px solid #eff3f5;
    & > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 18px;
      span {
        &:nth-of-type(1),
        &:nth-of-type(2) {
          font-size: 14px;
          color: rgba(228, 61, 61, 1);
        }
        &:nth-of-type(3) {
          font-size: 14px;
          color: #f5a623;
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
    & > h3 {
      font-size: 0;
      margin-bottom: 14px;
      input {
        @include ibMid();
        border: none;
        outline: none;
        width: 172px;
        height: 28px;
        font-size: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 2px;
        margin-right: 6px;
        padding-left: 9px;
        color: #333;
      }
      span {
        @include ibMid();
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        &:nth-of-type(1) {
          margin-right: 28px;
        }
      }
    }
    & > h4 {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-left: 70px;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          color: #e43d3d;
          margin: 0 7px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          color: #e43d3d;
          margin-left: 6px;
          cursor: pointer;
        }
      }
    }
  }
  .recharge {
    background: white;
    & > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 18px;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          color: #8d8d8d;
          margin: 0 15px 0 13px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          color: rgba(228, 61, 61, 1);
        }
      }
      & > input {
        @include ibMid();
        border: none;
        outline: none;
        width: 172px;
        height: 28px;
        font-size: 14px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 2px;
        padding-left: 9px;
        color: #333;
        margin-left: 10px;
      }
    }
    & > h3 {
      font-size: 0;
      span {
        @include ibMid();
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-right: 15px;
      }
      label {
        @include ibMid();
        font-size: 0;
        margin-right: 25px;
        cursor: pointer;
        input[type="radio"] {
          width: 16px;
          height: 16px;
          background: url("../../../static/img/icon_nochoice.png") no-repeat
            center;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
        }
        input[type="radio"]:checked {
          background: url("../../../static/img/icon_choice.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        input {
          @include ibMid();
          margin-right: 8px;
        }
        img {
          @include ibMid();
        }
      }
    }
    & > button {
      border: none;
      outline: none;
      display: block;
      margin-top: 33px;
      width: 84px;
      height: 30px;
      background: rgba(229, 229, 229, 1);
      border-radius: 2px;
      color: white;
      cursor: pointer;
      &:hover {
        background: #69c9ff;
      }
    }
    .confirm {
      background: rgba(73, 189, 255, 1);
    }
  }
  .bacWhite {
    background: white;
  }
  .bindingBankC {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 600px;
      height: 339px;
      min-height: 339px;
      background: white;
      box-sizing: border-box;
      border: 7px solid #656565;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      & > h3 {
        height: 44px;
        line-height: 44px;
        padding: 0 20px;
        box-sizing: border-box;
        span {
          @include ibMid();
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        img {
          @include ibMid();
          width: 14px;
          height: 14px;
          float: right;
          margin-top: 15px;
          cursor: pointer;
        }
      }
      ul {
        padding: 30px 30px 0 30px;
        background: #eff3f5;
        height: 210px;
        box-sizing: border-box;
        li {
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          font-size: 0;
          margin-bottom: 26px;
          &:last-child {
            margin-bottom: 0;
          }
          & > span {
            @include ibMid();
            font-size: 14px;
            width: 75px;
          }
          & > input {
            @include ibMid();
            font-size: 12px;
            border: none;
            outline: none;
            width: 426px;
            height: 30px;
            padding-left: 12px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(192, 192, 192, 1);
          }
          & > p {
            font-family: MicrosoftYaHei;
            font-weight: 400;
            font-size: 0;
            width: 426px;
            margin: 4px 26px 0 0;
            float: right;
            span {
              @include ibMid();
              margin-left: 6px;
              font-size: 12px;
              color: rgba(228, 61, 61, 1);
            }
            label {
              @include ibMid();
              @include inputCheck();
              float: right;
              font-size: 0;
              input {
                @include ibMid();
              }
              span {
                font-size: 12px;
                @include ibMid();
                color: rgba(51, 51, 51, 1);
              }
            }
          }
          @include clearFloat();
        }
      }
      & > button {
        border: none;
        outline: none;
        width: 84px;
        height: 30px;
        background: #e5e5e5;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        display: block;
        margin: 20px auto 0 auto;
        &:hover {
          background: #69c9ff;
        }
      }
      .saveButton {
        background: #49bdff;
      }
    }
  }
  .payTips {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 371px;
      height: 229px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 11px 29px 0px rgba(42, 42, 42, 0.36);
      background: white;
      box-sizing: border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      & > h3 {
        height: 44px;
        line-height: 44px;
        background: #ffb53a;
        text-align: center;
        box-sizing: border-box;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: white;
        position: relative;
        img {
          @include ibMid();
          width: 14px;
          height: 14px;
          position: absolute;
          top: 15px;
          right: 20px;
          cursor: pointer;
        }
      }
      & > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 18px 0;
        padding: 0 10px;
        text-align: center;
        span {
          color: #e43d3d;
        }
      }
      & > input {
        border: none;
        outline: none;
        width: 280px;
        height: 44px;
        display: block;
        margin: 0 auto;
        background: rgba(242, 242, 242, 1);
        padding: 0 11px;
        box-sizing: border-box;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(141, 141, 141, 1);
      }
      & > button {
        border: none;
        outline: none;
        width: 84px;
        height: 30px;
        background: rgba(73, 189, 255, 1);
        border-radius: 2px;
        color: white;
        cursor: pointer;
        display: block;
        float: right;
        margin: 20px 20px 0 0;
      }
    }
  }
  .application {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 326px;
      height: 214px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 11px 29px 0px rgba(42, 42, 42, 0.36);
      background: white;
      box-sizing: border-box;
      padding: 17px 0;
      text-align: center;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      & > h4 {
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin: 10px 0;
      }
      & > p {
        width: 226px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 0 auto;
      }
      & > button {
        border: none;
        outline: none;
        width: 100px;
        height: 30px;
        background: rgba(202, 202, 202, 0);
        border: 1px solid rgba(216, 216, 216, 1);
        border-radius: 2px;
        color: #49bdff;
        cursor: pointer;
        margin-top: 10px;
        &:hover {
          border: none;
          background: #49bdff;
          color: #f2f2f2;
        }
      }
    }
  }
}
</style>
