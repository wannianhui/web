import Vue from 'vue'
export const mixin = {
  data() {
    return {
      mixindata:22222

    }
  },
  watch: {
    msg: {
      handler(n, o) {
        console.log(n, o, "组件监听sss");
      },
      deep: true
    }
  },
  methods:{
    log() {
        console.log('明细我西in发给ID给你大使馆   ');
        
    },
    getinformation(sessionId){
        let that=this;
        that.$http.get(that.$api + "/user/information?sessionId=" + sessionId).then((res) => {
            console.log('%c minxin获取用户信息', 'color:green', res);
            if (res.data.code == 1) {
              this.integral = res.data.data.userExtend.balance;
              console.log(this.integral+"--------------------------------")
              that.$store.dispatch('userInfo', res.data.data);
              that.userDatas = res.data.data;
              if (res.data.data.messageNumber || res.data.data.topicNumber) {
                that.point = true;
              }
              // that.ISLogin = true;
            }
          }).catch(function (error) {
            that.$layer.msg(error)
          });
    }
  },
  mounted() {
   
  }
}
export const aaaa = {
    name:'889gdskgbsdghsdyigsd'
}