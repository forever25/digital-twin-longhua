/**
 *@author: ljj
 *@Date: 2022-03-15 15:57:02
 *@description: 事件统计Echarts图
*/
<script>
export default {
  name: 'CarStatisticsCharts',
  props: {
    carInfo: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  methods: {
    initCharts() {
      var color = [
        '#2865FA',
        '#FAC126',
        '#FFC722',
        '#886EFF',
      ];

      var seriesData = [
        { "name": "投诉", "value": 1 },
        { "name": "警情处理", "value": 116 },
        { "name": "举报", "value": 99 },
        { "name": "行政案件", "value": 51 },
        { "name": "社会联动", "value": 145 },
        { "name": "救助咨询", "value": 280 },
        { "name": "其他报警", "value": 282 },
      ]
      const man =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACplBMVEUA//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8AAAD6cr7iAAAA4HRSTlMAEEZukqWwuK+kjGs6CAGa1PSchH2FjqK62/bLizAd5tqbaD45ODdBcKbn2XYOHqjzrl01NDM7arvshw/wSzEvLjZV6WXCMi0sKikrY9jBG3TtfygnJiWfRAOe3VYjIiEgJGkEscwcH1qtyj8a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';
      var option = {
        backgroundColor: 'transparent',
        color: color,
        tooltip: {
          show: true,
          formatter: (item) => {
            return `${item.marker}${item.name}: ${item.value}起`
          }
        },
        graphic: {
          elements: [{
            type: 'image',
            z: 3,
            style: {
              image: man,
              width: 58,
              height: 58
            },
            left: '39.2%',
            top: '38.5%'
          },

          ]
        },
        legend: {
          show: false,
        },
        series: [{
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '65%', // 错位调整此处
          startAngle: 0,
          endAngle: 360,
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: {
            splitNumber: 4,
            length: '2',
            lineStyle: {
              color: '#0BE3E5',
              width: 5
            }
          },
          axisLabel: { show: false }
        }, {
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['30%', '45%'],
          showEmptyCircle: true,
          itemStyle: {
            normal: {
              // borderColor: "#050e31",
              // borderWidth: 2
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                textAlign: "center",
                rich: {
                  name: {
                    color: "#03E2E5",
                    fontSize: this.getFontSize(),
                  },
                  value: {
                    color: "#fff",
                    fontSize: this.getFontSize(),
                  },
                }
              },
              formatter: (item) => {
                // console.log(item)
                return `{name|${item.name}}\n{value|${item.value}起}`
              },
            }
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10,
          },
          data: seriesData,
        }],
      };


      // 渲染
      this.chart = this.$Echarts.init(this.$refs.personCharts);
      this.chart.setOption(option);
    },

    /**
     * @description: 获取字体大小
     * @author: wzd
     * @date: 2021-09-14 10:19:35
     */
    getFontSize() {
      if (document.body.offsetWidth >= 1920) {
        return 14;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 12;
      } else {
        return 12;
      }
    },
    // 获取位置
    getLcation() {
      if (document.body.offsetHeight >= 1080) {
        return 14;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 12;
      } else {
        return 12;
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
  position: relative !important;
  .person-charts {
    height: 100%;
    width: 100%;
  }
}
</style>
