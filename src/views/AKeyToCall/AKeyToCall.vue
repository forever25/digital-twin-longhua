/**
 *@author: ljj
 *@Date: 2021-09-15 14:27:53
 *@description: 事件中心页面
*/
<script>
import Todaypatrol from "./todayPatrol.vue";
import EventStatic from "./eventStatic.vue";
import FireEvent from "./fireEvent.vue";
import FireEventDetail from "./fireEventDetail.vue";

export default {
  name: "EventCenterManagement",
  components: {
    Todaypatrol,
    EventStatic,
    FireEvent,
    FireEventDetail,
  },
  data() {
    return {
      fireEventId: "",
      fireEventData: null,
    };
  },
  mounted() {
    this.addAKeyToCall();
  },
  methods: {
    /**
     *@author: ljj
     *@Date: 2021-09-17 09:10:09
     *@description: 火情详情点击事件
     */
    fireEventDetailClick(fireEventData) {
      // this.fireEventId = id;
      this.fireEventData = fireEventData;
      // this.$emit("removeAllMaker");
    },
    /**
     *@author: ljj
     *@Date: 2021-09-17 10:45:21
     *@description: 着火点点击事件
     */
    addFirePoint(data) {
      this.$emit("addFirePoint", data);
    },
    /**
     *@author: ljj
     *@Date: 2021-09-17 17:32:30
     *@description: 添加救援路线
     */
    addFireLine(id) {
      this.$emit("addFireLine", id);
    },
    /**
     *@author: ljj
     *@Date: 2021-09-18 10:00:19
     *@description: 添加消防设施
     */
    addFireFacility(id) {
      this.$emit("addFireFacility", id);
    },
    // 添加呼叫
    addAKeyToCall() {
      if (window.walkFly) {
        window.walkFly.clear();
      }

      const imgUrl = {
        正常: require("@/assets/mintpass-rubbish/call-w.png"),
        预警: require("@/assets/mintpass-rubbish/call-s.png"),
      };

      if (globalConfig.AKeyToCall.length > 0) {
        //添加三维坐标
        globalConfig.AKeyToCall.map((item, index) => {
          if (window.cesiumMap && window.cesiumMap.pointMark) {
            var ss = document.getElementsByClassName(
              ".earthview-popup .earthview-popup-head img"
            );
            if (ss && ss.length > 0) {
              ss.trigger("click");
            }

            window.cesiumMap.pointMark
              .addMassiveMark(
                [
                  {
                    id: item.id,
                    url: imgUrl[item.warning ? "正常" : "预警"],
                    lon: item.lon,
                    lat: item.lat,
                    height: 100,
                    width: 40,
                    altitude: parseFloat(item.alt) + 20, //和图片的高度有关系
                    // label: item.name,
                    // font: "16px 微软雅黑",
                    pixelOffset: new Cesium.Cartesian2(
                      (-15 * item.name.length) / 2,
                      -80
                    ),
                  },
                ],
                "AKeyToCall"
              )
              .bindPopup(
                {
                  popHeight: 300,
                  popWidth: 400,
                  doQuery4Content: (id) => {
                    let temp = globalConfig.AKeyToCall.find((one) => {
                      return one.id == id;
                    });
                    if (temp) {
                      let content = `<iframe width="100%" height="100%" frameborder=0 src="./HeartRate?id=${temp.id}"></iframe>`;
                      return {
                        head: temp.name + "-生命体征信息",
                        body: content,
                      };
                    }
                  },
                },
                "AKeyToCall"
              );
          }
        });
      }
    },
    // 清除垃
    clearAKeyToCall() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      try {
        window.cesiumMap.pointMark.removeMassiveMark("AKeyToCall");
      } catch (e) {}
    },
  },
  beforeDestroy() {
    this.clearAKeyToCall();
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="left-panel">
      <div class="left-top-panel">
        <div class="title">预警值班人员</div>
        <div class="content">
          <Todaypatrol></Todaypatrol>
        </div>
      </div>
      <div class="left-bottom-panel">
        <div class="title">预警统计</div>
        <div class="content">
          <EventStatic></EventStatic>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="right-top-panel">
        <div class="title">预警列表</div>
        <div class="content">
          <FireEvent
            v-on="$listeners"
            @fireEventDetailClick="fireEventDetailClick"
            @addFirePoint="addFirePoint"
          ></FireEvent>
        </div>
      </div>
      <div class="right-bottom-panel">
        <div class="title">预警详情</div>
        <div class="content">
          <FireEventDetail
            :fireEventData="fireEventData"
            @addFirePoint="addFirePoint"
            @addFireLine="addFireLine"
            @addFireFacility="addFireFacility"
          ></FireEventDetail>
        </div>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/common1.less";
</style>
