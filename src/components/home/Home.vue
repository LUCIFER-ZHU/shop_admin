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
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>

          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    async logout () {
      // 因为确认框，不点击await得不到promise类型的结果
      try {
        const p = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
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
