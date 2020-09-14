<template>
  <div>
    <p class="top">分类任豪</p>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search" @click="gotoSearch" />
    <div class="item_box">
      <ul class="item_fen_left">
        <li
          v-for="(item,index) in fenlei"
          :key="index"
          :class="{'active':index==kk}"
          @click="yi(item.cat_id,index)"
        >{{item.cat_name}}</li>
      </ul>
      <div class="item_fen_right">
        <ul class="item_nav2">
          <li v-for="(item,index) in nav" :key="index">
            {{item}}
          </li>
        </ul>
        <div class="list">
             <!-- 商品列表 -->
            <ul class="item_l">
              <li v-for="(item,index) in fenlist" :key="index" class="item_list" @click="goto(item.goodsId)">
                <p class="p_img">
                  <van-image class="item_list_img" lazy-load :src="item.goodsLogo" />
                </p>
                <p class="item_title">{{item.goodsName}}</p>
                <p class="item_con">
                  <span style="color:red;font-size:15px">￥{{item.goodsPrice}}</span>
                  <span style="color:gray">销量：{{item.goodsBuyNum}}</span>
                </p>
              </li>
            </ul>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import list from "../components/list"
export default {
  components:{
    list
  },
  data() {
    return {
      value: "",
      fenlei: [],
      kk: 0, //动态绑定class样式
      nav: ["综合", "销量", "新品"],
      fenlist: [],
      active: 0,
    };
  },
  created() {
    this.$netClient.fenlei().then((res) => {
      // console.log(res.data,'分类');
      this.fenlei = res.data;
    });
    this.$netClient.fenlist({
      params:{
        cat_id:'85',
        page:1,
        pageSize:20
      }
    }).then((res)=>{
      this.fenlist=res.data
    })
  },
  methods: {
    // 跳进搜索页面
    gotoSearch() {
      this.$router.push({
        path: "/search",
      });
    },
     // 进入详情并传数据
    goto(goodsId) {
      this.$router.push({
        path: "/about",
        query: {
          id: goodsId,
        },
      });
    },
    // 点击一级出现相对应的内容
    yi(cat_id,index) {
      console.log(cat_id)
      this.kk = index;
      this.$netClient.fenlist({
      params:{
        cat_id:cat_id,
        page:1,
        pageSize:20
      }
    }).then((res)=>{
      // console.log(res.data)
      this.fenlist=res.data

    })
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
.top {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  /* border:1px solid red; */
}
.search {
  border: 1px solid rgb(212, 208, 208);
  width: 100%;
  margin: 10px 0;
  height: 80px;
}
.item_box {
  width: 100%;
  height: 950px;
  /* border:1px solid red; */
  display: flex;
}
.item_fen_left {
  width: 25%;
  height: 100%;
  /* border:1px solid red; */
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.item_fen_left li {
  width: 100%;
  height: 90px;
  /* border:1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  color: red;
  border-left: 4px solid red;
}
.item_fen_right {
  width: 75%;
  height: 100%;
  /* border: 1px solid red; */
}
.item_fen_left li{
  font-size: 24px;
}
.item_fen_nav {
  width: 100%;
  height: 60px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item_nav2{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
.item_nav2 li{
  font-size: 28px;
}

.item_l {
  width: 100%;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.item_list {
  width: 47%;
  height: 500px;
  /* border:1px solid red; */
}
.item_list_img {
  width: 100%;
  height: 350px;
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
.list{
  height: 900px;
  width: 100%;
  overflow: scroll;
}
</style>