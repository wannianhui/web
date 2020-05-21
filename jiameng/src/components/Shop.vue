<template>
  <div>
    <!-- 公共部分 -->
    <Top :text="shopTop" />
    <!-- 图片-->
    <div class="shopImg">
      <img src="../assets/img/shop/pic_mdbj.png" alt />
      <!-- 左边文字 -->
      <div class="shopText">
        <ul>
          <li v-for="(item,index) in shopText" :key="index">{{item}}</li>
        </ul>
      </div>
      <!-- 右边利润率 -->
      <div class="shopProfit">
        <P>利润率</P>
        <p>55%</p>
      </div>
    </div>
    <!-- 档口组件 -->
    <Stall :stallObj="shopStall" />
    <!-- footer -->
    <!-- 鲜采 -->
    <div class="freshMining">
      <ul>
        <li
          v-for="(item,index) in freshMining"
          :key="index"
          @click="freshMiningClick(index)"
          ref="freshMiningLi"
        >
          <p>
            <img :src="item.img" alt />
            <span>{{item.text}}</span>
            <img :src="item.icon" alt />
          </p>
          <div v-show="clickOne&&index==0" class="clickOne">
            <ul>
              <li v-for="(item,index) in freshList" :key="index">
                <div>
                  <p>物料类型</p>
                  <h3>{{item.type}}</h3>
                </div>
                <div>
                  <p>是否包含下级</p>
                  <h3>{{item.subordinate}}</h3>
                </div>
              </li>
            </ul>
          </div>
          <div v-show="clickTwo&&index==1" class="clickTwo">
            <ul>
              <li v-for="(item,index) in twoList" :key="index">
                <span>食材</span>
                <p>{{item}}</p>
              </li>
            </ul>
          </div>
          <div v-show="clickThree&&index==2" class="clickTwo">
            <ul>
              <li v-for="(item,index) in threeList" :key="index">
                <span>食材</span>
                <p>{{item}}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>
<script>
import Top from "./common/Top";
import Stall from "./common/Stall";
export default {
  name: "Shop",
  data() {
    return {
      click: -1,
      clickOne: false,
      clickTwo: false,
      clickThree: false,
      twoList: ["红薯", "油豆腐"],
      threeList: ["凉薯", "南瓜"],
      shopTop: "门店",
      num: -1,
      freshList: [
        {
          type: "肉类",
          subordinate: "是"
        },
        {
          type: "蔬菜",
          subordinate: "是"
        },
        {
          type: "水果",
          subordinate: "是"
        }
      ],
      shopText: [
        "广州科学城店",
        "门店编码：GZ-001",
        "采购方式：集中采购",
        "配送中心：集采中心",
        "利率控制方式：按门店控制",
        "地址：广东省 广州市 黄埔区科学城110号"
      ],
      shopStall: [
        {
          h3: "大众餐",
          p: "(档口)",
          MealTimes: "提供餐次:",
          MealTimesText: "早餐、中餐、晚餐",
          control: "利率控制方式:",
          controlText: "按档口控制",
          stall: "利润率:",
          stallText: "55%"
        },
        {
          h3: "行政餐",
          p: "(档口)",
          MealTimes: "提供餐次:",
          MealTimesText: "早餐、晚餐",
          control: "利率控制方式:",
          controlText: "按档口控制",
          stall: "利润率:",
          stallText: "60%"
        },
        {
          h3: "面点档",
          p: "(档口)",
          MealTimes: "提供餐次:",
          MealTimesText: "早餐、中餐",
          control: "利率控制方式:",
          controlText: "按档口控制",
          stall: "利润率:",
          stallText: "不控制"
        }
      ], //传递给档口组件的数据
      freshMining: [
        {
          img: require("../assets/img/shop/icon_lanzi.png"),
          text: "鲜采物料类型",
          icon: require("../assets/img/shop/icon_moer_nor.png"),
          freshMiningClick: [
            {
              p: "物料类型",
              span: "肉类"
            },
            {
              p: "物料类型",
              span: "蔬菜"
            }
          ]
        },
        {
          img: require("../assets/img/shop/icon_qingcai.png"),
          text: "特定鲜采物料",
          icon: require("../assets/img/shop/icon_moer_nor.png")
        },
        {
          img: require("../assets/img/shop/icon_qingcai2.png"),
          text: "不用鲜采物料",
          icon: require("../assets/img/shop/icon_moer_nor.png")
        }
      ]
    };
  },
  components: {
    Top,
    Stall
  },
  methods: {
    freshMiningClick(num) {
      switch (num) {
        case 0:
          this.clickOne = !this.clickOne;
          break;
        case 1:
          this.clickTwo = !this.clickTwo;
          break;
        case 2:
          this.clickThree = !this.clickThree;
          break;
      }
    }
  }
};
</script>
<style scoped>
@import "../assets/css/init.css";
.shopImg {
  width: 100%;
  position: relative;
  font-size: 0px;
}
.shopImg img {
  width: 100%;
}
.shopText {
  width: 90%;
  margin: 0 auto;
  line-height: 0.25rem;
  text-align: left;
}
.shopText ul {
  width: 100%;
  position: absolute;
  top: 0.23rem;
}
.shopText ul li {
  font-size: 0.12rem;
  color: #ffffff;
  font-family: "PingFangSCRegular";
  font-weight: 200;
}
.shopText ul li:nth-child(1) {
  font-size: 0.16rem;
}
.shopProfit {
  position: absolute;
  top: 23%;
  left: 77%;
  color: #ffffff;
}
.shopProfit p:nth-child(1) {
  font-size: 0.16rem;
  margin-bottom: 0.1rem;
}
.shopProfit p:nth-child(2) {
  font-size: 0.21rem;
}
.freshMining {
  width: 100%;
  font-size: 0px;
  position: relative;
  bottom: 0.66rem;
}
.freshMining ul li {
  width: 90%;
  text-align: left;
  background: white;
  margin: 0 auto;
  border-radius: 0.1rem;
  line-height: 0.5rem;
  margin: 0.1rem auto;
}
.freshMining ul li:nth-child(1) p {
  color: #ff650d;
  margin-left: 0.15rem;
}
.freshMining ul li:nth-child(2) p {
  color: #38bd73;
  margin-left: 0.15rem;
}
.freshMining ul li:nth-child(3) p {
  color: #ff7594;
  margin-left: 0.15rem;
}
.freshMining ul li p {
  font-size: 0.16rem;
  /* margin-right: -0.15rem; */
}
.freshMining ul li p span {
  margin: 0.03rem;
}
.clickOne {
  font-size: 0px;
  width: 100%;
  margin: 0 auto;
}
.clickOne ul {
  width: 100%;
}
.clickOne ul li {
  width: 100%;
  display: flex;
  border-radius: 0px;
  border-top: 1px solid #333;
}
.clickOne ul li div {
  text-align: center;
  height: 0.6rem;
  width: 50%;
  flex: 1;
  float: left;
}
.clickOne ul li div h3 {
  color: #333 !important;
  font-size: 0.16rem;
  position: relative;
  top: -0.3rem;
  font-weight: 400;
}
.clickOne ul li div p {
  margin-left: 0px !important;
  color: #999 !important;
  font-size: 0.11rem;
}
.clickTwo {
  width: 100%;
  margin: 0 auto;
}
.clickTwo ul li {
  height: 0.4rem;
  border-top: 1px solid #999;
  line-height: 0.4rem;
  border-radius: 0px;
  width: 100%;
}
.clickTwo ul li span {
  font-size: 0.13rem;
  margin-left: 0.17rem;
  color: #999;
}
.clickTwo ul li p {
  display: inline-block;
  font-size: 0.16rem;
  color: #333 !important;
  font-weight: 400;
}
</style>