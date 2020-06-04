// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable */
import Vue from 'vue'
import App from './App'
// 引入路由进行挂载
import router from './router/router.js'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义全局公共样式
import './assets/css/common.css'

// 处理axios三个问题
import axios from 'axios'
// 1-公共url
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 2-每个页面都要引入axios
// 在原型上加
Vue.prototype.$axios = axios
// 3.每次请求都要加token
// 加拦截器
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem('token')
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // 方式1 :
    if (response.data.meta.status === 100010) {
      //1.跳转 过登录页
      this.$router.push('/login')
    }
    // 方式2 :
    if (response.data.data.token) {
      localStorage.setItem('token', token)
    }
    // Do something with response data
    return response
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
