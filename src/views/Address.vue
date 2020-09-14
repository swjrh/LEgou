<template>
  <div>
      <van-nav-bar
      title="管理地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="xuan"
    />
  </div>
</template>

<script>
export default {
     data() {
    return {
      chosenAddressId: '1',
      list: [],
       
    };
  },
  created(){
      this.$netClient.huoDizhi({
          params:{
              page:1,
              pageSize:10
          }
      }).then((res)=>{
          console.log(res.data,"获取地址")
          this.list=res.data
      })
  },
  methods: {
    onClickLeft(){
      this.$router.push({
        path:"/indent"
      })
    },
    onAdd() {
        this.$router.push({
            path:"/xinzeng"
        })
    },
    onEdit(item, index) {
      this.$router.push({
            path:"/xiugai",
            query:{
                item
            }
        })
        console.log(item,"item")
    },
    xuan(item,index){
        this.$store.dispatch("XUAN",item)
        console.log(item,"1111")
    }
  },
};

</script>

<style scoped>
.van-address-list{
  margin-top: 100px;
}
</style>