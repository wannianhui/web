<template>
  <section>
    <div>
      <div class="banner" @click="bannerGoTo" v-if="topBanner">
        <img :src="apiImg + topBanner.image" alt="">
      </div>
      <div class="article">
        <div class="navigation">
          <ul>
            
            <li v-if="labelData.label && labelheadr == 0">资讯/></li>
            <li v-else-if="labelData.label && labelheadr == 1">赛事/></li>
            <li v-else-if="labelData.label && labelheadr == 2">EST专区/></li>
            <li v-else @click="jump({type:'home'})">首页 /></li>
            <!-- <li v-if="articleClassify.name" @click="jump({type:'home'})"> {{articleClassify.name}}</li> -->
            <li @click="jump({type:'newsList'})" v-if="labelData.label">{{labelData.label}}/> </li>
            <li>正文</li>
          </ul>
          <div></div>
        </div>
        <h2>{{article.title}}</h2>
        <p>{{article.update_time}}<span>{{article.source}}</span></p>
        <div class="details" v-html="article.content">
          <!-- 啊手动阀打发 <p>asdfasdf</p><img src="../../../static/img/loginTitle.png"> -->
        </div>
        <div class="behavior">
          <ul>
            <li @click="previous({type:'previous',})">
              <!-- <router-link :to="{path: '/newsDetail', query: {id:lastContent.id,labelId:lastContent.label_id,type:lastContent.type}}" @click.native="shuaxin()"> -->
              上一篇：{{article.lastData.title}}
              <!-- </router-link> -->
            </li>
            <li @click="previous({type:'next',})">
              <!-- <router-link :to="{path: '/newsDetail', query: {id:nextContent.id,labelId:nextContent.label_id,type:nextContent.type}}" @click.native="shuaxin()"> -->
              下一篇：{{article.nextData.title}}
              <!-- </router-link> -->
            </li>
          </ul>
          <div class="like" @click="likeCli()">
            <img src="../../../static/img/icon_news_finger.png">
            <span v-show="isLike" class="isLike">已赞</span>
            <span v-show="!isLike" class="isLike">赞</span>
            <span class="num">{{article.praise}}</span>
          </div>
          <div class="behaviorR">

            <div @click="Collected()"
                 :class="{ 'collected': collected}"
                 class="collection">
              <div :style="{backgroundImage: 'url('+ httpImg + 'icon_star_black.png)'}" class="logo"></div>
              <span v-if="!collected">收藏</span>
              <span v-else>已收藏</span>
            </div>

            <div>
              <span>分享：</span>
              <img src="../../../static/img/log_qq_hoverActive.png"
                   @click="share({title:article.title,type:'qqfriends',image:apiImg+article.image,remark:article.remark,source:article.source})">
              <img src="../../../static/img/log_blog_hoverActive.png"
                   @click="share({title:article.title,type:'sina',image:apiImg+article.image})">
            </div>
          </div>
        </div>
        <h3>推荐文章</h3>
        <div class="swiper-container homeBaner">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in tuiData">
              <router-link :to="{path: '/newsDetail', query: {id:item.id,labelId:item.label_id,type:type}}"
                           @click.native="shuaxin()">
                <img :src="apiImg+item.image" alt="">
                <p>{{item.title}}</p>
              </router-link>
            </div>
            <div class="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    inject: ['reload'],
    data() {
      return {
        // http:'https://www.quatechschool.com:8080/kksy', //图片前缀
        ads: [],
        sessionId: '',
        labelName: '', //标题
        apiImg: this.$httpImg,
        id: '', //文章的id
        labelId: '',
        type: '', //文章的类型
        article: {
          lastData: {
            title: '',
          },
          nextData: {
            title: '',
          },
        },//文章对象
        lastContent: '',//上一篇文章内容
        nextContent: '',//下一篇文章的内容
        tuiData: '',//获取推荐文章
        // apiImg:this.$api,//网络图片前缀
        httpImg: this.global.httpImg, //全局的图片路径
        isLike: false,
        collected: false, //是否收藏
        topBanner: '',
        articleClassify: {},
      }
    },
    mounted: function () {
      let that = this;
      let sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      let labelData = that.labelData;
      console.log(labelData,'labelData');
      
      this.articleClassify = this.$store.state.articleClassify;
      that.sessionId = sessionId;
      // console.log(that.labelData,112)

      //请求文章详情
      that.labelId = that.$route.query.labelId;
      that.id = that.$route.query.id;
      that.type = 0;
      that.getArticleDetails();

      labelData.labelSon == '' ? that.labelName = labelData.label : that.labelName = labelData.labelSon;
       //console.log(that.labelName,118)

      this.getBanner();

      //请求推荐文章
      that.$http.get(that.$api + "/information/recommend").then((res) => {
        console.log('%c 推荐文章', 'color:green', res)
        that.tuiData = res.data.data;
        new Swiper('.homeBaner', {
          paginationClickable: true,
          slidesPerView: 4,
          loop: true
        })
      })
      // that.share();
    },

    components: {},
    computed: {
      ...mapState([
        "labelData",
        "labelheadr"
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
            type: 3,
            sessionId: this.sessionId,
          }
        }).then(res => {
          console.log('banner------', res);
          this.topBanner = res.data.data[0];
        })
      },
      //获取文章详情
      getArticleDetails({} = {}) {
        const that = this;
        that.$http.get(that.$api + "/information/detail?sessionId=" + that.sessionId + "&id=" + that.id + "&labelId=" + that.labelId + "&type=" + that.type).then((res) => {
          console.log('%c 文章详情', 'color:green', res)
          let article = res.data.data;
          article.lastData === null ? article.lastData = '' : ''; //判空处理
          article.nextData === null ? article.nextData = '' : '';
          if (that.sessionId != '') {
            article.isCollect == 0 ? that.collected = false : that.collected = true; //获取收藏状态
            article.isPraise == 0 ? that.isLike = false : that.isLike = true; //获取点赞状态
          }
          that.article = article;
          Vue.set(that.article)
          console.log(that.article, 105)
        }).catch(function (error) {
          for (status in error.response) {
            const err = error.response.status;
            if (err == 400) {
              that.$layer.msg("请求错误，请重新进来 o(╥﹏╥)o")
            } else if (err == 500) {
              that.$store.dispatch('sendTips', {
                isTip: true, content: '请先登录'
              });
            }
          }
        })
      },


      likeCli() {
        const that = this;
        let praise = that.article.praise; //点赞数量
        if (that.sessionId != '') {
          //点赞接口
          that.$http.get(that.$api + "/information/savePraise", {
            params: {
              sessionId: that.sessionId,
              informationId: that.id,
            }
          }).then((res) => {
            console.log(res, 182)
            that.getArticleDetails();
            that.article.praise = praise;
            that.$store.dispatch('sendTips', {
              isTip: true, content: res.data.desc
            });
          })
        } else {
          that.$store.dispatch('sendTips', {
            isTip: true, content: '请先登录'
          });
        }

      },
      jump({
             type = ''
           } = {}) {
        const that = this;
        if (type == 'home') {
          that.$router.push({
            path: 'homeContent',
          })
        } else if (type == 'newsList') {
          that.$router.push({
            path: '/newsList',
          })
        }
      },
      // jumpback({
      //         labelId = '',
      //         label = '',
      //       } = {}){
          
      // },
      share({
              type = '',
              title = '',
              image = '',
              remark = '',
              source = '',
            } = {}) {
        const that = this;
        const url = window.location.href;
        source = '来源:' + source;
        if (type == 'qqfriends') {
          let shareqqstring = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&sharesource=qzone&title=${title}&pics=${image}&summary=${source}&desc=${remark}`;
          window.open(shareqqstring, 'newwindow', 'height=600,width=800,top=100,left=100');
        } else if (type == 'sina') {
          let shareSinaString = `http://service.weibo.com/share/share.php?url=${url}&sharesource=weibo&title=${title}&pic=${image}&appkey=2706825840`;
          window.open(shareSinaString, 'newwindow', 'height=600,width=800,top=100,left=100');
        }
      },
      //上一篇,下一篇
      previous({
                 type = "",
                 id = '',
                 labelId = ''
               } = {}) {
        const that = this;
        if (type == 'previous') {
          let lastData = that.article.lastData;
          if (lastData == '') {
            return;//如果等于空
          }
          id = lastData.id;
          labelId = lastData.label_id;
          type = lastData.type;
        } else {
          let nextData = that.article.nextData;
          console.log(nextData)
          if (nextData == '') {
            return;//如果等于空
          }
          console.log(nextData.id, nextData.label_id, nextData.type)
          id = nextData.id;
          labelId = nextData.label_id;
          type = nextData.type;
        }
        console.log(id, labelId, type)
        // return;
        type == null ? type = 0 : '';
        that.$router.push({
          path: 'newsDetail',
          query: {
            id: id,
            labelId: labelId,
            type: type
          },
        })
        that.shuaxin();
      },
      //加入收藏的接口
      Collected() {
        const that = this;
        const sessionId = that.sessionId;
        if (sessionId == '') {
          this.$store.dispatch('sendTips', {
            isTip: true, content: '请先登录'
          });
          return;
        }
        //收藏文章
        that.$http.get(that.$api + "/information/saveCollect", {
          params: {
            sessionId: that.sessionId,
            informationId: that.id
          }
        }).then((res) => {
          // console.log('%c 收藏','color:green',res)
          // that.$layer.msg(res.data.desc)
          if (res.data.desc == '取消收藏') {
            that.collected = false;
          } else {
            that.collected = true;
          }
          this.$store.dispatch('sendTips', {
            isTip: true, content: res.data.desc
          });
        })
      },
      shuaxin() {
        this.$router.go(0)
        this.reload();
      },
    },
    watch: {
      "$store.state.articleClassify": {
        handler: function () {
          this.articleClassify = this.$store.state.articleClassify;
        },
        deep: true,
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  section {
    margin: 62px 0 0 0;
    padding: 6px 0 0 0;
    min-height: 84%;
    & > div {
      width: 1200px;
      margin: 0 auto 100px auto;
      padding-top: 30px;
      .banner {
        height: 97px;
        background-size: 100% 100%;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
        text-align: center;
        background-color: #fff;
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .article {
        box-sizing: border-box;
        padding: 100px 50px 0 50px;
        background-color: white;
        position: relative;
        .navigation {
          min-width: 296px;
          height: 58px;
          line-height: 58px;
          background-image: url("../../../static/img/bg_news_header_blue.png");
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0;
          ul {
            @include ibMid();
            min-width: 238px;
            padding: 0 20px;
            font-size: 0;
            text-align: center;
            background: #49BCFD;
            li {
              @include ibMid();
              cursor: pointer;
              font-size: 14px;
              //max-width:60px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
          div {
            @include ibMid();
            width: 58px;
            height: 58px;
            float: right;
            background-image: url("../../../static/img/bg_news_header_blue.png");
            background-size: 100% 100%;
          }
        }

        & > h2 {
          font-size: 36px;
          font-family: MicrosoftYaHei-Bold;
          text-align: center;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 26px;
        }
        & > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(192, 192, 192, 1);
          margin-bottom: 10px;
          span {
            margin-left: 23px;
          }
        }
        .details {
          box-sizing: border-box;
          padding: 38px 7px 38px 7px;
          border-top: 1px solid #F2F2F2;
          border-bottom: 1px solid #F2F2F2;
          overflow: hidden;
          line-height:2;
        }
        .behavior {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > ul {
            li {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              color: rgba(141, 141, 141, 1);
            }
          }
          .like {
            width: 142px;
            height: 56px;
            line-height: 56px;
            cursor: pointer;
            text-align: center;
            background-image: url('../../../static/img/likeBg.png');
            background-size: 100% 100%;
            font-size: 0;
            img {
              width: 24px;
              height: 24px;
              @include ibMid();
            }
            .isLike {
              margin: 0 0 0 9px;
            }
            .num {
              font-size: 16px;
              float: right;
              margin-right: 20px;
            }
            span {
              font-size: 18px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(255, 254, 254, 1);
              @include ibMid();

              @include clearFloat();

            }
          }
          .behaviorR {
            .collection {
              font-size: 0;
              margin: 18px 0 50px 0;
              cursor: pointer;
              &:hover .logo {
                background-image: url('../../../static/img/icon_star_yellow.png') !important;
              }
              & > div {
                width: 18px;
                height: 16px;
                margin-right: 4px;
                @include ibMid();
                background-size: 100% 100%;
              }
              span {
                font-size: 14px;
                @include ibMid();
              }
              &:nth-of-type(1) {
                width: 107px;
                height: 39px;
                line-height: 39px;
                text-align: center;
                background: rgba(255, 255, 255, 0);
                border: 1px solid rgba(56, 68, 78, 1);
                border-radius: 20px;
                margin-bottom: 11px;
                img {
                  margin-right: 4px;
                  &:last-child {
                    margin-right: 0;
                  }
                }
                &:hover {
                  border: 1px solid #F5A623 !important;
                  color: #F5A623 !important;
                }
              }
            }
            .collected {
              .logo {
                background-image: url('../../../static/img/icon_star_bule.png') !important;
              }
              border: 1px solid #49BDFF !important;
              color: #49BDFF !important;
            }
            div:nth-of-type(2) {
              font-size: 0;
              span {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                @include ibMid();
              }
              img {
                width: 34px;
                height: 34px;
                cursor: pointer;
                @include ibMid();
                &:nth-of-type(2) {
                  margin: 0 8px 0 10px;
                }
              }
            }
          }
        }
        & > h3 {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(8, 8, 8, 1);
          margin-bottom: 22px;
        }
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }

  .swiper-slide {
    position: relative;
    background-size: 100% 100%;
  }

  .homeBaner {
    background: white;
  }

  .homeBaner .swiper-slide {
    width: 250px !important;
    margin-right: 30px;
    height: 230px;
  }

  .swiper-slide {
    font-size: 0;
    a {
      img {
        width: 100%;
        height: 160px;
        &:hover {
          opacity: 0.85;
        }
      }
      p {
        font-size: 15px;
        box-sizing: border-box;
        padding: 12px 6px 0 6px;
        margin-bottom: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(122, 122, 122, 1);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        &:hover {
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
</style>
