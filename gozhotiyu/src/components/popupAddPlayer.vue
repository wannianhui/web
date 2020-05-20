<template lang="html">
  <div>
    <van-popup v-model="isShow" :close-on-click-overlay="true" :style="{ 'border-radius': '0.1rem', width: '75%' }" closeable > 
      <div class="content_wrap">
        <p class="title">上传选手资料</p>
        <div class="name_wrap view_row">
          <p class="h1">姓名<span>*</span></p>
          <input type="text" placeholder="请输入选手姓名" v-model="name" />
        </div>
        <div class="img_wrap">
          <p class="h1">上传照片<span>*</span></p>
          <p class="h2">每张图片大小不要超过3M，图片载入时候，请 勿提交表单</p>
          <div class="img_wrap_over view_row" @click="$refs.add_img_input.click()" >
            <img class="avatar" :src="imgShow" />
            <img class="add" src="@/assets/img/upload_icon.png" v-if="!imgShow" />
          </div>
          <input class="add_img_input" ref="add_img_input" type="file" @change="addImg" />
        </div>
        <p  :class="['btn', { 'can' : name && imgShow } ]" @click="name && imgShow && !isSubmiting && submit()" >提交</p>
      </div>
    </van-popup>
    <!-- <popup-authorize2 ref="popupAuthorize2" /> -->
  </div>
</template>
<script>
// import popupAuthorize2 from '@/components/popupAuthorize2';
export default {
  // components: { popupAuthorize2, },
  props: {
  },
  data(){
    return {
      isShow: false,
      name: '', // 昵称
      imgShow: null, // 用于显示
      imgFile: null, // 用于上传
      isSubmiting: false, // 是否正在提交
    }
  },
  mounted(){
    
  },
  watch: {
    // isShow: function(newVal){
    //   if(newVal && !this.$parent.getSessionId()){
    //     this.$refs.popupAuthorize2.isShow = true;
    //   }
    // },
  },
  methods: {
    addImg(e){
      console.log(e);
      let file = this.$refs.add_img_input.files[0];
      try {
        let size = file.size;
        let type = file.type;
        if (!(type == "image/jpeg" || type == "image/jpg" || type == "image/png")) {
          this.$toast('请上传 jpg/png 格式的图片');
          return false;
        }else if (size > 1024*1024*3) {
          this.$toast('您上传的照片超过3M，上传失败');
          return false;
        }else{
          let windowURL = window.URL || window.webkitURL;
          this.imgShow = windowURL.createObjectURL(file);
          this.imgFile = file;
        }
      } catch (err) {
          if (file == null) return false; //验证是否点击选择后又点击返回了
      }
    },

    submit(){
      this.isSubmiting = true;
      let form = new FormData();
      form.append('sessionId', this.getSessionId())
      form.append('infoImg', this.imgFile)
      form.append('name', this.name)
      this.$api.addPlayer(form).then(res=>{
        console.log(res)
        this.$toast(res.desc);
        this.name = '';
        this.imgShow = null;
        this.imgFile = null;
        this.isSubmiting = false;
        this.isShow = false;
      })
    },

  }

}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
.content_wrap{
  padding: 0.2rem 0.2rem 0;

  .title{
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    font-weight: bold;
    color: rgba(51,51,51,1);
  }

  .name_wrap{
    margin-top: 0.3rem;
    .h1{
      font-size: 0.13rem;
      line-height: 0.34rem;
      font-weight: bold;
      color: rgba(51,51,51,1);
      flex-shrink: 0;
      span{
        color: #2983FF;
      }
    }
    input{
      margin-left: 0.2rem;
      padding: 0.1rem;
      font-size: 0.12rem;
      line-height: 0.14rem;
      font-weight: 400;
      background:rgba(242,245,249,1);
      border-radius: 0.05rem;
      color: rgba(51,51,51,1);
      flex-grow: 1;
      ::placeholder{
        color:rgba(187,187,187,1);
      }
    }
  }

  .img_wrap{
    margin-top: 0.15rem;
    .h1{
      font-size: 0.13rem;
      line-height: 0.29rem;
      font-weight: bold;
      color: rgba(51,51,51,1);
      span{
        color: #2983FF;
      }
    }
    .h2{
      font-size: 0.11rem;
      line-height: 0.15rem;
      font-weight: 400;
      color: rgba(51,51,51,1);
    }
    .img_wrap_over{
      margin-top: 0.1rem;
      align-items: center;
      width: 100%;
      height: 1.2rem;
      overflow: hidden;
      background-color: rgba(242,245,249,1);
      border-radius: 0.05rem;
      position: relative;
      img.avatar{
        width: 100%;
        height: auto;
      }
      img.add{
        position: absolute;
        width: 0.38rem;
        height: 0.38rem;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0; 
        margin: auto;
      }
    }
    input.add_img_input{
      display: none;
    }
  }
  
  .btn{
    width: 1.64rem;
    height: 0.33rem;
    background: rgba(213,216,220,1);
    border-radius: 0.17rem;
    font-size: 0.13rem;
    line-height: 0.33rem;
    font-weight: bold;
    color: rgba(255,255,255,1);
    margin: 0.16rem auto;
    text-align: center;
    &.can{
      background: linear-gradient(-27deg, rgba(41,131,255,1) 0%, rgba(41,161,255,1) 100%) !important;
    }
  }

}
</style>