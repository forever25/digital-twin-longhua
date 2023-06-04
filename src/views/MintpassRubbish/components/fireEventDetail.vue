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
    trackDetails: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      nowFireEvent: {},
      imgList: [],
      random: 50,
      random2: 1,
    };
  },
  watch: {
    trackDetails: {
      handler(newValue, oldValue) {
        this.nowFireEvent = this.trackDetails;
        this.fireEventClick();
      },
      deep: true,
    },
  },
  mounted() {
    this.nowFireEvent = window.globalConfig.MintpassRubbish[0]
  },
  methods: {
    fireEventClick() {
      this.random = Math.ceil(Math.random() * 20) + 60;
      this.random2 = Math.ceil(Math.random() * 2);
    },
  },
};
</script>

<template>
  <Row class="main-panel">
    <p class="community-desc"></p>
    <div class="center-panel">
      <div class="left-panel">
        <img
          class="video-panel"
          :src="require(`@/assets/mintpass-rubbish/ljt${random2}.jpg`)"
        />
      </div>
      <div class="right-panel">
        <div>垃圾桶名称：{{ nowFireEvent.name }}</div>
        <div>编号：{{ nowFireEvent.OBJECTID }}</div>
        <div>所属社区：{{ nowFireEvent.SQNAME }}</div>
        <div>所在位置：{{ nowFireEvent.WZMS }}</div>
        <div>所属单位：{{ nowFireEvent.DEPTNAME3 }}</div>
        <div>使用情况：{{ nowFireEvent.USESTATE }}</div>
        <div>设备类别：{{ nowFireEvent.OBJNAME }}</div>
        <div>设备状态：{{ nowFireEvent.status }}</div>
      </div>
      <!-- <div class="bottom-panel"> -->
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
      <!-- </div> -->
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;

  .video-panel {
    width: 100%;
    height: 100%;
  }
  video {
    object-fit: fill;
  }
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
    height: calc(~"100%-20px");
    width: 100%;
    // display: flex;
    // justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .left-panel {
      width: 100%;
      height: 30%;
      text-align: center;
      img {
        height: 100%;
        width: auto;
      }
    }
    .right-panel {
      width: 100%;
      height: 55%;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // flex-wrap: wrap;
      div {
        width: 100%;
        text-align: left;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        // line-height: 20px;
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
