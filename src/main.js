import '../public/systemConfig'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as EarthView from '../public/sdk/earth/earthview.js';
import '../public/sdk/earth/Widgets/widgets.css';
import * as echarts from 'echarts';
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'
import './styles/reset.less'
import './processingData/index'
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})
Vue.prototype.$EarthView = EarthView;
Vue.prototype.$Echarts = echarts;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");