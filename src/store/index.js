import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import monitor from './module/monitor'
import imgDisplay from './module/imgDisplay'


Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { // 模块引用
    user,
    monitor,
    imgDisplay
  }
});

export default store;