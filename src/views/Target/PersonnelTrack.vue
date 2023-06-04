/**
 * @description: 人员轨迹页面
 * @author: wzd
 * @date: 2022-03-09 12:47:58
 */

 <script>
export default {
  name: 'PersonnelTrack',
  data() {
    return {
      personDataId: '', //人员轨迹数据ID
      trackDetailsSrc: '', //人员图片
      personPath: [] //人员路径轨迹
    };
  },
  mounted() {
    let searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    this.personDataId = searchURL.split("&")[0].split("=")[1];
    globalConfig.targetInfoData.map(item => {
      if (item.id == this.personDataId) {
        this.trackDetailsSrc = '/img/target/' + item.image;
        this.personPath = item.path
      }
    })
  },
  methods: {
  },
};
 </script>
 <template>
  <Row class="personnel-track-panel">
    <img
      :src="trackDetailsSrc"
      alt=""
    >
    <div class="time_content">
      <Timeline>
        <TimelineItem
          v-for="(item,index) in personPath"
          :key="index"
        >
          <p
            slot="dot"
            class="time_index"
          >
            {{ index+1 }}
          </p>
          <p>
          </p>
          <p class="time">
            {{ item.time }}
          </p>
          <p class="content">
            {{ item.address }}
          </p>
        </TimelineItem>
      </Timeline>
    </div>
  </Row>
</template>
 <style lang="less" scoped>
.personnel-track-panel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    height: 150px;
    margin: 10px auto;
    display: block;
  }
  .time_content {
    height: calc(~"100% - 160px");
    width: 100%;
    color: #fff;
    box-sizing: border-box;
    padding: 10px;
    .time_index {
      background: #102e3a;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      border: 1px solid #09fbfe;
      margin: 0 auto;
    }
    .time {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #dddddd;
    }
    .content {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
/deep/.ivu-timeline-item-tail {
  border-left: 1px solid #09fbfe;
}
/deep/.ivu-timeline-item-head-blue {
  border-color: #09fbfe;
  color: #09fbfe;
}
/deep/.ivu-timeline-item-head {
  background: transparent;
}
</style>