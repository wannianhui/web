<template>
  <section style="min-height: 100%;margin-bottom:100px;">
    <globalSwiper></globalSwiper>
    <div class="content">
      <div class="classification">
        <ul>
          <li :class="(sortAvtive==index)&&(index!=4)?'sortAvtive':(sortAvtive==index)&&(index==4)?'sortLastActive':''"
            v-for="(item,index) in newsSortList" v-if="item.hide" @click="changeSortNews(index)" :key="index">{{item.name}}
          </li>
        </ul>
      </div>

      <div class="posts">
        <article class="left">
          <ul>
            <li v-for="(postsShow,index) in postsShow" :key="index">
              <div>
                <el-image :src="apiImg+postsShow.image">
                  <div slot="error" class="image-slot default">
                    <img src="@/assets/robot.png" alt="">
                  </div>
                </el-image>
                <!--v-real-img="defaultImg"-->
              </div>
              <div>
                <h2>
                  <router-link @click.native="goTextDetail"
                    :to="{path: '/newsDetail', query: {id:postsShow.id,labelId:postsShow.label_id,type:postsShow.type}}">
                    {{postsShow.title}}
                  </router-link>
                </h2>
                <p>{{postsShow.remark}}</p>
                <ul>
                  <li class="postsAvatar"><img :src="apiImg+head_image" alt="logo"><span>{{postsShow.author}}</span>
                  </li>
                  <li><img src="../../../static/img/icon_eye.png" alt=""><span>{{postsShow.playback}}浏览</span></li>
                  <li><img src="../../../static/img/icon_finger.png" alt=""><span>{{postsShow.praise}}赞</span></li>
                  <li><img src="../../../static/img/icon_time.png" alt=""><span>{{postsShow.create_time}}</span></li>
                </ul>
              </div>
              <ul>
                <li><img src="../../../static/img/logo_product.png" alt=""
                    v-show="postsShow.is_relevant_product_specialist==1"></li>
                <li><img src="../../../static/img/logo_aut.png" alt=""
                    v-show="postsShow.is_official_certification_specialist==1"></li>
                <li><img src="../../../static/img/logo_vip.png" alt="" v-show="postsShow.is_v_i_p_member==1"></li>
              </ul>
            </li>
          </ul>
          <div @click="moreList()" v-show="openMoreShow">
            查看更多
          </div>
        </article>
        <article class="right">
          <div class="hotPost">
            <div class="hotTilte"><span>论坛热帖</span><span>
                <router-link to="/forumCenter">更多</router-link>
              </span></div>
            <ul>
              <li v-for="(item,index) in hotPost" v-if="index<6"
                @click="item.state==1?fufeiData=item:'',postDetail({topicId:item.id,state:item.state,isOrderTopic:item.isOrderTopic})" :key="index">
                <el-image :src="apiImg+item.image1" style="width: 75px;height: 56px;float: left;">
                  <div slot="error" class="image-slot default">
                    <img src="@/assets/robot.png" alt="">
                  </div>
                </el-image>
                <!-- <img :src="apiImg+hotPost.image1" alt=""> -->
                <!--v-real-img="defaultImg"-->
                <div>
                  <p>{{item.title}}</p>
                  <ul>
                    <li><img src="../../../static/img/icon_comment.png" alt=""><span>{{item.comment_number}}</span>
                    </li>
                    <li><img src="../../../static/img/icon_finger.png" alt=""><span>{{item.praise}}</span></li>
                    <li v-show="item.state==1"><img src="../../../static/img/icon_bean.png"
                        alt=""><span>{{item.price}}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <ul class="promotion" v-if="topBanner">
            <li @click="bannerGoTo" v-for="(item,index) in topBanner" :key="index">
                <el-image :src="apiImg + item.image" class="elimg">
                    <div slot="error" class="image-slot default">
                      <img src="@/assets/robot.png"  alt="">
                    </div>
                </el-image>
              <!-- <img :src="apiImg + item.image" alt=""> -->
            </li>
          </ul>
        </article>
      </div>

      <div class='payLedou' v-show="isPayLd">
        <div>
          <h3><span>购买优质产品资讯，获取精彩内容</span><img src='../../../static/img/icon_cancle_card_black.png' alt=""
              @click="payLedou('close')"></h3>
          <div>
            <p>该产品为付费产品，支付<span>{{fufeiData.price}}乐豆</span>后，即可阅读</p>
            <input type="password" placeholder="请输入密码" v-model="ledouInput">
            <button @click="payLedou('confirm')">确 定</button>
            <router-link :to="{path: '/setting', query: {pay:0}}">
              <h4>忘记密码？</h4>
            </router-link>
          </div>
        </div>
      </div>
      <div id="login-btn" style="display: none;"></div>
    </div>
  </section>
</template>

<script>
  import globalSwiper from '../../common/globalSwiper';
  import common from '../../common/common';
  import {
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        sessionId: '',
        postsShow: [], //实际展示的列表
        isPayLd: false, //是否支付乐豆
        ledou: '', //乐豆的数量
        fufeiData: '', //要付费的帖子
        ledouInput: '', //乐豆的输入框
        pageNumber: 1, //新闻列表的页码
        hotPostShow: [], //热门帖子
        httpImg: this.global.httpImg, //全局的图片路径
        apiImg: this.$httpImg, //网络图片前缀
        // apiImg:"https://mingze.oss-cn-shenzhen.aliyuncs.com",
        sortAvtive: 0, //一开始默认是0
        // openAllNews:false, //打开新闻
        openMoreShow: false, //打开更多按钮
        tuiShow: '', //首页推荐文章
        userInfo: '', //用户信息
        newsSortList: [ //新闻分类列表
          {
            "id": 0,
            "name": "最新排名",
            "hide": true,
          },
          {
            "id": 1,
            "name": "行业推荐",
            "hide": true,
          },
          {
            "id": 2,
            "name": "热门竞赛",
            "hide": true,
          },
          {
            "id": 3,
            "name": "EST推荐",
            "hide": true,
          },
          {
            "id": 4,
            "name": "我的专属",
            "hide": false,
          },

        ],
        topicId: '',
        //热门帖子
        hotPost: [],
        wxCode: '',
        topBanner: '',
        defaultimg:'@\assets\robot.png',
      }
    },
    mounted: function () {
      let that = this;
      that.defaultImg = common.defaultImg;
      that.defaultUser = common.defaultUser;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.head_image = that.appInfo.head_image;
      that.appid = 'wx50c84bbe29aee0bf'; //微信开放平台appid
      that.secret = 'db60a5f9c17c2deef4d63e64f146f2aa'; //微信开放平台secret

      this.getBanner();

      let wxCode = that.GetQueryString("code");
      let url = window.location.href;
      if (url.indexOf('access_token') != -1) { //获取qq授权返回的token
        let accessToken = url.match(/access_token=(\S*)&expires_in/)[1];

        QC.Login({
            btnId: 'login-btn'
          },
          function (reqData, opts) {
            //根据返回数据，更换按钮显示状态方法
            //注意:传入此方法则需要自己渲染按钮
            that.$http.get(that.$api + "/user/qqLogin", {
              params: {
                accessToken: accessToken,
                head: reqData.figureurl_2,
                nick: reqData.nickname,
              }
            }).then((res) => {
              // console.log('%c 三方登录返回结果','color:green',res);
              that.$layer.msg(res.data.desc)
              if (res.data.code === 1 && res.data.desc === '登录成功') {
                that.$store.dispatch('isLogin', true); //在vuex记录登录状态
                that.$store.dispatch('userInfo', res.data.data)
                sessionStorage.setItem("sessionId", res.data.data.sessionId); //存储sessionId
              } else {
                that.$router.push({
                  path: 'bindMobile',
                  query: {
                    accessToken: accessToken,
                    weChatId: '',
                    head: reqData.figureurl_2,
                    nick: reqData.nickname,
                    type: 1
                  }
                })
              }
            }).catch(function (error) {});
          },
          function (opts) {
            console.log('QQ登录 注销成功 !')
          }
        )


      }
      if (wxCode != '') {
        that.$http.get(that.$api + "/user/microLetterLogin", {
          params: {
            weChatId: wxCode,
          }
        }).then((res) => {
          // console.log('%c 微信登录返回id', 'color:green', res, 153);
          if (res.data.code == 1) {
            if (typeof (res.data.data) == 'string' && res.data.data.indexOf('openid') != -1) { //请先绑定手机号码
              let openid = res.data.data;
              openid = openid.replace(/\"/g, "");
              openid = openid.replace(/\{openid:/g, "");
              openid = openid.replace(/\}/g, "");
              that.$router.push({
                path: 'bindMobile',
                query: {
                  accessToken: '',
                  type: 0,
                  weChatId: openid,
                }
              })
            } else if (res.data.desc === '登录成功') {
              sessionStorage.setItem("sessionId", res.data.data.sessionId); //存储sessionId
              that.$store.dispatch('userInfo', res.data.data)
              that.$store.dispatch("isLogin", true); //在vuex记录登录状态
            }

          }
          //
        }).catch(function (error) {
          that.$layer.msg(error)
        });
      }

      // 微博登录
      let wbCode = this.$route.query.code;
      console.log('-----------', wxCode)
      if (wbCode) {
        this.$http.get(this.$api + '/user/microblogLogin', {
          params: {
            code: wbCode,
          }
        }).then(res => {
          if (res.data.desc === '请先绑定手机号码') {
            this.$router.push({
              path: '/bindMobile',
              query: {
                nick: res.data.data.nick,
                head: res.data.data.head,
                microBlogId: res.data.data.uid,
                type: 2,
              }
            })
          } else {
            sessionStorage.setItem("sessionId", res.data.data.sessionId); //存储sessionId
            that.$store.dispatch('userInfo', res.data.data)
            that.$store.dispatch("isLogin", true); //在vuex记录登录状态
          }
          console.log('微博登录-----', res)
        })
      }

      if (that.hotPostLbs.length === 0) {
        that.getHotPost();
      } else {
        that.hotPost = that.hotPostLbs;
      }
      if (that.recommendArticle.length === 0) {
        that.getRecommendArticle();
      } else {
        that.tuiShow = that.recommendArticle;
      }

      that.articleList(); //刷新页面，默认取最新排名的数据

      this.userInfo = this.$store.state.userInfo;
      this.userInfo.is_v_i_p_member === 1 || this.userInfo.is_relevant_product_specialist === 1 ? this.newsSortList[4]
        .hide = true : this.newsSortList[4].hide = false;
    },
    methods: {
      // 跳详情储存分类
      goTextDetail() {
        let obj = this.newsSortList[this.sortAvtive];
        this.$store.state.articleClassify = obj;
      },
      // 顶部banner点击跳转
      bannerGoTo() {
        let data = this.topBanner;
        for(var i in data){
          if (data[i].type === 1) { //跳文章详情 带information_id
          this.$router.push({
            path: '/newsDetail',
            query: {
              id: data[i].information_id,
              labelId: 10118
            }
          })
        } else if (data[i].type === 2) { //跳url
          window.open(data[i].url);
        } else if (data[i].type === 3) { //跳帖子详情 带topic_id
          this.$router.push({
            path: '/postDetail',
            query: {
              topicId: data[i].topic_id
            }
          })
        }
        }
      },
      // 获取页面顶部广告banner
      getBanner() {
        this.$http.get(this.$api + '/adv/adv/list', {
          params: {
            type: 1,
            sessionId: this.sessionId,
          }
        }).then(res => {
          console.log('banner------', res);
          this.topBanner = res.data.data;
        })
      },
      //
      GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      //获取热门帖子
      getHotPost() {
        const that = this;
        that.$http.get(that.$api + "/topic/listHot", {
          params: {
            sessionId: that.sessionId,
          }
        }).then((res) => {
          console.log('%c 首页热门帖子', 'color:green', res);
          let list = res.data.data;
          that.hotPost = list;
          that.$store.dispatch('hotPostLbs', list);
        }).catch(function (error) {
          that.$layer.msg(error)
        });
      },
      //获取首页推荐文章
      getRecommendArticle() {
        const that = this;
        that.$http.get(that.$api + "/information/recommend").then((res) => {
          // console.log('%c 首页推荐文章', 'color:green', res);
          let list = res.data.data;
          that.tuiShow = list;
          that.$store.dispatch('recommendArticle', list);
        }).catch(function (error) {
          that.$layer.msg(error)
        });
      },
      postDetail({
        topicId = '',
        state = '',
        isOrderTopic = '',
      } = {}) { //跳转到论坛详情
        let that = this;
        that.topicId = topicId;
        if (state == 0) { //免费
          let href = that.$router.resolve({
            path: 'postDetail',
            query: {
              topicId: topicId
            },
          })
          window.open(href.href, '_blank');
        } else {
          if (isOrderTopic == 0) {
            that.isPayLd = true;
          } else {
            let href = that.$router.resolve({
              path: 'postDetail',
              query: {
                topicId: topicId
              },
            })
            window.open(href.href, '_blank');
          }
        }
      },
      changeSortNews(index) { //点击改变新闻分类
        if (index != this.sortAvtive) {
          const that = this;
          that.sortAvtive = index; //保存type的值
          that.postsShow = ''; //列表数据清空
          // that.openMoreShow = true; //切换专区时，打开更多按钮
          that.articleList({
            type: index
          });
        }

      },

      moreList() { //更多列表
        const that = this;
        const type = that.sortAvtive;
        // let pageNumber = that.pageNumber;
        that.pageNumber+=1; //先++再判断
        that.articleList({
          type: type,
          pageNumber: that.pageNumber
        })
      },
      //进入帖子详情时的验证
      enterPost(ledou) {
        if (ledou != 0) {
          // alert("请登录")
          if (this.isLogin == false) {
            this.$store.dispatch('sendTips', {
              isTip: true,
              content: '请先登录'
            });
          } else {
            this.isPayLd = true;
            this.ledou = ledou;
          }
        } else {
          this.$router.push({
            path: 'postDetail',
          })
        }
      },
      //是否支付乐豆
      payLedou(operation) {
        let that = this;
        if (operation == 'close') {
          this.isPayLd = false;
        } else if (operation == 'confirm') {
          that.$http.get(that.$api + "/order/saveTopic?", {
            params: {
              sessionId: that.sessionId,
              topicId: that.topicId,
              password: that.ledouInput
            }
          }).then((res) => {
            // console.log('%c 支付乐豆阅读帖子', 'color:green', res);
            this.$store.dispatch('sendTips', {
              isTip: true,
              content: res.data.desc
            });
            if (res.data.code == 1) {
              //支付乐豆成功之后，更新右上角的信息金额
              this.$event.$emit("integral");
              that.$router.push({
                path: 'postDetail',
                query: {
                  topicId: that.topicId
                },
              })
            } else {
              that.$layer.msg(res.data.desc);
              if (res.data.desc == "请设置支付密码") {
                that.$router.push({ //跳转到设置密码页面
                  path: 'setting',
                  query: {
                    pay: 0
                  },
                })
              }
            }
          }).catch(function (error) {
            that.$layer.msg(error)
          });
        }
      },
      //获取文章列表
      articleList({
        type = 0,
        pageNumber = 1,
        pageSize = 10,
      } = {}) {
        const that = this;
        let realList = that.postsShow;
        if (type == 4) {
          if (!that.sessionId) {
            that.$router.push({
              path: 'login'
            })
          }
        }
        // 获取新闻列表 最新排名
        that.$http.get(
          `${that.$api}/information/pageHome?sessionId=${that.sessionId}&pageNumber=${pageNumber}&pageSize=${pageSize}&type=${type}`
          ).then((res) => {
          console.log(res.data, "获取列表");

          // console.log('%c 获取新闻列表数据', 'color:green', res.data.data, type);
          let resData = res.data.data;
          let list = resData.list;
          if (resData.totalRow > (pageNumber * pageSize)) { //对更多进行判定
            that.openMoreShow = true;
          } else {
            that.openMoreShow = false;
          }
          if (list.length === 0) {
            that.$store.dispatch('sendTips', {
              isTip: true,
              content: '没有更多了哦！'
            });
            // that.openMoreShow = false;
            return;
          }
          list.forEach(function (value, index, array) { //手动把type带动文章列表那里
            array[index].type = type;
          });
          if (pageNumber != 1) {
            list.forEach(function (value, index, array) {
              realList.push(array[index]);
            });
            list = realList;
          }
          that.postsShow = list;
        }).catch(function (error) {
          that.$layer.msg(error); //提示报错信息
        });
      },
    },
    components: {
      globalSwiper,
    },
    computed: {
      ...mapState([
        "isLogin",
        "sendTips",
        "hotPostLbs",
        "recommendArticle",
        "appInfo"
      ])
    },
  }

</script>

<style scoped lang="scss">
  @import "../../common/common.scss";


  .disNone {
    display: none;
  }

  .payLedou {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);

    &>div {
      width: 334px;
      height: 229px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 40px 0px rgba(63, 63, 63, 0.71);
      box-sizing: border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      font-family: MicrosoftYaHei;

      &>h3 {
        height: 44px;
        line-height: 44px;
        background: rgba(255, 181, 58, 1);
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: relative;

        &>img {
          cursor: pointer;
          width: 15px;
          height: 15px;
          position: absolute;
          right: 15px;
          top: 15px;
        }
      }

      &>div {
        height: 185px;
        padding: 15px 20px 20px 20px;
        box-sizing: border-box;

        &>p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          &>span {
            color: #E43D3D;
          }
        }

        &>input {
          border: none;
          outline: none;
          width: 280px;
          height: 44px;
          box-sizing: border-box;
          padding: 16px 11px;
          background: rgba(242, 242, 242, 1);
          margin: 17px 0 17px 0;
        }

        &>button {
          border: none;
          outline: none;
          width: 60px;
          height: 30px;
          background: rgba(73, 189, 255, 1);
          border-radius: 2px;
          color: white;
          cursor: pointer;
          display: block;
          float: right;
        }

        h4 {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(141, 141, 141, 1);
          cursor: pointer;
          float: left;
          margin: 5px 0 0 7px;

          &:hover {
            color: #333333;
          }
        }
      }

    }
  }

  .content {
    width: 1200px;
    margin: 0 auto;

    .classification {
      height: 80px;
      position: relative;

      &>ul {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        li {
          width: 135px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          color: #8D8D8D;
          background: white;
          margin-right: 26px;
          cursor: pointer;
          float: left;

          &:hover {
            background: #4abdff;
            color: #fff;
          }

          &:nth-child(5) {
            margin-right: 0;
            box-sizing: border-box;
            border: 1px solid #33d8b3;
            color: #33d8b3;
            height: auto;

            &:hover {
              background: #33d8b3;
              color: white;
            }
          }
        }

        .sortAvtive {
          color: white;
          background: #4abdff;
        }

        .sortLastActive {
          background: #33d8b3;
          color: white !important;
        }

        @include clearFloat();
      }
    }

    .posts {
      .left {
        width: 884px;
        float: left;
        margin-bottom: 43px;

        &>ul {
          background: white;
          box-sizing: border-box;
          padding-left: 20px;

          &>li {
            height: 180px;
            margin: 0;
            position: relative;
            padding: 20px 27px 0 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #EFF3F5;

            &>div {
              &:nth-of-type(1) {
                position: absolute;
                left: -20px;
                top: 0;
                padding: 20px 20px 23px 20px;
                float: left;

                &>img {
                  width: 200px;
                  height: 136px;
                }

                &>div {
                  background-size: 100% 100%;
                  width: 200px;
                  height: 136px;

                  &:hover {
                    opacity: 0.9;
                  }
                }

              }

              &:nth-of-type(2) {
                float: right;
                width: 616px;
                color: #8D8D8D;
                padding: 0 5px;
                box-sizing: border-box;

                h2 {
                  font-size: 16px;
                  height: 24px;
                  overflow: hidden;

                  a {
                    color: #333333;

                    &:hover {
                      color: #49BDFF;
                    }
                  }
                }

                p {
                  @include multiLineOF();
                  height: 58.8px;
                  line-height: 2em;
                }

                ul {
                  font-size: 0;

                  .postsAvatar {
                    img {
                      width: 22px;
                      height: 22px;
                      border-radius: 50%;
                      vertical-align: middle;
                    }
                  }

                  li {
                    margin-right: 20px;
                    @include ibMid();

                    img {
                      @include ibMid();
                      width: 16px;
                      height: 16px;
                      margin-right: 6px;
                      vertical-align: top;
                    }

                    span {
                      font-size: 12px;
                      @include ibMid();
                    }

                    &:last-child {
                      margin-right: 0;
                    }
                  }
                }
              }

              @include clearFloat();
            }

            &>ul {
              position: absolute;
              right: 30px;
              top: 0;

              li {
                float: left;
                margin-right: 5px;

                img {
                  width: 28px;
                  height: 45px;
                }

                &:last-child {
                  margin-right: 0;
                }
              }

              @include clearFloat();
            }

          }
        }

        &>div {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: white;
          text-align: center;
          background: #49BDFF;
          margin-top: 6px;
          cursor: pointer;
        }
      }

      .right {
        width: 306px;
        float: right;
        box-sizing: border-box;
        padding: 0 2px;

        .hotPost {
          background: white;

          .hotTilte {
            width: 284px;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 14px 0 17px 14px;
            border-bottom: 1px solid #E5E5E5;

            span {
              &:nth-of-type(1) {
                font-size: 16px;
                color: #333333;
                @include ibMid();
              }

              &:nth-of-type(2) {
                font-size: 14px;
                color: #8D8D8D;
                float: right;
                @include ibMid();

                a {
                  color: #8D8D8D;
                }
              }

              @include clearFloat();
            }
          }

          &>ul {
            margin: 9px 0 0 0;
            padding: 0 2px 9px 2px;
            box-sizing: border-box;

            &>li {
              box-sizing: border-box;
              padding: 7px 20px 7px 24px;
              cursor: pointer;

              // &>a {
              //   display:block;
              //   height:100%;
              &>img {
                width: 75px;
                height: 56px;
                float: left;

                &:hover {
                  opacity: 0.85;
                }
              }

              &>div {
                float: right;
                width: 172px;

                p {
                  color: #333;
                  font-size: 14px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                &>ul {
                  font-size: 0;
                  margin-top: 14px;

                  li {
                    margin-right: 16px;
                    @include ibMid();
                    color: red;

                    &:nth-of-type(3) {
                      span {
                        color: #E43D3D;
                      }
                    }

                    img {
                      width: 16px;
                      height: 16px;
                      vertical-align: top;
                      margin-right: 3px;
                    }

                    span {
                      color: #C0C0C0;
                      font-size: 12px;
                      @include ibMid();

                    }

                    &:last-child {
                      margin-right: 0;
                    }
                  }

                }
              }

              @include clearFloat();

              // }
              &:hover {
                background: #EBEFF2;
              }
            }
          }
        }
        
        .promotion {
          margin-top: 10px;
          
          li {
            background-size: 100% 100%;
            /* height: 146px; */
            width: 306px;
            height: 146px;
            margin-bottom: 10px;
            position: relative;
            .elimg{
              width: 306px;
              height: 146px;
            }
            img {
              width: 306px;
              height: 146px;
            }

            &:last-child {
              margin-bottom: 0;
            }

            a {
              display: block;
              height: 100%;
            }

            p {
              width: 100%;
              height: 35px;
              line-height: 35px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              box-sizing: border-box;
              padding-left: 15px;
              position: absolute;
              bottom: 0;
              color: white;
              font-size: 14px;
              background: rgba(50, 50, 50, 0.2);
            }
          }
        }

      }

      @include clearFloat();
    }
  }

</style>
