<template>
  <div class="app-container">
        <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    //HelloWorld
  },
  data() {
    return {
      split1: 0.13,
      theme: "light"
    }
  },
  computed: {
    heightStyle: () => {
      return {
        height: `${document.documentElement.clientHeight- 50}px`
      }
    }
  }
}
</script >

<style>
.app-container{
  height: 100%;
  width: 100%;
}
.head{
  height: 50px;
    width: 100%;
}
.demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
}
.demo-split-pane-right{
    padding-left: 5px;
}
.menu-link{
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
