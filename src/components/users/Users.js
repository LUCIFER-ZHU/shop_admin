
export default {
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: 'wangxiaohu@qq.com',
          mobile: 1231531
        }
      ],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 查询内容
      queryText: '',
      // 用户状态
      state: true,
      // 显示添加用户对话框
      dialogAddUserFormVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户 校验规则
      rules: {
        username: [
          // 是否有内容
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 格式是否正确
          {
            required: true,
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          // 是否有内容
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 格式是否正确
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            // 格式是否正确
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            // 格式是否正确
            pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
            message: '邮箱格式错误',
            trigger: 'blur'
          }
        ]
      },
      // 显示编辑用户对话框
      dialogEditUserFormVisible: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },

      // 显示分配角色对话框
      dialogAssignRoleVisible: false,
      assignRoleForm: {
        username: '',
        id: 0,
        rid: ''
      },
      // 角色列表
      rolesData: []
    }
  },
  created () {
    this.loadUserData()
    this.loadRolesData()
  },
  methods: {
    // 加载用户数据
    async loadUserData (pagenum = 1, query = '') {
      const url = 'users'
      const config = {
        params: {
          query,
          // 应该是点击页码传过去页码
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get(url, config)

      console.log(res)
      // 保存列表数据
      this.userData = res.data.data.users
      // 保存用户总个数
      this.total = res.data.data.total
      // 保存当前页码
      this.pagenum = res.data.data.pagenum

      // this.$axios
      // .get('users', {
      //   params: {
      //     query,
      //     // 应该是点击页码传过去页码
      //     pagenum,
      //     pagesize: 2
      //   },
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      // .then(res => {
      //   console.log(res)
      //   // 保存列表数据
      //   this.userData = res.data.data.users
      //   // 保存用户总个数
      //   this.total = res.data.data.total
      //   // 保存当前页码
      //   this.pagenum = res.data.data.pagenum
      // })
    },
    // 点击页码
    clickCurrentPage (curPage) {
      // console.log('点击了页码')
      this.loadUserData(curPage, this.queryText)
    },
    // 开始查询内容
    startQuery () {
      this.loadUserData(1, this.queryText)
    },

    // 显示添加用户对话框
    showAddUserDialog () {
      this.dialogAddUserFormVisible = true
    },
    // 添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      // console.log(res)
      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.dialogAddUserFormVisible = false
        // 刷新页面
        this.loadUserData()
        // 添加用户提示
        this.$message({
          message: '添加成功',
          type: 'success',
          duaration: 800
        })
        // 重置表单
        this.$refs.addUserForm.resetFields()
      } else {
      }
    },
    // 监听添加用户对话框关闭
    dialogClosed () {
      // 重置表单
      this.$refs.addUserForm.resetFields()
    },

    // 点击删除用户按钮
    async delUser (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log('queding')
        let res = await this.$axios.delete(`users/${id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          // 1-刷新页面
          this.loadUserData()
          // 2-提示
          this.$message({
            message: '删除成功',
            type: 'success',
            duaration: 800
          })
        }
      } catch (error) {
        // console.log('quxiao')
        this.$message({
          message: '取消删除',
          type: 'info',
          duaration: 800
        })
      }
    },

    // 点击状态改变按钮
    async stateChange (row) {
      // console.log(row)
      // eslint-disable-next-line
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`, null)
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 1-刷新当前页面
        this.loadUserData(this.pagenum)
        // 2-提示
        this.$message({
          message: '修改成功',
          type: 'success',
          duaration: 800
        })
      }
    },

    // 点击显示编辑用户对话框
    showEditUserDialog (row) {
      // 1获取用户名邮箱电话
      const { username, email, mobile, id } = row
      // console.log(username)
      // 2赋值给绑定表单的对象
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id

      this.dialogEditUserFormVisible = true
    },
    // 编辑用户
    async editUser () {
      // 1从编辑用户对象里拿数据
      const { email, mobile, id } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 1-刷新当前页面
        this.loadUserData(this.pagenum)
        // 2-提示
        this.$message({
          message: '更新成功',
          type: 'success',
          duaration: 800
        })
        // 3-关闭对话框
        this.dialogEditUserFormVisible = false
      }
    },

    // 获取所有角色列表
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rolesData = res.data.data
    },
    // 点击按钮显示分配角色对话框
    async showAssignRolesDialog (row) {
      this.dialogAssignRoleVisible = true

      // console.log(row)有id和rolename，没rid
      const {id, username} = row
      // 根据 ID 查询用户信息 这个接口有rid
      let res = await this.$axios.get(`users/${id}`)
      // console.log(res)
      // 把三个对象赋值给assignRoleForm对象
      this.assignRoleForm.username = username
      this.assignRoleForm.id = id
      this.assignRoleForm.rid = (res.data.data.rid == -1 ? '' : res.data.data.rid)
    },
    // 点击确定分配角色
    async assignRole () {
      // 接口需要两个参数 id rid
      const {id, rid} = this.assignRoleForm
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 1-关闭对话框
        this.dialogAssignRoleVisible = false
        // 2-提示
        this.$message({
          message: '分配成功',
          type: 'success',
          duaration: 800
        })
        // 3-刷新
        this.loadUserData(this.pagenum)
      }
    }
  }
}
