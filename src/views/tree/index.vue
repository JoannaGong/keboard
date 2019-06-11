<template>
  <el-container  style="height: 700px;max-width: 500px;padding-top:20px;width:100%">
    <el-header>
      <div class="inputGroup" v-if="!planId">
        <div class="name">方案名称：</div>
        <el-input v-model="planName" placeholder="请输入方案名称"></el-input>
      </div>
    </el-header>
    <el-main>
      <div ref="myChart" style="height: 100%;width:100%;min-width:500px;padding-left:20px"></div>
    </el-main>
    <el-footer>
      <div class="buttonGroup" v-if="!planId">
        <el-button type="primary" @click="savePlan" >保存方案</el-button>
        <el-button @click="reset">重置方案</el-button>
      </div>
      <div class="buttonGroup" v-else>
        <el-button @click="$router.back(-1)">返回</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { MessageBox, Message, Header } from 'element-ui'
import './index.scss'
import { setPlans } from '@/api/scheme'
import pointImg from '@/assets/image/pointImg.png'
export default {

  data() {
    return {
      pointIdArr:this.$route.params.content || [],
      option:{},
      myChart:{},
      planName:"",
      planId:this.$route.params.id || null
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
    reset:function(){
      this.pointIdArr = []
    },
    savePlan:function(){
      let sendData = {
        name:this.planName,
        content:JSON.stringify(this.pointIdArr),
        disabled:1
      }
      setPlans(sendData).then((res)=>{
          Message({
            message: '保存成功',
            type:'success',
            duration: 2 * 1000
          })
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
      for(let i = 0;id < 391;i++,id++){
        if(y == 19 ){
          x = x + 1;
          y = 1.5
        }

        if(y == 18.5){
          y = 1;
          x = x + 1
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
            right:0,
            bottom:0,
            width:'100%',
            height:'100%',
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
            },
            offset:1
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
            symbol:'image://'+pointImg,
            symbolSize: 22,
            data: point,
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

      if(!this.planId){
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
}
</script>

