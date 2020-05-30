<template>
  <section>
    <div>
      <div class="listCont">
        <h2>{{labelData.label}}</h2>
        <h3>{{labelData.labelSon}}</h3>
        <ul>
          <li v-for="(postsShow,index) in postsShow" v-if="index<6">
            <div>
              <!-- <div :style="{backgroundImage: 'url('+ apiImg + postsShow.img + ')'}" class=""></div> -->
              <el-image :src="apiImg+postsShow.image">
                <div slot="error" class="image-slot default">
                  <img src="@/assets/robot.png" alt />
                </div>
              </el-image>
              <!-- <img :src="apiImg+postsShow.image"> -->
            </div>
            <div>
              <h2>
                <a
                  href="javascript:void(0);"
                  @click="jumpToDetails({id:postsShow.id,labelId:postsShow.label_id,type:postsShow.type})"
                >
                  {{postsShow.title}}
                  <!--  <router-link :to="{path: '/newsDetail', query: {id:postsShow.id,labelId:postsShow.label_id,type:postsShow.type}}">{{postsShow.title}}</router-link> -->
                </a>
              </h2>
              <p v-html="postsShow.remark"></p>
              <ul>
                <li class="postsAvatar">
                  <img :src="apiImg+head_image" alt="logo" />
                  <span>{{postsShow.author}}</span>
                </li>
                <li>
                  <img src="../../../static/img/icon_eye.png" alt />
                  <span>{{postsShow.playback}}浏览</span>
                </li>
                <li>
                  <img src="../../../static/img/icon_finger.png" alt />
                  <span>{{postsShow.praise}}赞</span>
                </li>
                <li>
                  <img src="../../../static/img/icon_time.png" alt />
                  <span>{{postsShow.create_time}}</span>
                </li>
              </ul>
            </div>
            <ul>
              <li>
                <img
                  src="../../../static/img/logo_product.png"
                  alt
                  v-show="postsShow.is_relevant_product_specialist==1"
                />
              </li>
              <li>
                <img
                  src="../../../static/img/logo_aut.png"
                  alt
                  v-show="postsShow.is_official_certification_specialist==1"
                />
              </li>
              <li>
                <img
                  src="../../../static/img/logo_vip.png"
                  alt
                  v-show="postsShow.is_v_i_p_member==1"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="pager">
        <v-pagination
          :total="total"
          :display="display"
          :current-page="current"
          @pagechange="pagechange"
        ></v-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import pagination from "@/common/pagination";
import common from "@/common/common";
import { mapState } from "vuex";

export default {
  data() {
    return {
      total: 0, // 记录总条数
      display: 10, // 每页显示条数
      current: 1, // 当前的页数
      label: "", //第一个小标题
      labelSon: "", //第二个小标题
      sessionId: "",
      labelId: "", //labelId
      apiImg: this.$httpImg,
      pageNumber: 1,
      httpImg: this.global.httpImg, //全局的图片路径
      count: "", //传过去的页面数量
      postsShow: [], //实际展示的列表,
      labelData: {} //对象
    };
  },
  mounted: function() {
    //
    let that = this;
    that.defaultUser = common.defaultUser;

    that.sessionId =
      localStorage["sessionId"] || sessionStorage["sessionId"] || "";
    that.head_image = that.appInfo.head_image;
    that.getArticleList(); //请求下列表的数据
    // //请求web的接口
    // that.$http.get(that.$api+"/information/pageLabel",{
    //   params:{
    //       sessionId:that.sessionId,
    //       pageNumber:that.pageNumber,
    //       labelId:that.id
    //   }
    // }).then((res)=>{
    //   that.total = res.data.data.totalRow;
    //   that.display = res.data.data.pageSize;
    //   that.postsShow = res.data.data.list;
    //   console.log(that.total,that.display)
    //   console.log('%c 请求资讯的接口数0据','color:green',res);
    // })
  },

  components: {
    "v-pagination": pagination
  },
  computed: {
    ...mapState(["appInfo"])
    // labelData:function(val){
    //   console.log(99)
    // },
  },
  created() {
    this.labelData = this.$route.query;
    console.log(this.$route.query);
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      // 拿到目标参数 to.query.id 去再次请求数据接口
      this.labelData = to.query;
      this.getArticleList();
    }
    // labelData:"getArticleList",
    // labelData:{
    //    deep:true,
    //    handler:function(newVal,oldVal){
    //      console.log(newVal,oldVal,103)
    //       const that = this;
    //       that.getArticleList();
    //    },
    //   handler(val, oldVal){
    //       console.log("b.c: "+val, oldVal.c);//但是这两个值打印出来却都是一样的
    //   },
    //   deep:true
    // },
  },
  methods: {
    //跳转到商品详情
    jumpToDetails({ id = "", labelId = "", type = 0, labelName = "" } = {}) {
      const that = this;
      let labelData = that.labelData;

      // labelName = labelData.labelSon==''?labelName=labelData.label:labelName=labelData.labelSon;
      let href = that.$router.resolve({
        path: "newsDetail",
        query: {
          id: id,
          labelId: labelId,
          type: type
          // labelName:that.labelData
        }
      });
      // window.open(href.href, '_blank');
      that.$router.push({
        path: "newsDetail",
        query: { id: id, labelId: labelId, type: type }
      });
    },

    //获取列表的数据
    getArticleList({ labelId = "", pageNumber = 1, pageSize = 10 } = {}) {
      const that = this;
      // window.localStorage.setItem("id15454","12");
      console.log(that.labelData, "labelData");
      // console.log(window.localStorage.setItem("id","12"))
      that.$http
        .get(that.$api + "/information/pageLabel", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            labelId: that.labelData.labelId
          }
        })
        .then(res => {
          let list = res.data.data;
          console.log("%c 获取列表", "color:green", res.data);
          that.postsShow = list.list;
          if (list.list.length > 0) {
            that.postsShow.forEach(function(value, index, array) {
              if (array[index].type == null) {
                array[index].type = 0;
              }
            });
          } else {
            that.$layer.msg("该分类下暂无文章数据 o(╥﹏╥)o！");
          }

          that.total = list.totalRow;
          that.display = list.pageSize;
        })
        .catch(function(error) {
          // that.$layer.msg(error)
        });
    },
    //分页器，请求接口
    pagechange: function(currentPage) {
      let that = this;
      console.log(currentPage);
      //  ajax请求, 向后台发送 currentPage, 来获取对应的数据
      that.$http
        .get(that.$api + "/information/pageLabel", {
          params: {
            sessionId: that.sessionId,
            pageNumber: currentPage,
            labelId: that.labelData.labelId
          }
        })
        .then(res => {
          console.log(res.data);
          that.total = res.data.data.totalRow;
          that.display = res.data.data.pageSize;
          that.postsShow = res.data.data.list;
          res.data.data.list.forEach(v => {
            that.postsShow.push(v);
          });
          console.log("%c 请求资讯的接口数据", "color:green", res);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../common/common.scss";

section {
  margin: 62px 0 0 0;
  min-height: 84%;
  margin-bottom: 95px;
  & > div {
    width: 1200px;
    margin: 0 auto;
    .listCont {
      width: 884px;
      padding-top: 39px;
      h2 {
        font-size: 24px;
        color: #001903;
        display: inline;
        a {
          color: #333333;
          &:hover {
            color: #49bdff;
          }
        }
      }
      h3 {
        font-size: 16px;
        color: #001903;
        margin: 10px 0 15px 0;
      }
      & > ul {
        background: white;
        box-sizing: border-box;
        padding-left: 20px;
        & > li {
          height: 180px;
          margin: 0;
          position: relative;
          padding: 20px 27px 0 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #eff3f5;
          // a {
          // display:block;
          // height:100%;
          & > div {
            &:nth-of-type(1) {
              position: absolute;
              left: -20px;
              top: 0;
              padding: 20px 20px 23px 20px;
              float: left;
              & > img {
                width: 200px;
                height: 136px;
              }
              & > div {
                background-size: 100% 100%;
                width: 200px;
                height: 136px;
                &:hover {
                  opacity: 0.9;
                }
              }
            }
            &:nth-of-type(2) {
              float: right;
              width: 616px;
              color: #8d8d8d;
              padding: 0 5px;
              box-sizing: border-box;
              h2 {
                font-size: 16px;
                color: #333333;
                &:hover {
                  color: #49bdff;
                }
              }
              p {
                @include multiLineOF();
                line-height: 2em;
              }
              ul {
                font-size: 0;
                .postsAvatar {
                  img {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    vertical-align: middle;
                  }
                }
                li {
                  margin-right: 20px;
                  @include ibMid();
                  img {
                    @include ibMid();
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                    vertical-align: top;
                  }
                  span {
                    font-size: 12px;
                    @include ibMid();
                  }
                  &:last-child {
                    margin-right: 0;
                  }
                }
              }
            }
            @include clearFloat();
          }
          & > ul {
            position: absolute;
            right: 30px;
            top: 0;
            li {
              float: left;
              margin-right: 5px;
              img {
                width: 28px;
                height: 45px;
              }
              &:last-child {
                margin-right: 0;
              }
            }
            @include clearFloat();
          }
          // }
        }
      }
    }
    .pager {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      color: white;
      text-align: center;
      position: relative;
    }
  }
}
</style>
