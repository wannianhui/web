<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}"  @click="setActive(0)">文章</li>
        <li :class="{ 'active': isActive == 1}"  @click="setActive(1)">帖子</li>
      </ul>
    </h3>
    <div>
      <ul v-show="isActive == 0">
        <li v-for="(item,index) in articleList" >
            <div> 
              <img :src="item.image==null?defaultImg:apiImg+item.image">
            </div>
            <div>
            <h2><router-link :to="{path: '/newsDetail', query: {id:item.id,labelId:item.label_id}}">{{item.title}}</router-link></h2>

            <p>{{item.remark}}</p>
            <ul>
              <li class="postsAvatar"><img :src="head_image==null?defaultUser:apiImg+head_image" alt="logo"><span>{{item.author}}</span></li>
              <li><img src="../../../static/img/icon_eye.png" alt=""><span>{{item.playback}}浏览</span></li>
              <li><img src="../../../static/img/icon_finger.png" alt=""><span>{{item.praise}}赞</span></li>
              <li><img src="../../../static/img/icon_time.png" alt=""><span>{{item.create_time}}</span></li>
            </ul>
          </div>
          <ul>
            <li @click="move({type:'artical',id:item.id})"><div></div><span>移出</span></li>
          </ul>
        </li>
      </ul>
      <!-- <h3  v-show="isActive == 1">共发表2个帖子</h3> -->
      <ol v-show="isActive == 1">
        <li v-for="(item,index) in postList">
          <img :src="item.userExtend.head==null?defaultUser:apiImg+item.userExtend.head" alt="logo">
          <div>
            <h3>
              <a href="javascript:void(0);">
              <span @click="postDetail(item.id)">{{item.title}}</span>
              <p v-if="item.state==1"><img src="../../../static/img/icon_bean.png" alt=""><span>{{item.price}}</span></p>
              </a>
            </h3>
            <ol>
              <li>
                <img :src="item.userExtend.head==null?defaultUser:apiImg+item.userExtend.head" alt="">
                <span>{{item.name}}</span>
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
            <li @click="move({type:'post',id:item.id})"><div></div><span>删除</span></li>
          </ul>
        </li>
  
      </ol>
      <div class="pager">
        <v-pagination :total="total" :display="display" :current-page='current' @pagechange="pagechange"></v-pagination>
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
        articleList:[],//文章列表
        postList:[],//帖子列表
        httpImg:this.global.httpImg, //全局的图片路径
        apiImg:this.$httpImg,//网络图片前缀
 
      }
    },
    created:function(){
      const that = this;
      that.head_image = that.appInfo.head_image;
      that.defaultImg = common.defaultImg;
      that.defaultUser = common.defaultUser;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';
      that.getArticlelist(); //获得收藏文章列表
    },
    mounted:function(){
    },

    components:{
      'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "appInfo"
      ])
    },
    methods: {
      //跳转到论坛详情
      postDetail(topicId,state){
        let that = this;
        that.topicId = topicId;
        that.$router.push({ 
          path: 'postDetail',
          query: { topicId:topicId},
        })
      },      
      pagechange:function(currentPage){
        const that = this;
        that.pageNumber = currentPage;
        that.getArticlelist({pageNumber:currentPage});
      },
      //获得收藏文章列表
      getArticlelist({
        pageNumber = 1,
        pageSize = 5,
      }={}){
        const that = this;
        that.$http.get(that.$api+"/information/pageCollect",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
          }
        }).then((res)=>{
          console.log('%c 获取收藏文章列表','color:green',res);
          let list = res.data.data;
          that.articleList = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      //获得帖子列表
      getPostList({
        pageNumber = 1,
        pageSize = 10,
      }={}){
        const that = this;
        that.$http.get(that.$api+"/topic/pageCollect",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
          }
        }).then((res)=>{
          console.log('%c 获取收藏帖子列表','color:green',res);
          let list = res.data.data;
          that.postList = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      setActive(index) {
        const that = this;
        if( index!=that.isActive ){
          that.isActive = index;
          that.$store.dispatch('initPageNum', true); //强制初始化页码
          that.pageNumber = 1;
          if( index==0 ){
            that.getArticlelist(); //获得收藏文章列表
          }else {
            that.getPostList(); //获得帖子列表
          }
        }
      
      },
      move({type="",id=""}={}) {
        const that = this;
        if( type == 'artical' ) {
          that.$http.get(that.$api+"/information/saveCollect",{
            params:{
              sessionId: that.sessionId,
              informationId: id,
            }
          }).then((res)=>{
            console.log('%c 取消收藏文章接口','color:green',res);
            if( res.data.code == 1 ){
              that.getArticlelist({pageNumber:that.pageNumber});
              that.$store.dispatch('sendTips', {isTip:true,content:'该收藏文章已移除'});
            }
          }).catch(function (error) {
          });
          
        }
        else {
          that.$http.get(that.$api+"/topic/saveCollect",{
            params:{
              sessionId: that.sessionId,
              topicId: id,
            }
          }).then((res)=>{
            console.log('%c 取消收藏帖子接口','color:green',res);
            if( res.data.code == 1 ){
              that.getPostList({pageNumber:that.pageNumber});
              that.$store.dispatch('sendTips', {isTip:true,content:'该收藏帖子已删除'});
            }
          }).catch(function (error) {
          });
          
        }
      }

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
  .module {
    box-sizing:border-box;
    min-height:518px;
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
      min-height:450px;
      background:white;
      padding:11px 40px 0 40px;
      box-sizing:border-box;
      &>ul {
        box-sizing:border-box;
        &>li {
          height:180px;
          margin:0;
          position:relative;
          padding:20px 27px 0 20px;
          box-sizing:border-box;
          border-bottom:1px solid #EFF3F5;
          // a {
            // display:block;
            // height:100%;
            &>div {
              &:nth-of-type(1){
                position:absolute;
                left:-20px;
                top: 0;
                padding:20px 20px 23px 20px;
                float:left;
                &>img {
                  width:200px;
                  height:136px;
                }
                &>div {
                  background-size:100% 100%;
                  width:200px;
                  height:136px;
                  &:hover {
                    opacity:0.9;
                  }
                }
                
              }
              &:nth-of-type(2){
                float:right;
                width:590px;
                color:#8D8D8D;
                padding:0 5px;
                box-sizing:border-box;
                h2 {
                  font-size:16px;
                  color:#333333;
                  a {
                    color:#333333;
                  }
                  &:hover {
                    a {
                      color:#49BDFF;
                    }
                  }
                }
                p {
                  @include multiLineOF();
                  height:58.8px;
                  margin:15px 0 7px 0;
                }
                ul {
                  font-size:0;
                  .postsAvatar {
                    img {
                      width:22px;
                      height:22px;
                      border-radius:50%;
                      vertical-align:middle;
                    }
                  }
                  li {
                    margin-right:20px;
                    @include ibMid();
                    img {
                      @include ibMid();
                      width:16px;
                      height:16px;
                      margin-right:6px;
                      vertical-align: top;
                    }
                    span {
                      font-size:12px;
                      @include ibMid();
                    }
                    &:last-child {
                      margin-right:0;
                    }
                  }
                }
              }
              @include clearFloat();
            }
            &>ul {
              @include ibMid();
              font-size:0;
              position:absolute;
              right:0;
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
              }
            }
          // }

        }
      }
      &>h3 {
        margin:0 0 5px 0;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(175,175,175,1);
      }
      &>ol {
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
                  border-radius: 50%;
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
            }
          }
        }
      }
    }
  }

</style>