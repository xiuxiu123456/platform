<template>
  <div class="info-content">
    <div class="basic-info">
      <div class="r-info">
        <div class="project-box">
          <div class="project-title">項目基本信息
            <!-- <div class="updata-title">更新时间：</div>
            <Date-picker type="month" :value="industryMonth" placeholder="选择年" style="width: 140px"  @on-change="industryMonthChange"></Date-picker> -->
          </div>
          <div class="info-fb">
            <div class="box-fb">
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">是否重点园区：</span>
                  <span class="info-val">{{parkInfo.importPark}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">独立围墙大门：</span>
                  <span class="info-val">{{parkInfo.independGate}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">占地面积：</span>
                  <span class="info-val">{{parkInfo.parkArea}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区总建筑面积：</span>
                  <span class="info-val">{{parkInfo.buildArea}}</span>
                </div>
              </div>
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">园区总楼栋数量：</span>
                  <span class="info-val">{{parkInfo.parkTotal}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区用途：</span>
                  <span class="info-val">{{parkInfo.parkUse}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区级别：</span>
                  <span class="info-val">{{parkInfo.parkLevel}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">招商管理能力：</span>
                  <span class="info-val">{{parkInfo.parkManager}}</span>
                </div>
              </div>
              <div class="item-info">
                <span class="info-title">四至：</span>
                  <span class="info-val">{{parkInfo.fourTo}}</span>
              </div>
              <div class="item-info">
                <span class="info-title">临街情况：</span>
                  <span class="info-val">{{parkInfo.toStree}}</span>
              </div>
              <div class="item-info">
                <span class="info-title">园区介绍：</span>
                  <span class="info-val">{{parkInfo.parkAbout}}</span>
              </div>
            </div>
          </div>
          <div style="border-bottom: 1px solid rgba(87, 105, 122, .2);margin-bottom: 20px;"></div>
          <div class="info-fb">
            <div class="box-fb">
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">物业管理公司：</span>
                  <span class="info-val">{{parkInfo.parkManage}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">物业管理联系电话 ：</span>
                  <span class="info-val">{{parkInfo.parkManagePhone}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">物业管理费：</span>
                  <span class="info-val">{{parkInfo.parkManageFee}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">停车位位置：</span>
                  <span class="info-val">{{parkInfo.parkParking}}</span>
                </div>
              </div>
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">停车位个数：</span>
                  <span class="info-val">{{parkInfo.parkParkingNum}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">相对车位：</span>
                  <span class="info-val">{{parkInfo.parkParkingOpposite}}</span>
                </div>
                <div class="left-box">
                </div>
                <div class="left-box">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="basic-info">
      <div class="r-info">
        <div class="project-box">
          <div class="project-title">租赁情况
            <div class="updata-title">更新时间：</div>
            <div style="text-align:left; color: #97A1AB; font-size: 12px;">{{parkInfo.updateTime | time}}</div>
          </div>
          <div class="info-fb">
            <div class="box-fb">
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">园区首层平均租金：</span>
                  <span class="info-val">{{parkInfo.firstRent}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区首层平均租金增长率：</span>
                  <span class="info-val">{{parkInfo.firstRentRate | firstRentFilter }}%</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区非首层平均租金：</span>
                  <span class="info-val">{{parkInfo.nonfirstRent}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">园区非首层平均租金增长率：</span>
                  <span class="info-val">{{parkInfo.nonfirstRentRate  | firstRentFilter}}%</span>
                </div>
              </div>
            </div>
          </div>
          <div style="border-bottom: 1px solid rgba(87, 105, 122, .2);margin-bottom: 20px;"></div>
          <div class="info-fb">
            <div class="box-fb">
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">租赁方式：</span>
                  <span class="info-val">{{parkInfo.leaseType}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">入驻限制：</span>
                  <span class="info-val">{{parkInfo.parkLimit}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">租金优惠：</span>
                  <span class="info-val">{{parkInfo.parkRentDiscount}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">租金优惠幅度：</span>
                  <span class="info-val">{{parkInfo.parkRentDiscountRate | firstRentFilter}}%</span>
                </div>
              </div>
              <div class="row-top">
                <div class="left-box">
                  <span class="info-title">入驻企业税收减免：</span>
                  <span class="info-val">{{parkInfo.feeDiscount}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">代表性企业所属行业：</span>
                  <span class="info-val">{{parkInfo.parkCompanyIndustry}}</span>
                </div>
                <div class="left-box">
                  <span class="info-title">代表性企业：</span>
                  <span class="info-val">{{parkInfo.parkCompany}}</span>
                </div>
                <div class="left-box">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
// import {getDictByItem} from '@/utils/index.js'
export default {
  props: {
    parkInfo: Object
  },
  data(){
    return {
      idxShow:0,
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
          color:['#51af8f','#ee7c91','#eeca6e','#a283f2','#67c8c9','#f0997a','#589ff8','#dd90f0','#90dbf0','#e5ee7c'],
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
    time (val){
      return dayjs(val).format("YYYY-MM-DD")
    },
    firstRentFilter (val) {
      return parseFloat(val*100).toFixed(2);
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
    background:rgba(34,46,59,0.4);
    border:1px solid rgba(40, 53, 66, 1);
    border-radius:4px;
    margin-right: 20px;
  }
  .table-use{
    flex: 1;
    font-size: 12px;;
  }
}
.updata-title{
  color: #97A1AB;
  font-size: 12px;;
  margin:0 20px 0 30px;
}
.jz-ifo{
  margin-top: 20px;
  ul{
    display: flex;
    justify-content: space-between;
  }
}
  .info-title{
      color: #506173;
      font-size: 14px;
    }
    .info-val{
      color: #97A1AB;
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
   margin-bottom: 34px;
 }
 .item-info{
   margin-bottom: 40px;;
 }
 .box-fb{
   width: 100%;
 }
 .left-box{
   width: 25%;;
 }
 .cz-box{
    background: #1a2631;
    border: 1px solid #324251;
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
        background:#283542;
        border-radius:4px;
        padding: 10px 20px;
        margin-right: 8px;
        font-size: 14px;
        color: #D1DEED;
        line-height: 16px;
        cursor: pointer;
        &.active{
          color: #13A882;
          background: #141F29;
        }
     }
   }
 }
 .tab-content{
   background: #141F29;
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