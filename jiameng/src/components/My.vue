<template>
  <div style="margin-bottom:0.57rem;">
    <!-- 我的 -->
    <Top :text="myText" />
    <!-- img -->
    <div class="myImg">
      <img src="../assets/img/my/pic_wdbj.png" alt />
      <div class="myTop">
        <img src="../assets/img/my/pic_touxing.png" alt />
        <div>
          <span class="myText">黄小文</span>
          <span class="myNum">用户编码：CA-001</span>
          <span class="myId">微信ID：WX18215456874</span>
        </div>
      </div>
      <div class="myBottom">
        <ul>
          <li>
            <p class="myP">岗位</p>
            <p>门店主管</p>
          </li>
          <li>
            <p class="myP">所属门店</p>
            <p>工作科学城店</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 提醒设置 -->
    <div class="myRemind">
      <img src="../assets/img/my/icon_nztx.png" alt />
    </div>
    <!-- 提醒组件 -->
    <div>
      <!-- 天数和提醒一起 -->
      <div class="myRemindDay">
        <p class="myRemindDayOne">
          <span>鲜采订单提醒</span>
          <img src="../assets/img/my/btn_on.png" alt v-show="imgClick" />
          <img src="../assets/img/my/btn_off.png" alt v-show="!imgClick" />
        </p>
        <p class="myRemindDayTwo myTwo">
          <span>鲜采订单提前天数</span>
          <span>1</span>
          <img src="../assets/img/my/btn_shuliang.png" alt />
        </p>
      </div>
      <div>
        <!-- 上报 -->
        <p class="myRemindReported myRemindDayTwo">
          <span>营收上报提醒</span>
          <img src="../assets/img/my/btn_on.png" alt v-show="imgClick" />
          <img src="../assets/img/my/btn_off.png" alt v-show="!imgClick" />
        </p>
      </div>
      <div>
        <!-- 上报 -->
        <p class="myRemindConsume myRemindDayTwo">
          <span>每日消费提醒</span>
          <!-- <img src="../assets/img/my/btn_on.png" alt v-show="imgClick" /> -->
          <img src="../assets/img/my/btn_off.png" alt v-show="imgClick" />
        </p>
      </div>
      <!-- 周菜单 -->
      <div class="myRemindDay">
        <p class="myRemindDayOne myRemindDaySpan">
          <span>周菜单编制提醒</span>
          <img src="../assets/img/my/btn_on.png" alt v-show="imgClick" />
          <img src="../assets/img/my/btn_off.png" alt v-show="!imgClick" />
        </p>
        <p class="myRemindDayTwo myRemindDay">
          <span>周菜单提醒提前天数</span>
          <span>1</span>
          <img src="../assets/img/my/btn_shuliang.png" alt />
        </p>
      </div>
      <!-- 退出登录 -->
      <div class="myRegister">
        <button>退出登录</button>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Top from "./common/Top";
export default {
  name: "My",
  data() {
    return {
      myText: "我的",
      imgClick: true,
      myObj: [
        {
          text: "鲜采订单提醒",
          img: require("../assets/img/my/icon_nztx.png"),
          imgClick: require("../assets/img/my/icon_nztx.png")
        }
      ]
    };
  },
  components: {
    Top
  }
};
</script>
<style scoped>
.myImg {
  width: 100%;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  font-size: 0px;
}
.myImg > img {
  width: 95%;
}
.myTop {
  width: 85%;
  margin: 0 auto;
  font-size: 0px;
  overflow: hidden;
  position: absolute;
  top: 0.61rem;
  left: 0.42rem;
}
.myTop img {
  width: 20%;
  float: left;
  margin-top: 0.19rem;
}
.myTop div {
  width: 75%;
  float: left;
  font-size: 0px;
  height: 100%;
}
.myTop span {
  width: 70%;
  display: inline-block;
  text-align: left;
}
.myText {
  font-size: 0.18rem;
  color: white;
  margin: 0.1rem auto;
}
.myNum,
.myId {
  margin: 0.03rem auto;
  font-size: 0.14rem;
  color: white;
}
.myBottom {
  font-size: 0px;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  top: 1.66rem;
  left: 0.24rem;
}
.myBottom ul li {
  float: left;
  width: 50%;
  font-size: 0.16rem;
  color: white;
}
.myBottom ul li:nth-child(1) {
  position: relative;
  left: -0.26rem;
}
.myBottom ul li p {
  margin-bottom: 0.05rem;
}

.myP {
  margin-left: -0.41rem;
  font-size: 0.12rem;
}
.myBottom ul li:nth-child(1)::after {
  width: 1px;
  height: 0.45rem;
  content: "";
  display: block;
  background: white;
  position: absolute;
  top: 0.05rem;
  left: 2rem;
}
.myRemind {
  font-size: 0px;
  text-align: left;
}
.myRemind img {
  margin: 0.26rem auto;
  margin-left: 0.1rem;
}
.myRemindDay {
  font-size: 0px;
}
.myRemindDayOne {
  font-size: 0px;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: left;
  width: 96%;
  margin: 0 auto;
  background: white;
  color: black;
  border-radius: 0.07rem 0.07rem 0px 0px;
  margin-bottom: 1px;
}
.myRemindDayOne img {
  position: relative;
  top: 0.1rem;
  right: -1.81rem;
}
.myTwo img {
  left: 0.92rem !important;
}
.myTwo span {
  left: 1.36rem !important;
}
.myRemindDayTwo {
  font-size: 0px;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: left;
  width: 96%;
  margin: 0 auto;
  background: white;
  color: black;
}
.myRemindDayTwo img {
  position: relative;
  top: 0.06rem;
  left: 0.78rem;
}
.myRemindReported,
.myRemindConsume {
  margin: 0.1rem auto;
  border-radius: 0.07rem;
}
.myRemindReported img {
  position: relative;
  top: 0.09rem;
  left: 1.81rem;
}
.myRemindDaySpan img {
  position: relative;
  top: 0.1rem;
  left: 1.6rem;
}
.myRemindConsume img {
  position: relative;
  top: 0.09rem;
  left: 1.81rem;
}
.myRemindDayTwo span:nth-child(2) {
  position: relative;
  left: 1.2rem;
}
.myRemindDay span,
.myRemindDayTwo span {
  font-size: 0.16rem;
  margin-left: 0.1rem;
}
.myRegister {
  font-size: 0px;
}
.myRegister button {
  width: 80%;
  height: 0.4rem;
  border-radius: 0.3rem;
  border: none;
  background: #ec6060;
  margin: 0.2rem;
  color: white;
  font-size: 0.17rem;
}
</style>