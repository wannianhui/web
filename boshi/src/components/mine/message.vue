<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}" @click="setActive(0)">通知</li>
        <li :class="{ 'active': isActive == 1}" @click="setActive(1)">评论</li>
      </ul>
    </h3>
    <div>
      <ul v-show="isActive == 0">
        <li v-for="(item,index) in messageList">
          <div class="logo" style="background:lightblue;" v-if="item.type==0">系</div>
          <div
            class="logo"
            style="background:rgba(91,219,95,1);"
            v-else-if="item.type==1||item.type==3"
          >审</div>
          <div class="logo" style="background:#E43D3D;" v-else-if="item.type==4||item.type==5">提</div>
          <div class="logo" style="background:#FF9621" v-else-if="item.type==6">充</div>
          <div class="info">
            <p>
              {{item.title}}
              <span>{{item.create_time}}</span>
            </p>
            <div>{{item.content}}</div>
          </div>
          <!-- <p><router-link to="/mineOthers">查看粉丝</router-link></p> -->
          <p v-if="item.type==3" @click="againUpload(item)">重新上传</p>
          <p v-else-if="item.type==5" @click="againWithdrawal">重新提现</p>
          <p v-else-if="item.type==6" @click="checkBalance">查看余额</p>
        </li>
      </ul>
      <ol v-show="isActive == 1">
        <li v-for="(item,index) in reviewList">
          <img :src="apiImg+item.reply_head" alt @click="jump('mineOthers',item.comment_user_id)" />
          <div>
            <div class="basic">
              <span @click="jump('mineOthers',item.comment_user_id)">{{item.reply_nick}}</span>
              <h3>
                <span v-if="item.type == 2">回复</span>
                <span v-else>评论</span>
                <span>了你在帖子</span>
                <span class="highlight" @click="jump('postDetail',item.topic_id)">{{item.title}}</span>
                <span>的评论</span>
              </h3>
              <h4>{{item.create_time}}</h4>
              <h5 @click="replyClick(index)">回复</h5>
            </div>
            <div class="replyCon" v-html="emoji(item.content)"></div>
            <!--         <div class="replyInfo" v-if="item.type == 2" >
              <h3>{{item.nick}}：</h3>
              <div>
                {{item.replyInfos}}
              </div>
            </div>-->
            <div :class="{ 'disblcok': replyIndex == index}" class="replayBox">
              <textarea maxlength="600" @input="descInput" @blur="test()" v-model="desc">asdf</textarea>
              <span>{{remnant}}</span>
              <p>
                <!-- <span>添加表情</span> -->
                <button
                  @click="reply({circleId:item.circle_id,replyUserId:item.user_id,byReplyUserId:item.comment_user_id,parentId:item.circle_comment_id})"
                >回复</button>
              </p>
            </div>
          </div>
        </li>
      </ol>
      <div class="pager">
        <v-pagination
          :total="total"
          :display="display"
          :current-page="current"
          @pagechange="pagechange"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/common/pagination";
import vueEmoji from "../emoji.vue";

export default {
  data() {
    return {
      total: 0, // 记录总条数
      display: 0, // 每页显示条数
      current: 1, // 当前的页数
      count: "", //传过去的页面数量
      isActive: 0, //默认下标
      remnant: 600, //字体剩余数量
      desc: "", //
      pageNumber: 1,
      httpImg: this.global.httpImg, //全局的图片路径
      apiImg: this.$httpImg,
      replyIndex: -1, //回复的下标
      messageList: {},
      reviewList: {}, //回复列表
      commentList: [
        {
          id: 1,
          img: "userImg.png",
          name: "仙子苏稼",
          post: "《机器人使用技巧》",
          replyCon: "测试内容",
          replyName: "本人昵称",
          replyInfos:
            "乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。乐博士一直致力于创新产品。乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。",
          createTime: "2016-12-01 12:34",
          type: "1"
        },
        {
          id: 1,
          img: "userImg.png",
          name: "仙子苏稼",
          post: "《机器人使用技巧》",
          replyCon: "测试内容",
          replyName: "本人昵称",
          replyInfos:
            "乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。乐博士一直致力于创新产品。乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。",
          createTime: "2016-12-01 12:34",
          type: "2"
        },
        {
          id: 1,
          img: "userImg.png",
          name: "仙子苏稼",
          post: "《机器人使用技巧》",
          replyCon: "测试内容",
          replyName: "本人昵称",
          replyInfos:
            "乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。乐博士一直致力于创新产品。乐博士一直致力于创新产品，积极开发有利于阶段性年龄儿童的积木玩具。",
          createTime: "2016-12-01 12:34",
          type: "1"
        }
      ]
    };
  },
  mounted: function() {
    const that = this;
    that.sessionId =
      localStorage["sessionId"] || sessionStorage["sessionId"] || "";
    this.postsShow = this.latestRanking;
    if(this.$route.query.isActive ==3) {
        // this.isActive = this.$route.query.isActive || 0;

        console.log(this.isActive,'isActive');
        
      this.isActive = 0;
    } else {
      this.isActive = 1

    }
    if (that.isActive == 0) {
        that.getMessageList();
      } else if (that.isActive == 1) {
        that.getReviewList();
      }
    let str = {
            sessionId:that.sessionId,
            type:0,
            isRead:1
          }
    that.$http
      // .post(that.$api +  `/user/selectNoticeNumber?sessionId=${that.sessionId}&type=0&isRead=1`, {
      .post(that.$api +  "/user/selectNoticeNumber", that.$qs.stringify(str))
      .then(res => {
        console.log("设置已读通知:",res);
        that.setmestopicNumber();
      })
      .catch(function(error) {});
    //请求web的接口
    // this.$http.get(this.$api+"/web").then((res)=>{
    //   this.data = res.data.data;
    //   // console.log(this.data,78)
    // })
  },

  components: {
    "v-pagination": pagination,
    vueEmoji
  },
  computed: {},
  methods: {
    pagechange: function(currentPage) {
      const that = this;
      that.pageNumber = currentPage;
      if (that.isActive == 0) {
        that.getMessageList({ pageNumber: currentPage });
      } else {
        that.getReviewList({ pageNumber: currentPage });
      }
  },
    //重新上传
    againUpload(item) {
      if (item.title == "会员申请审核不通过") {
        this.$router.push("/vip");
      } else if (item.title == "产品专员申请审核不通过") {
        this.$router.push("/commissioner");
      } else if (item.title == "官方认证专员申请审核不通过") {
        this.$router.push("/official");
      }
    },
    //重新提现
    againWithdrawal() {
      this.$router.push({ path: "/wealth", query: { isActive: 2 } });
    },
    //查看余额
    checkBalance() {
      this.$router.push("/wealth");
    },
    //评论消息列表
    getReviewList({ pageNumber = 1, pageSize = 10 } = {}) {
      const that = this;
      that.$http
        .get(that.$api + "/circle/notice/page", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        })
        .then(res => {
          console.log("%c 评论消息列表", "color:green", res);
          let list = res.data.data;
          that.reviewList = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        })
        .catch(function(error) {});
      this.getUserInfo();
    },
    //消息列表
    getMessageList({ pageNumber = 1, pageSize = 10 } = {}) {
      const that = this;
      that.$http
        .get(that.$api + "/notice/page", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        })
        .then(res => {
          console.log("%c 获取消息列表", "color:green", res);
          let list = res.data.data;
          that.messageList = list.list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        })
        .catch(function(error) {});
      this.getUserInfo();
    },
    setActive(index) {
      console.log(index);
      
      const that = this;
      if (index != this.isActive) {
        this.isActive = index;
        if (index == 1) {
          that.getReviewList();
          let str = {
            sessionId:that.sessionId,
            type:1,
            isRead:1
          }
          that.$http
            .post(that.$api + "/user/selectNoticeNumber", that.$qs.stringify(str))
            .then(res => {
              console.log("设置已读评论:",res);
              that.setmestopicNumber();
              console.log(that.$store.state.mestopicNumber,'mestopicNumber')
            })
            .catch(function(error) {});
        } else {
          that.getMessageList();
          let str = {
            sessionId:that.sessionId,
            type:0,
            isRead:1
          }
          that.$http
            // .post(that.$api +  `/user/selectNoticeNumber?sessionId=${that.sessionId}&type=0&isRead=1`, {
            .post(that.$api +  "/user/selectNoticeNumber", that.$qs.stringify(str))
            .then(res => {
              console.log("设置已读通知:",res);
              that.setmestopicNumber();
              console.log(that.$store.state.mestopicNumber,'mestopicNumber')
            })
            .catch(function(error) {});
        }
      }
    },
    setmestopicNumber(){
      let that=this;
      let str = {
            sessionId:that.sessionId,
            type:-1,
          }
        that.$http
          .post(that.$api + "/user/selectNoticeNumber", that.$qs.stringify(str))
          .then(res => {
            console.log("获取通知评论数",res);
            that.$store.dispatch('mestopicNumber',res.data.data)
            console.log(that.$store.state.mestopicNumber,'mestopicNumber')
          })
          .catch(function(error) {});
    },
    // 获取用户信息
    getUserInfo() {
      this.$http
        .get(this.$api + "/user/information?sessionId=" + this.sessionId)
        .then(res => {
          this.$store.state.userInfo = res.data.data;
        })
        .catch(err => {});
    },
    descInput() {
      //算字体数量
      var txtVal = this.desc.length;
      this.remnant = 600 - txtVal;
    },
    replyClick(index) {
      this.replyIndex = index;
      this.desc = "";
    },
    test() {
      console.log("ok");
    },
    reply({
      circleId = "",
      replyUserId = "",
      byReplyUserId = "",
      content = "",
      parentId = ""
    } = {}) {
      const that = this;
      console.log(parentId, 220);
      if (parentId == null) {
        that.$http
          .get(that.$api + "/circle/comment/save", {
            params: {
              sessionId: that.sessionId,
              circleId: circleId,
              content: that.desc
            }
          })
          .then(res => {
            console.log("%c 评论状态", "color:green", res);
            that.$store.dispatch("sendTips", {
              isTip: true,
              content: res.data.desc
            });
          })
          .catch(function(error) {});
      } else {
        that.$http
          .get(that.$api + "/circle/comment/saveLevel", {
            params: {
              sessionId: that.sessionId,
              circleId: circleId,
              replyUserId: replyUserId,
              byReplyUserId: byReplyUserId,
              content: that.desc,
              parentId: parentId
            }
          })
          .then(res => {
            console.log("%c 评论状态", "color:green", res);
            that.$store.dispatch("c", {
              isTip: true,
              content: res.data.desc
            });
          })
          .catch(function(error) {});
      }
    },
    //跳转页面
    jump(index, type) {
      this.$store.dispatch("reActive", index);
      this.searchDataShow = false;
      if (index == 9) {
        if (type == "vip") {
          this.$router.push({
            path: "userGroup",
            query: { isActive: 3 }
          });
        } else if (type == "official") {
          this.$router.push({
            path: "userGroup",
            query: { isActive: 2 }
          });
        } else if (type == "product") {
          this.$router.push({
            path: "userGroup",
            query: { isActive: 1 }
          });
        }
      } else if (index == 4) {
        this.$router.push({
          path: "collection"
        });
      } else if (index == "mineOthers") {
        this.$router.push({
          path: "mineOthers",
          query: { byUserId: type }
        });
      } else if (index == "postDetail") {
        this.$router.push({
          path: "postDetail",
          query: { topicId: type }
        });
      } else if (index == 3) {
        this.$router.push({
          path: "message"
        });
      } else if (index == 0) {
        this.$router.push({
          path: "basicInfo"
        });
      } else if (index == 1) {
        this.$router.push({
          path: "setting"
        });
      } else if (index == 8) {
        this.$router.push({
          path: "integral",
          query: { isActive: 1 }
        });
      } else if (type == "recharge" && index == 6) {
        console.log("ok");
        this.$router.push({
          path: "wealth",
          query: { isActive: 3 }
        });
      } else if (index == 6) {
        this.$router.push({
          path: "wealth"
        });
      } else if (index == "forumCenter") {
        this.$router.push({
          path: "forumCenter"
        });
      }
    }
  }
};
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
.module {
  box-sizing: border-box;
  min-height: 518px;
  .show-enter-active,
  .show-leave-active {
    transition: all 0.4s ease;
    padding-left: 10px;
  }
  .show-enter,
  .show-leave-active {
    padding-left: 100px;
  }
  & > h3 {
    height: 68px;
    line-height: 68px;
    padding: 0 40px;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    ul {
      font-size: 0;
      .active {
        color: #333333;
        border-bottom: 2px solid #333333;
      }
      li {
        @include ibMid();
        height: 68px;
        font-size: 16px;
        padding: 0 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        box-sizing: border-box;
        cursor: pointer;
        color: #8d8d8d;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        border-bottom: 2px solid white;
        &:hover {
          color: #333333;
          border-bottom: 2px solid #333333;
        }
      }
    }
  }
  & > div {
    min-height: 450px;
    background: white;
    padding: 11px 40px 0 40px;
    box-sizing: border-box;
    & > ul {
      & > li {
        font-size: 0;
        padding: 20px 0 28px 0;
        border-bottom: 1px solid #f2f2f2;
        &:last-child {
          border-bottom: 0;
        }
        img {
          @include ibMid();
          vertical-align: top;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          margin-right: 17px;
        }
        .logo {
          @include ibMid();
          vertical-align: top;
          width: 46px;
          height: 46px;
          line-height: 46px;
          text-align: center;
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border-radius: 50%;
          margin-right: 17px;
          background-size: 100% 100%;
        }
        .info {
          width: 650px;
          @include ibMid();
          p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(239, 107, 60, 1);
            span {
              margin-left: 17px;
              font-size: 12px;
              color: rgba(161, 161, 161, 1);
            }
          }
          div {
            width: 100%;
            margin-top: 5px;
            font-size: 14px;
          }
        }
        & > p {
          @include ibMid();
          float: right;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          cursor: pointer;
          margin-top: 9px;
          color: rgba(73, 189, 255, 1);
          a {
            color: rgba(73, 189, 255, 1);
          }
        }
      }
    }
    & > ol {
      & > li {
        padding: 26px 0 30px 0;
        border-bottom: 1px solid #f2f2f2;
        // &>img, &>div {
        //   @include ibMid();
        // }
        &:last-child {
          border-bottom: 0;
        }
        & > img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          // vertical-align:top;
          float: left;
          cursor: pointer;
        }
        & > div {
          width: 790px;
          padding: 0 15px 0 15px;
          box-sizing: border-box;
          float: right;
          color: #8d8d8d;
          .basic {
            font-size: 0;
            & > span {
              @include ibMid();
              font-size: 14px;
              margin-right: 20px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(73, 189, 255, 1);
              cursor: pointer;
            }
            & > h3 {
              @include ibMid();
              font-size: 14px;
              span {
                @include ibMid();
              }
              .highlight {
                color: #49bdff;
                margin: 0 2px;
                cursor: pointer;
              }
            }
            h4 {
              @include ibMid();
              font-size: 12px;
              margin-left: 12px;
            }
            h5 {
              @include ibMid();
              font-size: 14px;
              float: right;
              cursor: pointer;
              &:hover {
                color: #333333;
              }
            }
          }
          .replyCon {
            margin: 10px 0 10px 0;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .replyInfo {
            background: rgba(245, 245, 245, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            padding: 12px;
            box-sizing: border-box;
            h3 {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(73, 189, 255, 1);
            }
            div {
              font-size: 14px;
              corlor: #333;
            }
          }
          .replayBox {
            margin-top: 14px;
            display: none;
            position: relative;
            textarea {
              max-width: 760px;
              width: 760px;
              height: 50px;
              resize: none;
              border: none;
              outline: none;
              background: #f5f5f5;
              color: #747474;
              font-size: 14px;
              // background:white;
              // border:1px solid #E6E6E6;
              box-sizing: border-box;
              padding: 12px 20px 12px 12px;
            }
            & > p {
              font-size: 0;
              margin: 10px;
              span {
                @include ibMid();
                font-size: 12px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              button {
                @include ibMid();
                width: 60px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                font-size: 14px;
                float: right;
                border: none;
                outline: none;
                background: rgba(229, 229, 229, 1);
                border-radius: 2px;
                cursor: pointer;
                color: white;
                &:hover {
                  background: #69c9ff;
                }
              }
              .activeButotn {
                background: #49bdff;
              }
            }
            & > span {
              position: absolute;
              right: 15px;
              top: 15px;
            }
          }
          .disblcok {
            display: block;
          }
        }
        @include clearFloat();
      }
    }
  }
}
</style>
