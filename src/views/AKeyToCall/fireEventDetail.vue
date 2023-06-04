/**
 *@author: ljj
 *@Date: 2021-09-16 16:10:00
 *@description: 火情详情
*/
<script>
export default {
  name: "FireEventDetail",
  props: {
    fireEventId: {
      type: String,
      default: "",
    },
    fireEventData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      nowFireEvent: {},
      fireDetailList: [
        {
          id: "10001",
          name: "海湖小区1单元1-211室着火",
          reson: "插线板进水短路，引发火灾。",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10001.jpg"),
          location: [
            "100.99829191344652",
            "36.899105029543385",
            "3022.1692330778515",
          ],
        },
        {
          id: "10002",
          name: "海湖小区2单元2-502室煤气泄漏",
          reson: "天然气灶管道老化破损导致天燃气泄漏！无人员伤亡",
          arriveTime: "5分钟",
          loss: "无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10002.jpg"),
          location: [
            "100.99934531571091",
            "36.89962331820922",
            "3021.5692954974643",
          ],
        },
        {
          id: "10003",
          name: "海湖小区3单元3-1102室煤气泄漏",
          reson: "天然气灶管道老化破损导致天燃气泄漏！无人员伤亡",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10002.jpg"),
          location: [
            "100.99798108758938",
            "36.897610615060245",
            "3019.907184067197",
          ],
        },
        {
          id: "10004",
          name: "海湖小区6单元1-102室煤气泄漏",
          reson: "天然气灶管道老化破损导致天燃气泄漏！无人员伤亡",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10002.jpg"),
          location: [
            "100.99829191344652",
            "36.899105029543385",
            "3022.1692330778515",
          ],
        },
        {
          id: "10005",
          name: "海湖小区1单元1-502室煤气着火",
          reson: "插线板进水短路，引发火灾。",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10001.jpg"),
          location: [
            "100.99934531571091",
            "36.89962331820922",
            "3021.5692954974643",
          ],
        },
        {
          id: "10006",
          name: "海湖小区2单元1-311室煤气着火",
          reson: "插线板进水短路，引发火灾。",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10001.jpg"),
          location: [
            "100.99798108758938",
            "36.897610615060245",
            "3019.907184067197",
          ],
        },
        {
          id: "10007",
          name: "海湖小区1单元1-502室煤气泄漏",
          reson: "天然气灶管道老化破损导致天燃气泄漏！无人员伤亡",
          arriveTime: "5分钟",
          loss: "无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10002.jpg"),
          location: [
            "100.99829191344652",
            "36.899105029543385",
            "3022.1692330778515",
          ],
        },
        {
          id: "10008",
          name: "海湖小区1单元1-302室煤气着火",
          reson: "插线板进水短路，引发火灾。",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10001.jpg"),
          location: [
            "100.99934531571091",
            "36.89962331820922",
            "3021.5692954974643",
          ],
        },
        {
          id: "10009",
          name: "海湖小区1单元2-1302室煤气泄漏",
          reson: "插线板进水短路，引发火灾。",
          arriveTime: "5分钟",
          loss: "房屋内部受损严重，屋内财产全部损失，部分外墙损毁！无人员伤亡！",
          appraiser: "张勇",
          src: require("../../../public/img/fire/fire10002.jpg"),
          location: [
            "100.99829191344652",
            "36.899105029543385",
            "3022.1692330778515",
          ],
        },
      ],
      imgList: [],
      fireData: [
        {
          src: require("../../../public/img/fire/fire-point.png"),
          desc: "着火点",
        },
        { src: require("../../../public/img/fire/line.png"), desc: "救援路线" },
        {
          src: require("../../../public/img/fire/fire-hydrant.png"),
          desc: "周边消防设施",
        },
      ],
    };
  },
  watch: {
    fireEventData: {
      handler(newValue, oldValue) {
        this.nowFireEvent = this.fireEventData;
      },
      deep: true,
    },
  },
  mounted() {
    this.nowFireEvent = this.fireDetailList[0];
  },
  methods: {
    addFeature(item) {
      if (item.desc == "着火点") {
        this.$emit("addFirePoint", this.nowFireEvent.location);
      }
      if (item.desc == "救援路线") {
        this.$emit("addFireLine", this.nowFireEvent.id);
      }
      if (item.desc == "周边消防设施") {
        this.$emit("addFireFacility", this.nowFireEvent.id);
      }
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <p class="community-desc">{{ nowFireEvent.name }}</p>
    <div class="center-panel">
      <div class="left-panel">
        <img
          :src="
            require(`@/assets/event-center/old man${Math.ceil(
              Math.random() * 3
            )}.jpg`)
          "
          alt=""
        />
      </div>
      <div class="right-panel">
        <div>事件类型：{{ nowFireEvent.type }}</div>
        <div>事件发生时间：{{ nowFireEvent.time }}</div>
        <div>事件发生地点：{{ nowFireEvent.address }}</div>
        <div>到达现场用时：{{ Math.ceil(Math.random() * 4) }}分钟</div>
        <div>完成状态：{{ nowFireEvent.status }}</div>
      </div>
      <div class="bottom-panel">
        <!-- <div
          v-for="(item, index) in fireData"
          :key="index"
          @click="addFeature(item)"
        >
          <img :src="item.src" alt="" />
          <p class="desc">
            {{ item.desc }}
          </p>
        </div> -->
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 #1fa6d4;
  border: 1px solid #1fa6d4;
  .community-desc {
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ff5150;
    padding-left: 10px;
    box-sizing: border-box;
    padding: 5px 15px;
    line-height: 30px;
  }
  .center-panel {
    height: calc(~"100% - 40px");
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .left-panel {
      width: 48%;
      height: 55%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .right-panel {
      width: 48%;
      height: 55%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      div {
        width: 100%;
        text-align: left;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        display: block;
        flex-shrink: 0;
      }
    }
    .bottom-panel {
      height: 35%;
      width: 98%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      div {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        img {
          height: 80%;
        }
        p {
          height: 20%;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
