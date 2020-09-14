<template>
  <div>
    <van-nav-bar title="修改" />
    <van-address-edit
      :address-info="list"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import qs from "qs";
import xinzeng from "../../public/san";
export default {
  data() {
    return {
      areaList: [],
      searchResult: [],
      list:{},
      id:''
    };
  },
  created() {
    this.areaList = xinzeng;
    this.id =this.$route.query.item
     console.log(this.id,"new id")
     this.list=this.id
     console.log(this.list,"8888888888")
  },
  methods: {
    // onSave(content) {
    //     this.$netClient
    //       .xiuDizhi(
    //         qs.stringify({
    //         })
    //       )
    //       .then((res) => {
    //         console.log(res, "修改地址");
    //       });
    // },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },       
  },
};
</script>

<style>
</style>