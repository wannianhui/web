<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}"  @click="setActive(0)">已发布</li>
        <li :class="{ 'active': isActive == 1}"  @click="setActive(1)">草稿</li>
        <li :class="{ 'active': isActive == 2}"  @click="setActive(2)">已购买</li>
      </ul>
    </h3>
    <div>
      <ul>
        <li v-for="(item,index) in postList" >
          <img  :src="item.userExtend.head==null?defaultUser:apiImg+item.userExtend.head">
          <div>
            <h3>
              <a href="javascript:void(0);">
              <span @click="postDetail(item.id)">{{item.title}}</span>
              <p v-if="item.state==1"><img src="../../../static/img/icon_bean.png" alt="" ><span>{{item.price}}</span></p>
              </a>
            </h3>
            <ol>
              <li>
                <img :src="item.userExtend.head==null?defaultUser:apiImg+item.userExtend.head">
                <span>{{userName}}</span>
              </li>
              <li>
                <img src="../../../static/img/icon_eye.png" alt="">
                <span>{{item.playback}}浏览</span>
              </li>
              <li>
                <img src="../../../static/img/icon_comment.png" alt="">
                <span>{{item.comment_number}}</span>
              </li>
              <li>
                <img src="../../../static/img/icon_finger.png" alt="">
                <span>{{item.praise}}赞</span>
              </li>
              <li>
                <img src="../../../static/img/icon_time.png" alt="">
                <span>{{item.create_time}}</span>
              </li>
            </ol>
          </div>
          <ul>
            <li v-show="isActive==1" @click="state('post',item)"><div></div><span>编辑</span></li>
            <li v-show="isActive!=2" @click="deletePost(item.id,item.state)"><div></div><span>删除</span></li>
            <li v-show="isActive==2" @click="deletePost(item.id,item.state)"><div></div><span>移出</span></li>
          </ul>
        </li>
      </ul>
      <div class="pager">
        <v-pagination :total="total" :display="display" :current="current" @pagechange="pagechange"></v-pagination>
      </div>
      <div class='modifyPhone' v-show="openTips">
        <div>
          <h3>提示<img :src="httpImg+'icon_cancle_card_black.png'" alt=""  @click="determine()"></h3>
          <p>确定删除该帖子？</p>
          <button @click="determine('true')">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from '@/common/pagination';
  import common from '@/common/common';
  import { mapState } from 'vuex';

  export default{
    data(){
      return{
        total: 0,     // 记录总条数
        display: 0,   // 每页显示条数
        current: 1,   // 当前的页数
        count:'', //传过去的页面数量
        isActive: 0, //默认下标
        isCircle: false, //
        isShowTwo: false,
        apiImg:this.$httpImg,//网络图片前缀
        openTips:false, //打开提示窗口
        httpImg:this.global.httpImg, //全局的图片路径
        postList:[],//帖子列表
      }
    },
    created:function(){
      const that = this;
      that.defaultUser = common.defaultUser;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';
      that.userImg = that.userInfo.userExtend.head;
      that.userName = that.userInfo.userExtend.name;
      if( !this.global.isBlank( this.$route.query.isActive ) ){
        console.log( this.$route.query.isActive ,153 )
        // this.isActive = this.$route.query.isActive;
        this.isActive = 0;
      }
      else if ( this.$route.query.isActive == 1 ){
        this.isActive = 1;
      }else if( this.$route.query.isActive == 0 ){
        this.isActive = 0;
      } else {
        // this.isActive = this.$route.query.isActive || 0
        this.isActive = 0
        console.log("created")
      }

      that.getPostList('created'); //初始化数据
    },
    mounted:function(){
      const that = this;
      this.postsShow = this.latestRanking;
      
      //请求web的接口
      // this.$http.get(this.$api+"/web").then((res)=>{
      //   this.data = res.data.data;
      //   // console.log(this.data,78)
      // })

    },

    components:{
      'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "userInfo",
      ])
    },
    methods: {
      pagechange:function(currentPage){
        const that = this;
        that.pageNumber = currentPage;
        that.getPostList({pageNumber:currentPage});
      },
      //跳转到论坛详情
      postDetail(topicId,state){
        let that = this;
        that.topicId = topicId;
        that.$router.push({
          path: 'postDetail',
          query: { topicId:topicId},
        })
      },
      //获取帖子列表
      getPostList({
        type=0, //0已发布 1草稿2 已购买
        pageNumber = 1,
        pageSize = 10,
      }={}){
        const that = this;
        that.$http.get(that.$api+"/topic/pageTopicUser",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: that.isActive,
          }
        }).then((res)=>{
          console.log('%c 获取帖子列表','color:green',res);
          let list = res.data.data;
          that.postList = list.list;
          that.total = list.totalRow;
          if(that.total>8 || that.total == 8){
            that.current = 5;
          }
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      setActive(index) {
        if( index!=this.isActive ){
          const that = this;
          that.isActive = index;
          that.postList = [];
          that.$store.dispatch('initPageNum', true); //强制初始化页码
          that.getPostList({type:index}); //初始化数据
        }
      },
      circleCli() {
        this.isCircle = !this.isCircle;
        console.log(this.isCircle,95)
      },
      deletePost(topicId,state) {
        // if( state == 1){
        //   this.$store.dispatch('sendTips', {
        //     isTip:true,content:'该帖子为付费帖子，不能删除 o(╥﹏╥)o'
        //   });
        // }else{
        //
        // }
        this.openTips = !this.openTips;
        this.topicId = topicId;

      },
      determine(name) {
        const that = this;
        this.openTips = !this.openTips;

        if (name === 'true') {
          that.$http.get(that.$api+"/topic/delete",{
            params:{
              sessionId: that.sessionId,
              topicId: that.topicId,
            }
          }).then((res)=>{
            console.log('%c 删除帖子信息','color:green',res);
            if( res.data.code == 1 ){
              that.getPostList({pageNumber:that.pageNumber});
              that.$store.dispatch('sendTips', {isTip:true,content:'删除帖子成功'});
              let userInfo = {}; 
              userInfo=that.$store.state.userInfo;
              userInfo.topicNum--
              that.$store.dispatch('userInfo',userInfo)
            }
          }).catch(function (error) {

          });
        }


        // if( name == 'true' ){
        //   this.$store.dispatch('sendTips', {isTip:true,content:'删除成功'});
        // }
      },
      state(type, item) {
        if( type=='post' ){
          console.log("ok")
          sessionStorage.setItem('tie', JSON.stringify(item));
          this.$router.push({
            path: 'post',
            // name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
            // params: {
                // name: 'name',
                // dataObj: this.msg
            // }
            /*query: {
                name: 'name',
                dataObj: this.msg
            }*/
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .pager {
    height:56px;
    font-size:14px;
    color:white;
    text-align:center;
    position:relative;
  }

  .modifyPhone {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:9999;
    background: rgba(0,0,0,0.1);
    &>div {
      width:371px;
      height:163px;
      background:rgba(255,255,255,1);
      box-shadow:0px 10px 40px 0px rgba(63,63,63,0.71);
      box-sizing:border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align:center;
      font-family:MicrosoftYaHei-Bold;
      color:rgba(51,51,51,1);
      padding-bottom:20px;
      &>h3 {
        height:44px;
        line-height:44px;
        background:rgba(242,242,242,1);
        border-radius:2px;
        position:relative;
        img {
          width:16px;
          height:16px;
          cursor:pointer;
          position:absolute;
          top: 15px;
          right: 20px;
        }
      }
      &>p {
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(228,61,61,1);
        margin:30px 0 20px 28px;
        text-align:left;
      }
      &>button {
        border:none;
        outline:none;
        width:60px;
        height:30px;
        background:#E5E5E5;
        border-radius:2px;
        color:white;
        cursor:pointer;
        display:block;
        float:right;
        margin-right:20px;
        &:hover {
          background:#69C9FF;
        }
      }

    }
  }

  .module {
    box-sizing:border-box;
    min-height:518px;
    .show-enter-active,.show-leave-active{
        transition: all 0.4s ease;
        padding-left: 10px;
    }
    .show-enter,.show-leave-active{
        padding-left: 100px;
    }
    &>h3 {
      height:68px;
      line-height:68px;
      padding:0 40px;
      border-bottom:1px solid #F2F2F2;
      background:white;
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
          padding:0 15px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          box-sizing:border-box;
          cursor:pointer;
          color:#8D8D8D;
          margin-right:20px;
          &:last-child {
            margin-right:0;
          }
          border-bottom:2px solid white;
          &:hover {
            color:#333333;
            border-bottom:2px solid #333333;
          }
        }
      }
    }
    &>div {
      padding:11px 40px 0 40px;
      box-sizing:border-box;
      min-height:450px;
      background:white;
      &>ul {
        &>li {
          padding:13px 0;
          border-bottom:1px solid #ECECEC;
          &:last-child {
            border-bottom:0;
          }
          font-size:0;
          &>img {
            width:46px;
            height:46px;
            border-radius:50%;
            margin-right:13px;
            @include ibMid();
          }
          &>div {
            @include ibMid();
            width:500px;
            &>h3 {
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              margin-bottom:13px;
              font-size:0;
              a {
                color:#333333;
                &>span {
                  width:90%;
                  @include ibMid();
                  font-size:14px;
                  max-width:1000px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                &>p {
                  @include ibMid();
                  float:right;
                  img {
                    width:16px;
                    height:16px;
                    @include ibMid();
                    margin-right:4px;
                  }
                  span {
                    @include ibMid();
                    font-size:14px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color:rgba(228,61,61,1);
                  }
                }
              }
            }
            &>ol {
              font-size:0;
              li {
                @include ibMid();
                margin-right:20px;
                &:last-child {
                  margin-right:20px;
                }
                font-size:0;
                img {
                  @include ibMid();
                  width:16px;
                  height:16px;
                  margin-right:5px;
                  border-radius:50%;
                }
                span {
                  @include ibMid();
                  font-size:12px;
                  font-family:MicrosoftYaHei;
                  font-weight:400;
                  color:rgba(192,192,192,1)
                }
              }


            }
          }
          &>ul {
            @include ibMid();
            font-size:0;
            float: right;
            margin-top: 8px;
            li {
              @include ibMid();
              margin-right:12px;
              width:60px;
              height:26px;
              line-height:26px;
              text-align:center;
              outline:none;
              background:rgba(0,0,0,0);
              border:1px solid #C0C0C0;
              opacity:0.45;
              border-radius:2px;
              color:#C0C0C0;
              cursor:pointer;
              font-size:0;
              &:hover {
                color:#EF6B3C;
                border:1px solid #EF6B3C;
                div {
                  background-image:url('../../../static/img/icon_x_red.png');
                }
              }
              &:last-child {
                margin-right:0;
              }
              div {
                @include ibMid();
                width:10px;
                height:10px;
                margin-right:5px;
                background-image:url('../../../static/img/icon_x_grey.png');
                background-size:100% 100%;
              }
              span {
                @include ibMid();
                font-size:12px;
                font-family:MicrosoftYaHei;
                font-weight:400;
              }
              &:first-child {
                div {
                  background-image:url('../../../static/img/icon_pen_grey.png');
                }
                &:hover {
                  div {
                    background-image:url('../../../static/img/icon_pan_red.png');
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
