<template>
  <section>
    <div>
      <div class="applyBg">
        <h2>会员VIP申请</h2>
        <h3>会员申请通过后，即可成为VIP会员，享有网站最高权限。带*为必填内容</h3>
        <p>查看<span><router-link :to="{path: '/userGroup', query: {isActive: 3}}">VIP会员特权</router-link></span></p>
      </div>

      <div class="applyInfos">
        <div class="select">
          <p><sub>*</sub>经销商</p>
          <ul>
            <li>
              <input type="radio"
                     class="selAllType"
                     value="1"
                     v-model="memberList.dealer"
                     :disabled="audit == 1 ? true : false">
              <label>单位</label>
            </li>
            <li>
              <input type="radio"
                     class="selAllType"
                     value="2"
                     v-model="memberList.dealer"
                     :disabled="audit == 1 ? true : false">
              <label>个人</label>
            </li>
            <li>
              <input type="radio"
                     class="selAllType"
                     value="3"
                     v-model="memberList.dealer"
                     :disabled="audit == 1 ? true : false">
              <label>代理商</label>
            </li>
          </ul>
        </div>
        <div class="select">
          <p><sub>*</sub>代理产品</p>
          <ul>
            <li v-for="(item, index) in proList">
              <input type="checkbox"
                     class="selAllType"
                     :value="item.id"
                     v-model="productIdArr"
                     :disabled="audit == 1 ? true : false">
              <label>{{item.name}}</label>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <span><sup>*</sup>用户名</span>
            <input type="text" v-model="memberList.name" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span>公司简称</span>
            <input type="text" v-model="memberList.shortened" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
            <!-- <div>
              <img src="../../../static/img/icon_mark.png" alt="">
              <span>身份证格式错误</span>
            </div> -->
          </li>
          <li>
            <span><sup>*</sup>公司全称</span>
            <input type="text" v-model="memberList.company" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span><sup>*</sup>营业执照号码</span>
            <input type="text" v-model="memberList.business_license" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span>负责人</span>
            <input type="text" v-model="memberList.persons" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
          <li>
            <span><sup>*</sup>联系电话</span>
            <input type="text" v-model="memberList.phone" :disabled="audit == 1 ? true : false">
            <!-- <p>阿斯顿发送到发</p> -->
          </li>
        </ul>
        <ol>
          <li>
            <span><sup>*</sup>营业执照正面</span>
            <input type="file"
                   hidden
                   id="ying_zheng"
                   @change="type=0;getFile($event)"
                   :disabled="audit == 1 ? true : false">
            <label for="ying_zheng">
              <div class="pic">
                <img :src="memberList.business_license_front_image" alt="" v-show="showBase64Positive==false">
                <img :src="ying_zheng" alt="" v-show="showBase64Positive">
              </div>
            </label>
          </li>
          <li>
            <span><sup>*</sup>营业执照背面</span>
            <input type="file"
                   hidden
                   id="ying_bei"
                   @change="type=1;getFile($event)"
                   :disabled="audit == 1 ? true : false">
            <label for="ying_bei">
              <div class="pic">
                <img :src="memberList.business_license_reverse_image" alt="" v-show="showBase64Back==false">
                <img :src="ying_bei" alt="" v-show="showBase64Back">
              </div>
            </label>
          </li>
          <li>
            <span>申请原因</span>
            <textarea rows="3" cols="20" v-model="memberList.reason" :disabled="audit == 1 ? true : false">
            </textarea>
          </li>
        </ol>

        <button @click="apply()" v-if="audit != 1">申请</button>
      </div>
      <ul v-if="audit != 3">
        <li v-show="audit == 0"><img src="../../../static/img/icon_loding.png" alt=""></li>
        <li v-show="audit == 1"><img src="../../../static/img/icon_success.png" alt=""></li>
        <li v-show="audit == 2"><img src="../../../static/img/icon_fail.png" alt=""></li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        dealer: 1, //经销商
        productIdArr: [], // 选择的产品id
        audit: 3,
        name: '',
        proList: [], //产品列表
        shortened: '',//公司简称
        persons: '',//公司负责人
        company: '',//公司全称
        phone: '', //手机号码
        reason: '',//申请原因
        showBase64Positive: false, //是否展示正面
        showBase64Back: false,
        businessLicense: '',//营业执照号码
        ying_zheng: './static/img/pic_license.png',
        ying_bei: './static/img/pic_license.png',
        ying_zheng_file: '',
        ying_bei_file: '',
        fd: {},
        httpImg: this.$httpImg, //图片前缀
        memberList: { //会员列表
          dealer: 1, //经销商
          productIdArr: [], // 选择的产品id
          audit: 3,
          name: '',
          list: [], //产品列表
          shortened: '',//公司简称
          persons: '',//公司负责人
          company: '',//公司全称
          phone: '', //手机号码
          reason: '',//申请原因
          business_license: '',//营业执照号码
          business_license_front_image: './static/img/pic_license.png', //正面
          business_license_reverse_image: './static/img/pic_license.png', //背面
        },
      }
    },
    mounted: function () {
      let that = this;
      let sessionId = '';
      that.fd = new FormData();
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      that.getProList();
      that.getMemberState();

    },

    components: {},
    computed: {},
    methods: {
      //获取会员状态
      getMemberState() {
        const that = this;
        that.$http.get(that.$api + "/apply/membership/getLatestTimeState", {
          params: {
            sessionId: that.sessionId,
          }
        }).then((res) => {
          console.log('%c 获取会员状态', 'color:green', res);
          if (res.data.code === 1) {
            let memberList = res.data.data
            that.memberList = memberList;
            that.audit = memberList.audit;
            if (memberList.list.length > 0) {
              memberList.list.forEach(function (value, index, array) {
                that.productIdArr.push(array[index].product_id);
              });
            }
            let httpImg = that.httpImg;
            console.log(that.httpImg + that.memberList.business_license_front_image, 179)
            that.memberList.business_license_front_image = httpImg + that.memberList.business_license_front_image;
            that.memberList.business_license_reverse_image = httpImg + that.memberList.business_license_reverse_image;
            // that.name = memberList.name;
            // that.persons = memberList.persons;
          }

        }).catch(function (error) {
        });
      },
      //获取产品列表
      getProList() {
        const that = this;
        that.$http.get(that.$api + "/product/list").then((res) => {
          console.log('%c 获取产品列表', 'color:green', res);
          if (res.data.code == 1) {
            that.proList = res.data.data;
          }
        }).catch(function (error) {
        });
      },
      /*
      * 提交申请
      * */
      apply() {
        const that = this;
        let audit = that.audit;
        let memberList = that.memberList;
        let fd = that.fd;
        let updateApi = (audit == 0 || audit == 2) ? updateApi = '/apply/membership/update' : updateApi = '/apply/membership/save';
        let {name, dealer, shortened, persons, company, reason, phone, business_license: businessLicense} = memberList;
        let productIdArr = that.productIdArr;
        let jsonArr = [];
        productIdArr.forEach(function (value, index, array) {
          jsonArr.push(`{productId:${value}}`)
        });
        jsonArr = `[${jsonArr}]`; //合成规格
        // console.log(Array.prototype.isPrototypeOf(jsonArr),181)

        fd.append('dealer', dealer); //经销商,1单位,2个人,3代理商
        fd.append('applyMembershipProductArr', jsonArr); //产品数组
        fd.append('name', name); //用户名
        fd.append('company', company); //公司全称
        fd.append('shortened', shortened); //公司简称
        fd.append('persons', persons); //公司负责人
        fd.append('phone', phone); //联系电话
        fd.append('businessLicense', businessLicense); //营业执照号码
        fd.append('reason', reason); //申请原因
        fd.append('businessLicenseFrontImage', that.ying_zheng_file); //经营执照正面
        fd.append('businessLicenseReverseImage', that.ying_bei_file); //经营执照背面
        const instance = that.$http.create({
          withCredentials: true
        });
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        instance.post(that.$api + updateApi + "?sessionId=" + that.sessionId, fd, config).then((res) => {
          console.log('%c 提交申请', 'color:green', res);
          if (res.data.code == 1) {

            // that.$router.go(-1);
          }
          that.$store.dispatch('sendTips', {isTip: true, content: res.data.desc});
          that.fd = new FormData();//重置fd
        }).catch(function (error) {
          that.$layer.msg('网络请求失败')
        });
      },
      /*
      * 提交照片
      * */
      getFile(e) {
        console.log('上传照片', e);
        let _this = this;
        let type = _this.type;
        var files = e.target.files[0];
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        console.log(reader);
        reader.onloadend = function () {
          if (type == 0) {
            _this.showBase64Positive = true;
            _this.ying_zheng = this.result;
            console.log('图片转换', _this.imgZhuan(this.result, "ying_zheng"))
            _this.ying_zheng_file = _this.imgZhuan(this.result, "ying_zheng");
          } else if (type == 1) {
            _this.showBase64Back = true;
            _this.ying_bei = this.result;
            _this.ying_bei_file = _this.imgZhuan(this.result, "ying_bei");
          }
        }
      },
      /*
      * 图片转换
      * */
      imgZhuan(base64Data, name) {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(base64Data.split(',')[1]);
        else
          byteString = unescape(base64Data.split(',')[1]);
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ia], {type: mimeString}); // 上一步中的函数
        var canvas = document.createElement('canvas');
        var dataURL = canvas.toDataURL('image/jpeg', 0.5);
        var fd = new FormData(document.forms[0]);
        fd.append(name, blob, 'image.png');
        return fd.get(name);
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  section {
    margin: 62px 0 0 0;
    min-height: 84%;
    padding-top: 20px;
    & > div {
      width: 1200px;
      position: relative;
      margin: 0 auto 0 auto;
      padding-bottom: 130px;
      .applyBg {
        height: 130px;
        box-sizing: border-box;
        background-image: url('../../../static/img/pic_vip_a.png');
        background-size: 100% 100%;
        text-align: center;
        padding-top: 10px;
        h2 {
          font-size: 26px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        h3 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin: 10px 0 10px 0;
        }
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 249, 234, 1);
          span {
            text-decoration: underline;
            a {
              color: rgba(255, 249, 234, 1);
            }
          }
        }
      }

      .applyInfos {
        background: white;
        padding: 34px 70px 92px 70px;
        .select {
          font-size: 0;
          margin-bottom: 25px;
          & > p {
            @include ibMid();
            width: 100px;
            text-align: center;
            font-size: 14px;
            sub {
              color: red;
            }
          }
          & > ul {
            @include ibMid();
            font-size: 0;
            li {
              font-size: 16px;
              @include ibMid();
              margin-right: 32px;
              &:last-child {
                margin-right: 0;
              }
              input[type='radio'], input[type='checkbox'] {
                width: 16px;
                height: 16px;
                cursor: pointer;
                background: url("../../../static/img/icon_nochoice.png") no-repeat center;
                -webkit-appearance: none;
                outline: none;
              }
              input[type=radio]:checked, input[type=checkbox]:checked {
                background: url("../../../static/img/icon_choice.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
          }
        }
        & > ul {
          margin-bottom: 25px;
          li {
            margin-bottom: 25px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            & > span:nth-of-type(1) {
              @include ibMid();
              width: 100px;
              font-size: 14px;
              text-align: center;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(57, 57, 57, 1);
              sup {
                color: red;
              }
            }
            & > input {
              @include ibMid();
              border: none;
              outline: none;
              font-size: 14px;
              width: 280px;
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
          }
        }
        & > ol {
          & > li {
            margin-bottom: 25px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            & > span:nth-of-type(1) {
              @include ibMid();
              vertical-align: top;
              width: 100px;
              font-size: 14px;
              text-align: center;
              font-family: MicrsooftYaHei;
              font-weight: 400;
              color: rgba(57, 57, 57, 1);
              sup {
                color: red;
              }
            }
            .pic {
              @include ibMid();
              width: 276px;
              height: 204px;
              // background-image:url('../../../static/img/pic_license.png');
              img {
                width: 100%;
                height: 100%;
              }
            }
            textarea {
              width: 767px;
              max-width: 767px;
              height: 110px;
              max-height: 110px;
              outline: none;
              resize: none;
              @include ibMid();
              padding: 8px;
              border: 1px solid rgba(230, 230, 230, 1);
              border-radius: 2px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              //color: rgba(202, 202, 202, 1);
            }
          }
        }
        & > button {
          display: block;
          border: none;
          outline: none;
          width: 84px;
          height: 30px;
          background: rgba(229, 229, 229, 1);
          border-radius: 2px;
          margin: 43px auto 0 auto;
          color: white;
          cursor: pointer;
          &:hover {
            background: #49BDFF;
          }
        }
      }
      & > ul {
        position: absolute;
        top: 23px;
        right: 81px;
        li {
          @include ibMid();
          img {
            width: 176px;
            height: 150px;
          }
        }
      }

    }
  }

</style>
