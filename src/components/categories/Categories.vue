<template>
  <div>
    <el-button @click="showAddCatDialog" type="primary" plain
      >添加分类</el-button
    >
    <!-- 表格 -->
    <el-table :data="catData" style="width: 100%">
      <el-table-tree-column
        tree-key="cat_id"
        parent-key="cat_pid"
        level-key="cat_level"
        :indent-size="20"
        prop="cat_name"
        label="分类名称"
        width="220"
      ></el-table-tree-column>

      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '否' : '是' }}
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-if="scope.row.cat_level == 1">二级</span>
          <span v-if="scope.row.cat_level == 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 第一个对话框 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCatVisible">
      <el-form :model="addCatForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCatForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="addCatForm.cat_pid_arr"
            :props="defaultProps"
            :options="options"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCatVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// common
// var ElTreeGrid = require('element-tree-grid');
import Vue from 'vue'
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)

export default {
  data () {
    return {
      catData: [
        {
          cat_name: 'xiaohu',
          cat_deleted: 'yes',
          cat_level: '1ji'
        }
      ],
      // 是否显示添加分类对话框
      addCatVisible: false,
      // 添加分类对话框数据
      addCatForm: {
        cat_name: '', // 分类名字
        cat_pid_arr: []
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
      }
    }
  },
  created () {
    this.loadCatData()
    this.loadCatData2()
  },
  methods: {
    // 获取全部的
    async loadCatData () {
      let res = await this.$axios.get('categories', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      this.catData = res.data.data.result
    },
    // 获取二级的
    async loadCatData2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    // 点击添加分类显示对话框
    showAddCatDialog () {
      this.addCatVisible = true
    },
    // 点击确定按钮添加分类
    async addCat () {
      // 获取参数
      // eslint-disable-next-line
      const { cat_name, cat_pid_arr } = this.addCatForm

      // 发送请求
      let res = await this.$axios.post('categories', {
        cat_name,
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_level: cat_pid_arr.length
      })

      // console.log(res)
      if (res.data.meta.status === 201) {
        // 1-刷新当前页面
        this.loadCatData()
        // 2-提示
        this.$message({
          message: '添加分类成功',
          type: 'success',
          duaration: 800
        })
        // 3-关闭对话框
        this.addCatVisible = false
      }
    }
  }
}
</script>

<style></style>
