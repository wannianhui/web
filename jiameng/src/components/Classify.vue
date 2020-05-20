<template>
  <div>
    <!-- 分类 -->
    <div class="classifyLeft">
      <ul>
        <li v-for="(item,index) in classifyListTop" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="classifyRight">
      <ul v-for="(item,index) in classifyListBottom" :key="index">
        <p>三级分类</p>
        <li v-for="(item,index) in item.list" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Select",
  data() {
    return {
      classifyListTop: [
        "二级分类",
        "二级分类",
        "二级分类",
        "二级分类",
        "二级分类",
        "二级分类",
        "二级分类",
        "三级分类",
        "三级分类",
        "三级分类"
      ],
      classifyListBottom: [
        {
          list: [
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类"
          ]
        },
        {
          list: [
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类",
            "四级分类"
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.classifyLeft,
.classifyRight {
  /* width: 100%; */
  font-size: 0px;
}
.classifyLeft ul li,
.classifyRight p ul li {
  font-size: 0.12rem;
}
.classifyLeft ul {
  float: left;
  background: #fff;
}
.classifyRight {
  width: 80%;
}
.classifyLeft ul li {
  width: 100px;
  height: 50px;
  line-height: 50px;
}
.classifyRight {
  font-size: 0.12rem;
  height: 30px;
  width: 107%;
}
.classifyRight ul:nth-child(1) {
  height: 2.26rem;
  border-radius: 0.1rem;
  background: #fff;
  width: 67%;
  position: absolute;
  left: 103px;
  margin: 8px;
}
.classifyRight ul:nth-child(2) {
  height: 2.26rem;
  border-radius: 0.1rem;
  background: #fff;
  width: 67%;
  position: absolute;
  left: 103px;
  top: 389px;
  margin: 8px;
}
.classifyRight ul p {
  font-size: 0.12rem;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  position: relative;
  left: -88px;
  top: 7px;
}
.classifyRight ul li {
  float: left;
  float: left;
  margin: 4px;
  padding-top: 7px;
}
.classifyRight ul li span {
  display: inline-block;
  width: 73px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #9a3cf3;
  border-radius: 23px;
  color: #9a3cf3;
  font-size: 0.12rem;
}
.classifyRight ul li:nth-child(8) span,.classifyRight ul li:nth-child(2) span {
  border: 1px solid #9a3cf3;
  color: #9a3cf3;
}
.classifyRight ul li:nth-child(3) span,
.classifyRight ul li:nth-child(7) span,
.classifyRight ul li:nth-child(9) span,
.classifyRight ul li:nth-child(13) span {
  border: 1px solid #3d7dfc;
  color: #3d7dfc;
}
.classifyRight ul li:nth-child(4) span,
.classifyRight ul li:nth-child(10) span {
  border: 1px solid #ff650d;
  color: #ff650d;
}
.classifyRight ul li:nth-child(5) span,
.classifyRight ul li:nth-child(11) span {
  border: 1px solid #60eca5;
  color: #60eca5;
}
.classifyRight ul li:nth-child(6) span,
.classifyRight ul li:nth-child(12) span {
  border: 1px solid #ff7594;
  color: #ff7594;
}
</style>