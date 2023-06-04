<script>
import { mapMutations } from 'vuex';
export default {
  name: 'AttractionsModal',
  data() {
    return {
      show: true,
      value2: 0,
      setting: {
        dots: 'none',
        arrow: "never",
      },
      attractionsImgList: [],
      attractionsDesc: ''
    }
  },
  mounted() {
    let searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    let targetPageId = searchURL.split("&")[0].split("=")[1];
    globalConfig.attractions.map(item => {
      if (item.id == targetPageId) {
        if (item.imgSrc) { this.attractionsImgList = item.imgSrc }
        if (item.desc) { this.attractionsDesc = item.desc }
      }
    })
  },
  computed: {
    imgData() {
      return this.$store.state.imgDisplay.imgData
    },
  },
  watch: {
    imgData: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations('imgDisplay', [ // 1. 第一个参数module（模块）名称，第二个参数模块中的mutations里的方法名
      'SET_IMG_LIST_VALUE'
    ]),
    CarouselItemClick() {
      let data = {
        imgList: this.attractionsImgList,
        show: true,
      }
      this.SET_IMG_LIST_VALUE(data)
    },
    errorImg() { }
  },
}
</script>
<template>
  <Row class="main-panel">
    <div class="img_list">
      <Carousel
        v-model="value2"
        :dots="setting.dots"
        :arrow="setting.arrow"
        autoplay
        :loop="attractionsImgList.length>1"
      >
        <CarouselItem
          v-for="(item,index) in attractionsImgList"
          :key="index"
        >
          <div class="demo-carousel">
            <img
              :src="item"
              alt=""
              @click="CarouselItemClick"
            >
          </div>
        </CarouselItem>
      </Carousel>
      <!-- <viewer :images="attractionsImgList">
        <img
          v-for="(src,index) in attractionsImgList"
          :src="src"
          :key="index"
          :onerror="errorImg"
        >
      </viewer> -->
    </div>
    <div class="desc">
      <p
        v-html="attractionsDesc"
        class="p_desc"
      ></p>
    </div>
  </Row>
</template>

<style lang="less" scoped>
.main-panel {
  height: 300px;
  width: 400px;
  display: flex;
  overflow: unset;
  color: #fff;
  background: rgba(63, 72, 84, 0.8);
  .img_list {
    width: 40%;
    height: 300px;
    img {
      display: block;
      height: 240px;
      width: 160px;
    }
  }
  .desc {
    width: 60%;
    height: 300px;
    box-sizing: border-box;
    color: #fff;
    // padding: 5px 0px 5px 10px;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 1px;
    font-family: Source Han Sans CN;
    padding: 5px;
    user-select: none;
    .p_desc {
      height: 240px;
      padding: 10px;
      width: 100%;
      overflow: scroll;
      box-sizing: border-box;
      font-size: 14px;
      text-indent: 2rem;
      letter-spacing: 1px;
    }
    .p_desc::-webkit-scrollbar {
      width: 3px;
      height: 1px;
    }

    .p_desc::-webkit-scrollbar-thumb {
      border-radius: 4px;
      box-shadow: inset 0 0 2px #1fa6d4;
      -webkit-box-shadow: inset 0 0 2px #1fa6d4;
      background: #1fa6d4;
    }

    .p_desc::-webkit-scrollbar-button {
      display: none;
    }
  }
  .img_viewer {
    height: 100%;
    width: 100%;
  }
}
/deep/.ivu-carousel {
  height: 240px;
  width: 100%;
}
</style>
