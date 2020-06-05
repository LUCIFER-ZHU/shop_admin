// 引入
/*eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入子组件
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/rights/Rights.vue'
import Categories from '../components/categories/Categories.vue'
import Goods from '../components/goods/Goods.vue'
import GoodsAdd from '../components/goods/GoodsAdd.vue'

// 在模块化工程中
Vue.use(VueRouter)

// 实例化
const router = new VueRouter({
  routes: [
    // 充定向
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users/:page?', name: 'users', component: Users },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/categories', name: 'categories', component: Categories },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/goods-add', name: 'goods-add', component: GoodsAdd }
      ]
    }
  ]
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') return next()
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导出
export default router
