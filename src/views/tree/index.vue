<template>
  <el-container  style="height:100%;max-width: 400px;padding-top:20px;width:100%">
    <el-header>
      <div class="inputGroup">
        <div class="name">方案名称：</div>
        <el-input v-model="planName" placeholder="请输入方案名称"></el-input>
      </div>
    </el-header>
    <el-main style="background: #999;padding-top:20px;">
      <div ref="myChart" style="height:500px;width:400px;padding-left:20px;padding-right:20px"></div>
    </el-main>
    <el-footer>
      <div class="buttonGroup" v-if="!planId">
        <el-button type="primary" @click="savePlan(1)" >保存方案</el-button>
        <el-button type="primary" @click="savePlan(0)" >保存并启用方案</el-button>
        <el-button @click="reset">重置方案</el-button>
      </div>
      <div class="buttonGroup" v-else>
        <el-button type="primary" @click="amend(disabled)">保存修改</el-button>
        <el-button type="primary" @click="amend(0)" >保存修改并启用方案</el-button>
        <el-button @click="$router.back(-1)">返回列表</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { MessageBox, Message, Header } from 'element-ui'
import './index.scss'
import { setPlans,amendPlan } from '@/api/scheme'
import { setTimeout } from 'timers';

import pointImg from '@/assets/image/pointImg.png'
import pointWhite from '@/assets/image/point_white.png'
import pointYellow from '@/assets/image/point_yellow.png'

export default {

  data() {
    return {
      pointIdArr:this.$route.params.content || [],
      option:{},
      myChart:{},
      planName:this.$route.params.name || "",
      planId:this.$route.params.id || null,
      disabled:this.$route.params.disabled || 0
    }
  },
  watch: {
     pointIdArr(val){
      let option = this.option;
      let series = option.series;
      const cash = {
          symbolSize: 12,
          data: val,
          type: 'scatter', 
          animation:false,
          itemStyle:{
            color:'#000'
          },
          zlevel:2
      }
      option.series[1] = cash;
      this.myChart.setOption(option);
    }
  },
  created(){

    
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    amend:function(start){
      const params ={
            id:this.planId,
            name:this.planName,
            content:JSON.stringify(this.pointIdArr),
            disabled:start
        }
        amendPlan(params).then(res => {
          Message({
            message: '修改成功',
            type:'success',
            duration: 2 * 1000
          })

          setTimeout(()=>{
              this.$router.back(-1)
          },2000)
        })
    },
    reset:function(){
      this.pointIdArr = []
    },
    savePlan:function(start){
        console.log(start)
      if(!this.planName){
        Message({
          message: '请填写方案名称',
          type:'warning',
          duration: 2 * 1000
        })
        return
      }
      let sendData = {
        name:this.planName,
        content:JSON.stringify(this.pointIdArr),
        disabled:start
      }
      setPlans(sendData).then((res)=>{
          Message({
            message: '保存成功',
            type:'success',
            duration: 2 * 1000
          })

          setTimeout(()=>{
              this.$router.push('/example/table')
          },2000)
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart);

      let point = [];
      let id_1 = 1;
      let x_1 = 20;
      let y_1 = 0;

      for(let j = 0;id_1 < 22;j++,id_1++){
      
        point.push({
          id:id_1,
          value:[x_1,y_1]
        })

        x_1 = x_1 - 1;
        y_1 = y_1 === 0 ? -0.5 : 0
      } 

      let id = 23;
      let x = 0;
      let y = 1;
      for(let i = 0;id < 221;i++,id++){
        if(y == 19 ){
          x = x + 2;
          y = 1
        }

        point.push({
          id:id,
          value:[x,y]
        })

        y = y + 1;
      } 

  
      let initOption = {
        grid:[
          {
            top:0,
            left:0,
            right:10,
            bottom:30,
            width:'100%',
            containLabel:true
          },
        ],
        xAxis: [
          {
            data:['A','','B','','C','','D','','E','','F','','G','','H','','I','','J','','K'],
            gridIndex:0,
            minInterval:1,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false,
              alignWithLabel:true
            },
            splitLine:{
              show:false
            }
          },
          {
            data:['A','','B','','C','','D','','E','','F','','G','','H','','I','','J','','K'],
            gridIndex:0,
            minInterval:1,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false,
              alignWithLabel:true
            },
            splitLine:{
              show:false
            },
            offset:1
          }
        ],
        yAxis:[
          {
            type: "value",
            min:1,
            max:18,
            splitNumber:18,
            gridIndex:0,
            axisLine:{
                show:false
            },
            axisTick:{
              show:false
            },
            splitLine:{
              show:false
            }          
          },
          {
            type: "value",
            min:1,
            max:18,
            splitNumber:20,
            gridIndex:0,
            axisLine:{
                show:false
            },
            axisTick:{
              show:false
            },
            splitLine:{
              show:false
            }          
          }
        ],
        series: [{
            symbolSize: 22,
            data: point.map((item,index) => {
              let symbol = "";
              if(item.value[1] < 4){
                symbol = 'image://'+ pointImg
              }else if(item.value[1] < 18){
                symbol = 'image://'+ pointWhite
              }else{
                symbol = 'image://'+ pointYellow
              }
              return {
                ...item,
                symbol:symbol
              }
            }),
            type: 'scatter', 
            animation:false
        }]
      };

      if(this.planId){
        const cash = {
          symbolSize: 12,
          data: this.pointIdArr,
          type: 'scatter', 
          animation:false,
          itemStyle:{
            color:'#000'
          },
          zlevel:2
        }

        initOption.series.push(cash)
      }

      this.option = initOption;
      // 绘制图表
      this.myChart.setOption(initOption);


      this.myChart.on('click', (params)=>{
        let id = params.data.id;
        let value = params.data.value;
        
        let index = this.pointIdArr.findIndex(item => item.id == id);
        if(index == -1){
            this.pointIdArr.push({id,value})
        }else{
          this.pointIdArr.splice(index,1)
        }
      })
      
    }
  }
}
</script>

