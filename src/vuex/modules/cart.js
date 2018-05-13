import API from '@/api/api'
import * as types from '../types'
import router from '@/router'
import { Message } from 'element-ui'

const state = {
  cartCount : 0,
  product: {},
  num: 1,
  price: 0,
  currentAttrs: [],
  optionalAttrs: [],
  currentStock: null,
  goods: null
}

const actions = {
  /**
   * 购物车数量
   */
  getCartCount({commit}, res){
    commit(types.GET_CART_COUNT,res)
  },
  /**
   * 加入购物车
   */
  addToCar({dispatch, commit}, res){
    if (!window.localStorage.getItem('token')) {
      router.push('/login')
      return false
    }
    let stock = false;
    if (state.currentStock) {
      stock = state.currentStock.stock_number <= 0 ? true : false
    }
    if (state.product.good_stock <= 0 || stock) {
      Message({
        message: '库存不足',
        type: 'warning',
        customClass: 'com_tips'
      })
      return false
    }
    
    let attrs = [].concat(state.currentAttrs).concat(state.optionalAttrs);
    let amount = Number(state.num)
    let data={
      product: router.currentRoute.params.id,
      property: JSON.stringify(attrs),
      amount: amount
    }

    API.AddCart(data)
    .then((response)=>{
      if(response.data.error_code == 0){
        Message({
          message: '已加入到购物车',
          type: 'success',
          customClass: 'com_tips'
        })
        dispatch('getCartAmount')
        commit(types.GET_CART_COUNT,parseInt(state.num)+parseInt(state.cartCount))
      }else{
        Message({
          message: response.data.error_desc,
          type: 'warning',
          customClass: 'com_tips'
        })
      }
    })
  },
  getCartAmount({commit}, res) {
    API.Cart()
    .then((response)=>{
      if (response.data.error_code == 0) {
        let orderlist = response.data.goods_groups
        orderlist.forEach((el)=>{
          commit(types.GET_CART_COUNT,el.total_amount)
        })
      }
    })
  },
  goodsFun({commit}, res) {
    commit(types.GET_CART_GOODS,res)
  }
}

const getters = {
	goodsNumber: state => state.cartCount,
  getGoods: state => state.goods = JSON.parse(sessionStorage.getItem('goods'))
}

const mutations = {
  [types.GET_CART_COUNT](state, res) {
    state.cartCount = res
  },
  [types.GET_CART_GOODS](state, res) {
    sessionStorage.setItem('goods',JSON.stringify(res))
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}