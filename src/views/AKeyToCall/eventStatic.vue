/**
 *@author: ljj
 *@Date: 2021-09-15 16:32:48
 *@description: 事件统计页面
*/
<script>
import EventProcessCharts from "./eventProcessCharts.vue";
import eventPerformance from "./eventPerformance";
// import VueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "EventStatic",
  components: {
    EventProcessCharts,
    eventPerformance,
    // VueSeamlessScroll,
  },
  data() {
    return {
      totalEventNum: globalConfig.eventCenter.length,
      //事件记录
      eventList: globalConfig.eventCenter,
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: this.eventList.length > 6 ? this.eventList.length : 6, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  mounted() {},
  methods: {},
};
</script>
<template>
  <Row class="main-panel">
    <!-- <p class="total-event">
      事件总数： <span>{{ totalEventNum }}</span> （个）
    </p> -->
    <div class="process-charts">
      <EventProcessCharts></EventProcessCharts>
    </div>
    <div class="event-desc">
      <eventPerformance></eventPerformance>
    </div>
    <!-- <div class="event-desc">
      <div class="top">
        <div class="event-name">事件类型</div>
        <div class="event-time">性质</div>
        <div class="event-address">地点</div>
         <div class="event-status">状态</div> 
      </div>
      <VueSeamlessScroll
        v-if="eventList.length>0"
        :data="eventList"
        :class-option="classOption"
        class="seamless-warp"
      >
        <div
          v-for="(item,index) in eventList"
          :key="index"
          class="content"
        >
          <div class="event-name-content">{{ item.type }}</div>
          <div class="event-time-content">{{ item.nature }}</div>
          <div class="event-principal-content">{{ item.principal }}</div>
          <div class="event-address-content">{{ item.address }}</div>
          <div
            :class="{notProcess:item.status==0,processing:item.status==1,processed:item.status==2}"
            class="event-status-content"
          >{{ item.status==0?"未处理":item.status==1?"处理中":"已处理" }}</div>
        </div>
      </VueSeamlessScroll>
    </div> -->
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  .total-event {
    width: 100%;
    height: 30px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    span {
      font-size: 16px;
    }
  }
  .process-charts {
    height: calc(~"50% - 30px");
    width: 100%;
  }
  .event-desc {
    height: 50%;
    width: 100%;
    // box-shadow: 0 0 10px 0 #1fa6d4;
    // border: 1px solid #1fa6d4;
    .top {
      width: 100%;
      height: 40px;
      margin-top: 5px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #fff;
      line-height: 40px;
      text-align: center;
      display: flex;
      justify-content: center;
      justify-items: center;
      .event-name {
        flex: 2;
        height: 100%;
      }
      .event-principal {
        flex: 1;
        height: 100%;
      }
      .event-address {
        flex: 2.5;
        height: 100%;
      }
      .event-status {
        flex: 1;
        height: 100%;
      }
      .event-time {
        flex: 1.5;
        height: 100%;
      }
    }
    .seamless-warp {
      overflow: hidden;
      width: 100%;
      height: calc(~"100% - 45px");
      .content {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        justify-items: center;
        .event-name-content {
          color: #2aa2ff;
          flex: 2;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-principal-content {
          flex: 1;
          height: 100%;
          color: #32eedb;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-address-content {
          flex: 2.5;
          height: 100%;
          color: #ffc029;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-status-content {
          flex: 1;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-time-content {
          flex: 1.5;
          height: 100%;
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .notProcess {
          color: #d35036;
        }
        .processing {
          color: #e4db52;
        }
        .processed {
          color: #5afbb3;
        }
      }
    }
  }
}
</style>
