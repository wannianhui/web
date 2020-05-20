<template>
  <div>
    <!-- 食材选择 -->
    <Top :text="selectText" />
    <!-- 搜索 -->
    <div class="freshTop">
      <img src="../assets/img/freshMining/icon_sousuo.png" alt class="freshSou" />
      <input type="text" value="搜索" />
      <img src="../assets/img/freshMining/icon_saixuan.png" alt class="freshSai" />
      <span>筛选</span>
    </div>
    <div class="dispose">
      <p @click="disposeClick(0)">
        <span :class="{disposeTwo:disposeImg}">一级分类</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="disposeImg" />
      </p>
      <p @click="disposeClick(1)">
        <span :class="{disposeTwo:!disposeImg}">一级分类</span>
        <img src="../assets/img/freshMining/icon_xuanze.png" alt v-if="!disposeImg" />
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Top from "./common/Top";
export default {
  name: "Select",
  data() {
    return {
      selectText: "食材选择",
      disposeImg: true
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
  height: 0.4rem;
  overflow: hidden;
  background: white;
  border-bottom: 1px solid #3333;
}
.dispose p {
  float: left;
  height: 0.4rem;
  width: 50%;
  margin-top: 0.1rem;
}
.disposeTwo,disposeOne {
  color: #999 !important;
}
.dispose p span {
  color: #333;
  font-weight: bold;
  /* line-height: 0.6rem; */
  font-size: 0.16rem;
  margin-bottom: 0.04rem;
  display: block;
}
</style>