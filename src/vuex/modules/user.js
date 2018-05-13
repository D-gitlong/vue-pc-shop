import api from '@/api/api'
import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    token: localStorage.getItem('token'),
    user: ''
}

const actions = {
    /**
     * 用户登录
     */
    setToken({commit}, res){
        localStorage.setItem('token', res)
        localStorage.setItem('loginStatus', true)
        commit(types.SET_TOKEN,res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('token')
        commit(types.SET_TOKEN, '')
        commit(types.SET_LOGIN_STATUS, false)
    }
}

const getters = {
    getToken: state => state.token,
    getLoginStatus: state => state.loginStatus
}

const mutations = {
    [types.SET_TOKEN](state, res) {
        state.token = res
    },
    [types.SET_LOGIN_STATUS](state, res) {
        state.loginStatus = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}