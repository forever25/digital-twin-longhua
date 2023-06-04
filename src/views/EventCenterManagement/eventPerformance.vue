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
      eventList: globalConfig.eventCenter,
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

      this.eventList.forEach((it) => {
        if (eventObj[it.time] === undefined) {
          eventObj[it.time] = [0, 0];
        }

        if (it.status === "待处理") {
          eventObj[it.time][0]++;
        } else {
          eventObj[it.time][1]++;
        }
      });
      // debugger;
      const pendingList = [];
      const processedList = [];
      const xAxisList = [];
      Object.keys(eventObj)
        .sort()
        .forEach((it) => {
          xAxisList.push(it);
          processedList.push(eventObj[it][1]);
          pendingList.push(eventObj[it][0]);
        });

      var option = {
        color:['#ff6c00','#73d864'],
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: ["#ffffff00"],
          textStyle: {
            color: ["#fff"],
          },
        },
        legend: {
          data:['待处理','已处理'],
          show: true,
          bottom: 0,
          textStyle: {
            color: "#fff",
          },
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
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "待处理",
            type: "line",
            data: pendingList,
            showSymbol: false,
            // lineStyle: { color: "#ff6c00" },
          },
          {
            name: "已处理",
            type: "line",
            data: processedList,
            showSymbol: false,
            // lineStyle: { color: "#73d864" },
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
