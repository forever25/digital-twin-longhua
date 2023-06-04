/**
 *@author: ljj
 *@Date: 2022-03-15 10:09:40
 *@description: 车辆Echarts图
*/
<script>
export default {
  name: "CarStatisticsCharts",
  props: {
    carInfo: {
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
      const seriesData = [];
      const nameList = [
        { name: "健康监测", value: 1 },
        { name: "紧急救助", value: 3 },
        { name: "主动关怀", value: 10 },
        { name: "走失定位", value: 8 },
      ];
      nameList.forEach((item, i) => {
        seriesData.push({
          value: item.value,
          show: true,
          name: item.text,
        });
      });
      let option = {
        title: {
          text: "事件来源",
          textStyle: {
            color: "#fff",
            fontSize: this.getFontSize(),
            fontWeight: "100",
          },
          left: "center",
          bottom: "10%",
        },
        tooltip: {
          formatter: (item) => {
            return `${item.marker}${item.name}: ${item.value}`;
          },
        },
        backgroundColor: "transparent",
        color: ["#00D8F7", "#2490ff", "#30f3e3"],
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["40%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
            },

            label: {
              show: true,
              position: "outer",
              alignTo: "edge",
              margin: 10,
              textStyle: {
                rich: {
                  name: {
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "#inherit",
                    padding: [10, 0],
                  },
                  val: {
                    fontSize: 16,
                    fontWeight: "bolder",
                    color: "inherit",
                  },
                },
              },
              formatter: (item) => {
                // console.log(item)
                return `{val|${item.value}}\n{name|${item.name}}`;
              },
            },

            labelLine: {
              show: true,
              normal: {
                length: 5,
                length2: 5,
                lineStyle: {
                  color: "#337AFC",
                },
              },
            },
            data: seriesData,
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
