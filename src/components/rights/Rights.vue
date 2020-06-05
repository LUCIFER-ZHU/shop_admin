<template>
  <el-table :data="rightsData" style="width: 100%">
    <el-table-column type="index" :index="indexMethod"> </el-table-column>
    <el-table-column prop="authName" label="权限名称" width="180">
    </el-table-column>
    <el-table-column prop="path" label="路径" width="180"> </el-table-column>
    <el-table-column label="等级">
      <template slot-scope="scope">
        <span v-if="scope.row.level == 0">一级</span>
        <span v-if="scope.row.level == 1">二级</span>
        <span v-if="scope.row.level == 2">三级</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ]
    }
  },
  created () {
    this.loadRightsData()
  },
  methods: {
    // 请求权限数据
    async loadRightsData () {
      let res = await this.$axios.get('rights/list')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsData = res.data.data
      }
    },
    // 处理索引
    indexMethod (index) {
      // console.log(index)
      return index
    }
  }
}
</script>

<style></style>
