<template>
  <section :class="{ 'paddTop': isActive != 0}">
    <div class="banner" v-show="isActive == 0">
      <img :src="userDatas.userExtend.background==null?defaultBackground:userDatas.userExtend.background"
           v-show="isActive == 0">
      <p @click="dressUp()">装扮页面</p>
    </div>
    <div class='popContainer' v-show="isDressUp">
      <div>
        <div>
          <h3>
            <span>一键装扮背景</span>
            <p @click="dressUp()">
              <img src="../../../static/img/icon_arrow_1.png" alt="">
              <span>收起</span>
            </p>
          </h3>
          <ul>
            <li v-for="(item,index) in backgroundList">
              <img :src="item.image==null?defaultBackground:apiImg+item.image" alt="">
              <button class="isUsing" @click="enableImg({img:apiImg+item.image})">启用</button>
              <!-- <button class="use">启 用</button> -->
            </li>
          </ul>
          <button @click="dressUp()">取消</button>
        </div>
      </div>
    </div>
    <div class="mineBox">
      <div class="personal" v-show="isActive == 0">

        <avatar-cutter v-if="showCutter" @cancel="showCutter = false" return-type="url"
                       @enter="uploadAvatar"></avatar-cutter>
        <label for="changeHead">
          <img :src="userDatas.userExtend.head==null?defaultUser:apiImg+userDatas.userExtend.head" alt=""
               @click="showCutter=true">
        </label>
        <!-- <div class="btn" @click="showCutter=true" hidden>点击上传图片</div> -->
        <!-- <input @change="updateAvatar($event)" type="file" id="changeHead"  hidden > -->
        <!-- <input type="file"> -->

        <div class="infoList">
          <ul>
            <li>积分：{{userDatas.userExtend.integral}}</li>
            <li>签到：{{userDatas.userExtend.sign_in}}天</li>
            <li>等级：{{userDatas.userExtend.topic_number}}</li>
          </ul>
          <ol>
            <li>关注：{{userDatas.userExtend.follow}}</li>
            <li>粉丝：{{userDatas.userExtend.fans}}</li>
          </ol>
        </div>
        <div class="data">
          <ul>
            <li>
              <img src="../../../static/img/icon_man_aut_gray1.png" alt="会员VIP" title="会员VIP" v-if="userDatas.is_v_i_p_member == 1">
              <img src="../../../static/img/icon_vip_gray.png" alt="会员VIP" title="会员VIP" v-else>
            </li>
            <li>
              <img src="../../../static/img/icon_man_aut_gray2.png" alt="官方认证人员" title="官方认证人员"
                   v-if="userDatas.is_official_certification_specialist==1">
              <img src="../../../static/img/icon_aut_gray.png" alt="官方认证人员" title="官方认证人员" v-else>
            </li>
            <li>
              <img src="../../../static/img/icon_man_aut_gray3.png" alt="产品专员" title="产品专员"
                   v-if="userDatas.is_relevant_product_specialist==1">
              <img src="../../../static/img/icon_product_gray.png" alt="产品专员" title="产品专员" v-else>
            </li>
          </ul>
          <h3>{{userName}}</h3>
          <!-- <button>关注</button> -->
        </div>
      </div>
      <div :class="{ 'bacWhite': isActive == 0}" class="container">
        <ul>
          <li :class="{ 'active': isActive == index}" v-for="(item,index) in mineList" @click="seActive(item,index)">
            <router-link :to="{ path: item.path , query:{isActive: index}}" class="nav">
              {{item.title}}
            </router-link>
            <div class="point" v-if="item.point && mestopicNumbers"><!--(messageNumber || topicNumber)-->
              {{mestopicNumbers}}
            </div>
          </li>
        </ul>
        <router-view v-if="isRouterAlive" v-bind:realActive='isActive' v-on:changeActive="zidingyi($event)"
                     v-on:listenToName="updateUserName"></router-view>
      </div>
    </div>

  </section>
</template>

<script>
  import common from '@/common/common';
  import AvatarCutter from '@/components/avatar-cutter/avatar-cutter'
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        imgSrc: 'http://www.luckly-mjw.cn/baseSource/picture-avatar-03.png',
        showCutter: false, // 是否显示头像裁剪组件
        isActive: this.$route.query.isActive || 0, //默认选中下标
        isDressUp: false, //是否装扮
        userName: '', //用户名
        userDatas: {
          userExtend: {
            name: '',
            head: '',
            background: '',
          }
        },
        fd: '', //表单
        sessionId: '',
        background: '',
        apiImg: this.$httpImg,
        httpImg: this.global.httpImg, //全局的图片路径
        isRouterAlive: true, //用于路由刷新的问题
        changeHead: '',//修改头像数据
        backgroundList: [{
          image: '',
          id: 0
        }],
        messageNumber: 0, //消息数量
        topicNumber: 0, //帖子数量
        mestopicNumbers:0,
        //搜索框的数据
        mineList: [
          {"id": 1, "title": "个人中心", "path": '/basicInfo', "point": false},
          {"id": 2, "title": "账号与设置", "path": '/setting', "point": false},
          {"id": 3, "title": "我的帖子", "path": '/myPost', "point": false},
          {"id": 4, "title": "我的消息", "path": '/message', "point": true},
          {"id": 5, "title": "我的收藏", "path": '/collection', "point": false},
          {"id": 6, "title": "我的关注", "path": '/attention', "point": false},
          {"id": 7, "title": "我的财富", "path": '/wealth', "point": false},
          {"id": 8, "title": "我的银行卡", "path": '/bankCard', "point": false},
          {"id": 9, "title": "积分兑换", "path": '/integral', "point": false},
          {"id": 10, "title": "用户组", "path": '/userGroup', "point": false},
        ],
      }
    },
    created: function () {
      const that = this;
      that.defaultBackground = common.defaultBackground;
      that.defaultUser = common.defaultUser;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      // that.appInfoSheet();
      that.getNoticeNumber();

    },
    mounted: function () {
      let that = this;

      if (this.isLogin == false) {
        this.$router.go(-1);
        this.$store.dispatch('sendTips', {isTip: true, content: '请先登录'});
      } else {
        that.userDatas = that.userInfo;
        that.userName = that.userDatas.userExtend.name;

        that.userInfo.messageNumber ? that.messageNumber = that.userInfo.messageNumber : '';
        that.userInfo.topicNum ? that.topicNumber = that.userInfo.topicNum : '';

        that.$http.get(that.$api + "/backdrop/list", {
          params: {
            sessionId: that.sessionId,
          }
        }).then((res) => {
          // console.log('%c 获取背景设置列表', 'color:green', res.data.data, 141);
          let list = res.data.data;
          that.backgroundList = list;

        }).catch(function (error) {

        });

      }
      // console.log(that.apiImg + that.userDatas.userExtend.head, 132)
      this.isActive = this.reActive;
    },

    components: {
      AvatarCutter
    },
    computed: {
      ...mapState([
        "isLogin",
        "reActive",
        "userInfo",
        "mestopicNumber",
        // "appInfo"
      ])
    },
    methods: {

      // 上传裁剪好的头像
      uploadAvatar(src) {
        const that = this;
        that.showCutter = false; //关闭裁剪框
        let formData = new FormData();
        const instance = that.$http.create({
          withCredentials: true
        })
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        formData.append('sessionId', that.sessionId);
        let avatarFile = that.imgZhuan(src, "avatar");
        formData.append('head', avatarFile);
        instance.post(that.$api + "/user/updateHead", formData, config).then((res) => {
          // console.log('%c 修改头像', 'color:green', res);
          if (res.data.code == 1) {
            that.$store.dispatch('sendTips', {isTip: true, content: '更换头像成功 (#^.^#)'});
            that.userDatas.userExtend.head = res.data.data;
            // console.log(that.userDatas.userExtend.head,223)
            that.$store.dispatch('userInfo', that.userDatas);
          }

        }).catch(function (error) {

        });
      },
      //获取消息+评论数
      getNoticeNumber(){
        let that=this;
        let str = {
            sessionId:that.sessionId,
            type:-1,
          }
        that.$http
          .post(that.$api + "/user/selectNoticeNumber", that.$qs.stringify(str))
          .then(res => {
            console.log("获取通知评论数",res);
            // that.mestopicNumber = res.data.data;
            that.$store.dispatch('mestopicNumber',res.data.data)
            that.mestopicNumbers=that.$store.state.mestopicNumber
            console.log(that.mestopicNumbers,'that.mestopicNumbers')
          })
          .catch(function(error) {});
      },
      //更新后的名字
      updateUserName: function ({name = ''}) {
        const that = this;
        that.userName = name;
      },
      imgZhuan(base64Data, name) {
        let byteString;

        if (base64Data.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(base64Data.split(',')[1]);
        else
          byteString = unescape(base64Data.split(',')[1]);
        // console.log(byteString,166)
        let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        let ia = new Uint8Array(byteString.length);
        // console.log(mimeString,171)

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        let blob = new Blob([ia], {'type': mimeString}); // 上一步中的函数
        // console.log(blob,182)
        let canvas = document.createElement('canvas');
        let dataURL = canvas.toDataURL('image/jpeg', 0.5);
        // console.log(dataURL,185)
        let fd = new FormData(document.forms[0]);
        fd.append(name, blob, 'image.png');
        return fd.get(name);
      },
      //启用背景图片
      enableImg({img = ''} = {}) {
        const that = this;
        // console.log(img, 155)

        that.$http.get(that.$api + "/user/update", {
          params: {
            sessionId: that.sessionId,
            background: img,
          }
        }).then((res) => {
          // console.log('%c 修改用户基本资料', 'color:green', res);
          if (res.data.code == 1) {
            that.userDatas.userExtend = res.data.data;
            that.dressUp(); //关闭遮罩
            that.$store.dispatch('userInfo', that.userDatas);
            that.$store.dispatch('sendTips', {isTip: true, content: '更换背景成功 (#^.^#)'});
          }
        }).catch(function (error) {
          that.$layer.msg('网络请求失败')
        });

      },
      seActive(item, index) {
        this.$store.dispatch('reActive', index);
        console.log("ok",132)
        // this.isActive = index;
      },
      dressUp() {
        this.isDressUp = !this.isDressUp;
      },
      zidingyi(msg) {
        this.isActive = msg;
      }
    },
    watch: {
      reActive: function () {
        let that = this;
        // console.log("ok",133)
        that.isActive = that.reActive
        if (this.isLogin == false) {
          this.$router.push({
            path: 'homeContent',
            // query: { isActive: 3 },
          })
          this.$store.dispatch('sendTips', {isTip: true, content: '请先登录'});
        }
      },
      "$store.state.userInfo": {
        handler: function(){
          this.userDatas = this.$store.state.userInfo;
          this.messageNumber = this.$store.state.userInfo.messageNumber;
        },
        deep: true,
      },
      "$store.state.mestopicNumber":{
        handler: function(){
          console.log("mestopicNumber更新了");
          
          this.mestopicNumbers = this.$store.state.mestopicNumber
        },
        deep: true,
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .paddTop {
    padding-top: 20px;
  }

  .bacWhite {
    background: white;
  }

  section {
    margin: 62px 0 0 0;
    min-height: 84%;
    .banner {
      position: relative;
      font-size: 0;
      max-width: 1920px;
      margin: 0 auto;
      img {
        width: 100%;
        max-height: 400px;
      }
      p {
        width: 94px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        background: rgba(0, 0, 0, 1);
        opacity: 0.5;
        border-radius: 15px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        top: 11px;
        right: 54px;
      }
    }
    .popContainer {
      position: fixed;
      top: 62px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.1);
      & > div {
        height: 600px;
        overflow: scroll;
        background-image: url('../../../static/img/bg_darkColor.png');
        background-size: 100% 100%;
        & > div {
          width: 1418px;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 43px 0 0 0;
          height: 100%;
          & > h3 {
            font-size: 0;
            margin-bottom: 14px;
            span {
              @include ibMid();
              font-size: 20px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
            p {
              @include ibMid();
              float: right;
              font-size: 16px;
              cursor: pointer;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              font-size: 0;
              a {
                color: rgba(255, 255, 255, 1);
              }
              img {
                @include ibMid();
                width: 6px;
                height: 14px;
                margin-right: 6px;
              }
              span {
                @include ibMid();
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
          & > ul {
            font-size: 0;
            padding: 24px 0 4px 0;
            border-top: 1px solid #228EF0;
            border-bottom: 1px solid #228EF0;
            li {
              width: 438px;
              @include ibMid();
              text-align: center;
              font-size: 0;
              margin: 0 52px 20px 0;
              &:nth-of-type(3n) {
                margin-right: 0;
              }
              img {
                width: 438px;
                min-height: 148px;
                max-height: 250px;
                border: 1px solid rgba(26, 137, 192, 1);
                box-sizing: border-box;
              }
              button {
                border: none;
                outline: none;
                margin-top: 8px;
                width: 84px;
                height: 30px;
                border-radius: 2px;
                color: white;
                cursor: pointer;
                font-size: 14px;
              }
              .isUsing {
                background: rgba(32, 108, 177, 1);
              }
              .use {
                background: #49BDFF;
              }

            }
          }
          & > button {
            display: block;
            margin: 20px auto 0 auto;
            border: none;
            outline: none;
            width: 84px;
            height: 30px;
            background: rgba(207, 227, 0, 1);
            border-radius: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .mineBox {
      width: 1180px;
      margin: 0 auto 100px auto;
    }
    .personal {
      padding: 10px 40px 23px 40px;
      box-sizing: border-box;
      background: white;
      margin: 0 auto 0 auto;
      position: relative;
      & > label img {
        width: 124px;
        height: 124px;
        border-radius: 50%;
        border: 4px solid white;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%, -50%);
        cursor: pointer;
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
            img {
              width: 22px;
              height: 20px;
              cursor: pointer;
            }
          }
        }
        & > h3 {
          font-size: 26px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin: 14px 0 0 0;
        }
      }
    }
    .container {
      width: 1180px;
      box-sizing: border-box;
      & > ul {
        width: 250px;
        float: left;
        border-radius: 2px;
        li {
          position: relative;
          &:first-child {
            height: 68px;
            line-height: 68px;
          }
          height: 50px;
          line-height: 50px;
          background: white;
          border-left: 4px solid white;
          cursor: pointer;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          & > a {
            display: block;
            padding-left: 47px;
            height: 100%;
            color: rgba(51, 51, 51, 1);
          }
          .point {
            position: absolute;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            top: 30%;
            left: 120px;
            background-color: #ff3a3a;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            color: #ffffff;
          }
          // &:hover {
          //   border-left:4px solid #CFE300;
          //   background:#49BDFF;
          //   a {
          //     color:#FFFFFF;
          //   }
          // }
        }
        .active {
          border-left: 4px solid #CFE300;
          background: #49BDFF;
          a {
            color: #FFFFFF;
          }
        }
      }
      .module {
        float: right;
        width: 918px;
        // background:white;
        border-radius: 5px;
      }
      @include clearFloat();
    }
  }

</style>
