<template>
  <div class="stall">
    <!-- 遮罩 -->
    <!-- <div class="indexDiv"></div> -->
    <!-- 档口组件 -->
    <ul>
      <li v-for="(item,index) in stallObj" :key="index">
        <h3>
          {{item.h3}}
          <span>{{item.p}}</span>
        </h3>
        <p>
          {{item.MealTimes}}
          <span>{{item.MealTimesText}}</span>
        </p>
        <p>
          {{item.control}}
          <span>{{item.controlText}}</span>
        </p>
        <p>
          {{item.stall}}
          <span>{{item.stallText}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Stall",
  props: ["stallObj"]
};
</script>
<style scoped>
.stall {
  width: 100%;
  padding-bottom:0.15rem;
}
.stall ul {
  width: 100%;
  position: relative;
  top: -0.38rem;
}
.stall ul li {
  width: 84%;
  text-align: left;
  margin: 0 auto;
  height: 1.21rem;
  margin-bottom: 0.1rem;
  line-height: 0.28rem;
  font-size: 0.14rem;
  border-radius: 0.1rem;
  padding: 0.1rem;
  background: white;
}
.stall ul li h3,
.stall ul li p span {
  color: #333;
  font-weight: bold;
}
.stall ul li h3 {
  margin-bottom: 0.1rem;
  border-bottom: 1px solid rgb(201, 199, 199);
  padding-bottom: 0.08rem;
}
.stall ul li h3 span,
.stall ul li p {
  color: #999;
}
.indexDiv {
  width: 100%;
  height: 4.39rem;
  background: rgb(240, 236, 236);
  position: absolute;
  top: 2.5rem;
}
</style>