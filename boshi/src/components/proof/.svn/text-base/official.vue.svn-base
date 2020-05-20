<template>
  <section>
    <div>
      <div class="applyBg">
        <h2>官方认证专员申请</h2>
        <h3>官方专员申请通过后，即可成为官方认证专员，享有相关权限。带*为必填内容</h3>
        <p>查看<span><router-link :to="{path: '/userGroup', query:{isActive: 2}}">官方专员特权</router-link></span></p>
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
        <ul>
          <li>
            <span><sup>*</sup>真实姓名</span>
            <input
              type="text"
              v-model="name"
              :disabled="audit == 1 ? true: false">
          </li>
          <li>
            <span><sup>*</sup>身份证号码</span>
            <input
              type="text"
              placeholder="请填写身份证号码"
              v-model="idCard"
              @input="inputFunc('idCard')"
              :disabled="audit == 1 ? true: false">
            <div>
              <span v-show="cardText!=0"><img src="../../../static/img/icon_mark.png" alt="">身份证格式有误</span>
              <span v-show="(cardText==0)&&(idCard!='')&&(audit!=1)"><img src="../../../static/img/icon_ok.png" alt=""></span>
            </div>
          </li>
          <li>
            <span><sup>*</sup>手机号码</span>
            <input
              type="text"
              placeholder="请填写联系电话"
              v-model="mobile"
              @input="inputFunc('mobile')"
              :disabled="audit == 1 ? true: false">
            <div>
              <span v-show="phoneText!=0"><img src="../../../static/img/icon_mark.png" alt="">手机格式错误</span>
              <span v-show="(phoneText==0)&&(mobile!='')&&(audit!=1)"><img src="../../../static/img/icon_ok.png" alt=""></span>
            </div>
          </li>
          <li>
            <span>QQ/微信</span>
            <input
              type="text"
              v-model="thirdPartyTypeNumber"
              :disabled="audit == 1 ? true: false">
          </li>
        </ul>
        <ol>
          <!-- 身份证正面照片 -->
          <li>
            <div>
              <p><sup>*</sup>手持身份证信息面照片：</p>
              <!-- <input type="file" @change="getFile" ref="file" id="sf-zheng" hidden> -->
              <div class="cardImg">
                <input
                  type="file"
                  @change="type=0;getFile($event)"
                  ref="file1"
                  id="sf-zheng"
                  hidden
                  :disabled="audit == 1 ? true: false">
                <label for="sf-zheng">
                  <img v-if="!sf_zheng_file || showtemporaryFront" :src="sf_zheng" alt="">
                  <img v-else :src="$httpImg + sf_zheng_file" alt="">
                </label>
              </div>
            </div>
            <div>
              <ul>
                <li>请填写15位一代身份证号或18位身份证号</li>
                <li><span>同一个身份证号只能绑定一个账号</span></li>
                <li><span>1.请上传本人手持身份证信息面照片，照片中含有本人头部或上半身</span></li>
                <li>2.照片中本人形象需为免冠切并未化妆，五官清晰</li>
                <li><span>3.拍照时对焦点请置于身份证上，保证身份证信息清晰且未遮挡</span></li>
                <li>4.文件为数码照片，请勿进行美化和修改，以免申请失败</li>
                <li>5.上传文件格式支持png，jpg和bmp</li>
                <li><span>6. 文件大小不超过3MB，文件尺寸最小为500px * 500px</span></li>
                <li>7.所有上传信息均会被本站妥善保管，不会用于其他商业用途或传输给其他第三方</li>
              </ul>
            </div>
          </li>

          <!-- 身份证背面照片 -->
          <li>
            <div>
              <p><sup>*</sup>身份证国徽面照片：</p>

              <div class="cardImg">
                <input type="file"
                       @change="type=1;getFile($event)"
                       ref="file2"
                       id="sf-bei"
                       hidden
                       :disabled="audit == 1 ? true: false">
                <label for="sf-bei">
                  <img v-if="!sf_bei_file || showtemporaryReverse" :src="sf_bei" alt="">
                  <img v-else :src="$httpImg + sf_bei_file" alt="">
                </label>
              </div>
            </div>
            <div>
              <ul>
                <li>1.身份证国徽面与信息面信息应为同一身份证的信息且在有效期内，照片清晰且未遮挡，无需手持拍照</li>
                <li>2.文件为数码照片，<span>请勿进行美化和修改，以免申请失败</span></li>
                <li>3.上传文件格式支持png，jpg和bmp</li>
                <li>2.照片中本人形象需为免冠切并未化妆，五官清晰</li>
                <li><span>4.文件大小不超过3MB，文件尺寸最小为500px * 500px</span></li>
                <li>5.所有上传信息均会被本站妥善保管，不会用于其他商业用途或传输给其他第三方</li>
              </ul>
            </div>
          </li>

          <!-- 证明资料照片 -->
          <li>
            <div>
              <p>证明材料<span>（如你的认证资料涉及获奖经历、荣获荣誉，请上传对应的证明材料附件）</span></p>
              <div>
                <!--<img v-for="item in sf_ming_file" :src="$httpImg + item.image" alt=""-->
                <!--:key="item.apply_relevant_product_specialist_id">-->
                <!--<img v-show="showtemporaryList" v-for="(item, index) in sf_ming" :src="item" alt="" :key="index">-->

                <!-- 遍历回显图片 及 替换回显图片 -->
                <div v-for="(item, index) in sf_ming_file"
                     class="proveImg"
                     @mouseover="urlOver(index)"
                     @mouseleave="urlOut(index)">
                  <input type="file"
                         @change="type=2;getFile($event, index, item.id)"
                         ref="file"
                         :id="'sf-exchange' + index"
                         hidden
                         :disabled="audit == 1 ? true: false">
                  <label :for="'sf-exchange' + index">
                    <img v-if="typeof(item) == 'string'" :src="item" alt="">
                    <img v-else :src="$httpImg + item.image" alt="">
                  </label>

                  <!-- 删除图片 -->
                  <div class="deleteBtn"
                       :style="{'display': urlActiveIndex === index ? 'block' : 'none'}"
                       @click="deleteUrl(item, index)">
                    <span>x</span>
                  </div>
                </div>

                <!-- 遍历新增图片 及 替换新增图片 -->
                <div v-for="(item, index) in sf_ming"
                     class="proveImg"
                     @mouseover="imgOver(index)"
                     @mouseleave="imgOut(index)">
                  <input type="file"
                         @change="type=4;getFile($event, index)"
                         ref="file"
                         :id="'sf-change' + index"
                         hidden
                         :disabled="audit == 1 ? true: false">
                  <label :for="'sf-change' + index">
                    <img :src="item" alt="">
                  </label>

                  <div class="deleteBtn"
                       :style="{'display': imgActiveIndex === index ? 'block' : 'none'}"
                       @click="deleteImg(index)">
                    <span>x</span>
                  </div>
                </div>

                <!-- 默认图片 及 新增按钮 -->
                <input type="file"
                       @change="type=3;getFile($event)"
                       ref="file"
                       id="sf-ming"
                       hidden
                       :disabled="audit == 1 ? true: false">
                <label v-show="sf_ming.length < 9" for="sf-ming">
                  <!-- 默认图片 -->
                  <img v-show="sf_ming.length < 1 && !sf_ming_file" :src="sf_ming_moban" alt="">
                  <!-- 新增按钮 -->
                  <img src="../../../static/img/icon_add_default.png"
                       alt=""
                       style="cursor: pointer;"
                       v-show="sf_ming.length < 9 && audit != 1">
                </label>
              </div>
            </div>
            <div>
              <ul>
                <li>1.文件为数码照片。</li>
                <li>2.上传文件格式支持png，jpg和bmp</li>
                <li>3.文件大小不超过3MB，文件尺寸最小为500px*500px</li>
                <li>4.所有上传信息均会被本站妥善保管，不会用于其他商业用途或传输给其他第三方</li>
              </ul>
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
        audit: 3, //当前申请的状态
        name: '',//名字
        idCard: '',//身份证号码
        mobile: '',//手机号码
        thirdPartyTypeNumber: '',//qq或微信
        sf_zheng: './static/img/pic_face.png',//身份证正面照base64
        sf_zheng_file: '',//身份证正面照file
        sf_bei: './static/img/pic_back.png',//身份证背面照base64
        sf_bei_file: '',//身份证背面照file
        sf_ming_moban: "./static/img/pic_prove.png",//证明模板照片
        sf_ming: [], //证明照片base64
        sf_ming_file: [], //证明照片file
        type: '',//照片类型    0 身份证正面照 1 身份证背面照 3 证件照片
        fd: '',
        phoneText: '', //检测手机号码输入框
        cardText: '', //检测身份证号码输入框
        showtemporaryFront: false, //未被激活
        showtemporaryReverse: false, //未被激活
        showtemporaryList: false, //未被激活
        urlActiveIndex: '', //hover下标
        imgActiveIndex: '', //hover下标
        deleteOn: false, //删除开关
        deleteArray: [], //需要删除的图片
      }
    },
    components: {
      // 'v-pagination': pagination,
    },
    mounted: function () {
      let that = this;
      let sessionId = '';
      that.fd = new FormData();
      that.sessionId = localStorage["sessionId"] || sessionStorage['sessionId'] || '';
      // console.log('fd', that.fd);
      //请求web的接口
      // this.$http.get(this.$api+"/web").then((res)=>{
      //   this.data = res.data.data;
      //   // console.log(this.data,78)
      // })

      //获取申请最新状态
      that.getOfficialState();
    },
    watch: {
      sf_zheng(val) {
        // console.log('监听正面', val);
        this.showtemporaryFront = true; //激活显示临时图片
      },
      sf_bei(val) {
        // console.log('监听背面', val);
        this.showtemporaryReverse = true; //激活显示临时图片
      },
      sf_ming(val) {
        // console.log('监听资料', val);
        this.showtemporaryList = true;
      }
    },
    computed: {},
    methods: {
      /*
      * 获取申请最新状态
      * */
      getOfficialState() {
        const that = this;

        this.$http.get(this.$api
          + "/apply/relevant/product/specialist/getLatestTimeState?sessionId=" + that.sessionId).then((res) => {
          console.log('%c 获取官方认证状态', 'color:green', res);

          //回显数据
          if (res.data.code === 1) {
            let officialObject = res.data.data;

            //回显输入框数据
            officialObject.name ? that.name = officialObject.name : '';
            officialObject.mobile ? that.mobile = officialObject.mobile : '';
            officialObject.id_card ? that.idCard = officialObject.id_card : '';
            officialObject.third_party_type_number ? that.thirdPartyTypeNumber = officialObject.third_party_type_number : '';
            //回显图片
            officialObject.identity_card_front_image ? that.sf_zheng_file = officialObject.identity_card_front_image : '';
            officialObject.identity_card_reverse_image ? that.sf_bei_file = officialObject.identity_card_reverse_image : '';
            officialObject.listImage ? that.sf_ming_file = officialObject.listImage : [];

            that.audit = officialObject.audit;
          } else {
            that.audit = 3;
          }
        });
      },
      //图片大小验证
      verificationPicFile(file) {
        var fileSize = 0;
        var fileMaxSize = 1024 * 3;//3M
        var filePath = file.value;
        if(filePath){
          fileSize =file.files[0].size;
          var size = fileSize / 1024;

          if (size > fileMaxSize) {
            // alert("文件大小不能大于3M！");
            file.value = "";
            return false;
          }else if (size <= 0) {
            // alert("文件大小不能为0M！");
            file.value = "";
            return false;
          } else {
            return true;
          }
        }else{
          return false;
        }
      },
      /*
      * 提交照片
      * */
      getFile(e, index, val) {
        console.log('上传照片', index);
        let _this = this;
        let type = _this.type;
        var files = e.target.files[0];
        if (!(files.type == 'image/jpeg' || files.type == 'image/jpg' || files.type == 'image/png' || files.type == 'image/bmp')) {
          // alert('请上传正确的图片格式');
          return false;
        }
        //图片大小验证
        if (!this.verificationPicFile(e.target)){
          console.log('图片大小不符合')
          return false;
        }

        if (!e || !window.FileReader) return;  //看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); //这里是最关键的一步，转换就在这里
        reader.onloadend = function (e) {
          //图片尺寸验证
          var data = e.target.result
          var image = new Image();
          image.src = data;
          image.onload = function(){
            var width = image.width;
            var height = image.height;
            if (width > 500 && height > 500){

              if (type == 0) { //上传正面照片
                _this.sf_zheng = data;
                // console.log('图片转换', _this.imgZhuan(this.result, "sf_zheng"));
                _this.sf_zheng_file = _this.imgZhuan(this.result, "sf_zheng");


              } else if (type == 1) { //上传背面图片
                _this.sf_bei = data;
                _this.sf_bei_file = _this.imgZhuan(this.result, "sf_bei");

              } else if (type == 2) { //替换资料数组图片
                _this.sf_ming_file.splice(index, 1, data); //替换回显数组里的图片
                let name = 'image' + (index + 1);
                if (val) {
                  let fd = _this.fd;
                  console.log(fd)
                  fd.append(name, _this.imgZhuan(data, name));
                  let idName = 'applyRelevantProductSpecialistImageId' + (index + 1);
                  fd.append(idName, val);
                }

              } else if (type == 3) { //新增资料数组
                let sf_ming = _this.sf_ming;
                let sf_ming_file = _this.sf_ming_file;
                // let length = sf_ming.length+1;
                let image = data;
                sf_ming.push(image);
                _this.sf_ming = sf_ming;
                let length = sf_ming.length; //base64数组长度
                let file_length = sf_ming_file.length; //回显file数组长度
                let fd = _this.fd;
                // let name = 'image' + length;
                let name = 'image' + (length + file_length);
                fd.append(name, _this.imgZhuan(data, name))

              } else if (type == 4) { //替换新增数组的图片
                let sf_ming = _this.sf_ming;
                sf_ming.splice(index, 1, data); //替换新增图片数组里的某张图片
                _this.sf_ming = sf_ming;
                let fd = _this.fd;
                let file_length = sf_ming_file.length; //回显file数组长度
                let name = 'image' + (index + 1 + file_length);
                fd.name = _this.imgZhuan(data, name);
                _this.fd = fd;
              }

            }else {
              // alert("文件最小尺寸为：500*500！");
              return false;
            }
          };
        }
      },
      /*
      * 提交申请
      * */
      formConfirm() {
        let that = this;
        let name = that.name,
          idCard = that.idCard,
          mobile = that.mobile,
          thirdPartyTypeNumber = that.thirdPartyTypeNumber,
          sf_zheng = that.sf_zheng,
          sf_bei = that.sf_bei,
          sf_ming = that.sf_ming;
        // if(name==''||idCard==''||mobile==''||thirdPartyTypeNumber==''||sf_zheng=='../../../static/img/pic_face.png'
        // ||sf_bei=='../../../static/img/pic_back.png'){
        //   that.$layer.msg('必填项不能为空');
        //   return ;
        // }
        let fd = that.fd;
        // fd.append('sessionId', that.sessionId);

        fd.append('name', name);
        fd.append('idCard', idCard);
        fd.append('mobile', mobile);
        fd.append('thirdPartyTypeNumber', thirdPartyTypeNumber);

        that.showtemporaryFront ? fd.append('identityCardFrontImage', this.$refs.file1.files[0]) : '';
        that.showtemporaryReverse ? fd.append('identityCardReverseImage', this.$refs.file2.files[0]) : '';
        // let data = {
        //   sessionId: that.sessionId,
        //   name:name,
        //   idCard:idCard,
        //   thirdPartyTypeNumber:thirdPartyTypeNumber,
        //   mobile:mobile,
        //   identityCardFrontImage:that.sf_zheng_file.get,
        //   identityCardReverseImage:sf_bei
        // }
        // console.log(data)
        // if(sf_ming!=''){
        //   let length = sf_ming.length;
        //   for(var a = 1;a<length+1;a++){
        //     data['image'+length] = sf_ming[length-1];
        //   }
        // }
        // console.log('图片上传', that.sf_zheng_file);
        // fd = new FormData();
        const instance = that.$http.create({
          withCredentials: true
        });


        /* 请求提交申请接口 */
        if (that.audit == 3) {
          instance.post(that.$api + "/apply/relevant/product/specialist/save?sessionId=" + that.sessionId, fd,
            {
              headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}
            }).then((res) => {
            console.log('%c 提交申请', 'color:green', res);
            if (res.data.code == 1) {
              // that.$router.go(-1);
              //获取申请最新状态
              that.getOfficialState();
            }
            that.$layer.msg(res.data.desc);
            that.fd = new FormData();//重置fd
          }).catch(function (error) {
            that.$layer.msg('网络请求失败')
          });
        } else if (that.audit == 0 || that.audit == 2) { /* 请求修改资料接口 */
          //删除图片接口
          if (that.deleteOn) {
            that.$http.post(that.$api + "/apply/relevant/product/specialist/deleteimage", qs.stringify({
                "sessionId": that.sessionId,
                "ids": that.deleteArray
              }, {arrayFormat: 'repeat'}),
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .then(function (res) {
                console.log('%c 删除图片', 'color:green', res);
              }).catch(function (error) {
              // that.$layer.msg(error);
            });
          }
          //更新资料
          instance.post(that.$api + "/apply/relevant/product/specialist/update?sessionId=" + that.sessionId, fd,
            {
              headers: {'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()}
            }).then((res) => {
            console.log('%c 提交申请', 'color:green', res);
            if (res.data.code == 1) {
              that.$layer.msg(res.data.desc);
              that.fd = new FormData();//重置fd
              setTimeout(function () {
                that.$router.go(0);
              }, 1500);
            }
          }).catch(function (error) {
            // that.$layer.msg('网络请求失败')
          });
        }
      },
      //检测输入框内容
      inputFunc(name) {
        const that = this;
        //初始化
        let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/; //验证手机号
        let regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //验证身份证

        if (name == 'mobile') {
          if (!regPhone.test(that.mobile)) {
            that.phoneText = 1; //手机号错误
          } else {
            that.phoneText = 0;
          }
        } else if (name == 'idCard') {
          if (!regCard.test(that.idCard)) {
            that.cardText = 1; //身份证错误
          } else {
            that.cardText = 0;
          }
        }
      },
      /*
      * 鼠标移入事件
      * */
      urlOver(index) {
        if (this.audit != 1) {
          this.urlActiveIndex = index;
        }
      },
      imgOver(index) {
        if (this.audit != 1) {
          this.imgActiveIndex = index;
        }
      },
      /*
      * 鼠标移出事件
      * */
      urlOut() {
        this.urlActiveIndex = '';
      },
      imgOut() {
        this.imgActiveIndex = '';
      },
      /*
      * 删除回显图片
      * */
      deleteUrl(item, index) {
        const that = this;
        let sf_ming_file = that.sf_ming_file;
        let deleteArray = that.deleteArray;

        sf_ming_file.splice(index, 1);
        that.sf_ming_file = sf_ming_file;

        if (item.id) {
          deleteArray.push(item.id);
        }
        console.log('%c 需要删除的图片数组', 'color: green', deleteArray);
        that.deleteArray = deleteArray;
        that.deleteOn = true;
      },
      /*
      * 删除新增图片
      * */
      deleteImg(index) {
        console.log(index);
        const that = this;
        let sf_ming = that.sf_ming;

        sf_ming.splice(index, 1);
        that.sf_ming = sf_ming;
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
        background-image: url('../../../static/img/bg_official.png');
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
        & > ul {
          margin-bottom: 48px;
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
          }
        }
        & > ol {
          & > li {
            font-size: 0;
            margin-bottom: 35px;
            &:last-child {
              margin-bottom: 0;
            }
            & > div {
              width: 50%;
              @include ibMid();
            }
            & > div:nth-of-type(1) {
              text-align: center;
              & > p {
                font-size: 14px;
                text-align: left;
                margin-bottom: 28px;
                sup {
                  color: red;
                }
                span {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(202, 202, 202, 1);
                }
              }
              & > div {
                display: inline-block;
                text-align: left;
                img {
                  display: block;
                  &:last-child {
                    /*margin-top: 23px;*/
                  }
                }
              }
            }
            & > div:nth-of-type(2) {
              ul {
                li {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(202, 202, 202, 1);
                  margin-bottom: 20px;
                  &:last-child {
                    margin-bottom: 0;
                  }
                  span {
                    color: #FF5A5A;
                  }
                }
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
    .proveImg, .cardImg {
      border: 1px solid #eee;
      width: 280px;
      max-height: 210px;
      overflow: hidden;
      margin: 25px 0;
      position: relative;
      .deleteBtn {
        /*display: none;*/
        position: absolute;
        width: 30px;
        height: 30px;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        & > span {
          color: #fff;
          z-index: auto;
          font-size: 20px;
        }
      }
    }
  }

</style>
