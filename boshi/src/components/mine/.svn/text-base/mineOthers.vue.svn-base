<template>
  <section>
    <div class="banner">
      <img :src="userDatas.userExtend.background==null?defaultBackground:userDatas.userExtend.background">
    </div>
    <div class="container">
      <img :src="userDatas.userExtend.head==null?defaultUser:apiImg+userDatas.userExtend.head" alt="">
      <div class="infoList">
        <ul>
          <li>积分：{{userDatas.userExtend.integral}}</li>
          <li>签到：{{userDatas.userExtend.sign_in}}天</li>
          <li>等级：{{userDatas.userExtend.age}}</li>
        </ul>
        <ol>
          <li>关注：{{userDatas.userExtend.follow}}</li>
          <li>粉丝：{{userDatas.userExtend.fans}}</li>
        </ol>
      </div>
      <div class="data">
        <ul>
          <li v-if="userDatas.is_v_i_p_member==1">
            <img src="../../../static/img/icon_man_aut_gray1.png" alt="会员VIP" title="会员VIP" @click="jump(9,'vip')">
          </li>
          <li v-if="userDatas.is_official_certification_specialist==1">
            <img src="../../../static/img/icon_man_aut_gray2.png" alt="官方认证人员" title="官方认证人员"
                 @click="jump(9,'official')">
          </li>
          <li v-if="userDatas.is_relevant_product_specialist==1">
            <img src="../../../static/img/icon_man_aut_gray3.png" alt="产品专员" title="产品专员" @click="jump(9,'product')">
          </li>
        </ul>
        <h3>{{userDatas.userExtend.nick}}</h3>
        <button @click="attention({byUserId:userDatas.userExtend.user_id})"><span
          v-show="userDatas.userExtend.isFollow==1">取消关注</span><span v-show="userDatas.userExtend.isFollow==0">关注</span><span
          v-show="userDatas.userExtend.isFollow==2">已互相关注</span></button>
        <ol>
          <li :class="{ 'active': isData}" @click="isDataSe(true)">资料</li>
          <li :class="{ 'active': !isData}" @click="isDataSe(false)">帖子</li>
        </ol>
      </div>
      <div class="infosFlow" v-show='isData'>
        <ul>
          <!-- 基本资料 -->
          <li>
            <h3>基本资料</h3>
            <ol>
              <li>
                <span>用户名</span><span>{{userDatas.userExtend.name || userDatas.userExtend.nick}}</span>
              </li>
              <li>
                <span>邮箱</span><span>{{userDatas.userExtend.email}}</span>
              </li>
              <li>
                <span>性别</span>
                <span v-if="userDatas.userExtend.sex==1">男</span>
                <span v-else-if="userDatas.userExtend.sex==2">女</span>
                <span v-else>无选择</span>
              </li>
              <li>
                <span>注册</span><span>{{userDatas.userExtend.create_time}}</span>
              </li>
              <li>
                <span>签名</span><span>{{userDatas.userExtend.brief}}</span>
              </li>
            </ol>
          </li>
          <!-- 教育背景 -->
          <li>
            <h3>教育背景</h3>
            <ol>
              <li>
                <span>学校机构</span><span>{{userDatas.userExtend.education1}}</span>
              </li>
              <!--<li>-->
                <!--<span>学校机构</span><span>{{userDatas.userExtend.education2}}</span>-->
              <!--</li>-->
            </ol>
          </li>
          <!-- 联系方式 -->
          <li>
            <h3>联系方式</h3>
            <ol>
              <li>
                <span>QQ</span><span>{{userDatas.userExtend.is_q_q_contact==1 ? userDatas.userExtend.q_q_contact : '保密'}}</span>
              </li>
              <li>
                <span>微信</span><span>{{userDatas.userExtend.is_we_chat_contact==1 ? userDatas.userExtend.we_chat_contact : '保密'}}</span>
              </li>
            </ol>
          </li>
          <!-- 官方认证专员 -->
          <li v-if="userDatas.is_official_certification_specialist == 1">
            <h3>官方认证专员</h3>
            <ol>
              <li>
                <span>认证日期</span>
                <span>{{userDatas.ApplyRelevantProductSpecialist.audit_time}}</span>
              </li>
            </ol>
          </li>
          <!-- 产品认证 -->
          <li v-if="userDatas.is_relevant_product_specialist == 1">
            <h3>产品认证</h3>
            <ol v-for="(item,index) in userDatas.listProductSpecialistName"
                style="margin-bottom: 25px;"
                v-show="userDatas.userExtend.is_product_specialist == 1" :key="index">
              <li style="margin-bottom: 10px;">
                <span>名称</span><span>{{item.name}}</span>
              </li>
              <li>
                <span>序列号</span><span>{{item.serial}}</span>
              </li>
            </ol>
            <ol v-show="userDatas.userExtend.is_product_specialist == 0">
              <li>
                <span>保密</span>
              </li>
            </ol>
          </li>
          <!-- VIP专员 -->
          <li v-if="userDatas.is_v_i_p_member == 1">
            <h3>VIP会员</h3>
            <ol v-if="userDatas.userExtend.is_membership == 1">
              <li>
                <span>营业执照</span><span>{{userDatas.membership.business_license}}</span>
              </li>
              <li>
                <span>所售产品</span>
                <span v-for="(item,index) in userDatas.listMembershipProductName"
                      style="margin-right: 20px;" :key="index">{{item.name}}</span>
              </li>
            </ol>
            <ol v-else>
              <li>
                <span>保密</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="postList" v-show='!isData'>
        <p>
          <span :class="{ 'activeSpan': isFree}" @click="isFreeSe(true)">免费</span>
          <span :class="{ 'activeSpan': !isFree}" @click="isFreeSe(false)">收费</span>
        </p>
        <h3>共发表{{postInfo.totalRow}}个帖子</h3>
        <ul>
          <li v-for="(item,index) in postInfo.list" :key="index">
            <a href="javascript:void(0);">
              <img :src="userDatas.userExtend.head==null?defaultUser:apiImg+userDatas.userExtend.head" alt="" @click="postDetail(item.id,item)">
              <div>
                <h3>
                  <span @click="postDetail(item.id,item)">{{item.title}}</span>
                  <p v-if="item.state == 1"><img src="../../../static/img/icon_bean.png"
                                                 alt=""><span>{{item.price}}</span></p>
                </h3>
                <ol>
                  <li>
                    <img src="../../../static/img/user.png" alt="">
                    <span>{{userDatas.userExtend.nick}}</span>
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
            </a>
          </li>
        </ul>
        <div class="pager">
          <v-pagination :total="total" :display="display" :current-page='current'
                        @pagechange="pagechange"></v-pagination>
        </div>
      </div>

      <div class='payLedou' v-show="isPayLd==true">
        <div>
          <h3><span>购买优质产品资讯，获取精彩内容</span><img src="../../../static/img/icon_cancle_card_black.png" alt=""
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

    </div>
  </section>
</template>

<script>
  import pagination from '@/common/pagination';
  import common from '@/common/common';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        total: 0,     // 记录总条数
        display: 0,   // 每页显示条数
        current: 1,   // 当前的页数
        count: '', //传过去的页面数量
        userDatas: {
          userExtend: {
            head: ''
          }
        },
        postInfo: {
          totalRow: 0
        },
        defaultUser: '',
        pageNumber: 1,
        defaultBackground: '',
        isData: true, //默认选中资料
        isFree: true, //默认选中免费
        isAttention: false, //是否关注
        httpImg: this.global.httpImg, //全局的图片路径
        apiImg: this.$httpImg,
        isPayLd: false,
        ledouInput: '',
        fufeiData: '',
        postsShow: '',
        topicId: '',
      }
    },
    mounted: function () {
      let that = this;
      that.defaultUser = common.defaultUser;
      that.defaultBackground = common.defaultBackground;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.byUserId = that.$route.query.byUserId;
      that.getOtherUserInfo();
    },

    components: {
      'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "userInfo",
        "paidPost"
      ])
    },
    methods: {
      //跳转到论坛详情
      postDetail(topicId, item) {
        let that = this;
        if (item.state == 0){
          that.topicId = topicId;
          that.$router.push({
            path: 'postDetail',
            query: {topicId: topicId},
          })
        } else {
          if (item.isOrderTopic == 0) {
            this.topicId = item.id;
            this.isPayLd = true;
          } else {
            that.topicId = topicId;
            that.$router.push({
              path: 'postDetail',
              query: {topicId: topicId},
            })
          }
        }

      },
      //获得他人的资料
      getOtherUserInfo() {
        const that = this;
        that.$http.get(that.$api + "/user/information", {
          params: {
            sessionId: that.sessionId,
            byUserId: that.byUserId,
          }
        }).then((res) => {
          console.log('%c 获取他人资料', 'color:green', res);
          if (res.data.code == 1) {
            that.userDatas = res.data.data;
          }
          let list = res.data.data;

        }).catch(function (error) {

        });
      },
      pagechange: function (currentPage) {
        const that = this;
        that.pageNumber = currentPage;
        that.getPostList({pageNumber: currentPage});
      },
      //查看他人帖子
      getPostList({
                    byUserId = '',
                    pageNumber = 1,
                    pageSize = 10,
                  } = {}) {
        const that = this;
        let state = '';
        that.isFree == true ? state = 0 : state = 1;
        that.$http.get(that.$api + "/topic/pageUser", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            state: state,
            byUserId: that.byUserId
          }
        }).then((res) => {
          console.log('%c 获取帖子列表', 'color:green', res);
          let list = res.data.data;
          that.postInfo = list;
          that.postsShow = list.list;
          that.$store.dispatch('paidPost', list);
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },
      isDataSe(bool) {
        const that = this;

        if (that.isData != bool) {
          that.isData = !that.isData;
          if (that.paidPost.length === 0) {
            that.getPostList();
          } else {
            that.postInfo = that.paidPost;
            that.total = that.paidPost.totalRow;
            that.display = that.paidPost.pageSize;
          }
        }
      },
      isFreeSe(bool) {
        const that = this;
        if (that.isFree != bool) {
          that.isFree = !that.isFree;
          that.getPostList();
        }


      },
      //关注
      attention: function ({
                             byUserId = '',
                           } = {}) {
        const that = this;
        that.$http.get(that.$api + "/user/follow/save", {
          params: {
            sessionId: that.sessionId,
            byUserId: byUserId,
          }
        }).then((res) => {
          console.log('%c 关注接口', ' :green', res);
          let info = '';
          if (res.data == '') {
            info = '已取消关注'
          } else {
            info = '关注成功'
          }
          that.$store.dispatch('sendTips', {isTip: true, content: info});
          that.getOtherUserInfo(); //更新


        }).catch(function (error) {
        });

      },
      //跳转页面
      jump(index, type) {
        this.$store.dispatch('reActive', index);
        this.searchDataShow = false;
        if (index == 9) {
          if (type == 'vip') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 3},
            })
          }
          else if (type == 'official') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 2},
            })
          }
          else if (type == 'product') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 1},
            })
          }

        }
      },
      payLedou(type) {//确定支付
      // alert("mine")
        let that = this;
        if (type == 'close') {
          that.isPayLd = false;
        } else if (type == 'confirm') {
          that.$http.get(that.$api + "/order/saveTopic?", {
            params: {
              sessionId: that.sessionId,
              topicId: that.topicId,
              password: that.ledouInput
            }
          }).then((res) => {
            console.log('%c 支付乐豆阅读帖子', 'color:green', res);
            this.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
            if (res.data.code == 1) {
              that.$router.push({
                path: 'postDetail',
                query: {topicId: that.topicId},
              })
            } else {
              that.$layer.msg(res.data.desc);
              if (res.data.desc == "请设置支付密码") {
                that.$router.push({ //跳转到设置密码页面
                  path: 'setting',
                  query: {pay: 0},
                })
              }
            }
          }).catch(function (error) {
            that.$layer.msg(error)
          });
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .pager {
    height: 56px;
    font-size: 14px;
    color: white;
    text-align: center;
    position: relative;
  }

  section {
    margin: 62px 0 0 0;
    min-height: 84%;
    margin-bottom: 95px;
    .banner {
      position: relative;
      font-size: 0;
      img {
        width: 100%;
        max-height: 400px;
      }
    }
    .container {
      width: 1180px;
      padding: 10px 40px 0 40px;
      background: white;
      margin: 0 auto 268px auto;
      position: relative;
      & > img {
        width: 124px;
        height: 124px;
        border-radius: 50%;
        border: 4px solid white;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%, -50%);
        background: white;
      }
      .infoList {
        ul, ol {
          font-size: 0;
          li {
            @include ibMid();
            margin-right: 35px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            &:last-child {
              margin-right: 0;
            }
          }
        }
        ul {
          float: left;
        }
        ol {
          float: right;
        }
        @include clearFloat();
      }
      .data {
        text-align: center;
        border-bottom: 1px solid #EFF3F5;
        & > ul {
          text-align: center;
          font-size: 0;
          margin-top: 60px;
          li {
            @include ibMid();
            margin-right: 5px;

            &:last-child {
              margin-right: 0;
            }
            // a {
            img {
              width: 22px;
              height: 20px;
              cursor: pointer;
            }
            // }
          }
        }
        & > h3 {
          font-size: 26px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 14px 0 23px 0;
        }
        & > button {
          border: none;
          outline: none;
          width: 87px;
          height: 35px;
          margin: 0 auto 0 auto;
          background: rgba(251, 206, 0, 1);
          border-radius: 2px;
          color: white;
          cursor: pointer;
          margin-bottom: 50px;
        }
        & > ol {
          li {
            @include ibMid();
            font-size: 18px;
            height: 36px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(141, 141, 141, 1);
            margin-right: 50px;
            padding: 0 2px 7px 2px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
              color: rgba(51, 51, 51, 1);
              border-bottom: 2px solid #333;
            }
            &:last-child {
              margin-right: 0;
            }
          }
          .active {
            color: rgba(51, 51, 51, 1);
            border-bottom: 2px solid #333;
          }
        }
      }
      .infosFlow {
        padding: 10px 76px 10px 76px;
        & > ul {
          & > li {
            padding: 40px 0 40px 0;
            border-bottom: 1px solid #EFF3F5;
            &:last-child {
              border-bottom: 0;
            }
            h3 {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              margin-bottom: 40px;
            }
            ol {
              li {
                margin-bottom: 28px;
                &:last-child {
                  margin-bottom: 0;
                }
                span {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  &:nth-of-type(1) {
                    display: inline-block;
                    width: 60px;
                    text-align: right;
                    color: #C0C0C0;
                    margin-right: 32px;
                  }
                  &:nth-of-type(2) {
                    color: #333333;
                  }
                }
              }
            }
          }
        }
      }
      .postList {
        padding: 20px;
        & > p {
          width: 120px;
          height: 40px;
          text-align: center;
          box-sizing: border-box;
          line-height: 40px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(241, 137, 43, 1);
          span {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(181, 181, 181, 1);
            cursor: pointer;
            margin-right: 25px;
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              color: rgba(239, 107, 60, 1);
            }
          }
          .activeSpan {
            color: rgba(239, 107, 60, 1);
          }
        }
        & > h3 {
          margin: 30px 0 5px 0;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(175, 175, 175, 1);
        }
        & > ul {
          & > li {
            padding: 26px 0;
            border-bottom: 1px solid #ECECEC;
            &:last-child {
              border-bottom: 0;
            }
            a {
              font-size: 0;
              & > img {
                width: 46px;
                height: 46px;
                border-radius: 50%;
                margin-right: 13px;
                @include ibMid();
              }
              div {
                @include ibMid();
                & > h3 {
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                  margin-bottom: 13px;
                  font-size: 0;
                  & > span {
                    @include ibMid();
                    font-size: 14px;
                    max-width: 1000px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 16px;
                  }
                  & > p {
                    @include ibMid();
                    img {
                      width: 16px;
                      height: 16px;
                      @include ibMid();
                      margin-right: 4px;
                    }
                    span {
                      @include ibMid();
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(228, 61, 61, 1);
                    }
                  }
                }
                & > ol {
                  font-size: 0;
                  li {
                    @include ibMid();
                    margin-right: 20px;
                    &:last-child {
                      margin-right: 20px;
                    }
                    font-size: 0;
                    img {
                      @include ibMid();
                      width: 16px;
                      height: 16px;
                      margin-right: 5px;
                    }
                    span {
                      @include ibMid();
                      font-size: 12px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(192, 192, 192, 1)
                    }
                  }

                }
              }
            }
          }
        }
      }
    }
  }
  .payLedou {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
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
      & > h3 {
        height: 44px;
        line-height: 44px;
        background: rgba(255, 181, 58, 1);
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: relative;
        & > img {
          cursor: pointer;
          width: 15px;
          height: 15px;
          position: absolute;
          right: 15px;
          top: 15px;
        }
      }
      & > div {
        height: 185px;
        padding: 15px 20px 20px 20px;
        box-sizing: border-box;
        & > p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          & > span {
            color: #E43D3D;
          }
        }
        & > input {
          border: none;
          outline: none;
          width: 280px;
          height: 44px;
          box-sizing: border-box;
          padding: 16px 11px;
          background: rgba(242, 242, 242, 1);
          margin: 17px 0 17px 0;
        }
        & > button {
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
</style>
