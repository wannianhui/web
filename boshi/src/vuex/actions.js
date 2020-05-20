const actions={
  /*
    *首页*
  */
    bannerLbs({commit},data){ //资讯信息
      commit('BANNER_LBS',data)
    },
    hotPostLbs({commit},data){ //热门帖子
      commit('HOT_POST_LBS',data)
    },
    recommendArticle({commit},data){ //推荐文章
      commit('RECOMMEND_ARTICLE',data)
    },

  /*
    *导航栏头部*
  */  
    advisoryData({commit},data){ //资讯信息
      commit('ADVISORY_DATA',data)
    },
    eventData({commit},data){ //赛事信息
      commit('EVENT_DATA',data)
    },
    zoneData({commit},data){ //EST专区信息
      commit('ZONE_DATA',data)
    },
    labelData({commit},data){ //头部label数据
      commit('LABEL_DATA',data)
    },
    labelheadr({commit},data){//头部资讯、赛事等等的标记
      commit('LABEL_HEADER',data)
    },
  /*
    *论坛*
  */
    sectionSort({commit},data){ //保存论坛板块数据
      commit('SECTION_SORT',data)
    },
    labelId({commit},data){ //论坛版块id
      commit('LABEL_ID',data)
    },

  /*
    *其它*
  */
  	isLogin({commit},data){ //是否登录数据
  		commit('IS_LOGIN',data)
  	},
  	sendTips({commit},data){//是否发送提示数据
  		commit('SENT_TIPS',data)
    },
    mestopicNumber({commit},data){//是否发送提示数据
  		commit('MP_NUMBER',data)
    },
    initPageNum({commit},data){//是否初始化页码
      commit('INIT_PAGE_NUM',data)
    },
    reActive({commit},data){//真实下标数据
      commit('RE_ACTIVE',data)
    },
    //搜索类型和内容
    // searchResults({commit},data){
    //   commit('SEARCH_RESULTS',data)
    // },
    // setUser({commit},data){ //设置用户信息
    //   commit('SET_USER',data)
    // },

  /*
    *个人中心*
  */    
    userInfo({commit},data){ //设置用户信息
      commit('USER_INFO',data)
    },
    appInfo({commit},data){ //app基本信息表
      commit('APP_INFO',data)
    },
    userGroup({commit},data){ //用户组数据
      commit('USER_GROUP',data)
    },
    integralRules({commit},data){ //积分规则
      commit('INTERGRAL_RULES',data)
    },
    attentionList({commit},data){ //关注列表
      commit('ATTENTION_LIST',data)
    },
    fansList({commit},data){ //粉丝列表
      commit('FANS_LIST',data)
    },
    paidPost({commit},data){ //粉丝列表
      commit('PAID_POST',data)
    },


    accessToken({commit},data){ //粉丝列表
      console.log(data,91)
      commit('ACCESS_TOKEN',data)
    }    

}

export default actions