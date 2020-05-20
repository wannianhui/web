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
            <span v-if="openFresh">我是新加的</span>
            <!-- <div v-if="openFresh">我是新加的</div> -->
          </p>
          <!-- <div v-for="(item,index) in item.freshMiningClick" :key="index">
            <li>
              <p>{{item.p}}</p>
              <span>{{item.span}}</span>
            </li>
          </div>-->
        </li>
        <!-- <div>
          <li>
            <p>物料类型</p>
            <span>肉类</span>
          </li>
          <li>
            <p>是否包含下级</p>
            <span>是</span>
          </li>
          <li>
            <p>物料类型</p>
            <span>蔬菜</span>
          </li>
          <li>
            <p>是否包含下级</p>
            <span>是</span>
          </li>
          <li>
            <p>物料类型</p>
            <span>水果</span>
          </li>
          <li>
            <p>是否包含下级</p>
            <span>是</span>
          </li>
        </div>
        <div>
          <li>
            <span>食材</span>
            <span>红薯</span>
          </li>
          <li>
            <span>食材</span>
            <span>油豆腐</span>
          </li>
        </div>
        <div>
          <li>
            <span>食材</span>
            <span>凉薯</span>
          </li>
          <li>
            <span>食材</span>
            <span>南瓜</span>
          </li>
        </div>-->
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
      shopTop: "门店",
      openFresh:false,
      num:-1,
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
      this.num = num;
      for (var i = 0; i < this.$refs.freshMiningLi.length; i++) {
        if (num == i && this.num == num) {
          this.$refs.freshMiningLi[i].style.height = "1.5rem";
          this.openFresh = true;
        }else{
          this.$refs.freshMiningLi[i].style.height = "0.5rem";
          this.openFresh =false;
        }
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
  height: 0.5rem;
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
</style>