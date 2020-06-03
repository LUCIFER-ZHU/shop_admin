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
      state: true
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
      let res = await axios
        .get(url, config)

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
    }
  }
}
