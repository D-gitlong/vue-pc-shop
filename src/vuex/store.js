import Vue from 'vue'
import Vuex from 'vuex'

import com from './modules/com'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    user,
    cart
  }
})