<template>
  <div class="posts">
    <article class="left">
      <div class="postsSort">
        <ul>
          <li :class="{'postsSortActive': stateType == 0}" @click="switchCategory(0)">推荐</li>
          <li :class="{'postsSortActive': stateType == 1}" @click="switchCategory(1)">最新</li>
          <li :class="{'postsSortActive': stateType == 2}" @click="switchCategory(2)">热门</li>
          <li :class="{'postsSortActive': stateType == 3}" @click="switchCategory(3)">精华</li>
          <li :class="{'postsSortActive': stateType == 4}" @click="switchCategory(4)">关注</li>
          <li :class="{'postsSortActive': stateType == 5}" @click="switchCategory(5)">认证专家</li>
        </ul>
        <select v-model="time" @change="timeSort()">
          <option value="0">时间正序</option>
          <option value="1">时间反序</option>
        </select>
      </div>
      <ul>
        <li v-for="(postsShow,index) in postsShow" :key="index">
          <div>
            <span>{{postsShow.comment_number}}</span>
            <div class="postsSortTitle">
              <p
                style="cursor:pointer;"
                @click="postsShow.state==1?fufeiData=postsShow:'',postDetail({topicId:postsShow.id,state:postsShow.state,isOrderTopic:postsShow.isOrderTopic})"
              >{{postsShow.title}}</p>
              <ul>
                <li class="ledou" v-show="postsShow.state==1">
                  <img src="../../../static/img/icon_bean.png" alt />
                  <span>{{postsShow.price}}</span>
                </li>
                <li v-show="postsShow.top==1">
                  <span class="topping">置顶</span>
                </li>
                <li v-show="postsShow.elite_post==1">
                  <span class="significant">精</span>
                </li>
                <li v-show="postsShow.official_certification==1">
                  <span class="official">官</span>
                </li>
              </ul>
            </div>

            <ul>
              <li style="padding-right: 20px;">
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
              <li v-show="postsShow.image1">
                <img :src="apiImg+postsShow.image1" alt />
              </li>
              <li v-show="postsShow.image2">
                <img :src="apiImg+postsShow.image2" alt />
              </li>
              <li v-show="postsShow.image3">
                <img :src="apiImg+postsShow.image3" alt />
              </li>
            </ol>
          </div>
        </li>
      </ul>
      <div class="pager">
        <v-pagination
          :total="total"
          :display="display"
          :current-page="current"
          @pagechange="pagechange"
        ></v-pagination>
      </div>
    </article>
    <article class="right">
      <div class="infos">
        <ul>
          <li @click="jump({index:2})">
            <span>我的帖子</span>
            <span v-if="topicNumber">{{topicNumber}}</span>
          </li>
          <li @click="jump({index:3})">
            <span>我的消息</span>
            <span v-if="mestopicNumbers">{{mestopicNumbers}}</span>
          </li>
        </ul>
        <div class="signedIn" v-if="sessionId!=''">
          <p @click="checkIn()" style="cursor:pointer" v-if="userDatas.isSignUser==0">
            <img src="../../../static/img/signIn.png" />
            <span>签到</span>
          </p>
          <p v-else>
            <img src="../../../static/img/signIn.png" />
            <span>已签到</span>
          </p>
          <p>
            <img src="../../../static/img/date.png" />
            <span>{{date}}</span>
          </p>
        </div>
        <div class="signedIn" v-else>
          <p>
            <img src="../../../static/img/signIn.png" />
            <span>请登录</span>
          </p>
        </div>
      </div>
      <ul class="hotPost">
        <h3>推荐阅读</h3>
        <li
          v-for="(item,index) in tuiShow"
          :style="{backgroundImage: 'url('+ apiImg + item.image}"
          :key="index"
          class="tuiShuwClass"
        >
          <router-link
            target="_blank"
            :to="{path: '/newsDetail', query: {id:item.id,labelId:item.label_id,type:item.type}}"
          >
            <p>{{item.title}}</p>
          </router-link>
        </li>
      </ul>
      <div class="payLedou" v-show="isPayLd==true">
        <div>
          <h3>
            <span>购买优质产品资讯，获取精彩内容</span>
            <img
              src="../../../static/img/icon_cancle_card_black.png"
              alt
              @click="payLedou('close')"
            />
          </h3>
          <div>
            <p>
              该产品为付费产品，支付
              <span ref="fufeiDataPrice">{{fufeiData.price}}乐豆</span>后，即可阅读
            </p>
            <input type="password" placeholder="请输入密码" v-model="ledouInput" />
            <button @click="payLedou('confirm')">确 定</button>
            <router-link :to="{path: '/setting', query: {pay:0}}">
              <h4>忘记密码？</h4>
            </router-link>
          </div>
        </div>
      </div>

      <div class="payLedou" v-show="nopaypwd==true">
        <div style="height:170px;">
          <h3>
            <span>支付密码</span>
            <img
              src="../../../static/img/icon_cancle_card_black.png"
              alt
              @click="closes('nopaypwd')"
            />
          </h3>
          <div>
            <p>尚未设置支付密码，请设置。</p>
            <button style="margin-top:50px;" @click="toset">去设置</button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import pagination from "@/common/pagination";
import common from "@/common/common";
import { mapState } from "vuex";

export default {
  data() {
    return {
      pagination: false,
      stateType: 0, //选项卡
      postsShow: [
        {
          name: "",
          create_time: "",
          enduser: {
            nick: "",
            create_time: ""
          }
        }
      ],
      nopaypwd: false, //有无支付密码
      ledouInput: "", //支付密码
      isPayLd: false, //支付乐豆,
      payLdMoney: 0, //记入乐豆值
      fufeiData: "", //要付费的帖子
      total: 0, // 记录总条数
      sessionId: "",
      pageNumber: 1,
      apiImg: this.$httpImg,
      time: 1, // 0 时间正序 1 时间反序
      display: 10, // 每页显示条数
      current: 1, // 当前的页数
      count: "", //传过去的页面数量
      httpImg: this.global.httpImg, //全局的图片路径
      tuiShow: "", //推荐文章
      userDatas: {
        userExtend: {
          sign_in: ""
        }
      }, //用户信息
      date: "",
      topicId: "", //要查看的论坛的id
      messageNumber: "", //消息数量
      topicNumber: "", //帖子数量
      mestopicNumbers: 0 //消息+评论数
    };
  },
  created() {},
  mounted: function() {
    let that = this;
    that.defaultImg = common.defaultImg;
    that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"];
    that.messageNumber = that.userInfo.messageNumber;
    that.topicNumber = that.userInfo.topicNum;
    this.userDatas = this.$store.state.userInfo;
    this.getNoticeNumber(); //获取消息评论总数
    // if(that.$store.state.isLogin==true){//如果是登录状态
    //   that.sessionId = localStorage["sessionId"];
    //   //获取用户信息
    //   console.log(localStorage["sessionId"])
    //   that.$http.get(that.$api+"/user/information?sessionId="+that.sessionId).then((res)=>{
    //     console.log('%c 获取用户信息','color:green',res);
    //     that.userDatas = res.data.data;
    //   }).catch(function (error) {
    //       that.$layer.msg(error)
    //   });
    // }else{

    // }
    //获取当前日期
    var date = new Date();
    that.date = date.toLocaleDateString();
    that.getForumList(); //默认获取论坛列表数据

    if (that.recommendArticle.length === 0) {
      that.getRecommendArticle();
    } else {
      that.tuiShow = that.recommendArticle;
    }

    that.$http
      .get(that.$api + "/sign/user/list?sessionId=" + that.sessionId)
      .then(res => {
        console.log("%c 签到当月数据", "color:green", res);
      })
      .catch(function(error) {
        that.$layer.msg(error);
      });
  },

  components: {
    "v-pagination": pagination
  },
  computed: {
    ...mapState(["labelId", "recommendArticle", "userInfo", "mestopicNumber"])
  },
  watch: {
    labelId: "getForumList",
    "$store.state.userInfo.isSignUser": function() {
      this.userDatas = this.$store.state.userInfo;
      this.topicNumber = this.$store.staforumCentete.userInfo.topicNum;
      console.log(
        "userInfo改变了。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。"
      );
    },
    "$store.state.mestopicNumber": {
      handler: function() {
        this.mestopicNumbers = this.$store.state.mestopicNumber;
      },
      deep: true
    }
  },
  methods: {
    //获取首页推荐文章
    getRecommendArticle() {
      const that = this;
      that.$http
        .get(that.$api + "/information/recommend")
        .then(res => {
          console.log("%c 首页推荐文章", "color:green", res);
          let list = res.data.data;
          that.tuiShow = list;
          that.$store.dispatch("recommendArticle", list);
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },
    //获取消息+评论数
    getNoticeNumber() {
      let that = this;
      let str = {
        sessionId: that.sessionId,
        type: -1
      };
      that.$http
        .post(that.$api + "/user/selectNoticeNumber", that.$qs.stringify(str))
        .then(res => {
          console.log("获取通知评论数", res);
          // that.mestopicNumber = res.data.data;
          that.$store.dispatch("mestopicNumber", res.data.data);
          that.mestopicNumbers = that.$store.state.mestopicNumber;
          console.log(that.mestopicNumbers, "that.mestopicNumbers");
        })
        .catch(function(error) {});
    },
    //获取论坛列表
    getForumList({
      type = 0,
      labelId = "",
      pageNumber = 1,
      pageSize = 10,
      sort = 0
    } = {}) {
      const that = this;
      that.$http
        .get(that.$api + "/topic/page", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            labelId: that.labelId,
            type: that.stateType,
            sort: that.time
          }
        })
        .then(res => {
          console.log("%c 获取论坛列表", "color:green", res);
          if (res.data.code == 2) {
            this.$store.dispatch("sendTips", {
              isTip: true,
              content: "请先登录"
            });
          }
          this.$router.push({
            path: "/forumCenter",
            query: { isActive: type }
          });
          let list = res.data.data;
          that.postsShow = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        })
        .catch(function(error) {});
    },

    postDetail({ topicId = "", state = "", isOrderTopic = "" } = {}) {
      //跳转到论坛详情
      let that = this;
      that.topicId = topicId;
      if (state == 0) {
        //免费
        let href = that.$router.resolve({
          path: "postDetail",
          query: { topicId: topicId }
        });
        window.open(href.href, "_blank");
      } else {
        if (isOrderTopic == 0) {
          if (this.userDatas.isUserPassword == 0) {
            this.nopaypwd = true;
            return;
          }
          that.isPayLd = true;
        } else {
          let href = that.$router.resolve({
            path: "postDetail",
            query: { topicId: topicId }
          });
          window.open(href.href, "_blank");
        }
      }
    },
    payLedou(type) {
      //确定支付
      let that = this;
      if (type == "close") {
        that.isPayLd = false;
      } else if (type == "confirm") {
        that.$http
          .get(that.$api + "/order/saveTopic?", {
            params: {
              sessionId: that.sessionId,
              topicId: that.topicId,
              password: that.ledouInput
            }
          })
          .then(res => {
            console.log("%c 支付乐豆阅读帖子", "color:green", res);
            // this.$store.dispatch("sendTips", {
            //   isTip: true,
            //   content: res.data.desc
            // });
            if (res.data.code == 1) {
              //支付乐豆成功之后，更新右上角的信息金额
              that.$event.$emit("integral");
              that.$router.push({
                path: "postDetail",
                query: { topicId: that.topicId }
              });
            } else {
              // that.$layer.msg(res.data.desc);
              if (res.data.desc == "请设置支付密码") {
                that.isPayLd = false;
                that.nopaypwd = true;
                // that.$router.push({
                //   //跳转到设置密码页面
                //   path: "setting",
                //   query: { pay: 0 }
                // });
              } else if (res.data.desc == "乐豆不足") {
                this.$store.dispatch("sendTips", {
                  isTip: true,
                  content: res.data.desc
                });
                this.isPayLd = false;
              }
            }
          })
          .catch(function(error) {
            that.$layer.msg(error);
          });
      }
    },
    switchCategory(type) {
      let that = this;
      that.$store.dispatch("initPageNum", true); //强制初始化页码

      that.stateType = type;
      that.pageNumber = 1;
      that.postsShow = [];
      this.$router.push({ path: "/forumCenter", query: { isActive: type } });
      that.getForumList({ type: type });
    },
    timeSort() {
      let that = this;
      that.getForumList({ pageNumber: that.pageNumber });
    },
    checkIn() {
      //签到
      let that = this;
      that.$http
        .get(that.$api + "/sign/user/save?sessionId=" + that.sessionId)
        .then(res => {
          console.log("%c 签到", "color:green", res);
          that.$layer.msg(res.data.desc);
          if (res.data.code == 1) {
            that.userDatas.isSignUser = 1;
            that.$store.state.userInfo.isSignUser = 1;
          }
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },
    pagechange: function(currentPage) {
      const that = this;
      that.pageNumber = currentPage;
      that.getForumList({ pageNumber: currentPage });
    },
    closes(type) {
      if (type == "nopaypwd") {
        this.nopaypwd = false;
      }
    },
    toset() {
      this.$store.dispatch("reActive", 1);
      this.$router.push({
        path: "setting",
        query: {
          Active: 1
        }
      });
    },
    //跳转页面
    jump({ index = "", id = "" } = {}) {
      this.$store.dispatch("reActive", index);

      if (index == 2) {
        this.$router.push({
          path: "myPost"
        });
      } else if (index == 3) {
        this.$router.push({
          path: "message",
          query: { isActive: 1 }
        });
      } else if (index == 0) {
        this.$router.push({
          path: "mineOthers",
          query: { byUserId: id }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../common/common.scss";

.posts {
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
            color: #e43d3d;
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

  .left {
    width: 928px;
    float: left;
    box-shadow: 0px 1px 18px 0px rgba(81, 81, 81, 0.26);
    border-radius: 2px;
    margin-bottom: 43px;
    .postsSort {
      height: 68px;
      background: #ffffff;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
      position: relative;
      ul {
        box-sizing: boder-box;
        @include posiVertical();
        left: 43px;
        li {
          color: #8d8d8d;
          font-size: 16px;
          float: left;
          cursor: pointer;
          margin-right: 30px;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            color: #000000;
          }
        }
        .postsSortActive {
          color: #000000;
        }
        @include clearFloat();
      }
      select {
        border: none;
        outline: none;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        padding-left: 9px;
        width: 97px;
        height: 26px;
        @include posiVertical();
        right: 27px;
      }
    }
    & > ul {
      background: white;
      padding-bottom: 26px;
      box-sizing: border-box;
      & > li {
        min-height: 56px;
        margin: 0;
        position: relative;
        box-sizing: border-box;
        padding: 0 21px 0 32px;
        &:hover {
          background: #f4f8f9;
        }
        & > div {
          height: 100%;
          border-bottom: 1px solid #eff3f5;
          box-sizing: border-box;
          // a {
          //   display:block;
          //   height:100%;
          //   font-size:0;
          line-height: 56px;
          & > span {
            display: inline-block;
            width: 44px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background: #eff3f5;
            font-size: 12px;
            margin-right: 20px;
            @include ibMid();
            // @include posiVertical();
          }
          .postsSortTitle {
            p {
              max-width: 440px;
              font-size: 14px;
              color: #333333;
              @include sLineOF();
              @include ibMid();
              a {
                color: #333333;
                &:hover {
                  color: #8d8d8d;
                }
              }
            }
            ul {
              @include ibMid();
              margin-left: 14px;
              .ledou {
                font-size: 0;
                img {
                  @include ibMid();
                  margin-right: 4px;
                }
                span {
                  @include ibMid();
                  font-size: 14px;
                  color: #e43d3d;
                }
              }
              li {
                float: left;
                margin-right: 6px;
                font-size: 12px;
                @include clearFloat();
                &:last-child {
                  margin-right: 0;
                }
                img {
                  width: 16px;
                  height: 16px;
                }
                .significant,
                .topping,
                .official {
                  font-size: 12px;
                  color: white;
                  padding: 4px;
                  border-radius: 2px;
                }
                .topping {
                  background: #37a2f1;
                }
                .significant {
                  background: #ff5757;
                }
                .official {
                  background: #e40a37;
                }
              }
            }
            @include ibMid();
            // @include posiVertical();
            // left:96px;
          }
          & > ul {
            // @include posiVertical();
            margin-right: 7px;
            @include ibMid();
            float: right;
            li {
              float: left;
              font-size: 12px;
              text-align: center;
              margin-right: 10px;
              line-height: 100%;
              &:last-child {
                margin-right: 0;
              }
              p {
                color: #8d8d8d;
                margin: 14px 0 8px 0;
                cursor: pointer;
                &:hover {
                  color: #e43d3d;
                }
                line-height: 100%;
              }
              span {
                color: #c0c0c0;
                line-height: 100%;
              }
            }
            @include clearFloat();
          }
          @include clearFloat();

          // }
          & > ol {
            margin-bottom: 36px;
            li {
              float: left;
              margin-right: 6px;
              max-height: 124px;
              max-width: 260px;
              &:last-child {
                margin-right: 0;
              }
              img {
                max-height: 124px;
              }
            }
            @include clearFloat();
          }
        }
        &:last-child {
          & > div {
            border-bottom: 0;
          }
        }
      }
    }
    .pager {
      height: 56px;
      font-size: 14px;
      color: white;
      text-align: center;
      background: #f7f7f7;
      position: relative;
    }
  }
  .right {
    width: 266px;
    float: right;
    box-sizing: border-box;
    padding: 0 2px;
    .infos {
      background: white;
      box-sizing: border-box;
      padding: 24px 15px 7px 15px;
      ul {
        li {
          margin-bottom: 10px;
          cursor: pointer;
          &:last-child {
            margin-bottom: 15px;
          }
          span {
            @include ibMid();
            font-size: 14px;
            box-sizing: border-box;
            text-align: center;
            color: #333333;
            &:nth-of-type(2) {
              font-size: 10px;
              padding: 2px 6px;
              background: #ff5757;
              height: 16px;
              line-height: 14px;
              color: white;
              border-radius: 8px;
            }
          }
        }
      }
      .signedIn {
        padding: 15px 0 8px 0;
        background: #eff3f5;
        p {
          img,
          span {
            @include ibMid();
          }
          img {
            margin-right: 4px;
          }
          &:nth-of-type(1) {
            text-align: center;
            margin-bottom: 13px;
            img {
              width: 24px;
              height: 24px;
            }
            span {
              color: #ff801b;
              font-size: 18px;
            }
          }
          &:nth-of-type(2) {
            margin-left: 21px;
            img {
              width: 14px;
              height: 14px;
            }
            span {
              color: #8d8d8d;
              font-size: 12px;
            }
          }
        }
      }
    }
    .promotion {
      box-sizing: border-box;
      padding: 18px;
      background: white;
      margin: 7px 0;
      h3 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      li {
        background-size: 100% 100%;
        height: 146px;
        margin-bottom: 10px;
        position: relative;
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
.tuiShuwClass {
  background-repeat: no-repeat;
  width: 167px;
  background-size: 100%;
  height: 134px;
}
.hotPost li a{
  position: relative;
  top: 130px;
}
</style>
