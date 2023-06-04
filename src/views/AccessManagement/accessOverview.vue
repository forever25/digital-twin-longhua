/**
 *@author: ljj
 *@Date: 2021-09-09 09:06:59
 *@description: 门禁概览组件
*/
<script>
import AccessViewCharts from "./accessViewCharts.vue"
export default {
  name: 'AccessOverview',
  components: { AccessViewCharts },
  data() {
    return {
      totalDoorNum: 234,
      normal: 200,
      unnormal: 34,
      color: [['#28D2F7', '#2DF7F8', '#34FBB8'], ['#C1D946', '#DCCA4C', '#DDAE51']],
      title: ['正常', '异常']
    }
  },
  mounted() {

  },
  methods: {},
}
</script>
<template>
  <Row class="main-panel">
    <p class="access-desc">道闸总数： <span>{{ totalDoorNum }}</span> （个）</p>
    <div class="left-panel">
      <AccessViewCharts
        :door-num="normal"
        :color="color[0]"
        :total-door-num="totalDoorNum"
        :title="title[0]"
      ></AccessViewCharts>
    </div>
    <div class="right-panel">
      <AccessViewCharts
        :door-num="unnormal"
        :color="color[1]"
        :total-door-num="totalDoorNum"
        :title="title[1]"
      ></AccessViewCharts>
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
  .access-desc {
    width: 100%;
    height: 30px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    span {
      font-size: 16px;
    }
  }
  .left-panel {
    height: calc(~"100% - 5px");
    width: 48%;
  }
  .right-panel {
    height: calc(~"100% - 5px");
    width: 48%;
  }
}
</style>
