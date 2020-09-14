// 入口文件 redux里面固定的函数方法
import {request} from "./core";
import {METHOD,PATH} from "./config";

 
const netClient = {   
  // 获取swiper和十宫格
  swiperlist(params){ 
    return request(METHOD.GET,PATH.swiperlist,params)
  },
  // 获取商品列表
  shanglist(params){
    return request(METHOD.GET,PATH.shanglist,params)
  },
  // 获取一级分类数据
  fenlei(params){
    return request(METHOD.GET,PATH.fenlei,params)
  },
   // 获取分类列表数据
   fenlist(params){
    return request(METHOD.GET,PATH.fenlist,params)
  },
   // 手机号是否被注册
   shouji(params){
    return request(METHOD.GET,PATH.shouji,params)
  },
  // 验证用户名是否可用
  name(params){
    return request(METHOD.GET,PATH.name,params)
  },
  // 发送验证码
  Verification(params){
    return request(METHOD.GET,PATH.Verification,params)
  },
  // 添加登录信息
  adddl(params){
    return request(METHOD.POST,PATH.adddl,params)
  },
  // 登录验证
  Loginyan(params){
    return request(METHOD.POST,PATH.Loginyan,params)
  },
  // 详情数据
  xiangList(params){
    return request(METHOD.GET,PATH.xiangList,params)
  },
  // 添加购物车
  addcarts(params){
    return request(METHOD.POST,PATH.addcarts,params)
  },
  // 获取购物车信息
  huocarts(params){
    return request(METHOD.GET,PATH.huocarts,params)
  },
  // 删除购物车
  delcarts(params){
    return request(METHOD.PATCH,PATH.delcarts,params)
  },
  // 修改购物车中商品的数量
  bjqsave(params){
    console.log(params)
    return request(METHOD.PATCH,PATH.bjqsave,params)
  },
  // 多个删除
  duodel(params){
    console.log(params)
    return request(METHOD.PATCH,PATH.duodel,params)
  },
  //展示订单信息
  dinglist(params){
    console.log(params)
    return request(METHOD.GET,PATH.dinglist,params)
  },
  // 添加用户的收货地址
  addDizhi(params){
    console.log(params)
    return request(METHOD.POST,PATH.addDizhi,params)
  },
  // 修改用户的收货地址
  xiuDizhi(params){
    console.log(params)
    return request(METHOD.PATCH,PATH.xiuDizhi,params)
  },
  // 获取用户的收货地址
  huoDizhi(params){
    return request(METHOD.GET,PATH.huoDizhi,params)
  },
  // 删除用户的收货地址
  delDizhi(params){
    return request(METHOD.PATCH,PATH.delDizhi,params)
  },
  // 验证支付密码
  yanZhifu(params){
    return request(METHOD.POST,PATH.yanZhifu,params)
  },
  // 订单的支付
  Zhifu(params){
    return request(METHOD.POST,PATH.Zhifu,params)
  },
  // 创建订单
  createDingdan(params){ 
    return request(METHOD.POST,PATH.createDingdan,params)
  },
  // 支付宝
  ZhiFuBao(params){
    return request(METHOD.POST,PATH.ZhiFuBao,params)
  },
  // 热搜
  ReSearch(params){
    return request(METHOD.GET,PATH.ReSearch,params)
  },
  //搜索列表
  SearchList(params){
    return request(METHOD.GET,PATH.SearchList,params)
  },
}
export default netClient;


