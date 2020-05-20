<template>
  <div class="index">
    <!-- top -->
    <div class="indexTop">
      <span class="indexX">X</span>
      <span class="indexText">{{text}}</span>
      <span class="indexDian">...</span>
    </div>
    <!-- 遮罩 -->
    <!-- <div class="indexDiv"></div> -->
    <!-- img -->
    <div class="indexImg">
      <img src="../assets/img/index/pic_banner.png" alt />
    </div>
    <!-- my -->
    <div class="indexMy">
      <ul>
        <li v-for="(item,index) in myList" :key="index" @click="clickPath(index)">
          <img :src="item.img" alt />
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <!-- 订单 -->
    <div class="indexOrder">
      <ul>
        <li v-for="(item,index) in orderList" :key="index" @click="orderBlock(item.path)">
          <img :src="item.img" alt />
          <p>{{item.text}}</p>
          <div></div>
        </li>
      </ul>
    </div>
    <!-- footer -->
    <Footer />
  </div>
</template>
<script>
//引入top
import Top from "./common/Top";
export default {
  name: "Index",
  data() {
    return {
      text: "团餐智能门店系统",
      myList: [
        {
          text: "我的工作日程",
          img: require("../assets/img/index/icon_richen.png"),
          path: ""
        },
        {
          text: "我的审核",
          img: require("../assets/img/index/icon_shenhe.png"),
          path: "/Audit"
        }
      ],
      orderList: [
        {
          text: "鲜采订单",
          img: require("../assets/img/index/icon_xcdd.png"),
          path: "/FreshMining"
        },
        {
          text: "非鲜采订单",
          img: require("../assets/img/index/icon_fxcdd.png")
          // path:"/Consignee"
        },
        {
          text: "每日营收",
          img: require("../assets/img/index/icon_mrys.png")
          // path:"/Consignee"
        },
        {
          text: "费用登记",
          img: require("../assets/img/index/icon_fydj.png")
          // path:"/Consignee"
        },
        {
          text: "收货",
          img: require("../assets/img/index/icon_sh.png"),
          path: "/FreshAffirm"
        },
        {
          text: "实际消费",
          img: require("../assets/img/index/icon_sjxf.png"),
          path: "/Practical"
        },
        {
          text: "制作列表",
          img: require("../assets/img/index/icon_zzlb.png"),
          path: "/MakeList"
        },
        {
          text: "菜单查看",
          img: require("../assets/img/index/icon_cdck.png")
          // path:"/Consignee"
        },
        {
          text: "采购价格",
          img: require("../assets/img/index/icon_cgjg.png")
          // path:"/Consignee"
        },
        {
          text: "菜品信息",
          img: require("../assets/img/index/icon_cpxx.png")
          // path:"/Consignee"
        },
        {
          text: "时令食材",
          img: require("../assets/img/index/icon_slsc.png"),
          path: "/Select"
        },
        {
          text: "物流中心",
          img: require("../assets/img/index/icon_wlzx.png")
          // path:"/Consignee"
        }
      ]
    };
  },
  methods: {
    orderBlock(url) {
      this.$router.push({ path: url });
    },
    clickPath(num) {
      if (num == 1) {
        this.$router.push({ path: "/Audit" });
      }
    }
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  /* background: #b4b0b0; */
}
.indexX {
  position: relative;
  right: 0.5rem;
}
.indexDian {
  position: relative;
  font-size: 0.2rem;
  left: 0.5rem;
}
.indexTop {
  width: 100%;
  line-height: 0px;
  height: 0.6rem;
  background: white;
}
.indexTop span:last-child {
  font-size: 0.3rem;
}
.indexTop span {
  font-size: 0.16rem;
  color: #333333;
  line-height: 0.5rem;
  font-weight: 400;
  font-family: "PingFang-SC-Bold";
}
.indexImg {
  width: 100%;
  height: 100%;
  font-size: 0px;
}
.indexImg img {
  width: 100%;
  height: 100%;
}
.indexDiv {
  width: 100%;
  height: 4.39rem;
  background: rgb(240, 236, 236);
  position: absolute;
  top: 2.5rem;
}
.indexMy {
  left: 0.19rem;
  width: 100%;
  /* margin-top: -25px; */
  border: none;
  /* margin: 30px auto; */
  /* position: absolute; */
  top: 2.1rem;
  border-radius: 0.44rem;
  height: 0.9rem;
}
.indexMy ul::after {
  clear: both;
  content: "";
  display: block;
}
.indexMy ul li {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  top: -49%;
}
.indexMy ul li p {
  font-size: 0.14rem;
  color: #666666;
  position: relative;
  bottom: 0.18rem;
}
.indexMy ul {
  height: 0.9rem;
  width: 90%;
  border-radius: 0.1rem 0.1rem 0px 0px;
  margin: 0 auto;
  background: white;
  position: relative;
  top: -0.42rem;
}
.indexOrder {
  width: 90%;
  margin: 0 auto;
  margin: -0.31rem auto;
  top: -0.17rem;
  z-index: 5;
  /* background: white; */
  height: 4.8rem;
}
.indexOrder ul li div {
  border-bottom: 1px solid #eeeeee;
  width: 84%;
  position: absolute;
  top: 0rem;
  left: 0.08rem;
}
.indexOrder ul li::before {
  position: absolute;
  width: 1px;
  top: 0.08rem;
  left: 1.1rem;
  height: 0.75rem;
  background: #eeeeee;
  display: block;
  content: "";
}
.indexOrder ul li:nth-child(3)::before,
.indexOrder ul li:nth-child(6)::before,
.indexOrder ul li:nth-child(9)::before,
.indexOrder ul li:nth-child(12)::before {
  display: none;
}

.indexOrder ul::after {
  clear: both;
  content: "";
  display: block;
}
.indexOrder ul {
  font-size: 0px;
  height: 4rem;
  background: white;
  width: 100%;
  /* margin-top: 0.45rem; */
}
.indexOrder ul li {
  position: relative;
  width: 33%;
  height: 0.4rem;
  float: left;
  width: 33%;
  height: 0.9rem;
  float: left;
  text-align: center;
}
.indexOrder ul li p {
  font-size: 0.11rem;
  text-align: center;
  line-height: 0.45rem;
}
.indexOrder ul li img {
  text-align: center;
  margin-top: 0.2rem;
}
@media only screen and (min-device-height: 812px) and (max-device-width: 400px) {
  .indexMy {
    top: 2.1rem !important;
  }
  .indexDiv {
    height: 5.1rem !important;
  }
  .indexOrder ul li::before {
    top: 0.22rem;
    left: 1.1rem;
    height: 0.83rem;
  }
  .indexOrder ul li div {
    top: 0.09rem !important;
  }
  .indexOrder ul li:nth-child(1) div,
  .indexOrder ul li:nth-child(2) div,
  .indexOrder ul li:nth-child(3) div {
    display: none;
  }
}
</style>