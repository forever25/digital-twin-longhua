<!--
 * @Author: ZWS
 * @Date: 2022-03-14 15:01:12
 * @LastEditTime: 2022-03-18 19:52:14
 * @Description: 共享单车界面
-->
<template>
  <section class="bilke-sharing">
    <div class="left-wrap common-wrap">
      <!-- 左上 -->
      <div class="left-top common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 设备统计</div>
        </h5>
        <div class="item-content">
          <div class="use-bike-item">
            <img src="../../assets/mintpass-rubbish/normal.png" alt="" />
            <div class="text-wrap">
              <span class="text-importance use-bike">325</span>
              <span>正常</span>
            </div>
          </div>
          <div class="use-bike-item">
            <img src="../../assets/mintpass-rubbish/overflow.png" alt="" />
            <div class="text-wrap">
              <span class="text-importance spare-bike">23</span>
              <span>溢出</span>
            </div>
          </div>
          <div class="use-bike-item">
            <img
              src="../../assets/mintpass-rubbish/unpleasant-odor.png"
              alt=""
            />
            <div class="text-wrap">
              <span class="text-importance spare-bike">23</span>
              <span>异味</span>
            </div>
          </div>
          <div class="use-bike-item">
            <img src="../../assets/mintpass-rubbish/malfunction.png" alt="" />
            <div class="text-wrap">
              <span class="text-importance spare-bike">23</span>
              <span>故障</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 左中 -->
      <div class="left-center common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 状态统计</div>
        </h5>
        <div class="item-content">
          <EventPerformance></EventPerformance>
        </div>
      </div>
      <!-- 左下 -->
      <div class="left-bottom common-item">
        <h5 class="item-title">
          <div class="title-bg">
            <span class="title-icon"></span> 垃圾桶列表
          </div>
        </h5>
        <div class="item-content">
          <!-- <ParkingAreas v-on="$listeners"></ParkingAreas> -->
          <MintpassRubbishList
            @locusData="locusData"
            @addRubbishList="addRubbishList"
            v-on="$listeners"
          ></MintpassRubbishList>
        </div>
      </div>
    </div>
    <div class="right-wrap common-wrap">
      <!-- 右上 -->
      <div class="right-top common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 事件列表</div>
        </h5>
        <div class="item-content">
          <EventList :rubbishEventList="rubbishEventList"></EventList>
        </div>
      </div>
      <!-- 右下 -->
      <div class="right-bottom common-item">
        <h5 class="item-title">
          <div class="title-bg">
            <span class="title-icon"></span> 垃圾桶详情
          </div>
        </h5>
        <div class="item-content">
          <fireEventDetail :trackDetails="trackDetails"></fireEventDetail>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MintpassRubbishList from "./components/MintpassRubbishList.vue";
import EventList from "./components/EventList.vue";
import EventPerformance from "./components/eventPerformance.vue";
import fireEventDetail from "./components/fireEventDetail.vue";
export default {
  name: "MintpassRubbish",
  components: {
    MintpassRubbishList,
    EventList,
    EventPerformance,
    fireEventDetail,
  },
  props: {
    CesiumBaseMap: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      trackDetails: {},
      rightBottomTitle: "",
      rubbishEventList: [],
    };
  },
  mounted() {
    this.addMintpassRubbish();
  },
  methods: {
    locusData(data) {
      this.rightBottomTitle = data.code;
      this.trackDetails = data;
    },
    // 清除垃圾桶
    clearMintpassRubbish() {
      if (window.walkFly) {
        window.walkFly.clear();
      }
      try {
        window.cesiumMap.pointMark.removeMassiveMark("bikeInfo");
        // window.cesiumMap.model.remove3Dtiles('ljtModel')
      } catch (e) {}
    },
    // 添加垃圾桶
    addMintpassRubbish() {
      if (window.walkFly) {
        window.walkFly.clear();
      }

      const imgUrl = {
        正常: require("@/assets/mintpass-rubbish/normal-map.png"),
        异味: require("@/assets/mintpass-rubbish/unpleasant-odor-map.png"),
        溢出: require("@/assets/mintpass-rubbish/unpleasant-odor-map.png"),
        故障: require("@/assets/mintpass-rubbish/malfunction-map.png"),
      };

      if (globalConfig.MintpassRubbish.length > 0) {
        //添加三维坐标
        globalConfig.MintpassRubbish.map((item) => {
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
                    url: imgUrl[item.status],
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
                "bikeInfo"
              )
              .bindPopup(
                {
                  popHeight: 220,
                  popWidth: 400,
                  doQuery4Content: (id) => {
                    let temp = globalConfig.MintpassRubbish.find((one) => {
                      return one.OBJID == id;
                    });
                    if (temp) {
                      let content = `<iframe width="100%" height="100%" frameborder=0 src="./BikeDetail?id=${temp.OBJID}"></iframe>`;
                      return {
                        head: temp.name + "详情",
                        body: content,
                      };
                    }
                  },
                },
                "bikeInfo"
              );

            // TODO: 加载垃圾桶模型;

            // window.cesiumMap.model.addGltf(
            //   {
            //     url: "data/ljt.glb",
            //     position: {
            //       lon: item.lon,
            //       lat: item.lat,
            //       alt: 5,
            //     },
            //     scale: 0.1, // double size
            //     minimumPixelSize: 40, // never smaller than 128 pixels
            //     maximumScale: 200, // never larger than 20000 * model size (overrides minimumPixelSize)
            //     allowPicking: false, // not pickable
            //     isFly: false,
            //     // callback: callback,
            //   },
            //   "ljtModel"
            // );
          }
        });
      }
    },
    addRubbishList(data) {
      this.rubbishEventList = Array.isArray(data) ? data : [data];
    },
    destroyedMintpassRubbish() {
      this.clearMintpassRubbish();
    },
  },
  beforeDestroy() {
    this.destroyedMintpassRubbish();
  },
  inheritAttrs: false,
};
</script>

<style lang="less" scoped>
.bilke-sharing {
  display: flex;
  justify-content: space-between;
  color: #fff;
  .common-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    width: 22.3vw;
    height: calc(100vh - 145px);
    &.left-wrap {
      // height: 40vh;
    }
    &.right-wrap {
      // height: 40vh;
    }

    .common-item {
      position: relative;
      z-index: 999;
      width: 100%;
      padding-bottom: 10px;
      box-sizing: border-box;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: left top;
      &.left-top {
        flex: 14;
        background-image: url("../../assets/bilke-sharing/left-top-bg.png");
        .item-content {
          display: flex;
          justify-content: space-between;
          // padding-top: 16px;
          width: 80%;
          margin: auto;
          .use-bike-item {
            display: flex;
            flex-direction: column;
            // margin: 0 auto;
            img {
              width: 60px;
              height: auto;
            }
            .text-wrap {
              display: flex;
              // align-items: center;
              flex-direction: column;
              // padding-left: 1vw;
              span {
                display: block;
                text-align: center;
                width: 100%;
              }
              .text-importance {
                font-size: 24px;
                &.use-bike {
                  color: #30fafc;
                }
                &.spare-bike {
                  color: #ed9233;
                }
              }
            }
          }
          .use-bike-item:nth-child(3) {
            .text-wrap {
              .text-importance {
                &.spare-bike {
                  color: #f76903;
                }
              }
            }
          }
          .use-bike-item:nth-child(4) {
            .text-wrap {
              .text-importance {
                &.spare-bike {
                  color: #e13f20;
                }
              }
            }
          }
        }
        .exception-info {
          display: flex;
          justify-content: space-between;
          width: 60%;
          margin: 1.04166vw auto 0;
          .exception-info-item {
            width: 4.8958vw;
            position: relative;
            &.success {
              .number {
                color: #a7e59e;
              }
            }
            &.exception {
              .number {
                color: #fb6157;
              }
            }
            .number,
            .text {
              position: absolute;
              font-size: 16px;
              left: 50%;
              transform: translate(-50%);
            }
            .number {
              top: -20px;
              font-weight: bold;
            }
            .text {
              bottom: 10px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
      &.left-center {
        flex: 15;
        background-image: url("../../assets/bilke-sharing/left-center-bg.png");
      }
      &.left-bottom {
        flex: 24;
        background-image: url("../../assets/bilke-sharing/left-bottom-bg.png");
      }
      &.right-top {
        flex: 25;
        background-image: url("../../assets/bilke-sharing/right-top-bg.png");
      }
      &.right-bottom {
        flex: 31;
        background-image: url("../../assets/bilke-sharing/right-bottom-bg.png");
        // .item-title {
        //   margin-top: 14px;
        //   .title-bg {
        //     background: none;
        //     font-size: 16px;
        //     color: #2ce0e7;
        //     position: relative;
        //     .title-icon {
        //       width: 1.35416vw;
        //       height: 1.35416vw;
        //       background-image: url("../../assets/bilke-sharing/car.png");
        //     }
        //     .title-close {
        //       position: absolute;
        //       right: -2vw;
        //       top: 50%;
        //       font-size: 12px;
        //       transform: translateY(-50%);
        //       width: 20px;
        //       height: 20px;
        //       background: rgba(26, 91, 105, 0.3);
        //       border: 1px solid #177381;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //     }
        //   }
        // }
      }
      h5.item-title {
        height: 37px;
        display: flex;
        align-items: center;
        padding-left: 1px;
        padding-top: 12px;
        .title-bg {
          width: 18.85vw;
          height: 100%;
          display: flex;
          align-items: center;
          background: url("../../assets/bilke-sharing/title-bg.png") no-repeat
            left top;
          .title-icon {
            margin-left: 1.04vw;
            margin-right: 0.52vw;
            display: block;
            width: 0.83vw;
            height: 0.9375vw;
            background: url("../../assets/bilke-sharing/location.png") no-repeat
              left top;
            background-size: 100% 100%;
          }
          .title-close {
          }
        }
      }
      .item-content {
        height: calc(100% - 37px);
        // overflow: hidden;
        padding: 0 0.83vw;
      }
    }
  }
  //
}
</style>