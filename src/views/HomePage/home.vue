<script>
import PersonTypeCharts from "@/components/echarts/personTypeCharts.vue";
import PersonTypeChartsTwo from "@/components/echarts/personTypeChartsTwo.vue";
import BuildingCharts from "@/components/echarts/buildingCharts.vue";
import PersonStatisticsCharts from "@/components/echarts/personStatisticsCharts.vue";
import CarStatistics from "@/components/echarts/carStatistics.vue";
import EventStatistics from "@/components/echarts/eventStatistics.vue";
import CarStatistics3D from "@/components/echarts/carStatistics3D.vue";
import PersonStatisticsChartsTow from "@/components/echarts/personStatisticsChartsTow.vue";
import EventList from "./eventList.vue";
export default {
  name: "Home",
  components: {
    PersonTypeCharts,
    PersonTypeChartsTwo,
    BuildingCharts,
    EventList,
    PersonStatisticsCharts,
    CarStatistics,
    EventStatistics,
    CarStatistics3D,
    PersonStatisticsChartsTow,
  },
  data() {
    return {
      universityDesc: "",
      clip: 0, //文字裁剪数
      lineHeight: 0, //行高
    };
  },
  methods: {
    /**
     *@author: ljj
     *@Date: 2022-01-25 16:25:42
     *@description: 获取屏幕尺寸
     */
    getWindowSize() {
      this.scroll = false;
      if (document.body.clientWidth >= 1920) {
        this.clip = 88;
        this.lineHeight = "18px";
      } else if (document.body.clientWidth >= 1680) {
        this.clip = 88;
        this.lineHeight = "18px";
      } else if (document.body.clientWidth >= 1600) {
        this.clip = 72;
        this.lineHeight = "18px";
      } else if (document.body.clientWidth >= 1440) {
        this.clip = 72;
        this.lineHeight = "18px";
      } else if (document.body.clientWidth >= 1400) {
        this.clip = 94;
        this.lineHeight = "18px";
      } else {
        this.clip = 50;
        this.lineHeight = "18px";
        this.scroll = true;
      }
    },
  },
  mounted() {
    this.universityDesc = globalConfig.whdxDesc;
    this.getWindowSize();
    window.onresize = () => {
      this.getWindowSize();
    };
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="left_panel">
      <div class="left_panel_top">
        <p class="title">
          <img src="../../../public/img/title/campus.png" alt="" />
          龙华区介绍
        </p>
        <div class="desc">
          <img src="../../../public/img/whdx.jpg" alt="" />
          <p :style="{ lineHeight: lineHeight }">
            {{ universityDesc.substring(0, clip) }}
          </p>
          <p class="more_introduce">{{ universityDesc.substring(clip) }}</p>
        </div>
      </div>
      <div class="left_center_panel">
        <p class="title">
          <img src="../../../public/img/title/person-type.png" alt="" />
          人员统计
        </p>
        <div class="content">
          <div class="content_panel">
            <div class="charts">
              <PersonTypeCharts></PersonTypeCharts>
            </div>
          </div>
          <div class="content_panel">
            <div class="charts">
              <PersonTypeChartsTwo></PersonTypeChartsTwo>
            </div>
          </div>
        </div>
      </div>
      <div class="left_bottom_panel">
        <p class="title">
          <img src="../../../public/img/title/building.png" alt="" />
          人口统计
        </p>
        <div class="charts">
          <BuildingCharts></BuildingCharts>
        </div>
      </div>
    </div>
    <div class="right_panel">
      <div class="left_panel_top">
        <p class="title">
          <img src="../../../public/img/title/person-statistics.png" alt="" />
          公共统计
        </p>
        <div class="content">
          <div class="content_panel">
            <div class="charts">
              <PersonStatisticsCharts></PersonStatisticsCharts>
            </div>
          </div>
          <div class="content_panel">
            <div class="charts">
              <CarStatistics3D></CarStatistics3D>
            </div>
          </div>
        </div>
      </div>
      <div class="left_center_panel">
        <p class="title">
          <img src="../../../public/img/title/car.png" alt="" />
          一键呼叫统计
        </p>
        <div class="content">
          <div class="content_panel">
            <div class="charts">
              <CarStatistics></CarStatistics>
            </div>
          </div>
          <div class="content_panel">
            <div class="charts">
              <PersonStatisticsChartsTow></PersonStatisticsChartsTow>
            </div>
          </div>
        </div>
      </div>
      <div class="left_bottom_panel">
        <p class="title">
          <img src="../../../public/img/title/event-statistics.png" alt="" />
          事件统计
        </p>
        <div class="content">
          <div class="content_left">
            <div class="detail">
              <img src="../../../public/img/event-total.png" alt="" />
              <p>1009<span>总事件</span></p>
            </div>
            <div class="detail">
              <img src="../../../public/img/event-today.png" alt="" />
              <p>21<span>今日事件</span></p>
            </div>
            <div class="detail">
              <img src="../../../public/img/event-today.png" alt="" />
              <p>19<span>已完成</span></p>
            </div>
          </div>
          <div class="content_right">
            <EventStatistics></EventStatistics>
          </div>
        </div>
      </div>
    </div>
    <div class="center_bottom_panel">
      <p class="long_title">
        <img src="../../../public/img/title/event-center.png" alt="" />
        事件列表
      </p>
      <div class="content">
        <EventList></EventList>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .left_panel,
  .right_panel {
    height: 100%;
    width: 430px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    &_top,
    .left_center_panel {
      height: 27%;
      width: 100%;
      background: url("../../../public/img/left-top-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding: 10px;
      box-sizing: border-box;
      .desc {
        width: 100%;
        height: calc(~"100% - 30px");
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 5px;
        img {
          height: 50%;
          width: 35%;
          display: block;
          padding: 5px;
        }
        p {
          height: 50%;
          width: 65%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #e9e9e9;
        }
        .more_introduce {
          height: 50%;
          width: 100%;
          overflow: scroll;
        }
      }
      .content {
        width: 100%;
        height: calc(~"100% - 30px");
        display: flex;
        justify-content: center;
        align-items: center;
        &_panel {
          width: 100%;
          height: 100%;
          .charts {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .left_bottom_panel {
      height: 40%;
      width: 100%;
      background: url("../../../public/img/left-bottom-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      padding: 20px;
      .charts {
        height: calc(~"100% - 30px");
        width: 100%;
      }
      .content {
        height: calc(~"100% - 30px");
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &_left {
          width: 30%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
          .detail {
            height: 30%;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          img {
            display: block;
            height: 42px;
            width: 50p;
          }
          p {
            text-align: center;
            font-size: 24px;
            font-family: Agency FB;
            font-weight: bold;
            color: #3affe4;
            span {
              display: block;
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #ffffff;
            }
          }
        }
        &_right {
          width: 70%;
          height: 100%;
        }
      }
    }
  }
  .title {
    font-size: 14px;
    height: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    background: url("../../../public/img/title-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 0 10px;
    img {
      height: 16px;
      width: 16px;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 3px;
    }
  }
  .center_bottom_panel {
    width: calc(~"100% - 880px");
    height: 40%;
    position: absolute;
    left: 440px;
    bottom: 0;
    background: red;
    z-index: 10;
    background: url("../../../public/img/center-bottom-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 20px 10px;
    box-sizing: border-box;
    .long_title {
      height: 30px;
      width: 100%;
      background: url("../../../public/img/long-title-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      line-height: 30px;
      padding: 0 10px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      img {
        height: 16px;
        width: 16px;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
    .content {
      height: calc(~"100% - 30px");
      width: 100%;
    }
  }
  .right_panel {
    left: unset;
    right: 0;
    top: 0;
  }
}
</style>

