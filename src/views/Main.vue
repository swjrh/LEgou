<template>
  <div>
    <van-tabbar v-model="active" class="ppp">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/fen" icon="search">分类</van-tabbar-item>
      <van-tabbar-item to="/carts" icon="friends-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
      <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
/* .ppp{
  margin-bottom: 30px;
} */
</style>