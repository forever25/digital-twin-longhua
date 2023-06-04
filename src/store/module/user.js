// 用户模块状态管理
const state = {
  tokenValue: '', //用户token值
}

const mutations = {
  //设置Token值
  SET_TOKEN_VALUE(state, params) {
    state.tokenValue = params
  },
}

const actions = {

}


const getters = {
  tokenValue: state => state.tokenValue
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}