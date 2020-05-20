<template>
  <div>
    报表
    <div id="myChart" :style="{width: '100%', height: '4rem'}"></div>
    <!-- footer -->
    <Footer />
  </div>
</template>
<script>
export default {
  name: "Statement",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "每日营收、利润、利润率" },
        legend: {
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
            }
          ]
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        xAxis: {
          data: ["02/02", "02/03", "02/04", "02/05", "02/06"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [
              {
                value: 40000,
                name: "货币",
                itemStyle: { normal: { color: "#5877F0"} }
              },
              {
                value: 20000,
                name: "股票",
                itemStyle: { normal: { color: "#AA9FFD" } }
              },
              {
                value: 40000,
                name: "债券",
                itemStyle: { normal: { color: "#F96481" } }
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
</style>