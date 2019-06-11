import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

     
        commit('SET_TOKEN', 'token')
        setToken('token')
    return;
  },

  // get user info
  getInfo({ commit, state }) {

        commit('SET_NAME', 'admin')
        commit('SET_AVATAR', 'http://shareskong.oss-cn-shanghai.aliyuncs.com/userstmp/LDvjCGpKUlif4XJswD7NgkbjkUhzu94fdbxcqaSq.jpeg')
      return;
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    removeToken()
    return;
  },

  // remove token
  resetToken({ commit }) {
    commit('SET_TOKEN', '')
    removeToken()
    return;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

