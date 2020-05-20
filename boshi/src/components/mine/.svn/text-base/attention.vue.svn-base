<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}" @click="setActive(0)">关注的人</li>
        <li :class="{ 'active': isActive == 1}" @click="setActive(1)">我的粉丝</li>
      </ul>
    </h3>
    <div>
      <h3 v-show="isActive==0">共关注了{{characterInfo.totalRow}}个人</h3>
      <h3 v-show="isActive==1">共{{characterInfo.totalRow}}个粉丝</h3>
      <ul>
        <li v-for="(item,index) in characterInfo.list">
          <img :src="item.head==null?defaultUser:apiImg+item.head" alt=""
               @click="jump({index:'mineOthers',byUserId:item.user_id})">
          <div>
            <p>
              <span @click="jump({index:'mineOthers',byUserId:item.user_id})">{{item.name}}</span>
            <ul>
              <li title="会员VIP" @click="jump({index:9,type:'vip'})" v-if="item.is_membership == 1"></li>
              <li title="官方认证人员" @click="jump({index:9,type:'official'})"
                  v-if="item.is_official_certification_specialist == 1"></li>
              <li title="产品专员" @click="jump({index:9,type:'product'})" v-if="item.is_product_specialist == 1"></li>
            </ul>
            </p>
            <ol>
              <li>关注：{{item.follow}}</li>
              <li>粉丝：{{item.fans}}</li>
            </ol>
          </div>
          <ul>
            <!-- <li v-show="isActive==0,item.state==0" @click="attention({byUserId:item.user_id})">取消关注</li> -->
            <li v-show="isActive==0&&item.state==1"
                @click="attention({byUserId:item.user_id})"
                @mouseover="textOver(index)"
                @mouseleave="textOut(index)">{{activeIndex === index ? '取消关注' : '已关注'}}
            </li>
            <li v-show="isActive==0&&item.state==2" @click="attention({byUserId:item.user_id})">互相关注</li>
            <li class="fans" v-show="isActive==1">
              <router-link :to="{path: 'mineOthers', query:{byUserId:item.user_id}}">查看粉丝</router-link>
            </li>
          </ul>
        </li>

      </ul>
      <div class="pager">
        <v-pagination :total="total" :display="display" :current-page='current' @pagechange="pagechange"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from '@/common/pagination';
  import {mapState} from 'vuex';
  import common from '@/common/common';

  export default {
    data() {
      return {
        total: 0,     // 记录总条数
        display: 0,   // 每页显示条数
        current: 1,   // 当前的页数
        count: '', //传过去的页面数量
        isActive: 0, //默认下标
        apiImg: this.$httpImg,//网络图片前缀
        characterInfo: {
          totalRow: 0
        },
        activeIndex: '', //hover下标
      }
    },
    created: function () {
      const that = this;
      that.defaultUser = common.defaultUser;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
    },
    mounted: function () {
      const that = this;
      if (that.attentionList.length === 0) {
        that.getAttentionList();
      } else {
        that.characterInfo = that.attentionList;
        that.total = that.attentionList.totalRow;
        that.display = that.attentionList.pageSize;
      }
    },

    components: {
      'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "attentionList",
        "fansList"
      ])
    },
    methods: {
      /*
      * 鼠标移入事件
      * */
      textOver(index) {
        this.activeIndex = index;
      },
      /*
      * 鼠标移出事件
      * */
      textOut() {
        this.activeIndex = '';
      },
      //获得关注列表
      getAttentionList({
                         pageNumber = 1,
                         pageSize = 10,
                       } = {}) {
        const that = this;
        that.$http.get(that.$api + "/user/follow/pageFollow", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
          }
        }).then((res) => {
          console.log('%c 获得关注列表', 'color:green', res);
          let list = res.data.data;
          that.$store.dispatch('attentionList', list);
          that.characterInfo = list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },

      //获得粉丝列表
      getFansList({
                    pageNumber = 1,
                    pageSize = 10,
                  } = {}) {
        const that = this;
        that.$http.get(that.$api + "/user/follow/pageFans", {
          params: {
            sessionId: that.sessionId,
            pageNumber: pageNumber,
            pageSize: pageSize,
          }
        }).then((res) => {
          console.log('%c 获得粉丝列表', 'color:green', res);
          let list = res.data.data;
          that.$store.dispatch('fansList', list);
          that.characterInfo = list;
          that.total = list.totalRow;
          that.display = list.pageSize;
        }).catch(function (error) {
        });
      },

      pagechange: function (currentPage) {
        const that = this;
        that.pageNumber = currentPage;
        if (that.isActive == 0) {
          that.getAttentionList({pageNumber: currentPage});
        } else {
          that.getFansList({pageNumber: currentPage});
        }

      },
      setActive(index) {
        if (index != this.isActive) {
          const that = this;
          that.isActive = index;
          that.$store.dispatch('initPageNum', true); //强制初始化页码
          that.pageNumber = 1;
          if (index == 0) {
            // if( that.attentionList.length === 0 ){
            that.getAttentionList();
            // }else {
            //   that.characterInfo = that.attentionList;
            // }
          } else {
            // if( that.fansList.length === 0 ){
            that.getFansList();
            // }else {
            //   that.characterInfo = that.fansList;
            // }
          }
        }
      },
      //关注
      attention: function ({
                             byUserId = '',
                           } = {}) {
        const that = this;
        that.$http.get(that.$api + "/user/follow/save", {
          params: {
            sessionId: that.sessionId,
            byUserId: byUserId,
          }
        }).then((res) => {
          // console.log('%c 关注接口',' :green',res);
          that.getAttentionList({pageNumber: that.pageNumber}); //获得关注列表
          that.$store.dispatch('sendTips', {isTip: true, content: '已取消关注'});

        }).catch(function (error) {
        });

      },
      //跳转页面
      jump({
             index = '',
             type = '',
             byUserId = ''
           } = {}) {
        this.$store.dispatch('reActive', index);
        this.searchDataShow = false;
        if (index == 9) {
          if (type == 'vip') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 3},
            })
          }
          else if (type == 'official') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 2},
            })
          }
          else if (type == 'product') {
            this.$router.push({
              path: 'userGroup',
              query: {isActive: 1},
            })
          }
        }
        else if (index == 4) {
          this.$router.push({
            path: 'collection',
          })
        }
        else if (index == 'mineOthers') {
          this.$router.push({
            path: 'mineOthers',
            query: {byUserId: byUserId}
          })
        }
        else if (index == 3) {
          this.$router.push({
            path: 'message',
          })
        }
        else if (index == 0) {
          this.$router.push({
            path: 'basicInfo',
          })
        }
        else if (index == 1) {
          this.$router.push({
            path: 'setting',
          })
        }
        else if (index == 8) {
          this.$router.push({
            path: 'integral',
            query: {isActive: 1},
          })
        }
        else if (type == 'recharge' && index == 6) {
          console.log("ok")
          this.$router.push({
            path: 'wealth',
            query: {isActive: 3},
          })
        }
        else if (index == 6) {
          this.$router.push({
            path: 'wealth',
          })
        }
        else if (index == 'forumCenter') {
          this.$router.push({
            path: 'forumCenter',
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .pager {
    height: 56px;
    font-size: 14px;
    color: white;
    text-align: center;
    position: relative;
  }

  .module {
    box-sizing: border-box;
    & > h3 {
      height: 68px;
      line-height: 68px;
      padding: 0 40px;
      background: white;
      border-bottom: 1px solid #F2F2F2;
      ul {
        font-size: 0;
        .active {
          color: #333333;
          border-bottom: 2px solid #333333;
        }
        li {
          @include ibMid();
          height: 68px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          box-sizing: border-box;
          cursor: pointer;
          color: #8D8D8D;
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
          border-bottom: 2px solid white;
          &:hover {
            color: #333333;
            border-bottom: 2px solid #333333;
          }
        }
      }
    }
    & > div {
      background: white;
      min-height: 450px;
      padding: 11px 40px 0 40px;
      box-sizing: border-box;

      & > h3 {
        margin: 0 0 5px 0;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(175, 175, 175, 1);
      }
      & > ul {
        & > li {
          font-size: 0;
          border-bottom: 1px solid #F2F2F2;
          padding: 13px 0;
          &:last-child {
            border-bottom: 0;
          }
          & > img {
            @include ibMid();
            width: 46px;
            height: 46px;
            border-radius: 50%;
            margin-right: 14px;
            cursor: pointer;
          }
          & > div {
            @include ibMid();
            & > p {
              font-size: 0;
              margin-bottom: 10px;
              & > span {
                @include ibMid();
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(73, 189, 255, 1);
                margin-right: 8px;
                cursor: pointer;
              }
              & > ul {
                @include ibMid();
                li {
                  @include ibMid();
                  width: 16px;
                  height: 14px;
                  margin-right: 7px;
                  background-size: 100%;
                  cursor: pointer;
                  &:nth-of-type(1) {
                    background-image: url('../../../static/img/icon_man_aut_gray1.png');
                  }
                  &:nth-of-type(2) {
                    background-image: url('../../../static/img/icon_man_aut_gray2.png');
                  }
                  &:nth-of-type(3) {
                    background-image: url('../../../static/img/icon_man_aut_gray3.png');
                  }
                }
              }
            }
            & > ol {
              @include ibMid();
              font-size: 0;
              li {
                @include ibMid();
                font-size: 12px;
                margin-right: 24px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(192, 192, 192, 1);
              }
            }
          }

          & > ul {
            @include ibMid();
            font-size: 0;
            float: right;
            li {
              @include ibMid();
              margin-top: 14px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              cursor: pointer;
              color: rgba(192, 192, 192, 1);
            }
            .fans {
              a {
                color: rgba(239, 107, 60, 1);
              }
            }
          }
        }

      }

    }
  }

  .isAttention {
    &:hover {
      color: rgba(73, 189, 255, 1);
    }
  }

</style>
