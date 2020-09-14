<template>
  <div>
    <van-nav-bar title="支付管理" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <van-radio-group v-model="radio" @change="dian">
      <van-cell-group>
        <van-cell title="支付宝 " clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="微信 " clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="余额宝 " clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button type="primary" block @click="zhi">立即支付</van-button>
    <!-- 密码框 -->
    <!-- 密码输入框 -->
    <van-password-input
      v-if="kk"
      :value="value"
      :error-info="errorInfo"
      :focused="showKeyboard"
      @focus="showKeyboard = false"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-if="kk"
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";

export default {
  data() {
    return {
      kk: false,
      radio: "1",
      value: "",
      showKeyboard: true,
      errorInfo: "",
      name: 1,
      str: "", //订单编号
      mh: [], //订单编号的数组
      html: "",
    };
  },
  created() {
    let id = this.$store.state.id;
    let zj = this.$route.query.zj / 100; //总价
    let item = this.$store.state.item;
    console.log(zj, "zj");
    console.log(item, "item");
    console.log(id, "id");

    //   创建订单
    this.$netClient
      .createDingdan(
        qs.stringify({
          price: zj,
          consignee_addr: `${
            item.name + "," + item.phone + "," + item.city + item.address
          }`,
          goodsId: id,
          isFcart: true,
        })
      )
      .then((res) => {
        console.log(res, "创建订单");
        this.mh = res.data;
        // console.log(zj, "zj");
        // console.log(item, "item");
        // console.log(id, "id");
        // 订单编号
        console.log(this.mh, +"222222222");
        let a = [];
        this.mh.forEach((ele) => {
          a.push(ele.orderNumber);
        });
        this.str = a.join(" ");
        console.log(this.str, "kkkkkkkkkk");
      });
  },
  methods: {
    // 复选框所对应的name 
    dian(event) {
      this.name = event;
      console.log(this.name, "name");
    },
    onClickLeft() {
      this.$router.push({
        path: "/indent",
      });
    },
    // 数字键盘
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6) {
        // 验证支付密码
        this.$netClient
          .yanZhifu(
            qs.stringify({
              paypwd: md5(this.value),
            })
          )
          .then((res) => {
            console.log(res, "验证密码");
            // 进行判断
            if (res.code == 200) {
              if (this.name == 1) {
                console.log(this.str, "任豪999999999");
                // 支付宝
                this.$netClient
                  .ZhiFuBao(
                    qs.stringify({
                      OutTradeNo: this.str,
                      Subject: "支付宝",
                      ProductCode: "QUICK_WAP_WAY",
                      TotalAmount: "500",
                    })
                  )
                  .then((res) => {
                    console.log(res, "支付宝支付");
                    // 跳转到支付
                    this.html = res.data;
                    var form = res.data;
                    const div = document.createElement("div");
                    div.innerHTML = form; //此处form就是后台返回接收到的数据
                    document.body.appendChild(div);
                    document.forms[0].submit();
                  });
              } else if (this.name == 3) {
                // 余额支付
                this.$netClient
                  .Zhifu(
                    qs.stringify({
                      orderNum: this.str,
                    })
                  )
                  .then((res) => {
                    console.log(res, "支付订单");
                  });
              }
            }
            else {
              this.errorInfo = "";
            }
          });
        
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    zhi() {
      this.kk = !this.kk;
    },
  },
};
</script>

<style scoped>
.van-radio-group {
  margin-top: 100px;
}
</style>