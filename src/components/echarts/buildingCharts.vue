/**
 *@author: ljj
 *@Date: 2022-03-14 10:37:42
 *@description: 楼栋统计Echarts图
*/
<script>
export default {
  name: "PersonTypeCharts",
  props: {
    personTypeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
    window.addEventListener("resize", () => {
      this.chart.resize();
    });
  },
  methods: {
    initCharts() {
      var color = [
        "#4DCBFF",
        "#03BDA0",
        "#F7EC3D",
        "#FF7714",
        "#FB497C",
        "#114C90",
        "#00BFA5",
      ];
      let data = [
        { value: 30.03, name: "观湖街道" },
        { value: 68.36, name: "民治街道" },
        { value: 44.81, name: "龙华街道" },
        { value: 32.2, name: "大浪街道" },
        { value: 41.36, name: "福城街道" },
        { value: 34.37, name: "观澜街道" },
      ];
      let option = {
        color: color,
        legend: {
          top: "10%",
          right: "6",
          orient: "vertical",
          borderRadius: 0,
          itemGap: 20,
          textStyle: {
            lineHeight: 14,
            rich: {
              name: {
                color: "#fff",
                fontSize: this.getFontSize(),
              },
              value: {
                color: "#999999",
                fontSize: this.getFontSize(),
              },
            },
          },
          formatter: (item) => {
            for (let i = 0; i < data.length; i++) {
              if (item == data[i].name) {
                return `{name|${data[i].name}：}{value| ${data[i].value}万人}`;
              }
            }
          },
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ["20%", "70%"],
            center: ["30%", "45%"],
            roseType: "area",
            startAngle: "270",
            label: {
              show: false,
            },
            itemStyle: {
              // borderRadius: 8,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowOffsetX: 1,
              shadowOffsetY: -1,
              shadowBlur: 1,
            },
            data: data,
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
      } else if (
        document.body.offsetWidth < 1920 &&
        document.body.offsetWidth >= 1366
      ) {
        return 12;
      } else {
        return 12;
      }
    },

    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    getCirlPoint(x0, y0, r, angle) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1,
      };
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div ref="personCharts" class="person-charts"></div>
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
