<template>
  <div>
    <van-nav-bar title="新增" />
    <van-address-edit
      :area-list="areaList"
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
    };
  },
  created() {
    this.areaList = xinzeng;
  },
  methods: {
    onSave(content) {
      console.log(content);
      this.$netClient
        .addDizhi(
          qs.stringify({
            Name: content.name,
            Phone: content.tel,
            Province: content.province,
            City: content.city,
            District: content.county,
            Address: content.addressDetail,
          })
        )
        .then((res) => {
          console.log(res, "新增地址");
        });
    },
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