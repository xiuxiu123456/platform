import axios from 'axios'
import Cookies from 'js-cookie';
import router from '@/router';

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间

//整理数据
// axios.defaults.transformRequest = function (data) {
// //data = Qs.stringify(data);
// data = JSON.stringify(data);
//   return data;
// };

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);  
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    // if (cookie.get("token")) {
    //     //用户每次操作，都将cookie设置成2小时 
    //     Cookies.set("user",Cookies.get("user") ,1/48);
    //     // config.headers.token = cookie.get("token");
    //     // config.headers.name= cookie.get("name");
    // }
    Cookies.set("user",Cookies.get("user") ,1/48);
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.status =="302") {
        router.push("/login");
        return
    }else{
        return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default axios;