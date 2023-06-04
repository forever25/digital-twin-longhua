/**
 *@author: ljj
 *@Date: 2021-09-09 09:06:52
 *@description: 门禁Echarts图
*/
<script>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  name: 'AccessViewCharts',
  props: {
    doorNum: {
      type: Number,
      default: () => 0,
    },
    color: {
      type: Array,
      default: () => [],
    },
    totalDoorNum: {
      type: Number,
      default: () => 0,
    },
    title: {
      type: String,
      default: () => '',
    }
  },
  data() {
    return {
      accessNum: 0,
      setIntervals: "",
      chart: null,//图标列表
    }
  },
  mounted() {
    this.accessNum = (this.doorNum / this.totalDoorNum).toFixed(2);
    this.$nextTick(() => {
      this.initCharts();
    });
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  beforeDestroy() {
    clearInterval(this.setIntervals);
    this.setIntervals = "";
  },
  methods: {
    initCharts() {
      let that = this;
      var option = {
        backgroundColor: 'transparent',
        title: {
          text: this.doorNum + "个",
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#fff',
            fontSize: this.getFontSize() + '',
          },
          subtext: this.title,
          subtextStyle: {
            color: that.color[0],
            fontSize: this.getSubTitle() + ''
          },
          itemGap: this.getSubItemCap(),
        },
        series: [
          {
            name: "内线",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(
                    api.getWidth(),
                    api.getHeight()
                  ) / 3.5,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: that.color[0],
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            name: "内线",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(
                    api.getWidth(),
                    api.getHeight()
                  ) / 3.5,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: that.color[0],
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            name: "外线",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(
                    api.getWidth(),
                    api.getHeight()
                  ) / 3,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: that.color[0],
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            name: "外线",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(
                    api.getWidth(),
                    api.getHeight()
                  ) / 3,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: that.color[0],
                  fill: "transparent",
                  lineWidth: 1.5
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            name: "线头点",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r =
                Math.min(api.getWidth(), api.getHeight()) / 3;
              let point = getCirlPoint(x0, y0, r, 90 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 3
                },
                style: {
                  stroke: that.color[0],
                  fill: that.color[0]
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            name: "线头点",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r =
                Math.min(api.getWidth(), api.getHeight()) / 3;
              let point = getCirlPoint(x0, y0, r, 270 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 3
                },
                style: {
                  stroke: that.color[0],
                  fill: that.color[0]
                },
                silent: true
              };
            },
            data: [0]
          },
          {
            type: 'liquidFill',
            radius: '50%',
            center: ['50%', '50%'],
            color: this.color, //水波
            data: [this.accessNum, this.accessNum, this.accessNum], // data个数代表波浪数
            label: {
              normal: {
                show: false,
              }
            },
            backgroundStyle: {
              borderWidth: 1,
              color: 'transparent'
            },
            outline: {
              show: true,
              itemStyle: {
                borderColor: that.color[0],
                borderWidth: 1
              },
              borderDistance: 3
            }
          },
        ]
      }
      // 渲染
      this.chart = echarts.init(this.$refs.personCharts);
      let charts = this.chart;
      let angle = 0; //角度，用来做简单的动画效果的
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
        let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
        return {
          x: x1,
          y: y1
        };
      }

      function _draw(charts, option) {
        return function () {
          draw(charts, option);
        }
      }
      function draw(charts, option) {
        angle = angle + 3;
        charts.setOption(option);
      }
      that.setIntervals = setInterval(_draw(charts, option), 100);
    },

    /**
     * @description: 获取字体大小
     * @author: wzd
     * @date: 2021-09-14 11:10:03
     */
    getFontSize() {
      if (document.body.offsetWidth >= 1920) {
        return 26;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 18;
      } else {
        return 12;
      }
    },

    /**
     * @description: 获取副标题的字体大小
     * @author: wzd
     * @date: 2021-09-14 11:34:51
     */
    getSubTitle() {
      if (document.body.offsetWidth >= 1920) {
        return 16;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 12;
      } else {
        return 10;
      }
    },

    /**
     * @description: 获取主副标题之间的间距
     * @author: wzd
     * @date: 2021-09-14 11:36:02
     */
    getSubItemCap() {
      if (document.body.offsetWidth >= 1920) {
        return 55;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 40;
      } else {
        return 30;
      }
    },
  },
}
</script>
<template>
  <Row class="main-panel">
    <div
      ref="personCharts"
      class="person-charts"
    >
    </div>
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
