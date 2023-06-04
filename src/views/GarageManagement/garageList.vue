/**
 *@author: ljj
 *@Date: 2021-09-10 10:03:14
 *@description: 车库列表
*/
<script>
export default {
  name: "GarageList",
  data() {
    return {
      total: 0,
      loading: false,
      searchForm: {
        garageTitle: "", //车库名称
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      data: window.globalConfig.MonitoringPoint,
      columns: [
        {
          title: "通道名称",
          key: "name",
          align: "center",
          sortable: false,
          tooltip: true,
          color: "#ffc029",
          width: 130,
        },
        {
          title: "所属单位",
          key: "DEPTNAME3",
          align: "center",
          sortable: false,
          tooltip: true,
        },
        {
          title: "位置",
          key: "WZMS",
          align: "center",
          sortable: false,
          tooltip: true,
        },
        {
          title: "操作",
          align: "center",
          slot: "options",
        },
      ],
    };
  },
  mounted() {
    this.total = this.data.length;
  },
  methods: {
    handleSearch() {},
    handleReset() {},
    handleRefresh() {},
    changePage() {},
    changePageSize() {},
    addParkingAreas(row) {
      this.$emit("flyToBike", row);
    },
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="top-tools">
      <div class="search-text">
        <div class="search-title">通道名称：</div>
        <div class="search-content">
          <Input
            v-model="searchForm.garageTitle"
            size="small"
            placeholder="请输入通道名称"
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
            >搜索</Button
          >
          <Button
            size="small"
            icon="md-arrow-back"
            class="query-btn"
            @click="handleReset"
            >返回</Button
          >
          <Button
            size="small"
            type="primary"
            icon="md-refresh"
            class="query-btn"
            @click="handleRefresh"
            >刷新</Button
          >
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
        >
          <template slot="options" slot-scope="{ row }">
            <div class="options-wrap" @click="addParkingAreas(row)">定位</div>
          </template>
        </Table>
      </div>

      <!-- <div class="page-div">
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
      </div> -->
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/common2.less";

/deep/.ivu-table-row > td:nth-child(3) {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffc029;
}
/deep/.ivu-table td {
  height: 44px !important;
}
.options-wrap {
  cursor: pointer;
  color: #2ce0e7;
}
</style>
