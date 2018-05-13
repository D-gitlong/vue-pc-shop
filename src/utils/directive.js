import Vue from 'vue'

// 金额格式化
Vue.filter('fmoney', function(val) {
  if (!val) { return ''; }
  return Number(val).toFixed(2);
});

// 手机号码格式化
Vue.filter('fmobile', function(val) {
  if (!val) { return ''; }
  return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
});

// 日期格式化
Vue.filter('formatDate', function(d, fmt) {
  if (!d) { return ''; }
  fmt = 'yyyy-MM-dd hh:mm:ss';
  let date = new Date(d*1000);
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
});

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}