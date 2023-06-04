/**
 *@author: ljj
 *@Date: 2022-03-14 10:37:42
 *@description: 人员类型echarts图
*/
<script>
export default {
  name: 'personTypeChartsTwo',
  props: {
    personTypeData: {
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
      let option = {
        title: [
          {
            text: '男',
            x: 'center',
            top: '38%',
            textStyle: {
              color: '#FFFFFF',
              fontSize: this.getFontSize(),
              fontWeight: '100',
            },
          },
          // 比例
          {
            text: '65.12%',
            x: 'center',
            top: '48%',

            textStyle: {
              fontSize: '16',
              color: '#00E0FE',
              fontFamily: 'DINAlternate-Bold, DINAlternate',
              foontWeight: '600',
            },
          },
          {
            text: '男女比例',
            x: 'center',
            bottom: '3%',
            textStyle: {
              color: '#FFFFFF',
              fontSize: this.getFontSize(),
              fontWeight: '100',
            },
          },
        ],
        backgroundColor: 'transparent',
        polar: {
          radius: ['60%', '72%'],
          center: ['50%', '45%'],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 32,
            showBackground: true,
            backgroundStyle: {
              color: '#007FFE',
            },
            data: [60],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#00E0FF',
                  },
                  {
                    offset: 1,
                    color: '#00E0FF',
                  },
                ]),
              },
            },
          },
        ],
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
    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    getCirlPoint(x0, y0, r, angle) {
      let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
      let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
      return {
        x: x1,
        y: y1
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
