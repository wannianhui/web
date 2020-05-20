<template>
  <header>
    <div class="tips" v-show="sendTips.isTip">{{sendTips.content}}</div>
    <div class="main">
      <h1>
        <img src="../../static/img/logo_homepage.png" alt />
      </h1>
      <nav>
        <li @click="closeSearchData();clearlabelData()">
          <span></span>
          <router-link to="/homeContent">
            <h2>首页</h2>
          </router-link>
        </li>
        <li>
          <span class="navborderTop"></span>
          <h2>资讯</h2>
          <div></div>
          <ul>
            <li v-for="(item,index) in advisory" :key="index">
              <p
                @click="closeSearchData();jumpArticleList({label:item.name,labelId:item.id,index:0})"
              >{{item.name}}</p>
              <ul v-if="item.listSubordinate.length>0">
                <li v-for="(itemSon,index) in item.listSubordinate" :key="index">
                  <a
                    href="javascript:void(0);"
                    @click="closeSearchData();jumpArticleList({label:itemSon.name,labelId:itemSon.id,labelSon:itemSon.name})"
                  >{{itemSon.name}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="navborderTop"></span>
          <h2>赛事</h2>
          <div></div>
          <transition name="nav">
            <ul>
              <li v-for="(item,index) in event" @click="closeSearchData()" :key="index">
                <p
                  @click="closeSearchData();jumpArticleList({label:item.name,labelId:item.id,index:1})"
                >{{item.name}}</p>
                <ul v-if="item.listSubordinate.length>0">
                  <li v-for="(itemSon,index) in item.listSubordinate" :key="index">
                    <a
                      href="javascript:void(0);"
                      @click="closeSearchData();jumpArticleList({label:itemSon.name,labelId:itemSon.id,labelSon:itemSon.name})"
                    >{{itemSon.name}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <span class="navborderTop"></span>
          <h2>EST专区</h2>
          <div></div>
          <transition name="nav">
            <ul>
              <li v-for="(item,index) in zone" :key="index">
                <!-- <router-link to="/newsList"> -->
                <p
                  @click="closeSearchData();jumpArticleList({label:item.name,labelId:item.id,index:2})"
                >{{item.name}}</p>
                <ul v-if="item.listSubordinate.length>0">
                  <li v-for="(itemSon,index2) in item.listSubordinate" :key="index2">
                    <a
                      href="javascript:void(0);"
                      @click="closeSearchData();jumpArticleList({label:item.name,labelId:itemSon.id,labelSon:itemSon.name})"
                    >{{itemSon.name}}</a>
                  </li>
                </ul>
                <!-- </router-link> -->
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <span class="navborderTop"></span>
          <h2>更多</h2>
          <div></div>
          <ul>
            <li @click="closeSearchData()">
              <router-link to="/official">成为官方认证专员</router-link>
            </li>
            <li @click="closeSearchData()">
              <router-link to="/commissioner">成为产品专员</router-link>
            </li>
            <li @click="closeSearchData()">
              <router-link to="/vip">成员会员VIP</router-link>
            </li>
            <li @click="jump(6,'recharge')">充值乐豆</li>
          </ul>
        </li>
      </nav>
      <!-- <router-link to="/forumCenter"> -->
      <!-- <div class="forumCenter" @click="jump('forumCenter','forumCenter')"></div> -->
      <img
        src="../../static/img/forumCenter.png"
        alt
        class="forumCenter"
        @click="jump('forumCenter','forumCenter')"
        onmouseover="this.src='../../static/img/forumCenterHover.png'"
        onmouseout="this.src='../../static/img/forumCenter.png'"
      />
      <!-- </router-link> -->
      <div class="searchBar">
        <div>
          <div>
            <div @click="searchListShow">
              <span>{{searchType}}</span>
              <img src="../../static/img/icon_arrow_down.png" alt v-show="!searchDataShow" />
              <img src="../../static/img/icon_arrow_up.png" alt v-show="searchDataShow" />
            </div>
            <input
              autocomplete="off"
              type="text"
              v-model="searchResult"
              placeholder="请输入您要查找的内容"
              @blur="animateWidth('company_name','blur')"
              @focus="animateWidth('company_name','focus')"
            />
            <input type="text" style="position:absolute;left:500px;opacity: 0;z-index: -1;" />

            <router-link
              :key="gggg"
              :to="{path: '/search', query: {id:searchId,searchResult:searchResult}}"
              @click.native="search()"
            >
              <!--@click.native="shuaxin()"-->
              <img src="../../static/img/home_search@2x.png" alt v-show="!isFocus" />
              <img src="../../static/img/homeSearchHover.png" alt v-show="isFocus" />
            </router-link>
          </div>
        </div>
        <ul v-show="searchDataShow">
          <li v-for="(searchBar,index) in searchBar"
            @click="searchChoose(searchBar.title,searchBar.id);"
          :key="index">{{searchBar.title}}</li>
        </ul>
      </div>
      <div class="hasLogged" v-show="ISLogin===true">
        <router-link :to="{ path: 'message'}">
          <img src="../../static/img/message.png" alt />
          <div class="point" v-if="point"></div>
          <!-- qwe -->
        </router-link>
        <h3>
          <img
            :src="userDatas.userExtend.head==null?defaultUser:apiImg+userDatas.userExtend.head"
            alt
            @click="jump(0)"
          />
          <div class="personal">
            <div>
              <p @click="jump(0)">{{userDatas.userExtend.nick}}</p>
              <ul>
                <li>
                  <!-- <img src="../../static/img/icon_man_aut_gray1.png" alt="会员VIP" title="会员VIP" @click="jump(9,'vip')"> -->
                  <img
                    src="../../static/img/icon_man_aut_gray1.png"
                    alt="会员VIP"
                    v-if="userDatas.is_v_i_p_member==1"
                    title="会员VIP"
                    @click="jump(9,'vip')"
                  />
                  <img
                    src="../../static/img/icon_vip_gray.png"
                    alt="会员VIP"
                    v-else
                    title="会员VIP"
                    @click="jump(9,'vip')"
                  />
                </li>
                <li>
                  <!-- <img src="../../static/img/icon_man_aut_gray2.png" alt="官方认证人员" title="官方认证人员" @click="jump(9,'official')"> -->
                  <img
                    src="../../static/img/icon_man_aut_gray2.png"
                    alt="官方认证人员"
                    v-if="userDatas.is_official_certification_specialist==1"
                    title="官方认证人员"
                    @click="jump(9,'official')"
                  />
                  <img
                    src="../../static/img/icon_aut_gray.png"
                    alt="官方认证人员"
                    v-else
                    title="官方认证人员"
                    @click="jump(9,'official')"
                  />
                </li>
                <li>
                  <!-- <img src="../../static/img/icon_man_aut_gray3.png" alt="产品专员" title="产品专员" @click="jump(9,'product')"> -->
                  <img
                    src="../../static/img/icon_man_aut_gray3.png"
                    alt="产品专员"
                    v-if="userDatas.is_relevant_product_specialist==1"
                    title="产品专员"
                    @click="jump(9,'product')"
                  />
                  <img
                    src="../../static/img/icon_product_gray.png"
                    alt="产品专员"
                    v-else
                    title="产品专员"
                    @click="jump(9,'product')"
                  />
                </li>
              </ul>
            </div>
            <ol>
              <li @click="jump(5)">我的关注</li>
              <li @click="jump(4)">我的收藏</li>
              <li @click="jump(1)">账号设置</li>
              <li @click="jump(8)">K1</li>
              <li @click="jump(6)">{{integral}}乐豆</li>
            </ol>
            <p>
              <span @click="signOut()">退出</span>
            </p>
          </div>
        </h3>
      </div>
      <ul class="notLogged" v-show="ISLogin===false">
        <li>
          <router-link :to="{path: '/login', query: {ISLogin:1}}">注册</router-link>
        </li>
        <li>
          <router-link :to="{path: '/login', query: {ISLogin:0}}">登录</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import common from "./common";
import qs from "qs";

export default {
  inject: ["reload"],
  data() {
    return {
      isFocus: false, //是否聚焦
      defaultUser: "", //默认头像
      userDatas: {
        userExtend: {
          head: ""
        }
      }, //用户信息
      apiImg: this.$httpImg,
      integral: 0, //积分 乐豆
      sessionId: "",
      morenHead: "../../static/img/userImg.png", //默认头像
      gggg: "",
      //咨询列表的数据
      advisory: [],
      //赛事列表的数据
      event: [],
      //专区列表的数据
      zone: [],
      //更多列表的数据
      more: [
        { id: 1, title: "成为官方认证专员", path: "/basicInfo" },
        { id: 2, title: "成为产品专员", path: "/basicInfo" },
        { id: 3, title: "成员会员VIP", path: "/basicInfo" },
        { id: 4, title: "充值乐豆", path: "/basicInfo" }
      ],
      //搜索框的数据
      searchBar: [
        { id: 1, title: "新闻" },
        { id: 2, title: "帖子" },
        { id: 3, title: "人名" }
      ],
      //搜索默认
      searchType: "新闻", //搜搜类型
      searchId: 1, //搜搜类型
      searchResult: "", //搜索结果
      //搜索列表显示
      searchDataShow: false,
      ISLogin: false, //是否登录
      point: false //是否显示消息红点
    };
  },
  props: [],
  components: {},
  mounted: function() {
    //监听事件
    this.$event.$on("integral", function(){
      let sessionId = "";
    that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || "";
    if (that.sessionId != "") {
      //获取用户信息
      that.$http
        .get(that.$api + "/user/information?sessionId=" + that.sessionId)
        .then(res => {
          console.log("%c 获取用户信息", "color:green", res);
          if (res.data.code == 1) {
            // alert(res.data.data.userExtend.balance)
            that.integral = res.data.data.userExtend.balance;
            if (res.data.data.messageNumber || res.data.data.topicNumber) {
              that.point = true;
            }
          }else{
            that.ISLogin = false;
          }
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });}
    });
    let that = this;
    let sessionId = "";
    that.sessionId =
      localStorage["sessionId"] || sessionStorage["sessionId"] || "";
    that.ISLogin = that.isLogin;
    that.defaultUser = common.defaultUser;
    if (that.sessionId != "") {
      //获取用户信息
      that.$http
        .get(that.$api + "/user/information?sessionId=" + that.sessionId)
        .then(res => {
          console.log("%c 获取用户信息", "color:green", res);
          if (res.data.code == 1) {
            this.integral = res.data.data.userExtend.balance;
            that.$store.dispatch("userInfo", res.data.data);
            that.userDatas = res.data.data;
            if (res.data.data.messageNumber || res.data.data.topicNumber) {
              that.point = true;
            }
            that.ISLogin = true;
          }else if(res.data.code == 2){
            // alert(res.data.code)
            //去登录
            that.ISLogin = false;
          }
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    }

    that.getAdvisory();
    that.getevent();
    that.getZone();
    that.appInfoSheet();
  },
  methods: {
    //跳转到文章列表页
    jumpArticleList({
      labelId = "",
      label = "",
      labelSon = "",
      index = 0
    } = {}) {
      const that = this;
      let list = {
        labelId: labelId,
        label: label,
        labelSon: labelSon
      };
      that.$store
        .dispatch("labelData", list)
        .then(res => {
          that.$store.dispatch("labelheadr", index);
          // console.log(that.labelData, 258)
          that.$router.push("/newsList");
        })
        .catch(err => {
          console.log(err);
        });
      // that.$router.push('newsList')
    },

    //app基本信息表
    appInfoSheet() {
      const that = this;
      that.$http
        .get(that.$api + "/web/get")
        .then(res => {
          // console.log('%c app基本信息表','color:green',res);
          if (res.data.code == 1) {
            let appInfo = res.data.data;
            that.$store.dispatch("appInfo", appInfo);
          }
        })
        .catch(function(error) {
          that.$layer.msg("网络请求失败");
        });
    },

    //获取资讯信息
    getAdvisory() {
      const that = this;
      that.$http
        .get(
          that.$api +
            "/label/listLabelAll?sessionId=" +
            that.sessionId +
            "&id=1"
        )
        .then(res => {
          console.log("%c 资讯信息", "color:green", res);
          that.advisory = res.data.data;
          // that.$store.dispatch('advisoryData',res.data.data);
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },
    //获取赛事信息
    getevent() {
      const that = this;
      that.$http
        .get(
          that.$api +
            "/label/listLabelAll?sessionId=" +
            that.sessionId +
            "&id=2"
        )
        .then(res => {
          // console.log('%c 赛事信息', 'color:green', res);
          that.event = res.data.data;
          // that.$store.dispatch('eventData',res.data.data);
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },
    //获取EST专区
    getZone() {
      const that = this;
      that.$http
        .get(
          that.$api +
            "/label/listLabelAll?sessionId=" +
            that.sessionId +
            "&id=3"
        )
        .then(res => {
          // console.log('%c EST专区信息', 'color:green', res);
          that.zone = res.data.data;
          // that.$store.dispatch('zoneData',res.data.data);
        })
        .catch(function(error) {
          that.$layer.msg(error);
        });
    },
    // shuaxin(){
    //   // this.$router.go(0)
    //   this.reload();
    // },
    searchListShow() {
      this.searchDataShow = !this.searchDataShow;
    },
    searchChoose(title, id) {
      this.searchType = title;
      this.searchId = id;
      this.searchDataShow = !this.searchDataShow;
    },
    closeSearchData() {
      //关闭弹窗
      this.searchDataShow = false;
    },
    clearlabelData() {
      this.$store.dispatch("labelData", {});
    },
    search() {
      let type = 0;
      this.reload();
      console.log("1111");
      if (this.searchType == "新闻") {
        type = 0;
      } else if (this.searchType == "帖子") {
        type = 1;
      } else if (this.searchType == "人名") {
        type = 2;
      }
    },
    //退出登录
    signOut() {
      let that = this;
      // console.log('this.$route',that.$route);
      that.$http
        .get(that.$api + "/user/exit?sessionId=" + localStorage["sessionId"])
        .then(res => {
          // console.log('%c 退出登录', 'color:green', res);
          localStorage.removeItem("sessionId");
          sessionStorage.removeItem("sessionId");
          that.$store.dispatch("isLogin", false);
          that.$router.push({ path: "/homeContent" });
        })
        .catch(function(error) {
          that.$layer.msg("网络请求错误");
        });
    },
    //跳转页面
    jump(index, type) {
      this.$store.dispatch("reActive", index);
      this.searchDataShow = false;
      if (index == 5) {
        this.$router.push({
          path: "attention"
        });
      } else if (index == 4) {
        this.$router.push({
          path: "collection"
        });
      } else if (index == 3) {
        this.$router.push({
          path: "message"
        });
      } else if (index == 0) {
        console.log("跳转到basicInfo");
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
      } else if (index == 9) {
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
        this.$router.go(0);
      }
    },
    //监听文本框
    animateWidth(name, type) {
      if (type == "blur") {
        this.isFocus = false;
      } else {
        this.isFocus = true;
      }
    }
  },
  computed: {
    ...mapState([
      "isLogin",
      "sendTips",
      "reActive",
      // "searchResults",
      "userData",
      "advisoryData",
      "eventData",
      "zoneData",
      "labelData",
      "userInfo"
    ])
  },
  watch: {
    sendTips: function() {
      let that = this;
      if (that.sendTips.isTip == true) {
        setTimeout(function() {
          that.$store.dispatch("sendTips", { isTip: false, content: "" });
        }, 3000);
      }
    },
    isLogin: function(val, oldVal) {
      const that = this;
      that.ISLogin = val;
    },
    userInfo: function(val, oldVal) {
      const that = this;
      that.userDatas = val;
    },
    "$store.state.userInfo": {
      handler: function() {
        let data = this.$store.state.userInfo;
        data.messageNumber || data.topicNumber
          ? (this.point = true)
          : (this.point = false);
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "common.scss";

.nav-enter-active,
.nav-leave-active {
  transition: height 5s;
}

.nav-enter,
.nav-leave-to {
  transition: height 5s;
}

header {
  height: 62px;
  background-color: #0c1e2c;
  position: fixed;
  z-index: 999;
  width: 100%;
  $slHeight: 30px;
  $slHeight60: 60px;
  $font-size12: 12px;
  .main {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    font-size: 0;
    position: relative;
    & > h1 {
      @include ibMid();
      width: 156px;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 48px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    nav {
      width: 500px;
      height: 100%;
      @include ibMid();
      color: white;
      & > li {
        width: 20%;
        list-style: none;
        text-align: center;
        height: 100%;
        line-height: $slHeight60;
        box-sizing: border-box;
        cursor: pointer;
        float: left;
        position: relative;
        font-family: MicrosoftYaHei;
        transition: color 0.3s, background-color 0.3s;

        & > a {
          color: white;
          display: block;
          height: 100%;
          width: 100px;
          & > h2 {
            font-size: 16px;
            font-weight: 400;
          }
        }
        & > span {
          display: block;
          height: 4px;
          position: absolute;
          top: 0;
          width: 100%;
        }
        & > h2 {
          font-weight: 400;
          @include ibMid();
          margin-right: 5px;
          font-size: 16px;
        }
        & > div {
          @include ibMid();
          width: 10px;
          height: 10px;
          background-image: url("../../static/img/icon_arrow_down.png");
          background-size: 100% 100%;
          transition: all ease-in-out 0.3s;
        }
        &:hover .navborderTop {
          background-color: #cee300;
        }
        &:hover {
          &:not(:first-child) {
            background-color: #243e55;
          }

          & > div {
            transform: rotate(180deg);
          }
        }
        &:hover > ul {
          display: block;
        }
        & > ul {
          background: #fff;
          border-radius: 2px;
          color: #8e8e8e;
          display: none;
          border: 1px solid #ededec;
          box-sizing: border-box;
          & > li {
            line-height: $slHeight;
            position: relative;
            font-size: 14px;
            cursor: pointer;
            color: #6c6c6c;
            &:hover ul {
              display: block;
            }
            &:hover {
              background-color: #f8f8f8;
              @include listBorderRadius();
              ul {
                color: #6c6c6c;
              }
              & > p {
                color: #49bdff;
              }
            }
            a {
              color: #6c6c6c;
              padding: 2px 4px;
              &:hover {
                color: #49bdff;
              }
            }
            //a {
            & > p {
              color: #6c6c6c;
              padding: 2px 4px;
            }
            & > ul {
              background: #fff;
              border-radius: 2px;
              width: 100%;
              right: -100%;
              top: 0;
              position: absolute;
              display: none;
              border: 1px solid #ededec;
              box-sizing: border-box;
              li {
                padding: 5px;
                line-height: $slHeight;
                &:hover {
                  background-color: #f8f8f8;
                  @include listBorderRadius();
                  & > a {
                    color: #49bdff;
                  }
                }
                a {
                  display: block;
                  color: #6c6c6c;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            //}
          }
        }
      }
      @include clearFloat();
    }

    .forumCenter {
      @include ibMid();
      width: 130px;
      height: 55px;
      cursor: pointer;
      background-size: 100% 100%;
      background-image: url("../../static/img/forumCenter.png");
      &:hover {
        background-image: url("../../static/img/forumCenterHover.png");
      }
    }
    .searchBar {
      width: 282px;
      height: 100%;
      @include ibMid();
      margin: 0 18px 0 18px;
      & > div {
        height: 100%;
        position: relative;
        width: 80px;
        & > div {
          width: 282px;
          height: 34px;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          background-color: #243e55;
          border-radius: 2px;
          & > div {
            width: 80px;
            height: 100%;
            @include ibMid();
            padding: 0 10px;
            cursor: pointer;
            box-sizing: border-box;
            & > span {
              @include ibMid();
              &:nth-of-type(1) {
                font-size: 14px;
                color: #8d8d8d;
                text-align: center;
                height: 100%;
                line-height: 34px;
                margin-right: 12px;
              }
            }
            & > img {
              @include ibMid();
              width: 10px;
              height: 10px;
            }
          }
          & input {
            font-size: 14px;
            width: 70%;
            border: none;
            outline: none;
            height: 100%;
            background: #243e55;
            color: white;
            box-sizing: border-box;
            padding: 0 34px 0 5px;
            @include ibMid();
          }
          & > a > img {
            cursor: pointer;
            width: 23px;
            height: 23px;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      ul {
        width: 68px;
        background-color: white;
        border-radius: $borRad;
        li {
          line-height: $slHeight;
          font-size: $font-size12;
          text-align: center;
          &:hover {
            color: #49bdff;
            background-color: #ececec;
            cursor: pointer;
            @include listBorderRadius();
          }
        }
      }
    }

    .hasLogged {
      position: relative;
      & > a > img {
        @include ibMid();
        margin-right: 30px;
        cursor: pointer;
      }
      .point {
        position: absolute;
        width: 8px;
        height: 8px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: red;
        top: 15px;
        left: 15px;
      }
      h3 {
        @include ibMid();
        width: 40px;
        height: 62px;
        position: relative;
        & > img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          position: absolute;
          border: 1px solid white;
          box-sizing: border-box;
          top: 50%;
          transform: translateY(-50%);
          background: white;
        }
        &:hover > .personal {
          display: block;
        }
        .personal {
          display: none;
          position: absolute;
          width: 170px;
          top: 62px;
          right: -5px;
          & > div {
            height: 66px;
            background-size: 100%;
            background-image: url("../../static/img/bg_man.png");
            padding: 6px 0 0px 25px;
            box-sizing: border-box;
            p {
              font-size: 14px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              cursor: pointer;
            }
            ul {
              margin-top: 10px;
              font-size: 0;
              li {
                @include ibMid();
                margin-right: 5px;
                img {
                  width: 22px;
                  height: 20px;
                  cursor: pointer;
                }
              }
            }
          }
          ol {
            padding: 7px 0;
            background: #fff;
            border-bottom: 1px solid #e7e7e7;
            li {
              height: 40px;
              line-height: 40px;
              padding-left: 25px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(108, 108, 108, 1);
              cursor: pointer;
              transition: color 0.3s, background-color 0.3s;
              &:hover {
                background: #ebeff2;
                color: #49bdff;
                font-weight: bold;
              }
              a {
                color: rgba(108, 108, 108, 1);
                &:hover {
                  color: #49bdff;
                }
              }
            }
          }
          & > p {
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            height: 42px;
            line-height: 42px;
            color: rgba(192, 192, 192, 1);
            padding-left: 25px;
            background: #fff;
            span:hover {
              font-weight: bold;
              cursor: pointer;
              color: #49bdff;
            }
          }
        }
      }

      @include ibMid();
    }
    .notLogged {
      @include ibMid();
      font-size: 0;
      li {
        @include ibMid();
        margin-right: 20px;
        a {
          color: white;
          font-size: 14px;
          &:hover {
            color: #48befe;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .tips {
    width: 100%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: rgba(230, 128, 45, 1);
    opacity: 0.7;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    bottom: -60px;
    z-index: 999;
  }
}
</style>
