<template lang="html">
  <van-popup v-model="isShow" :close-on-click-overlay="true" position="bottom" :style="{ 'border-radius': '0.11rem 0.11rem 0 0', width: '100%',  overflow: 'initial', }" > 
    <div class="content_wrap">
      <div class="gift_wrap view_row">
        <div :class="['item', 'view_column', {'active':choseGiftIndex==index}]" v-for="(item,index) in giftList" :key="item.id" @click.stop="choseGift(index)" >
          <img :src="$imgurl + item.image" />
          <p class="name">{{item.name}}</p>
          <p class="popularity">{{item.price? item.popularity+'人气' : '免费礼物'}}</p>
        </div>
      </div>

      <div class="bottom_wrap view_row">
        <div class="num_select_wrap view_row" @click="showSelectNum()">
          <p class="num">{{num}}</p>
          <div class="num_select" v-show="selectShow">
            <p :class="['item', {'active': num==n}]" v-for="(n,index) in giftNums" :key="index" @click.stop="selectNum(n)">{{n}}</p>
          </div>
          <div :class="selectShow?'arrow active':'arrow'"></div>
        </div>
        <p class="launch_gift_btn" @click.stop="launchGift()">发射</p>
      </div>
      
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isShow: false, // 当前 popup 组件的显示， 通过父组件调用 ref 修改当前值为 true 显示
      selectShow: false, // 礼物数量选择框的显示
      giftList: [], // 礼物列表
      giftNums: [1, 5, 10, 30, 66, 188, 520, 1314], // 可选礼物数量
      num: 1, // 礼物数量
      choseGiftIndex: 0, // 当前选择礼物的下标
      playerId: 0 // 被赠送选手的 id
    };
  },
  created() {
    this.getGift(); // 获取礼物列表
  },
  mounted() {},
  methods: {
    // 获取礼物列表
    getGift() {
      if (!this.getSessionId()) return false;
      this.$api.getGift({ sessionId: this.getSessionId() }).then(res => {
        console.log("获取礼物列表", res);
        this.giftList = res.data.list.length > 8 ? res.data.list.slice(0, 8) : res.data.list;
        console.log(this.giftList);
      });
    },

    choseGift(index) {
      this.choseGiftIndex = index;
      if (!this.giftList[index].price) {
        this.num = 1;
      }
    },

    showSelectNum() {
      if (this.giftList[this.choseGiftIndex].price) {
        this.selectShow = !this.selectShow;
      }
    },

    // select 选择礼物数量
    selectNum(num) {
      this.num = num;
      this.selectShow = !this.selectShow;
    },

    // 发射礼物
    launchGift(num) {
      console.log();
      // this.$toast("发射成功!");
      let params = {
        sessionId: this.getSessionId(),
        giftId: this.giftList[this.choseGiftIndex].id,
        playerId: this.playerId,
        num: this.num
      };
      this.$api.createGiftgive(params).then(res => {
        console.log(res);
        if (this.giftList[this.choseGiftIndex].price == 0) {
          // this.$toast(`发射${this.giftList[this.choseGiftIndex].name}成功!`);
          // this.$toast("发射成功!");
          this.$emit('luanchedGiftCallBack', 1);
        } else {
          this.doPay(res.data);
        }
      });
    },

    doPay(orderNo) {
      let that = this;
      let params = {
        sessionId: this.getSessionId(),
        orderNo: orderNo,
        payType: 3
      };
      this.$api.wxpay(params).then(res => {
        console.log("支付", res);
        if (res.code == 1) {
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: res.data.appId, //公众号名称，由商户传入
              timeStamp: res.data.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: res.data.nonceStr, //随机串
              package: res.data.package,
              signType: res.data.signType, //微信签名方式：
              paySign: res.data.paySign //微信签名
            },
            (res)=> {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示： res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                that.$toast("发射成功!"); //这个提示不出来
                // this.$emit('luanchedGiftCallBack', that.giftList[ that.choseGiftIndex ].popularity);
                this.$emit('luanchedGiftCallBack');
                alert('发射成功')
                console.log('发射成功');
                
              } else {
                // Callback(false)
              }
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../assets/css/public.scss";
.content_wrap {
  .gift_wrap {
    padding: 0.1rem 0;
    flex-wrap: wrap;
    .item {
      text-align: center;
      margin-top: 0.2rem;
      width: 25%;
      flex-shrink: 0;
      &.active {
        .name {
          color: #2983ff;
        }
        .popularity {
          color: #2983ff;
        }
      }
      img {
        width: 0.45rem;
        height: 0.45rem;
        margin: 0 auto;
      }
      .name {
        font-size: 0.11rem;
        line-height: 0.23rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .popularity {
        font-size: 0.11rem;
        line-height: 1;
        font-weight: 400;
        color: rgba(170, 170, 170, 1);
      }
    }
  }

  .bottom_wrap {
    height: 0.5rem;
    align-items: center;
    border-top: 1px solid rgba(238, 238, 238, 1);
    padding: 0 0.15rem 0 0.27rem;
    justify-content: space-between;
    overflow: initial;
    .num_select_wrap {
      width: 1.04rem;
      height: 0.3rem;
      border: 1px solid rgba(238, 238, 238, 1);
      box-sizing: border-box;
      border-radius: 0.03rem;
      align-items: center;
      position: relative;
      .num {
        margin-left: 0.15rem;
        flex-grow: 1;
        font-size: 0.14rem;
        line-height: 0.3rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .num_select {
        width: 1.04rem;
        position: absolute;
        bottom: 0.32rem;
        border-radius: 0.03rem;
        overflow: hidden;
        p {
          padding-left: 0.15rem;
          box-sizing: border-box;
          width: 100%;
          background-color: #f4f6f9;
          font-size: 0.14rem;
          line-height: 0.3rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          &:last-child {
            border-bottom: 1px solid #f4f6f9;
          }
          &.active {
            background: rgba(41, 156, 255, 1);
            color: #ffffff;
          }
        }
      }
      .arrow {
        width: 0;
        height: 0;
        margin-right: 0.1rem;
        border-width: 0.08rem 0.04rem;
        border-style: solid;
        border-color: #2484ff #fff #fff #fff;
        margin-top: 0.08rem;
        transition: all 0.1s linear;
        &.active {
          border-color: #fff #fff #2484ff #fff;
          margin-top: -0.08rem;
        }
      }
    }
    .launch_gift_btn {
      background: linear-gradient(
        -34deg,
        rgba(41, 131, 255, 1) 0%,
        rgba(41, 161, 255, 1) 100%
      );
      font-size: 0.13rem;
      line-height: 0.28rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      padding: 0 0.18rem;
      border-radius: 0.14rem;
    }
  }
}
</style>