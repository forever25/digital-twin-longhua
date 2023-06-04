// 用户模块状态管理
const state = {
  imgData: {
    show: false,
  },
}

const mutations = {
  SET_IMG_LIST_VALUE(state, params) {
    console.log(222)
    // let data = Object.assign(state.imgData, params)
    state.imgData = params
  },
}

const actions = {

}


const getters = {
  imgData: state => state.imgData
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}