/**
 *@author: ljj
 *@Date: 2021-09-09 11:30:40
 *@description: 门禁列表组件
*/
<script>
export default {
  name: 'VideoList',
  data() {
    return {
      total: 0,
      loading: false,
      searchForm: {
        accessTitle: "",//小区名称
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      data: [{ number: 1, name: "武汉大学前门道闸", passageCode: "10001", equipmentType: "192.168.122.122" },
      { number: 2, name: "武汉大学南门道闸", passageCode: "10002", equipmentType: "192.168.1.2" },
      { number: 3, name: "武汉大学后门道闸", passageCode: "10003", equipmentType: "192.168.1.3" },
      { number: 4, name: "武汉大学北门道闸", passageCode: "10004", equipmentType: "192.168.1.4" },
      { number: 5, name: "武汉大学东门道闸", passageCode: "10005", equipmentType: "192.168.1.5" },
      { number: 6, name: "武汉大学西门道闸", passageCode: "10006", equipmentType: "192.168.1.6" },
      { number: 7, name: "武汉大学西南角道闸", passageCode: "10007", equipmentType: "192.168.1.7" },
      { number: 8, name: "武汉大学东北角道闸", passageCode: "10008", equipmentType: "192.168.1.8" },
      { number: 9, name: "武汉大学西北角道闸", passageCode: "10009", equipmentType: "192.168.1.9" },
      { number: 10, name: "武汉大学西南角道闸", passageCode: "10007", equipmentType: "192.168.1.7" },],
      columns: [{
        title: "序号",
        key: "number",
        align: "center",
        sortable: false,
        tooltip: true,
        width: 40,
      },
      {
        title: "道闸名称",
        key: "name",
        align: "center",
        sortable: false,
        tooltip: true,
        minWidth: 100,
      },
      // {
      //   title: "设备端口",
      //   key: "passageCode",
      //   align: "center",
      //   sortable: false,
      //   tooltip: true,
      //   width: 100,
      // },
      {
        title: "道闸IP",
        key: "equipmentType",
        align: "center",
        sortable: false,
        tooltip: true,
        width: 150,
      },],
    }
  },
  mounted() {
    this.total = this.data.length;
  },
  methods: {
    handleSearch() { },
    handleReset() { },
    handleRefresh() { },
    changePage() { },
    changePageSize() { },
  },
}
</script>
<template>
  <Row class="main-panel">
    <div class="top-tools">
      <div class="search-text">
        <div class="search-title">道闸名称：</div>
        <div class="search-content">
          <Input
            v-model="searchForm.accessTitle"
            size="small"
            placeholder="请输入道闸名称"
            class="search-input"
          />
        </div>
      </div>
      <div class="search-buttons">
        <div class="search-buttons-content">
          <Button
            size="small"
            type="primary"
            icon="ios-search"
            class="query-btn"
            @click="handleSearch"
          >搜索</Button>
          <Button
            size="small"
            icon="md-arrow-back"
            class="query-btn"
            @click="handleReset"
          >返回</Button>
          <Button
            size="small"
            type="primary"
            icon="md-refresh"
            class="query-btn"
            @click="handleRefresh"
          >刷新</Button>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="table-div">
        <Table
          ref="table"
          :loading="loading"
          :columns="columns"
          :data="data"
          border
          sortable="custom"
        ></Table>
      </div>
      <div class="page-div">
        <Row
          type="flex"
          justify="end"
          class="page"
        >
          <Page
            :current="searchForm.pageNumber"
            :total="total"
            :page-size="searchForm.pageSize"
            :page-size-opts="[10, 20, 50]"
            size="small"
            show-total
            show-elevator
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          ></Page>
        </Row>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/common2.less";
/deep/.ivu-table td {
  height: 44px !important;
}
</style>
