// pages/diary/diary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:true,
    timenum:"00:00",
    setInter:null,
    time:0,
    timeclick:0
  },
   imgclick1(){
     this.setData({
       isActive:false
     })
    //  开始计数
    var _this = this;
    // console.log(this.data.time+1);
    this.data.setInter = setInterval(function(){
      _this.setData({
        time:_this.data.time+1
      })
      if(_this.data.time>9&&_this.data.time<=60){
        _this.data.timeclick = "00:"+_this.data.time;
      }else if(_this.data.time<=9){
        _this.data.timeclick = "00:0"+_this.data.time;
      }else if(_this.data.time>60){
        if(_this.data.time<70){
           // 分钟minute
        var minuto = Math.floor(_this.data.time/60);
        // 秒second
        var second = (_this.data.time%60);
        _this.data.timeclick = "0"+minuto+":0"+second;
        }else if(_this.data.time>70){
          // 分钟minute
        var minuto = Math.floor(_this.data.time/60);
        // 秒second
        var second = (_this.data.time%60);
        if(minuto>=10){
          minuto = minuto;
        }else{
          minuto = "0"+minuto;
        }
        if(second>=10){
          _this.data.timeclick = minuto+":"+second;
        }else{
          _this.data.timeclick = minuto+":0"+second;
        }
        }
      }
      _this.setData({
        timenum:_this.data.timeclick
      })
    },1000);
   }, 
   imgclick2(){
    this.setData({
      isActive:true
    })
    var that =this;
      //清除计时器  即清除setInter
      clearInterval(that.data.setInter)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.setInter);
    this.setData({
      timenum:"00:00",
      time:0,
      timeclick:0
    })
    this.setData({
      isActive:true
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})