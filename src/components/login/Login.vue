<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable*/
import axios from 'axios'

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          console.log('开始登陆')

          let res = await axios.post(
            'http://localhost:8888/api/private/v1/login',
            this.ruleForm
          )
          console.log(res)
          if (res.data.meta.status === 200) {
            // 把token保存到本地
            localStorage.setItem('token', res.data.data.token)
            // 成功提示
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              duration: 800
            })
            // 跳转
            this.$router.push('/home')
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error',
              duration: 1500
            })
          }
          // 发送请求
          // axios
          //   .post('http://localhost:8888/api/private/v1/login', this.ruleForm)
          //   .then(res => {
          //     console.log(res)
          //     if (res.data.meta.status === 200) {
          //       // 把token保存到本地
          //       localStorage.setItem('token', res.data.data.token)
          //       // 成功提示
          //       this.$message({
          //         message: '恭喜你，登录成功',
          //         type: 'success',
          //         duration: 800
          //       })
          //       // 跳转
          //       this.$router.push('/home')
          //     } else {
          //       this.$message({
          //         message: res.data.meta.msg,
          //         type: 'error',
          //         duration: 1500
          //       })
          //     }
          //   })
        } else {
          alert('格式不正确')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-col {
  background-color: #fff;
  border-radius: 15px;
  padding: 30px 30px;
}
</style>
