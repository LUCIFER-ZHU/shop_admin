<template>
  <div>
    <el-button @click="go2GoodsAdd" type="success">添加商品</el-button>
    <el-table :data="goodsData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [
        {
          goods_name: 'tv',
          goods_price: '123',
          goods_number: '100',
          add_time: '2020'
        }
      ]
    }
  },
  created () {
    this.loadGoodsData()
  },
  methods: {
    // 加载商品数据
    async loadGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res)
      this.goodsData = res.data.data.goods
    },
    // 跳转商品页面
    go2GoodsAdd () {
      this.$router.push('/goods-add')
    }
  },
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  }
}
</script>

<style></style>
