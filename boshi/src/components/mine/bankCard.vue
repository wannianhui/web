<template>
  <div class="module">
    <h3>
      <ul>
        <li>我的银行卡</li>
      </ul>
    </h3>
    <div class="container">
      <address-module></address-module>
    </div>
  </div>  
</template>

<script>
  import pagination from '@/common/pagination';
  import addressModule from './addressModule';
  export default{
    data(){
      return{

      }
    },
    mounted:function(){

    },

    components:{
      addressModule
    },
    computed: {


    },
    methods: {

    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";
  .container {
    padding:40px;
    box-sizing:border-box;
    min-height:450px;
    background:white;
  }  

  .module {
    box-sizing:border-box;
    &>h3 {
      height:68px;
      line-height:68px;
      padding:0 40px;
      background:white;
      border-bottom:1px solid #F2F2F2;
      ul {
        font-size:0;
        .active {
          color:#333333;
          border-bottom:2px solid #333333;
        }
        li {
          @include ibMid();
          height:68px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          box-sizing:border-box;
          cursor:pointer;
          color:#8D8D8D;
          margin-right:40px;
          &:last-child {
            margin-right:0;
          }
          border-bottom:2px solid white;
          // &:hover {
          //   color:#333333;
          //   border-bottom:2px solid #333333;
          // }
        }
      }
    }

  }

</style>