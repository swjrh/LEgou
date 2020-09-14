<template>
  <div>
    <van-tabs v-model="active" scrollspy sticky>
      <van-icon name="arrow-left" class="ding" @click="gohome" />
      <van-tab title="商品">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in swipe" :key="index">
            <img :src="item" class="img1" />
          </van-swipe-item>
        </van-swipe>
        <!-- 内容 -->
        <p class="item_title">{{item.goodsName}}</p>
        <p class="item_title2">
          <span class="col">￥{{item.goodsPrice}}</span>
          <s>{{item.goodsOldPrice}}</s>
        </p>
        <!-- 销量 -->
        <div class="item_xiao">
          <div>销量{{item.goodsBuyNum}}</div>
          <div>收藏{{item.goodsFav}}</div>
          <div>{{item.goodsAre}}</div>
        </div>
        <hr />
        <!-- 退货补运费 -->
        <ul class="item_yun">
          <li v-for="(item,index) in yunlist" :key="index" class="yun" v-show="index>0">
            <img :src="item.icon" class="img_icon" />
            <span>{{item.name}}</span>
          </li>
        </ul>
        <hr />
        <!-- 店铺简介 -->
        <div class="item_aifang">
          <p>
            <img :src="shangdian.shopLogo" class="itemsd" />
          </p>
          <p>{{shangdian.shopName}}</p>
        </div>
        <div class="item_df">
          <div class="div1">
            <p>{{shangdian.snum}}</p>
            <p>总销量</p>
          </div>
          <div class="div2">
            <p>{{shangdian.sells}}</p>
            <p>全部宝贝</p>
          </div>
          <div class="div3">
            <p>描述相符{{shangdian.shopPiont}}</p>
            <p>价格合理{{shangdian.shopPriceOk}}</p>
            <p>质量满意{{shangdian.shopQuality}}</p>
          </div>
        </div>
      </van-tab>
      <!-- 评价 -->
      <van-tab title="评论">
        <van-cell-group>
          <van-cell title="用户评价" value="更多" />
        </van-cell-group>
        <div>
          <div class="ping_top">
            <p>
              <img :src="pinglist.user_img" class="ping_img" />
            </p>
            <p>{{pinglist.user_name}}</p>
          </div>
          <div class="Evaluation">用户评价：{{pinglist.content}}</div>
        </div>
      </van-tab>
      <van-tab title="详情">
        <!-- 下面详情图 -->
        <div v-html="item.goodsIntroduce" class="jing_img"></div>
      </van-tab>
      <van-tab title="推荐">
        <!-- 商品列表 -->
        <ul class="item_l">
          <li
            v-for="(item,index) in shanglist"
            :key="index"
            class="item_list"
            @click="goto(item.goodsId)"
          >
            <p class="p_img">
              <van-image class="item_list_img" lazy-load :src="item.goodsLogo" />
            </p>
            <p class="item_title">{{item.goodsName}}</p>
            <p class="item_con">
              <span style="color:red;font-size:18px">￥{{item.goodsPrice}}</span>
              <span style="color:gray">销量：{{item.goodsBuyNum}}</span>
            </p>
          </li>
        </ul>
      </van-tab>
    </van-tabs>

    <!-- 底部留空白 -->
    <p class="item_buttom"></p>
    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="this.num" @click="gotoCarts" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addcarts" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      active: 0,
      swipe: [], //轮播
      item: {}, //价钱
      yunlist: [], //运费
      shangdian: [], //商铺简介
      shanglist: [], //商品类列表
      pinglist: [], //评价
      num: 0,
      id: 0,
    };
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.$netClient
      .xiangList({
        params: {
          goodsId: id,
        },
      })
      .then((res) => {
        // console.log(res.data[3][0].comment_body, "任豪豪总");
        this.swipe = res.data[0].topImages; //轮播
        this.swipe = this.swipe.split(","); //轮播
        this.item = res.data[0]; //价钱 //精品图
        this.yunlist = res.data[2]; //运费
        this.shangdian = res.data[1]; //商铺简介
        this.pinglist = res.data[3][0].comment_body; //评价
      });
    this.Access();
    // 列表
    this.$netClient
      .shanglist({
        params: {
          page: 1,
          pageSize: 20,
        },
      })
      .then((res) => {
        // console.log(res.data, "shanglist");
        this.shanglist = res.data;
      });
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/",
      });
    },
    gotoCarts() {
      this.$router.push({
        path: "/carts",
      });
    },
    // 添加购物车
    addcarts() {
      alert("!111");
      this.$netClient
        .addcarts(
          qs.stringify({
            product_id: this.id,
            product_amount: 1,
            price: this.item.goodsPrice,
          })
        )
        .then((res) => {
          console.log(res, "add购物车");
        });
      this.Access();
    },
    // 获取购物车数据
    Access() {
      this.$netClient
        .huocarts({
          params: {
            page: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          console.log(res, "获取购物车");
          this.num = res.data.length;
        });
    },
  },
};
</script>





<style scoped>
.Evaluation {
  font-size: 35px;
}
.gao {
  /* res.data[2] 快递邮件*/
  background: #f35c59;
  color: white;
}
.di {
  background: #6aae42;
  color: white;
}
.img1 {
  width: 100%;
  height: 600px;
}
.item_ul {
  text-align: center;
  width: 100%;
  height: 80px;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item_ul li {
  color: gray;
}
.item_title {
  font-size: 33px;
}
.item_title2 span,
s {
  margin: 0 10px;
}
.col {
  font-size: 45px;
  color: #ff5777;
  font-weight: bold;
}
.qi {
  width: 60px;
  height: 40px;
  background: #ff5777;
  color: white;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
}
.item_xiao {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item_xiao div {
  color: gray;
}
.yun {
  width: 100%;
}
.item_yun {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
}
.img_icon {
  width: 35px;
  height: 35px;
}
.jing_img >>> img {
  width: 100%;
  height: 800px;
  /* border:1px solid red; */
}
.png_img {
  width: 100%;
  height: 100%;
}
.van-col {
  font-size: 30px;
  color: gray;
  height: 70px;
  line-height: 70px;
}
.item_aifang {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
}
.itemsd {
  width: 100px;
  height: 100px;
  margin: 0 10px;
  border-radius: 50%;
}
.item_df {
  width: 100%;
  height: 230px;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.div1 {
  width: 200px;
  height: 130px;
  /* border:1px solid red; */
  text-align: center;
}
.div2 {
  width: 200px;
  height: 130px;
  /* border:1px solid red; */
  text-align: center;
}
.div3 {
  width: 350px;
  height: 200px;
  /* border:1px solid red; */
}

.ping_top {
  width: 240px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ping_img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.item_buttom {
  height: 100px;
}

.item_l {
  width: 100%;
  /* height: 600px; */
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item_list {
  width: 350px;
  height: 670px;
  /* border:1px solid red; */
}
.item_list_img {
  width: 350px;
  height: 500px;
  border-radius: 20px;
}
.item_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: gray;
}
.item_con {
  text-align: center;
  margin: 10px 0;
}
.item_con span {
  margin: 0 10px;
}
.ding {
  position: fixed;
  top: 20px;
  font-size: 50px;
  z-index: 100;
}

.item_l {
  width: 100%;
  /* height: 600px; */
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item_list {
  width: 45%;
  height: 650px;
  /* border:1px solid red; */
}
.item_list_img {
  width: 100%;
  height: 500px;
  border-radius: 20px;
}
.item_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: gray;
  font-size: 25px;
}
.item_con {
  text-align: center;
  margin: 10px 0;
}
.item_con span {
  margin: 0 10px;
}
</style>