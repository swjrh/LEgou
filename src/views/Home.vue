<template>
  <div>
    <!-- 顶部 -->
    <div class="tou">
      <p>
        <img src="http://localhost:8080/top.png" class="item_top" />
      </p>
      <!-- 搜索 -->
      <p>
        <van-search placeholder="请输入搜索关键词" @click="gotoSearch" />
      </p>
    </div>
    <!-- 列表 刷新 加载 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <!-- 轮播 -->
        <van-swipe class="my_swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in swiperlist[1]" :key="index">
            <img :src="item.slide_show_imgUrl" class="item_swiper" />
          </van-swipe-item>
        </van-swipe>
        <!-- 十宫格 -->
        <ul class="item_ul1">
          <li v-for="(item,index) in swiperlist[0]" :key="index">
            <img :src="item.sp_home_ico" class="item_shi_img" />
            <p class="item_shi_content">{{item.sp_home_title}}</p>
          </li>
        </ul>
        <van-tabs v-model="active" sticky :offset-top="100" @change="btn">
          <van-tab v-for="(item1,index) in shailist" :key="index" :title="item1.title">
            <!-- 商品列表 -->
            <div class="item_l">
                <list
              v-for="(item,index) in shanglist"
              :key="index"
              class="item_list"
              @click="goto(item.goodsId)"
              :img="item.goodsLogo"
              :title="item.goodsName"
              :price="item.goodsPrice"
              :num="item.goodsBuyNum"
            ></list>
            </div>

            
          </van-tab>
        </van-tabs>
      </van-list>
    </van-pull-refresh>

    <!-- 底部留空白 -->
    <p class="item_buttom"></p>
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
      swiperlist: [], //轮播、十宫格
      shailist: [
        { title: "流行", z: "sell" },
        { title: "新款", z: "new" },
        { title: "精选", z: "syn" },
      ],
      shanglist: [], //商品类列表
      // renhao:[],//商品类列表
      active: 0,
      // 刷新加载
      num: 0,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    this.$netClient.swiperlist().then((res) => {
      // console.log(res.data,"OK")
      this.swiperlist = res.data;
    });
    this.$netClient
      .shanglist({
        params: {
          page: 1,
          pageSize: 20,
        },
      })
      .then((res) => {
        console.log(res.data, "首页list");
        // this.shanglist = res.data;
        this.renhao = res.data;
      });
  },
  methods: {
    gotoSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    btn(index) {
      this.$netClient
        .shanglist({
          params: {
            page: 1,
            pageSize: 20,
            sortType: this.shailist[index].z,
          },
        })
        .then((res) => {
          // console.log(res.data,"OK?");
          this.shanglist = res.data;
        });
    },
    // 加载 刷新
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.shanglist = [];
          this.num = 0;
          this.refreshing = false;
        }
        // console.log("雪花落下")
        for (let i = 0; i < 4; i++) {
          this.shanglist.push(this.renhao[this.num++]);
          // console.log(this.shanglist,"123")
        }

        this.loading = false;
        if (this.shanglist.length >= 20) {
          this.finished = true;
        }
      }, 2000);
    },
    onRefresh() {
      // this.renhao=[]
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
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
  },
};
</script>

<style scoped>
.tou {
  width: 100%;
  height: 200px;
  /* border:1px solid red; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
}
.item_top {
  width: 100%;
  height: 50px;
}
.my_swipe {
  margin-top: 200px;
}
.item_swiper {
  width: 100%;
  height: 400px;
}
.item_ul1 {
  width: 100%;
  height: 420px;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.item_shi_content {
  text-align: center;
  font-size: 30px;
}
.item_shi_img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.item_item {
  width: 150px;
  background: #ffffff;
  border: 0px;
  color: gray;
  font-size: 30px;
  text-align: center;
}
.bai {
  width: 100%;
  height: 100px;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.active {
  color: red;
  border-bottom: 5px solid red;
}
.www {
  height: 1000px;
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
.item_buttom {
  height: 100px;
}
</style>