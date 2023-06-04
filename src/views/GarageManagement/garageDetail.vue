/**
 *@author: ljj
 *@Date: 2021-09-10 10:36:37
 *@description: 车辆详情
*/
<script>
export default {
  name: "GarageDetail",
  data() {
    return {
      carInfo: [
        {
          carNo: "鄂A.T0815",
          carType: "临时车",
          carStatus: "出场",
          inOutTime: "2021-09-13 12:30:16",
          pass: "深圳通泰电器西南方向约4米A1",
          src: require("../../../public/img/monitor/carpass1.jpg"),
        },
        {
          carNo: "鄂A.Z9234",
          carType: "私家车",
          carStatus: "出场",
          inOutTime: "2021-09-13 15:34:50",
          pass: "深圳通泰电器西南方向约4米C1",
          src: require("../../../public/img/monitor/carpass3.jpg"),
        },
        {
          carNo: "鄂A.Z1352",
          carType: "临时车",
          carStatus: "进场",
          inOutTime: "2021-09-14 10:13:17",
          pass: "深圳通泰电器西南方向约4米B1",
          src: require("../../../public/img/monitor/carpass4.jpg"),
        },
        {
          carNo: "鄂A.Z5986",
          carType: "临时车",
          carStatus: "进场",
          inOutTime: "2021-09-14 12:32:45",
          pass: "深圳通泰电器西南方向约4米D1",
          src: require("../../../public/img/monitor/carpass.png"),
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<template>
  <Row class="main-panel">
    <Row type="flex" justify="space-around" class="time">
      <Col span="4"> 开始日期 </Col>
      <Col span="8">
        <DatePicker
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          size="small"
          format="yyyy-MM-dd HH:mm"
        ></DatePicker>
      </Col>
      <Col span="4" class="end-time"> 结束日期 </Col>
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
    <Row class="content">
      <div v-for="(item, index) in carInfo" :key="index" class="car-info">
        <div class="left-panel">
          <img :src="item.src" alt="" />
        </div>
        <div class="right-panel">
          <p>车牌：{{ item.carNo }}</p>
          <p>车辆状态：{{ item.carStatus }}</p>
          <p>车辆类型：{{ item.carType }}</p>
          <p>卡口：{{ item.pass }}</p>
          <p>时间：{{ item.inOutTime }}</p>
        </div>
      </div>
    </Row>
  </Row>
</template>

<style lang="less" scoped>
@import "../../styles/drop-down.less";

.main-panel {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .time {
    .time-col {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .start {
        flex: 1;
      }
      .end {
        flex: 3;
      }
    }
    width: 100%;
    height: 35px;
    line-height: 35px;
    color: white;
    padding: 5px 0;
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
      width: 99%;
      height: 155px;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left-panel {
        width: 40%;
        height: 80%;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .right-panel {
        width: 55%;
        height: 80%;
        p {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          line-height: 24px;
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
