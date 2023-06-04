/**
 *@author: ljj
 *@Date: 2021-09-09 11:47:02
 *@description: 信息统计组件
*/
<script>
import AccessInOutCharts from "./accessInOutCharts.vue"
export default {
  name: 'StatisticsInfo',
  components: { AccessInOutCharts },
  data() {
    return {
      totalPersonNum: 1004,
      personInNum: 690,
      personOutNum: 314,
      color: ['#7BD9FF', '#FFAB48'],
      title: ['进场人数', '出场人数']
    }
  },
  mounted() {

  },
  methods: {},
}
</script>
<template>
  <Row class="main-panel">
    <div class="statistics-desc">
      <p class="community-title">
        <img
          src="../../../public/img/access/location.png"
          alt=""
        >
        武汉大学
      </p>
      <p>
        道闸总数： <span>{{ totalPersonNum }}</span> （个）
      </p>
    </div>
    <div class="left-panel">
      <AccessInOutCharts
        :person-num="personInNum"
        :color="color[0]"
        :title="title[0]"
        :total-person-num="totalPersonNum"
      ></AccessInOutCharts>
    </div>
    <div class="right-panel">
      <AccessInOutCharts
        :person-num="personOutNum"
        :color="color[1]"
        :title="title[1]"
        :total-person-num="totalPersonNum"
      ></AccessInOutCharts>
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
  position: relative;
  .statistics-desc {
    width: 100%;
    height: 10%;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 14px;
    padding-left: 10px;
    box-sizing: border-box;
    span {
      font-size: 16px;
    }
    .community-title {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 30px;
      img {
        height: 14px;
        width: 14px;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
  }
  .left-panel {
    height: 90%;
    width: 48%;
  }
  .right-panel {
    height: 90%;
    width: 48%;
  }
}
</style>
