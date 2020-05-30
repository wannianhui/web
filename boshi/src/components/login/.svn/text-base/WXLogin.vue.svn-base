<style lang="scss">
 #wxqr iframe{
   margin: 50px auto;
   width: 100%;
 }
</style>

<template>
  <div class="banner_info">
      <div id="wxqr" style="margin: 0 auto;"></div>
  </div>
</template>

<script>
  // import img from '../assets/img/login_banner.jpg'

  const scriptElement = document.createElement('script');
export default {
  name: 'WXLogin',
  // inject:['reload'],
  data () {
    return {
    }
  },
  computed:{

  },
  beforeCreate: function () {
    console.group('beforeCreate 创建前状态===============》');
  },
  created(){
  },
  mounted () {
    let obj = new WxLogin({
      self_redirect: false,
      id:"wxqr",
      appid: "wx50c84bbe29aee0bf",
      // appid:"wxf20833034495e129",
      scope: "snsapi_login",
      redirect_uri: "http://www.drluck.club",
      state: "wx",
      style: "",
    });
  },
  methods: {

  },
  //离开当前页面后执行
  destroyed: function () {
    document.body.removeChild(scriptElement);
  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  button{
    border:none;
    margin: 0;
    padding: 0;
    background: none;
    cursor: pointer;
  }

  .imgone{
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
  }
  button:focus{outline:0;}




</style>
<style>
  .foot_one{
    padding-top: 40px !important;
  }
  /*.el-message--error{*/
    /*top: 160px !important;*/
  /*}*/
  .el-message--success{
    top: 200px !important;
  }
</style>
