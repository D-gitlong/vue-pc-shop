import axios from 'axios'
import store from '@/vuex/store'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = window.GLOBAL_CONFIG.API_HOST; //请求地址
axios.defaults.headers['Accept'] = 'application/json, text/plain, */*'
axios.defaults.headers['content-Type'] = 'application/json'
axios.defaults.headers.common['X-ECAPI-UserAgent'] = 'Platform/Wechat'
axios.defaults.headers.common['X-ECAPI-UDID'] = 'null';
axios.defaults.headers.common['X-ECAPI-Ver'] = "1.1.0";
axios.defaults.headers.common['X-ECAPI-Sign'] = 'null';
// 请求添加头部信息
axios.interceptors.request.use((config) => {
  // config.headers = {
  //   "Authorization": "Bearer " + localStorage.getItem('auth_token'),
  //   "Accept": "application/json, text/plain, */*",
  //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "x-requested-with,content-type"
  // }
  return config;
},(error) =>{
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
  // if(!res.data.success){
  //   //console.log(res)
  //     //_.toast(res.data.msg);
  //     return Promise.reject(res);
  // }
  return res;
}, (error) => {
    //_.toast("网络异常", 'fail');
    console.log("网络异常");
    return Promise.reject(error);
});

export function Post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function Get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url,params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
  */
  Login(params) {
    return Post('/v2/ecapi.auth.signin', params)
  },
  /**
   * 用户注册
   */
  Signup(params) {
    return Post('/v2/ecapi.auth.mobile.signup', params)
  },
  /**
   * 把token存到http的header
   */
  setHeader(params){
    axios.defaults.headers.common['X-ECAPI-Authorization'] = params;
  },
  /**
   * 首页菜单栏
   */
  Menus(params){
    return Post('/v2/home.nav.list', params)
  },
  /**
   * 首页菜单栏分类
   */
  Cate(params){
    return Post('/v2/ecapi.category.list', params)
  },
  /**
   * 首页banner图
   */
  Banner(params){
    return Post('/v2/ecapi.banner.list', params)
  },
  /**
   * 首页新品、精品、销量的产品列表
   */
  RecommentProduct(params){
    return Post('/v2/ecapi.home.product.list', params)
  },
  /**
   * 首页楼层分类产品列表
   */
  TypeList(params){
    return Post('/v2/home.goods.list.type', params)
  },
  /**
   * 用户协议
   */
  UserProtocol(params){
    return Post('/v2/ecapi.site.get', params)
  },
  /**
   * 用户信息
   */
  UserInfo(params){
    return Post('/v2/ecapi.user.profile.get', params)
  },
  /**
   * 验证手机号是否注册
   */
  MobileVerify(params){
    return Post('/v2/ecapi.auth.mobile.verify', params)
  },
  /**
   * 发送验证码
   */
  SendCode(params){
    return Post('/v2/ecapi.auth.mobile.send', params)
  },
  /**
  * 产品列表
  */
  ProductList(params) {
    return Post('/v2/ecapi.product.list', params)
  },
   /**
  * 类型产品列表
  */
  ProductTypeList(params) {
    return Post('/v2/ecapi.type.product.list', params)
  },
   /**
  * 类型产品列表
  */
  SearchKeyword(params) {
    return Post('/v2/ecapi.search.keyword.list', params)
  },
  /**
  * 产品详情
  */
  ProductDetails(params) {
    return Post('/v2/ecapi.product.get', params)
  },
  /**
  * 添加到购物车
  */
  AddCart(params) {
    return Post('/v2/ecapi.cart.add', params)
  },
  /**
  * 购物车列表
  */
  Cart(params) {
    return Post('/v2/ecapi.cart.get', params)
  },
  /**
  * 产品评论列表
  */
  ProductComment(params) {
    return Post('/v2/ecapi.review.product.list', params)
  },
  /**
  * 购物车列表
  */
  Cart(params) {
    return Post('/v2/ecapi.cart.get', params)
  },
  /**
  * 更新购物车
  */
  CartUpdate(params) {
    return Post('/v2/ecapi.cart.update', params)
  },
  /**
  * 购物车-删除商品
  */
  Delete(params) {
    return Post('/v2/ecapi.cart.delete', params)
  },
  /**
  * 收货地址管理
  */
  Consignee(params) {
    return Post('/v2/ecapi.consignee.list', params)
  },
  /**
  * 添加收货地址
  */
  ConsigneeAdd(params) {
    return Post('/v2/ecapi.consignee.add', params)
  },
  /**
  * 更新收货地址
  */
  ConsigneeUpdate(params) {
    return Post('/v2/ecapi.consignee.update', params)
  },
  /**
  * 更新设置默认收货地址
  */
  ConsigneeSetDefault(params) {
    return Post('/v2/ecapi.consignee.setDefault', params)
  },
  /**
  * 删除收货地址
  */
  ConsigneeDelete(params) {
    return Post('/v2/ecapi.consignee.delete', params)
  },
  /**
  * 删除收货地址
  */
  orderPrice(params) {
    return Post('/v2/ecapi.order.price', params)
  },
  /**
  * 获取消费积分
  */
  Scroe(params) {
    return Post('/v2/ecapi.score.get', params)
  },
  /**
  * 提交订单
  */
  SubmitOrder(params) {
    return Post('/v2/ecapi.cart.checkout', params)
  },
  /**
  * 我的订单
  */
  MyOrder(params) {
    return Post('/v2/ecapi.order.list', params)
  },
  /**
  * 确认收货
  */
  ConfirmOrder(params) {
    return Post('/v2/ecapi.order.confirm', params)
  },
  /**
  * 取消订单
  */
  CancelOrder(params) {
    return Post('/v2/ecapi.order.cancel', params)
  },
  /**
  * 删除订单
  */
  DelOrder(params) {
    return Post('/v2/ecapi.order.del', params)
  },
  /**
  * 加入收藏列表
  */
  Like(params) {
    return Post('/v2/ecapi.product.like', params)
  },
  /**
  * 取消收藏列表
  */
  UnLike(params) {
    return Post('/v2/ecapi.product.unlike', params)
  },
  /**
  * 收藏列表
  */
  LikeList(params) {
    return Post('/v2/ecapi.product.liked.list', params)
  },
  /**
  * 订单详情
  */
  OrderInfo(params) {
    return Post('/v2/ecapi.order.get', params)
  }
}