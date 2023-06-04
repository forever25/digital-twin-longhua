<!--
 * @Author: ZWS
 * @Date: 2022-03-15 09:41:13
 * @LastEditTime: 2022-03-15 11:55:00
 * @Description: 文件描述
-->
<template>
  <Table disabled-hover :columns="tableColumn" :data="tableData">
    <template slot="capacity" slot-scope="{ row }">
      {{ row.capacity }} 辆
    </template>
    <template slot="options" slot-scope="{ row }">
      <div class="options-wrap" @click="addParkingAreas(row)">定位</div>
    </template>
  </Table>
</template>

<script>
export default {
  name: "ParkingAreas",
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
          key: "postId",
          width: 60,
          align: "center",
          title: "编号",
        },
        {
          title: "容量",
          slot: "capacity",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          slot: "options",
        },
      ],
      tableData: globalConfig.BikeSharingInfo.ParkingAreas,
    };
  },
  methods: {
    addParkingAreas(row) {
      this.$emit("addParkingAreas", row);
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