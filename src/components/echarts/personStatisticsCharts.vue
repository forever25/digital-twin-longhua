/**
 *@author: ljj
 *@Date: 2022-03-15 10:09:40
 *@description: 人员统计Echarts图
*/
<script>
export default {
  name: "PersonStatisticsCharts",
  props: {
    personInfo: {
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
      let that = this;
      const seriesData = [];
      const nameList = [
        { text: "正常", value: 10 },
        { text: "异味", value: 4 },
        { text: "溢出", value: 3 },
        { text: "故障", value: 6 },
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
          text: "事件类型",
          textStyle: {
            color: "#fff",
            fontSize: that.getFontSize(),
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
        color: ["#243eff", "#2490ff", "#30f3e3"],
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["40%", "50%"],
            avoidLabelOverlap: false,
            // itemStyle: {
            //     borderRadius: 10,
            // },

            label: {
              show: true,
              color: "#F5F5F7",
              fontSize: 12,
              // },
            },

            labelLine: {
              show: true,
              normal: {
                length: 5,
                length2: 15,
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
