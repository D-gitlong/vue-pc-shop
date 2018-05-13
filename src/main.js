// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import './assets/scss/reset.css'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-green/index.css'
import axios from 'axios'

import App from './App'

import API from './api/api.js'
Vue.prototype.$API = API
Vue.prototype.$HTTP = axios
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error: require('./assets/images/error.png'),
  loading: require('./assets/images/loading.gif')
})

Vue.use(ElementUI)

Vue.config.productionTip = false

if (!localStorage.getItem('equipId')) {
	var today = new Date();    
	var day   = today.getDate();
	var month = today.getMonth() + 1;
	var years=today.getFullYear();
	month = month<10?"0"+month:month;
	day = day<10?"0"+day:day;  
	var hh=today.getHours();
	hh = hh<10?"0"+hh:hh;  
	var ii=today.getMinutes();
	ii = ii<10?"0"+ii:ii;  
	var ss= today.getSeconds();
	ss = ss<10?"0"+ss:ss;
	var equipId = years+month+day+hh+ii+ss+Math.random().toString(32).substr(2).slice(0,6);
	localStorage.setItem('equipId', equipId);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
