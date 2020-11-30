<template>
  <div class="login-container">
    <div class="login-img"><img  src="../assets/img/logo-img.65af93fe.png" alt=""></div>
    <div class="from-content">
      <div class="ts-box" v-show="loginErr">
        <i class="ivu-icon ivu-icon-md-alert" style="color: red;"></i><span>{{textInfo}}</span></div>
      <div class="input-box">
        <Input v-model="username" placeholder="用户名" style="width: 339px;height: 48px;" />
      </div>
      <div>
        <Input v-model="password" type="password" password placeholder="密码" style="width: 339px;height: 48px;" />
      </div>
      <div class="input-btn">
        <Button type="primary" @click="login" style="width: 339px;height: 48px;font-size: 18px;">登录</Button>
      </div>
    </div> 
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import md5 from 'js-md5';
export default {
  data() {
    return {
      username: '',
      password: '',
      loginErr: false,
      textInfo: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('/login', {
        username: this.username,
        password: md5(this.password)
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.loginErr = false
          Cookies.set('user', 123456);
          this.$router.push('/area');
          this.$store.commit('initUser',resp.data.data);
          this.$store.dispatch('initCache')
          this.$store.dispatch('initUserMenu')
          this.$store.dispatch('initUserFunc')
        } else if(resp.data.code === 0){
          this.textInfo = resp.data.msg
          this.loginErr = true
          Cookies.remove('user')
        } else {
          Cookies.remove('user')
        }
      });
      
    }
  },
}
</script>

<style lang="less" scoped>
.login-container{
    width: 100%;
    height: 100%;
    background: url(../assets/img/login-bg.d2789300.png) no-repeat;
    background-size: cover;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.login-img {
    width: 479px;
    height: 155px;
    margin-right: 100px;
}
.from-content {
    margin-left: 100px;
    position: relative;
    font-size: 16px;
    &::before{
    content: "";
    display: block;
    height: 387px;
    width: 1px;
    border: 2px dashed #fff;
    position: absolute;
    left: -100px;
    top: 50%;
    margin-top: -190px;
    }
}
.input-box{
  margin-bottom: 30px;
}
.input-btn{
  margin-top: 47px;;
}
.ts-box{
    position: absolute;
    top: -70px;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 339px;
    -webkit-text-emphasis: center;
    text-emphasis: center;
    background: rgba(0,0,0,.5);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    span{
      margin-left: 5px;
    }
}
</style>