//  配置文件
export const METHOD = {
  GET: "get",
  POST: "post",
  PATCH: "patch"
} 

// 每个路径
export const PATH = {
  swiperlist: "/api/Home/getHomeREC",//首页轮播
  shanglist: "/api/Home/getHomeShowGoods",//商品列表 
  fenlei: "/api/Goods/getCatsTree",//分类一级
  fenlist: "/api/Goods/getCadGoods", //分类列表
  shouji: "/api/Verify/GetPhone",//手机号是否被注册
  name: "/api/Verify/LoginName",//验证用户名是否可用
  Verification: "/api/SMSCode/GetCode",//发送验证码
  adddl: "/api/LoginPage/AddLogin",//添加登录信息
  Loginyan: "/api/LoginPage/Login",//登录验证
  xiangList: "/api/Goods/GetGoodsInfo",//详情数据
  addcarts: "/api/Cart/addCart",//添加购物车
  huocarts: "/api/Cart/getCart",//获取购物车信息
  delcarts: "/api/Cart/DeleteCart",//删除购物车
  bjqsave: "/api/Cart/patchCartNum",//修改购物车中商品的数量
  duodel:"/api/Cart/DeleteCart",//删除购物车中选中的商品  多个删除
  dinglist:"/api/Order/getOrderInfo",//展示订单信息
  addDizhi:"/api/UserInfo/addArea",//添加用户的收货地址
  xiuDizhi:"/api/UserInfo/patchArea",//修改地址
  huoDizhi:"/api/UserInfo/getArea",//获取地址
  delDizhi:"/api/UserInfo/deleteArea",//删除地址
  yanZhifu:"/api/Order/verifyPayPWD",//验证支付密码
  Zhifu:"/api/Order/payOrder",//订单的支付
  createDingdan:"/api/Order/cretaeOrder",//创建支付订单
  ZhiFuBao:"/api/Alipay/appWebPay", //支付宝支付
  ReSearch:"/api/Goods/getSearchHot",//热搜
  SearchList:"/api/Goods/getGoods",//搜索列表
}