<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    >
      <template #right v-if="kk">
        <span>完成</span>
      </template>
    </van-nav-bar>
    <!-- 使用复选框组，包裹所有-->
    <van-checkbox-group v-model="result" ref="checkboxGroup" @change="bian" class="list_content">
      <!-- 使用滑动单元格，用来设置滑动样式，包裹Layout布局 -->
      <van-swipe-cell v-for="(item,index) in renhao" :key="index">
        <!-- Layout布局，用来包裹复选框和商品卡片 -->
        <van-row align="center">
          <van-col span="2">
            <!-- 复选框 -->
            <van-checkbox :name="item"></van-checkbox>
          </van-col>
          <van-col span="22">
            <!-- 商品卡片 -->
            <van-card
              :num="item.product_amount"
              :price="item.price"
              :desc="item.title"
              :title="item.title"
              :thumb="item.image"
            >
              <!-- 添加步进器 -->
              <template #num  v-if="kk">
                <van-stepper
                  v-model="item.product_amount"
                  theme="round"
                  button-size="22"
                  disable-input
                  @change="save(item)"
                />
              </template>
            </van-card>
          </van-col>
        </van-row>
        <!-- 滑动单元格包裹的删除 -->
        <template #right>
          <van-button square text="删除" @click="del(item)" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <!-- 底部留空白 -->
    <p class="item_buttom"></p>
    <!-- 底部提交订单栏 -->
    <!-- <div class="btm"> -->
      <van-submit-bar :price="zong" button-text="提交订单" @submit="ding">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    <!-- </div> -->
      <van-submit-bar button-text="删除"  v-if="kk"  @submit="duodel">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      renhao: [], //接收本地存储的数据
      result: [], //复选框组绑定的数组
      checked: false, //全选绑定的布尔值
      kk: false,//管理以及完成
      kong:"",//一个空的id
      kong1:"",//一个空的id
      num:[]
    };
  },
  created() {
    // 获取购物车数据
    this.$netClient
      .huocarts({
          params: {
          page: 1,
          pageSize: 20,
        },
      })
      .then((res) => {
        // console.log(res, "任豪购物车");
        this.num = res.data.length;
        this.renhao = res.data;
        this.renhao.pop(); //删除数组最后一个元素
        // console.log(this.renhao, "任豪豪总");
      });
  },
  // 计算属性，计算总价
  computed: {
    zong() {
      let zong = 0;
      this.kong=''
      this.kong1=''
      var list=[]
      this.num=[]
      // let list=[];
      // 计算result数组的总价
      this.result.map((item) => {
        // 乘以100是因为提交订单栏默认是分
        zong += item.price * 100 * item.product_amount;
        this.kong+=item.cart_id+"," //多个删除是  把他们的id加一块放到一起
        list.push(item.product_id) //多个删除是  把他们的id加一块放到一起
        this.kong1=list.join(" ")
        this.num.push(item.product_amount) //数量

      });
      this.$store.dispatch("DING",this.kong1)
      this.$store.dispatch("NUM",this.num)
      // // 友情提醒：不要忘记return
      return zong;
    },
  },
  methods: {
    // 订单
    ding(){
      this.$router.push({
        path:"/indent",
       
      })
    },
    // 步进器 修改接口
    save(item) {
      console.log(item.product_amount);
      this.$netClient
        .bjqsave(
          qs.stringify({
            catId: item.cart_id,
            product_amount: item.product_amount,
          })
        )
        .then((res) => {
          console.log(res);
        });
    },
    // 管理
    onClickRight() {
      this.kk = !this.kk;
    },
    // 返回到详情页
    onClickLeft() {
      this.$router.push({
        path: "/about",
      });
    },
    // 全选  不全选
    checkAll() {
      if (this.checked == true) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    // 当result数组发生变化时要做的事
    bian() {
      // 当result数组长度和renhao数组的长度相同时
      if (this.result.length == this.renhao.length) {
        this.checked = true; //把全选的布尔值变为true
      } else {
        this.checked = false; //否则变为false
      }
    },
    // 删除数据 单个删除
    del(item) {
      this.$netClient
        .delcarts(
          qs.stringify({
            carid: item.cart_id,
          })
        )
        .then((res) => {
          console.log(res);
        });

      // let一个变量接收renhao已经删除的数据,这个变量是数组类型
      // let del = this.renhao.splice(index, 1);
      // 遍历循环result数组,
      this.result.map((item, index) => {
        // index代表result数组的下标
        //    当result里面的id和已经删除的数据的id相同时
        if (item.cart_id == this.renhao[0].cart_id) {
          // 拿到result里面相对应的下标用来删除result里面的数据
          this.renhao.splice(index, 1);
        }
      });
    },
    
    // 多个删除
    duodel(){
       this.$netClient
        .duodel(
          qs.stringify({
            carid: this.kong //直接把上面写好的空的id传过来就可以了
          })
        )
        .then((res) => {
          console.log(res);
        });
    }
  },
};
</script>

<style scoped>
.van-submit-bar__bar{
  justify-content: space-between;
}
.goods-card {
  margin: 0;
  background-color: white;
}
.list_content {
  margin-top: 120px;
}
.delete-button {
  height: 100%;
}
.btm {
  width: 100%;
  height: 100px;
}
</style>