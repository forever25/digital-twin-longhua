import Vue from 'vue';
import Router from 'vue-router';
import Home from "../views/Home.vue";
import Attractions from '../components/otherComponents/Attractions.vue';
import BikeDetail from "../views/Bike/bikeDetail.vue"
import bikeDetailTow from "../views/Bike/bikeDetailTow.vue"
import BikeDetailTree from "../views/Bike/BikeDetailTree.vue"
import Monitor from '../views/Video/Monitor.vue';
import PersonnelTrack from "../views/Target/PersonnelTrack.vue"
import HeartRate from "../views/Target/HeartRate.vue"

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: {
      name: 'Home',
    },
  }, //设置当为空的时候，自动跳转到登录页面；
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  }, // 智慧工地登录页
  {
    path: '/Attractions',
    name: 'Attractions',
    component: Attractions,
  }, {
    path: '/Monitor',
    name: 'Monitor',
    component: Monitor,
  },
  {
    path: '/BikeDetail',
    name: 'BikeDetail',
    component: BikeDetail,
  }, {
    path: '/PersonnelTrack',
    name: 'PersonnelTrack',
    component: PersonnelTrack,
  },
  {
    path: '/HeartRate',
    name: 'HeartRate',
    component: HeartRate,
  },
  {
    path: '/bikeDetailTow',
    name: 'bikeDetailTow',
    component: bikeDetailTow,
  },
  {
    path: '/BikeDetailTree',
    name: 'BikeDetailTree',
    component: BikeDetailTree,
  }
  ],
});