import http from "./http";

class API {
  constructor() {}
  //定义一些获取数据的接口


  // 获取公众号授权登录url
  authLogin = params =>{
    return http.get("/api/account/authLogin",params);
  };

  // 获取播放地址
  getPlayUrl = params =>{
    return http.get("/api/room/getPlayUrl",params);
  };

  // 大赛奖励，大赛介绍，合作单位
  getOtherInfo = params =>{
    return http.get("/api/room/otherInfo",params);
  };

  // 选手列表
  getPlayerList = params =>{
    return http.get("/api/player/list",params);
  };

  // 礼物列表
  getGift = params =>{
    return http.get("/api/gift/pageGift",params);
  };

  // 公众号二维码
  getQrCode = params =>{
    return http.get("/api/room/qrCode",params);
  };

  // 创建礼物订单
  createGiftgive = params =>{
    return http.get("/api/gift/createGiftgive",params);
  };

  // 支付订单
  wxpay = params =>{
    return http.get("/api/pay/pay",params);
  };

  // 添加选手
  addPlayer = params =>{
    return http.form("/api/account/info/logs/publish",params);
  };
  
  //在线人数
  onlineNum = params =>{
    return http.get("/api/room/onlineNum",params);
  };

  // 微信分享
  getShareInfo = params =>{
    return http.get("/api/wx/sign/getShareInfo",params);
  };
  //获取选手人气值
  getSumPopularity = params =>{
    return http.get("/api/player/getSumPopularity",params);
  };
}

export default new API();
