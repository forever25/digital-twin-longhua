/**
 *@author: ljj
 *@Date: 2021-09-10 11:55:27
 *@description: 通道概览组件
*/
<script>
export default {
  name: 'GarageOverview',
  data() {
    return {
      totalGarageNum: 4,
      onlineGarageNum: 3,
      offlineGarageNum: 1,
    }
  },
  mounted() { },
  methods: {},
}
</script>
<template>
  <Row class="main-panel">
    <p class="garage-desc">通道总数： <span>{{ totalGarageNum }}</span> （个）</p>
    <div class="garage-more">
      <div class="left-panel">
        <img
          src="../../../public/img/garage/onlineGarage.png"
          alt=""
        >
        <p>畅通个数 {{ onlineGarageNum }}（个）</p>
      </div>
      <div class="right-panel">
        <img
          src="../../../public/img/garage/offlineGarage.png"
          alt=""
        >
        <p>占用个数 {{ offlineGarageNum }}（个）</p>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  .garage-desc {
    width: 100%;
    height: 30px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    span {
      font-size: 16px;
    }
  }
  .garage-more {
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left-panel {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 80%;
      }
      p {
        height: 20%;
        text-align: center;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #32e2fe;
        line-height: 36px;
      }
    }
    .right-panel {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 80%;
      }
      p {
        height: 20%;
        text-align: center;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ff5150;
        line-height: 36px;
      }
    }
  }
}
</style>
