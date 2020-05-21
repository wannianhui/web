<template>
  <div class="footer">
    <ul class="footerIndex">
      <li v-for="(item,index) in footerList" :key="index">
        <router-link :to="item.path">
          <img :src="index == imgNum?item.img:item.imgClick" alt />
          <p>{{item.text}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      imgNum: 0,
      footerList: [
        {
          text: "主页",
          img: require("../../assets/img/index/tab_sy_pre.png"),
          imgClick: require("../../assets/img/index/tab_sy_nor.png"),
          path: "/Index"
        },
        {
          text: "报表",
          img: require("../../assets/img/index/tab_bb_pre.png"),
          imgClick: require("../../assets/img/index/tab_bb_nor.png"),
          path: "/Statement"
        },
        {
          text: "门店",
          img: require("../../assets/img/index/tab_md_pre.png"),
          imgClick: require("../../assets/img/index/tab_md_nor.png"),
          path: "/Shop"
        },
        {
          text: "我的",
          img: require("../../assets/img/index/tab_my_pre.png"),
          imgClick: require("../../assets/img/index/tab_my_nor.png"),
          path: "/My"
        }
      ]
    };
  },
  mounted() {
    switch (this.$router.history.current.fullPath) {
      case "/Index":
        this.imgNum = 0;
        break;
      case "/Statement":
        this.imgNum = 1;
        break;
      case "/Shop":
        this.imgNum = 2;
        break;
      case "/My":
        this.imgNum = 3;
        break;
    }
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  z-index: 1200;
  bottom: 0px;
  font-size: 0.11rem;
  background: white;
}
.footer ul::after {
  content: "";
  clear: both;
  display: block;
}
.footerNoIndex {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 999;
}
.footerIndex {
  position: absolute;
  width: 100%;
  bottom: 0.09rem;
}
.footer ul li {
  float: left;
  background: white;
  width: 25%;
}
</style>