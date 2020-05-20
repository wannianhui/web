<template>
  <section>
    <div>
      <h3>
        <img :src="httpImg+'wxlogo.png'" alt="" v-if="payment!=0">
        <img :src="httpImg+'alilogo.png'" alt="" v-else>
        <span>充值乐豆</span>
        <span>收款方：广东乐博士</span>
        <p><span>{{price}}</span>元</p>
      </h3>
      <div>
        <p><span v-if="payment==0">支付宝</span><span v-else>微信</span> 扫一扫 付款</p>
        <!-- <img :src="httpImg+'erwei.png'" alt=""> -->
        <div id="qrCode">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <p v-if="payment==0" @click="switchPay(1)"><span></span>使用微信支付</p>
      <!-- <p v-else @click="switchPay(0)"><span><</span>使用支付宝支付</p> -->
    </div>
  </section>
</template>

<script>
  import QRCode from 'qrcode'
  export default{
    data(){
      return{
        httpImg:this.global.httpImg, //全局的图片路径
        payment:'', //支付方式
        price:'', //价格
        orderNumber: this.$route.query.desc,  //订单号
        interval: '',
      }
    },
    mounted:function(){
      const that = this;

      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';
      that.payment = that.$route.query.type;
      that.price = that.$route.query.price;
      that.link = that.$route.query.link;
      that.useqrcode(); //调用生成二维码

      //that.pay();

      this.isPay();
    },

    components:{
      QRCode: QRCode
      // 'v-pagination': pagination,
    },
    computed: {
    },
    methods: {
      useqrcode(){
        const that = this;
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, that.link, function (error) {
          if (error) console.error(error)
          console.log('QRCode success!');
        })
      },

      switchPay(type) {
        const that = this;
        if( type == 1 ) {
          that.payment = type;
        }
        else {
          that.payment = type;
        }
      },
      pay({
        price = 0,
        type = '',
      }={}){
        const that = this;
        that.$http.get(that.$api+"/pay/topUp",{
          params:{
            sessionId: that.sessionId,
            // price: that.price,
            price:0.01,
            type: that.payment
          }
        }).then((res)=>{
          console.log('%c 调取支付','color:green',res);
          this.orderNumber = res.data.desc;
        }).catch(function (error) {

        });
      },
      //判断是否支付
      isPay(){
        let that=this
        this.interval = setInterval(() => {
          this.$http.get(this.$api + '/order/checkOrder',{
            params: {
              sessionId: this.sessionId,
              orderNumber: this.orderNumber,
            }
          }).then(res => {
            //console.log(res.data.data.state)
            // console.log(this.orderNumber)
            let state = res.data.data.state;
            console.log(res.data.data,'判断是否支付');
            
            if (state === 2){   //支付成功
              this.$store.dispatch('sendTips', {isTip: true, content: '支付成功，5秒后返回'});
              console.log('支付成功')
              clearInterval(this.interval);
              that.$http.get(
                  that.$api +
                    "/user/information?sessionId=" +
                    localStorage["sessionId"] ||
                    sessionStorage["sessionId"] ||
                    ""
                )
                .then(res => {
                  console.log("%c 获取用户信息", "color:green", res);
                  if (res.data.code == 1) {
                    that.$store.dispatch("userInfo", res.data.data);
                  }
                })
                .catch(function(error) {
                  that.$layer.msg(error);
                });
              setTimeout(() => {
                console.log("支付成功");
                this.$router.push({path:'/wealth'});
              },5000);
            } else if (state === 3){  //支付失败
              this.$store.dispatch('sendTips', {isTip: true, content: '支付失败'});
              clearInterval(this.interval);
            } else if (state === 4){  //取消支付
              this.$store.dispatch('sendTips', {isTip: true, content: '取消支付'});
              clearInterval(this.interval);
            }
          }).catch(err => {console.log(err)})
        },2000)
      },
    },
    beforeDestroy() { //在组件生命周期结束的时候销毁。
      console.log(this.interval)
      clearInterval(this.interval);
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  section {
    margin:62px 0 0 0;
    min-height:84%;
    padding: 14px 0 0 0;
    &>div {
      width:1200px;
      min-height:600px;
      margin:0 auto 16px auto;
      background:white;
      box-sizing:border-box;

      &>h3 {
        height:75px;
        line-height:75px;
        padding:0 15px 0 17px;
        font-size:0;
        background:#EFF4FF;
        &>img {
          @include ibMid();
        }
        &>span {
          @include ibMid();
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          &:nth-of-type(1) {
            margin:0 14px;
          }
          &:nth-of-type(2) {
            font-size:14px;
            color:#8D8D8D;
          }
        }
        &>p {
          float:right;
          @include ibMid();
          font-size:14px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:#8D8D8D;
          span {
            margin-right:6px;
            color:rgba(255,102,0,1);
            font-size:24px;
          }
        }
      }
      &>div {
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(141,141,141,1);
        &>p {
          text-align:center;
          margin:20px 0;
        }
        &>div canvas {
          width:206px!important;
          height:206px!important;
          display:block;
          margin:0 auto;
          border:1px solid #E5E5E5;
        }
      }
      &>p {
        margin:87px 0 0 30px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#8D8D8D;
        cursor:pointer;
        span {
          margin-right:6px;
        }
        &:hover {
          color:#49BDFF;
        }
      }
    }
  }

</style>
