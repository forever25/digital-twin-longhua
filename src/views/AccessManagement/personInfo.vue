/**
 *@author: ljj
 *@Date: 2021-09-10 11:52:25
 *@description: 人员信息组件
*/
<script>
export default {
  name: 'PersonInfo',
  data() {
    return {
      carInfo: [
        { personNo: "344321198109181154", personName: "刘亦菲", outTime: "2021-09-08 07:30:16", inTime: "", src: require("../../../public/img/access/person.png") },
        { personNo: "254155872698255861", personName: "谢梦雨", outTime: "2021-09-8 08:30:16", inTime: "", src: require("../../../public/img/access/person1.jpg") },
        { personNo: "344321198109181154", personName: "刘亦菲", outTime: "", inTime: "2021-09-08 12:30:16", src: require("../../../public/img/access/person.png") },
        { personNo: "254155872698255861", personName: "谢梦雨", outTime: "", inTime: "2021-09-08 18:45:46", src: require("../../../public/img/access/person1.jpg") },

      ]
    }
  },
  mounted() { },
  methods: {},
}
</script>
<template>
  <Row class="main-panel">
    <Row
      type="flex"
      justify="space-around"
      class="time"
    >
      <Col span="4">
      入场日期
      </Col>
      <Col span="8">
      <DatePicker
        type="date"
        placeholder="请选择日期"
        style="width: 100%"
        size="small"
        format="yyyy-MM-dd HH:mm"
      ></DatePicker>
      </Col>
      <Col
        span="4"
        class="end-time"
      >
      出场日期
      </Col>
      <Col span="8">
      <DatePicker
        type="date"
        placeholder="请选择日期"
        style="width: 100%"
        size="small"
        format="yyyy-MM-dd HH:mm"
      ></DatePicker>
      </Col>
    </Row>
    <div class="content">
      <div
        v-for="(item,index) in carInfo"
        :key="index"
        class="car-info"
      >
        <div class="left-panel">
          <img
            :src="item.src"
            alt=""
          >
        </div>
        <div class="right-panel">
          <p>姓名：{{ item.personName }}</p>
          <p>身份证号：{{ item.personNo }}</p>
          <p>入场时间：{{ item.inTime }}</p>
          <p>出场时间：{{ item.outTime }}</p>
        </div>
      </div>
    </div>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/drop-down.less";
.main-panel {
  height: 100%;
  width: 100%;
  position: relative;
  .time {
    width: 100%;
    height: 35px;
    line-height: 35px;
    color: white;
    padding: 5px;
  }
  .content {
    height: calc(~"100% - 30px");
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    .car-info {
      background: rgba(186, 184, 255, 0.1);
      box-shadow: 0px 0px 10px 0px #1fa6d4;
      border: 1px solid #1fa6d4;
      width: 95%;
      height: 155px;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left-panel {
        width: 38%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 140px;
          width: 140px;
        }
      }
      .right-panel {
        width: 60%;
        height: 80%;
        p {
          font-size: 14px;
          width: 100%;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          line-height: 28px;
        }
      }
    }
  }
  .content {
    overflow: auto;
  }

  .content::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .content::-webkit-scrollbar-thumb {
    border-radius: 4px;
    box-shadow: inset 0 0 2px #1fa6d4;
    -webkit-box-shadow: inset 0 0 2px #1fa6d4;
    background: #1fa6d4;
  }

  .content::-webkit-scrollbar-button {
    display: none;
  }
}
/deep/.ivu-input-suffix {
  display: none;
}
/deep/.ivu-input-small {
  background: transparent;
  color: white;
  border: 1px solid #1fa6d4;
}
/deep/.ivu-picker-panel-body {
  color: #000;
}
.end-time {
  padding-left: 5px;
  box-sizing: border-box;
}
</style>
