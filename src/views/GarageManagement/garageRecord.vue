/**
 *@author: ljj
 *@Date: 2021-09-10 10:30:00
 *@description: 车辆记录组件
*/
<script>
export default {
  name: "GarageRecord",
  data() {
    return {
      total: 0,
      loading: false,
      searchForm: {
        personName: "", //车牌号
        pageNumber: 1, // 当前页数
        pageSize: 5, // 页面大小
      },
      data: [
        {
          number: 1,
          carNo: "占道经营",
          carType: "临时车",
          carStatus: "进场",
          inOutTime: "2021-09-13 12:30",
          pass: "小区西门口消防通道",
          src: require("../../../public/img/monitor/carpass1.jpg"),
          status: "已处理",
        },
        {
          number: 2,
          carNo: "占道经营",
          carType: "私家车",
          carStatus: "出场",
          inOutTime: "2021-09-13 15:34",
          pass: "小区西门口消防通道",
          src: require("../../../public/img/monitor/carpass3.jpg"),
          status: "未处理",
        },
        {
          number: 3,
          carNo: "占道经营",
          carType: "临时车",
          carStatus: "出场",
          inOutTime: "2021-09-14 10:13",
          pass: "小区西门口消防通道",
          src: require("../../../public/img/monitor/carpass4.jpg"),
          status: "已处理",
        },
        {
          number: 4,
          carNo: "占道经营",
          carType: "临时车",
          carStatus: "进场",
          inOutTime: "2021-09-14 12:32",
          pass: "小区西门口消防通道",
          src: require("../../../public/img/monitor/carpass.png"),
          status: "已处理",
        },
        {
          number: 5,
          carNo: "占道经营",
          carType: "临时车",
          carStatus: "进场",
          inOutTime: "2021-09-14 12:32",
          pass: "小区西门口消防通道",
          src: require("../../../public/img/monitor/carpass1.jpg"),
          status: "已处理",
        },
      ],
      columns: [
        {
          title: "序号",
          key: "number",
          align: "center",
          sortable: false,
          tooltip: true,
          width: 40,
        },
        {
          title: "阻塞原因",
          key: "carNo",
          align: "center",
          sortable: false,
          tooltip: true,
          width: 70,
        },
        {
          title: "阻塞事件",
          key: "inOutTime",
          align: "center",
          sortable: false,
          tooltip: true,
        },
        {
          title: "通道名称",
          key: "pass",
          align: "center",
          sortable: false,
          tooltip: true,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          sortable: false,
          tooltip: true,
          width: 60,
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
  },
};
</script>
<template>
  <Row class="main-panel">
    <div class="top-tools">
      <div class="search-text">
        <div class="search-title">车牌号：</div>
        <div class="search-content">
          <Input
            v-model="searchForm.personName"
            size="small"
            placeholder="请输入车牌号"
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
        ></Table>
      </div>
      <div class="page-div">
        <Row type="flex" justify="end" class="page">
          <Page
            :current="searchForm.pageNumber"
            :total="total"
            :page-size="searchForm.pageSize"
            :page-size-opts="[5, 20, 50]"
            placement="top"
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

/deep/.ivu-icon-ios-bookmark {
  color: #ff5150;
}
</style>
