import Vue from 'vue'
import Vuex from 'vuex'
import createisitate from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    id:"",
    item:{},//地址的item
    num:""
  },
  mutations: {
    Denglu(state, val) {
      state.token = val
    },
    DING(state,id){
      state.id=id;
    },
    XUAN(state,item){
      state.item=item;
    },
    NUM(state,num){
      state.num=num;
    }
  }, 
  actions: {
    Denglu(context, val) {
      context.commit("Denglu", val)
    },
    DING(context,id){
      context.commit("DING",id)
    },
    XUAN(context,item){
      context.commit("XUAN",item)
    },
    NUM(context,num){
      context.commit("NUM",num)
    },
  },
  modules: {
  },
  plugins: [createisitate({
    storage: window.localStorage
  })]
})
