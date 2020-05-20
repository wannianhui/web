<template lang="html">
  <div>
    <!-- playerList -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="getList"
      class="list_wrap view_row"
    >
      <div class="item" v-for="item in playerList" :key="item.id" >
        <div class="avatar_wrap" @click.stop="pageTo_query('/detail', item)">
          <img class="avatar" :src="$imgurl + item.infoImg" alt=""/>
          <p class="tag">NO.{{item.sortNumber}}</p>
          <p class="name">{{item.realName}}</p>
        </div>
        <div class="msg view_row">
          <p class="hot">{{item.popularity}}</p>
          <p class="no">{{item.no}}号</p>
        </div>
        <p class="btn" @click.stop="support(item.id)" >支持Ta</p>
      </div>
    </van-list>

    <!-- list no data -->
    <div class="list_no_data" v-if="!searchStr && playerList.length==0">
      <p>暂无选手，敬请期待</p>
    </div>

    <!-- search no data -->
    <div class="search_no_data view_column" v-if="searchStr && playerList.length==0">
      <img src="@/assets/img/result_icon_null.png" alt="" />
      <p>无法搜索到该选手，请重新搜索</p>
    </div>

    <!-- 已经是底部了 -->
    <div class="isbottom" v-if="finished && playerList.length">已经是底部了</div>

    <popup-gift ref="popupGift" v-on:luanchedGiftCallBack="luanchedGiftCallBack" />
    <popup-authorize ref="popupAuthorize" >
      想为您的选手投票，请进行微信授权，谢谢您的配合
    </popup-authorize>

  </div>
</template>
<script>
import popupAuthorize from '@/components/popupAuthorize';
import popupGift from '@/components/popupGift';
export default {
  components: { popupGift, popupAuthorize, },
  props: {
    searchStr: { // 搜索关键词
      type: String,
      default: '',
    }
  },
  data(){
    return {
      playerList: [], // 搜索 参赛选手
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      finished: false,
    }
  },
  created() {
  },
  mounted(){
  },
  methods: {
    getList(){ // 获取参数选手
      if(this.pageNumber == 1){ // 如果更改了 pageNumber=1，则重置 playerList=[]
        this.playerList = [];
        this.finished = false
      }
      let param = {
        sessionId: this.getSessionId(),
        keyword: this.searchStr,
        pageNumber: this.pageNumber,
        pageSize: 10,
      }
      this.$api.getPlayerList(param).then(res=>{
        console.log('选手列表',res);
        this.playerList = this.playerList.concat(res.data.page.list)
        this.loading = false;
        this.pageNumber++;
        if(res.data.page.lastPage){
          this.finished = true;
        }
        // 非搜索
        if(!this.searchStr){
          console.log("this.$emit('showMsgFromPlayList', res)");
          
          // this.$parent.showMsgFromPlayList(res);
          this.$emit('showMsgFromPlayList', res) // 需在父组件定义子组件处定义 @showMsgFromPlayList="showMsgFromPlayList"
        }
      })
    },

    // 支持Ta
    support(id){
      console.log(this.getSessionId());
      
      if(!this.getSessionId()){
        this.$refs.popupAuthorize.isShow = true;// 弹出 显示授权
      }else{
        this.$refs.popupGift.isShow = true;// 弹出 发射礼物
        this.$refs.popupGift.playerId = id;// 选手ID
        if(this.$refs.popupGift.giftList.length==0) this.$refs.popupGift.getGift();
      }
    },

    // 发射礼物后，子组件的回调
    luanchedGiftCallBack(){
      console.log("playerList- luanchedGiftCallBack 。 ");
      // this.$refs.playerList.pageNumber = 1;
      // this.$refs.playerList.getList();
      this.pageNumber = 1
      this.getList()
    }

  }
}
</script>

<style lang="scss" scoped >
@import '../assets/css/public.scss';
.list_wrap{
  padding: 0 0.05rem;
  flex-wrap: wrap;
  margin-top: 0.1rem;
  .item{
    width: 50%;
    margin-bottom: 0.24rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    .avatar_wrap{
      position: relative;
      width: 1.62rem;
      height: 1.62rem;
      margin: 0 auto;
      img.avatar{
        width: 100%;
        height: 100%;
        border-radius: 0.07rem;
        display: block;
      }
      .tag{
        position: absolute;
        top: 0;
        left: 0;
        width: 0.55rem;
        height: 0.2rem;
        line-height: 0.2rem;
        background: linear-gradient(0deg,rgba(255,155,48,1) 0%,rgba(255,174,59,1) 100%);
        border-radius: 0.07rem 0.02rem 0.1rem 0px;
        font-size: 0.11rem;
        font-weight: bold;
        color: rgba(255,255,255,1);
        text-align: center;
      }
      .name{
        position: absolute;
        right: 0.12rem;
        bottom: 0.12rem;
        font-size: 0.12rem;
        line-height: 1;
        font-weight: bold;
        color: rgba(255,255,255,1);
      }
    }
    .msg{
      margin: 0.06rem 0;
      justify-content: space-between;
      .hot{
        font-size: 0.14rem;
        line-height: 0.2rem;
        font-weight: bold;
        color: rgba(255,155,48,1);
        padding: 0 0.07rem;
        background:rgba(255,239,222,1);
        border-radius: 0.1rem;
        &:before{
          content: '';
          background-image: url('~@/assets/img/home_icon_renqi.png');
          background-repeat: no-repeat;
          background-size: 0.1rem 0.13rem;
          background-position: left center;
          padding-left: 0.18rem;
        }
      }
      .no{
        font-size: 0.12rem;
        line-height: 0.2rem;
        font-weight: 500;
        color:rgba(51,51,51,1);
      }
    }
    .btn{
      width: 100%;
      font-size: 0.12rem;
      line-height: 0.27rem;
      font-weight:400;
      color: rgba(255,255,255,1);
      font-weight:bold;
      border-radius: 0.05rem;
      background: linear-gradient(-34deg,rgba(41,131,255,1) 0%,rgba(41,161,255,1) 100%);
      text-align: center;
    }
  }
}

.list_no_data{
  margin: 0.8rem 0;
  p{
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(170,170,170,1);
  }
}

.search_no_data{
  padding: 0 0.15rem;
  margin-top: 0.8rem;
  margin-bottom: 1.4rem;
  align-items: center;
  img{
    width: 0.57rem;
    height: 0.82rem;
  }
  p{
    margin-top: 0.22rem;
    font-size: 0.14rem;
    line-height: 1;
    font-weight: 400;
    color: rgba(170,170,170,1);
  }
}

.isbottom{
  width: 100%;
  height: 0.42rem;
  text-align: center;
  font-size: 0.12rem;
  line-height: 0.42rem;
  font-weight: 400;
  color: rgba(170,170,170,1);
  background-color: #f2f5f9;
}
</style>