<template lang="html">
<div class="container" >

  <div class="detail_wrap">
    <img class="back" src="@/assets/img/icon_back.png" @click="pageBack(-1)" />
    <div class="pp_01"></div>
    <div class="pp_02"></div>
    <div class="content_wrap">
      <div class="title">
        <img src="@/assets/img/athletes_title_text.png" />
      </div>
      <div class="top_wrap view_row">
        <p class="name">{{detail.no}}号 {{detail.realName}}</p>
        <p class="hot">{{num}}</p>
        <p class="sort">排名{{detail.sortNumber}}</p>
      </div>
      <div class="avatar_wrap">
        <img :src="$imgurl + detail.infoImg" />
      </div>
      <p class="btn" @click="support(detail.id)" >为Ta投人气</p>
      <div class="text_wrap" v-html="detail.info" ></div>
    </div>
  </div>
  <popup-gift ref="popupGift" v-on:luanchedGiftCallBack="luanchedGiftCallBack" />
  <popup-authorize ref="popupAuthorize" >
    想为您的选手投票，请进行微信授权，谢谢您的配合
  </popup-authorize>

</div>
</template>

<script>
import popupAuthorize from "@/components/popupAuthorize";
import popupGift from "@/components/popupGift";
export default {
  components: { popupGift, popupAuthorize },
  data() {
    return {
      detail: null,
      // type: '详情',
      num: null,
      show: false
    };
  },
  created() {
    setTimeout(() => {
      this.weixinConfig();
    });
    this.detail = this.$route.query;
    console.log("详情内容", this.detail);
    this.getNum();
  },
  mounted() {},
  watch: {

  },
  methods: {
    // 支持Ta
    // support(id){
    //   this.$parent.support(id);
    // },
    support(id) {
      this.$refs.popupGift.isShow = true;

      if (!this.getSessionId()) {
        this.$refs.popupAuthorize.isShow = true; // 弹出 显示授权
      } else {
        this.$refs.popupGift.isShow = true;
        this.$refs.popupGift.playerId = id; // 选手ID
        if (this.$refs.popupGift.giftList.length == 0)
          this.$refs.popupGift.getGift();
      }
    },

    luanchedGiftCallBack(popularity) {
      console.log("detail- luanchedGiftCallBack : ", popularity);
      // this.detail.popularity += popularity;
      console.log("更新人气");

      this.$refs.popupGift.isShow = false;
      this.show = true;
      this.getNum();
    },
    //获取人气值
    getNum() {
      if(this.show) {
                // this.$toast("发射成功!"); //这个提示不出来

      }
      let param = {
        sessionId: this.getSessionId(),
        playerId: this.$route.query.id
      };
      this.$api.getSumPopularity(param).then(res => {
        console.log("人气值", res);
        this.num = res.data;
        this.show = false
      });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../assets/css/public.scss";
.container {
  .detail_wrap {
    min-height: 7.3rem;
    // height: max-content;
    background: linear-gradient(
      262deg,
      rgba(103, 157, 255, 1) 0%,
      rgba(130, 200, 255, 1) 100%
    );
    position: relative;
    img.back {
      width: 0.2rem;
      height: 0.2rem;
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
    }
    .pp_01,
    .pp_02 {
      background: linear-gradient(
        262deg,
        rgba(103, 157, 255, 1) 0%,
        rgba(130, 200, 255, 1) 100%
      );
      border-radius: 50%;
      position: absolute;
      top: 0.2rem;
      left: 1rem;
      width: 0.18rem;
      height: 0.18rem;
    }
    .pp_02 {
      left: 2.4rem;
      width: 0.9rem;
      height: 0.9rem;
    }
    .content_wrap {
      position: absolute;
      top: 0.5rem;
      left: 3.5%;
      width: 93%;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.1rem;
      padding: 0.4rem 0.18rem 0.2rem;
      box-sizing: border-box;
      .title {
        position: absolute;
        top: -0.14rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0.83rem;
        height: 0.34rem;
        background: url("~@/assets/img/athletes_title_bg.png") no-repeat;
        background-size: 100% 100%;
        img {
          position: absolute;
          top: 0.08rem;
          left: 0.14rem;
          width: 0.55rem;
          height: 0.14rem;
        }
      }
      .top_wrap {
        .name {
          font-size: 0.14rem;
          line-height: 0.2rem;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          flex-grow: 1;
          position: relative;
          padding-left: 0.08rem;
          &:before {
            content: "";
            width: 0.05rem;
            height: 0.05rem;
            background-color: #2484ff;
            display: inline-block;
            position: absolute;
            top: 0.07rem;
            left: 0;
            transform: rotate(45deg);
          }
        }
        .hot {
          font-size: 0.14rem;
          line-height: 0.2rem;
          font-weight: bold;
          color: rgba(255, 155, 48, 1);
          padding: 0 0.07rem;
          background: rgba(255, 239, 222, 1);
          border-radius: 0.1rem;
          &:before {
            content: "";
            background-image: url("~@/assets/img/home_icon_renqi.png");
            background-repeat: no-repeat;
            background-size: 0.1rem 0.13rem;
            background-position: left center;
            padding-left: 0.18rem;
          }
        }
        .sort {
          margin-left: 0.12rem;
          padding: 0 0.13rem;
          background: linear-gradient(
            0deg,
            rgba(255, 155, 48, 1) 0%,
            rgba(255, 174, 59, 1) 100%
          );
          font-size: 0.11rem;
          line-height: 0.2rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
      .avatar_wrap {
        width: 2.45rem;
        height: 2.45rem;
        background: rgba(75, 158, 254, 1);
        border-radius: 0.07rem;
        margin: 0.22rem auto 0.14rem;
        padding: 0.05rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.07rem;
        }
      }
      .btn {
        width: max-content;
        margin: 0 auto 0.18rem;
        padding: 0 0.22rem;
        font-size: 0.12rem;
        line-height: 0.34rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background-color: #24a2ff;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 5%;
          width: 90%;
          height: 0.1rem;
          box-shadow: 0 0.1rem 0.1rem #b8e1ff;
        }
      }
      .text_wrap {
        width: 100%;
        min-height: 2rem;
        padding: 0.12rem 0.25rem;
        background: rgba(233, 242, 255, 1);
        border-radius: 0.03rem;
        box-sizing: border-box;
        font-size: 0.13rem;
        line-height: 0.2rem;
        font-weight: 800;
        color: rgba(68, 68, 68, 1);
        text-indent: 0.13rem;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
}
</style>