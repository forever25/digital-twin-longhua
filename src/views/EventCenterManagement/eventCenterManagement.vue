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
      eventCenter: globalConfig.eventCenter,
      heatMap1CententCentxt: [],
    };
  },
  mounted() {
    this.heatmap();
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

    createHeatMap(max, data) {
      // 创建元素
      var heatDoc = document.createElement("div");
      heatDoc.setAttribute(
        "style",
        "width:1000px;height:1000px;margin: 0px;display: none;"
      );
      document.body.appendChild(heatDoc);
      // 创建热力图对象
      var heatmap = h337.create({
        container: heatDoc,
        radius: 20,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
        gradient: {
          0.9: "red",
          0.8: "orange",
          0.7: "yellow",
          0.5: "blue",
          0.3: "green",
        },
      });
      // 添加数据
      heatmap.setData({
        max: max,
        data: data,
      });
      return heatmap;
    },
    // 生成len个随机数据
    getData1(len) {
      //构建一些随机数据点
      var points = [];
      var max = 0;
      var width = 1000;
      var height = 1000;
      while (len--) {
        var val = Math.floor(Math.random() * 1000);
        max = Math.max(max, val);
        var point = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
          value: val,
        };
        points.push(point);
      }
      return { max: max, data: points };
    },
    // 生成len个随机数据
    getData() {
      var points = [];
      // 初始化值让其最小
      let centxt = [180, 90, 0, 0]; // minx miny maxx maxy
      let max = 0;
      const width = 1000,
        height = 1000;
        // 计算范围
      this.eventCenter.forEach((it) => {
        // 生成坐标位置
        centxt = [
          it.lon < centxt[0] ? it.lon : centxt[0],
          it.lat < centxt[1] ? it.lat : centxt[1],
          it.lon > centxt[2] ? it.lon : centxt[2],
          it.lat > centxt[3] ? it.lat : centxt[3],
        ];
      });
      // 计算坐标
      const differenceX = centxt[2] - centxt[0];
      const differenceY = centxt[3] - centxt[1];
      this.eventCenter.forEach((it) => {
        var val = Math.floor(Math.random() * 10);
        max = Math.max(max, val);
        var point = {
          x: ((centxt[2] - it.lon) / differenceX) * width,
          y: ((centxt[3] - it.lat) / differenceY) * height,
          value: val,
        };

        points.push(point);
      });
      //构建一些随机数据点
      this.heatMap1CententCentxt = centxt;
      return { max: max, data: points };
    },
    heatmap() {
      // const data = this.getData1(1000);
      const data = this.getData();
      // 第一个热力图
      var coordinate1 = this.heatMap1CententCentxt;
      // var coordinate1 = globalConfig.heatMap1Centent.centxt;
      var heatMap1 = this.createHeatMap(data.max, data.data);
      this.createRectangle(window.cesiumMap.getEarth(), coordinate1, heatMap1);

      // window.cesiumMap.flyTo(...globalConfig.heatMap1Centent.center);
    },
    // 创建正方形 绑定热力图
    createRectangle(viewer, coordinate, heatMap) {
      // console.log(heatMap._renderer.canvas.toDataURL("image/png"));
      viewer.entities.add({
        id: "uniqueId",
        name: "Rotating rectangle with rotating texture coordinate",
        show: true,
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(
            coordinate[0],
            coordinate[1],
            coordinate[2],
            coordinate[3]
          ),
          material: heatMap._renderer.canvas, // 核心语句，填充热力图
        },
      });
    },
    // 清除热力图
    clearHeatMap() {
      if (window.cesiumMap.getEarth().entities.getById("uniqueId")) {
        window.cesiumMap.getEarth().entities.removeById("uniqueId");
      }
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
  },
  beforeDestroy() {
    this.clearHeatMap();
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="left-panel">
      <div class="left-top-panel">
        <div class="title">岗亭介绍</div>
        <div class="content">
          <Todaypatrol v-on="$listeners"></Todaypatrol>
        </div>
      </div>
      <div class="left-bottom-panel">
        <div class="title">事件统计</div>
        <div class="content">
          <EventStatic></EventStatic>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="right-top-panel">
        <div class="title">事件中心</div>
        <div class="content">
          <FireEvent
            v-on="$listeners"
            @fireEventDetailClick="fireEventDetailClick"
            @addFirePoint="addFirePoint"
          ></FireEvent>
        </div>
      </div>
      <div class="right-bottom-panel">
        <div class="title">事件详情</div>
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
