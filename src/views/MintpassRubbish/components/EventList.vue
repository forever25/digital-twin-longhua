<!--
 * @Author: ZWS
 * @Date: 2022-03-17 14:10:30
 * @LastEditTime: 2022-03-18 19:02:02
 * @Description: 单车事件列表
-->
<script>
import VueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "FireEvent",
  components: { VueSeamlessScroll },
  props: {
    rubbishEventList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [],
      modal12: false,
      curData: {},
      random: 80,
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
  created() {},
  watch: {
    rubbishEventList() {
      this.data.push(...this.rubbishEventList);
    },
  },
  mounted() {},
  methods: {
    fireEventClick(data) {
      this.curData = data;
      this.modal12 = true;
      this.random = Math.ceil(Math.random() * 20) + 60;
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="top">
      <div class="event-name">编号</div>
      <div class="event-time">类型</div>
      <div class="event-time">时间</div>
      <!-- <div class="event-address">地点</div> -->
      <div class="event-line">状态</div>
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
            {{ item.OBJECTID }}
          </div>
          <div class="event-time-content">
            {{ item.status }}
          </div>
          <div class="event-time-content">
            {{ item.time }}
          </div>
          <div class="event-time-content">
            {{ Math.random() > 0.5 ? "已处理" : "未处理" }}
          </div>
          <div class="event-line-content">
            <div @click="fireEventClick(item)" class="detail">处理</div>
          </div>
        </div>
      </VueSeamlessScroll>
    </div>
    <Modal
      v-model="modal12"
      draggable
      scrollable
      :mask="false"
      footer-hide
      title="一键处理"
    >
      <ul class="wrap">
        <li class="item">
          <img
            class="img"
            :src="
              require(`@/assets/mintpass-rubbish/ljtxc${Math.ceil(
                Math.random() * 3
              )}.jpg`)
            "
            alt=""
          />
        </li>
        <li class="item">
          <div>
            <span class="title">事件类型：</span
            ><span class="content">视频分析>市容环境>民乐</span>
          </div>
          <div>
            <span class="title">行政区划：</span
            ><span class="content">民治街道>民乐社区>民乐47</span>
          </div>
          <div>
            <span class="title">场所地址：</span
            ><span class="content">民乐老村{{ random }}栋外</span>
          </div>
          <div>
            <span class="title">事件描述：</span
            ><span class="content">民乐老村{{ random }}栋外暴露垃圾</span>
          </div>
          <div>
            <span class="title">事项来源：</span
            ><span class="content">视频采集</span>
          </div>
          <Button type="primary" class="button" @click="modal12 = false"
            >一键发送</Button
          >
        </li>
      </ul>
    </Modal>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  width: 100%;
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
      height: 28.6vh;
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
/deep/.ivu-modal {
  color: #fff;
  .ivu-modal-header {
    border: none;
  }
  .ivu-modal-header-inner {
    color: #fff;
  }
  .ivu-modal-content {
    background-color: transparent;
    background-image: url("../../../assets/bilke-sharing/left-top-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .wrap {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    li.item {
      width: 50%;
      & > .img {
        width: 244px;
        height: auto;
      }
      &:nth-child(2) {
        position: relative;
        padding: 12px;
        .button {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      }
    }
  }
}
</style>
