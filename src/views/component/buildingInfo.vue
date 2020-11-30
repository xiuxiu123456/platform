<template>
  <div class="project-container">
    <div class="project-select">
      <div class="select-box">
        <div data-v-2b2c8176="" class="select-title">条件筛选：</div>
        <div class="select-list">
          <ul>
            <li>
              <div class="item-s">
                <Select v-model="buildQueryObj.superAreaId" clearable placeholder="所属区域" @on-change="changeArea" >
                  <Option v-for="item in superArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
                </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="buildQueryObj.areaId" clearable placeholder="所属街道" >
                  <Option v-for="item in childArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
                </Select>
              </div>
            </li>
            <!-- <li>
              <div class="item-s">
                <Input v-model="buildQueryObj.community" clearable placeholder="社区" style="width: 200px" />
              </div>
            </li> -->
            <li>
              <div class="item-s">
                <Input v-model="buildQueryObj.community" clearable placeholder="社区" />
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="buildQueryObj.buildLayout" clearable placeholder="建筑结构">
                  <Option v-for="item in buildLayoutList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="buildQueryObj.buildHeight" clearable placeholder="总层数">
                  <Option v-for="item in buildHeightList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Input v-model="buildQueryObj.str" clearable placeholder="输入项目名称/输入项目ID" />
              </div>
            </li>
            <!-- @click="queryPorject" -->
            <Button type="primary" class="btn-primary" @click="queryBuild" >确定</Button>
          </ul>
        </div>
      </div>
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
        <div class="close-box" @click="closePup"><Icon type="md-close" color="#2B313C" /></div>
        <div class="container-madie">
          <div class="project-title">{{currentData.buildName  }}栋<div class="updata-title">ID:{{currentData.buildId}}</div></div>
          <div class="pup-about-info">
            <div class="title-item">基础信息</div>
            <ul class="pup-list">
              <li>
                <span class="info-name">所属区位：</span>
                <span class="info-val">{{currentData.areaId | areaNameFilters}}</span>
              </li>
              <li>
                <span class="info-name">所属建筑编码：</span>
                <span class="info-val">{{currentData.buildCode }}</span>
              </li>
              <li>
                <span class="info-name">产权名称：</span>
                <span class="info-val">{{currentData.buildRightName}}</span>
              </li>
              <li>
                <span class="info-name">所属村：</span>
                <span class="info-val">{{currentData.villageName}}</span>
              </li>
              <li>
                <span class="info-name">与主干道距离：</span>
                <span class="info-val">{{currentData.buildMainLength}}</span>
              </li>
              <!-- <li>
                <span class="info-name">地址代号：</span>
                <span class="info-val">{{currentData.buildAliasCode}}</span>
              </li> -->
              <li>
                <span class="info-name">楼栋地址：</span>
                <span class="info-val">{{currentData.buildAddress}}</span>
              </li>
            </ul>
          </div>
          <div class="pup-about-info">
            <div class="title-item">建筑物信息</div>
            <ul class="pup-list">
              <li>
                <span class="info-name">建筑物使用用途：</span>
                <span class="info-val">{{currentData.buildUse}}</span>
              </li>
              <li>
                <span class="info-name">楼栋使用状态：</span>
                <span class="info-val">{{currentData.buildStatus}}</span>
              </li>
              <li>
                <span class="info-name">建筑结构：</span>
                <span class="info-val">{{currentData.buildLayout | buildLayoutFilters}}</span>
              </li>
              <li>
                <span class="info-name">建筑面积：</span>
                <span class="info-val">{{currentData.buildArea}}</span>
              </li>
              <li>
                <span class="info-name">房间数：</span>
                <span class="info-val">{{currentData.buildNum}}</span>
              </li>
              <li>
                <span class="info-name">电梯数量：</span>
                <span class="info-val">{{currentData.buildElevatorNum}}</span>
              </li>
              <li>
                <span class="info-name">竣工年代：</span>
                <span class="info-val">{{currentData.buildYear}}</span>
              </li>
              <li>
                <span class="info-name">楼龄：</span>
                <span class="info-val">{{currentData.buildAge}}</span>
              </li>
              <li>
                <span class="info-name">总层数：</span>
                <span class="info-val">{{currentData.buildLayer}}</span>
              </li>
              <li>
                <span class="info-name">总层高：</span>
                <span class="info-val">{{currentData.buildHeight | buildHeightFilters}}</span>
              </li>
              <li>
                <span class="info-name">地表层数：</span>
                <span class="info-val">{{currentData.buildSurfaceLayer}}</span>
              </li>
              <li>
                <span class="info-name">地下层数：</span>
                <span class="info-val">{{currentData.buildUndergroudLayer}}</span>
              </li>
              <li>
                <span class="info-name">楼栋用途：</span>
                <span class="info-val">{{currentData.buildUseDes}}</span>
              </li>
              <li>
                <span class="info-name">楼栋性质：</span>
                <span class="info-val">{{currentData.buildProperties}}</span>
              </li>
              <li>
                <span class="info-name">楼栋类型：</span>
                <span class="info-val">{{currentData.buildType}}</span>
              </li>
              <li>
                <span class="info-name">楼栋状态：</span>
                <span class="info-val">{{currentData.buildSta}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getChildArea, getSuperAraeByChildId, getDictByItem, getChildAreaBySuperId, getDictByDictName} from '@/utils/index.js'
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
              title: '建筑物编码',
              align: 'center',
              key: 'buildCode',
              minWidth: 150
          },
          {
              title: '所属区域',
              align: 'center',
              key: 'areaId',
              minWidth: 100,
              render: (h, params) => {
                let cname = getChildArea(params.row.areaId).areaName;
                let sname = getSuperAraeByChildId(params.row.areaId).areaName;
                let name = sname +"/" +cname + "/" + (params.row.community ? params.row.community : '');
                return h('span', {}, name);
              }
          },
          {
              title: '建筑物使用用途',
              align: 'center',
              key: 'buildUse',
              minWidth: 220
          },
          {
              title: '建筑结构',
              align: 'center',
              key: 'buildLayout',
              minWidth: 100,
              render: (h, params) => {
                let type = getDictByItem('建筑结构', params.row.buildLayout).dictItem;
                return h('span', {}, type);
              }
          },
          {
              title: '总层数',
              align: 'center',
              key: 'buildLayer',
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
      this.$parent.initVillageBuild();
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
    background: rgba(44, 48, 66, .2);
    z-index: 1000;
    .pup-content{
      position: relative;
      width: 980px;
      background: #fff;
      border-radius:10px;
      height: 95%;
      .close-box{
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
      }
      .container-madie{
        padding: 30px 40px 40px;;
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
      margin-bottom:20px;
      .info-name{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#5A6C7E;
      }
      .info-val{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#2B313C;
      }
    }
  }
}

.project-select{
    font-size: 14px;
    color: #97a8b0;
    margin-top: 20px;
    // padding: 20px;
    // background: #1a2631;
    // border: 1px solid #324251;
    border-radius: 4px;
    .select-title{
        width: 100px;
        margin-top: 5px;
      }
    .select-box{
      padding: 20px;
      display: flex;
      background: #fff;
      // border-bottom: 1px solid #324251;
      .select-list{
        flex: 1;
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 14.11%;
            margin-bottom: 10px;
            .item-s{
              padding-right: 20px;
              }
          }
        }
      }
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
  margin-top: 40px;
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