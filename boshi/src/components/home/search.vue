<template>
  <section>
    <div>
      <div class="topBanner" @click="bannerGoTo">
        <img :src="apiImg + topBanner.image" alt="">
      </div>
      <h2>搜索<span>{{result}}</span>的内容</h2>
      <p v-if="total!=''">搜索到{{total}}个相关内容</p>
      <p v-else>没有搜索到相关内容</p>
      <!-- 新闻  -->
      <ul class="news" v-if="searchType == 0 &&postsShow != ''">
        <li v-for="(postsShow,index) in postsShow">
          <a href="javascript:void(0);">
            <div>
              <div :style="{backgroundImage: 'url('+apiImg+ postsShow.image + ')'}" class=""></div>
            </div>
            <div>
              <h2 @click="jumpToDetails({id:postsShow.id,labelId:postsShow.label_id,type:postsShow.type})">{{postsShow.title}}</h2>
              <p>{{postsShow.remark}}</p>
              <ul>
                <li class="postsAvatar"><img :src="apiImg+head_image" alt="logo"><span>{{postsShow.name}}</span></li>
                <li><img src="../../../static/img/icon_eye.png" alt=""><span>{{postsShow.playback}}浏览</span></li>
                <li><img src="../../../static/img/icon_finger.png" alt=""><span>{{postsShow.praise}}赞</span></li>
                <li><img src="../../../static/img/icon_time.png" alt=""><span>{{postsShow.create_time}}</span></li>
              </ul>
            </div>
            <ul>
              <li><img src="../../../static/img/logo_product.png" alt="" v-show="postsShow.elite_post==1"></li>
              <li><img src="../../../static/img/logo_aut.png" alt="" v-show="postsShow.recommend==1"></li>
              <li><img src="../../../static/img/logo_vip.png" alt="" v-show="postsShow.is_v_i_p_member==1"></li>
            </ul>
          </a>
        </li>
      </ul>
      <!-- 帖子 -->
      <ul class="post" v-else-if="searchType == 1&&postsShow != ''">
        <li v-for="(postsShow,index) in postsShow">
          <div>
              <span>{{postsShow.comment_number}}</span>
              <div class="postsSortTitle">
                <p style="cursor:pointer;" @click="postsShow.state==1?fufeiData=postsShow:'',postDetail({topicId:postsShow.id,state:postsShow.state,isOrderTopic:postsShow.isOrderTopic})">{{postsShow.title}}</p>
                 <ul>
                  <li class="ledou" v-show="postsShow.state==1"><img src="../../../static/img/icon_bean.png" alt="" ><span>{{postsShow.price}}</span></li>
                  <li v-show="postsShow.top==1"><span class="topping">置顶</span></li>
                  <li v-show="postsShow.elite_post==1"><span class="significant">精</span></li>
                  <li v-show="postsShow.official_certification==1"><span class="official">官</span></li>
                </ul>
              </div>

              <ul>
                <li>
                  <p @click="jump({index:0,id:postsShow.user_id})">{{postsShow.name}}</p>
                  <span>{{postsShow.create_time}}</span>
                </li>
                <li v-if="postsShow.enduser">
                  <p @click="jump({index:0,id:postsShow.enduser.user_id})">{{postsShow.enduser.nick}}</p>
                  <span>{{postsShow.enduser.create_time}}</span>
                </li>
                <li v-else>
                  <p @click="jump({index:0,id:postsShow.user_id})">{{postsShow.name}}</p>
                  <span>{{postsShow.create_time}}</span>
                </li>
              </ul>

            <ol>
              <li v-show="postsShow.image1"><img :src="apiImg+postsShow.image1" alt="" ></li>
              <li v-show="postsShow.image2"><img :src="apiImg+postsShow.image2" alt="" ></li>
              <li v-show="postsShow.image3"><img :src="apiImg+postsShow.image3" alt="" ></li>
            </ol>
          </div>
        </li>


      </ul>
      <!-- 用户 -->
      <ul class="name" v-else-if="searchType == 2&&postsShow != ''">
        <li v-for="(postsShow,index) in postsShow">
          <img :src="postsShow.head==null?defaultUser:apiImg+postsShow.head" alt="logo">
          <div>
            <h3>
              <span><a href="">{{postsShow.name}}</a></span>
              <img src="../../../static/img/icon_man_aut_gray1.png" alt="" v-show="postsShow.is_membership==1">
              <img src="../../../static/img/icon_man_aut_gray2.png" alt="" v-show="postsShow.is_official_certification_specialist==1">
              <img src="../../../static/img/icon_man_aut_gray3.png" alt="" v-show="postsShow.is_product_specialist==1">
            </h3>
            <p><span>关注：{{postsShow.follow}}</span><span>粉丝：{{postsShow.fans}}</span></p>
            <h4 v-if="postsShow.isFollow == 0" @click="attention({byUserId:postsShow.user_id})">关注</h4>
            <h4 v-else-if="postsShow.isFollow == 1" class="hasAttention" @click="attention({byUserId:postsShow.user_id})">已关注</h4>
            <h4 v-else class="hasAttention" @click="attention({byUserId:postsShow.user_id})">互相关注</h4>
          </div>
        </li>
      </ul>

      <!-- <div v-else>
        <img src="../../../static/img/icon_robot.png" alt="">
      </div> -->
<!--       <div class="more" @click="moreList()">
        查看更多
      </div> -->
      <div class="pager">
        <v-pagination :total="total" :display="display" :current-page='current' @pagechange="pagechange"></v-pagination>
      </div>
    </div>
  </section>
</template>

<script>
  import pagination from '@/common/pagination';
  import { mapState } from 'vuex';
  import common from '@/common/common';
  export default{
    data(){
      return{
        total: 0,     // 记录总条数
        display: 0,   // 每页显示条数
        current: 1,   // 当前的页数
        count:'', //传过去的页面数量
        pageNumber:1, //默认请求数量
        defaultUser:'', //默认头像
        postsShow:[], //实际展示的列表
        infosShow:[], //热门帖子
        sessionId:'',
        httpImg:this.global.httpImg, //全局的图片路径
        apiImg:this.$httpImg,
        hasResult:false, //有无搜索结果
        searchType:0, // 0是新闻，1是帖子，2是人名, 3是搜索无结果
        result:'', //搜索内容
        hasAttention:0, //0是未关注， 1是已关注， 2是互相关注
        topBanner: '',      //顶部广告banner
      }
    },
    mounted:function(){
      let that = this;
      that.defaultUser = common.defaultUser;
      that.searchType = that.$route.query.id-1; //保存从上一个页面传过来的值
      that.result = that.$route.query.searchResult;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.head_image = that.appInfo.head_image; //获取官方默认头像
      if(that.searchType==0){//新闻
        that.getNewsList({search:that.result});
      }else if(that.searchType==1){//帖子
        that.getPostList({search:that.result});
      }else if(that.searchType==2){//用户
        that.getUserList({search:that.result});
      }
      this.getBanner();
    },

    components:{
      'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "appInfo"
      ]),
    },
    methods: {
      // 顶部banner点击跳转
      bannerGoTo(){
        let data = this.topBanner;
        if (data.type === 1) {  //跳文章详情 带information_id
          this.$router.push({path: '/newsDetail', query:{id: data.information_id, labelId: 10118}})
        } else if (data.type === 2) {  //跳url
          window.open(data.url);
        } else if (data.type === 3) {   //跳帖子详情 带topic_id
          this.$router.push({path: '/postDetail', query: {topicId: data.topic_id}})
        }
      },
      // 获取页面顶部广告banner
      getBanner(){
        this.$http.get(this.$api + '/adv/adv/list', {
          params: {
            type: 2,
            sessionId: this.sessionId,
          }
        }).then(res => {
          console.log('banner------', res);
          this.topBanner = res.data.data[0];
          // this.topBanner = {
          //   type: 1,
          //   url: 'www.baidu.com',
          //   information_id: 15,
          //   topic_id: 215,
          //   image: '/upload/adv/20190906/1567757527065_188972.png',
          // }
        })
      },
      //
      pagechange:function(currentPage){
        const that = this;
        that.pageNumber = currentPage;
        console.log(that.searchType,currentPage,159)
        // that.getNewsList({pageNumber:currentPage});
        if(that.searchType==0){//新闻
          that.getNewsList({search:that.result,pageNumber:currentPage});
        }else if(that.searchType==1){//帖子
          that.getPostList({search:that.result,pageNumber:currentPage});
        }else if(that.searchType==2){//用户
          that.getUserList({search:that.result,pageNumber:currentPage});
        }
      },

      //跳转到文章详情
      jumpToDetails({
        id = '',
        labelId = '',
        type = 0,
        labelName= '',
      }={}){
        const that = this;
        let labelData = that.labelData;
        // labelName = labelData.labelSon==''?labelName=labelData.label:labelName=labelData.labelSon;
        that.$router.push({
          path: 'newsDetail',
          query: {
            id:id,
            labelId:labelId,
            type:type,
            // labelName:that.labelData
          },
        })
      },

      //获得用户列表数据
      getUserList({
        pageSize=12,
        pageNumber=1,
        search='',
      }={}){
        const that = this;
        that.$http.get(that.$api+"/user/pageSearch",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: that.result,
          }
        }).then((res)=>{
          console.log('%c 获取用户列表','color:green',res);
          let list = res.data.data;
          that.postsShow = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      //获得帖子列表数据
      getPostList({
        pageSize=10,
        pageNumber=1,
        search='',
      }={}){
        const that = this;
        that.$http.get(that.$api+"/topic/pageSearch",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: that.result,
          }
        }).then((res)=>{
          console.log('%c 获取帖子列表','color:green',res);
          let list = res.data.data;
          that.postsShow = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      //获得新闻列表数据
      getNewsList({
        pageSize=10,
        pageNumber=1,
        search='',
      }={}){
        const that = this;
        that.$http.get(that.$api+"/information/pageSearch",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: that.result,
          }
        }).then((res)=>{
          console.log('%c 获取新闻列表','color:green',res);
          let list = res.data.data;
          that.postsShow = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },


      //关注
      attention:function({
        byUserId='',
      }={}){
        const that = this;
        that.$http.get(that.$api+"/user/follow/save",{
          params:{
            sessionId: that.sessionId,
            byUserId: byUserId,
          }
        }).then((res)=>{
          console.log('%c 关注接口',' :green',res);
          console.log(res.data.desc,179)
          that.$store.dispatch('sendTips', {
            isTip:true,content:res.data.desc
          });
          if(res.data.code == 1){
            that.getUserList({pageNumber:that.pageNumber})
          }

        }).catch(function (error) {
        });

      },
     getParams:function(){

      // console.log(this.$route.query,295)
      // this.result = result;
      // this.searchType = type;
     },

    //跳转到商品详情
    postDetail({
      topicId = '',
      state = '',
      isOrderTopic = '',
    }={}){//跳转到论坛详情
      let that = this;
      that.topicId = topicId;
      if(state==0){//免费
        that.$router.push({
          path: 'postDetail',
          query: { topicId:topicId},
        })
      }else{
        if( isOrderTopic==0 ){
          that.isPayLd = true;
        }else {
          that.$router.push({
            path: 'postDetail',
            query: { topicId:topicId},
          })
        }
      }
    },

     moreList(){
      let that = this;
      let sessionId = '';
      that.pageNumber = that.pageNumber+1;
      if(that.searchType==0){//新闻
        that.$http.get(this.$api+"/information/pageSearch?sessionId="+that.sessionId+"&search="+that.result+"&pageSize="+that.display+"&pageNumber="+that.pageNumber).then((res)=>{
          let data = that.postsShow;
          if(res.data.data.list==''){
            that.$layer.msg('没有更多了');
            return ;
          }
          res.data.data.list.forEach(v=>{
            data.push(v);
          });
          that.postsShow = data;
        })
      }else if(that.searchType==1){//帖子
        that.$http.get(that.$api+"/topic/pageSearch?sessionId="+that.sessionId+"&search="+that.result+"&pageSize="+that.display+"&pageNumber="+that.pageNumber).then((res)=>{
          let data = that.postsShow;
          if(res.data.data.list==''){
            that.$layer.msg('没有更多了');
            return ;
          }
          res.data.data.list.forEach(v=>{
            data.push(v);
          });
          that.postsShow = data;
        })
      }else if(that.searchType==2){//用户
        that.$http.get(that.$api+"/user/pageSearch?sessionId="+that.sessionId+"&search="+that.result+"&pageSize="+that.display+"&pageNumber="+that.pageNumber).then((res)=>{
          let data = that.postsShow;
          if(res.data.data.list==''){
            that.$layer.msg('没有更多了');
            return ;
          }
          res.data.data.list.forEach(v=>{
            data.push(v);
          });
          that.postsShow = data;
        })
      }
     }
   },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";
  .topBanner{
    width: 1200px;
    height: 97px;
    background-color: #fff;
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
    img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .pager {
    height:56px;
    font-size:14px;
    color:white;
    text-align:center;
    background:#F7F7F7;
    position:relative;
  }
  .more{
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: white;
      text-align: center;
      background: #49BDFF;
      margin-top: 6px;
      cursor: pointer;
  }
  section {
    margin:62px 0 0 0;
    min-height:84%;
    &>div {
      font-size: 0;
      width:1200px;
      margin:0 auto;
      padding-bottom:20px;
      padding-top: 40px;
      &>a {
        img {
          margin:18px 0 42px 0;
        }
      }
      &>h2 {
        font-size:24px;
        color:#333;
        margin-bottom:22px;
        span {
          margin:0 5px;
          color:#1371F9;
        }
      }
      &>p {
        font-size:16px;
        color:#8D8D8D;
        margin-bottom:20px;
      }
      .news {
        background:white;
        box-sizing:border-box;
        padding-left:20px;
        &>li {
          height:180px;
          margin:0;
          position:relative;
          padding:20px 27px 0 20px;
          box-sizing:border-box;
          border-bottom:1px solid #EFF3F5;
          a {
            display:block;
            height:100%;
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
                float:left;
                margin-left:200px;
                width:840px;
                color:#8D8D8D;
                padding:0 5px;
                box-sizing:border-box;
                h2 {
                  font-size:16px;
                  color:#333333;
                  &:hover {
                    color:#49BDFF;
                  }
                }
                p {
                  font-size:14px;
                  margin:15px 0 15px 0;
                  overflow:hidden;
                  display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
                  text-overflow:ellipsis;//溢出部分用省略号代替
                  -webkit-line-clamp:3; //设置文本显示两行
                  -webkit-box-orient:vertical;  //从上到下排列子元素;
                  white-space:normal;
                  max-height: 65px;
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
              position:absolute;
              right:30px;
              top:0;
              li {
                float:left;
                margin-right:5px;
                img {
                  width:28px;
                  height:45px;
                }
                &:last-child {
                  margin-right:0;
                }
              }
              @include clearFloat();
            }
          }

        }
      }
      .name {
        li {
          width:243px;
          height:148px;
          margin:0 26px 21px 0;
          background:white;
          box-sizing:border-box;
          padding:21px 14px;
          @include ibMid();
          &>img {
            width:46px;
            height:46px;
            float:left;
            border-radius:50%;
          }
          &>div {
            width:169px;
            float:right;
            box-sizing:border-box;
            padding:0 0 0 14px;
            h3 {
              font-size:0;
              a {
                color:#333;
                &:hover {
                  color:#49BDFF;
                }
              }
              span,img {
                font-size:14px;
                @include ibMid();
              }
              span {
                width:70px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right:7px;

              }
              img{
                margin-right:4px;
              }
            }
            &>p {
              color:#C0C0C0;
              font-size:12px;
              margin:12px 0 24px 0;
              span {
                margin-right:24px;
                &:last-child {
                  margin-right:0;
                }
              }
            }
            h4 {
              width:84px;
              height:29px;
              line-height:29px;
              text-align:center;
              color:white;
              font-size:14px;
              cursor:pointer;
              background:#DBDBDB;
              &:hover {
                background:#FAC605;
              }
            }
            .hasAttention {
              background:#FAC605;
            }

          }
          &:nth-last-child(1), &:nth-last-child(2) ,&:nth-last-child(3) ,&:nth-last-child(4)  {
          }
        }
        @include clearFloat();
      }

      .post {
        background:white;
        //padding: 4px 0;
        box-sizing:border-box;
        &>li {
          min-height:56px;
          margin:0;
          position:relative;
          box-sizing:border-box;
          padding:0 21px 0 32px;
          &:hover {
            background:#f4f8f9;
          }
          &>div {
            height:100%;
            border-bottom:1px solid #EFF3F5;
            box-sizing:border-box;
            // a {
            //   display:block;
            //   height:100%;
            //   font-size:0;
              line-height: 56px;
              &>span {
                display:inline-block;
                width:44px;
                height:24px;
                line-height:24px;
                text-align:center;
                background:#EFF3F5;
                font-size:12px;
                margin-right:20px;
                @include ibMid();
                // @include posiVertical();
              }
              .postsSortTitle {
                p {
                  max-width:440px;
                  font-size:14px;
                  color:#333333;
                  @include sLineOF();
                  @include ibMid();
                  a {
                    color:#333333;
                    &:hover {
                      color:#8D8D8D;
                    }
                  }
                }
                ul {
                  @include ibMid();
                  margin-left:14px;
                  .ledou {
                    font-size:0;
                    img {
                      @include ibMid();
                      margin-right:4px;
                    }
                    span {
                      @include ibMid();
                      font-size:14px;
                      color:#E43D3D;
                    }
                  }
                  li {
                    float:left;
                    margin-right:6px;
                    font-size:12px;
                    @include clearFloat();
                    &:last-child {
                      margin-right:0;
                    }
                    img {
                      width:16px;
                      height:16px;
                    }
                    .significant,.topping, .official {
                      font-size:12px;
                      color:white;
                      padding:4px;
                      border-radius:2px;
                    }
                    .topping {
                      background:#37A2F1;
                    }
                    .significant {
                      background:#FF5757;
                    }
                    .official {
                      background:#E40A37;
                    }
                  }
                }
                @include ibMid();
                // @include posiVertical();
                // left:96px;
              }
              &>ul {
                // @include posiVertical();
                margin-right:7px;
                @include ibMid();
                float:right;
                li {
                  float:left;
                  font-size:12px;
                  text-align:center;
                  margin-right:10px;
                  line-height:100%;
                  cursor:pointer;
                  &:last-child {
                    margin-right:0;
                  }
                  p {
                    color:#8D8D8D;
                    margin:14px 0 8px 0;
                    &:hover {
                      color:#E43D3D;
                    }
                    line-height:100%;
                  }
                  span {
                    color:#C0C0C0;
                    line-height:100%;
                  }
                }
                @include clearFloat();
              }
              @include clearFloat();

            // }
             &>ol {
                margin-bottom:36px;
                li {
                  float:left;
                  margin-right:6px;
                  max-height: 124px;
                  max-width: 260px;
                  &:last-child {
                    margin-right:0;
                  }
                  img {
                    max-height:124px;
                  }
                }
                @include clearFloat();
              }
          }
          &:last-child {
            &>div {
              border-bottom:0;
            }
          }
        }
      }
      &>div {
        text-align:center;
      }
    }
  }

</style>
