/**
 *@author: ljj
 *@Date: 2021-09-10 09:14:12
 *@description: 通道管理页面
*/
<script>
import GarageList from "./garageList.vue";
import GarageDetail from "./garageDetail.vue";
import GarageRecord from "./garageRecord.vue";
import GarageOverview from "./garageOverview.vue";
export default {
  name: "GarageManagement",
  components: { GarageList, GarageDetail, GarageRecord, GarageOverview },
  data() {
    return {};
  },
  mounted() {
    this.addM();
  },
  methods: {
    addM() {
      if (globalConfig.MonitoringPoint.length > 0) {
        globalConfig.MonitoringPoint.map((item) => {
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
                    id: item.OBJID,
                    url: item.status === '正常' ? "/img/monitor.png" : "/img/monitor-w.png",
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
                    // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    // verticalOrigin: Cesium.VerticalOrigin.TOP,
                  },
                ],
                "monitorInfo"
              )
              .bindPopup(
                {
                  popHeight: 380,
                  popWidth: 600,
                  doQuery4Content: (id) => {
                    let temp = globalConfig.MonitoringPoint.filter((one) => {
                      return one.OBJID == id;
                    });
                    if (temp && temp.length > 0) {
                      item = temp[0];
                      let content = `<iframe width="100%" height="100%" frameborder=0 src="./Monitor?id=${item.id}"></iframe>`;
                      return {
                        head: item.name + "-实时监控",
                        body: content,
                      };
                    }
                  },
                },
                "monitorInfo"
              );
          }
        });
      }
    },
    // 清除垃圾桶
    clearMintpassRubbish() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      try {
        window.cesiumMap.pointMark.removeMassiveMark("monitorInfo");
      } catch (e) {}
    },
  },
  beforeDestroy() {
    this.clearMintpassRubbish();
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="left-panel">
      <div class="left-top-panel">
        <div class="title">通道概览</div>
        <div class="content">
          <GarageOverview> </GarageOverview>
        </div>
      </div>
      <div class="left-bottom-panel">
        <div class="title">通道列表</div>
        <div class="content">
          <GarageList v-on="$listeners"></GarageList>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="right-top-panel">
        <div class="title">预警记录</div>
        <div class="content">
          <GarageRecord></GarageRecord>
        </div>
      </div>
      <div class="right-bottom-panel">
        <div class="title">通道详情</div>
        <div class="content">
          <GarageDetail></GarageDetail>
        </div>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/common1.less";
</style>
