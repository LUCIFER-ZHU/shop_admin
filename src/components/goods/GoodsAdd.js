export default {
  data () {
    return {
      // 步骤条
      activeIndex: 1,
      // 标签页s
      activeName: 'one',
      // 表单对象
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        radio: 1
      },
      // 级联选择器数据
      // children 结构 label标题 value收集数据
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      // 级联选择器 配置对象
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name'
      },
      // 上传数据
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传图片请求头
      headers: {
        Authorization: localStorage.getItem('token')
      },
      //
      editorOption: {
        placeholder: '请输入密码'
      }
    }
  },
  created () {
    this.loadCatName()
  },
  methods: {
    clickTabs (tab) {
      this.activeIndex = +tab.index + 1
    },
    next (step, tab) {
      this.activeIndex = step
      this.activeName = tab
    },

    // 加载分类数据
    async loadCatName () {
      let res = await this.$axios.get('categories')
      // console.log(res)
      this.options = res.data.data
    },
    // 上传的两个方法
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传图片的钩子
    uploadImgSuccess (res) {
      // console.log(res.data.tmp_path)
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    // 点击添加商品
    async addGoods () {
      // 获取参数
      /* eslint-disabled */
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm
      let res = await this.$axios.post('goods', {
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        // 1-提示
        this.$message({
          message: '添加商品成功',
          type: 'success',
          duaration: 800
        })
        // 2-跳转
        this.$router.push('/goods')
      }
    }
  }
}
