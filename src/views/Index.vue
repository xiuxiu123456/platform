<template>
  <div>
    <!-- <div class="head">
      <span>头部</span>
      <Button @click="logout">退出登录</Button>
    </div> -->
    <inHearder @on-logout="logout" />
    <div :style="heightStyle" class="index-content">
      <div class="split-pane">
        <Menu theme="dark" :active-name="activeName" :open-names="openNames" :accordion="true" style="width:100%">
          <Submenu :name="menu.menuComponent" v-for="(menu, index) in menuList" :key="index">
              <template slot="title">
                  <Icon :type="menu.icon" style="color:#0eb18d; font-size:16px" />
                  {{menu.componentName}}
              </template>
              <router-link :to="menuItem.menuPath" v-for="(menuItem, k) in menu.childMenus" :key="k">
                <MenuItem :name="menuItem.menuComponent" @click.native="clickMenu('menuItem.menuComponent')">{{menuItem.componentName}}</MenuItem>
              </router-link>
              <!-- <router-link to="/year"><MenuItem name="1-2" @click.native="clickMenu('1-2')">年度计划</MenuItem></router-link>
              <router-link to="/progress"><MenuItem name="1-3" @click.native="clickMenu('1-3')">建设进度</MenuItem></router-link>
              <router-link to="/channel"><MenuItem name="1-4" @click.native="clickMenu('1-4')">建设渠道</MenuItem></router-link>
              <router-link to="/hometype"><MenuItem name="1-5" @click.native="clickMenu('1-5')">住房类型</MenuItem></router-link>
              <router-link to="/project"><MenuItem name="1-6" @click.native="clickMenu('1-6')">项目检索</MenuItem></router-link> -->
          </Submenu>
          <!-- <Submenu name="2">
              <template slot="title">
                  <Icon type="md-podium" style="color:#0eb18d; font-size:16px" />
                  城中村
              </template>
              <router-link to="/villages"><MenuItem name="2-1" @click.native="clickMenu('2-1')">区域分布</MenuItem></router-link>
              <router-link to="/searchVillages"><MenuItem name="2-2" @click.native="clickMenu('2-2')">村检索</MenuItem></router-link>
          </Submenu>
          <Submenu name="3">
              <template slot="title">
                  <Icon type="md-stats" style="color:#0eb18d; font-size:16px" />
                  写字楼
              </template>
              <router-link to="/office"><MenuItem name="3-1" @click.native="clickMenu('3-1')">区域分布</MenuItem></router-link>
              <router-link to="/searchOffice"><MenuItem name="3-2" @click.native="clickMenu('3-2')">项目检索</MenuItem></router-link>
          </Submenu>
          <Submenu name="4">
              <template slot="title">
                  <Icon type="ios-home-outline" style="color:#0eb18d; font-size:16px" />
                  住宅
              </template>
              <router-link to="/residence"><MenuItem name="4-1" @click.native="clickMenu('4-1')">区域分布</MenuItem></router-link>
              <router-link to="/searchResidence"><MenuItem name="4-2" @click.native="clickMenu('4-2')">项目检索</MenuItem></router-link>
          </Submenu>
          <Submenu name="5">
              <template slot="title">
                  <Icon type="ios-map" style="color:#0eb18d; font-size:16px" />
                  产业园区
              </template>
              <router-link to="/park"><MenuItem name="5-1" @click.native="clickMenu('5-1')">区域分布</MenuItem></router-link>
              <router-link to="/searchPark"><MenuItem name="5-2" @click.native="clickMenu('5-2')">项目检索</MenuItem></router-link>
          </Submenu>
          <Submenu name="9">
              <template slot="title">
                  <Icon type="md-settings" style="color:#0eb18d; font-size:16px" />
                  系统管理
              </template>
              <router-link to="/log"><MenuItem name="9-1" @click.native="clickMenu('9-1')">系统日志</MenuItem></router-link>
          </Submenu> -->
        </Menu>
      </div>
      <div class="split-pane-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import inHearder from '../components/hearder.vue'
export default {
  name: 'app',
  components: {
    inHearder
  },
  data() {
    return {
      split1: 0.13,
      activeName: '1-1',
      openNames: ['1']

    }
  },
  methods: {
    logout () {
      Cookies.remove('user');
      this.$router.push('/login');
      sessionStorage.removeItem("activeName");
    },
    clickMenu(activeid){
      sessionStorage.setItem("activeName", activeid);
      let open = activeid.split("-")[0];
      this.$set(this.openNames, 0, open)
    }
  },
  computed: {
    heightStyle: () => {
      return {
        height: `${document.documentElement.clientHeight- 50}px`
      }
    },
    menuList () {
      return this.$store.getters.getUserMenu;
      
    }
  },
  created() {
    let ac = sessionStorage.getItem("activeName");
    if (ac) {
      this.activeName = ac;
      let open = ac.split("-")[0];
      this.openNames = [];
      this.openNames.push(open);
    }
  },
}
</script >

<style lang="less" scoped>
.index-content{
  display: flex;
}
.head{
  height: 50px;
    width: 100%;
}
.split-pane{
  width: 160px;
  float: left;
}
.split-pane-right{
    flex: 1;
    overflow: auto;
    background: #EEF3F4;
}
.menu-link{
  width: 100%;
  height: 100%;
  display: inline-block;
}
/deep/.ivu-menu-vertical.ivu-menu-light:after{
  background: #fff;
}
</style>
