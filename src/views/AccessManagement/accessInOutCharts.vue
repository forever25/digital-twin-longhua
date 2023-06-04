/**
 *@author: ljj
 *@Date: 2021-09-09 09:06:52
 *@description: 门禁Echarts图
*/
<script>
import * as echarts from 'echarts'
export default {
  name: 'AccessInOutCharts',
  props: {
    color: {
      type: String,
      default: () => '',
    },
    personNum: {
      type: Number,
      default: () => 0,
    },
    title: {
      type: String,
      default: () => '',
    },
    totalPersonNum: {
      type: Number,
      default: () => 0,
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
    //this.$nextTick(() => {
    this.initCharts();
    //});
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
      let value = 65;
      let option = {
        backgroundColor: 'transparent',
        title: {
          text: '{a|' + this.personNum + '}' + '{b|' + '人' + '}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: this.getMainTitleFontSize(),
                color: this.color,
                fontWeight: '400',
              },

              b: {
                fontSize: this.getUnitFontSize(),
                color: this.color,
                padding: [0, 0, 0, 2]
              }
            }
          },
          subtext: this.title,
          subtextStyle: {
            fontSize: this.getUnitFontSize(),
            color: '#fff',
          },
          itemGap: this.getItemCap(),
        },
        series: [
          {
            type: 'gauge',
            radius: '65%',
            clockwise: false,
            startAngle: '90',
            endAngle: '-269.9999',
            splitNumber: 30,
            detail: {
              offsetCenter: [0, -20],
              formatter: ' '
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0, '#2CFAFC'],
                  [(this.totalPersonNum - this.personNum) / this.totalPersonNum, this.color],
                  [1, '#0f232e']
                ],
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 255, 255, 1)',
                shadowOffsetY: '0',
                color: '#020f18',
                width: 2
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['43%', '52%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: this.color
              }
            },
            label: {
              show: false
            },
            startAngle: 0,
            data: _dashed(this)
          },

          {
            type: 'pie',
            radius: [0, '40%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                shadowBlur: 20,
                shadowColor: '#000',
                color: "transparent",
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
          {
            type: 'pie',
            radius: ['70%', '71%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 255, 255,.3)',
                color: this.color,
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
        ]
      };
      // 渲染
      let charts = echarts.init(this.$refs.personCharts);

      function _dashed(that) {
        let dataArr = [];
        for (var i = 0; i < 100; i++) {
          if (i % 2 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: that.color,
                }
              }
            })
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: 'rgb(0,0,0,0)',
                }
              }
            })
          }
        }
        return dataArr
      }

      function draw(charts, option) {
        option.series[1].startAngle = option.series[1].startAngle - 1;
        charts.setOption(option);
      }
      function doing(charts, option) {
        return function () {
          draw(charts, option);
        }
      }
      doing(charts, option)();
      this.setIntervals = setInterval(doing(charts, option), 100);
    },

    /**
     * @description: 获取主标题字体大小
     * @author: wzd
     * @date: 2021-09-14 11:39:57
     */
    getMainTitleFontSize() {
      if (document.body.offsetWidth >= 1920) {
        return 20;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 13;
      } else {
        return 11;
      }
    },

    /**
     * @description: 获取单位字体大小
     * @author: wzd
     * @date: 2021-09-14 11:41:14
     */
    getUnitFontSize() {
      if (document.body.offsetWidth >= 1920) {
        return 14;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 11;
      } else {
        return 10;
      }
    },

    getItemCap() {
      if (document.body.offsetWidth >= 1920) {
        return 59;
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
