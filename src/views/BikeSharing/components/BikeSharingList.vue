<!--
 * @Author: ZWS
 * @Date: 2022-03-15 16:24:48
 * @LastEditTime: 2022-03-15 19:15:29
 * @Description: 轨迹详情页
-->

<template>
  <Table disabled-hover :columns="tableColumn" :data="tableData">
    <template slot="options" slot-scope="{ row }">
      <div class="options-wrap" @click="addParkingAreas(row)">定位</div>
    </template>
  </Table>
</template>

<script>
export default {
  name: "BikeSharingList",
  data() {
    return {
      tableColumn: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号",
        },
        {
          key: "code",
          width: 60,
          align: "center",
          title: "编号",
        },
        {
          title: "类型",
          key: "type",
          align: "center",
        },
        {
          title: "最后使用时间",
          key: "endTime",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          slot: "options",
        },
      ],
      tableData: globalConfig.BikeSharingInfo.bikeInfo,
    };
  },
  methods: {
    addParkingAreas(row) {
      this.$emit("locusData",row)
      this.$emit("flyToBike", row);
    },
  },
};
</script>

<style lang="less" scoped>
.options-wrap {
  cursor: pointer;
  color: #2ce0e7;
}
</style>

