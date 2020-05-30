<template>
  <section>
    <div>
      <p>关于我们</p>
      <div v-html="aboutUS">
        
      </div>
    </div>
  </section>  
</template>

<script>
  import pagination from '@/common/pagination';

  export default{
    data(){
      return{
        aboutUS:'',
      }
    },
    mounted:function(){
      let that = this;
      // this.postsShow = this.latestRanking;
      //请求web的接口
      that.$http.get(that.$api+"/web/get").then((res)=>{
        console.log('%c 关于我们','color:green',res)
        that.aboutUS = res.data.data.about_us;
      })

    },

    components:{
      // 'v-pagination': pagination,
    },
    computed: {
    },
    methods: {

    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";
  
  section {
    margin:62px 0 0 0;
    min-height:84%;
    margin-bottom: 95px;
    /* padding:14px 0 0 0; */
    &>div {
      width:1200px;
      min-height:600px;
      margin:0 auto 16px auto;
      background:white;
      padding:32px 69px;
      box-sizing:border-box;
      &>p {
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align:center;
        margin-bottom:32px;
      }
      div {
        padding:0 200px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
      }

    }
  }

</style>