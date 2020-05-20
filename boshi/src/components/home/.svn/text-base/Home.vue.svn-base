<template>
  <div class="homePage">
    <Header></Header>
    <router-view v-if="isShow"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../common/header";
import Footer from "../../common/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isShow: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(function() {
        this.isShow = true;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.homePage {
  position: absolute;
  min-width: 1200px;
  width: 100%;
  height: 100%;
}
</style>
