<template>
  <section>
    <div>
      <span>问题反馈：</span>
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入问题反馈" v-model="content"> 
        
      </textarea>
      <button v-if="content==''">提交</button>
      <button class="submit" v-else @click="submit()">提交</button>
    </div>
  </section>  
</template>

<script>
  import pagination from '@/common/pagination';

  export default{
    data(){
      return{
        content:'',
      }
    },
    mounted:function(){
      const that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';


    },

    components:{
      // 'v-pagination': pagination,
    },
    computed: {
    },
    methods: {
      submit(){
        const that = this;
        let content = that.content;
        that.$http.get(that.$api+"/problem/save",{
          params:{
            sessionId: that.sessionId,
            content:content,

          }
        }).then((res)=>{
          console.log('%c 提交状态','color:green',res);
          const that = this;
          if(res.data.code == 1){
            that.content = '';
            that.$store.dispatch('sendTips', {
              isTip:true,content:'提交成功'
            });
          }

        }).catch(function (error) {
        });
      }
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
      &>span {
        @include ibMid();
        vertical-align:top;
      }
      textarea {
        @include ibMid();
        padding:9px 14px;
        box-sizing:border-box;
        outline:none;
        width:100%;
        max-width:93%;
      }
      button {
        border:none;
        outline:none;
        float:right;
        width:72px;
        height:30px;
        background:#E6E6E6;
        border-radius:2px;
        color:white;
        margin-top:4px;
        cursor:pointer;
        &:hover {
          background:#69C9FF;
        }
      }
      .submit {
        background:#49BDFF;
      }
    }
  }

</style>