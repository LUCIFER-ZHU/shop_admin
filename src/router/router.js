// 引入
/*eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";

// 引入子组件
import Login from "../components/login/Login.vue";
import Home from "../components/home/Home.vue";
import Users from '../components/users/Users.vue';
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/rights/Rights.vue'

// 在模块化工程中
Vue.use(VueRouter);

// 实例化
const router = new VueRouter({
  routes: [
    // 充定向
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: Login },
    { path: "/home", name: "home", component: Home , children:[
      { path: "/users", name: "users", component: Users },
      { path: "/roles", name: "roles", component: Roles },
      { path: "/rights", name: "rights", component: Rights }
    ]}
  ]
});

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === "/login") return next();
  const tokenStr = localStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});
// 导出
export default router;
