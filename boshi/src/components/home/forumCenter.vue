<template>
  <section>
    <div class="content">
      <div class="img"><img src="../../../static/img/bg_forum.png" alt=""></div>
      <div>
        <div class="forumTitle">
          <img src="../../../static/img/logo_forum.png" alt="" class="forumLogo">
          <ul>
            <li  v-for="(item,index) in classification" :class="{'sortAvtive':index===sortAvtiveIndex}" @click="changeSort(index,item.id)">{{item.name}}</li>
      <!--       <li>行业</li>
            <li>EST</li>
            <li>教程</li>
            <li>交流</li>
            <li>专栏</li> -->
          </ul>
          <!-- <router-link to="/post" class="postImg"> -->
            <img src="../../../static/img/postImg.png" alt="" @click="post()" class="postImg">
          <!-- </router-link> -->
          <img src="../../../static/img/icon_rope.png" alt=""  class="ropeLeft">
          <img src="../../../static/img/icon_rope.png" alt=""  class="ropeRight">
        </div>

        <router-view></router-view>

      </div>

    </div>
  </section>
</template>

<script>
  // import pagination from '@/common/pagination';
  import { mapState } from 'vuex';
  export default{
    data(){
      return{
        classification:[
          {
            "id":'',
            "name":"全部",
          }
        ],
        sortAvtiveIndex:0, //分类版块下标
        // tuiShow:'',//推广
        //
        // total: 150,     // 记录总条数
        // display: 10,   // 每页显示条数
        // current: 1,   // 当前的页数
        // count:'', //传过去的页面数量
      }
    },
    mounted:function(){
      const that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      if( that.sectionSort.length === 0 ){
        that.getSectionData();
      }else {
        let classification = that.classification;
        that.sectionSort.forEach(function (value, index, array) {
            classification.push(array[index])
        });
        that.classification = classification;
        console.log(classification,58)
      }


    },
    components:{
      // 'v-pagination': pagination,
    },
    computed:{
      ...mapState([
        "sectionSort",
        "labelId",
        "initPageNum",
      ])
    },
    methods: {
      //发布帖子
      post(){
        const that = this;
        const sessionId = that.sessionId;
        if(sessionId == ''){
          this.$store.dispatch('sendTips', {
            isTip:true,content:'请先登录'
          });
        }else {
          that.$router.push('post')
        }
      },
      //改变分类版块
      changeSort(index,id){
        const that = this;
        that.$store.dispatch('labelId',id); //存储板块id
        that.$store.dispatch('initPageNum', true); //强制初始化页码
        this.$router.push({path:'/forumCenter'})
        that.sortAvtiveIndex = index;
      },
      //获取板块分类
      getSectionData(){
        const that = this;
        that.$http.get(`${that.$api}/label/listPlateClassification`).then((res)=>{
          console.log('%c 获取板块分类','color:green',res.data.data,48);
          let list = res.data.data;
          let classification = that.classification;
          list.forEach(function (value, index, array) {
              classification.push(array[index])
          });
          that.classification = classification;
          that.$store.dispatch('sectionSort',list);
        }).catch(function (error) {
            that.$layer.msg(error); //提示报错信息
        });
      }
     // pagechange:function(currentPage){
     //   console.log(currentPage);
     //   // ajax请求, 向后台发送 currentPage, 来获取对应的数据

     // }
   },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  section {
    margin:62px 0 0 0;
    min-height:100%;
  }
  .content {
    background:no-repeat;
    min-height:947px;
    position: relative;
    .img{
      position: absolute;
      top: 0;
      height: auto;
      width: 100%;
      margin: 0 auto;
      z-index: -1;
      padding-top: 0;
      text-align: center;
      img{
        max-width: 100%;
      }
    }
    &>div {
      width:1200px;
      margin:0 auto;
      padding-top: 17px;
      .forumTitle {
        height:88px;
        box-sizing:border-box;
        background:#49BDFF;
        margin:0 0 12px 0;
        border:4px solid white;
        position:relative;
        .forumLogo {
          width:156px;
          height:94x;
          position:absolute;
          bottom:0;
          left:23px;
        }
        .postImg {
            width:172px;
            height:70px;
            @include posiVertical();
            right:54px;
          cursor: pointer;
        }
        &>ul {
          .sortAvtive {
            background:#0C1D2B;
            color:#FFF100;
            border:1px solid #FFF100;
          }
          margin-left:210px;
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          li {
            min-width:78px;
            padding:0 7px;
            height:36px;
            text-align:center;
            line-height:36px;
            font-size:16px;
            color:#8D8D8D;
            border-radius:2px;
            background:white;
            margin-right:15px;
            cursor:pointer;
            box-sizing:border-box;
            float:left;
          }
          @include clearFloat();
        }
        .ropeLeft, .ropeRight {
          width:20px;
          height:72px;
          position:absolute;
          top:52px;
        }
        .ropeLeft {
          left:10px;
          z-index: 100;
        }
        .ropeRight {
          right:10px;
          z-index: 100;
        }
      }

    }

  }
</style>
