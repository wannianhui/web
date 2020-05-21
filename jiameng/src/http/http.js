import http from "./serever"

class API {
  constructor() {}
  //定义一些获取数据的接口

  // 请求登录接口
  login = params =>{
    return http.get("/api/room/otherInfo",params);
  }
}

export default new API();
