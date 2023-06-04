
/**
 *@author: ljj
 *@Date: 2022-03-14 16:29:50
 *@description: 事件列表组件
*/
<script>
export default {
  name: "EventList",
  data() {
    return {
      loading: false,
      columns: [
        {
          type: "index",
          width: 80,
          align: "center",
          title: "序号",
        },
        {
          title: "事件类型",
          key: "eventType",
          align: "center",
          sortable: false,
          tooltip: true,
          minWidth: 80,
          ellipsis: true,
          tooltip: true,
          // render: (h, params) => {
          //   return h('div', {
          //     style: {
          //       color: "#2A9CF6"
          //     },
          //     on: {
          //       click: () => {
          //         this.$emit("flyToBike", params.row)
          //       }
          //     }
          //   }, params.row.eventType)
          // }
        },
        {
          title: "时间",
          key: "time",
          align: "center",
          sortable: false,
          tooltip: true,
          ellipsis: true,
          minWidth: 80,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#30E0D0",
                },
              },
              params.row.time
            );
          },
        },
        {
          title: "描述",
          key: "desc",
          // key:"time"
          align: "center",
          sortable: false,
          tooltip: true,
          minWidth: 200,
          ellipsis: true,
        },
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 135,
        //   align: "center",
        //   fixed: "right",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             icon: "ios-eye",
        //             size: "small",
        //           },
        //           style: {
        //             background: "transparent",
        //             border: "none",
        //             color: "#D1A431",
        //             fontSize: "14px",
        //           },
        //           on: {
        //             click: () => {
        //               // this.chooseProcess(params.row);
        //             },
        //           },
        //         },
        //         "详情"
        //       ),
        //     ]);
        //   },
        // },
      ],
      eventData: [
        {
          eventType: "垃圾桶溢出",
          time: "2022-02-23",
          desc: "艺冠广告设计制作 西南方向约4米 垃圾溢出",
        },
        {
          eventType: "通道阻塞",
          time: "2022-02-23",
          desc: "宏发门窗 西南方向约5米 消防通道阻塞 尽快处理",
        },
        {
          eventType: "一键呼叫",
          time: "2022-02-23",
          desc: "46栋智能检测设备检测到呼叫",
        },
        {
          eventType: "垃圾异味",
          time: "2022-02-23",
          desc: "34栋后 美发7米处垃圾异味",
        },
        {
          eventType: "通道阻塞",
          time: "2022-02-23",
          desc: "视频监测有人占道经营",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<template>
  <Row class="main-panel">
    <div class="table-div">
      <spin class="spin" v-if="loading" fix>加载中...</spin>
      <Table
        ref="table"
        :columns="columns"
        :data="eventData"
        border
        sortable="custom"
      ></Table>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 100%;
  width: 100%;
  position: relative !important;
  .table-div {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
}
/deep/.ivu-table {
  border: none;
  background: transparent;
}
/deep/.ivu-table-border td,
/deep/ .ivu-table-border th {
  border-color: transparent;
  background: transparent !important;
  color: #dbdce1;
}
/deep/.ivu-table th {
  background: transparent;
}
/deep/.ivu-table-wrapper-with-border {
  border: 0px;
  height: auto;
  width: 100%;
}
/deep/.ivu-table:before,
/deep/.ivu-table-border:after {
  background: transparent;
}
/deep/.ivu-table td {
  color: #04b5d2;
}
/deep/.ivu-table-fixed-right::before,
/deep/.ivu-table-fixed::before {
  background-color: transparent;
}
// /deep/.ivu-table {
//   overflow: scroll;
// }

// /deep/.ivu-table::-webkit-scrollbar {
//   width: 0px;
//   height: 0px;
// }

// /deep/.ivu-table::-webkit-scrollbar-thumb {
//   border-radius: 4px;
//   box-shadow: inset 0 0 2px #1fa6d4;
//   -webkit-box-shadow: inset 0 0 2px #1fa6d4;
//   background: #1fa6d4;
// }
</style>
