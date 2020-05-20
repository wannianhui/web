<template lang="html">
<div class="container" >

  <div class="content_wrap">
    <div class="content" v-html="content"></div>
  </div>

</div>
</template>

<script>
export default {
  data(){
    return {
      content: '',
    }
  },
  created(){
    setTimeout(() => {
      this.weixinConfig();
    }, );
    this.getContent();
  },
  mounted(){
    
  },
  methods: {
    getContent(){
      this.$api.getOtherInfo({}).then(res=>{
        console.log(res);
        // this.content = res.data.cooperator;
        this.content = res.data.cooperator.replace(/\<img/gi,   '<img style="width:100%" ' );        
      })
    },
  }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
.container{
  background:linear-gradient(262deg,rgba(103,157,255,1) 0%,rgba(130,200,255,1) 100%);
  padding: 0.15rem 0.13rem;
  .content_wrap{
    width: 100%;
    background: rgba(255,255,255,1);
    border-radius: 0.1rem;
    padding: 0.28rem 0.22rem;
    box-sizing: border-box;
    .content{
      font-size: 0.14rem;
      font-weight: 0.18rem;
      color: rgba(68,68,68,1);
      width: 100%;
      white-space: pre-wrap!important;
      word-break: break-all!important;
    }
    .content p, .content span, .content p span{
      width: 100%;
      white-space: pre-wrap!important;
      word-break: break-all!important;
    }
  }
}
</style>