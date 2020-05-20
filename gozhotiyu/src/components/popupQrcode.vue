<template lang="html">
  <van-popup v-model="isShow" :close-on-click-overlay="true" :style="{ 'border-radius': '0.11rem', width: '75%',  overflow: 'initial', }" > 
    <div class="content_wrap">

      <p class="title">关注公众号</p>
      
      <div class="img_wrap">
        <img :src="qrcode" />
      </div>

      <p class="follow">长按二维码关注公众号</br>关注后可获更多信息</p>

      <img class="close" src="@/assets/img/follow_icon_close.png" @click="isShow=false;" />

    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
  },
  data(){
    return {
      isShow: false,
      qrcode: '',
    }
  },
  created(){
  },
  mounted(){
    this.getImg();
  },
  methods: {
    
    getImg(){
      setTimeout(() => {
        this.$api.getQrCode().then(res=>{
          console.log(res.data.qrcode+"公众号");
          this.qrcode = this.$imgurl + res.data.qrcode;
          this.isShow = true;
        })
      }, 2000);
    }

  }

}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
.content_wrap{
  padding: 0.2rem 0.25rem 0.16rem;
  position: relative;
  background: url('~@/assets/img/follow_pop_01.png') no-repeat;
  background-size: 100% 100%;

  .title{
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    line-height: 0.24rem;
    font-weight: bold;
    color:rgba(255,255,255,1);
  }

  .img_wrap{
    margin: 0.22rem auto 0;
    width: 2.14rem;
    height: 2.14rem;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .follow{
    width: 100%;
    text-align: center;
    margin-top: 0.14rem;
    font-size: 0.13rem;
    line-height: 2;
    font-weight: bold;
    color: rgba(255,255,255,1);
  }

  .close{
    position: absolute;
    bottom: -0.47rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0.27rem;
    height: 0.27rem;
  }

}
</style>