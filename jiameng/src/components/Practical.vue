<template>
  <div>
    <Top :text="practicalText" />
    <!-- 搜索 -->
    <div class="freshTop">
      <img src="../assets/img/freshMining/icon_sousuo.png" alt class="freshSou" />
      <input type="text" value="搜索消费" />
      <img src="../assets/img/freshMining/icon_saixuan.png" alt class="freshSai" />
      <span>筛选</span>
    </div>
    <!-- 登记-->
    <div class="dispose">
      <p @click="disposeClick(0)">
        <span :class="{disposeTwo:disposeImg}">未登记</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="disposeImg" />
      </p>
      <p @click="disposeClick(1)">
        <span :class="{disposeTwo:!disposeImg}">已登记</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="!disposeImg" />
      </p>
    </div>
    <div class="practicalClass" v-if="disposeImg">
      <ul>
        <li v-for="(item,index) in practicalList" :key="index">
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>
    <div class="practicalClass" v-if="!disposeImg">
      <ul>
        <li v-for="(item,index) in practicalList" :key="index">
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Top from "./common/Top";
export default {
  name: "Practical",
  data() {
    return {
      practicalText: "实际消费",
      disposeImg: true,
      practicalList: [
        {
          text: "消费日期2020-03-06"
        },
        {
          text: "消费日期2020-03-06"
        },
        {
          text: "消费日期2020-03-06"
        },
        {
          text: "消费日期2020-03-06"
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
  /* color: #999; */
  position: absolute;
  top: 0.63rem;
  right: 0.13rem;
}
.freshSou {
  position: absolute;
  top: 0.71rem;
  left: 0.24rem;
}
.dispose::after {
  clear: both;
  display: block;
  content: "";
}
.dispose {
  font-size: 0px;
  /* height: 0.5rem; */
  /* overflow: hidden; */
  background: white;
  border-bottom: 1px solid #3333;
}
.dispose p {
  float: left;
  height: 0.5rem;
  width: 50%;
  position: relative;
  top: 0.07rem;
  margin-top: 0.1rem;
}
.disposeTwo,disposeOne {
  color: #999 !important;
}
.dispose p span {
  /* color: #333; */
  font-weight: bold;
  /* line-height: 0.6rem; */
  font-size: 0.16rem;
  margin-bottom: 0.04rem;
  display: block;
}
.practicalClass {
  font-size: 0px;
}
.practicalClass ul li {
  height: 0.55rem;
  line-height: 0.55rem;
  background: #fff;
  border-bottom: 1px solid rgb(241, 236, 236);
  margin-left: -2.09rem;
}
.practicalClass ul li span {
  font-size: 0.14rem;
  color: #333;
  /* border-top: 1px solid #999; */
}
</style>