<template>
  <div>
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <div class="item_dizhi">
      <div class="p1" @click="gotoAddress">
        <p class="p2">
          <van-icon name="location-o" class="van1" />
        </p>
      </div>
      <div class="p3">
        <p>{{item.name}} {{item.phone}}</p>
        <p>{{item.province}} {{item.city}} {{item.district}} {{item.address}}</p>
      </div>
    </div>
    <div v-for="(item,index) in dinglist" :key="index">
      <div class="item_dian">
        <img :src="item[1].shopLogo" class="item_img" />
        <span class="item_name">{{item[1].shopName}}></span>
      </div>
      <div class="item_content">
        <p>
          <img :src="item[0].goodsLogo" class="item_img1" />
        </p>
        <div>
          <p class="content">{{item[0].goodsName}}</p>
          <p class="yuan">原价：{{item[0].goodsOldPrice}}</p>
          <p class="qi">七天退换</p>
        </div>
        <div class="mn">
          <p>￥{{item[0].goodsPrice}}</p>
          <p>X{{num[index]}}</p>
        </div>
      </div>
      <div class="yunfei">
        <p>
          <van-icon name="gold-coin" class="van" />
        </p>
        <div>
          <p class="yun">运费险</p>
          <p>确认收货前退货可理赔</p>
        </div>
        <div class="item_right">
          <p>￥15</p>
          <p>X1</p>
        </div>
      </div>
      <!--  -->
      <hr />
      <van-cell-group>
        <van-cell title="商品总价" :value="item[0].goodsPrice * num[index]" />
        <van-cell title="运费（快递）" value="￥0.00" />
        <van-cell title="运费险（卖家赠送）" value="￥0.00" />
      </van-cell-group>
      <hr />
    </div>

    <!-- <div class="zong">
      <p>商品小计</p>
      <p>{{zong}}</p>
    </div> -->
    <div class="btn">
      <!-- <div class="btn_left">
        <p>
          应用金额：
          <span class="zj">￥0</span>
        </p>
        <p>共计：X。。件</p>
      </div>
      <div class="btn_right">去支付</div>-->
      <van-submit-bar :price="zong" button-text="提交订单" @submit="onSubmit" />
    </div>
    <p class="kong"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "", 
      dinglist: [], 
      item: {}, //收货地址
      num: [],  //商品的数量
      zj: 0,
    };
  },
  created() {
    this.id = this.$store.state.id;
    console.log(this.id, "订单1id");
  },

  mounted() {
    this.item = this.$store.state.item;
    this.id = this.$store.state.id;
    this.num = this.$store.state.num;
    // console.log(this.num,"传来了")
     //展示订单信息
    this.$netClient
      .dinglist({
        params: {
          goodsid: this.id,
        },
      })
      .then((res) => {
        // console.log(res, "订单11111111");
        this.dinglist = res.data;
        // this.dinglist.pop()
      });
  },
  methods: {
    gotoAddress() {
      this.$router.push({
        path: "/address",
      });
    },
    onSubmit(item) {
      // console.log(this.zj)
      this.$router.push({
        path: "/paymoney",
        query: {
          zj:this.zj
        },
      });
    },
    onClickLeft(){
      this.$router.push({
        path:"/carts"
      })
    }
  },
  computed: {
    // 总价
    zong() {
      let zong = 0;
      this.dinglist.map((res, index) => {
        zong += res[0].goodsPrice * this.num[index] * 100;
        this.zj = zong;
      });
      return zong;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.p1 {
  height: 100px;
  width: 100px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}
.p2 {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background: orangered;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.p3 {
  width: 590px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* border: 1px solid red; */
}
.p3 p {
  font-size: 24px;
}
.item_dizhi {
  width: 100%;
  height: 150px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  margin-top: 100px;
}
.item_dian {
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
  margin: 20px 0;
}
.item_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.item_name {
  font-size: 25px;
}
.item_content {
  width: 100%;
  height: 200px;
  /* border: 1px solid red; */
  display: flex;
  /* align-items: center; */
}
.qi {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid orangered;
  color: orangered;
  margin-top: 40px;
  border-radius: 7px;
}
.content {
  font-size: 26px;
  font-weight: bold;
}
.item_img1 {
  width: 180px;
  height: 200px;
  border-radius: 10px;
}
.mn {
  text-align: center;
  margin-top: 60px;
}
.yuan {
  color: gray;
}
.yunfei {
  width: 100%;
  display: flex;
  height: 100px;
  /* border: 1px solid red; */
  align-items: center;
}
.van {
  font-size: 70px;
  color: orangered;
}
.van1 {
  font-size: 70px;
  color: white;
  background: #ff4500;
  border-radius: 50%;
}
.item_right {
  margin-left: 340px;
  text-align: center;
}
.yun {
  font-weight: bolder;
  font-size: 27px;
}
.zong {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zong p {
  font-size: 30px;
}
hr {
  margin: 10px 0;
}
.btn {
  display: flex;
  width: 100%;
  height: 100px;
  /* border:1px solid red; */
  position: fixed;
  bottom: 0;
  left: 0;
}
.btn_left {
  width: 500px;
  height: 100px;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn_left p {
  font-size: 28px;
}
.btn_right {
  width: 200px;
  height: 100px;
  background: #f21956;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: white;
}
.zj {
  color: #f21956;
}
.kong {
  height: 110px;
}
</style>