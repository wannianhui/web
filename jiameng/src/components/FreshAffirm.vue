<template>
  <div class="consignee">
    <!-- 鲜采确认 -->
    <!-- top -->
    <div class="indexTop">
      <span class="indexX"><</span>
      <span class="indexText">{{consigneeText}}</span>
      <span class="indexDian">...</span>
    </div>
    <div class="consigneeTop">
      <p>广州科学城店</p>
      <ul>
        <li v-for="(item,index) in consigneeTopList" :key="index">
          <span>{{item.text}}</span>
          <span>{{item.num}}</span>
        </li>
      </ul>
    </div>
    <!-- 采购物料 -->
    <div class="purchase">
      <div class="material">
        <img src="../assets/img/freshAffirm/icon_caidan.png" alt />
        <span>
          当日菜单
          <img
            src="../assets/img/freshAffirm/icon_moer_per.png"
            alt
            style="margin-left:0.05rem;"
          />
        </span>
        <!-- <img src = "../assets/img/freshAffirm/icon_lanzi.png" alt /> -->
        <!-- 大众餐 -->
      </div>
      <div class="public">
        <h3>大众餐</h3>
        <img src="../assets/img/freshAffirm/icon_xian.png" alt />
        <p>中餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>菜品</p>
            <span>香菇滑鸡</span>
          </li>
          <li>
            <p>菜品</p>
            <span>猪肉金针菇</span>
          </li>
          <li>
            <p>菜品</p>
            <span>番茄炒蛋</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>份数</p>
            <span>1218</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
          <li>
            <p>份数</p>
            <span>900</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
          <li>
            <p>份数</p>
            <span>900</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
        </ul>
        <img src="../assets/img/freshAffirm/icon_xian.png" alt />
        <p>晚餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>菜品</p>
            <span>猪肉金针菇</span>
          </li>
          <li>
            <p>菜品</p>
            <span>干焗豆角</span>
          </li>
          <li>
            <p>菜品</p>
            <span>香辣羊肚丝</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>份数</p>
            <span>1218</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
          <li>
            <p>份数</p>
            <span>900</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
          <li>
            <p>份数</p>
            <span>900</span>
            <img src="../assets/img/freshAffirm/icon_bj.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <!--客流和收入预测 -->
    <div class="forecast">
      <div class="material">
        <img src="../assets/img/freshAffirm/icon_yuce.png" alt />
        <span style="color:#9A3CF3;">
          客流和收入预测
          <img
            src="../assets/img/freshAffirm/icon_moer_per.png"
            alt
            style="margin-left:0.05rem;"
          />
        </span>
        <!-- <img src = "../assets/img/freshAffirm/icon_lanzi.png" alt /> -->
        <!-- 大众餐 -->
      </div>
      <div class="public forecastPublic">
        <h3>大众餐</h3>
        <img src="../assets/img/freshAffirm/icon_xian.png" alt />
        <p>中餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>预估人数</p>
            <span>100</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>预估收入</p>
            <span>￥12500</span>
          </li>
          <p class="consumption">
            预估人均消费：
            <span>￥25</span>
          </p>
        </ul>
        <img src="../assets/img/freshAffirm/icon_xian.png" alt />
        <p>晚餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>预估人数</p>
            <span>100</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>预估收入</p>
            <span>￥12500</span>
          </li>
          <p class="consumption">
            预估人均消费：
            <span>￥25</span>
          </p>
        </ul>
        <div style="content:'';clear:both;"></div>
        <div class="subtotal">
          小计
          <span>￥7500</span>
        </div>
      </div>
      <!-- 行政餐 -->
      <div class="public forecastPublic">
        <h3>行政餐</h3>
        <img src="../assets/img/freshAffirm/pic_xian2.png" alt />
        <p>中餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>预估人数</p>
            <span>150</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>预估收入</p>
            <span>￥12500</span>
          </li>
          <p class="consumption">
            预估人均消费：
            <span>￥25</span>
          </p>
        </ul>
        <img src="../assets/img/freshAffirm/pic_xian2.png" alt />
        <p>晚餐</p>
        <!-- 菜品 -->
        <ul>
          <li>
            <p>预估人数</p>
            <span>150</span>
          </li>
        </ul>
        <!-- 分数 -->
        <ul>
          <li>
            <p>预估收入</p>
            <span>￥12500</span>
          </li>
          <p class="consumption">
            预估人均消费：
            <span>￥25</span>
          </p>
        </ul>
        <div style="content:'';clear:both;"></div>
        <div class="subtotal">
          小计
          <span>￥8500</span>
        </div>
        <div class="total">
          合计
          <span>￥12500</span>
        </div>
      </div>
    </div>
    <!-- 鲜采控制 -->
    <div class="kongzhi">
      <div class="material">
        <img src="../assets/img/freshAffirm/icon_kongzhi.png" alt />
        <span style="color:#6789F7;">
          鲜采控制
          <img
            src="../assets/img/freshAffirm/icon_moer_per.png"
            alt
            style="margin-left:0.05rem;"
          />
        </span>
        <!-- <img src = "../assets/img/freshAffirm/icon_lanzi.png" alt /> -->
      </div>
      <p class="iconP">
        <span class="iconYdb">已达标</span>
        <img src="../assets/img/freshAffirm/icon_ydb.png" alt class="iconImg" />
      </p>
      <!-- 已达标 -->
      <ul class="kongzhiUl kongzhiBorder">
        <li>
          <p>档口</p>
          <p>大众餐</p>
          <p>
            是否是否：
            <span>是</span>
          </p>
          <p>
            预估收入：
            <span>21500</span>
          </p>
        </li>
        <li>
          <p>利润率</p>
          <p>45%</p>
          <p>
            鲜采成本：
            <span>9460</span>
          </p>
        </li>
        <li>
          <p>实际利润</p>
          <p>44%</p>
        </li>
      </ul>
      <p class="iconP">
        <span class="iconYdb">已达标</span>
        <img src="../assets/img/freshAffirm/icon_ydb.png" alt class="iconImg" />
      </p>
      <!-- 行政 -->
      <ul class="kongzhiUl kongzhiBorder">
        <li>
          <p>档口</p>
          <p>行政餐</p>
          <p>
            是否是否：
            <span>是</span>
          </p>
          <p>
            预估收入：
            <span>21500</span>
          </p>
        </li>
        <li>
          <p>利润率</p>
          <p>45%</p>
          <p>
            鲜采成本：
            <span>9460</span>
          </p>
        </li>
        <li>
          <p>实际利润</p>
          <p>44%</p>
        </li>
      </ul>
      <p class="iconP">
        <span class="iconYdb">未达标</span>
        <img src="../assets/img/freshAffirm/icon_wdb.png" alt class="iconImg" />
      </p>
      <!-- 门店 -->
      <ul class="kongzhiUl kongzhiBorder">
        <li>
          <p>档口</p>
          <p>门店餐</p>
          <p>
            是否是否：
            <span>是</span>
          </p>
          <p>
            预估收入：
            <span>21500</span>
          </p>
        </li>
        <li>
          <p>利润率</p>
          <p>-</p>
          <p>
            鲜采成本：
            <span>9460</span>
          </p>
        </li>
        <li>
          <p>实际利润</p>
          <p>44%</p>
        </li>
      </ul>
    </div>
    <!-- 采购物料-->
    <div class="material kongzhiMater">
      <img src="../assets/img/freshAffirm/icon_cai.png" alt />
      <span style="color:#60ECA5;">
        采购物料
        <img src="../assets/img/freshAffirm/icon_moer_nor.png" alt style="margin-left:0.05rem;" />
      </span>
      <img src="../assets/img/freshAffirm/btn_tj3.png" alt class="materialBtj3" />
      <!-- 大众餐 -->
    </div>
    <div class="message">
      <ul>
        <li v-for="(item,index) in messageList" :key="index">
          <div style="position:relative;">
            <img src="../assets/img/freshAffirm/btn_sc.png" alt class="messageImg" />
            <p>物料</p>
            <p style="fontSize:0.16rem">{{item.h3}}</p>
            <p class="messageUnit">
              <span style="color:#999;">单位：</span>斤
            </p>
            <p>
              <span style="color:#999;">说明：</span>
              {{item.p}}
            </p>
          </div>
          <div>
            <p>数量</p>
            <p class="messageAge">{{item.age}}</p>
            <P class="messagePrice">
              <span style="color:#999;">单价：</span>
              {{item.univalence}}
            </P>
          </div>
          <div>
            <p class="messageSum">金额</p>
            <p class="messageMoney">{{item.money}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 添加过多-->
    <div class="add">
      <img src="../assets/img/btn/btn_tj3.png" alt />
      <span>添加过多</span>
    </div>
    <!-- 保存提交 -->
    <div class="messageSubmit">
      <img src="../assets/img/freshAffirm/btn_huanyuan.png" alt />
      <button>保存</button>
      <button>提交</button>
    </div>
  </div>
</template>
<script>
import Stall from "./common/Stall";
export default {
  name: "FreshAffirm",
  data() {
    return {
      consigneeText: "鲜采订单确认",
      consigneeTopList: [
        {
          text: "订货人员：",
          num: "黄小文"
        },
        {
          text: "要货时间：",
          num: "2020-03-20"
        },
        {
          text: "订货时间：",
          num: "2020-03-19"
        },
        {
          text: "交货时间：",
          num: "2020-03-19"
        }
      ],
      messageList: [
        {
          h3: "五花肉",
          p: "回锅肉主要材料",
          age: "50",
          univalence: "25",
          money: "￥1275"
        },
        {
          h3: "红尖椒",
          p: "回锅肉主要材料",
          age: "50",
          univalence: "5.5",
          money: "￥300"
        },
        {
          h3: "生菜",
          p: "回锅肉主要材料",
          age: "50",
          univalence: "3.5",
          money: "￥200"
        }
      ]
    };
  }
};
</script>
<style scoped>
.purchase {
  background: #ffffff;
  width: 94%;
  margin: 0 auto;
}
.indexTop {
  width: 100%;
  line-height: 0px;
  height: 0.6rem;
  background: white;
}
.indexTop span:last-child {
  font-size: 0.3rem;
}
.indexTop span:nth-child(2) {
  margin: auto 0.75rem;
}
.indexTop span {
  font-size: 0.16rem;
  color: #333333;
  line-height: 0.5rem;
  font-weight: 400;
  font-family: "PingFang-SC-Bold";
}
.message {
  font-size: 0px;
  /* height: 134px; */
  width: 100%;
}
.message ul li {
  border-bottom: 1px solid #ddd;
  height: 1.34rem;
}
.message ul {
  width: 94%;
  height: 100%;
  text-align: left;
  margin: 0 auto;
  background: white;
}
.message ul li::after {
  display: block;
  content: "";
  clear: both;
}
.message ul li div {
  margin-top: 0.28rem;
}
.message ul li div > p:nth-child(1) {
  color: #999;
  font-size: 0.11rem;
}
.message ul li div:nth-child(1) {
  width: 51%;
}
.message ul li div:nth-child(1) p {
  margin-left: 0.15rem;
}
.message ul li div:nth-child(1) p:nth-child(1) {
  margin-left: 0.43rem !important;
}
.message ul li div:nth-child(1) p:nth-child(2) {
  margin-left: 0.34rem !important;
}
.message ul li div:nth-child(2) {
  width: 20%;
}
.message ul li div:nth-child(3) {
  width: 20%;
}
.message ul li div p {
  margin: 0.07rem auto;
}
.message div {
  font-size: 0.12rem;
  float: left;
}

/*  */
.onsignee {
  font-size: 0px;
}
.consigneeTop p {
  font-size: 0.2rem;
  height: 0.5rem;
  margin-left: 0.15rem;
  line-height: 0.5rem;
  font-weight: bold;
}
.consigneeTop p::after {
  width: 105%;
  height: 1px;
  background: #999;
  display: block;
  content: "";
  position: relative;
  left: -0.15rem;
}
.consigneeTop {
  height: 1.61rem;
  font-size: 0px;
  width: 94%;
  background: white;
  text-align: left;
  border-radius: 0.1rem;
  margin: 0.1rem auto;
}
.consigneeTop ul {
  margin-top: 0.1rem;
  /* width: 100%; */
  border-radius: 0.1rem;
  margin-left: 0.15rem;
  background: white;
}
.consigneeTop ul li {
  font-size: 0.16rem;
}
.consigneeTop ul li span:nth-child(1) {
  color: #999;
}
.material {
  height: 0.5rem;
  margin-top: 0.15rem;
  width: 100%;
  text-align: left;
  font-size: 0.16rem;
  overflow: hidden;
  line-height: 0.5rem;
  background: white;
  margin: 0 auto;
  color: #ff650d;
  border-bottom: 1px solid #333;
  border-radius: 0.07rem 0.07rem 0px 0px;
}
/* .material::after {
  width: 3.51rem;
  height: 1px;
  content: "";
  background: rgb(73, 71, 71);
  display: block;
  position: relative;
  left: -0.1rem;
} */
.material img:nth-child(1) {
  margin-left: 0.15rem;
  position: relative;
  top: 0.02rem;
  left: -0.05rem;
}
.add {
  font-size: 0px;
  width: 94%;
  margin: 0 auto;
  height: 0.5rem;
  background: white;
  border-radius: 0.1rem;
  line-height: 0.5rem;
}
.add span {
  font-size: 0.14rem;
  color: #5a7ff6;
}
.add img {
  position: relative;
  top: 0.09rem;
  left: -0.13rem;
}
.public {
  font-size: 0px;
}
.public h3 {
  color: #333333;
  font-size: 0.16rem;
  font-weight: bold;
  text-align: center;
  height: 0.4rem;
  line-height: 0.4rem;
}
.public > p {
  font-size: 0.12rem;
  color: #5a7ff6;
  height: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
}
.public img {
  position: relative;
  top: 0.1rem;
}
.public::after {
  clear: both;
  content: "";
  display: block;
}
.public ul {
  width: 50%;
  float: left;
}
.public ul li {
  height: 0.68rem;
  border-bottom: 1px solid rgb(190, 184, 184);
}
.public ul li:nth-child(3) {
  border-bottom: 0px solid rgb(190, 184, 184);
}
.public ul li p:nth-child(1) {
  color: #999;
  font-size: 0.11rem;
  margin: 0.1rem auto;
}
.public ul li span:nth-child(2) {
  color: #333;
  font-size: 0.16rem;
}
.public ul:nth-child(5) li span {
  font-size: 0.2rem;
  color: #5a7ff6;
  font-weight: bold;
}
.public ul:nth-child(9) li span {
  font-size: 0.2rem;
  color: #5a7ff6;
  font-weight: bold;
}
.public ul:nth-child(5) li img {
  position: relative;
  top: 0px;
  left: 0.14rem;
}
.public ul:nth-child(9) li img {
  position: relative;
  top: 0px;
  left: 0.14rem;
}
.forecast {
  background: white;
  width: 94%;
  margin: 0.15rem auto;
}
.material::after {
  width: 3.51rem;
  height: 1px;
  content: "";
  background: rgb(73, 71, 71);
  display: block;
  position: relative;
  left: -0.1rem;
}
.forecastPublic {
  margin: 0.15rem auto;
}
.forecastPublic ul li {
  border: 0px solid white;
}
.forecastPublic ul:nth-child(5) li span {
  font-size: 0.14rem;
  position: relative;
  top: -0.05rem;
}
.forecastPublic::after {
  display: block;
  clear: both;
  content: "";
}
.forecastPublic ul:nth-child(9) li span {
  font-size: 0.14rem;
  position: relative;
  top: -0.05rem;
}
.consumption {
  font-size: 0.12rem;
  color: #999;
  position: relative;
  left: -1.69rem;
  top: -0.13rem;
}
.consumption span {
  color: #333;
}
.subtotal {
  font-size: 0.11rem;
  width: 1.4rem;
  text-align: center;
  height: 0.3rem;
  position: relative;
  line-height: 0.3rem;
  background: #fff6f6;
  border-radius: 0.1rem;
  top: 0.02rem;
  left: 1.86rem;
}
.subtotal span {
  font-size: 0.16rem;
  color: #ec6060;
}
.total {
  margin-top: 0.05rem;
  width: 100%;
  font-size: 0.11rem;
  height: 0.4rem;
  color: #999;
  background: #fff6f6;
  line-height: 0.4rem;
}
.total span {
  font-size: 0.16rem;
  color: #ec6060;
  margin-left: 0.11rem;
}
.kongzhi {
  font-size: 0px;
  width: 94%;
  background: white;
  margin: 0.15rem auto;
}
.kongzhiUl {
  display: flex;
}
.kongzhiUl li p {
  font-size: 0.16rem;
}
.kongzhiUl li p {
  color: #999;
  font-size: 0.11rem;
}
.kongzhiUl li:nth-child(2) p:nth-child(2) {
  color: #5a7ff6;
  font-size: 0.2rem;
  margin-top: 0.1rem;
}
.kongzhiUl li:nth-child(3) p:nth-child(2) {
  color: #5a7ff6;
  font-size: 0.2rem;
  margin-top: 0.1rem;
}
.kongzhiUl li:nth-child(2) p:nth-child(3) {
  position: relative;
  top: 0.43rem;
  left: 0.34rem;
}
.kongzhiUl li:nth-child(2) p:nth-child(3) span {
  color: #333;
}
.kongzhiUl li:nth-child(1) p span {
  color: #333;
  margin-top: 0.1rem;
}
.kongzhiUl li p:nth-child(1) {
  margin-top: 0.5rem;
}
.kongzhiUl li:nth-child(1) p:nth-child(2) {
  color: #333;
  margin: 0.1rem;
  margin-bottom: 0.2rem;
  font-size: 0.16rem;
}
.kongzhiUl li:nth-child(1) p:nth-child(3) {
  margin-bottom: 0.1rem;
}
.kongzhiUl li {
  flex: 1;
  height: 1.68rem;
}
.messageAge {
  color: #5a7ff6;
  font-size: 0.2rem;
}
.messageMoney {
  color: #5a7ff6;
  font-size: 0.2rem;
}
.messageSum {
  position: relative;
  left: 0.27rem;
}
.messageImg {
  position: absolute;
  top: -0.28rem;
  left: 3.34rem;
}
.messagePrice {
  position: relative;
  top: 0px;
  left: 0.79rem;
}
.messageUnit {
  margin-bottom: 0.1rem;
}
.messageSubmit {
  height: 0.5rem;
  background: white;
  margin-top: 0.15rem;
  width: 100%;
  font-size: 0px;
}
.messageSubmit img {
  width: 9%;
  position: relative;
  top: 0.07rem;
  left: -0.22rem;
}
.messageSubmit button:nth-child(3) {
  width: 1.4rem;
  height: 0.3rem;
  border: 1px solid #3d7dfc;
  position: relative;
  top: -0.03rem;
  position: relative;
  left: 0.1rem;
  color: white;
  background: #5a7ff6;
  border-radius: 0.43rem;
}
.messageSubmit button:nth-child(2) {
  width: 1.4rem;
  height: 0.3rem;
  border: 1px solid #3d7dfc;
  position: relative;
  top: -0.03rem;
  color: #5a7ff6;
  position: relative;
  left: -0.09rem;
  background: white;
  border-radius: 0.43rem;
}
.iconYdb {
  font-size: 0.14rem;
  position: absolute;
  left: 0.08rem;
  top: 0.02rem;
  color: white;
  z-index: 5;
}
.iconP {
  position: relative;
}
.iconImg {
  position: absolute;
  left: -0.01rem;
  top: -1px;
  z-index: 1;
}
.kongzhiBorder {
  border-bottom: 1px solid #999;
}
.kongzhiBorder li p:nth-child(3){ 
  position: relative;
  left: -0.13rem;
}
.kongzhiMater {
  width: 94%;
}
.materialBtj3 {
  position: relative;
  top: 0.1rem;
  left: 1.54rem;
}
</style>