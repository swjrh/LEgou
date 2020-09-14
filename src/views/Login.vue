<template>
  <div>
    <p class="top">
      <img src="http://localhost:8080/top.png" class="item_top" />
    </p>
    <van-tabs class="login_content">
      <!-- 登录 -->
      <van-tab title="登录" class="login_tab">
        <div class="login_box">
          <div>
            <p class="login_text">
              <span class="sp">*</span>账号
            </p>
            <p>
              <input type="text" placeholder="请输入正确的账号" class="inp" v-model="loginzh" />
            </p>
          </div>
          <div>
            <p class="login_text">
              <span class="sp">*</span>密码
            </p>
            <p>
              <input type="text" placeholder="请输入正确的密码" class="inp" v-model="loginmima" />
            </p>
          </div>
          <div>
            <input type="checkbox" />记住密码
          </div>
          <h5 class="zc" @click="dl">登录</h5>
          <p>
            <span class="zi">找回密码|</span>
            <span class="zhang">还没有注册账号？</span>
            <span class="zi">立即注册</span>
          </p>
        </div>
      </van-tab>
      <!-- 注册 -->
      <van-tab title="注册" class="login_tab">
        <div class="login_box">
          <div>
            <p class="login_text">
              <span class="sp">*</span>手机号码
            </p>
            <p>
              <input type="text" placeholder="注册手机为找回密码的唯一凭证" class="inp" v-model="haoma" />
              <span v-show="number">手机号格式错误</span>
            </p>
          </div>
          <div>
            <p class="login_text">
              <span class="sp">*</span>登录名
            </p>
            <p>
              <input type="text" placeholder="中、英均可，不超过12个字符" class="inp" v-model="name" />
            </p>
          </div>
          <div>
            <p class="login_text">
              <span class="sp">*</span>密码
            </p>
            <p>
              <input type="text" placeholder="3-10位英文、数字、符号，区别大小写" class="inp" v-model="mima" />
            </p>
          </div>
          <div>
            <p class="login_text">短信验证码</p>
            <ul class="yan">
              <li>
                <input type="text" placeholder="请输入验证码" class="inp1" />
              </li>
              <li class="inp2" @click="yan">发送验证码</li>
            </ul>
          </div>
          <h5 class="zc" @click="zhuce">注册</h5>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import qs from "qs";
export default {
  data() {
    return {
      // 注册
      haoma: "",
      name: "",
      mima: "",
      number:false,
      // 登录
      loginzh: "",
      loginmima: "",
    };
  },
  created() {},
  methods: {
    // 手机号是否被注册
    Tel() {
      return this.$netClient.shouji({
        params: {
          phone: this.haoma,
        },
      });
    },
    //用户名是否可用
    User() {
      return this.$netClient.name({
        params: {
          LoginName: this.name,
        },
      });
    },
    // 验证码
    async yan() {
      let tel = await this.Tel();
      this.$netClient
        .Verification({
          params: {
            phone: this.haoma,
            codeType: 0,
          },
        })
        .then((res) => {
          console.log(res, "发送验证码");
        });
    },
    // 注册
    async zhuce() {
      let tel = await this.Tel(); //手机号
      let user = await this.User(); //用户名
      console.log(tel);
      console.log(user);
      if (tel.data.code == "200" && user.data.code == "404") {
        var params = {
          phone: this.haoma,
          LoginName: this.name,
          LoginPassword: this.mima,
        };
        //添加登录信息  如果是post请求必须要解析一下 用qs
        this.$netClient.adddl(qs.stringify(params)).then((res) => {
          console.log(res, "添加数据");
        });
      }
    },
    // 登录  如果是post请求必须要解析一下 用qs
    dl() {
      this.$netClient
        .Loginyan(
          qs.stringify({
            LoginName: this.loginzh,
            LoginPassword: this.loginmima,
            isPassing:"yes"
          })
        )
        .then((res) => {  
          console.log(res, "任豪");
          this.$store.dispatch("Denglu",res.tnToken.tokenStr)
          setTimeout(() => {
            this.$router.push({
              path:"/"
            })
          }, 1000);
        });
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
.item_top {
  width: 100%;
  height: 50px;
}
.sp {
  color: red;
}
.login_text {
  font-size: 30px;
}
.inp {
  height: 80px;
  width: 600px;
  font-size: 30px;
  border: 2px solid #f1f3f5;
}
.inp1 {
  height: 80px;
  width: 400px;
  font-size: 30px;
  border: 2px solid #f1f3f5;
}
.inp2 {
  height: 80px;
  width: 200px;
  font-size: 30px;
  background: #409eff;
  color: white;
  text-align: center;
  line-height: 80px;
}
.zc {
  height: 80px;
  width: 600px;
  font-size: 30px;
  background: #409eff;
  color: white;
  text-align: center;
  line-height: 80px;
  margin-top: 30px;
  border-radius: 10px;
}
.login_box {
  width: 600px;
  height: 800px;
  margin: 0 auto;
}
.login_box div {
  margin-top: 70px;
}
.login_box p {
  margin: 40px 0;
  color: gray;
}

.yan {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.zhang {
  color: gray;
}
.zi {
  color: #c890c8;
}
</style>