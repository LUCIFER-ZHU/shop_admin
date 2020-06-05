<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8" class="col_l">Title</el-col>
        <el-col :span="8"> <h1>电商后台管理系统</h1> </el-col>
        <el-col :span="8" class="col_r"
          >欢迎来到管理页面，<a href="" @click.prevent="logout"
            >点此处退出</a
          ></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 -->
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/'+item1.path"
              v-for="item1 in item.children"
              :key="item1.id"
              >{{ item1.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadMenuData()
  },
  methods: {
    async logout () {
      // 因为确认框，不点击await得不到promise类型的结果
      try {
        // eslint-disable-next-line
        const p = await this.$confirm(
          '此操作将永久退出账户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        // console.log('确定')
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        this.$router.push('/login')
      } catch (error) {
        // console.log('取消')
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
      // .then(() => {
      //   // console.log('OK')\
      // localStorage.removeItem('token')
      // this.$message({
      //   type: 'success',
      //   message: '退出成功!',
      //   duration: 800
      // })
      // this.$router.push('/login')
      // })
      // .catch(() => {
      // this.$message({
      //   type: 'info',
      //   message: '已取消退出'
      // })
      // })
    },
    // 加载菜单
    async loadMenuData () {
      let res = await this.$axios.get('menus')
      console.log(res)
      this.menus = res.data.data
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  min-width: 800px;
}
.el-header {
  background-color: skyblue;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    line-height: 60px;
    text-align: center;
  }
  .col_l {
    line-height: 60px;
  }
  .col_r {
    text-align: center;
    line-height: 60px;
  }
}
.col_r a {
  color: green;
}
/* 侧边栏 */
.el-aside {
  background-color: #545c64;
}

.el-main {
  background-color: #eaeef1;
}
</style>
