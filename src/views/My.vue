<template>
  <div>
    首页
    <!-- 头部 -->
     <van-nav-bar style="background-color:#2F8FEA;" :border="false">
        <template #title>
          <span style="color:#fff">我的</span> 
        </template> 
        <template #left>
          <van-icon name="arrow-left" color="#fff"/>
        </template>
      </van-nav-bar>


      <!-- 布局 -->
        <van-cell-group  :border="false" >
        <van-cell style="background-color:#2F8FEA" :border="false" @click="login">
          <template #icon>
            <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" round width="50px" height="50px">
            </van-image>
          </template>
          <template #title>
            <!-- 如果用户名为空的话 就显示登录注册  有内容就显示用户手机号 -->
            <div class="login-text" v-if="username==''">
                登录/注册
            </div>
            <div class="login-text" v-else>
              {{username}} 
            </div>
          </template>
          <template #label>
            <div class="login-text-label">
              <span class="iconfont icon-shouji54"></span>
              暂无绑定手机号
            </div>
          </template>
          <template #right-icon>
            <div class="login-right-icon">
              <van-icon name="arrow" color="#fff"/>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <!--  -->
      
      
  </div>
</template>

<script>
export default {
  data(){
    return{
        username:''
    }
  },
  methods:{
    
    login(){
      if(this.username==""){
      this.$router.push({
        path:"/login"
      })
    }else{
      this.$router.push({
        path:"/my"
      })
    }
      
    }
  },
  created(){
    let renhao=sessionStorage.renhao;
    if(renhao){
      this.username=renhao
    }
  }

}
</script>

<style scoped>
.login-text{
  color: wheat;
  font-size:40px;
}
.login-text-label{
  color: wheat;
}
.login-right-icon{
  display: flex;
  align-items: center;
}

</style>