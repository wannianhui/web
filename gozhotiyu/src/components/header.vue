<template lang="html">
  <div class="header_wrap" >
    <header>
      <div class="video_wrap">
        <div class="num_wrap view_row">
          <div class="bg"></div>
          <div class="point"></div>
          <p>{{num}}人在看</p>
        </div>
        <div id="id_test_video" :poster="videoPoster" style="width:100%; height:auto;"></div>
        <div id = "video_stop">已经暂停直播</div>
      </div>

      <div class="tab_wrap view_row">
        <div :class="{'tab':true, 'active':currentTab==0}" @click="currentTab=0; pageTo('index')" >参赛选手</div>
        <div :class="{'tab':true, 'active':currentTab==1}" @click="currentTab=1; pageTo('reward')" >人气奖励</div>
        <div :class="{'tab':true, 'active':currentTab==2}" @click="currentTab=2; pageTo('introduce')" >赛事简介</div>
        <div :class="{'tab':true, 'active':currentTab==3}" @click="currentTab=3; pageTo('company')" >合作单位</div>
        <div class="line" :style="{'left': currentTab*25+'%'}"><span></span></div>
      </div>
      <div class="space_gray"></div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 0,
      visitorsNum: 100, // 观看人数
      currentTab: 0,
      videoPoster: "",
      videoUrl: "",
      controlBar: {
        // 设置控制栏属性的参数组合
        playToggle: true, //是否显示播放、暂停切换按钮。
        progressControl: false, //是否显示播放进度条。
        volumePanel: true, //	是否显示音量控制。
        currentTimeDisplay: false, //	是否显示视频当前时间。
        durationDisplay: false, //	是否显示视频时长。
        timeDivider: true, //	是否显示时间分割符。
        playbackRateMenuButton: true, //	是否显示播放速率选择按钮。
        fullscreenToggle: true, //	是否显示全屏按钮。
        QualitySwitcherMenuButton: true //	是否显示清晰度切换菜单。
      }
    };
  },
  created() {
    this.initCurrentTab();
    this.getPlayUrl();
    this.onlineNum();
  },
  mounted() {},
  computed: {},
  methods: {
    onError() {},
    onlineNum() {
      this.$api.onlineNum().then(res => {
        this.num =
          res.data < 9999 ? res.data : (res.data / 10000).toFixed(2) + "万";
      });
    },
    getParams(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    },
    init(video, poster) {
      let width = this.getParams("width");
      let height = this.getParams("height");
      var player = new TcPlayer("id_test_video", {
        m3u8: video, //请替换成实际可用的播放地址
        autoplay: false, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        poster: { style: "cover", src: poster },
        width: width || "480",
        height: height || "211",
        live: true,
        pausePosterEnabled: true,
        volume: 0.5,
        systemFullscreen: true,
        x5_orientation: 0,
        wording: {
          12: "直播尚未开始，敬请期待"
        },
        listener: function(msg) {
          if (msg.type == "error") {
            document.getElementsByClassName(
              "vcp-error-tips"
            )[0].style.fontSize = "14px";
          }
          if (msg.type == "pause") {
            //根据vcp-error-tips这个类名的节点是否有文字提示来决定是否显示暂停直播
            if (!document.getElementsByClassName("vcp-error-tips")[0].innerHTML) {
              document.getElementById("video_stop").style.display = "block";
            }
          }
          if (msg.type == "play") {
            // this.errorBoolean = false;
            document.getElementById("video_stop").style.display = "none";
          }
        }
      });
      if (video) {
        document
          .getElementsByTagName("video")[0]
          .setAttribute("x5-video-player-type", "h5-page");
      }
    },
    initCurrentTab() {
      this.timer = setInterval(() => {
        if (this.$route.matched.length) {
          console.log("this.$route", this.$route);
          this.currentTab = ["index", "reward", "introduce", "company"].indexOf(
            this.$route.name
          );
          clearInterval(this.timer);
        }
      }, 100);
    },
    togglePlay() {
      console.log("togglePlay");
    },
    play() {
      console.log("play()");
      this.player.play();
    },
    getCurrentTime() {
      console.log("getCurrentTime()");
      this.player.currentTime();
    },
    loadNewVideo(url) {
      console.log("loadNewVideo()");
      this.player.load(url);
    },

    // 直播地址
    getPlayUrl() {
      this.$api.getPlayUrl().then(res => {
        console.log(res);
        setTimeout(() => {
          this.init(res.data.playUrl, this.$imgurl + res.data.img);
        }, 500);
      });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../assets/css/public.scss";
.vcp-error-tips {
  font-size: 14px !important;
}
#video_stop {
  display: none;
  font-size: 0.18rem;
  color: red;
  font-family: "微软雅黑";
  position: absolute;
  top: 10%;
  left: 35%;
}
.header_wrap {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;

  .video_wrap {
    #vtcPlayer {
      font-size: 0.18rem;
    }
    .num_wrap {
      position: absolute;
      top: 0.12rem;
      left: 0.12rem;
      z-index: 1000;
      padding: 0.05rem;
      height: 0.26rem;
      width: max-content;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        border-radius: 0.18rem;
        opacity: 0.4;
      }
      .point {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        z-index: 1001;
        margin-right: 0.05rem;
        opacity: 1;
        background-image: url("~@/assets/img/WechatIMG403.png");
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
      }
      p {
        font-size: 0.11rem;
        line-height: 0.26rem;
        font-weight: 400;
        color: rgba(243, 243, 243, 1);
        z-index: 1001;
        opacity: 1;
        padding-right: 0.08rem;
      }
    }
    .tcvideo {
      width: 100%;
      // height: 2.11rem;
      display: block;
      z-index: 999;
    }
  }

  .tab_wrap {
    width: 100%;
    height: 0.4rem;
    position: relative;
    background-color: #fff;
    .tab {
      width: 25%;
      font-size: 0.13rem;
      line-height: 0.4rem;
      font-weight: bold;
      color: #333333;
      text-align: center;
      &.active {
        color: rgba(41, 131, 255, 1);
      }
    }
    .line {
      width: 25%;
      height: 0.03rem;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: left 0.15s ease-out;
      span {
        width: 0.48rem;
        background-color: rgba(41, 131, 255, 1);
        height: 100%;
        margin: 0 auto;
        display: block;
        border-radius: 0.01rem;
      }
    }
  }

  .space_gray {
    height: 0.05rem;
    width: 100%;
    background-color: #f2f5f9;
  }
}
</style>