<template>
  <div class="home">
    <div class="base3dmap">
      <CesiumBaseMap
        ref="CesiumBaseMap"
        @showAttractions="showAttractions"
      ></CesiumBaseMap>
    </div>
    <div class="home_page">
      <HomePage
        @treeClickEvent="treeClickEvent"
        @flyToMonitor="flyToMonitor"
        @flyToTarget="flyToTarget"
        @flyToBike="flyToBike"
        @trackDetails="trackDetails"
        @addParkingAreas="addParkingAreas"
        @clearTrack="clearTrack"
        @showMaskInfo="showMaskInfo"
        :CesiumBaseMap="$refs.CesiumBaseMap"
      >
      </HomePage>
    </div>
    <Modal
      v-model="attractionsModalVisible"
      :title="attractionsModalTitle"
      :styles="{top:'96px'}"
      class-name="vertical-center-modal"
      width="35%"
      footer-hide
    >
      <attractionsModal
        v-if="attractionsModalVisible"
        :attractions-img-list="attractionsImgList"
        :attractions-desc="attractionsDesc"
      ></attractionsModal>
    </Modal>
  </div>
</template>

<script>
import JSEncrypt from "jsencrypt"
import { mapMutations } from 'vuex';
import CesiumBaseMap from '../components/map3dbase/CesiumBaseMap.vue';
import HomePage from './HomePage/HomePage';
import { getToken, getPublicKey } from '@/api/token.js';
import { getDhCameraInfoToken } from '@/api/base.js'
export default {
  name: "Home",
  components: { CesiumBaseMap, HomePage },
  data() {
    return {
      attractionsModalTitle: "",
      attractionsImgList: [],
      attractionsModalVisible: false,
      attractionsDesc: "",
    };
  },
  created() {
  },
  methods: {
    treeClickEvent(data) {
      this.$refs.CesiumBaseMap.treeClickEvent(data);
    },
    // 展示景点详情
    showAttractions(data) {
      this.attractionsModalTitle = data.name;
      // this.attractionsModalVisible = true;
      this.attractionsImgList = data.img;
      this.attractionsDesc = data.desc;
    },
    // 飞行到摄像头
    flyToMonitor(data) {
      this.$refs.CesiumBaseMap.flyToMonitor(data);
    },

    /**
     * @description: 添加目标对象
     * @author: wzd
     * @date: 2022-03-09 10:53:26
     */
    flyToTarget(data) {
      this.$refs.CesiumBaseMap.flyToTarget(data);
    },
    // 飞行到单车
    flyToBike(data) {
      this.$refs.CesiumBaseMap.flyToBike(data);
    },
    trackDetails(data) {
       this.$refs.CesiumBaseMap.trackDetails(data); 
    },
    addParkingAreas(row) {
      // this.$refs.CesiumBaseMap.addParkingAreas(row)
      this.$refs.CesiumBaseMap.flyToParkingAreas(row);
    },
    // 清除轨迹
    clearTrack() {
      this.$refs.CesiumBaseMap.clearTrack();
    },
    // 楼栋选择
    chooseBuild(data) {
      this.$refs.CesiumBaseMap.modeVisibleEvent(data);
    },
    /**
     * @description: 初始化鉴权
     * @author: wzd
     * @date: 2022-01-06 09:43:47
     */
    initaAuthority() {
      //获取公钥
      getPublicKey(globalConfig.apiList.getPublicKeyUrl).then(res => {
        if (res.success === true) {
          this.publicKey = res.data.publicKey;
          //加密用户及密码
          const userName = this.encryption(this.publicKey, globalConfig.authorityParam.username);
          const password = this.encryption(this.publicKey, globalConfig.authorityParam.password);
          //开始进行密码模式鉴权
          let data = {
            username: userName,
            password: password,
            grant_type: 'password',
            client_id: globalConfig.authorityParam.client_id,
            client_secret: globalConfig.authorityParam.client_secret,
            public_key: this.publicKey
          }
          //获取token
          getToken(globalConfig.apiList.getTokenUrl, data).then(res1 => {
            if (res1.success === true) {
              //设置token值
              this.SET_TOKEN_VALUE(res1.data.token_type + ' ' + res1.data.access_token);
              //过期时间
              let seconds = (res1.data.expires_in - 15) > 0 ? res1.data.expires_in - 15 : 15;
              //快到过期时间时重新获取token
              let that = this;
              setTimeout(function () { that.initaAuthority(); }, seconds * 1000);
            }
          });
        }
      });
    },

    /**
     * @description: 加密密文
     * @author: wzd
     * @date: 2022-01-06 10:07:13
     */
    encryption(publicKey, password) {
      let encryptor = new JSEncrypt();
      encryptor.setPublicKey(publicKey);
      let psw = encryptor.encrypt(password);
      return psw;
    },
    // 添加轨迹
    addTracke(data) {
      this.$refs.CesiumBaseMap.initData(data);
    },
    // 初始化模型位置
    resetLocation() {
      this.$refs.CesiumBaseMap.resetLocation();
    },
    // 初始化添加所有摄像头
    addAllMonitorInfo(data) {
      this.$refs.CesiumBaseMap.addAllMonitorInfo();
    },
    // 标记分别展示
    showMaskInfo(name) {
      this.$refs.CesiumBaseMap.showMaskInfo(name);
    },
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
  position: relative;
  .base3dmap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9;
  }
  .home_page {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  /deep/::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background: transparent;
  }

  /deep/::-webkit-scrollbar-thumb {
    border-radius: 4px;
    box-shadow: inset 0 0 2px #01effa;
    -webkit-box-shadow: inset 0 0 2px #01effa;
    background: #01effa;
  }

  /deep/::-webkit-scrollbar-button {
    display: none;
  }
  /deep/::-webkit-scrollbar-corner {
    display: none;
  }
}
/deep/.earthview-popup-body {
  //   height: 300px !important;
  overflow: hidden;
}
</style>
