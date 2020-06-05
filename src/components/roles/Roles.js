export default {
  data () {
    return {
      roleData: [
        {
          roleName: '2016-05-02',
          roleDesc: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 分配权限对话框显示
      dialogAssignRightsVisible: false,
      // 分配权限对话框数据
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        // 负责结构
        children: 'children',
        // 负责标题
        label: 'authName'
      },

      // 角色id
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadAllRightsData()
  },
  methods: {
    // 加载角色列表
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.roleData = res.data.data
    },
    // 处理索引
    indexMethod (index) {
      // console.log(index)
      return index
    },

    // 获取所有权限信息
    async loadAllRightsData () {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      this.treeData = res.data.data
    },
    // 显示分配权限对话框
    showAssignRightsDialog (row) {
      // 保存一下 角色id
      this.roleId = row.id

      // 1-显示框
      this.dialogAssignRightsVisible = true

      // 2-获取第三层ID
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })

      // 3-设置keys
      this.$nextTick(() => {
        // console.log(this.$refs.tree)

        this.$refs.tree.setCheckedKeys(keys)
      })
      // 异步dom更新，打印早了{}空的
      // this.$refs.tree.setCheckedKeys([3])
    },
    // 角色授权
    async assignRights () {
      // 获取Tree里半选和全选的id
      let keys1 = this.$refs.tree.getHalfCheckedNodes()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = keys1.concat(keys2)
      // console.log(keys)

      // 1角色 ID this.roleId
      // 2权限 ID rids

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })

      // console.log(res)
      if (res.data.meta.status === 200) {
        // 1-刷新当前页面
        this.loadRolesData()
        // 2-提示
        this.$message({
          message: '分配权限成功',
          type: 'success',
          duaration: 800
        })
        // 3-关闭对话框
        this.dialogAssignRightsVisible = false
      }
    }
  }
}
