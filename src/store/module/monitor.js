// 用户模块状态管理
const state = {
  allMonitor: [], //所有监控数据
}

const mutations = {
  //设置Token值
  SET_ALL_MONITOR_VALUE(state, params) {
    state.allMonitor = params;
  },
}

const actions = {

}


const getters = {}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}