/**
 *@author: ljj
 *@Date: 2022-03-14 10:37:42
 *@description: 人员类型echarts图
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
      let color = ["#EF4882", "#FF8C34", "#00E3FF", "#0aa75b", "#0a7fb3"];
      let data = [
        { name: "青少年", value: 50.28 },
        { name: "中年", value: 188.55 },
        { name: "老年", value: 12.57 },
      ];
      let max = Math.max(...data.map((item) => item.value));
      let sum = eval(data.map((item) => item.value).join("+"));
      let option = {
        backgroundColor: "transparent",
        title: {
          text: "人口年龄分布",
          x: "center",
          bottom: "3%",
          textStyle: {
            color: "#FFFFFF",
            fontSize: this.getFontSize(),
            fontWeight: "100",
          },
        },
        angleAxis: {
          show: 0,
          clockwise: false,
          max: max + max / 3,
        },
        radiusAxis: {
          type: "category",
          data: data.map((item) => {
            return item.name + ":" + item.value + "万人";
          }),
          z: 10,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "#BBBCBF",
            align: "left",
            margin: -10,
          },
        },
        polar: {
          show: 0,
          center: ["50%", "45%"],
        },
        series: [
          {
            type: "bar",
            data: data.map((item, index) => {
              return {
                value: item.value,
                name: item.name,
                itemStyle: {
                  color: color[index],
                },
              };
            }),
            label: {
              show: false,
              position: "top",
            },
            barWidth: 10,
            coordinateSystem: "polar",
          },
          {
            type: "bar",
            barGap: "-100%",
            z: 0,
            data: data.map((item, index) => {
              return {
                value: max,
                name: "",
                itemStyle: {
                  color: "rgba(36,64,125,.3)",
                },
              };
            }),
            label: {
              show: false,
              position: "top",
            },
            barWidth: 10,
            coordinateSystem: "polar",
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
