import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    isShowSearch: false
}

const actions = {
    isShowSearch({commit}, status){
        commit(types.COM_IS_SHOW_SEARCH, status)
    }
}

const getters = {
    isShowSearch: state => state.isShowSearch
}


const mutations = {
    [types.COM_IS_SHOW_SEARCH](state, status){
        state.isShowSearch = status
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}