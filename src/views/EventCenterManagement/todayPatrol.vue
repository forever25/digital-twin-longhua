/**
 *@author: ljj
 *@Date: 2021-09-15 14:32:48
 *@description: 今日巡卫页面
*/
<script>
export default {
  name: "Todaypatrol",
  data() {
    return {
      value: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: "none",
        radiusDot: false,
        trigger: "click",
        arrow: "never",
      },
      patrolPerson: window.globalConfig.zhiangangting,
      //  [
      //   { id: "10001", name: "张泽仁", area: "南区", time: "07:01:31", lastPatrol: "物业中心", tel: "18139275869", src: require("../../../public/img/eventCenter/policeMan.jpg") },
      //   { id: "10002", name: "王涵", area: "北区", time: "07:12:42", lastPatrol: "北音乐广场", tel: "18451125469", src: require("../../../public/img/eventCenter/policeWoman.jpg") },
      //   { id: "10003", name: "罗小虎", area: "东区", time: "07:14:18", lastPatrol: "西普社区", tel: "18542152574", src: require("../../../public/img/eventCenter/policeMan2.jpg") },
      //   { id: "10004", name: "熊艳丽", area: "西区", time: "07:10:45", lastPatrol: "中央首座", tel: "17856955658", src: require("../../../public/img/eventCenter/policeWoman2.jpg") },
      // ]
    };
  },
  mounted() {
    this.addM();
  },
  methods: {
    addM() {
      if (window.globalConfig.zhiangangting.length > 0) {
        window.globalConfig.zhiangangting.map((item) => {
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
                    url: require("@/assets/mintpass-rubbish/zagt.png"),
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
                "zhian"
              )
              .bindPopup(
                {
                  popHeight: 220,
                  popWidth: 400,
                  doQuery4Content: (id) => {
                    let temp = globalConfig.zhiangangting.find((one) => {
                      return one.OBJID == id;
                    });
                    if (temp) {
                      let content = `<iframe width="100%" height="100%" frameborder=0 src="./bikeDetailTow?id=${temp.OBJID}"></iframe>`;
                      return {
                        head: temp.name + "详情",
                        body: content,
                      };
                    }
                  },
                },
                "zhian"
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
        window.cesiumMap.pointMark.removeMassiveMark("zhian");
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
    <Carousel
      v-model="value"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
      loop
      @mouseenter.native="setting.autoplay = false"
      @mouseleave.native="setting.autoplay = true"
    >
      <CarouselItem v-for="item in patrolPerson" :key="item.id">
        <div class="demo-carousel">
          <div class="patrol">
            <div class="center-panel">
              <img :src="item.src" alt="" />
              <div class="desc">
                <p>岗亭名称：{{ item.name }}</p>
                <p>所属单位：{{ item.DEPTNAME3 }}</p>
                <p>签到时间：{{ item.time }}</p>
                <p>联系电话：{{ item.tel }}</p>
                <p>
                  地址：<a @click="$emit('flyToBike', item)">{{ item.WZMS }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CarouselItem>
    </Carousel>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
}
.patrol {
  height: 180px;
  background: transparent;
  margin: 15px 0 0 0;
  box-sizing: border-box;
  padding: 5px;

  .center-panel {
    height: 100%;
    width: 100%;
    box-shadow: 0 0 10px 0 #1fa6d4;
    border: 1px solid #1fa6d4;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      height: 90%;
      width: 46%;
    }
    .desc {
      height: 80%;
      width: 48%;
      p {
        color: white;
        line-height: 24px;
        font-size: 14px;
      }
    }
  }
}
/deep/.ivu-carousel {
  height: 100%;
  width: 100%;
}
/deep/.ivu-carousel-arrow {
  background: #3a61c2;
  line-height: 39px;
}
</style>
