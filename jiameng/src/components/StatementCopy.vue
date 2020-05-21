<template>
  <div>
    <Top :text="statementText" />
    <img src="../assets/img/statement/pic_baobiao.png" alt style="width:100%"/>
    <span class="statementSpan">广州黄埔区</span>
    <!-- 本月营收 -->
    <div class="revenue">
      <p>本月营收</p>
      <p>￥15000,00</p>
      <ul>
        <li>
          <p>预估利润</p>
          <span>5000元</span>
        </li>
        <li>
          <p>客流量</p>
          <span>1000人</span>
        </li>
        <li>
          <p>当月费用</p>
          <span>3000元</span>
        </li>
      </ul>
    </div>
    <!-- echarts -->
    <div class="echart">
      <div>
        <img src="../assets/img/statement/icon_zzt.png" alt />
        <p @click="add()">每日营收、利润、利润率</p>
        <ul>
          <li>每日营收(元)</li>
          <li>利润(元)</li>
          <li>利润率</li>
        </ul>
      </div>
    </div>
    <div class="page">
      <ul>
        <li @click="pagereduce(echartList)">
          <p>上一页</p>
          <h3 :class="{pageH3:pageOne}">前面没有数据了</h3>
        </li>
        <li @click="pageadd(echartList)">
          <p>下一页</p>
          <h3 :class="{pageH3:pageTwo}">后面没有数据了</h3>
        </li>
      </ul>
    </div>
    <ul class="stateUl echartOne">
      <li>4w</li>
      <li>3w</li>
      <li>2w</li>
      <li>1w</li>
      <li>0</li>
    </ul>
    <div
      id="myChart"
      :style="{width: '94%', height: '4rem',background:'white',margin:'0 auto',position:'relative',top:'-0.33rem'}"
    ></div>
    <!-- 构成 -->
    <div class="constitute">
      <p class="constituteP">
        <img src="../assets/img/statement/icon_bzt.png" alt />
        <span>成本构成</span>
      </p>
      <div
        id="myConstitute"
        :style="{width: '100%', height: '3rem',background:'white',margin:'0 auto'}"
      ></div>
      <ul>
        <li>
          <p>采购成本</p>
          <p>45%</p>
        </li>
        <li>
          <p>采购成本</p>
          <p>25%</p>
        </li>
        <li>
          <p>采购成本</p>
          <p>20%</p>
        </li>
        <li>
          <p>采购成本</p>
          <p>10%</p>
        </li>
      </ul>
      <!--  -->
    </div>
    <!-- profit利润 -->
    <div class="echart" style="margin:0.35rem auto">
      <div>
        <img src="../assets/img/statement/icon_zzt2.png" alt />
        <p>
          每月营收、利润
          <span class="echartSpan">
            2020年
            <img src="../assets/img/statement/icon_moer_nor.png" alt />
          </span>
        </p>
        <ul>
          <li class="mouthRevenue">每月营收(元)</li>
          <li class="mouthLi">利润（元）</li>
        </ul>
      </div>
    </div>
    <div class="page" style="top:-0.3rem">
      <ul>
        <li @click="pagemonth(echartMonthList)">
          <p>上一页</p>
          <h3 :class="{pageH3:pageMonthOne}">前面没有数据了</h3>
        </li>
        <li @click="nextmonth(echartMonthList)">
          <p>下一页</p>
          <h3 :class="{pageH3:pageMonthTwo}">后面没有数据了</h3>
        </li>
      </ul>
    </div>
    <ul class="stateUl echartTwo">
      <li>4w</li>
      <li>3w</li>
      <li>2w</li>
      <li>1w</li>
      <li>0</li>
    </ul>
    <div
      id="profit"
      :style="{width: '94%', height: '4rem',background:'white',margin:'-0.31rem auto',position:'relative',top:'-0.49rem'}"
    ></div>
    <!-- 2020 -->
    <div class="echartNum">
      <ul>
        <li>2020</li>
        <li>2020</li>
        <li>2020</li>
        <li>2020</li>
        <li>2020</li>
      </ul>
    </div>
    <!-- 排行 -->
    <div class="ranking">
      <p>
        <img src="../assets/img/statement/pic_mdys.png" alt />
        <span>门店营收排行</span>
      </p>
      <ul>
        <li v-for="(item,index) in ranking" :key="index">{{item}}</li>
      </ul>
      <ul>
        <li v-for="(item,index) in rankingList" :key="index">
          <img :src="item.img" alt />
          <span>{{item.text}}</span>
          <span>{{item.num}}</span>
          <span>{{item.number}}</span>
        </li>
      </ul>
      <div class="rankBottom">
        <ul>
          <li>
            <span>4</span>
            <span>广州耐克工厂</span>
            <span>15000</span>
            <span>5000</span>
          </li>
          <li>
            <span>5</span>
            <span>广州富士康</span>
            <span>15000</span>
            <span>5000</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 粮油人均消费 -->
    <div class="consumption">
      <p class="consumptionP">
        <img src="../assets/img/statement/icon_kongzhi.png" alt />
        <span>粮油人均消费</span>
      </p>
      <ul>
        <li v-for="(item,index) in consumptionList" :key="index">
          <div>
            <p>门店</p>
            <p>{{item.span1}}</p>
            <p>粮</p>
            <p>{{item.span2}}</p>
          </div>
          <div>
            <p>客流</p>
            <p>{{item.span3}}</p>
            <p>油</p>
            <p>{{item.span4}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- footer -->
    <Footer />
  </div>
</template>
<script>
import Top from "./common/Top";
export default {
  name: "StatementCopy",
  data() {
    return {
      num: 0, //图表的数据序列每天的
      numMonth: 0, //图表的数据序列每月的
      statementText: "报表",
      ranking: ["排名", "门店", "营收", "利润"],
      pageOne: false,
      pageTwo: false,
      pageMonthOne: false,
      pageMonthTwo: false,
      echartList: [
        {
          data: ["02/02", "02/03", "02/04", "02/05", "02/06"],
          value: {
            value1: 35000,
            value2: 29000,
            value3: 15000
          }
        },
        {
          data: ["02/07", "02/08", "02/09", "02/010", "02/011"],
          value: {
            value1: 25000,
            value2: 19000,
            value3: 14000
          }
        },
        {
          data: ["02/12", "02/13", "02/14", "02/15", "02/16"],
          value: {
            value1: 15000,
            value2: 24000,
            value3: 5000
          }
        }
      ],
      echartMonthList: [
        {
          data: ["02", "03", "04", "05", "06"],
          value: {
            value1: 35000,
            value2: 29000
          }
        },
        {
          data: ["07", "08", "09", "10", "11"],
          value: {
            value1: 25000,
            value2: 19000
          }
        },
        {
          data: ["12", "13", "14", "15", "16"],
          value: {
            value1: 15000,
            value2: 24000
          }
        }
      ],
      consumptionList: [
        {
          span1: "广州科学城店",
          span2: 0.3,
          span3: 1500,
          span4: 0.03
        },
        {
          span1: "天河员村店",
          span2: 0.3,
          span3: 1500,
          span4: 0.03
        },
        {
          span1: "广州富力店",
          span2: 0.3,
          span3: 1500,
          span4: 0.03
        },
        {
          span1: "广州耐克工厂店",
          span2: 0.3,
          span3: 1500,
          span4: 0.03
        },
        {
          span1: "广州科学城店",
          span2: 0.3,
          span3: 1500,
          span4: 0.03
        }
      ],
      rankingList: [
        {
          img: require("../assets/img/statement/icon_1.png"),
          text: "广州科学城店",
          num: 15000,
          number: 5000
        },
        {
          img: require("../assets/img/statement/icon_2.png"),
          text: "广州天河员村店",
          num: 15000,
          number: 5000
        },
        {
          img: require("../assets/img/statement/icon_3.png"),
          text: "广州富力店",
          num: 15000,
          number: 5000
        }
      ]
    };
  },
  mounted() {
    this.drawLine(this.echartList[0]);
    // 构成
    this.constitute();
    // 每月营收、利润
    this.profit(this.echartMonthList[0]);
  },
  components: {
    Top
  },
  methods: {
    drawLine(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // grid:{containLabel:true},
        title: {},
        grid: { left: 15 },
        legend: {
          width: 50,
          data: [
            {
              name: "货币",
              icon: "circle"
            },
            {
              name: "股票",
              icon: "circle"
            },
            {
              name: "债券",
              icon: "circle"
            },
            {
              name: "债券",
              icon: "circle"
            }
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        xAxis: {
          type: "category",
          data: data.data,
          axisTick: { show: false },
          axisLine: {
            //y轴
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#999",
              fontSize: 10
            }
          }
        },
        yAxis: {
          max: 40000,
          min: 0,
          splitNumber: 5,
          axisLine: {
            //y轴
            show: false
          },
          position: "left",
          axisLabel: {
            show: false,
            textStyle: {
              color: "#999"
            }
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barCategoryGap: "30%",
            barWidth: 7,
            data: [
              {
                value: data.value.value1,
                name: "每日营收",
                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                },

                show: false,
                splitLine: {
                  show: false
                }
              },
              {
                value: data.value.value1,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value1,
                name: "利润率",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value1,
                name: "每日营收",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",

                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                },
                barBorderRadius: 12
              },
              {
                value: data.value.value1,
                name: "每日营收",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",

                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              }
            ]
          },
          {
            name: "销量",
            type: "bar",
            barCategoryGap: "30%",
            barWidth: 7,
            data: [
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              }
            ]
          },
          {
            name: "销量",
            barCategoryGap: "30%",
            type: "bar",
            barWidth: 7,
            data: [
              {
                value: data.value.value3,
                name: "利润率",
                itemStyle: {
                  normal: {
                    color: "#9A3CF3",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value3,
                name: "利润率",
                itemStyle: {
                  normal: {
                    color: "#9A3CF3",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value3,
                name: "利润率",
                itemStyle: {
                  normal: {
                    color: "#9A3CF3",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value3,
                name: "利润率",
                itemStyle: {
                  normal: {
                    color: "#9A3CF3",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value3,
                name: "利润率",
                itemStyle: {
                  normal: {
                    color: "#9A3CF3",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              }
            ]
          }
        ]
      });
    },
    constitute() {
      let myChartss = this.$echarts.init(
        document.getElementById("myConstitute")
      );
      // 绘制图表
      myChartss.setOption({
        title: { text: "" },
        //  grid:{containLabel:true},
        tooltip: {},
        grid: { left: 10 },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 45, name: "", itemStyle: { color: "#417BEF" } },
              { value: 25, name: "", itemStyle: { color: "#5EDB91" } },
              { value: 20, name: "", itemStyle: { color: "#BB3FEF" } },
              { value: 10, name: "", itemStyle: { color: "#FF7594" } }
            ]
          }
        ]
      });
      myChartss.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0
      });
    },
    profit(data) {
      let myChart = this.$echarts.init(document.getElementById("profit"));
      // 绘制图表
      myChart.setOption({
        title: {},
        grid: { left: 15 },
        //  grid:{containLabel:true},
        legend: {
          width: 50,
          data: [
            {
              name: "货币",
              icon: "circle"
            },
            {
              name: "股票",
              icon: "circle"
            },
            {
              name: "债券",
              icon: "circle"
            },
            {
              name: "债券",
              icon: "circle"
            }
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        xAxis: {
          type: "category",
          data: data.data,
          axisTick: { show: false },
          axisLine: {
            //y轴
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#999",
              fontSize: 10
            }
          }
        },
        yAxis: {
          max: 40000,
          min: 0,
          splitNumber: 5,
          axisLine: {
            //y轴
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: "#999"
            }
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            barCategoryGap: "30%",
            barWidth: 7,
            data: [
              {
                value: data.value.value1,
                name: "每日营收",
                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                },

                show: false,
                splitLine: {
                  show: false
                }
              },
              {
                value: data.value.value1,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value1,
                name: "利润率",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value1,
                name: "每日营收",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",

                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                },
                barBorderRadius: 12
              },
              {
                value: data.value.value1,
                name: "每日营收",

                itemStyle: {
                  normal: {
                    color: "#60ECA5",

                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              }
            ]
          },
          {
            name: "销量",
            type: "bar",
            barCategoryGap: "30%",
            barWidth: 7,
            data: [
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              },
              {
                value: data.value.value2,
                name: "利润",
                itemStyle: {
                  normal: {
                    color: "#5A7FF6",
                    barBorderRadius: [10, 10, 0, 0]
                  },
                  emphasis: {
                    barBorderRadius: [10, 10, 0, 0]
                  }
                }
              }
            ]
          }
        ]
      });
    },
    pageadd(data) {
      this.pageOne = false;
      this.num++;
      if (this.num >= data.length) {
        this.pageTwo = true;
        this.num = data.length - 1;
        return;
      }
      console.log(this.num);
      this.pageTwo = false;
      this.drawLine(data[this.num]);
    },
    pagereduce(data) {
      this.pageTwo = false;
      this.num--;
      if (this.num < 0) {
        this.pageOne = true;
        this.num = 0;
        return;
      }
      this.pageOne = false;
      console.log(this.num);
      this.drawLine(data[this.num]);
    },
    nextmonth(data) {
      this.pageMonthOne = false;
      this.numMonth++;
      if (this.numMonth >= data.length) {
        this.pageMonthTwo = true;
        this.numMonth = data.length - 1;
        return;
      }
      console.log(this.num);
      this.pageMonthTwo = false;
      this.profit(data[this.numMonth]);
    },
    pagemonth(data) {
      this.pageMonthTwo = false;
      this.numMonth--;
      if (this.numMonth < 0) {
        this.pageMonthOne = true;
        this.numMonth = 0;
        return;
      }
      this.pageMonthOne = false;
      console.log(this.num);
      this.profit(data[this.numMonth]);
    }
  }
};
</script>
<style scoped>
.stateUl {
  font-size: 0px;
  position: absolute;
  width: 3%;
  margin-left: 0.1rem;
  z-index: 455;
  height: 4rem;
  margin-top: -0.51rem;
  background: white;
}
.stateUl li {
  height: 0.7rem;
  text-align: left;
  font-size: 0.12rem;
  position: relative;
  bottom: -0.55rem;
  left: 0.08rem;
  color: #999;
}
.statementSpan {
  position: absolute;
  font-size: 0.2rem;
  top: 1.19rem;
  color: #fff;
  left: 0.5rem;
}
.revenue {
  font-size: 0px;
  height: 1.49rem;
  position: relative;
  width: 94%;
  margin: 0 auto;
  background: white;
  top: -0.62rem;
  border-radius: 0.1rem;
}
.revenue > p:nth-child(1) {
  font-size: 0.11rem;
  color: blue;
  padding: 0.12rem;
}
.revenue > p:nth-child(2) {
  font-size: 0.16rem;
  color: #5a7ff6;
  padding: 0.06rem;
  font-weight: bold;
}
.revenue ul {
  display: flex;
  margin-top: 0.2rem;
}
.revenue ul li {
  flex: 1;
}
.revenue ul li p {
  color: #999;
  font-size: 0.11rem;
  margin-bottom: 0.1rem;
}
.revenue ul li span {
  color: #333;
  padding: 0.1rem;
  font-size: 0.14rem;
}
.echart {
  font-size: 0px;
  position: relative;
  z-index: 15;
  width: 94%;
  /* height: 0.6rem; */
  margin: 0 auto;
  background: white;
  margin-top: -0.3rem;
}
.echart img {
  position: relative;
  top: 0.18rem;
  left: -1.55rem;
}
.echart p {
  text-align: left;
  margin-left: 0.45rem;
  font-size: 0.14rem;
  color: #333;
  font-weight: bold;
  height: 0.2rem;
  line-height: 0.2rem;
}
.echart ul {
  display: flex;
  margin-top: 0.3rem;
  margin-left: 0.34rem;
}
.echart div:nth-child(2) ul {
  margin: 0px;
}
.echart div:nth-child(1) ul li:nth-child(1)::after {
  width: 0.13rem;
  height: 0.13rem;
  background: #60eca5;
  display: block;
  content: "";
  position: relative;
  top: -0.13rem;
  left: 0rem;
}
.echart div:nth-child(1) ul li:nth-child(2)::after {
  width: 0.13rem;
  height: 0.13rem;
  background: #5a7ff6;
  display: block;
  content: "";
  position: relative;
  top: -0.13rem;
  left: 0.1rem;
}
.echart div:nth-child(1) ul li:nth-child(3)::after {
  width: 0.13rem;
  height: 0.13rem;
  background: #9a3cf3;
  display: block;
  content: "";
  position: relative;
  top: -0.13rem;
  left: 0.15rem;
}
.echart ul li {
  flex: 1;
  font-size: 0.12rem;
  color: #999;
}
.constitute {
  font-size: 0px;
  width: 94%;
  margin: 0 auto;
  margin-bottom: -0.94rem;
}
.constituteP {
  font-size: 0.14rem;
  color: #333;
  height: 0.4rem;
  position: relative;
  text-align: left;
  z-index: 156;
  line-height: 0.4rem;
  font-weight: bold;
  background: white;
  border-radius: 0.05rem 0.05rem 0px 0px;
  border-bottom: 1px solid rgb(212, 208, 208);
}
.constituteP > img {
  position: relative;
  top: 0.05rem;
  left: 0.1rem;
}
.constituteP span {
  margin-left: 0.2rem;
}
.constitute ul {
  /* display:flex; */
  width: 100%;
  height: 2.5rem;
}
.constitute ul::after {
  content: "";
  display: block;
  clear: both;
}
.constitute ul li {
  float: left;
  width: 50%;
  height: 0.7rem;
  background: white;
}
.constitute ul li::after {
  content: "";
  background: red;
  display: block;
  width: 0.1rem;
  height: 0.1rem;
  position: relative;
  top: -0.45rem;
  left: 0.45rem;
}
.constitute ul li:nth-child(1):after {
  background: #417bef;
}
.constitute ul li:nth-child(2):after {
  background: #5edb91;
}
.constitute ul li:nth-child(3):after {
  background: #bb3fef;
}
.constitute ul li:nth-child(4):after {
  background: #ff7594;
}
.constitute ul li p:nth-child(1) {
  font-size: 0.12rem;
  font-weight: bold;
  color: #999;
  margin-top: 0.1rem;
}
.constitute ul li p:nth-child(2) {
  font-size: 0.2rem;
  font-weight: bold;
  margin-top: 0.1rem;
  color: #333;
}
.stall {
  font-size: 0px;
  /* height: 0.4rem;
  line-height: 0.4rem; */
  padding-top: 0.1rem;
  width: 94%;
  margin: 0 auto;
}
.stall ul {
  display: flex;
  margin-top: 0.05rem;
  width: 100%;
  margin-left: 0.1rem;
}
.stall ul li {
  border: 1px solid #999;
  -webkit-box-flex: 1;
  /* flex: 1; */
  font-size: 0.14rem;
  position: relative;
  z-index: 15;
  color: #999;
  height: 0.27rem;
  line-height: 0.27rem;
  width: 1.23rem;
  margin-right: 0.25rem;
}
.stall ul li::after {
  display: none !important;
}
.stall ul li:nth-child(1) {
  color: white;
  background: #5a7ff6;
}
.echartSpan {
  font-size: 0.12rem;
  color: #5a7ff6;
  width: 0.7rem;
  height: 0.2rem;
  border: 1px solid #999;
  text-align: center;
  line-height: 0.2rem;
  display: inline-block;
  border-radius: 0.15rem;
  background: #e6ebfa;
  margin-left: 1.2rem;
}
.echartSpan img {
  position: relative;
  top: 0px;
  left: 0px;
  transform: rotate(90deg);
}
.echartOne {
  margin-top: -0.33rem;
}
.echartTwo {
  margin-top: -0.8rem;
}
.ranking {
  font-size: 0px;
  /* height: 2.97rem; */
  width: 94%;
  margin: 0 auto;
  background: white;
}
.ranking p {
  position: relative;
  top: -0.14rem;
}
.ranking p span {
  position: absolute;
  top: 0.12rem;
  left: 1.37rem;
  font-size: 0.14rem;
  color: white;
}
.ranking ul:nth-child(2) {
  font-size: 0.11rem;
  color: white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 0.2rem;
  width: 96%;
  line-height: 0.2rem;
  margin: -0.11rem auto;
  background: #5a7ff6;
  border-radius: 0.1rem;
}
.ranking ul:nth-child(2) li {
  flex: 1;
}
.ranking ul:nth-child(3) {
  /* height: 0.5rem; */
  margin-top: 0.12rem;
  /* line-height: 0.5rem; */
  font-size: 0.12rem;
  text-align: left;
  /* margin-left: 0.35rem; */
}
.ranking ul:nth-child(3) li {
  height: 0.5rem;
  line-height: 0.5rem;
}
.ranking ul:nth-child(3) li:nth-child(2),
.ranking ul:nth-child(3) li:nth-child(4) {
  background: #f5f8ff;
}
.ranking ul:nth-child(3) li img {
  position: relative;
  top: 0.1rem;
  left: 0.35rem;
}
.ranking ul:nth-child(3) li span:nth-child(2) {
  font-weight: bold;
}
.ranking ul:nth-child(3) li span:nth-child(2) {
  display: inline-block;
  margin: auto 0.65rem;
  text-align: center;
}
.ranking ul:nth-child(3) li:nth-child(1) span:nth-child(3) {
  position: relative;
  left: -0.3rem;
}
.ranking ul:nth-child(3) li:nth-child(2) span:nth-child(3) {
  position: relative;
  left: -0.4rem;
}
.ranking ul:nth-child(3) li:nth-child(3) span:nth-child(3) {
  position: relative;
  left: -0.16rem;
}
.ranking ul:nth-child(3) li:nth-child(1) span:nth-child(4) {
  position: relative;
  left: 0.22rem;
}
.ranking ul:nth-child(3) li:nth-child(2) span:nth-child(4) {
  position: relative;
  left: 0.12rem;
}
.ranking ul:nth-child(3) li:nth-child(3) span:nth-child(4) {
  position: relative;
  left: 0.38rem;
}
.rankBottom ul li {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.12rem;
}
.rankBottom ul li:nth-child(1) {
  background: #f5f8ff;
}
.rankBottom ul li:nth-child(2) {
  background: white;
}
.rankBottom ul li:nth-child(1) span:nth-child(1) {
  position: relative;
  left: -0.56rem;
  top: -0.04rem;
}
.rankBottom ul li:nth-child(1) span:nth-child(2) {
  position: relative;
  top: -0.05rem;
  left: -0.19rem;
  font-weight: bold;
}
.rankBottom ul li:nth-child(1) span:nth-child(3) {
  position: relative;
  top: -0.05rem;
  left: 0.2rem;
}
.rankBottom ul li:nth-child(1) span:nth-child(4) {
  position: relative;
  top: -0.05rem;
  left: 0.72rem;
}
.rankBottom ul li:nth-child(2) span:nth-child(1) {
  position: relative;
  left: -0.62rem;
  top: -0.04rem;
}
.rankBottom ul li:nth-child(2) span:nth-child(2) {
  position: relative;
  top: -0.05rem;
  left: -0.25rem;
  font-weight: bold;
}
.rankBottom ul li:nth-child(2) span:nth-child(3) {
  position: relative;
  top: -0.05rem;
  left: 0.25rem;
}
.rankBottom ul li:nth-child(2) span:nth-child(4) {
  position: relative;
  top: -0.05rem;
  left: 0.8rem;
}
.consumption {
  width: 94%;
  background: white;
  margin: 0 auto;
  font-size: 0px;
  margin-bottom: 0.8rem;
}
.consumptionP {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.14rem;
  font-weight: bold;
  text-align: left;
  margin-left: 0.16rem;
  margin-top: 0.1rem;
}
.consumptionP::after {
  width: 3.52rem;
  height: 1px;
  background: rgb(236, 232, 232);
  content: "";
  position: relative;
  display: block;
  left: -0.15rem;
}
.consumptionP img {
  position: relative;
  top: 0.03rem;
}
.consumption ul {
  width: 100%;
}
.consumption ul li {
  height: 1.37rem;
  border-bottom: 1px solid rgb(236, 232, 232);
  width: 100%;
}
.consumption ul li:nth-child(5) {
  border-bottom: 0px solid #999;
}
.consumption ul li div {
  width: 50%;
  font-size: 0.14rem;
  height: 100%;
  float: left;
}
.consumption ul li div:nth-child(1) p:nth-child(1),
.consumption ul li div:nth-child(1) p:nth-child(3),
.consumption ul li div:nth-child(2) p:nth-child(1),
.consumption ul li div:nth-child(2) p:nth-child(3) {
  color: #999;
  font-size: 0.11rem;
}
.consumption ul li div:nth-child(1) p:nth-child(2) {
  color: #333;
  font-size: 0.16rem;
}
.consumption ul li div:nth-child(1) p:nth-child(4),
.consumption ul li div:nth-child(2) p:nth-child(4),
.consumption ul li div:nth-child(2) p:nth-child(2) {
  font-size: 0.2rem;
  font-weight: bold;
  color: #5a7ff6;
}
.consumption ul li div {
  position: relative;
  top: 0.18rem;
}
.consumption ul li div:nth-child(1) p:nth-child(1),
.consumption ul li div:nth-child(1) p:nth-child(2),
.consumption ul li div:nth-child(1) p:nth-child(3) {
  margin-bottom: 0.1rem;
}
.consumption ul li div:nth-child(2) p:nth-child(1),
.consumption ul li div:nth-child(2) p:nth-child(2),
.consumption ul li div:nth-child(2) p:nth-child(3) {
  margin-bottom: 0.08rem;
}
.echartNum {
  font-size: 0px;
  width: 94%;
  margin: 0 auto;
}
.echartNum ul {
  display: flex;
  position: relative;
  top: -0.55rem;
  left: 0.33rem;
}
.echartNum ul li {
  font-size: 0.11rem;
  margin-right: 0.36rem;
  color: #999;
}
.page {
  font-size: 0px;
  width: 94%;
  position: relative;
  margin: 0 auto;
  left: 1.28rem;
  z-index: 1;
}
.page ul {
  display: flex;
}
.page ul li p {
  font-size: 0.14rem;
  color: white;
  width: 0.5rem;
  margin-right: 15px;
  height: 0.2rem;
  background: #999;
}
.pageH3 {
  font-size: 0.15rem;
  position: absolute;
  left: 0.06rem;
  top: 0.26rem;
  color: #999;
}
.mouthRevenue::after {
  left: 0.26rem !important;
  top: -0.13rem !important;
}
.mouthLi::after {
  left: 0.3rem !important;
  top: -0.13rem !important;
}
</style> 
