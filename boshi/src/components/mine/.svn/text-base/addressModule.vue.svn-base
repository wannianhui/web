<template>
  <div class="addressModule">
    <img src="../../../static/img/pic_no cards.png" alt="" v-if="bankCardList.length==0">
    <ul v-else>
      <li v-for="(item,index) in bankCardList">
        <div class="infos" :class="item.infos.bankCode=='PSBC'?'PSBC':item.infos.bankCode=='CGB'?'CGB':item.infos.bankCode=='ICBC'?'ICBC':item.infos.bankCode=='CCB'?'CCB':item.infos.bankCode=='CMB'?'CMB':item.infos.bankCode=='PBC'?'PBC':item.infos.bankCode=='COMM'?'COMM':item.infos.bankCode=='RCC'?'RCC':item.infos.bankCode=='BOC'?'BOC':item.infos.bankCode=='ABC'?'ABC':''">
          <div v-if="item.infos.bankCode=='PSBC'" style="background-image:url('../../../static/img/pic_bankcard_cpgc.png');"></div>
          <div v-else-if="item.infos.bankCode=='BOC'" style="background-image:url('../../../static/img/pic_bankcard_bc.png');"></div>
          <div v-else-if="item.infos.bankCode=='ICBC'" style="background-image:url('../../../static/img/pic_bankcard_icbc.png');"></div>
          <div v-else-if="item.infos.bankCode=='CCB'" style="background-image:url('../../../static/img/pic_bankcard_cbc.png');"></div>
          <div v-else-if="item.infos.bankCode=='CMB'" style="background-image:url('../../../static/img/pic_bankcard_cmbc.png');"></div>
          <div v-else-if="item.infos.bankCode=='COMM'" style="background-image:url('../../../static/img/pic_bankcard_bcm.png');"></div>
          <div v-else-if="item.infos.bankCode=='RCC'" style="background-image:url('../../../static/img/pic_bankcard_pcc.png');"></div>
          <div v-else-if="item.infos.bankCode=='ABC'" style="background-image:url('../../../static/img/pic_bankcard_abc.png');"></div>
          <div v-else style="background-image:url('../../../static/img/pic_bankcard_currency.png');"></div>

          <div>
            <p class="title">
              <span>{{item.infos.bankName}}</span>
              <span>（{{item.bank_name}}）</span>
            </p>
            <p>
              <span>{{item.account}}</span>
              <span>{{item.name}}</span>
            </p>
          </div>
          <div>
            <p>
              <span>{{item.infos.cardTypeName}}</span>
              <!-- <span>快捷</span> -->
            </p>

          </div>
        </div>
        <div class="operating">
          <label @click="setDefaultAddress({id:item.id,index:index})">
            <img :src="item.default_state==0?'../../../static/img/icon_nochoice.png':'../../../static/img/icon_choice.png'">
            <!-- <input type="radio" v-model="chooseCard"  :value="item.default_state==1?true:false" > -->
            <span>选择</span>
          </label>
          <p><span @click="popUps('edit',item.id)">编辑</span><span @click="deleteAddress({id:item.id,index:index})">删除</span></p>
        </div>
      </li>
    </ul>
    <div class='bindingBankC' v-show="isAddBankCard">
      <div>
        <h3>
          <span>绑定银行卡</span>  
          <img @click="popUps('add')" src="../../../static/img/icon_cancle_card_black.png" alt="">
        </h3>
        <ul>
          <li>
            <span>开户人</span>
            <input type="text" v-model="holder" v-on:input='inputFunc("holder")'>
          </li>
          <li>
            <span>支行银行</span>
            <input type="text" placeholder="请输入银行详细信息 明确到支行" v-model="bankName" v-on:input='inputFunc("bankAccount")'>
          </li>
          <li>
            <span>银行卡号</span>
            <input type="number" placeholder="请输入银行卡号进行安全智能识别" v-model="bankCardNum" v-on:input='inputFunc("bankCard")'>
            <p>
              <span v-show="backCardState==false">当前银行卡不支持</span>
              
              <label ><input type="checkbox"  v-model="isDefault" ><span>默认银行卡</span></label>
            </p>
          </li>
        </ul>
        <button v-if="saveState==false">保存</button>
        <button @click="addAddress()" class="saveButton" v-else>保存</button>
      </div>
    </div>
    <div class='bindingBankC' v-show="isEditBankCard">
      <div>
        <h3>
          <span>编辑银行卡</span>  
          <img @click="popUps('closeEdit')" src="../../../static/img/icon_cancle_card_black.png" alt="">
        </h3>
        <ul>
          <li>
            <span>开户人</span>
            <input type="text" v-model="holder" v-on:input='inputFunc("holder")'>
          </li>
          <li>
            <span>支行银行</span>
            <input type="text" placeholder="请输入银行详细信息 明确到支行" v-model="bankName" v-on:input='inputFunc("bankAccount")'>
          </li>
          <li>
            <span>银行卡号</span>
            <input type="number" placeholder="请输入银行卡号进行安全智能识别" v-model="bankCardNum" v-on:input='inputFunc("bankCard")'>
            <p>
              <span v-show="backCardState==false">当前银行卡不支持</span>
              
              <label ><input type="checkbox"  v-model="isDefault" ><span>默认银行卡</span></label>
            </p>
          </li>
        </ul>
        <button v-if="saveState==false">保存</button>
        <button @click="uploadAddress()" class="saveButton" v-else>保存</button>
      </div>
    </div>
    <button @click="popUps('add')">新增银行卡</button>
  </div>  
</template>

<script>
  import { bankCardAttribution } from '@/common/checkCard.js';

  export default{
    data(){
      return{
        chooseCard:'' , //单选框选择的下标
        bankCardList:[], //银行卡列表
        isAddBankCard:false, // 是否新增银行卡
        isEditBankCard:false, // 是否编辑银行卡
        holder:'' , //开户人
        bankAccount:'', //开户银行
        bankCardNum:'', //银行卡号
        bankName:'', //支行名称
        backCardState:false, //0是正确，1是错误
        inputIntegral:0, //输入框的乐豆
        rmb:0, //
        userInfos:{

        }, //
        saveState:false, //绑定和编辑银行卡的状态
        payTipsState:false, //付款提示框状态
        application:false, //申请提示框
        deleteBankC:false, //删除银行卡的弹窗
        isDefault:'', //是否默认选中
        httpImg:this.global.httpImg, //全局的图片路径
        chooseCard:'' , //单选框选择的下标
        // bankCardList:[], //银行卡列表
        payMethods:'', //0是支付宝 1是微信
        payPassword:'', //支付密码
        openTips:false, //删除提示
        editId:'', //编辑的id
        defaultAddressId:'', //默认id
      }
    },
    created:function(){
      const that = this;
      that.sessionId = localStorage["sessionId"] || sessionStorage["sessionId"]||'';
      that.getAddressList();

    },
    mounted:function(){
      const that = this;

    },

    components:{
      // 'v-pagination': pagination,
    },
    computed: {
    },
    props:["listenToAddressId"],
    methods: {
      //各种弹窗
      popUps(type,id) {
        const that = this;
        if( type == 'add' ){
          that.isAddBankCard = !that.isAddBankCard;
        }else if( type == 'edit' ) {
          that.editId = id; //保存编辑的id
          let bankCardList = that.bankCardList;
          let target = bankCardList.filter(function (value, index, array) {
              return array[index].id== id;
          });
          console.log(target,173)
          that.holder = target[0].name; //用户名
          that.bankName = target[0].bank_name; //设置支行
          that.bankCardNum = target[0].account; //号码
          that.inputFunc("bankCard");
          that.isEditBankCard = !that.isEditBankCard;
        }else if(type=='closeEdit'){
          that.isEditBankCard = !that.isEditBankCard;
        }
        // else if ( type == 'pay' ) {
        //   this.payTipsState = !this.payTipsState;
        // }
         if( type == 'delete'){
          // this.$store.dispatch('sendTips', {isTip:true,content:'银行卡删除成功'});
          console.log(this.openTips,450)
          this.openTips = !this.openTips;
        }
      },
      getAddressList:function({
        pageNumber = 1,
        pageSize = 10,
      }={}){
        const that = this;
        that.$http.get(that.$api+"/user/bank/card/page",{
          params:{
            sessionId: that.sessionId,
            pageNumber: pageNumber,
          }
        }).then((res)=>{
          console.log('%c 获取地址列表','color:green',res);
          let list = res.data.data.list
          
          if( list.length>0 ){
            list.forEach(function (value, index, array) {
              array[index].infos = bankCardAttribution(array[index].account);
              if( array[index].default_state==1 ) {
                that.defaultAddressId = array[index].id;
                that.defaultAccount = array[index].account;
              }
            });
            that.$emit("listenToAddressId",{id:that.defaultAddressId,account:that.defaultAccount});
            console.log(list,198)
            that.bankCardList = list;
          }


          // let list = res.data.data;
          // that.total = list.totalRow;
          // that.display = list.pageSize;
        }).catch(function (error) {

        });
      },
      setDefaultAddress:function({id='',index=0}={}){
        const that = this;
        that.$http.get(that.$api+"/user/bank/card/choice",{
          params:{
            sessionId: that.sessionId,
            id:id
          }
        }).then((res)=>{
          // console.log('%c 设置默认银行卡','color:green',res);
          that.$store.dispatch('sendTips', {isTip:true,content:res.data.desc});
          if(res.data.code == 1){
            that.getAddressList();
          }
        }).catch(function (error) {

        });
      },
      deleteAddress:function({id='',index=0}={}){
        const that = this;
        that.$http.get(that.$api+"/user/bank/card/delete",{
          params:{
            sessionId: that.sessionId,
            id:id
          }
        }).then((res)=>{
          console.log('%c 删除银行卡','color:green',res);
          that.$store.dispatch('sendTips', {isTip:true,content:res.data.desc});
          if(res.data.code == 1){
            that.getAddressList();
          }
        }).catch(function (error) {

        });
      },
      uploadAddress:function(){
        const that = this;
        let bankCardNum = this.bankCardNum.replace(/(^\s*)|(\s*$)/g, ""); //银行卡号
        let holder = this.holder.replace(/(^\s*)|(\s*$)/g, ""); //开户人
        let bankAccount = this.bankAccount.replace(/(^\s*)|(\s*$)/g, ""); //开户银行
        let bankName = that.bankName.replace(/(^\s*)|(\s*$)/g, ""); //支行名称
        let choice = that.isDefault //是否是默认地址
        let editId = that.editId;
        choice==true?choice=1:choice=0;
        that.$http.get(that.$api+"/user/bank/card/update",{
          params:{
            sessionId: that.sessionId,
            account: bankCardNum,
            name: holder,
            bankName:bankName,
            choice:choice,
            id:editId
          }
        }).then((res)=>{
          console.log('%c 更新银行卡','color:green',res);
          that.$store.dispatch('sendTips', {isTip:true,content:res.data.desc});
          if(res.data.code == 1){
            that.isEditBankCard = !that.isEditBankCard;
            that.getAddressList();
          }
        }).catch(function (error) {

        });
      },
      addAddress:function(){
        const that = this;
        let bankCardNum = this.bankCardNum.replace(/(^\s*)|(\s*$)/g, ""); //银行卡号
        let holder = this.holder.replace(/(^\s*)|(\s*$)/g, ""); //开户人
        let bankAccount = this.bankAccount.replace(/(^\s*)|(\s*$)/g, ""); //开户银行
        let bankName = that.bankName.replace(/(^\s*)|(\s*$)/g, ""); //支行名称
        let choice = that.isDefault //是否是默认地址
        choice==true?choice=1:choice=0;
        that.$http.get(that.$api+"/user/bank/card/save",{
          params:{
            sessionId: that.sessionId,
            account: bankCardNum,
            name: holder,
            bankName:bankName,
            choice:choice
          }
        }).then((res)=>{
          console.log('%c 添加银行卡','color:green',res);
          that.$store.dispatch('sendTips', {isTip:true,content:res.data.desc});
          if(res.data.code == 1){
            that.isAddBankCard = !that.isAddBankCard;
            that.getAddressList();
          }
        }).catch(function (error) {

        });

      },
      inputFunc(name) {
        let reg = /^([1-9]{1})(\d{14}|\d{15}|\d{17}|\d{18}|\d{19})$/; //验证银行卡号
        let bankCardNum = this.bankCardNum.replace(/(^\s*)|(\s*$)/g, ""); //银行卡号
        let holder = this.holder.replace(/(^\s*)|(\s*$)/g, ""); //开户人
        let bankAccount = this.bankAccount.replace(/(^\s*)|(\s*$)/g, ""); //开户银行
        let bankName = this.bankName;
        
        if (name == 'bankCard') {
          if ( bankCardNum == '' ) {
            this.backCardState = false;
          }
          else if( reg.test(bankCardNum) && bankName!='') {
            this.backCardState = true; 
          }
          else {
            this.backCardState = false;
          }
          // console.log(this.backCardState,229)
        }
        // else if( name == 'holder' ){
        //   if( holder == '' ){
        //     this.saveState = false;
        //   }
        // }
        // console.log( (this.backCardState==true),549 )
        holder!=''&&bankName!=''&&this.backCardState==true?this.saveState=true:this.saveState=false;
      },
      save(type) {
        if( type == 'apply' ){
          this.application = !this.application;
        }
      },


    },
  }
</script>

<style scoped lang="scss">
  @import "../../common/common.scss";
  


  .addressModule{
    background:rgba(239,243,245,1);
    padding:17px 0 28px 0;
    &>img {
      width:206px;
      height:158px;
      display:block;
      margin:0 auto 0 auto;
    }
    &>ul {
      width:444px;
      margin: 0 auto  auto;
      &>li {
        height:116px;
        box-shadow:0px 2px 6px 0px rgba(45,45,45,0.2);
        border-radius:2px;
        margin-bottom:30px;
        &:last-child {
          margin-bottom:0;
        }
        .infos {
          height:81px;
          background:#535353;
          box-sizing:border-box;
          padding:16px 16px 0 16px;
          .title {
            width: 308px;
            height: 21px;
            overflow: hidden;
            font-size:0;
            span{
              @include ibMid();
              height:21px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              &:nth-of-type(2){
                width:193px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
          }
          &>div {
            font-size:0;
            &:nth-of-type(1) {
              width:32px;
              height:32px;
              background-size:100% 100%;
              @include ibMid();
              margin-right:3px;
            }
            &:nth-of-type(2) {
              @include ibMid();
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              p {
                margin-bottom:8px;
                &:last-child {
                  margin-bottom:0;
                }
              }
            }
            &:nth-of-type(3) {
              @include ibMid();
              font-size:14px;
              float:right;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
       
            }
          }
        }
        .PSBC {
          background-color:#41B239;
        }
        .CGB {
          background-color:#FF5454;
        }
        .ICBC {
          background-color:#C84C45;
        }
        .CCB {
          background-color:#0F3192;
        }
        .CMB {
          background-color:#E87335;
        }
        .PBC {
          background-color:#FF5959;
        }
        .COMM {
          background-color:#FF5959;
        }
        .RCC {
          background-color:#2E8A25;
        }
        .BOC {
          background-color:#D64C5F;
        }
        .ABC {
          background-color:#33A48F; 
        }
        .operating {
          height:35px;
          line-height:35px;
          padding:0 32px;
          label {
            img {
              width: 16px;
              height: 16px;
              margin-right:3px;
              @include ibMid();
            }

            span {
              font-size:12px;
              @include ibMid();
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(141,141,141,1);
            }
          }
          p {
            @include ibMid();
            float:right;
            span {
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(192,192,192,1);
              cursor:pointer;
              &:nth-of-type(1) {
                margin-right:15px;
              }
            }
          }
        }
      }
    }
    &>button {
      border:none;
      outline:none;
      width:124px;
      font-size:14px;
      height:38px;
      display:block;
      margin:37px auto 0 auto;
      line-height:38px;
      background:rgba(251,206,0,1);
      border-radius:2px;
      color:white;
      cursor:pointer;
      &:hover {
        background:#FFD71F;
      }
    }
  }

  .bindingBankC {
    position: fixed;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:9999;
    background: rgba(0,0,0,0.1);
    &>div {
      width:600px;
      height:339px;
      min-height:339px;
      background:white;
      box-sizing:border-box;
      border:7px solid #656565;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      &>h3 {
        height:44px;
        line-height:44px;
        padding:0 20px;
        box-sizing:border-box;
        span {
          @include ibMid();
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        img {
          @include ibMid();
          width:14px;
          height:14px;
          float:right;
          margin-top: 15px;
          cursor:pointer;
        }
      }
      ul {
        padding:30px 30px 0 30px;
        background:#EFF3F5;
        height:211px;
        box-sizing:border-box;
        li {
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          font-size:0;
          margin-bottom:26px;
          &:last-child {
            margin-bottom:0;
          }
          &>span {
            @include ibMid();
            font-size:14px;
            width:75px;
          }
          &>input {
            @include ibMid();
            font-size:12px;
            border:none;
            outline:none;
            width:426px;
            height:30px;
            padding-left:12px;
            box-sizing:border-box;
            background:rgba(255,255,255,1);
            border:1px solid rgba(192, 192, 192, 1);
          }
          &>p {
            font-family:MicrosoftYaHei;
            font-weight:400;
            font-size:0;
            width:426px;
            margin:4px 26px 0 0;
            float:right;
            span {
              @include ibMid();
              margin-left:6px;
              font-size:12px;
              color:rgba(228,61,61,1);
            }
            label {
              @include ibMid();
              @include inputCheck();
              float:right;
              font-size:0;
              input {
                @include ibMid();
              }
              span {
                font-size:12px;
                @include ibMid();
                color:rgba(51,51,51,1);
              }
            }
          }
          @include clearFloat();
          button {

          }
        }
      }
      &>button {
        border:none;
        outline:none;
        width:84px;
        height:30px;
        background:#E5E5E5;
        border-radius:2px;
        color:white;
        cursor:pointer;
        display:block;
        margin:20px auto 0 auto;
        &:hover {
          background:#69C9FF;
        }
      }
      .saveButton {
        background:#49BDFF;
      }
    }
  }

</style>