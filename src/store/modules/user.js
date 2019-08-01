import Vue from 'vue'
import { login, getBackMenus, logOff } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data

            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token) // 设置token

            commit(
              'SET_AVATAR',
              result.avatar ||
                'http://cdn.duitang.com/uploads/item/201407/24/20140724190906_MCkXs.thumb.700_0.jpeg'
            ) // 设置头像

            commit('SET_NAME', result.username) // 设置昵称
            commit('SET_INFO', result) // 设置用户信息

            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetBackMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getBackMenus()
          .then(response => {
            const result = response.data
            console.log('user:', result)
            if (result && result.resourceItems.length > 0) {
              const role = result
              role.permissionList = role.resourceItems.map(permission => {
                return permission.id
              })

              commit('SET_ROLES', result)
            } else {
              reject(new Error('getMenus: roles must be a non-null array !'))
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOff ({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logOff(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user
