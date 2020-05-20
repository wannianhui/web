<template lang="html">
  <van-popup v-model="isShow" :close-on-click-overlay="true" :style="{ 'border-radius': '0.07rem', width: '70%' }" > 
    <div class="content_wrap view_column">
      <slot></slot>
    </div>
    <div class="btn_wrap view_row">
      <p class="cancel" @click="isShow=false" >取消</p>
      <!-- <p class="confirm" @click="getAuthorize()" >去授权</p> -->
      <p class="confirm" @click="reload()" >去授权</p>
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
    }
  },
  mounted(){
    
  },
  methods: {
    reload(){
      // window.location.reload();
      //重新授权
      this.whetherAuthorize();
    },
  }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
.content_wrap{
  align-items: center;
  justify-content: center;
  min-height: 1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-bottom: 1px solid #EEEEEE;
  font-size: 0.14rem;
  line-height: 0.2rem;
  font-weight: bold;
  color: rgba(51,51,51,1);
}
.btn_wrap{
  text-align: center;
  font-size: 0.14rem;
  line-height: 0.5rem;
  font-weight: 500;
  .cancel{
    width: 50%;
    color: rgba(187,187,187,1);
  }
  .confirm{
    width: 50%;
    color: rgba(41,131,255,1);
    box-sizing: border-box;
    border-left: 1px solid #EEEEEE;
  }
}
</style>