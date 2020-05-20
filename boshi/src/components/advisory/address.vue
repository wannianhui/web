<template>
  <section>
<!--     <div>
      <p>联系地址：</p> -->
      <div v-html="contact_us">
<!--         <ul>
          <li>公司：{{contact.company}}</li>
          <li>地址：{{contact.contact_address}}</li>
          <li>电话：{{contact.phone}}</li>
          <li>qq：{{contact.phone}}</li>
          <li>微信：{{contact.phone}}</li>
          <li>邮箱：{{contact.phone}}</li>
        </ul>
        <img :src="apiImg+contact.geographical_image" alt=""> -->
      </div>
    <!-- </div> -->
  </section>  
</template>

<script>
  import pagination from '@/common/pagination';

  export default{
    data(){
      return{
        contact:'',
        apiImg:this.$api,
        contact_us:''
      }
    },
     mounted:function(){
      let that = this;
      // this.postsShow = this.latestRanking;
      //请求web的接口
      that.$http.get(that.$api+"/web/get").then((res)=>{
        console.log('%c 联系我们','color:green',res)
        that.contact_us = res.data.data.contact_us;
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
    padding:14px 0 0 0;
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
        margin-bottom:15px;
      }
      div {
        padding:21px 23px;
        background:#EBFFF6;
        ul{
          @include ibMid();
          vertical-align:top;
          li {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-bottom:10px;
          }
        }
        img {
          @include ibMid();
          float:right;
        }
        @include clearFloat();
      }

    }
  }

</style>