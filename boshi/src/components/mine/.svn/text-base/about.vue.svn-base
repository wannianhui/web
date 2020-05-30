<template>
    <div class="about">
      <div class="main">
        <h6>五区机器人网站</h6>
        <p>{{agreement}}</p>
        <div class="button" @click="tui">返回</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "about",
      data(){
        return {
          agreement: '',
        }
      },
      methods:{
        //后退
        tui(){
          this.$router.go(-1);
        },
      },
      mounted:function(){
        let that = this;
        // this.postsShow = this.latestRanking;
        //请求web的接口
        that.$http.get(that.$api+"/web/get").then((res)=>{
          console.log('%c 关于我们','color:green',res)
          this.agreement = res.data.data.agreement;
          //that.aboutUS = res.data.data.about_us;
        })

      },
    }
</script>

<style scoped lang="scss">
.about{
  padding: 62px 0 130px;
  min-height: 100%;
  box-sizing: border-box;
  margin-bottom: 95px;
  .main{
    width: 1200px;
    background-color: #fff;
    margin: 40px auto;
    padding: 40px;
    text-align: center;
    color: #333;
    h6{
      font-size: 18px;
    }
    p{
      font-size: 14px;
      color: #666;
      padding-top: 20px;
    }
    .button{
      background-color: #4abdff;
      color: #fff;
      width: 140px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      margin: 50px auto 0;
      cursor: pointer;
    }
  }
}
</style>
