<script>
import Home from "./home";
import { getAllDeviceInfo } from "@/api/monitor.js";
import { getPersonTrajectory } from "@/api/person.js";
import { mapGetters, mapMutations } from "vuex";
import { getNowFormatDate } from "@/api/date.js";
import EventCenterManagement from "../EventCenterManagement/eventCenterManagement";
import GarageManagement from "../GarageManagement/garageManagement";
import BikeSharing from "../BikeSharing/BikeSharing.vue";
import MintpassRubbish from "../MintpassRubbish/MintpassRubbish.vue";
import AKeyToCall from "../AKeyToCall/AKeyToCall.vue";
export default {
  name: "HomePage",
  components: {
    Home,
    EventCenterManagement,
    GarageManagement,
    BikeSharing,
    MintpassRubbish,
    AKeyToCall,
  },
  data() {
    return {
      menuList: [
        {
          name: "首页",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: true,
        },
        {
          name: "消防通道",
          imgSrc: require("../../../public/img/menu/monitor.png"),
          imgCheckedSrc: require("../../../public/img/menu/monitor-checked.png"),
          checked: false,
        },
        {
          name: "垃圾桶",
          imgSrc: require("../../../public/img/menu/data.png"),
          imgCheckedSrc: require("../../../public/img/menu/data-checked.png"),
          checked: false,
        },
        {
          name: "事件中心",
          imgSrc: require("../../../public/img/menu/event-center.png"),
          imgCheckedSrc: require("../../../public/img/menu/event-checked.png"),
          checked: false,
        },
        {
          name: "一键呼叫",
          imgSrc: require("../../../public/img/menu/monitor.png"),
          imgCheckedSrc: require("../../../public/img/menu/monitor-checked.png"),
          checked: false,
        },
      ],
      menuListTwo: [
        {
          name: "视频监控",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: true,
        },
        {
          name: "目标识别",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: false,
        },
        {
          name: "车辆道闸",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: false,
        },
        {
          name: "共享单车",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: false,
        },
        {
          name: "人员管理",
          imgSrc: require("../../../public/img/menu/home.png"),
          imgCheckedSrc: require("../../../public/img/menu/home-checked.png"),
          checked: false,
        },
      ],
      timer: null, //循环定时器
      time: [], //日期
      activeComponent: "Home",
      menuListTow: false,
      homeTitle: globalConfig.projectConfig.title,
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time = getNowFormatDate();
    }, 1000);
  },
  methods: {
    /**
     *@author: ljj
     *@Date: 2022-03-12 13:54:53
     *@description: 一级菜单点击事件
     */
    operation(data) {
      this.menuListTow = false;
      this.menuList.map((item) => {
        data.name == item.name ? (item.checked = true) : (item.checked = false);
      });
      if (data.name == "首页") {
        this.activeComponent = "Home";
      } else if (data.name == "垃圾桶") {
        this.activeComponent = "MintpassRubbish";
      } else if (data.name == "空天感知") {
        this.menuListTow = true;
        this.menuListTwo.map((item) => {
          item.checked = false;
        });
        this.menuListTwo[0].checked = true;
        this.activeComponent = "";
      } else if (data.name == "事件中心") {
        this.activeComponent = "EventCenterManagement";
      } else if (data.name == "消防通道") {
        this.activeComponent = "GarageManagement";
      } else if (data.name == "一键呼叫") {
        this.activeComponent = "AKeyToCall";
      }
    },
    /**
     *@author: ljj
     *@Date: 2022-03-12 15:29:49
     *@description: 二级菜单点击事件
     */
    operationTwo(data) {
      this.menuListTwo.map((item) => {
        data.name == item.name ? (item.checked = true) : (item.checked = false);
      });
      if (data.name == "视频监控") {
        this.activeComponent = "Home";
        this.$emit("showMaskInfo", "showMonitorPanel");
      } else if (data.name == "目标识别") {
      } else if (data.name == "车辆道闸") {
        this.activeComponent = "GarageManagement";
      } else if (data.name == "闸机") {
      } else if (data.name == "共享单车") {
        this.activeComponent = "BikeSharing";
        this.$emit("showMaskInfo", "showBikePanel");
      } else if (data.name == "人员管理") {
      }
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="main_title">
      <!-- 武汉大学数字孪生平台 -->
      {{ homeTitle }}
      <!-- <img src="../../../public/img/main-title-text.png" alt="" /> -->
    </div>
    <div class="menu_list">
      <p
        v-for="(item, index) in menuList"
        :key="index"
        @click="operation(item)"
      >
        <img :src="item.checked ? item.imgCheckedSrc : item.imgSrc" alt="" />
        <span :class="{ menu_text: true, menu_checked: item.checked }">{{
          item.name
        }}</span>
      </p>
    </div>
    <div class="menu_list-2" v-show="menuListTow">
      <p
        v-for="(item, index) in menuListTwo"
        :key="index"
        @click="operationTwo(item)"
      >
        <img :src="item.checked ? item.imgCheckedSrc : item.imgSrc" alt="" />
        <span :class="{ menu_text: true, menu_checked: item.checked }">{{
          item.name
        }}</span>
      </p>
    </div>
    <div class="weather">
      <p>{{ time[1] }}</p>
      <p>
        <span>{{ time[0] }}</span
        ><span>星期{{ time[2] }}</span
        ><span>多云转晴</span><span>8-13℃</span>
      </p>
    </div>
    <div class="content_panel">
      <component
        ref="content"
        v-bind="$attrs"
        v-on="$listeners"
        :is="activeComponent"
      ></component>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
  .main_title {
    height: 100px;
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 60px;
    color: #fff;
    text-shadow: 0px 0px 8px #fff, 0px 0px 8px #0759ae, 0px 0px 8px #0759ae,
      0px 0px 8px #0759ae;
    z-index: 10;
    background: url("../../../public/img/main-title.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    img {
      display: block;
      margin-top: 20px;
    }
  }
  .weather {
    height: 43px;
    width: 610px;
    background: url("../../../public/img/weather-bg.png");
    position: absolute;
    top: 70px;
    right: 10px;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      height: 100%;
      width: 100%;
      line-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 5px 5px rgba(0, 25, 110, 0.75);
      background: linear-gradient(0deg, #8dd3ff 0%, #ffffff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p:nth-child(1) {
      flex: 2;
    }
    p:nth-child(2) {
      flex: 3;
      justify-content: flex-start;
      align-items: center;
      span {
        margin: 0 10px;
      }
    }
  }
  .menu_list {
    height: 45px;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 11;
    .menu_text {
      display: block;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    .menu_checked {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #30fdff;
    }
    p {
      cursor: pointer;
      margin: 0 15px;
      height: 42px;
      width: 117px;
      background: url("../../../public/img/menu-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        margin: 0 5px 0 0;
      }
      span {
        display: block;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        line-height: 30px;
      }
    }
    p:nth-child(1) {
      margin-left: 10px;
    }
  }
  .menu_list-2 {
    height: 45px;
    width: 100%;
    position: absolute;
    top: 140px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 11;
    .menu_text {
      display: block;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    .menu_checked {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #30fdff;
    }
    p {
      cursor: pointer;
      margin: 0 10px;
      height: 42px;
      width: 117px;
      background: url("../../../public/img/menu-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        margin: 0 5px 0 0;
      }
      span {
        display: block;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        line-height: 30px;
      }
    }
  }
  .content_panel {
    height: calc(~"100% - 115px");
    width: 100%;
    padding: 20px 10px 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: 115px;
    left: 0;
  }
}
</style>
