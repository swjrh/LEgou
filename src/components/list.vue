<template>
  <div @click="btn">
    
    <p class="p_img">
      <van-image class="item_list_img" lazy-load :src="img" />
    </p>
    <p class="item_title">{{title}}</p>
    <p class="item_con">
      <span style="color:red;font-size:18px">￥{{price}}</span>
      <span style="color:gray">销量：{{num}}</span>
    </p>
  </div>
</template>

<script>
export default {
    props:{
        img:String,
        title:String,
        price:Number,
        num:Number
    },
    methods:{
        btn(){
            this.$emit("click")
        }
    }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
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