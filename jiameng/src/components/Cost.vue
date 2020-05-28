<template>
  <div>
    <Top :text="costText" />
    <!-- 搜索 -->
    <div class="costButton">
      <div class="costButtonLeft">
        <!-- <img src="../assets/img/freshMining/icon_sousuo.png" alt=""> -->
        <input type="text" value="搜索费用登记" />
      </div>
      <div class="costButtonRight">
        <!-- <img src="../assets/img/freshMining/icon_saixuan.png" alt=""> -->
        <span>筛选</span>
      </div>
    </div>
    <!-- ID -->
    <div class="costID">
      <ul>
        <li v-for="(item,index) in costList" :key="index">
          <div class="costIDTop">
            <p>
              单号ID
              <span>{{item.ID}}</span>
            </p>
            <p :class="[item.over == '编辑中'?'bianji':'wangcheng']">{{item.over}}</p>
          </div>
          <div class="costBottom">
            <div>
              <p>{{item.leixing}}</p>
              <span>{{item.day}}</span>
              <span>{{item.year}}</span>
              <span>{{item.time}}</span>
            </div>
            <p class="money">{{item.money}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Top from "./common/Top";
export default {
  name: "Cost",
  data() {
    return {
      costText: "费用登记",
      costList: [
        {
          ID: "MD001",
          over: "编辑中",
          leixing: "房租及水电",
          day: "收货日期",
          year: "2020-3-19",
          time: "15:14",
          money: "￥1352.00"
        },
        {
          ID: "MD002",
          over: "已完成",
          leixing: "办公品采购",
          day: "收货日期",
          year: "2020-3-19",
          time: "15:14",
          money: "￥352.00"
        },{
          ID: "MD003",
          over: "已完成",
          leixing: "粮油",
          day: "收货日期",
          year: "2020-3-19",
          time: "15:14",
          money: "￥9352.00"
        }
      ]
    };
  },
  components: {
    Top
  }
};
</script>
<style scope>
.costButton {
  width: 100%;
  background: white;
  font-size: 0px;
  margin-top: 0.07rem;
  height: 0.5rem;
  color: #999;
  display: flex;
  margin-bottom: 1px;
}
.costButtonLeft input {
  border: none;
  width: 3.06rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-indent: 0.1rem;
  margin: 0.1rem auto;
  background: #f4f4f4;
  text-indent: 0.3rem;
  background-image: url("../assets/img/freshMining/icon_sousuo.png");
  background-repeat: no-repeat;
  background-position-y: center;
  border-radius: 0.05rem;
}
.costButtonLeft {
  /* width: 80%; */
  margin-left: 0.15rem;
  font-size: 0.14rem;
}
.costButtonRight {
  background-image: url("../assets/img/freshMining/icon_saixuan.png");
  background-repeat: no-repeat;
  background-position-y: top;
  line-height: 0.5rem;
  margin: 0.1rem auto;
  font-size: 0.14rem;
}
.costID {
  width: 100%;
  font-size: 0px;
}
.costID ul {
  width: 100%;
  margin: 0px auto;
}
.costID ul li {
  margin: 0 auto;
  margin-bottom: 0.15rem;
  /* padding-left: 0.15rem; */
  background: white;
  height: 0.82rem;
  /* background-image: url("../assets/img/btn/pic_xian.png");
  background-repeat: no-repeat; */
}
.costIDTop,
.costBottom {
  font-size: 0.12rem;
  display: flex;
  color: #999;
}
.costIDTop {
  height: 0.3rem;
  line-height: 0.3rem;
  border-bottom: 1px dotted #747474;
  /* border-style:dotted; */
}
.costID p,.costBottom div{
  margin-left: 0.1rem;
}
.costIDTop p:nth-child(2) {
  position: relative;
  right: -1.9rem;
  top: 0.04rem;
}
.costBottom div p:nth-child(1) {
  font-size: 0.14rem;
  color: #333;
  text-align: left;
  margin: 0.06rem auto;

}
.costBottom div span {
  font-size: 0.11rem;
  margin-right: 0.07rem;
}
.costBottom .money {
  position: relative;
  right: -1.15rem;
  top: 0.18rem;
  font-size: 0.14rem;
  color: #333;
  font-weight: bold;
}
.bianji {
  color: #5a7ff6;
  width: 0.7rem;
  height: 0.15rem;
  border-radius: 0.1rem;
  background: #bdc2d4;
  line-height: 0.16rem;
}
.wangcheng {
  color: #ff60eca5;
  width: 0.7rem;
  height: 0.15rem;
  line-height: 0.16rem;
  border-radius: 0.1rem;
  background: rgb(245, 248, 246);
}
</style>