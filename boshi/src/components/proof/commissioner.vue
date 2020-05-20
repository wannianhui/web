<template>
  <section>
    <div>
      <div class="applyBg">
        <h2>产品专员申请</h2>
        <h3>产品专员申请通过后，即可成为产品专员，享有网站相关权限。带*为必填内容</h3>
        <p>查看<span><router-link :to="{path: '/userGroup', query:{isActive: 1}}">产品专员特权</router-link></span></p>
      </div>
      <div class="process">
        <div>
          <p>认证流程：</p>
          <div>
            <img src="../../../static/img/icon_result1.png" alt="">
            <span>1.提交资料</span>
          </div>
          <img src="../../../static/img/icon_ellipsis.png" alt="">
          <div>
            <img src="../../../static/img/icon_examine.png" alt="">
            <span>2.平台审核</span>
          </div>
          <img src="../../../static/img/icon_ellipsis.png" alt="">
          <div>
            <img src="../../../static/img/icon_result.png" alt="">
            <span>3.反馈结果</span>
          </div>
        </div>
      </div>
      <div class="applyInfos">
        <div class="select">
          <p><sub>*</sub>已拥有产品</p>
          <ul ref="proList">
            <li v-for="(item, index) in products" :key="index">
              <input type="checkbox"
                     class="selAllType"
                     :value="item.id"
                     v-model="hobbies"
                     :disabled="audit == 1 ? true : false">
              <label>{{item.name}}</label>
            </li>
          </ul>
        </div>
        <ol>
          <li v-for="(item, index) in productList" :key="index">
            <div class="serialNum">
              <h3><sub>*</sub><span>{{item.productId ? item.productId : item.product_id}}</span>产品序列号</h3>
              <input type="text"
                     v-model="item.serial"
                     @input="inputFunc(item.serial, index)"
                     :disabled="audit == 1 ? true : false">
              <p v-show="item.serialText == 1"><img src="../../../static/img/icon_mark.png" alt=""><span>产品序列不正确</span>
              </p>
              <p v-show="(item.serialText == 0)&&(item.serial!='')"><img src="../../../static/img/icon_ok.png" alt="">
              </p>

            </div>
            <div class="pic">
              <p>产品照片<span>（选填）</span></p>
              <div>
                <div>
                  <input type="file"
                         @change="getFile($event, index)"
                         ref="file"
                         :id="'product-img' + index"
                         hidden
                         :disabled="audit == 1 ? true : false">
                  <label :for="'product-img' + index">
                    <img v-if="audit == 3" :src="item.showImg ? item.showImg : defaultImg" alt="">
                    <img v-else-if="!item.showImg && !item.image1" :src="defaultImg">
                    <img v-else :src="item.showImg ? item.showImg : $httpImg + item.image1">
                  </label>
                </div>
                <span>（添加相片验证，请拍摄产品的序列号）</span>
              </div>
            </div>
          </li>
        </ol>

        <button @click="formConfirm" v-if="audit != 1">申请</button>
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
  import pagination from '@/common/pagination';
  import qs from 'qs';

  export default {
    data() {
      return {
        audit: 3, //申请状态
        hobbies: [], //checkbox绑定的数组
        sessionId: '', //唯一标识符
        defaultImg: './static/img/pic_prove.png', //默认占位图
        type: '', //照片类型
        products: [], //产品列表
        haveProducts: [], //已拥有产品
        productList: [], //提交列表
        fd: [], //最终要传值的JsonArray
      }
    },
    mounted: function () {
      this.postsShow = this.latestRanking;
      let that = this;
      let sessionId = '';
      if (localStorage["sessionId"]) {//如果登陆了  sessionId赋值
        that.sessionId = localStorage["sessionId"];
      } else if (sessionStorage["sessionId"]) {
        that.sessionId = sessionStorage["sessionId"];
      }
      that.fd = new FormData();
      //获取产品专员申请状态
      that.getLatestTimeState();
      //获取产品列表
      that.getListProduct();
      //获取已拥有的产品
      that.getListProductUser();
    },

    components: {
      // 'v-pagination': pagination,
    },
    watch: {
      /* 监听checkbox的变化 */
      hobbies(newVal, oldVal) {
        let productList = this.productList;
        if (newVal.length > oldVal.length) {
          productList.push({
            productId: newVal[newVal.length - 1],
          })
        } else {
          let diffArr = this.getArrDifference(newVal, oldVal);
          for (let i = 0; i < productList.length; i++) {
            if (productList[i].productId == diffArr[0]) {
              productList.splice(i, 1);
            }
          }
        }

        console.log('%c 产品数组', 'color: green', productList);
        this.productList = productList;
      },

      productList: {
        handler(val) {
          console.log('深度监听', val);
        },
        immediate: true
      }
    },
    computed: {},
    methods: {
      /*
      * 获取产品专员申请状态
      * */
      getLatestTimeState() {
        const that = this;

        this.$http.get(this.$api + "/apply/product/specialist/getLatestTimeState?sessionId=" + that.sessionId).then((res) => {
          console.log('%c 获取产品专员申请状态', 'color:green', res);

          if (res.data.code === 1) {
            let productList = res.data.data.listImage;
            that.audit = res.data.data.audit;
            let List = [];
            for (let i = 0; i < productList.length; i++) {
              that.hobbies.push(productList[i].product_id);
              let product = productList[i];
              let model = {};
              model.productId = product.product_id;
              model.image1 = product.image1;
              model.serial = product.serial;
              that.productList.push(model);
            }
            // that.hobbies = hobbies; //点亮多选
          } else {
            that.audit = 3;
          }
        })
      },
      /*
      * 获取产品列表
      * */
      getListProduct() {
        const that = this;

        this.$http.get(this.$api + "/product/list?sessionId=" + that.sessionId).then((res) => {
          console.log('%c 获取产品', 'color:green', res);

          if (res.data.code === 1) {
            this.products = res.data.data;
          }
        })
      },
      /*
      * 获取已拥有的产品
      * */
      getListProductUser() {
        const that = this;

        this.$http.get(this.$api + "/apply/product/specialist/listProductUser?sessionId=" + that.sessionId).then((res) => {
          console.log('%c 获取已有产品', 'color:green', res);

          if (res.data.code === 1) {
            this.haveProducts = res.data.data;
          }
        })
      },

      /*
      * 封装的一个input事件，name为input的名字
      * */
      inputFunc(value, index) {
        // let productId = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/; //验证序列号
        const that = this;
        //初始化
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
          regCh = /[\u4E00-\u9FA5\uF900-\uFA2D]/,
          regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (regEn.test(value) || regCn.test(value) || regCh.test(value)) {
          that.productList[index].serialText = 1; //序列号错误
        } else {
          that.productList[index].serialText = 0;
        }
      },

      /*
      * 取出两个数组的不同元素
      * */
      getArrDifference(newVal, oldVal) {
        return newVal.concat(oldVal).filter(function (v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        });
      },

      /*
      * 提交照片
      * */
      getFile(e, index) {
        console.log('上传照片', index);
        let _this = this;
        let type = _this.type;
        var files = e.target.files[0];
        if (!e || !window.FileReader) return; //看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); //这里是最关键的一步，转换就在这里
        console.log(reader);
        reader.onloadend = function () {
          _this.$set(_this.productList[index], 'showImg', this.result); //强制更新DOM
          let img_file = _this.imgZhuan(this.result, "image1");
          let fd = _this.fd;

          fd.append('image', img_file);

          const instance = _this.$http.create({
            withCredentials: true
          });

          /* 请求上传图片接口 */
          instance.post(_this.$api + "/user/updateUpload?sessionId=" + _this.sessionId, fd,
            {
              headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}
            }).then((res) => {
            console.log('%c 上传图片', 'color:green', res);
            if (res.data.code == 1) {
              // _this.productList[index].image1 = "\"" + res.data.data + "\"";
              _this.productList[index].image1 = res.data.data;
            }
            // _this.$layer.msg(res.data.desc);
            _this.fd = new FormData(); //重置fd
          }).catch(function (error) {
            _this.$layer.msg('网络请求失败')
          });
        }
      },

      /*
      * 提交申请
      * */
      formConfirm() {
        const that = this;
        let productList = that.productList;
        let newArr = [];

        console.log(productList);

        for (let i = 0; i < productList.length; i++) {
          delete productList[i].showImg;
          newArr.push(`{serial: "${productList[i].serial}",productId: ${productList[i].productId},image1: "${productList[i].image1}"}`);
        }

        newArr = `[${newArr}]`;
        console.log('%c 最终要提交的表单', 'color: green', newArr);

        /* 未申请的状态 */
        if (that.audit == 3) {
          /* 请求提交申请接口 */
          that.$http.post(that.$api + "/apply/product/specialist/save", qs.stringify(
            {
              "sessionId": that.sessionId,
              "applyProductSpecialistSerialArr": newArr
            }),
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
            console.log('%c 提交申请', 'color:green', res);
            that.$layer.msg(res.data.desc);
            if (res.data.code == 1) { //提交成功
              //获取申请最新状态
              that.getOfficialState();
            }
          }).catch(function (error) {
            that.$layer.msg(error)
          });
        } else if (that.audit == 0 || that.audit == 2) {
          /* 请求更新申请接口 */
          that.$http.post(that.$api + "/apply/product/specialist/update", qs.stringify(
            {
              "sessionId": that.sessionId,
              "applyProductSpecialistSerialArr": newArr
            }),
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
            console.log('%c 更新申请', 'color:green', res);
            that.$layer.msg(res.data.desc);
            if (res.data.code == 1) { //提交成功
              //获取申请最新状态
              that.getOfficialState();
            }
          }).catch(function (error) {
            // that.$layer.msg(error)
          });
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
        background-image: url('../../../static/img/bg_product.png');
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
      .process {
        height: 114px;
        background: #FBFBFB;
        font-size: 0;
        position: relative;
        & > div {
          position: absolute;
          top: 50%;
          left: 70px;
          transform: translateY(-50%);
          & > p, & > img, & > div {
            @include ibMid();
          }
          & > p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(57, 57, 57, 1);
            margin-right: 18px;
          }
          & > div {
            text-align: center;
            margin-right: 12px;
            img {
              margin-bottom: 9px;
            }
            span {
              display: block;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(57, 57, 57, 1);
            }
          }
          & > img {
            margin-right: 16px;
          }
        }
      }
      .applyInfos {
        background: white;
        padding: 34px 70px 92px 70px;
        .select {
          font-size: 0;
          & > p {
            @include ibMid();
            font-size: 14px;
            margin-right: 45px;
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
              input[type='checkbox'] {
                width: 16px;
                height: 16px;
                background: url("../../../static/img/icon_nochoice.png") no-repeat center;
                -webkit-appearance: none;
                outline: none;
              }
              input[type=checkbox]:checked {
                background: url("../../../static/img/icon_choice.png") no-repeat center;
                background-size: 100% 100%;
              }
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
        & > ol {
          li {
            padding: 43px 0 35px 0;
            border-bottom: 1px solid #E5E5E5;
            &:last-child {
              border-bottom: 0;
            }
            .serialNum {
              font-size: 0;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(57, 57, 57, 1);
              & > h3 {
                @include ibMid();
                font-size: 14px;
                margin-right: 17px;
                sub {
                  color: red;
                }
                span {
                  color: #49BDFF;
                  font-family: MicrosoftYaHei-Bold;
                  font-weight: bold;
                  color: rgba(73, 189, 255, 1);
                  margin: 0 2px;
                }
              }
              & > input {
                @include ibMid();
                font-size: 14px;
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
                font-size: 0;
                img {
                  @include ibMid();
                  margin: 0 4px;
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
            .pic {
              font-size: 0;
              & > p {
                @include ibMid();
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(57, 57, 57, 1);
                span {
                  display: block;
                  color: rgba(141, 141, 141, 1);
                }
              }
              & > div {
                @include ibMid();
                font-size: 0;
                margin: 42px 0 0 60px;

                & > div {
                  width: 276px;
                  /*height: 204px;*/
                  /*background-image: url('../../../static/img/pic_prove.png');*/
                  /*background-size: 100% 100%;*/
                  /*border: 1px solid #CACACA;*/
                  display: inline-block;
                  vertical-align: bottom;

                }
                span {
                  display: inline-block;
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(192, 192, 192, 1);
                }
              }
            }
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
