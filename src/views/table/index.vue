<template>
  <div class="app-container">
    <el-table
      :data="planList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="方案名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="point"
        label="方案内容">
      </el-table-column>
      <el-table-column
        prop="disabled_name"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期"
        width="180">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.disabled === 0 ?"禁用":"启用"}}</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { getPlans } from '@/api/scheme'

export default {
  data() {
    return {
      planList:[]
    }
  },
  mounted() {
    getPlans().then(res => {
      let planList = res.data;

      planList.forEach(item => {
        let point = "";
        let content = item.content;
        content.forEach(item => {
            point = point + item.id + ","
        })
        point = point.substring(0,point.length-1)
        item.point = point;
      })


      this.planList = planList;
    })
  },
  methods: {
    handleClick:function(row){
      console.log(row)
    }
  }
}
</script>
