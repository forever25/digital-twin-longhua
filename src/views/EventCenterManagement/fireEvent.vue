/**
 *@author: ljj
 *@Date: 2021-09-16 10:26:20
 *@description: 火情事件
*/
<script>
import VueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "FireEvent",
  components: { VueSeamlessScroll },
  data() {
    return {
      data: globalConfig.eventCenter,
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: this.data.length > 9 ? this.data.length : 9, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  created() {
    this.$emit("fireEventDetailClick", globalConfig.eventCenter[0]);
  },
  mounted() {},
  beforeDestroy() {
    window.cesiumMap.pointMark.removeMassiveMark("eventList");
  },
  methods: {
    /**
     *@author: ljj
     *@Date: 2021-09-16 15:53:13
     *@description: 火情点击事件
     */
    fireEventClick(i) {
      this.$emit("fireEventDetailClick", i);
      this.$emit("flyToBike", i);
      this.addPoint(i);
    },
    addPoint(item) {
      window.cesiumMap.pointMark.removeMassiveMark("eventList");
      window.cesiumMap.pointMark
        .addMassiveMark(
          [
            {
              id: item.id,
              url: "/img/xinghu.png",
              lon: item.lon,
              lat: item.lat,
              height: 100,
              width: 40,
              altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
              // label: item.name,
              font: "16px 微软雅黑",
              // pixelOffset: new Cesium.Cartesian2(
              //   (-15 * item.name.length) / 2,
              //   -80
              // ),
            },
          ],
          "eventList"
        )
        .bindPopup(
          {
            popHeight: 220,
            popWidth: 400,
            doQuery4Content: (id) => {
              let temp = globalConfig.eventCenter.find((one) => {
                return one.id == id;
              });
              sessionStorage.setItem('BikeDetailTree',JSON.stringify(temp))
              if (temp) {
                let content = `<iframe width="100%" height="100%" frameborder=0 src="./BikeDetailTree?id=${temp.id}"></iframe>`;
                return {
                  head: temp.type + "详情",
                  body: content,
                };
              }
            },
          },
          "eventList"
        );
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="top">
      <div class="event-name">事件类型</div>
      <div class="event-time">事件性质</div>
      <div class="event-address">地点</div>
      <div class="event-line">操作</div>
    </div>
    <div class="bottom">
      <VueSeamlessScroll
        v-if="data.length > 0"
        :data="data"
        :class-option="classOption"
        class="seamless-warp"
      >
        <div v-for="(item, index) in data" :key="index" class="content">
          <div class="event-name-content">
            {{ item.type }}
          </div>
          <div class="event-time-content">
            {{ item.nature }}
          </div>
          <div class="event-address-content">
            {{ item.address }}
          </div>
          <div class="event-line-content">
            <div @click="fireEventClick(item)" class="detail">详情</div>
          </div>
        </div>
      </VueSeamlessScroll>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 #1fa6d4;
  border: 1px solid #1fa6d4;
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
      flex: 1;
      padding-left: 4px;
      height: 100%;
    }
    .event-time {
      flex: 1;
      height: 100%;
    }
    .event-address {
      flex: 4;
      height: 100%;
    }
    .event-line {
      flex: 1;
      height: 100%;
    }
  }
  .bottom {
    width: 100%;
    height: calc(~"100% - 55px");
    margin-bottom: 10px;
    .seamless-warp {
      width: 100%;
      height: 100%;
      overflow: hidden;
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
          padding-left: 2px;
          flex: 1;
          height: 100%;
          color: #2aa2ff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-time-content {
          flex: 1;
          height: 100%;
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-address-content {
          flex: 4;
          height: 100%;
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .event-line-content {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .detail {
            height: 80%;
            width: 60%;
            padding: 5px;
            border: 1px solid#ff5150;
            line-height: 100%;
            color: #ff5150;
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
/deep/.ivu-btn-primary {
  background-color: transparent;
  border: 1px solid #fff;
}
/deep/.ivu-btn,
.ivu-btn-primary {
  border: 1px solid #ff5150;
  color: #ff5150;
  font-size: 12px;
}
</style>
