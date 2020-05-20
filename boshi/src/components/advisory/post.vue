<template>
  <section>
    <div>
      <h3>
        <span>版块</span>
        <ul class="section">
          <li :class="(labelId==item.id)?'sectionActive':''" v-for="(item,index) in sectionList"
              @click="state('section',index);labelId=item.id">{{item.name}}
          </li>
        </ul>
      </h3>
      <h3>
        <span>主题</span>
        <input type="text" placeholder="输入标题" v-model="title">
        <em>30字</em>
      </h3>
      <h3>
        <span>模式</span>
        <div class="mode">
          <label><input type="radio" v-model="states" value="0"/>免费</label>
          <label v-show="isOfficial==1"><input type="radio" v-model="states" value="1"/>收费</label>
        </div>
        <div class="toll" v-show="states==1">
          <input type="text" v-model="price">
          <span>乐豆</span><span>（最低10乐豆，10乐豆=1元）</span>
        </div>
      </h3>
      <h3 style="display: flex;">
        <span style="min-width: 28px;">内容</span>
        <Editor v-model="content"></Editor>
      </h3>
      <h3 style="margin-top: 85px;">
        <span>缩略图</span>
        <p>设置缩略图，最多可以选择三张。</p>
        <div class="imgContent">
          <!-- <ol> -->
          <!--           <li>
                      <img :src="httpImg+'hotPost1.png'" alt="">
                      <input type="checkbox" v-model="thumbnail" value='hotPost1.png'>
                    </li>
                    <li>
                      <img :src="httpImg+'bg_official.png'" alt="">
                      <input type="checkbox" v-model="thumbnail" value='bg_official.png'>
                    </li>
                    <li>
                      <img :src="httpImg+'icon_expert.png'" alt="">
                      <input type="checkbox" v-model="thumbnail" value="icon_expert.png">
                    </li>
                    <li>
                      <img :src="httpImg+'icon_examine.png'" alt="">
                      <input type="checkbox" v-model="thumbnail" value='icon_examine.png'>
                    </li>
                    <img src="../../../static/img/icon_add_default.png" @click=""> -->


          <!-- 遍历新增图片 及 替换新增图片 -->
          <div v-for="(item, index) in sf_ming" class="imgList">
            <input type="file"
                   @change="type=4;getFile($event, index)"
                   ref="file"
                   :id="'sf-change' + index"
                   hidden>
            <!-- <input type="checkbox" v-model="thumbnail" :value='"image"+index' ref="cpBox"> -->
            <label :for="'sf-change' + index">
              <img :src="item" alt="">
            </label>
          </div>

          <!-- 默认图片 及 新增按钮 -->
          <input type="file" @change="type=3;getFile($event)" ref="file" id="sf-ming" hidden class="defaultInput">
          <label v-show="sf_ming.length < 3" for="sf-ming">
            <img v-show="sf_ming.length < 1 && !sf_ming_file" :src="sf_ming_moban" alt="">
            <img src="../../../static/img/icon_add_default.png" alt="" style="cursor: pointer;" class="defaultImg">
          </label>
        </div>
        <!-- </ol> -->
        <ul class="buttonList">
          <li @click="fabiao(0)">发 表</li>
          <li @click="state('preview')">预 览</li>
          <li @click="fabiao(1)">保存至草稿</li>
          <li @click="jump(2)">草稿箱</li>
        </ul>
        <div class='preview' v-show="previewShow">
          <div>
            <h3>
              <span>版块：{{sectionList[sectionActive].name}}</span>
              <span v-show="states==0">模式：免费</span>
              <span v-show="states==1">模式：收费（{{price}}乐豆）</span>
              <ul>
                <li @click="fabiao(0)">发表</li>
                <li @click="fabiao(1)">保存草稿</li>
              </ul>
            </h3>
            <h4>
              {{title}}
              <span v-show="states==1">【{{price}}乐豆】</span>
            </h4>
            <div>
              <div v-html="content">

              </div>
            </div>
            <button @click="state('preview')">返回</button>
          </div>
        </div>
      </h3>
    </div>
  </section>
</template>

<script>
  import pagination from '@/common/pagination';
  import {mapState} from 'vuex';
  import Editor from '../../common/Editor'

  export default {
    data() {
      return {
        states: 0, //是否收费
        title: '',//标题
        price: 0,//价格
        content: '',//内容
        sf_ming: [], //上传图片base64
        sf_ming_file: [], //证明照片file
        sf_ming_moban: "../../../static/img/pic_prove.png",//证明模板照片
        sessionId: '',
        labelId: '',//帖子分类
        isOfficial: 0, //0不是官方 1是
        httpImg: this.global.httpImg, //全局的图片路径
        sectionActive: 0, //默认是0
        previewShow: false, //预览展示
        thumbnailArr: [], //缩略图数组
        sectionList: [
          {"id": 1, "value": "EST",},
          {"id": 2, "value": "乐博士积木",},
          {"id": 3, "value": "类型",},
        ],
        thumbnail: [], //缩略图列表
        fd: '',
      }
    },
    inject:['reload'],
    mounted: function () {
      let that = this;
      if (that.userInfo.is_official_certification_specialist == 1) {
        that.isOfficial = 1;
      }
      that.fd = new FormData();
      // let sessionId = '';
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"] || '';
      this.$http.get(this.$api + "/label/listPlateClassification").then((res) => {
        console.log('%c 获取分类模板', 'color:green', res)
        that.sectionList = res.data.data;
        that.labelId = res.data.data[0].id

        if (sessionStorage.tie){
          let tie = JSON.parse(sessionStorage.tie);
          console.log(tie)
          this.title = tie.title;
          this.content = tie.content;
          this.states = tie.state;
          this.labelId = tie.label_id;
          this.price = tie.price;
          if (tie.image1) {
            this.sf_ming.push(`http://www.drluck.club/lbs/${tie.image1}`)
          }
          if (tie.image2) {
            this.sf_ming.push(`http://www.drluck.club/lbs/${tie.image2}`)
          }
          if (tie.image3) {
            this.sf_ming.push(`http://www.drluck.club/lbs/${tie.image3}`)
          }
        }

      })



    },

    components: {
      // 'v-pagination': pagination,
      Editor,
    },
    computed: {
      ...mapState([
        "userInfo",
      ])
    },
    methods: {
      //增加缩略图
      addThumbnail({
                     reader = '',
                     name = '',
                   } = {}) {
        const that = this;
        let thumbnailArr = that.thumbnailArr;
        thumbnailArr.push({
          reader: reader,
          name: name
        })
        console.log(thumbnailArr, 177)
        that.thumbnailArr = thumbnailArr;
      },
      //更新缩略图
      updateThumbnail({
                        index = '',
                        reader = '',
                      } = {}) {
        const that = this;
        let thumbnailArr = that.thumbnailArr;
        if (index != '') {
          thumbnailArr[index].reader = reader;
          that.thumbnailArr = thumbnailArr;
        }
        console.log(thumbnailArr, 178)
      },

      /*
      * 提交照片
      * */
      getFile(e, index, val) {
        console.log(e, index, 171);
        let _this = this;
        let type = _this.type;
        var files = e.target.files[0];
        console.log(files, 175)
        if (!e || !window.FileReader) return;  //看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); //这里是最关键的一步，转换就在这里
        console.log(reader, 179);
        let thumbnailLength = _this.thumbnailArr.length;
        console.log(thumbnailLength, 205)

        if (type == 3) {
          _this.addThumbnail({reader: reader, name: 'image' + thumbnailLength})
        } else if (type == 4) {
          _this.updateThumbnail({reader: reader, index: index})
        }
        reader.onloadend = function () {
          if (type == 0) { //上传正面照片
            _this.sf_zheng = this.result;
            // console.log('图片转换', _this.imgZhuan(this.result, "sf_zheng"));
            _this.sf_zheng_file = _this.imgZhuan(this.result, "sf_zheng");

          } else if (type == 1) { //上传背面图片
            _this.sf_bei = this.result;
            _this.sf_bei_file = _this.imgZhuan(this.result, "sf_bei");

          } else if (type == 2) { //替换资料数组图片
            _this.sf_ming_file.splice(index, 1, this.result); //替换回显数组里的图片
            let name = 'image' + (index + 1);
            if (val) {
              let fd = _this.fd;
              fd.append(name, _this.imgZhuan(this.result, name));
              let idName = 'applyRelevantProductSpecialistImageId' + (index + 1);
              fd.append(idName, val);
            }

          } else if (type == 3) { //新增资料数组
            let sf_ming = _this.sf_ming;
            let sf_ming_file = _this.sf_ming_file;
            let length = sf_ming.length + 1;
            let image = this.result;
            sf_ming.push(image);
            _this.sf_ming = sf_ming;
            // let length = sf_ming.length; //base64数组长度
            let file_length = sf_ming_file.length; //回显file数组长度
            let fd = _this.fd;
            // let name = 'image' + length;
            let name = 'image' + (length + file_length);
            console.log(name, 212)
            fd.append(name, _this.imgZhuan(this.result, name))

          } else if (type == 4) { //替换新增数组的图片
            let sf_ming = _this.sf_ming;
            sf_ming.splice(index, 1, this.result); //替换新增图片数组里的某张图片
            _this.sf_ming = sf_ming;
            let fd = _this.fd;
            let file_length = sf_ming_file.length; //回显file数组长度
            let name = 'image' + (index + 1 + file_length);
            console.log(name, 213)
            fd.name = _this.imgZhuan(this.result, name);
            _this.fd = fd;
          }
        }
      },

      state(type, index) {
        if (type == 'section') {
          this.sectionActive = index;
        }
        else if (type == 'preview') {
          this.previewShow = !this.previewShow;
        }
      },
      //跳转页面
      jump(index) {
        this.$store.dispatch('reActive', index);

        if (index == 2) {
          this.$router.push({
            path: 'myPost',
            query: {isActive: 1},
          })
        } else if (index == 1) {
          this.$router.push({
            path: 'myPost',
            query: {isActive: 0},
          })
        }
        // else if( index == 4 ){
        //   this.$router.push({
        //     path: 'collection',
        //   })
        // }
      },
      fabiao(type) {//发表
        let that = this;
        let fd = that.fd;
        let thumbnailArr = that.thumbnailArr;
        let thumbnail = that.thumbnail;
        fd.append('state', that.states);
        fd.append('title', that.title);
        fd.append('price', that.price);
        fd.append('content', that.content);
        fd.append('labelId', that.labelId);
        fd.append('draft', type);
        console.log(fd, 176)
        if (that.states == 1 && that.price < 10) {
          that.$layer.msg('最低10乐豆');
          return;
        }

        thumbnailArr = thumbnailArr.filter(function (value, index, array) {
          return array[index].name == thumbnail[0] || array[index].name == thumbnail[1] || array[index].name == thumbnail[2]
        })
        console.log(thumbnailArr, 307)
        if (thumbnail.length == 0) {
          let instance = that.$http.create({
            withCredentials: true
          })
          instance.post(that.$api + "/topic/save?sessionId=" + that.sessionId, fd,
            {
              headers: {'Content-Type': 'multipart/form-data;border-radiusndary = ' + new Date().getTime()}
            }).then((res) => {
            this.reload();
            console.log('%c 发表帖子', 'color:green', res);
            // return false;
            // if(res.data.code==1&&type==0){//发表
            //   that.jump(1)
            // }else if(res.data.code==1&&type==1){//草稿
            //   that.jump(2)
            // }
            // console.log('type',type)
            if (res.data.code == 1) {
              
              if (type == 1) {
                that.$layer.msg('草稿保存成功');
                setTimeout(() => {
                  this.$router.push({path: '/myPost', query:{isActive: 1}})
                }, 1500)
              } else {
                that.$layer.msg(res.data.desc);
                setTimeout(function () {
                  let userInfo = {}; 
                  userInfo=that.$store.state.userInfo;
                  userInfo.topicNum++
                  that.$store.dispatch('userInfo',userInfo)
                  that.$router.push({
                    path: 'forumCenter',
                  })
                }, 1000)
              }
            } else {
              that.$layer.msg(res.data.desc);
            }
            that.fd = new FormData();//重置fd
          }).catch(function (error) {
            that.$layer.msg('网络请求失败')
          });
        } else {
          console.log(thumbnailArr, 332)

          for (let a = 0; a < thumbnail.length; a++) {
            let name = 'image' + (a + 1);
            console.log(name, 334)
            console.log(thumbnailArr[a].reader, 335)
            thumbnailArr[a].reader.onloadend = function () {
              console.log(this.result, name, 337)
              fd.append(name, that.imgZhuan(this.result, name));
            }
          }

          let instance = that.$http.create({
            withCredentials: true
          })
          instance.post(that.$api + "/topic/save?sessionId=" + that.sessionId, fd,
            {
              headers: {'Content-Type': 'multipart/form-data;border-radiusndary = ' + new Date().getTime()}
            }).then((res) => {
            console.log('%c 发表帖子', 'color:green', res);
            if (res.data.code == 1) {
              // let userInfo=that.$store.userInfo;
              // userInfo.topicNum++;
              // that.$store.dispatch('userInfo',userInfo)
              // console.log(that.$store.userInfo.topicNum,"topicNum")
              if (type == 1) {
                that.$layer.msg('保存草稿成功');
              } else {
                that.$layer.msg(res.data.desc);
              }
              setTimeout(function () {
                let userInfo = {}; 
                userInfo=that.$store.state.userInfo;
                userInfo.topicNum++
                that.$store.dispatch('userInfo',userInfo)
                that.$router.push({
                  path: 'forumCenter',
                })
              }, 1000)
            } else {
              that.$layer.msg(res.data.desc);
            }
            that.fd = new FormData();//重置fd
            that.thumbnail = [];
          }).catch(function (error) {
            that.$layer.msg('网络请求失败')
          });
        }
        // that.fd = new FormData();
      },
      // base64(url){//把本地路径图片转化成base64
      //   let base64 = '';
      //   this.convertImgToBase64(url
      //   console.log(base64)
      //   return base64;
      // },
      getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
      },


      imgZhuan(base64Data, name) {//把base64转化成fromData
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
      }
    },
    watch: {
      thumbnail() {
        const that = this;
        let cpChk = that.$refs.cpBox
        let imgArr = that.thumbnail;
        if (imgArr.length > 3) {
          imgArr = imgArr.slice(0, imgArr.length - 1);
          cpChk.forEach(function (value, index, array) {
            if (array[index].defaultValue == imgArr[0] || array[index].defaultValue == imgArr[1] || array[index].defaultValue == imgArr[2]) {
              array[index].checked = true;
            } else {
              array[index].checked = false;
            }
          });
          that.$refs.cpBox = cpChk; //更新状态
          that.thumbnail = imgArr; //重置数量为3
          this.$store.dispatch('sendTips', {isTip: true, content: '缩略图最多为三张'});
        }
      }
    },
    beforeRouteLeave:(to, from, next) => {	//离开组件时执行
      sessionStorage.tie = '';
      next();
    },
  }

</script>

<style scoped lang="scss">
  @import "../../common/common.scss";

  .defaultInput {
    display: none;
  }

  .preview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    & > div {
      width: 980px;
      height: 90%;
      overflow-y: scroll;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 10px 40px 0px rgba(63, 63, 63, 0.71);
      box-sizing: border-box;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(51, 51, 51, 1);
      & > h3 {
        height: 52px;
        line-height: 52px;
        background: #0C1D2B;
        border-radius: 2px;
        position: relative;
        padding-left: 28px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        span {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(207, 227, 0, 1);
          margin-right: 39px;
        }
        & > ul {
          float: right;
          font-size: 0;
          margin-right: 18px;
          li {
            @include ibMid();
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            padding: 0 18px;
            box-sizing: border-box;
            margin-right: 13px;
            &:last-child {
              margin-right: 0;
            }
            &:nth-of-type(1) {
              background: #CFE300;
              color: #0C1D2B;
            }
            &:nth-of-type(2) {
              background: rgba(73, 189, 255, 0);
              border: 1px solid #CFE300;
              border-radius: 2px;
              color: #CFE300;
            }
          }
        }
      }
      & > h4 {
        height: 52px;
        line-height: 52px;
        box-sizing: border-box;
        border-bottom: 1px solid #E6E6E6;
        padding-left: 28px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        span {
          color: #E43D3D;
          font-size: 16px;
        }
      }
      & > div {
        box-sizing: border-box;
        padding: 27px 38px 0 38px;
        height: auto;
        & > div {
          height: auto;
          border-bottom: 1px solid #E6E6E6;
          padding-bottom: 60px;
        }
      }
      & > button {
        border: none;
        outline: none;
        width: 72px;
        height: 30px;
        background: rgba(73, 189, 255, 1);
        border-radius: 2px;
        color: white;
        display: block;
        margin: 30px auto 0 auto;
        cursor: pointer;
      }

    }
    .report {
      height: 330px;
    }
  }

  section {
    margin: 62px 0 0 0;
    min-height: 84%;
    padding: 20px 0 28px 0;
    & > div {
      width: 1200px;
      margin: 0 auto 0 auto;
      min-height: 500px;
      margin-bottom: 90px;
      background: white;
      box-sizing: border-box;
      padding: 27px 42px 74px 42px;
      & > h3 {
        margin-bottom: 25px;
        & > span {
          @include ibMid();
          margin-right: 22px;
        }
        & > p {
          @include ibMid();
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(141, 141, 141, 1);
        }
        & > textarea {
          vertical-align: top;
          box-sizing: border-box;
          padding: 10px;
          outline: none;
          border: none;
          resize: none;
          width: 95%;
          border: 1px solid rgba(230, 230, 230, 1);
        }
        & > .section {
          @include ibMid();
          li {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(141, 141, 141, 1);
            min-width: 40px;
            text-align: center;
            height: 30px;
            padding: 0 10px;
            border: 1px solid #E6E6E6;
            line-height: 30px;
            margin-right: 16px;
            cursor: pointer;
            float: left;
            @include clearFloat();
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              color: #49BDFF;
              border: 1px solid #49BDFF;
            }
          }
          .sectionActive {
            color: #49BDFF;
            border: 1px solid #49BDFF;
          }
        }
        .buttonList {
          margin-left: 53px;
          li {
            @include ibMid();
            margin-right: 10px;
            cursor: pointer;
            padding: 4px 10px;
            border: 1px solid rgba(226, 226, 226, 1);
            border-radius: 2px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            &:nth-of-type(1) {
              background: #49BDFF;
              color: white;
            }
            &:nth-of-type(2) {
              color: #333333;
            }
            &:nth-of-type(3) {
              color: #8D8D8D;
            }
            &:last-child {
              border: none;
              float: right;
              a {
                color: #333;
              }
            }
          }
        }
        & > input {
          @include ibMid();
          border: none;
          outline: none;
          padding: 9px;
          width: 444px;
          height: 30px;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 2px;
        }
        & > em {
          @include ibMid();
          font-size: 14px;
          vertical-align: bottom;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(141, 141, 141, 1);
        }
        .mode {
          margin-right: 35px;
          @include ibMid();
          & > label {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 40px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
              color: #E43D3D;
            }
            input[type='radio'] {
              width: 12px;
              height: 12px;
              margin-right: 6px;
              background-image: url("../../../static/img/icon_nochoice.png");
              background-size: 100% 100%;
              -webkit-appearance: none;
              outline: none;
            }
            input[type=radio]:checked {
              background: url("../../../static/img/icon_choice.png") no-repeat center;
              background-size: 100% 100%;
            }
          }
        }
        .toll {
          @include ibMid();
          font-size: 0;
          input {
            @include ibMid();
            border: none;
            outline: none;
            padding: 9px;
            width: 75px;
            height: 30px;
            box-sizing: border-box;
            font-size: 14px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(230, 230, 230, 1);
          }
          span {
            @include ibMid();
            vertical-align: bottom;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            &:nth-of-type(1) {
              font-size: 14px;
              color: #E43D3D;
              margin: 0 2px 0 6px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              color: #C0C0C0;
            }
          }
        }
        .post {
          width: 995px;
        }
        .imgContent {
          width: 1060px;
          box-sizing: border-box;
          font-size: 0;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          padding: 10px;
          margin: 15px 0 18px 53px;
          .defaultImg {
            @include ibMid();
            cursor: pointer;
          }
          .imgList {
            height: 96px;
            position: relative;
            margin: 0 14px 14px 0;
            &:last-child {
              margin-right: 0;
            }
            @include ibMid();
            img {
              height: 100%;
              max-width: 500px;
            }
            @include inputCheck();
            input {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
  }

</style>


