<template>
  <div class="loginTop">
    <span class="loginX" @click="go"><</span>
    <span class="loginText">{{text}}</span>
    <span class="loginDian">...</span>
  </div>
</template>
<script>
export default {
  name: "Top",
  props:["text"],
  methods: {
    go(){
      this.$router.go(-1)
    }
  },
};
</script>
<style scoped>
.loginX {
  position: relative;
  right: 1rem;
}
.loginDian {
  position: relative;
  font-size: 0.2rem;
  right: -1rem;
}
.loginTop {
  width: 100%;
  background: white;
  /* line-height: 0.5rem; */
  height: 0.5rem;
  font-size: 0px;
  /* margin-bottom: 0.3rem; */
}
.loginTop span:last-child{
  font-size: 0.3rem;
}
.loginTop span {
  text-align:center;
  font-size: 0.16rem;
  color: #333333;
  /* width: 11%; */
  display: inline-block;
  font-weight: bold;
  font-family: "PingFang-SC-Bold";
}
</style>