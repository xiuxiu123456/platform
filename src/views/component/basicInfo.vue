<template>
  <div class="info-content">
    <div class="basic-info">
      <div class="l-info">
        <div class="project-box">
          <div class="project-title">项目基本信息：</div>
          <ul class="info-list">
            <li>
              <span class="info-title">占地面积：</span>
              <span class="info-val">{{this.villageInfo.villageArea}}m<sup>2</sup></span>
            </li>
            <li>
              <span class="info-title">总建筑面积：</span>
              <span class="info-val">{{this.villageInfo.villageBuild}}m<sup>2</sup></span>
            </li>
            <li>
              <span class="info-title">总栋数：</span>
              <span class="info-val">{{this.villageInfo.villageNum}}栋</span>
            </li>
            <li>
              <span class="info-title">带电梯栋数：</span>
              <span class="info-val">{{this.villageInfo.villageElevatorNum}}栋</span>
            </li>
            <li>
              <span class="info-title">居住人数：</span>
              <span class="info-val">{{this.villageInfo.villagePopul}}万人</span>
            </li>
            <li>
              <span class="info-title">居住群体：</span>
              <span class="info-val">{{this.villageInfo.villageType}}</span>
            </li>
            <li>
              <span class="info-title">停车位数量：</span>
              <span class="info-val">{{this.villageInfo.villageParking}}个</span>
            </li>
            <li>
              <span class="info-title">停车位佣金：</span>
              <span class="info-val">{{this.villageInfo.villageParkingFee}}/m<sup>2</sup>/月</span>
            </li>
            <li>
              <span class="info-title">四至：</span>
              <span class="info-val">{{this.villageInfo.fourTo}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="r-info">
        <div class="project-box">
          <div class="project-title">建筑物使用用途分布：</div>
          <div class="info-fb">
            
            <div class="echar-box" ref="ref1"></div>
            <div class="table-use">
              <Table :columns="columns" :data="useDataTable" size="small" :disabledHover=true ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="basic-info">
      <div class="l-info">
        <div class="project-box jz-box">
          <div class="project-title">居住租赁情况
            <div class="updata-title">更新时间：</div>
            <Date-picker type="month" :value="leaseMonth" placeholder="选择月" style="width: 140px" @on-change="leaseMonthChange"></Date-picker>
          </div>
          <div class="jz-ifo">
            <ul>
              <li>
                <span class="info-title">出租率：</span>
                <span class="info-val"><span v-if="leaseInfoObj.leaseRentRate">{{leaseInfoObj.leaseRentRate*100}}%</span></span>
              </li>
              <li>
                <span class="info-title">水费（均）：</span>
                <span class="info-val">{{leaseInfoObj.leaseWaterFee}}元/m<sup>2</sup></span>
              </li>
              <li>
                <span class="info-title">电费（均）：</span>
                <span class="info-val">{{leaseInfoObj.leaseElectFee}}元/度 </span>
              </li>
              <li>
                <span class="info-title">管理费（均）：</span>
                <span class="info-val">{{leaseInfoObj.leaseManagerFee}}元/m<sup>2</sup>/月</span>
              </li>
            </ul>
          </div>
          <div class="zj-tabla">
            <div class="title-zj">户型租赁信息：</div>
            <Table :columns="column1" :data="leaseInfoObj.villageLeaseTypes" size="small" :disabledHover=true ></Table>
          </div>
        </div>
      </div>
      <div class="r-info">
        <div class="project-box">
          <div class="project-title">工业租赁情况
            <div class="updata-title">更新时间：</div>
            <Date-picker type="month" :value="industryMonth" placeholder="选择年" style="width: 140px"  @on-change="industryMonthChange"></Date-picker>
          </div>
          <div class="info-fb">
            <div class="box-fb">
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">工业区厂房租金范围：</span>
                  <span class="info-val">{{industryInfo.industryTyep}}</span>
                </div>
                <div>
                  <span class="info-title">工业区厂房出租率：</span>
                  <span class="info-val"><span v-if="industryInfo.industryRate"> {{industryInfo.industryRate*100}}%</span></span>
                </div>
              </div>
              <div class="item-info">
                <span class="info-title">所属行业：</span>
                  <span class="info-val">{{industryInfo.modelName}}</span>
              </div>
              <div class="item-info">
                <span class="info-title">工业区租赁企业代表：</span>
                  <span class="info-val">{{industryInfo.industryEnterprise}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cz-box">
      <div class="project-title">长租公寓进驻情况
        <div class="updata-title">更新时间：</div>
        <Date-picker type="month" :value="apartmentMonth" placeholder="选择年" style="width: 140px"  @on-change="apartmentMonthChange"></Date-picker>
      </div>
      <div class="info-fb">
        <div class="jz-info-box">
          <div class="frist-jz">
            <span class="info-title">进驻企业数量：</span>
              <span class="info-val">{{apartmentInfo.enterNum || '--'}}家</span>
          </div>
          <div class="">
            <span class="info-title">进驻总栋数：</span>
              <span class="info-val">{{apartmentInfo.buildNum || '--'}}栋</span>
          </div>
        </div>
      </div>
      <div class="tab-basic">
          <ul>
            <li v-for="(item,index) in apartmentInfo.enterList" :key="index" :class="{active:idxShow ==index}" @click="homeTabClick(item,index)">
              {{item.apartmentEnterName}}({{item.apartmentTotal}})
            </li>
          </ul>
          <template v-if="apartmentInfo.enterList && apartmentInfo.enterList[this.idxShow].villageApartmentBuildList">
          <div class="tab-content" v-for="(item,index) in apartmentInfo.enterList[this.idxShow].villageApartmentBuildList" :key="index">
            <div class="about-home">
              <div class="name-home">{{item.apartmentBuildName}}（{{item.apartmentBuildCode}}）</div>
              <div class="jz-info-box">
                <div  class="frist-jz">
                  <span  class="info-title">栋改造进度：</span>
                  <span class="home-status">{{item.apartmentBuildStatus | valStatus}}</span>
                </div>
                <div v-if="item.apartmentBuildRate">
                  <span  class="info-title">出租率：</span>
                  <span class="info-val">{{item.apartmentBuildRate | valRate}}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        </div>
    </div>
  </div>
</template>
<script>
import {getDictByItem} from '@/utils/index.js'
export default {
  props: {
    villageInfo: Object,
    useDataTable: Array,
    echartDataObj: Object,
    leaseInfoObj: Object,
    industryInfo: Object,
    apartmentInfo: Object,
    leaseMonth: Date,
    industryMonth: Date,
    apartmentMonth: Date
  },
  data(){
    return {
      idxShow:0,
      tabCNameList:[
        {
          title:'企业1',
          num:3,
          id:1
        },
        {
          title:'企业2',
          num:7,
          id:2
        },
      ],
      columns:[
        {
            title: '建筑物使用用途',
            key: 'useType',
            align: 'center',
            render: (h, params) => {
              let type = getDictByItem('建筑物使用用途', params.row.useType).dictItem;
              return h('span', {}, type);
            }
        },
        {
            title: '总栋数(栋)',
            key: 'useNum',
            align: 'center'
        },
        {
            title: '总建筑面积(m2)',
            align: 'center',
            key: 'useArea'
        },
      ],
      column1:[
        {
            title: '可出租户型',
            align: 'center',
            key: 'leaseType'
        },
        {
            title: '单套面积范围(m2)',
            align: 'center',
            key: 'leaseAreaType'
        },
        {
            title: '平均租金(元/m2/月)',
            align: 'center',
            key: 'leaseRent'
        },
      ],
      dataTable:[
        {
          use:'居住',
          allNum:'234',
          area:'222'
        },
        {
          use:'居住',
          allNum:'234',
          area:'222'
        },
        {
          use:'居住',
          allNum:'234',
          area:'222'
        },
        {
          use:'居住',
          allNum:'234',
          area:'222'
        },
        {
          use:'居住',
          allNum:'234',
          area:'222'
        },
      ],
      updataTime:'',
    }
  },
  created(){
  },
  methods:{
    homeTabClick(item,index){
      this.idxShow = index
    },
    drowEcharts () {
      // 实例化echarts对象
      let myChart = this.$echarts.init(this.$refs.ref1)
      // 绘制条形图
      myChart.setOption({ 
          color:['#FF7154','#317EF3','#FD4A92','#44C2FC','#FF52F5','#747BFF','#589ff8','#dd90f0','#90dbf0','#e5ee7c'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              itemGap : 5,
              left: 220,
              top : 'middle',
              textStyle:{
                color: '#a8a8a8',
                fontSize : 10
              },
              icon: 'circle',
              data: this.echartDataObj.legend_data
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '60%'],
                  center: ['30%', '50%'],
                  avoidLabelOverlap: false,
                  label: {
                      show: false,
                      //position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: false
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: this.echartDataObj.series_data
              }
          ]
      })
    },
    leaseMonthChange (date) {
      this.$emit("on-leaseMonthChange", date);
    },
    industryMonthChange (date) {
      this.$emit("on-industryMonthChange", date);
    },
    apartmentMonthChange (date) {
      console.log(date instanceof Date)
      this.$emit("on-apartmentMonthChange", date);
    }
  },
  filters:{
    valStatus(val){
      return getDictByItem('栋改造进度', val).dictItem
    },
    valRate(val){
      if (val) return (val * 100).toFixed(0) + '%'
    }
  }
}
</script>
<style lang="less" scoped>
.basic-info{
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  .l-info{
    width: 50%;
    margin-right: 20px;
  }
  .project-box{
      background: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 20px 20px 0 20px;
      margin-top: 20px;
      // min-height: 330px;
      height: 100%;;
      display: flex;
      flex-direction: column;
  }
}
.info-list{
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-top: 20px;
  li{
    width: 50%;
  }
}
.r-info{
  flex: 1;
}
.info-fb{
  margin-top: 20px;;
  display: flex;
  .echar-box{
    width:340px;
    height:266px;
    margin-bottom: 0px;
    background:#F8F8F8;
    border:1px solid #F8F8F8;
    border-radius:4px;
    margin-right: 20px;
  }
  .table-use{
    flex: 1;
    font-size: 12px;;
  }
}
.updata-title{
  color: #5A6C7E;
  font-size: 12px;;
  margin:0 10px 0 30px;
}
.jz-ifo{
  margin-top: 20px;
  ul{
    display: flex;
    justify-content: space-between;
  }
}
  .info-title{
      color: #5A6C7E;
      font-size: 14px;
    }
    .info-val{
      color: #2B313C;
      font-size: 14px;
    }
 .title-zj{
   color: #506173;
   font-size: 12px;
   margin-top:20px;
   margin-bottom: 10px;;
 } 
 .row-top{
   display: flex;
 }
 .item-info{
   margin-top: 20px;;
 }
 .box-fb{
   width: 100%;;
 }
 .left-box{
   width: 50%;;
 }
 .cz-box{
    background: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;
 }
 .jz-info-box{
   display: flex;
   .frist-jz{
     margin-right: 80px;;
   }
 }
 .tab-basic{
   margin-top: 20px;
   ul{
     display: flex;
     li{
        height:38px;
        background:#F3F3F3;
        border-radius:4px;
        padding: 10px 20px;
        margin-right: 8px;
        font-size: 14px;
        color: #2B313C;
        line-height: 16px;
        cursor: pointer;
        &.active{
          color: #FF7154;
        }
     }
   }
 }
 .tab-content{
   background: #F3F3F3;
    padding: 20px 200px 20px 20px;
 }
 .name-home{
   color: #D1DEED;
   font-size: 14px;
   margin-bottom: 10px;;
 }
 .home-status{
   color: #97A1AB;
   font-size: 14px;
 }
 .table-home{
   margin-top: 20px;;
 }
</style>