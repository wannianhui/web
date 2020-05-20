import state from './state'
import * as type from './type.js'
const matutaions={
  /*
    *首页*
  */
    [type.BANNER_LBS](state,data){//轮播图
      
      // state.bannerLbs = data;
      console.log(state.bannerLbs,'iiiiiss');
      
    },
    [type.HOT_POST_LBS](state,data){//热门帖子
      state.hotPostLbs = data;
    },
    [type.RECOMMEND_ARTICLE](state,data){//推荐文章
      state.recommendArticle = data;
    },

  /*
    *导航栏头部*
  */
    //header接口返回的三个专区标签列表的数据
    [type.ADVISORY_DATA](state,data){
      sessionStorage.setItem("advisoryData",JSON.stringify(data));
    },
    [type.EVENT_DATA](state,data){
      sessionStorage.setItem("eventData",JSON.stringify(data));
    },
    [type.ZONE_DATA](state,data){
      sessionStorage.setItem("zoneData",JSON.stringify(data));
    },
    [type.LABEL_DATA](state,data){//头部label数据
      // sessionStorage.setItem("labelData",JSON.stringify(data));
      state.labelData = data
    },
    [type.LABEL_HEADER](state,data){//头部资讯、赛事等等的标记
      state.labelheadr = data
    },

  /*
    *论坛*
  */
    [type.SECTION_SORT](state,data){
      sessionStorage.setItem("sectionSort",JSON.stringify(data));
    },//论坛版块分类数据
    [type.LABEL_ID](state,data){
      state.labelId = data;
    },//论坛版块id

  /*
    *其它*
  */    
    //是否登录数据
    [type.IS_LOGIN](state,data){
      console.log(state,data,50)
        state.isLogin = data;
        // localStorage.setItem("isLogin",JSON.stringify(state.isLogin));
    },
    //是否发送提示数据
    [type.SENT_TIPS](state,data){
      state.sendTips = data;
    },
    [type.MP_NUMBER](state,data){
      state.mestopicNumber = data;
    },
    //是否初始化页码
    [type.INIT_PAGE_NUM](state,data){
      state.initPageNum = data;
    },
    //真实下标数据
    [type.RE_ACTIVE](state,data){
      state.reActive = data;
      // console.log(state,data,65)
      sessionStorage.setItem("reActive",data);
    },
    // //搜索类型和内容
    // [type.SEARCH_RESULTS](state,data){
    //   state.searchResults = data;
    // },
    //设置用户信息
    [type.SET_USER](state,data){
      if(data.is_v_i_p_member==1){
        state.userData.vip = 1;
      }
      if(data.is_official_certification_specialist==1){
        state.userData.certification = 1;
      }
      if(data.is_relevant_product_specialist==1){
        state.userData.product = 1;
      }
    },

  /*
    *个人中心*
  */  
    [type.USER_INFO](state,data){
      state.userInfo = data;
      sessionStorage.setItem("userInfo",JSON.stringify(data));
    },
    [type.APP_INFO](state,data){
      state.appInfo = data;
      sessionStorage.setItem("appInfo",JSON.stringify(data));
    },
    [type.USER_GROUP](state,data){
      state.userGroup = data;
    },
    [type.INTERGRAL_RULES](state,data){
      state.integralRules = data;
    },
    [type.ATTENTION_LIST](state,data){
      state.attentionList = data;
    },
    [type.FANS_LIST](state,data){
      state.fansList = data;
    },
    [type.PAID_POST](state,data){
      state.paidPost = data;
    },

    
    [type.ACCESS_TOKEN](state,data){
      state.accessToken = data;
      localStorage.setItem("accessToken",data);
    },

}

export default matutaions