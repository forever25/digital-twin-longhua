/**
 *@author: ljj
 *@Date: 2021-08-31 11:08:22
 *@description: 摄像头统计Echarts图
*/
<script>
export default {
  name: 'MonitorCharts',
  props: {
    monitorInfo: {
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
      let datas = {};
      datas.value = this.monitorInfo.value;
      datas.total = this.monitorInfo.total;
      datas.color = this.monitorInfo.colorSet;
      let option = {
        backgroundColor: 'transparent',
        title: {
          text: datas.value + '个',
          x: '46%',
          y: '40%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: datas.color[1],
          },
        },
        data: [
          {
            name: datas.name,
          },
        ],

        series: [
          {
            // 主圆环
            name: datas.name,
            type: 'pie',
            radius: ['60%', '90%'],
            startAngle: 225,
            color: [
              {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: datas.color[0], // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: datas.color[1], // 100% 处的颜色
                  },
                ],
              },
              'transparent',
            ],
            hoverAnimation: true,
            legendHoverLink: false,
            z: 10,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: (75 * datas.value) / datas.total,
              },
              {
                value: 100 - (75 * datas.value) / datas.total,
              },
            ],
          },
          {
            // 背景圆环
            name: '',
            type: 'pie',
            radius: ['60%', '90%'],
            silent: true,
            startAngle: 225,
            labelLine: {
              normal: {
                show: false,
              },
            },
            z: 5,
            data: [
              {
                value: 75,
                itemStyle: {
                  color: 'rgba(49,229,249,.1)',
                  borderWidth: 2,
                  // borderColor: '#95C4CB',
                },
              },
              {
                value: 25,
                itemStyle: {
                  color: 'transparent',
                },
              },
            ],
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
        return 20;
      } else if (document.body.offsetWidth < 1920 && document.body.offsetWidth >= 1366) {
        return 15;
      } else {
        return 10;
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
  .person-charts {
    height: 100%;
    width: 100%;
  }
}
</style>
