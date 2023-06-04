/**
 *@author: ljj
 *@Date: 2022-03-15 10:09:40
 *@description: 车辆Echarts图
*/
<script>
import 'echarts-gl'
export default {
  name: 'CarStatisticsCharts3D.vue',
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
      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        const midRatio = (startRatio + endRatio) / 2;
        const startRadian = startRatio * Math.PI * 2;
        const endRadian = endRatio * Math.PI * 2;
        const midRadian = midRatio * Math.PI * 2;
        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = 1;
        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        const hoverRate = isHovered ? 1.05 : 1;
        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },
          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },
          x: function (u, v) {
            if (u < startRadian) {
              return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
              return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },
          y: function (u, v) {
            if (u < startRadian) {
              return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
              return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },
          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
          },
        };
      }

      /**
       * 绘制3d图
       * @param pieData 总数据
       * @param internalDiameterRatio:透明的空心占比
       * @param distance 视角到主体的距离
       * @param alpha 旋转角度
       * @param pieHeight 立体的高度
       * @param opacity 饼或者环的透明度
       */
      function getPie3D(pieData, internalDiameterRatio, distance, alpha, pieHeight, opacity = 1) {
        const series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        const legendData = [];
        const k =
          typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;
        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i += 1) {
          sumValue += pieData[i].value;
          const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
          };
          if (typeof pieData[i].itemStyle !== 'undefined') {
            const itemStyle = {};
            if (typeof pieData[i].itemStyle.color !== 'undefined') {
              itemStyle.color = pieData[i].itemStyle.color;
            }
            if (typeof pieData[i].itemStyle.opacity !== 'undefined') {
              itemStyle.opacity = pieData[i].itemStyle.opacity;
            }
            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }
        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i += 1) {
          endValue = startValue + series[i].pieData.value;
          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          console.log(series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value)
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );
          startValue = endValue;
          legendData.push(series[i].name);
        }
        return series;
      }

      const optionsData = [
        {
          name: '阻塞',
          value: 1,
          itemStyle: {
            // opacity: 1,
            color: 'rgba(255, 156, 0, .5)',
          },
        },
        {
          name: '通畅',
          value: 6,
          itemStyle: {
            color: 'rgba(0, 93, 189, .5)',
            // opacity: 1,
          },
        },
      ];

      const series = getPie3D(optionsData, 0.8, 240, 28, 26, 0.5);

      series.push({
        name: 'pie2d',
        type: 'pie',
        label: {
          show: false,
        },
        startAngle: -30, //起始角度，支持范围[0, 360]。
        clockwise: true, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['20%', '50%'],
        center: ['50%', '40%'],
        data: optionsData,
        itemStyle: {
          opacity: 0,
        },
      });

      let option = {
        title: {
          text: '通道阻塞情况',
          textStyle: {
            color: "#fff",
            fontSize: this.getFontSize(),
            fontWeight: '100',
          },
          left: "center",
          bottom: "10%"
        },
        tooltip: {
          formatter: (params) => {
            if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
              let bfb = (
                (option.series[params.seriesIndex].pieData.endRatio -
                  option.series[params.seriesIndex].pieData.startRatio) *
                100
              ).toFixed(2);
              return (
                `${params.seriesName}<br/>` +
                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                `${optionsData[params.componentIndex].value}`
              );
            }
          },
        },
        // title: {
        //   text: '3D 饼图',
        //   x: 'center',
        //   top: '20',
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 22,
        //   },
        // },
        backgroundColor: 'transparent',
        labelLine: {
          show: true,
          lineStyle: {
            color: '#7BC0CB',
          },
        },
        label: {
          show: true,
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: 35, // 三维笛卡尔坐标系在三维场景中的高度
          viewControl: {
            alpha: 35,
            beta: 40,
            distance: 500, //调整视角到主体的距离，类似调整zoom
            rotateSensitivity: 0, // 设置为0无法旋转
            zoomSensitivity: 0, // 设置为0无法缩放
            panSensitivity: 0, // 设置为0无法平移
            autoRotate: false, // 自动旋转
          },
        },
        series: series,
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
