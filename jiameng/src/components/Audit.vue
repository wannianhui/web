<template>
  <div>
    <Top :text="auditText" />
    <!-- 搜索 -->
    <div class="freshTop">
      <img src="../assets/img/freshMining/icon_sousuo.png" alt class="freshSou" />
      <input type="text" value="搜索我的审核" />
      <img src="../assets/img/freshMining/icon_saixuan.png" alt class="freshSai" />
      <span>筛选</span>
    </div>
    <!-- 处理 -->
    <div class="dispose">
      <p @click="disposeClick(0)">
        <span>未处理</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="disposeImg" />
      </p>
      <p @click="disposeClick(1)">
        <span>已处理</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="!disposeImg" />
      </p>
    </div>
    <!-- 处理信息 -->
    <div class="message" v-if="disposeImg">
      <ul>
        <li v-for="(item,index) in yesMessageList" :key="index">
          <p>
            单号ID：{{item.ID}}
            <span>{{item.audit}}</span>
            <!-- <img src="../assets/img/freshMining/pic_xian.png" alt=""> -->
          </p>
          <p>订货日期{{item.orderTime}}</p>
          <p>
            要货日期：{{item.enquiryTime}}
            <img src="../assets/img/freshMining/icon_moer2.png" alt />
          </p>
          <p>
            <img :src="item.overproofImg" alt />
            <span>{{item.overproof}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="auditBottom" v-if="!disposeImg">
      <!-- 申请 -->
      <ul>
        <li v-for="(item,index) in topText" :key="index">
          <div style="display:flex;">
            <p>{{item.text}}</p>
            <p>
              <span>{{item.p}}</span>
            </p>
          </div>
           <img src="../assets/img/btn/pic_xian.png" alt="">
          <h3 class="auditH3">{{item.Bottomh3}}</h3>
          <p class="auditP">{{item.Bottomp}}</p>
          <p class="auditP">{{item.Bottomspan}}</p>
          <p class="auditP auditLast">{{item.Bottomtext}}</p>
        </li>
      </ul>
    </div>
    <!-- 已无更多内容 -->
    <p style="color:#999999;fontSize:0.12rem;">- 已无更多内容 -</p>
  </div>
</template>
<script>
// 引入top组件
import Top from "./common/Top";
export default {
  name: "Audit",
  data() {
    return {
      auditText: "我的审核",
      topText: [
        {
          text: "广州科学城店",
          p: "通过",
          Bottomh3: "鲜采申请",
          Bottomp: "单号：0001",
          Bottomspan: "申请时间：2020-03-19  15:14:00",
          Bottomtext: "处理时间：2020-03-19  15:14:00"
        },
        {
          text: "广州科学城店",
          p: "通过",
          Bottomh3: "鲜采申请",
          Bottomp: "单号：0001",
          Bottomspan: "申请时间：2020-03-19  15:14:00",
          Bottomtext: "处理时间：2020-03-19  15:14:00"
        },
        {
          text: "广州科学城店",
          p: "未通过",
          Bottomh3: "鲜采申请",
          Bottomp: "单号：0001",
          Bottomspan: "申请时间：2020-03-19  15:14:00",
          Bottomtext: "处理时间：2020-03-19  15:14:00"
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
.freshTop {
  font-size: 0px;
  height: 0.5rem;
  background: white;
  line-height: 0.61rem;
  margin: 0.06rem auto;
}
.freshTop input {
  border: none;
  color: #999;
  font-size: 0.14rem;
  height: 0.3rem;
  width: 81%;
  margin-left: -0.28rem;
  background: #f4f4f4;
  text-indent: 0.44rem;
}
.freshSai {
  position: relative;
  top: -0.02rem;
  left: 0.23rem;
}
.freshTop span {
  font-size: 0.11rem;
  color: #999;
  position: absolute;
  top: 0.63rem;
  right: 0.13rem;
}
.freshSou {
  position: absolute;
  top: 0.71rem;
  left: 0.24rem;
}
.dispose {
  font-size: 0px;
  height: 0.5rem;
  overflow: hidden;
  background: white;
  border-bottom: 1px solid #3333;
}
.dispose p {
  float: left;
  height: 0.5rem;
  width: 50%;
  margin-top: 0.1rem;
}
.dispose p:nth-child(2) span {
  color: #333;
}
.dispose p span {
  color: #999;
  font-weight: bold;
  /* line-height: 0.6rem; */
  font-size: 0.16rem;
  margin-bottom: 0.04rem;
  display: block;
}
.auditBottom {
  font-size: 0px;
  width: 100%;
}
.auditBottom ul {
  width: 100%;
  font-size: 0.16rem;
}
.auditBottom ul li {
    background: white;
  width: 100%;
  margin-bottom: 0.15rem;
}
.auditBottom div {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #999;
}
.auditBottom div p:nth-child(1) {
  text-align: left;
  margin-left: 0.18rem;
  font-size: 0.12rem;
}
.auditBottom div p:nth-child(2) span {
  color: #60eca5;
  width: 0.7rem;
  display: inline-block;
  height: 0.18rem;
  line-height: 0.18rem;
  font-size: 0.11rem;
  background: #d7f1e4;
  position: relative;
  left: 0.42rem;
  border-radius: 0.1rem;
}
.auditBottom ul li:nth-child(3) div p:nth-child(2) span {
  color: #ec6060;
  background: rgb(238, 187, 187);
}
.auditBottom div p {
  flex: 1;
  margin-top: 0.07rem;
}
.auditH3{
  height: 0.3rem;
  font-size: 0.14rem;
  line-height: 0.3rem;
  color:#333;
  text-align: left;
  margin-left: 0.18rem;
}
.auditP{
  font-size: 0.11rem;
  color: #999;
  margin: 0.05rem auto;
  margin-left: 0.18rem;
  text-align: left;
}
.auditLast{
  padding-bottom:0.15rem;
}
</style>
