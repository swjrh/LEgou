<template>
  <div>
    <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <!-- 搜索 -->
    <van-search
      class="item_search"
      v-model="kw"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @focus="yiru"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- Kuai -->
    <div v-if="!kk">
      <h3>热搜</h3>
      <ul class="item_ul">
        <li v-for="(item,index) in ReSearch" :key="index" @click="resou(item)">
          <p class="re">{{item}}</p>
        </li>
      </ul>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索记录</van-divider>
      <div class="search-history">
        <div class="jilu">
          <p>搜索记录</p>
          <van-icon name="delete" @click="del" class="del" />
        </div>
        <div>
          <van-tag
            style="margin:10px"
            v-for="(item,index) in kwlist"
            :key="index"
            @click="clickCell(item)"
          >{{item}}</van-tag>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="item_l" v-if="kk">
      <list
        v-for="(item,index) in list"
        :key="index"
        class="item_list"
        @click="goto(item.goodsId)"
        :img="item.goodsLogo"
        :title="item.goodsName"
        :price="item.goodsPrice"
        :num="item.goodsBuyNum"
      ></list>
    </div>
  </div>
</template>

<script>
import { debounce } from "../until/index";
import list from "../components/list";
export default {
  components: {
    list,
  },
  data() {
    return {
      kwlist: [], //历史记录
      kw: "", //关键字
      ReSearch: [], //热搜词
      list: [],
      kk: false,
    };
  },
  created() {
    //   保存历史记录
    let kwlist = localStorage.kwlist;
    if (kwlist) {
      this.kwlist = JSON.parse(kwlist);
    }
    // 热搜
    this.$netClient.ReSearch().then((res) => {
      this.ReSearch = res.data;
    });
  },

  methods: {
    yiru() {
      this.kk = false;
      // this.kw=''
    },

    //   热搜
    resou(item) {
      this.kw = item;
      this.onSearch();
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
    // 防抖   搜索
    onSearch: debounce(function () {
      this.kk = true;
      // 当输入框中没值的时候  不能搜索
      if (this.kw.trim() == "") {
        return;
      }
      // 去重历史记录
      if (!this.kwlist.includes(this.kw)) {
        this.kwlist.push(this.kw);
        // this.kw = "";
        this.save();
      }
      // 搜索列表
      this.$netClient
        .SearchList({
          params: {
            goodsName: this.kw,
            page: 2,
            pageSize: 20,
            sortType: "syn",
          },
        })
        .then((res) => {
          console.log(res.data, "list任豪");
          this.list = res.data;
        });
    }, 2000),

    // 删除  清空历史记录的数组
    del() {
      this.kwlist = [];
      this.save();
    },

    clickCell(kw) {
      this.kw = kw;
      // 直接把那个方法拿过来  push到搜索记录
      this.onSearch();
    },
    // 同步
    save() {
      localStorage.kwlist = JSON.stringify(this.kwlist);
    },
    onClickLeft() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped>
.re {
  /* padding: 10px; */
  border: 1px solid grey;
  margin: 10px;
  height: 40px;
  line-height: 40px;
  width: 200px;
  text-align: center;
  border-radius: 10px;
}
.item_ul {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item_search {
  margin-top: 100px;
}

.item_l {
  width: 100%;
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
.jilu {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.del {
  font-size: 40px;
}
</style>