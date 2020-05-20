<template lang="html">
  <footer >
    <div class="fixed_bottom view_column">
      <img class="add" src="@/assets/img/float_01.png" @click.stop="showAddplayer()" />
      <img class="qrcode" src="@/assets/img/float_02.png" @click.stop="$refs.popupQrcode.isShow=true;" />
    </div>
    <div class="provider" @click.stop="$refs.popupXiaopao.isShow=true;">该服务由小跑科技提供技术支持</div>

    <popup-qrcode ref="popupQrcode" />
    <popup-xiaopao ref="popupXiaopao" />
    
    <popup-add-player ref="popupAddPlayer" />
    
    <popup-authorize ref="popupAuthorize2" >
      想上传选手资料，请进行微信授权，谢谢您的配合
    </popup-authorize>

  </footer>
</template>
<script>
import popupAddPlayer from '@/components/popupAddPlayer';
import popupQrcode from '@/components/popupQrcode';
import popupXiaopao from '@/components/popupXiaopao';
import popupAuthorize from '@/components/popupAuthorize';
export default {
  components: {popupAddPlayer, popupQrcode, popupXiaopao, popupAuthorize  },
  data(){
    return {
    }
  },
  created(){
  },
  mounted(){
  },
  methods: {
    showAddplayer(){
      if(!this.getSessionId()){
        this.$refs.popupAuthorize2.isShow = true;// 弹出 显示授权
      }else{
        this.$refs.popupAddPlayer.isShow=true;
      }
    },
  }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
footer{
  .fixed_bottom{
    position: fixed;
    bottom: 1.26rem;
    right: 0.06rem;
    img{
      width: 0.35rem;
      height: 0.35rem;
      &.qrcode{
        margin-top: 0.1rem;
      }
    }
  }
  .provider{
    width: 100%;
    height: 0.3rem;
    text-align: center;
    font-size: 0.12rem;
    line-height: 0.3rem;
    font-weight: 400;
    color:rgba(51,51,51,1);
  }
  
}
</style>