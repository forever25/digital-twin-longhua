<!--
 * @Author: ZWS
 * @Date: 2022-03-14 15:01:12
 * @LastEditTime: 2022-03-15 19:40:01
 * @Description: 共享单车界面
-->
<template>
  <section class="bilke-sharing">
    <div class="left-wrap common-wrap">
      <!-- 左上 -->
      <div class="left-top common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 统计</div>
        </h5>
        <div class="item-content">
          <img
            class="item-img"
            src="../../assets/bilke-sharing/statistics-title-left-icon.png"
            alt=""
          />
          <div class="text-content">
            <div class="title">减少碳排放</div>
            <div class="quantification">超越了武汉市用户</div>
            <div class="describe">0.9千克(相当于种了1棵树)</div>
            <div class="percentage">69%</div>
          </div>
        </div>
        <ul class="exception-info">
          <li class="exception-info-item success">
            <img
              src="../../assets/bilke-sharing/statistics-success.png"
              alt=""
            />
            <div class="number">34</div>
            <div class="text">正常</div>
          </li>
          <li class="exception-info-item exception">
            <img
              src="../../assets/bilke-sharing/statistics-exception.png"
              alt=""
            />
            <div class="number">23</div>
            <div class="text">故障</div>
          </li>
        </ul>
      </div>
      <!-- 左中 -->
      <div class="left-center common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 统计</div>
        </h5>
        <div class="item-content">
          <div class="use-bike-item">
            <img src="../../assets/bilke-sharing/statistics-use.png" alt="" />
            <div class="text-wrap">
              <span class="text-importance use-bike">325</span>
              <span>正在使用</span>
            </div>
          </div>
          <div class="use-bike-item">
            <img src="../../assets/bilke-sharing/statistics-spare.png" alt="" />
            <div class="text-wrap">
              <span class="text-importance spare-bike">23</span>
              <span>闲置</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 左下 -->
      <div class="left-bottom common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 停车区域</div>
        </h5>
        <div class="item-content">
          <ParkingAreas v-on="$listeners"></ParkingAreas>
        </div>
      </div>
    </div>
    <div class="right-wrap common-wrap">
      <!-- 右上 -->
      <div class="right-top common-item">
        <h5 class="item-title">
          <div class="title-bg"><span class="title-icon"></span> 单车列表</div>
        </h5>
        <div class="item-content">
          <BikeSharingList
            @locusData="locusData"
            v-on="$listeners"
          ></BikeSharingList>
        </div>
      </div>
      <!-- 右下 -->
      <div
        class="right-bottom common-item"
        :style="isShowRightBottom ? 'visibility:hidden' : 'visibility:visible;'"
      >
        <h5 class="item-title">
          <div class="title-bg">
            <span class="title-icon"></span> {{ rightBottomTitle }}
            <div class="title-close" @click="closeRightBottom() ">X</div>
          </div>
        </h5>
        <div class="item-content">
          <TrackDetails :data="trackDetails" v-on="$listeners"></TrackDetails>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ParkingAreas from "./components/ParkingAreas.vue";
import BikeSharingList from "./components/BikeSharingList.vue";
import TrackDetails from "./components/TrackDetails.vue";
export default {
  name: "BikeSharing",
  components: {
    ParkingAreas,
    BikeSharingList,
    TrackDetails,
  },
  data() {
    return {
      trackDetails: [],
      isShowRightBottom:true,
      rightBottomTitle:""
    };
  },
  methods: {
    locusData(data) {
      this.isShowRightBottom = false;
      this.rightBottomTitle = data.code;
      this.trackDetails = data.locus;
    },
    closeRightBottom() {
      this.isShowRightBottom = true
      this.$emit('clearTrack')
    }
  },
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
    .common-item {
      position: relative;
      z-index: 999;
      width: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: left top;
      &.left-top {
        flex: 16;
        background-image: url("../../assets/bilke-sharing/left-top-bg.png");
        .item-content {
          display: flex;
          align-items: center;
          padding-top: 20px;
          .item-img {
            width: 1.458vw;
            height: 1.458vw;
            margin-right: 10px;
          }
          .text-content {
            display: flex;
            flex-wrap: wrap;
            // height: 1.458vw;
            div {
              width: 50%;
            }
            .title,
            .percentage {
              font-size: 14px;
            }
            .quantification,
            .describe {
              color: rgba(255, 255, 255, 0.6);
              font-size: 12px;
            }
            .quantification {
              text-align: right;
            }
            .percentage {
              text-align: right;
              color: #47b6d8;
              font-weight: bold;
            }
          }
        }
        .exception-info {
          display: flex;
          justify-content: space-between;
          width: 50%;
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
        flex: 12;
        background-image: url("../../assets/bilke-sharing/left-center-bg.png");
        .item-content {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
          width: 80%;
          margin: auto;
          .use-bike-item {
            display: flex;
            margin: 0 auto;
            .text-wrap {
              display: flex;
              flex-direction: column;
              padding-left: 1vw;
              span {
                display: block;
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
        }
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
        .item-title {
          margin-top: 14px;
          .title-bg {
            background: none;
            font-size: 16px;
            color: #2ce0e7;
            position: relative;
            .title-icon {
              width: 1.35416vw;
              height: 1.35416vw;
              background-image: url("../../assets/bilke-sharing/car.png");
            }
            .title-close {
              position: absolute;
              right: -2vw;
              top: 50%;
              font-size: 12px;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
              background: rgba(26, 91, 105, 0.3);
              border: 1px solid #177381;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
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
        padding: 0 0.83vw;
      }
    }
  }
  //
}
</style>