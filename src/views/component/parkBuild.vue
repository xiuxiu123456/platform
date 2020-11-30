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
    <div class="pup-home" v-show="pupShow">
      <div class="bg-box" @click="closePup"></div>
      <div class="pup-content">
        <div class="close-box" @click="closePup"><Icon type="md-close" /></div>
        <div class="container-madie">
          <div class="project-title">{{currentData.buildName}}<div class="updata-title">ID:{{currentData.buildId}}</div></div>
          <div class="pup-about-info" style="border-bottom: 1px solid rgba(87, 105, 122, .2);">
            <div class="title-item">基础信息</div>
            <ul class="pup-list">
              <li>
                <span class="info-name">总楼层：</span>
                <span class="info-val">{{currentData.buildTotal}}</span>
              </li>
              <li>
                <span class="info-name">楼栋编码：</span>
                <span class="info-val">{{currentData.buildCode }}</span>
              </li>
              <li>
                <span class="info-name">建筑结构：</span>
                <span class="info-val">{{currentData.buildLayout}}</span>
              </li>
              <li>
                <span class="info-name">建筑面积：</span>
                <span class="info-val">{{currentData.buildArea}}</span>
              </li>
              <li>
                <span class="info-name">楼栋用途：</span>
                <span class="info-val">{{currentData.buildUse}}</span>
              </li>
              <li>
                <span class="info-name">地上首层层高：</span>
                <span class="info-val">{{currentData.buildFirstHeight}}</span>
              </li>
              <li>
                <span class="info-name">地上非首层层高：</span>
                <span class="info-val">{{currentData.buildUnfirstHeight}}</span>
              </li>
              <li>
                <span class="info-name">地上总层数：</span>
                <span class="info-val">{{currentData.buildOnNum}}</span>
              </li>
              <li>
                <span class="info-name">地下总层数：</span>
                <span class="info-val">{{currentData.buildUnderNum}}</span>
              </li>
              <li>
                <span class="info-name">竣工年代：</span>
                <span class="info-val">{{currentData.buildYear}}</span>
              </li>
              <li>
                <span class="info-name">标准层面积 ：</span>
                <span class="info-val">{{currentData.standArea}}</span>
              </li>
              <li>
                <span class="info-name">楼龄：</span>
                <span class="info-val">{{currentData.buildAge}}</span>
              </li>
              <li>
                <span class="info-name">建筑物通用性：</span>
                <span class="info-val">{{currentData.buildProp}}</span>
              </li>
              <!-- <li>
                <span class="info-name">建筑物成新率：</span>
                <span class="info-val">{{currentData.buildNew}}</span>
              </li> -->
            </ul>
          </div>
          <div class="pup-about-info">
            <!-- <div class="title-item">建筑物信息</div> -->
            <ul class="pup-list">
              <li>
                <span class="info-name">装修情况：</span>
                <span class="info-val">{{currentData.buildFit}}</span>
              </li>
              <li>
                <span class="info-name">客梯数量：</span>
                <span class="info-val">{{currentData.buildElevatorNum}}</span>
              </li>
              <li>
                <span class="info-name">货梯数量：</span>
                <span class="info-val">{{currentData.buildGoodsNum}}</span>
              </li>
              <li>
                <span class="info-name">空置率：</span>
                <span class="info-val">{{currentData.emptyRate | filterRate}}%</span>
              </li>
              <li>
                <span class="info-name">实用率：</span>
                <span class="info-val">{{currentData.useRate | filterRate}}%</span>
              </li>
              <li>
                <span class="info-name">成新率：</span>
                <span class="info-val">{{currentData.newRate | filterRate}}%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDictByItem, getChildAreaBySuperId, getDictByDictName} from '@/utils/index.js'
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
              width: 300,
              render: (h, params) => {
                return h('span', {
                            style: {
                                cursor: 'pointer'
                            },
                            class:{
                                'show':true
                            },
                            on: {
                                click: () => {
                                    this.showDetail(params.row)
                                },
                            }
                        }, params.row.buildName);
                }
          },
          {
              title: '楼栋编码',
              align: 'center',
              key: 'buildCode',
              minWidth: 150
          },
          {
              title: '总层高',
              align: 'center',
              key: 'buildTotal',
              minWidth: 100
          },
          {
              title: '楼龄',
              align: 'center',
              key: 'buildAge',
              minWidth: 220
          },
          {
              title: '楼栋用途',
              align: 'center',
              key: 'buildUse',
              minWidth: 220
          },
          {
              title: '建筑结构',
              align: 'center',
              key: 'buildLayout',
              minWidth: 100,
          }  
      ]
    }
  },
  methods:{
    showDetail(row){
      this.pupShow = true
      this.currentData = row;
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
      this.$parent.initOfficeBuild();
    },
  },
  filters: {
    filterRate(val){
      return parseFloat(val*100).toFixed(2)
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
      width: 960px;
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
.pup-about-info{
  margin:20px 0 10px;
  .title-item{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color: #5A6C7E;
        margin-bottom: 10px;
  }
  .pup-list{
    display: flex;
    flex-flow: wrap;
    li{
      width: 33.333%;
      margin-bottom:14px;
      .info-name{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(80,97,115,1);
      }
      .info-val{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
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
    font-weight: bold;
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