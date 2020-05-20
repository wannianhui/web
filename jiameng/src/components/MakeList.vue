<template>
  <div style="margin-bottom:0.17rem;">
    <Top :text="makeListText" />
    <!-- 广州科学城店 -->
    <div class="makeTop">
      <h3>
        <span>广州科学城店</span>
      </h3>
      <ul>
        <li v-for="(item,index) in makeTopList" :key="index">
          <span>{{item.h3}}</span>
          <span>{{item.p}}</span>
        </li>
      </ul>
    </div>
    <!-- 菜品及原料 -->
    <div class="material">
      <p class="materialP">
        <img src="../assets/img/make/icon_cai.png" alt />
        <span>菜品及原料</span>
      </p>
      <!-- 日历组件 -->
      <div class="calendar">
        <span>2020/3/19</span>
        <img src="../assets/img/freshAffirm/icon_moer_nor.png" alt class="calendarImg" />
      </div>
      <!-- 档口 -->
      <div class="materialStall">
        <span>大众餐档口</span>
        <span>行政餐档口</span>
        <span>面点档口</span>
      </div>
      <div class="materialDay">
        <span>早餐</span>
        <span>中餐</span>
        <span>晚餐</span>
        <span>夜宵</span>
      </div>
      <div class="makeBottom">
        <p>
          <span>菜品</span>
          <img src="../assets/img/make/icon_xuanze.png" alt />
        </p>
        <p>
          <span>食材</span>
          <!-- <img src="../assets/img/make/icon_xuanze.png" alt=""> -->
        </p>
      </div>
      <!-- 菜品的列表 -->
      <div class="makeList">
        <ul>
          <li v-for="(item,index) in makeList" :key="index">
            <p>{{item.h3}}</p>
            <span>{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "./common/Top";
// import mobiscroll from "../../node_modules/mobiscroll/js/mobiscroll.android-holo-light.js"
export default {
  name: "MakeList",
  data() {
    return {
      makeListText: "制作列表",
      makeTopList: [
        {
          h3: "档口：",
          p: "大众餐"
        },
        {
          h3: "餐次：",
          p: "中餐"
        },
        {
          h3: "时间：",
          p: "2020-03-19"
        }
      ],
      makeList: [
        {
          h3: "香菇滑鸡",
          num: "200"
        },
        {
          h3: "猪肉金针菇",
          num: "200"
        },
        {
          h3: "番茄炒蛋",
          num: "200"
        },
        {
          h3: "白菜炒粉丝",
          num: "200"
        },
        {
          h3: "白菜炒粉丝",
          num: "200"
        }
      ]
    };
  },
  components: {
    Top
  },
  created() {
    // console.log(mobiscroll)
  }
};
</script>

<style scoped>
.makeTop {
  height: 1.4rem;
  width: 95%;
  border-radius: 0.1rem;
  font-size: 0px;
  text-align: left;
  margin: 0.03rem auto;
}
.makeTop h3 {
  height: 0.5rem;
  line-height: 0.5rem;
  background: #ffffff;
  margin-top: 0.04rem auto;
  width: 100%;
  margin: 0 auto;
  font-size: 0.14rem;
  color: #333;
}
.makeTop ul {
  width: 100%;
  height: 0.9rem;
  background: #ffffff;
  margin: 0.03rem auto;
}
.makeTop ul li {
  font-size: 0.14rem;
  line-height: 0.28rem;
}
.makeTop ul li:nth-child(1) {
  padding-top: 0.04rem;
}
.makeTop ul li span:nth-child(1) {
  color: #999999;
}
.makeTop ul li span:nth-child(2) {
  color: black;
}
.makeTop h3 span,
.makeTop ul li span:nth-child(1) {
  padding-left: 0.11rem;
}
.material {
  font-size: 0px;
  margin: 0 auto;
  width: 95%;
  margin-top: 0.2rem;
  background: #ffffff;
}
.materialP {
  text-align: left;
  height: 0.5rem;
}
.materialP img {
  margin-left: 0.12rem;
}
.materialP span {
  color: #38bd73;
  font-size: 0.14rem;
  line-height: 0.5rem;
  margin-left: 0.12rem;
}
.materialStall {
  font-size: 0px;
  border-top: 1px solid #999;
  line-height: 0.5rem;
  width: 100%;
  height: 0.5rem;
}
.materialStall span {
  font-size: 0.14rem;
  color: #999;
  display: inline-block;
  width: 32%;
}
.materialStall span:nth-child(1) {
  color: #9a3cf3;
  background: #f5ebfe;
  margin-left: 0.1rem;
}
.materialDay {
  font-size: 0px;
  height: 0.5rem;
  width: 100%;
  line-height: 0.5rem;
  border-top: 1px solid #999;
}
.materialDay span {
  margin-right: 0.2rem;
  font-size: 0.14rem;
  color: #999;
  display: inline-block;
  width: 18%;
}
.materialDay span:nth-child(1) {
  background: #effdf6;
  margin-left: 0.1rem;
  color: #60eca5;
}
.makeBottom {
  height: 0.4rem;
  line-height: 0.4rem;
  border-top: 1px solid #999;
}
.makeBottom p {
  display: inline-block;
  width: 50%;
}
.makeBottom p span:nth-child(1) {
  font-size: 0.14rem;
  color: #333;
}
.makeBottom p:nth-child(2) span {
  font-size: 0.14rem;
  color: #999;
}
.makeBottom p:nth-child(1) img {
  position: relative;
  top: 0.1rem;
  left: -0.29rem;
}
.makeList ul li span {
  color: #5a7ff6;
  font-size: 0.2rem;
  font-weight: bold;
  position: absolute;
  left: 2.56rem;
}
.makeList ul li p {
  display: inline-block;
  margin-left: -2rem;
}
.makeList ul li {
  border-top: 1px solid #999;
  font-size: 0.16rem;
  height: 0.68rem;
  line-height: 0.68rem;
}
.calendar {
  font-size: 0px;
  height: 0.4rem;
  line-height: 0.4rem;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgb(192, 188, 188);
  border-top: 1px solid rgb(197, 193, 193);
}
.calendar span {
  font-size: 0.14rem;
  color: #333;
  font-weight: bold;
  background: white;
}
.calendarImg {
  transform: rotate(90deg);
  position: relative;
  left: 0.17rem;
}
</style>
