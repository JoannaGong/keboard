<template>
  <div class="app-container">
    <el-table
      :data="planList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="方案名称">
      </el-table-column>
      <el-table-column
        prop="disabled_name"
        label="状态"
         width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建日期"
        width="180">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.disabled === 0 ?"禁用":"启用"}}</el-button>
        <el-button @click="toCheck(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="toDel(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { getPlans,setPlan,delPlan } from '@/api/scheme'

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
      const id = row.id;
      const disabled = row.disabled  === 0 ? 1:0;
      const msg  = row.disabled  === 0 ? '禁用成功':'启用成功'

      const params = {
        id,disabled
      }
      let planList = this.planList;
      
      setPlan(params).then(res => {
        planList.forEach(item => {
          if(item.id === id){
            item.disabled = item.disabled === 0 ? 1:0;
            item.disabled_name = item.disabled === 0 ? "启用":"禁用"
          }else{
            item.disabled = 1
            item.disabled_name = "禁用"
          }
          
         
        })
        this.planList = planList;
          Message({
            message: msg,
            type:'success',
            duration: 2 * 1000
          })
      })
    },
    toCheck:function(row){
      this.$router.push({ name: 'Tree', params: { id: row.id,content:row.content,name:row.name,disabled:row.disabled }})
    },
    toDel:function(row){
      let planList = this.planList;
      delPlan({id:row.id}).then(res => {
          let index = planList.findIndex(item => item.id === row.id);
          planList.splice(index,1);
          this.planList = planList;
          Message({
            message: '删除成功',
            type:'success',
            duration: 2 * 1000
          })
      })
    }
  }
}
</script>
