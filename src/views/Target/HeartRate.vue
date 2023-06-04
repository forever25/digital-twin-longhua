<!--
 * @Author: ZWS
 * @Date: 2022-03-18 14:54:48
 * @LastEditTime: 2022-03-18 15:24:25
 * @Description: 文件描述
-->

<template>
  <div>
    <ul class="wrap-info">
      <li class="item">
        <img src="@/assets/HeartRate/xl.png" alt="" /><span>{{ xl }}</span>
      </li>
      <li class="item">
        <img src="@/assets/HeartRate/xy.png" alt="" /><span>{{ xy }}%</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeartRate",
  data() {
    return {
      setTimeItem: null,
      xl: Math.floor(Math.random() * 60) + 60,
      xy: Math.floor(Math.random() * 5) + 94,
    };
  },
  methods: {
    caretSetTimeout() {
      window.clearTimeout(this.setTimeItem);
      this.setTimeItem = setTimeout(() => {
        this.xl = Math.floor(Math.random() * 60) + 60;
        this.xy = Math.floor(Math.random() * 5) + 94;
        this.caretSetTimeout();
      }, 1000);
    },
  },
  created() {
    this.caretSetTimeout();
  },
  beforeCreate() {
    window.clearTimeout(this.setTimeItem);
  },
};
</script>

<style lang="less" scoped>
.wrap-info {
  height: 100px;
  padding: 0 60px;
  li.item {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: auto;
      height: 100%;
    }
    span {
      font-size: 40px;
      color: rgb(255, 99, 32);
    }
  }
}
</style>