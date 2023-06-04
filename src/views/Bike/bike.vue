<script>
export default {
  name: 'Bike',
  data() {
    return {
      loading: false,
      bikeData: [],
      total: 0,
      searchForm: {
        "SearchConditionVo": [{
          "fieldOperation": "like",
          "fieldTitle": "channelName",
          "fieldType": "string",
          "fieldValue": ""
        }],
        "pageVo": {
          pageNumber: 1, // 当前页数
          pageSize: 5, // 页面大小
          sort: "updateTime",
          order: "desc",
        }
      },
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: "编号",
        },
        {
          title: "单车名称",
          key: "name",
          align: "center",
          sortable: false,
          tooltip: true,
          minWidth: 80,
          ellipsis: true,
          tooltip: true,
          render: (h, params) => {
            return h('div', {
              style: {
                color: "#2A9CF6"
              },
              on: {
                click: () => {
                  this.$emit("flyToBike", params.row)
                }
              }
            }, params.row.name)
          }
        },
        {
          title: "单车编码",
          key: "code",
          align: "center",
          sortable: false,
          tooltip: true,
          ellipsis: true,
          minWidth: 50,
          render: (h, params) => {
            return h('div', {
              style: {
                color: "#30E0D0"
              },
            }, params.row.code)
          }
        },
        {
          title: "单车类型",
          key: "type",
          // key:"code"
          align: "center",
          sortable: false,
          tooltip: true,
          minWidth: 50,
          render: (h, params) => {
            return h('div', {
              style: {
                color: "#FFC029"
              }
            }, params.row.type)
          }
        },
      ],
    }
  },
  methods: {
    changePage(num) {
      this.searchForm.pageVo.pageNumber = num;
      // this.getBikeInfo();
    },
    handleSearch() { },
    handleReset() { },
    handleRefresh() { },
  },
  mounted() {
    this.bikeData = globalConfig.bikeInfo;
    this.total = globalConfig.bikeInfo.length;
  }
}
</script>
<template>
  <Row class="main-panel">
    <div class="top-tools">
      <div class="search-text">
        <div class="search-title">
          区域名称：
        </div>
        <div class="search-content">
          <Input
            v-model="searchForm.SearchConditionVo[0].fieldValue"
            size="small"
            placeholder="请输入区域名称："
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
          >
            搜索
          </Button>
          <Button
            size="small"
            icon="md-return-left"
            class="query-btn"
            @click="handleReset"
          >
            返回
          </Button>
          <Button
            size="small"
            type="primary"
            icon="md-refresh"
            class="query-btn"
            @click="handleRefresh"
          >
            刷新
          </Button>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="table-div">
        <spin
          class="spin"
          v-if="loading"
          fix
        >加载中...</spin>
        <Table
          ref="table"
          :columns="columns"
          :data="bikeData"
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
            :total="total"
            :current="searchForm.pageVo.pageNumber"
            :page-size="searchForm.pageVo.pageSize"
            size="small"
            show-total
            show-sizer
            :page-size-opts="[5,10,25,50]"
            @on-change="changePage"
          ></Page>
        </Row>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;

  .top-tools {
    width: 100%;
    height: 60px;
    background-color: transparent;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    justify-items: center;

    .search-text {
      width: 300px;
      display: flex;
      justify-content: center;
      justify-items: center;

      .search-title {
        flex: 6;
        height: 100%;
        line-height: 60px;
        text-align: center;
        text-align: right;
        vertical-align: middle;
        color: #fff;
        font-size: 14px;
        font-family: Source Han Sans CN;
      }

      .search-content {
        z-index: 10;
        flex: 10;
        position: relative;

        .search-input {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.search-buttons-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

button {
  background-color: transparent !important;
  border: 1px solid #01effa;
  color: #fff;
}

button:hover {
  color: #01effa;
}

/deep/.ivu-input,
.ivu-input-small {
  background-color: transparent;
  border: 1px solid #01effa;
  color: #fff;
  font-size: 12px;
  font-family: Source Han Sans CN;
}

.bottom-content {
  height: calc(~"100% - 60px");
  width: 100%;
  box-shadow: 0px 0px 10px 0px #1fa6d4;
  border: 1px solid #1fa6d4;
}

.table-div {
  height: calc(~"100% - 36px");
  padding: 0 0 0 5px;
  box-sizing: border-box;
  position: relative;
  .spin {
    height: 100%;
    width: 100%;
    background: rgba(21, 29, 44, 0.3);
  }
}

/deep/.ivu-table {
  background: transparent !important;
}

/deep/.ivu-table-wrapper-with-border {
  border: unset;
}

/deep/.ivu-table td {
  background: transparent;
  color: white;
  min-width: 0;
  height: 50px;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
}

/deep/.ivu-page-prev,
/deep/.ivu-page-next,
/deep/.ivu-page-options-elevator input {
  background-color: rgba(1, 239, 250, 0.2);
  color: #fff;
}

/deep/.ivu-page-options-elevator input {
  border: 1px solid #1fa6d4;
}

/deep/.ivu-select-selection {
  border: 1px solid #1fa6d4;
  background: transparent;
  color: #fff;
}

/deep/.ivu-select-dropdown {
  background-color: rgb(30, 42, 69);
  border: 1px solid #fff;
  max-height: 150px;
  overflow-y: auto;
}

/deep/.ivu-select {
  background-color: transparent;
  color: #fff;
}

/deep/.ivu-select-item {
  background-color: transparent;
  color: #fff;
}

/deep/.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background-color: transparent;
  color: #fff;
}

/deep/.ivu-page,
.mini {
  color: #fff;
}

/deep/.ivu-page-item {
  color: #fff;
  // background-color: transparent;
  background: transparent;
  border: 1px solid #01effa !important;
}

/deep/.ivu-page-item a {
  color: #fff;
}

/deep/.ivu-table-column-center {
  background: transparent;
  color: #fff;
  border: unset;
}

/deep/.ivu-table-wrapper-with-border {
  border: unset;
  height: 100%;
}

/deep/.ivu-table-row > td {
  font-size: 14px;
  font-family: Source Han Sans CN;
  border: unset;
}

/deep/.ivu-btn-small {
  margin: 0 3px;

  span {
    font-size: 12px !important;
  }
}

/deep/.page {
  margin-right: 10px;
}

/deep/.ivu-table-border::after {
  background: unset;
}

/deep/.ivu-table-border::before {
  background: #1fa6d4;
}

/deep/.ivu-table {
  overflow: auto;
}

/deep/.ivu-table::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/deep/.ivu-table::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 2px #1fa6d4;
  -webkit-box-shadow: inset 0 0 2px #1fa6d4;
  background: #1fa6d4;
}

/deep/.ivu-table::-webkit-scrollbar-button {
  display: none;
}

/deep/.ivu-table:before {
  display: none;
}

/deep/.page-div {
  border-top: 1px solid #1fa6d4;
  // margin-top: -10px;
  padding: 5px 0;
}

/deep/.ivu-table-cell {
  padding: unset;
}

/deep/.ivu-table-header {
  height: 40px;
}

.search-buttons-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  /deep/.ivu-icon {
    color: #01effa !important;
  }
}

/deep/.ivu-table-header {
  height: 40px;
}
/deep/.ivu-page-total {
  margin: 0;
}
/deep/.ivu-icon-ios-arrow-back:before {
  color: #01effa;
}
/deep/.ivu-icon-ios-arrow-forward:before {
  color: #01effa;
}
/deep/.ivu-page-item-active {
  color: #01effa;
  border-radius: 0;
  background: rgba(1, 239, 250, 0.2);
}
/deep/.ivu-page-item-active:hover a,
/deep/.ivu-page-item-active a {
  color: #01effa;
}
/deep/.ivu-page.mini .ivu-page-next,
/deep/.ivu-page.mini .ivu-page-prev {
  color: #01effa;
  border: 1px solid #01effa;
  border-radius: 0;
}
/deep/.ivu-page.mini .ivu-page-item {
  border-radius: 0;
}
/deep/.ivu-table-border td,
/deep/.ivu-table-border th {
  border-right: 0;
}
/deep/.ivu-table td,
/deep/.ivu-table th {
  border-bottom: 0;
}
/deep/.ivu-table-row td:nth-child(1) {
  color: #fff;
}
/deep/.ivu-table-row td:nth-child(2) {
  cursor: pointer;
}
</style>
