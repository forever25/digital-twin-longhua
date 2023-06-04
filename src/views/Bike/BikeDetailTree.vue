<script>
export default {
  name: "BikeDetial",
  data() {
    return {
      value2: 0,
      setting: {
        dots: "none",
        arrow: "never",
      },
      bikeData: {},
      random2: 1,
    };
  },
  created() {
    // const id = this.$route.query.id;
    // let temp = {};
    // globalConfig.eventCenter.map((one) => {
    //   if (one.id === id) {
    //     temp = one;
    //   }
    // });
    this.bikeData = JSON.parse(sessionStorage.getItem("BikeDetailTree"));
  },
  mounted() {},
  methods: {},
};
</script>
<template>
  <Row class="main-panel">
    <div class="content">
      <div class="content_left">
        <img
          :src="
            require(`@/assets/event-center/scene picture${Math.ceil(
              Math.random() * 4
            )}.jpg`)
          "
          alt=""
        />
      </div>
      <div class="content_right">
        <p>事件类型：{{ bikeData.type }}</p>
        <p>事件性质：{{ bikeData.nature }}</p>
        <p>事件发生时间：{{ bikeData.time }}</p>
        <p>事件发生地点：{{ bikeData.address }}</p>
        <p>出警用时：{{ Math.ceil(Math.random() * 3) }}分钟</p>
        <p>完成状态：{{ bikeData.status }}</p>
      </div>
    </div>
  </Row>
</template>
        
<style lang="less" scoped>
.main-panel {
  height: 200px;
  width: 400px;
  display: flex;
  overflow: unset;
  color: #fff;
  background: rgba(63, 72, 84, 0.8);
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    div {
      height: 100%;
      width: 50%;
      padding: 10px;
      box-sizing: border-box;
    }
    &_left {
      img {
        display: block;
        height: auto;
        width: 100%;
      }
    }
    &_right {
      p {
        width: 100%;
      }
    }
  }
}
</style>
