/**
 *@author: ljj
 *@Date: 2021-09-09 09:07:14
 *@description: 门禁管理页面
*/
<script>
import AccessList from "./accessList.vue";
import PersonInfo from "./personInfo.vue";
import StatisticsInfo from "./statisticsInfo.vue";
import AccessOverview from "./accessOverview.vue";
export default {
  name: 'VideoManagement',
  components: {
    PersonInfo,
    AccessOverview,
    AccessList,
    StatisticsInfo,
  },
  data() {
    return {
    }
  },
  mounted() { },
  methods: {},
}
</script>
<template>
  <Row class="main-panel">
    <div class="left-panel">
      <div class="left-top-panel">
        <div class="title">道闸概览</div>
        <div class="content">
          <AccessOverview>
          </AccessOverview>
        </div>
      </div>
      <div class="left-bottom-panel">
        <div class="title">道闸列表</div>
        <div class="content">
          <AccessList></AccessList>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="right-top-panel">
        <div class="title">统计信息</div>
        <div class="content">
          <StatisticsInfo></StatisticsInfo>
        </div>
      </div>
      <div class="right-bottom-panel">
        <div class="title">人员信息</div>
        <div class="content">
          <PersonInfo></PersonInfo>
        </div>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/common1.less";
.right-top-panel {
  height: 30% !important;
}
.right-bottom-panel {
  height: 70% !important;
}
</style>
