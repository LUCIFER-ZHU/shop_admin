// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable */
import Vue from "vue";
import App from "./App";
// 引入路由进行挂载
import router from "./router/router.js";
// 引入element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入自定义全局公共样式
import "./assets/css/common.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  el: "#app",
  components: { App },
  template: "<App/>"
});
