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
      eventList: globalConfig.AKeyToCall,
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
      var scale = 0.8;
      const eventListObj = {};
      this.eventList.forEach((it) => {
        // { type: "核实分类", nature: "确认性质", address: "事发地址" },
        if (eventListObj[it.type] === undefined) {
          eventListObj[it.type] = 1;
        } else {
          eventListObj[it.type]++;
        }
      });

      const echartData = Object.keys(eventListObj).map((it) => {
        return {
          value: eventListObj[it],
          name: it,
        };
      });

      var rich = {
        yellow: {
          color: "#ffc72b",
          fontSize: 14 * scale,
          padding: [5, 4],
          align: "center",
        },
        total: {
          color: "#ffc72b",
          fontSize: 40 * scale,
          align: "center",
        },
        white: {
          color: "#fff",
          align: "center",
          fontSize: 14 * scale,

        },
        blue: {
          color: "#49dff0",
          fontSize: 12 * scale,
          align: "center",
        },
        hr: {
          borderColor: "#0b5263",
          width: "100%",
          borderWidth: 1,
          height: 0,
        },
      };
     const option = {
        // backgroundColor: "#031f2d",
        title: {
          text: "事件总数",
          left: "center",
          top: "53%",
          padding: [14, 0],
          textStyle: {
            color: "#fff",
            fontSize: 16 * scale,
            align: "center",
          },
        },
        legend: {
          selectedMode: false,
          formatter: function (name) {
            var total = 0; //各科正确率总和
            var averagePercent; //综合正确率
            echartData.forEach(function (value, index, array) {
              total += value.value;
            });
            return "{total|" + total + "}";
          },
          data: [echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: "center",
          top: "center",
          icon: "none",
          align: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12 * scale,
            rich: rich,
          },
        },
        series: [
          {
            name: "事件总数",
            type: "pie",
            radius: ["42%", "50%"],
            hoverAnimation: false,
            color: [
              "#c487ee",
              "#deb140",
              "#49dff0",
              "#034079",
              "#6f81da",
              "#00ffb4",
            ],
            label: {
              normal: {
                formatter: function (params, ticket, callback) {
                  var total = 0; //考生总数量
                  var percent = 0; //考生占比
                  echartData.forEach(function (value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  return (
                    "{white|" +
                    params.name +
                    "}\n{hr|}\n{yellow|" +
                    params.value +
                    "}\n{blue|" +
                    percent +
                    "%}"
                  );
                },
                rich: rich,
              },
            },
            labelLine: {
              normal: {
                length: 55 * scale,
                length2: 0,
                lineStyle: {
                  color: "#0b5263",
                },
              },
            },
            data: echartData,
          },
        ],
      };
      // 渲染
      this.chart = echarts.init(this.$refs.eventCharts);
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
    <div ref="eventCharts" class="person-charts"></div>
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
