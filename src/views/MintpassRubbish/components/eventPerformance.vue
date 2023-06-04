/**
 *@author: ljj
 *@Date: 2021-09-09 09:06:52
 *@description: 事件处理Echarts图
*/
<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
export default {
  name: "EventProcessCharts",
  props: {},
  data() {
    return {
      eventList: globalConfig.MintpassRubbish,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
    window.addEventListener("resize", () => {
      if (null != this.chart) {
        this.chart.resize();
      }
    });
  },
  methods: {
    initCharts() {
      const eventObj = {};

      // debugger;
      const pendingList = [6, 1, 3, 4, 2, 8]; // 正常
      const processedList = [1, 1, 4, 5, 2, 4]; // 溢出
      const pendingList1 = [1, 2, 3, 4, 2, 1]; // 异味
      const processedLis2 = [1, 2, 1, 0, 1, 1]; // 故障
      const xAxisList = ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"];

      var option = {
        color: ["#13f3fd", "#e48d30", "#ff6c00", "#fd3d13"],
        tooltip: {
          data: ["正常", "溢出", "异味", "故障"],
          show: true,
          trigger: "axis",
          backgroundColor: ["#ffffff00"],
          textStyle: {
            color: ["#fff"],
          },
        },
        legend: {
          show: true,
          bottom: "12px",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          // x: "12%", //x 偏移量
          y: "-10%", // y 偏移量
          width: "87%", // 宽度
          height: "76%", // 高度
        },
        // dataZoom: [
        //   {
        //     show: false,
        //     realtime: true,
        //     start: 20,
        //     end: 80,
        //   },
        //   {
        //     type: "inside",
        //     realtime: true,
        //     start: 20,
        //     end: 80,
        //   },
        // ],
        xAxis: {
          // axisLine: {
          //   // show: false,
          //   color: "#fff",
          // },
          // splitLine: {
          //   // show: false,
          // },
          // type:'time',
          data: xAxisList,
          boundaryGap: false,
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisLine: {
            // show: false,
            color: "#fff",
          },
          // boundaryGap: false,
        },
        series: [
          {
            name: "正常",
            type: "line",
            data: pendingList,
            showSymbol: false,
            // lineStyle: { color: "#13f3fd" },
          },
          {
            name: "溢出",
            type: "line",
            data: processedList,
            showSymbol: false,
            // lineStyle: { color: "#e48d30" },
          },
          {
            name: "异味",
            type: "line",
            data: pendingList1,
            showSymbol: false,
            // lineStyle: { color: "#ff6c00" },
          },
          {
            name: "故障",
            type: "line",
            data: processedLis2,
            showSymbol: false,
            // lineStyle: { color: "#fd3d13" },
          },
        ],
      };
      // 渲染
      this.chart = echarts.init(this.$refs.eventChart);
      this.chart.setOption(option);
    },

    /**
     * @description: 获取字体大小
     * @author: wzd
     * @date: 2021-09-14 11:10:03
     */
    getFontSize() {
      if (document.body.offsetWidth >= 1920) {
        return 20;
      } else if (
        document.body.offsetWidth < 1920 &&
        document.body.offsetWidth >= 1366
      ) {
        return 14;
      } else {
        return 12;
      }
    },
    /**
     *@author: ljj
     *@Date: 2021-09-15 18:29:09
     *@description: 获取图例间距
     */
    getItemGapSize() {
      if (document.body.offsetWidth >= 1920) {
        return 10;
      } else if (
        document.body.offsetWidth < 1920 &&
        document.body.offsetWidth >= 1366
      ) {
        return 2;
      } else {
        return 1;
      }
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div ref="eventChart" class="person-charts"></div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
}
.person-charts {
  height: 100%;
  width: 100%;
}
</style>
