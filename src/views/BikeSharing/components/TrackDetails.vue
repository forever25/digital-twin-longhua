<!--
 * @Author: ZWS
 * @Date: 2022-03-15 16:24:48
 * @LastEditTime: 2022-03-15 17:01:33
 * @Description: 共享单车列表
-->

<template>
  <Table disabled-hover :columns="tableColumn" :data="data">
    <template slot="options" slot-scope="{ row }">
      <div class="options-wrap" @click="addParkingAreas(row)">轨迹</div>
    </template>
  </Table>
</template>

<script>
export default {
  name: "BikeSharingList",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
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
          title: "最后使用时间",
          key: "endTime",
          align: "center",
        },
        {
          title: "使用时长",
          key: "utilityTime",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          slot: "options",
        },
      ],
    };
  },
  methods: {
    addParkingAreas(row) {
      this.$emit("trackDetails", row);
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

