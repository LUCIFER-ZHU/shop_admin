import axios from 'axios'
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
      }
    }
  },
  created () {
    this.loadUserData()
  },
  methods: {
    // 加载用户数据
    async loadUserData (pagenum = 1, query = '') {
      const url = 'http://localhost:8888/api/private/v1/users'
      const config = {
        params: {
          query,
          // 应该是点击页码传过去页码
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      let res = await axios.get(url, config)

      console.log(res)
      // 保存列表数据
      this.userData = res.data.data.users
      // 保存用户总个数
      this.total = res.data.data.total
      // 保存当前页码
      this.pagenum = res.data.data.pagenum

      // axios
      // .get('http://localhost:8888/api/private/v1/users', {
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
      let res = await axios.post(
        'http://localhost:8888/api/private/v1/users',
        this.addUserForm,
        {
          headers: {Authorization: localStorage.getItem('token')}
        }
      )
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
    }
  }
}
