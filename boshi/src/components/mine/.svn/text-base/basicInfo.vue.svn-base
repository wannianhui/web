<template>
  <div class="module">
    <ul>
      <!-- 基本资料 -->
      <li>
        <h3>
          <span>基本资料</span>
          <button @click="basicInfos()">保存</button>
        </h3>
        <ol>
          <li>
            <span><sup>*</sup>用户名</span>
            <input type="text" v-model="userDatas.userExtend.nick">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span><sup>*</sup>性别</span>
            <!-- 性别一男二女 -->
            <label><input type="radio" v-model="userDatas.userExtend.sex" value="1"/>男</label>
            <label><input type="radio" v-model="userDatas.userExtend.sex" value="2"/>女</label>
          </li>
          <li>
            <span>职业</span>
            <input type="text" v-model="userDatas.userExtend.occupation">
          </li>
          <li>
            <span>个性签名</span>
            <input type="text" v-model="userDatas.userExtend.brief">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span>注册</span>
            <p>{{userDatas.userExtend.create_time}}</p>
          </li>
        </ol>
      </li>
      <!-- 教育背景 -->
      <li>
        <h3>
          <span>教育背景</span>
          <button @click="updateBg()">保存</button>
        </h3>
        <ol>
          <li>
            <span>学校机构</span>
            <input type="text" placeholder="请填写学校" v-model="userDatas.userExtend.education1">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <!--<li>-->
            <!--<span>学校机构</span>-->
            <!--<input type="text" placeholder="请填写学校" v-model="userDatas.userExtend.education2">-->
            <!--&lt;!&ndash; <p>阿斯顿发送到发</p> &ndash;&gt;-->
          <!--</li>-->
        </ol>
      </li>
      <!-- 联系方式 -->
      <li>
        <h3>
          <span>联系方式</span>
          <button @click="contactInfos()">保存</button>
        </h3>
        <ol>
          <li>
            <span>QQ</span>
            <input type="text" v-model="userDatas.userExtend.q_q_contact">
            <!-- <p>阿斯顿发送到发</p> -->
            <select name="" id="" v-model="qqSelected" @change='getValue({type:"qq"})'>
              <!-- <option value="">--请选择--</option> -->
              <option v-for='item in optionList' v-bind:value="item.value">{{ item.value }}</option>
            </select>
          </li>
          <li>
            <span>微信</span>
            <input type="text" v-model="userDatas.userExtend.we_chat_contact">
            <select name="" id="" v-model="wxSelected" @change='getValue'>
              <option v-for='item in optionList' v-bind:value="item.value">{{ item.value }}</option>
            </select>
          </li>
        </ol>
      </li>
      <!-- 官方认证专员 -->
      <li>
        <h3 class="official">
          <span>官方认证专员</span><span>（认证资料保密）</span>
          <router-link to="/official" v-if="userDatas.is_official_certification_specialist==0"
                       @click="jump('verified')">
            <img src="../../../static/img/icon_add_blue.png" alt="">
            <span>添加认证</span>
          </router-link>
          <!-- <span >未认证</span> -->
          <span v-else>已认证</span>
        </h3>
        <ol>
          <li v-show="userDatas.is_official_certification_specialist==1">
            <span>认证日期</span>
            <p>{{auditTime}}</p>
          </li>
          <li v-show="userDatas.is_official_certification_specialist==0">
            <p>未认证</p>
          </li>
        </ol>
      </li>
      <!-- 产品认证 -->
      <li class="productAuthentication">
        <h3 class="product">
          <span>产品认证</span>
          <select name="" id="" v-model="prSelected" @change='getValue({type:"pro"})'>
            <!-- <option value="">--请选择--</option> -->
            <option v-for='item in optionList' v-bind:value="item.value">{{ item.value }}</option>
          </select>
          <p>
            <router-link to="/commissioner">
              <img src="../../../static/img/icon_add_blue.png" alt="">
              <span>添加认证</span>
            </router-link>
          </p>
        </h3>
        <ol v-for="item in userDatas.listProductSpecialistName"
            v-if="userDatas.is_relevant_product_specialist == 1"
            style="margin-bottom: 25px;">
          <li style="margin-bottom: 10px;">
            <span>产品类别</span>
            <p>{{item.name}}</p>
          </li>
          <li>
            <span>产品序列</span>
            <p>{{item.serial}}</p>
          </li>
        </ol>
        <p v-else>未认证</p>
      </li>
      <!-- 会员认证 -->
      <li>
        <h3>
          <span>VIP会员</span>
          <select name="" id="" v-model="viSelected" @change='getValue({type:"vip"})'>
            <!-- <option value="">--请选择--</option> -->
            <option v-for='item in optionList' v-bind:value="item.value">{{ item.value }}</option>
          </select>
          <p v-if="userDatas.is_v_i_p_member == 0">
            <router-link to="/vip">
              <img src="../../../static/img/icon_add_blue.png" alt="">
              <span>申请会员</span>
            </router-link>
          </p>
          <p v-else class="verified">已认证</p>
        </h3>
        <ol v-if="userDatas.is_v_i_p_member == 1">
          <li>
            <span>营业执照</span>
            <p v-if="userDatas.membership!=null">{{userDatas.membership.business_license}}</p>
          </li>
          <li>
            <span>所售产品</span>
            <p v-for="(item,index) in userDatas.listMembershipProductName">{{item.name}}、</p>
          </li>
        </ol>
        <!--<p v-if="userDatas.is_v_i_p_member == 0">未认证</p>-->
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        gender: '', //男或女
        userDatas: {
          userExtend: {
            nick: '',
            head: '',
            sex: 1,
            occupation: '',
            brief: '',
            create_time: ''
          },
          membership: {
            business_license: ''
          }
        },
        auditTime: '', //官方认证专员 认证时间
        qqSelected: "仅自己可见",
        wxSelected: '仅自己可见',
        prSelected: '仅自己可见',
        viSelected: '仅自己可见',
        optionList: [
          {value: '仅自己可见'},
          {value: '所有人可见'},
        ], //下拉选
      }
    },
    mounted: function () {
      let that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      let userInfo = that.userInfo;
      that.userDatas = userInfo;
      console.log(that.userDatas, 180)
      userInfo.userExtend.is_q_q_contact == 1 ? that.qqSelected = "所有人可见" : '';
      userInfo.userExtend.is_we_chat_contact == 1 ? that.wxSelected = "所有人可见" : '';
      userInfo.is_official_certification_specialist == 1 ? that.auditTime = userInfo.ApplyRelevantProductSpecialist.audit_time : '';
    },

    components: {},
    computed: {
      ...mapState([
        "isLogin",
        "userInfo",
      ])
    },
    props: ["listenToName"],
    methods: {
      //更新个人信息接口
      updateInfos({
                    head = '',
                    background = '',
                    brief = '',
                    name = '',
                    education1 = '',
                    education2 = '',
                    sex = 1,
                    qQContact = '',
                    weChatContact = '',
                    isWeChatContact = '',
                    isQQContact = '',
                    isProductSpecialist = '',
                    isMembership = '',
                    occupation = ''
                  } = {}) {
        const that = this;
        that.$http.get(that.$api + "/user/update", {
          params: {
            sessionId: that.sessionId,
            head: head,
            background: background,
            brief: brief,
            nick: name,
            education1: education1,
            education2: education2,
            sex: sex,
            qQContact: qQContact,
            weChatContact: weChatContact,
            isWeChatContact: isWeChatContact,
            isQQContact: isQQContact,
            isProductSpecialist: isProductSpecialist,
            isMembership: isMembership,
            occupation: occupation,
          }
        }).then((res) => {
          // console.log('%c 更新个人信息', 'color:green', res);
          that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          if (res.data.code == 1) {
            that.userDatas.userExtend = res.data.data;
            // name != '' ? that.$emit("listenToName", {name: that.userDatas.userExtend.nick}) : '';//向父组件mine传一个名字
            that.$emit("listenToName", {name: that.userDatas.userExtend.nick})
            that.$store.dispatch('userInfo', that.userDatas);
          }


        }).catch(function (error) {
        });
      },
      //选择各种分类
      getValue: function ({
                            type = ''
                          } = {}) {
        const that = this;
        if (type == 'qq') {
          // console.log('您选择了', that.qqSelected)
          // that.qqSelected =
        } else if (type == 'vip') {
          let isMembership = that.viSelected == '仅自己可见' ? isMembership = 0 : isMembership = 1;
          that.updateInfos({isMembership: isMembership})
        } else if (type == 'pro') {
          let isProductSpecialist = that.prSelected == '仅自己可见' ? isProductSpecialist = 0 : isProductSpecialist = 1;
          that.updateInfos({isProductSpecialist: isProductSpecialist})
        }
      },
      jump(type) {
        if (type == 'verified') {
          this.$router.push({
            path: 'official',
          })
        }
      },
      // 基本资料的保存
      basicInfos() {
        let that = this; //name   sex   occupation  brief
        // console.log(that.userDatas,297)
        let userDatas = that.userDatas;
        let userExtend = userDatas.userExtend;
        let nick = '';

        userExtend.sex == 0 ? userDatas.userExtend.sex = 1 : '';//默认为男
        // userExtend.nick == that.userInfo.userExtend.nick ? '' : nick = userExtend.nick; //判断是否修改过了
        nick = userExtend.nick;

        that.updateInfos({
          name: nick,
          brief: userExtend.brief,
          sex: userExtend.sex,
          occupation: userExtend.occupation
        })
      },
      //更新背景
      updateBg() {
        let that = this; //name   sex   occupation  brief
        let userExtend = that.userDatas.userExtend;
        that.updateInfos({
          education1: userExtend.education1,
          education2: userExtend.education2
        })
      },
      //更新联系方式
      contactInfos() {
        let that = this; //name   sex   occupation  brief
        let userExtend = that.userDatas.userExtend;
        let isWeChatContact = 0, isQQContact = 0;
        if (that.qqSelected == "所有人可见") {
          isQQContact = 1;
        }
        if (that.wxSelected == "所有人可见") {
          isWeChatContact = 1;
        }
        that.updateInfos({
          qQContact: userExtend.q_q_contact,
          weChatContact: userExtend.we_chat_contact,
          isWeChatContact: isWeChatContact,
          isQQContact: isQQContact
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .module {
    box-sizing: border-box;
    padding: 32px 40px 0 40px;
    background: white;
    & > ul {
      background: white;
      & > li {
        padding: 33px;
        border-bottom: 1px solid #E0E0E0;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          border-bottom: 0;
        }
        & > h3 {
          height: 30px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          margin-bottom: 20px;
          color: rgba(57, 57, 57, 1);
          span {
            width: 70px;
            display: inline-block;
            text-align: right;
          }
          .verified {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(192, 192, 192, 1);
          }
          button {
            border: none;
            outline: none;
            width: 72px;
            height: 30px;
            float: right;
            background: rgba(230, 230, 230, 1);
            border-radius: 2px;
            color: #FFFFFF;
            cursor: pointer;
            &:hover {
              background: #69C9FF;
            }
            @include clearFloat();
          }
          & > p {
            font-size: 0;
            @include ibMid();
            float: right;
            cursor: pointer;
            img {
              @include ibMid();
            }
            span {
              @include ibMid();
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(73, 189, 255, 1);
            }
          }
          & > select {
            @include ibMid();
            outline: none;
            border-radius: 2px;
            border: 1px solid rgba(230, 230, 230, 1);
            margin-left: 30px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(192, 192, 192, 1);

          }
        }
        .official {
          & > span:nth-of-type(1) {
            width: 100px;
            text-align: center;
          }
          & > span:nth-of-type(2) {
            width: 130px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(228, 61, 61, 1);
          }
          & > span:nth-of-type(3) {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(192, 192, 192, 1);
            float: right;
            cursor: pointer;
          }
          & > a {
            font-size: 0;
            display: inline-block;
            vertical-align: middle;
            float: right;
            cursor: pointer;
            img {
              @include ibMid();
            }
            span {
              @include ibMid();
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #49bdff;
            }
          }
        }
        & > ol {
          li {
            margin-bottom: 25px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            & > span:nth-of-type(1) {
              @include ibMid();
              width: 70px;
              font-size: 14px;
              text-align: right;
              margin-right: 34px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(192, 192, 192, 1);
              sup {
                color: red;
              }
            }
            & > input {
              @include ibMid();
              border: none;
              outline: none;
              font-size: 14px;
              width: 327px;
              height: 28px;

              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(230, 230, 230, 1);
              border-radius: 2px;
              padding: 0 8px;
              box-sizing: border-box;
            }
            & > p {
              @include ibMid();
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);

            }
            & > div {
              @include ibMid();
              font-size: 0;
              img {
                @include ibMid();
                margin: 0 5px 0 3px;
              }
              span {
                @include ibMid();
                font-size: 12px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(228, 61, 61, 1);
              }
            }
            & > label {
              @include ibMid();
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              margin-right: 26px;
              &:last-child {
                margin-right: 0;
              }
              input[type='radio'] {
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background: url("../../../static/img/icon_nochoice.png") no-repeat center;
                -webkit-appearance: none;
                outline: none;
              }
              input[type=radio]:checked {
                background: url("../../../static/img/icon_choice.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            & > select {
              @include ibMid();
              outline: none;
              margin-left: 4px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(192, 192, 192, 1);
              option {
                background: #E8E8E8;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                &:hover {
                  background: white;
                  color: #49BDFF;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
