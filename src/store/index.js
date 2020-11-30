import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    area: [],
    dict: {},
    user: {},
    menuList: [],
    funcList: []
  },
  mutations: {
    initArea (state, initArea) {
      sessionStorage.setItem('area', JSON.stringify(initArea));
      state.area = initArea;
    },
    initDict(state, initDict) {
      sessionStorage.setItem('dict', JSON.stringify(initDict));
      state.dict = initDict;
    },
    initUser (state, initUser) {
      sessionStorage.setItem('user', JSON.stringify(initUser));
      state.user = initUser;
    },
    initUserMenuList (state, userMenuList) {
      sessionStorage.setItem('userMenu', JSON.stringify(userMenuList));
      state.menuList = userMenuList;
    },
    initMenuFuncList (state, userFuncList) {
      console.log(userFuncList)
      sessionStorage.setItem('userFunc', JSON.stringify(userFuncList));
      state.funcList = userFuncList;
    }
  },
  getters: {
    // 获取一级区域
    getSuperArea: (state) => {
      let area = state.area, superArea =[];
      if (area.length === 0) {
        area = JSON.parse(sessionStorage.getItem('area'));
      }
      area.forEach(item => {
        if (item.superAreaId === 0) {
          superArea.push(item);
        }
      })
      return superArea;
    },
    // 获取二级区域
    getChildArea: (state) => {
      let childArea = state.area, superArea =[];
      if (childArea.length === 0) {
        childArea = JSON.parse(sessionStorage.getItem('area'));
      }
      childArea.forEach(item => {
        if (item.superAreaId !== 0) {
          superArea.push(item);
        }
      })
      return superArea;
    },
    getDict: (state) => {
      let dict = state.dict;
      if ( Object.keys(dict).length === 0 ) {
        dict = JSON.parse(sessionStorage.getItem("dict"));
      }
      return dict;
    },
    getUser: (state) => {
      let user = state.user;
      if ( Object.keys(user).length === 0 ) {
        user = JSON.parse(sessionStorage.getItem("user"));
      }
      return user;
    },
    getUserMenu: (state) => {
      let userMenu = state.menuList;
      if ( Object.keys(userMenu).length === 0 ) {
        userMenu = JSON.parse(sessionStorage.getItem("userMenu"));
      }
      return userMenu;
    },
    getUserFunc: (state) => {
      let userFunc = state.funcList;
      if ( Object.keys(userFunc).length === 0 ) {
        userFunc = JSON.parse(sessionStorage.getItem("userFunc"));
      }
      return userFunc;
    }
  },
  actions: {
    initCache(context) {
      axios.post('/system/cache')
      .then((resp) => {
        if(resp.data.code === 1){
          context.commit('initArea', resp.data.data.area);
          context.commit('initDict', resp.data.data.dict);
        }
      }); 
    },
    initUserMenu(context) {
      axios.post('/menu/findMenuByUserId/' + this.state.user.userId)
      .then((resp) => {
        if(resp.data.code === 1){
          context.commit('initUserMenuList', resp.data.data);
        }
      });
    },
    initUserFunc(context) {
      axios.post('/func/fundFuncByUserId/' + this.state.user.userId)
      .then((resp) => {
        if(resp.data.code === 1){
          context.commit('initMenuFuncList', resp.data.data);
        }
      });
    }
  },
  modules: {
  }
})
