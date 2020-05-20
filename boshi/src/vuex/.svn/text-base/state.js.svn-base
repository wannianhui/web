const state={
  /*
    首页
  */
    bannerLbs:[], //首页轮播图
    hotPostLbs:[], //热门帖子
    recommendArticle:[],//推荐文章

  /*
    *header头部导航*
  */
    advisoryData:sessionStorage["advisoryData"]?JSON.parse(sessionStorage["advisoryData"]): [], //资讯信息
    eventData:sessionStorage["eventData"]?JSON.parse(sessionStorage["eventData"]): [], //赛事信息
    zoneData:sessionStorage["zoneData"]?JSON.parse(sessionStorage["zoneData"]): [], //EST专区信息
    // labelData:sessionStorage["labelData"]?JSON.parse(sessionStorage.getItem('labelData')):{},
    labelData:{},
    labelheadr:0,

  /*
    *登录*
  */
    isLogin:localStorage["sessionId"]||sessionStorage["sessionId"]?true:false, //是否登录数据
    accessToken:localStorage["accessToken"]?localStorage["accessToken"]:'', //传token到登录页面

  /*
    *其它*
  */
    reActive:sessionStorage["reActive"]?sessionStorage["reActive"]:'', //下标数据
    initPageNum:false, //是否初始化当前页数
    userData:{
      sessionId:'',
      vip:0,//vip用户
      certification:0,//官方用户
      product:0//产品认证专员
    },
    sendTips:{isTip:false,content:''}, //是否发送提示及提示内容
    // searchResults:{type:0,content:''}, //搜索类型和内容
    mestopicNumber:0, //消息和评论总数

  /*
    *论坛*
  */
    sectionSort:sessionStorage["sectionSort"]?JSON.parse(sessionStorage["sectionSort"]): [], //论坛版块分类数据
    labelId:'', //论坛版块id

  /*
    *个人中心*
  */
    userInfo:sessionStorage["userInfo"]?JSON.parse(sessionStorage["userInfo"]): {}, //用户信息
    appInfo:sessionStorage["appInfo"]?JSON.parse(sessionStorage["appInfo"]): {}, //app基本信息表
    userGroup:[], //用户组数据
    integralRules:[], //积分规则
    attentionList:[], //关注列表
    fansList:[], //粉丝列表
    paidPost:[], //免费或付费帖子
    articleClassify: {},     //文章分类
}

export default state
