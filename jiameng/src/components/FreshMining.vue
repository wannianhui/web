<template>
  <div>
    <Top :text="freshMiningText" />
    <!-- 搜索 -->
    <div class="freshTop">
      <img src="../assets/img/freshMining/icon_sousuo.png" alt class="freshSou" />
      <input type="text" value="搜索鲜采订单" />
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
    <div class="message noMessage" v-if="!disposeImg">
      <ul>
        <li v-for="(item,index) in noMessageList" :key="index">
          <p>
            单号ID：{{item.ID}}
            <span>{{item.audit}}</span>
            <!-- <span>￥1352.00</span> -->
            <!-- <img src="../assets/img/freshMining/pic_xian.png" alt=""> -->
          </p>
          <p>订货日期{{item.orderTime}}</p>
          <p>
            要货日期：{{item.enquiryTime}}
            <span>￥1352.00</span>
            <!-- <img src="../assets/img/freshMining/icon_moer2.png" alt /> -->
          </p>
          <p>
            <img :src="item.overproofImg" alt />
            <span>{{item.overproof}}</span>
          </p>
        </li>
      </ul>
    </div>
    <!-- 已无更多内容 -->
    <p style="color:#999999;fontSize:0.12rem;">- 已无更多内容 -</p>
  </div>
</template>
<script>
import Top from "./common/Top";
export default {
  name: "FreshMining", //鲜采订单
  data() {
    return {
      freshMiningText: "鲜采订单",
      disposeImg: true,
      yesMessageList: [
        {
          ID: "MD001",
          audit: "审核未通过",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19    15:14",
          overproofImg: require("../assets/img/freshMining/icon_tishi.png"),
          overproof: "采购金额超标"
        },
        {
          ID: "MD001",
          audit: "审核通过",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19  15:14"
        },
        {
          ID: "MD001",
          audit: "审核通过",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19  15:14"
        }
      ],
      noMessageList: [
        {
          ID: "MD001",
          audit: "已取消",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19    15:14",
          overproofImg: require("../assets/img/freshMining/icon_tishi.png"),
          overproof: "库存不足 无法订货"
        },
        {
          ID: "MD001",
          audit: "审核中",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19  15:14",
          overproofImg: require("../assets/img/freshMining/icon_tishi.png"),
          overproof: "部门经理审核-王海洋"
        },
        {
          ID: "MD001",
          audit: "待发货",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19  15:14"
        },
        {
          ID: "MD001",
          audit: "已发货",
          orderTime: "2020-03-19",
          enquiryTime: "2020-03-19  15:14"
        }
      ]
    };
  },
  components: {
    Top
  },
  methods: {
    disposeClick(num) {
      if (num == 0) {
        this.disposeImg = true;
      } else {
        this.disposeImg = false;
      }
    }
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
  color: #999;
}
.dispose p span {
  color: #333;
  font-weight: bold;
  /* line-height: 0.6rem; */
  font-size: 0.16rem;
  margin-bottom: 0.04rem;
  display: block;
}

.message {
  font-size: 0px;
}
.message ul li {
  width: 100%;
  /* font-size: 0.16rem; */
  /* height: 1.06rem; */
  background: white;
  margin-bottom: 0.1rem;
}
.message ul li p {
  width: 91%;
  margin: 0px auto;
}
.message ul li p:nth-child(1) {
  font-size: 0.12rem;
  color: #999;
  /* width: 90%; */
  margin: 0 auto;
  text-align: left;
  line-height: 0.3rem;
}
.message ul li:nth-child(1) p:nth-child(1) span {
  color: #ff650d;
  position: relative;
  left: 1.658rem;
  width: 0.81rem;
  text-align: center;
  line-height: 0.18rem;
  height: 0.17rem;
  background: #ecc1a9;
  border-radius: 0.1rem;
  display: inline-block;
}
.message ul li:nth-child(2) p:nth-child(1) span {
  color: #5a7ff6;
  position: relative;
  left: 1.658rem;
  width: 0.81rem;
  text-align: center;
  line-height: 0.18rem;
  height: 0.17rem;
  background: #b9c6f1;
  border-radius: 0.1rem;
  display: inline-block;
}
.message ul li:nth-child(3) p:nth-child(1) span {
  color: #5a7ff6;
  position: relative;
  left: 1.658rem;
  width: 0.81rem;
  text-align: center;
  line-height: 0.18rem;
  height: 0.17rem;
  background: #b9c6f1;
  border-radius: 0.1rem;
  display: inline-block;
}
.noMessage ul li:nth-child(4) p:nth-child(1) span {
  color: #5a7ff6;
  position: relative;
  left: 1.658rem;
  width: 0.81rem;
  text-align: center;
  line-height: 0.18rem;
  height: 0.17rem;
  background: #b9c6f1;
  border-radius: 0.1rem;
  display: inline-block;
}
.message ul li p:nth-child(2) {
  font-size: 0.14rem;
  text-align: left;
  /* margin-left: 0.1rem; */
}
.message ul li p:nth-child(3) {
  font-size: 0.11rem;
  color: #999;
  text-align: left;
  /* margin-left: 0.1rem; */
}
.message ul li p:nth-child(3) img {
  position: relative;
  top: -1px;
  left: 1.88rem;
}
.message ul li:nth-child(1) p:nth-child(4),
.noMessage ul li:nth-child(2) p:nth-child(4) {
  height: 0.3rem;
}
.message ul li:nth-child(1) p:nth-child(4) img {
  position: relative;
  top: 0.07rem;
  left: -1.26rem;
}
.noMessage ul li:nth-child(1) p:nth-child(4) img {
  left: -1.1rem !important;
}
.noMessage ul li:nth-child(2) p:nth-child(4) img {
  position: relative;
  top: 0.07rem;
  left: -1.08rem;
}
.noMessage ul li p:nth-child(4) span {
  left: -1rem !important;
}
.message ul li p:nth-child(4) span {
  font-size: 0.11rem;
  position: relative;
  color: #ec6060;
  top: 0.05rem;
  left: -1.19rem;
}
.message ul li p:nth-child(3) span {
  position: relative;
  top: -0.05rem;
  left: 1.19rem;
  color: #333;
  font-size: 0.14rem;
}
</style>