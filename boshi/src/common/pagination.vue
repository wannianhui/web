<template>
  <nav>
    <div>{{total}}</div>
    <ul class="pagination" v-show="isDisplay">
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(current - 1)">
          <!-- « -->
          <
        </a>
      </li>
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(1)">首页</a>
      </li>
      <li v-for="p in grouplist" :class="{'active': current == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(page)">尾页</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(current + 1)">
          <!-- » -->
          >
        </a>
      </li>
      <div class="pager-input">
        <div>
          <input type="text" v-model="countNum" @keyup.enter="Go()" />
          <span>/</span>
          <span>{{allPage}}</span>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script type="es6">
import { mapState } from "vuex";
export default {
  data() {
    return {
      isDisplay: true,
      current: this.currentPage,
      countNum: "",
      allPage: "" //总页数
    };
  },
  mounted() {
    // this.isDisplay = true;
    // const that = this;
  },
  created(){
    // alert(this.total);
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    display: {
      // 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {
      // 分页条数
      type: Number,
      default: 5,
      coerce: function(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  computed: {
    page: function() {
      // 总页数
      var allPage = Math.ceil(this.total / this.display);
      this.allPage = allPage;
      return allPage;
    },
    grouplist: function() {
      // 获取分页页码
      var len = this.page,
        temp = [],
        list = [],
        count = Math.floor(this.pagegroup / 2),
        center = this.current;
        // alert(this.pagegroup)
        // this.isDisplay = true;
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len });
        }
        // 解决分页的时候，不足2页就不用显示
        if (temp.length == 1||temp.length==0) {
          this.isDisplay = false;
        }else{
          this.isDisplay = true;
        }

        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      this.isDisplay = true;
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        this.current > count + 1 &&
          list.unshift({ text: "...", val: list[0].val - 1 });
        this.current < this.page - count &&
          list.push({ text: "...", val: list[list.length - 1].val + 1 });
      }
      return list;
    },
    ...mapState(["initPageNum"])
  },
  watch: {
    initPageNum(val) {
      if (val == true) {
        this.current = 1;
        this.$store.dispatch("initPageNum", false);
      }
    }
  },
  methods: {
    setCurrent: function(idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx;
        this.$emit("pagechange", this.current);
      }
    },
    Go: function() {
      console.log(this.countNum, 93);
      if (this.countNum == "") {
        //判空处理
        return;
      } else if (/^\d*$/.test(parseInt(this.current))) {
        //填写数字才能跳转
        this.setCurrent(parseInt(this.countNum));
        this.countNum = "";
        this.$emit("setCurrentGo", this.countNum);
      } else {
        this.countNum = "";
        return;
      }
    }
  }
};
</script>

<style  scoped lang="scss">
.pagination {
  overflow: hidden;
  display: table;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*width: 100%;*/

  li {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    border-radius: 5px;
    margin: 3px;
    color: #666;
    background: white;
    color: #8d8d8d;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    &:hover {
      background: #49bdff;
      color: white;
      a {
        color: white;
      }
    }
    a {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      border-radius: 5px;
      text-decoration: none;
      color: #8d8d8d;
    }
  }
  .active {
    background: #49bdff;

    a {
      color: #fff;
    }
  }
}
.pager-input {
  width: 100px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 2px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  margin: 3px;
  position: relative;
  & > div {
    display: inline-block;
    width: 100%;
    left: 0%;
    position: absolute;
    top: 49%;
    transform: translateY(-50%);
    input {
      border: none;
      outline: none;
      width: 34px;
      height: 18px;
      border: 1px solid #e6e6e6;
      font-size: 14px;
      color: #333;
    }
    span {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #8d8d8d;
      &:nth-of-type(1) {
        font-size: 14px;
        margin: 0 7px 0 4px;
      }
    }
    input,
    span {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>