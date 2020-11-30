<template>
  <div class="header">
    <div class="header-left">
      <div class="logo-content">
        <img src="img/logo.455c9ef4.png" alt="">
      </div>
      <!-- <div class="data-box">
        <span class="data-txt">数据聚合：</span>
        <span class="data-num">2222</span><sub>万元</sub>
        <span class="data-txt data-next">调用量：</span>
        <span class="data-num">2222</span> <sub>万元</sub>
      </div> -->
    </div>
    <div class="header-right">
      <!-- <div class="nav-list">
        <ul>
          <li>全样本指标</li>
          <li>居住行为系统</li>
          <li>预警平台</li>
        </ul>
      </div> -->
      <div class="user-box">
        <img src="data:image/png;base64,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" alt="">
        <span>{{userName}}</span>
      </div>
      <div class="login-out" @click="logout"> 退出 </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName:this.$store.getters.getUser.userName
    }
  },
  methods: {
    logout(){
      this.$emit("on-logout");
    }
  },
}
</script>

<style lang="less" scoped>
  .header{
    width: 100%;
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 65px 0 22px;
    background: #2C3042;
  }
  .header-left{
    display: flex;
    align-items: center;
    .logo-content{
        width: 235px;
        height: 49px;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .data-box{
          margin-left: 26px;
          background: -webkit-gradient(linear,left bottom,left top,from(#07131d),to(#1a2f39));
          background: linear-gradient(0deg,#07131d,#1a2f39);
          border: 1px solid hsla(0,0%,100%,.06);
          border-radius: 4px;
          height: 36px;
          line-height: 36px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          color: #96acc1;
          .data-txt{
              color: #96acc1;
              font-size: 14px;
          }
          .data-num{
              color: #0eb18d;
              font-size: 20px;
          }
          sub {
              bottom: -.25em;
          }
          .data-next{
              margin-left: 20px;
          }
      }
  }
  .header-right{
    display: flex;
    align-items: center;
    .nav-list{
        color: #b5b5b5;
        font-size: 16px;
        ul{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          li{
            margin: 0 30px;
            cursor: pointer;
          }
      }
    }
    .user-box{
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .login-out{
        font-size: 12px;
        color: #9f9f9f;
        margin-left: 30px;
        cursor: pointer;
        &:hover{
          color: red;
        }
    }
  }
</style>