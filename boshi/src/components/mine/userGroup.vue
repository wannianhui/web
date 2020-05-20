<template>
  <div class="module">
    <h3>
      <ul>
        <li :class="{ 'active': isActive == 0}" @click="setActive(0)">普通用户</li>
        <li :class="{ 'active': isActive == 1}" @click="setActive(1)">产品专员</li>
        <li :class="{ 'active': isActive == 2}" @click="setActive(2)">官方认证专员</li>
        <li :class="{ 'active': isActive == 3}" @click="setActive(3)">会员VIP</li>
      </ul>
    </h3>
    <div v-show="isActive == 0">
      <div class="ordinary"><p>权限说明</p></div>
      <div v-html="userGroupList[3].content">
      </div>
    </div>
    <div v-show="isActive == 1">
      <div class="product"><p>权限说明</p></div>
      <div v-html="userGroupList[2].content">
      </div>
      <button v-if="userDatas.is_relevant_product_specialist == 1" style="color: #fff;">已认证</button>
      <button v-else>
        <router-link to="/commissioner">现在申请</router-link>
      </button>
    </div>
    <div v-show="isActive == 2">
      <div class="official"><p>权限说明</p></div>
      <div v-html="userGroupList[1].content">
      </div>
      <button v-if="userDatas.is_official_certification_specialist == 1" style="color: #fff;">已认证</button>
      <button v-else>
        <router-link to="/official">现在申请</router-link>
      </button>
    </div>
    <div v-show="isActive == 3">
      <div class="member"><p>权限说明</p></div>
      <div v-html="userGroupList[0].content">
      </div>
      <button v-if="userDatas.is_v_i_p_member == 1" style="color: #fff;">已认证</button>
      <button v-else>
        <router-link to="/vip">现在申请</router-link>
      </button>
    </div>

  </div>
</template>

<script>
  import pagination from '@/common/pagination';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        userDatas: '', //用户基本信息
        userGroupList: [
          {content: ''},
          {content: ''},
          {content: ''},
          {content: ''},
        ],
        isActive: 0, //默认下标
      }
    },
    created: function () {
      const that = this;

    },
    mounted: function () {
      const that = this;
      if (that.userGroup.length === 0) {
        that.getUserGroup();
      } else {
        that.userGroupList = that.userGroup;
      }

      if (!this.global.isBlank(this.$route.query.isActive)) {
        // console.log( this.$route.query.isActive ,153 )
        this.isActive = this.$route.query.isActive;
      }
      else if (this.$route.query.isActive == 1) {
        this.isActive = 1;
      }
      else if (this.$route.query.isActive == 2) {
        this.isActive = 2;
      }
      else if (this.$route.query.isActive == 3) {
        this.isActive = 3;
      } else {
        // this.isActive = this.$route.query.isActive;
        this.isActive = 0;
      }
      that.userDatas = that.userInfo;
    },

    components: {
      // 'v-pagination': pagination,
    },
    computed: {
      ...mapState([
        "userGroup",
        "userInfo",
      ])
    },
    methods: {
      //获取用户组数据
      getUserGroup() {
        const that = this;
        that.$http.get(that.$api + "/introduce/list").then((res) => {
          // console.log('%c 获取用户组列表','color:green',res);
          let list = res.data.data;
          that.$store.dispatch('userGroup', list);
          that.userGroupList = list;

        }).catch(function (error) {
        });
      },
      setActive(index) {
        if (index != this.isActive) {
          this.isActive = index;
        }

      },

    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .module {
    box-sizing: border-box;
    min-height: 518px;
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
          margin-right: 40px;
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
      padding: 11px 40px 0 40px;
      box-sizing: border-box;
      background: white;
      min-height: 450px;
      .ordinary, .product, .official, .member {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-size: 100% 100%;
        margin-bottom: 18px;
        p {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
      .ordinary {
        background-image: url('../../../static/img/pic_ordinary.png');
      }
      .product {
        background-image: url('../../../static/img/pic_man_product.png');
      }
      .official {
        background-image: url('../../../static/img/pic_man_official.png');
      }
      .member {
        background-image: url('../../../static/img/pic_man_vip.png');
      }
      & > button {
        border: none;
        outline: none;
        width: 84px;
        height: 30px;
        line-height: 30px;
        background: rgba(73, 189, 255, 1);
        border-radius: 2px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        cursor: pointer;
        display: block;
        margin: 40px auto 0 auto;
        a {
          display: block;
          height: 100%;
          color: rgba(255, 255, 255, 1);
          &:hover {
            background: #69C9FF;
          }
        }
      }
    }
  }

</style>
