<template>
  <div class="project-container">
    <div>
    
      <div class="building-box">
        <div class="top-building">
          <div class="num-left">总楼栋数：<span>{{pageObj.pageTotal}}栋</span></div>
          <!-- <div class="num-right">
            <span>数据来源：建筑普查</span>
            <span>更新时间：2015年1月</span>
          </div> -->
        </div>
        <div class="building-table">
          <Table stripe  :columns="columns" :data="BuildDataList" />
        </div>
        <div style="text-align:center; margin:30px 0px 30px 0px">
          <Page :page-size="pageObj.pageSize" :current="pageObj.pageNum" :total="pageObj.pageTotal" @on-change="pageChange"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSuperAraeByChildId, getDictByItem, getChildAreaBySuperId, getDictByDictName} from '@/utils/index.js'
export default {
  props: {
    buildQueryObj: Object,
    pageObj: Object,
    BuildDataList: Array
  },
  data(){
    return {
      pupShow:false,
      buildLayoutList: getDictByDictName('建筑结构'),
      buildHeightList: getDictByDictName('总层高'),
      currentData: {},
      childArea: [],
      queryObj:{
        superAreaId:'',
        areaId:'',
        num:'',
        parcelArea:''
      },
      columns: [
          {
              title: '楼栋ID',
              align: 'center',
              key: 'buildId',
              minWidth: 80,
          },
          {
              title: '楼栋名称',
              align: 'center',
              key: 'buildName',
              width: 300
          },
          {
              title: '楼栋编码',
              align: 'center',
              key: 'buildCode',
              minWidth: 220
          },
          {
              title: '总层数',
              align: 'center',
              key: 'buildLayer',
              minWidth: 150
          },
          {
              title: '电梯',
              align: 'center',
              key: 'buildElevator',
              minWidth: 100,
          }  
      ]
    }
  },
  methods:{
    showDetail(row){
      this.pupShow = true
      this.currentData = row;
      console.log(this.currentData)
    },
    queryBuild () {
      this.$emit("on-queryBuild");
    },
    closePup(){
      this.pupShow = false
    },
    changeArea (areaId) {
      this.childArea  = getChildAreaBySuperId(areaId);
    },
    pageChange (page) {
      this.pageObj.pageNum = page;
      this.$parent.initResidenceBuild();
    },
  },
  filters: {
    areaNameFilters(val){
      return getSuperAraeByChildId(val).areaName
    },
    buildLayoutFilters(val){
      return getDictByItem('建筑结构', val).dictItem
    },
    buildHeightFilters(val){
      return getDictByItem('总层高', val).dictItem
    }
  },
  computed: {
    superArea () {
      return this.$store.getters.getSuperArea;
    }
  }
}
</script>
<style lang="less" scoped>
.pup-home{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    .pup-content{
      position: relative;
      width: 800px;
      background: #fff;
      border-radius:10px;
      .close-box{
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
      }
      .container-madie{
        padding: 50px 40px 40px;;
      }
      .updata-title{
        color: #97A8B0;
        font-size: 14px;
        margin-left: 30px;;
      }
    }
    .bg-box{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
}

.project-container{
  padding: 0px 20px 20px 20px;
}
.project-select{
    font-size: 14px;
    color: #97a8b0;
    margin-top: 20px;
    padding: 20px;
    background: #1a2631;
    border: 1px solid #324251;
    border-radius: 4px;
    .select-title{
        width: 100px;
        margin-top: 5px;
      }
    .target-selcet{
      display: flex;
      align-items: center;
      padding: 20px 0;
    }
    .select-text{
        width: 20%;
        margin-right: 20px;
    }
}
.building-box{
  margin-top: 22px;
  .top-building{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;;
  }
  .num-left{
    color: #2B313C;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;;
  }
  .num-right{
    color: #97A8B0;
    font-size: 12px;
    span{
      margin-left: 20px;
    }
  }
}
</style>