<script>
import {
  Message
} from 'view-design';
export default {
  name: 'Monitor',
  data() {
    return {
      monitorData: "",
    }
  },
  created() {
  },
  mounted() {
    let searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    let targetPageId = searchURL.split("&")[0].split("=")[1];
    globalConfig.monitorInfo.map(item => {
      if (item.id == targetPageId) {
        this.monitorData = item.videoSrc;
      }
    })
  },
  methods: {}
};
</script>
<template>
  <Row
    ref="monitorPanel"
    class="monitor-panel"
  >
    <video
      ref="myVideo"
      class="video-panel"
      controls="true"
      autoplay="true"
      loop="true"
      muted="muted"
    >
      <source
        :src="require(`../../../public/video/${Math.ceil(Math.random() * 6)}.mp4`)"
        type="video/mp4"
      />
    </video>
  </Row>
</template>
<style lang="less" scoped>
.monitor-panel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .video-panel {
    width: 100%;
    height: 100%;
  }
  video {
    object-fit: fill;
  }
}
</style>