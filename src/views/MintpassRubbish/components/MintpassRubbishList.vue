<!--
 * @Author: ZWS
 * @Date: 2022-03-15 16:24:48
 * @LastEditTime: 2022-03-18 12:02:15
 * @Description: 轨迹详情页
-->

<template>
  <div>
    <div class="top-tools">
      <div class="search-text">
        <div class="search-title">编号：</div>
        <div class="search-content">
          <Input
            size="small"
            placeholder="请输入垃圾桶编号"
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
            >搜索</Button
          >
          <Button size="small" icon="md-arrow-back" class="query-btn"
            >返回</Button
          >
          <Button
            size="small"
            type="primary"
            icon="md-refresh"
            class="query-btn"
            >刷新</Button
          >
        </div>
      </div>
    </div>
    <Table disabled-hover :columns="tableColumn" :data="tableData">
      <template slot="capacity" slot-scope="{ row }">
        <span :style="getColor(row.status)">{{ row.status }}</span>
      </template>
      <template slot="options" slot-scope="{ row }">
        <div class="options-wrap" @click="addParkingAreas(row)">定位</div>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: "MintpassRubbishList",
  data() {
    return {
      tableColumn: [
        {
          key: "OBJECTID",
          align: "center",
          title: "编号",
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "状态",
          slot: "capacity",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          slot: "options",
        },
      ],
      tableData: globalConfig.MintpassRubbish,
    };
  },
  methods: {
    addParkingAreas(row) {
      this.$emit("locusData", row);
      this.$emit("flyToBike", row);
    },
    getColor(type) {
      let color = "#30fafc";
      if (type === "溢出") {
        color = "#ec9230";
      } else if (type === "异味") {
        color = "#f56803";
      } else if (type == "故障") {
        color = "#e13f20";
      }
      return `color:${color}`;
    },
    addEventList(data) {
      this.$emit("addRubbishList", data);
    },
  },
  created() {
    const list = [];
    this.tableData.forEach((it) => {
      if (it.status !== "正常") {
        list.push(it);
      }
    });
    this.addEventList(list);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/common2.less";
.options-wrap {
  cursor: pointer;
  color: #2ce0e7;
}
/deep/ .ivu-table td {
  height: 34px;
}

/deep/.ivu-table-body {
  overflow-y: auto;
  overflow-x: hidden;
  height: 17vh;
}
</style>

