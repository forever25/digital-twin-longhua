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
    const id = this.$route.query.id;
    let temp = globalConfig.MintpassRubbish.find((one) => {
      return one.OBJID == id;
    });

    this.bikeData = temp;
    this.random2 = Math.ceil(Math.random() * 2);
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
          :src="require(`@/assets/mintpass-rubbish/ljt${random2}.jpg`)"
          alt=""
        />
      </div>
      <div class="content_right">
        <p>名称：{{ bikeData.name }}</p>
        <p>编码：{{ bikeData.OBJID }}</p>
        <p>位置：{{ bikeData.WZMS }}</p>
        <p>所属街道：{{ bikeData.JDNAME }}</p>
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
