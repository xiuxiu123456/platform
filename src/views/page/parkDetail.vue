<template>
  <div class="project-detail">
    <!-- <div class="top-bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">写字楼</BreadcrumbItem>
        <BreadcrumbItem>{{parkInfo.parkName}}</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <div class="detail-content">
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-title">{{parkInfo.parkName}} <span class="span-title">({{parkInfo.parkAlias}})</span> </div>
          <div  class="detail-id">ID：{{parkInfo.parkId}}</div>
          <div  class="detail-id">{{areaName}}</div>
        </div>
      </div>
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-add">{{parkInfo.parkAddress}}</div>
          <Button type="primary" class="btn-primary" @click="clicktoMap"><Icon type="md-pin" />查看地图</Button>
        </div>
      </div>
    </div>
    <div class="tab-content">
      <ul class="ul-content">
        <li v-for="(item,index) in tabList" :key="index" :class="{active:itemShow==index}" @click="itemTab(index)">{{item.text}}</li>
      </ul>
      <div v-show="itemShow==0">
        <basicInfo ref="basicRef"
        :parkInfo="parkInfo" 
      />
      </div>
      <div v-show="itemShow==1">
        <buildingInfo 
          :buildQueryObj="buildQueryObj"
          :BuildDataList="BuildDataList"
          :pageObj="pageObj"
          @on-queryBuild="initParkBuild"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {getChildArea, getSuperAraeByChildId} from '@/utils/index.js'
import basicInfo from '../component/parkInfo.vue'
import buildingInfo from '../component/parkBuild.vue'
// import dayjs from 'dayjs'
export default {
  components:{
    basicInfo,buildingInfo
  },
  data(){
    return {
      leaseMonth: null,
      industryMonth: null,
      apartmentMonth: null,
      useDataTable: [],
      echartDataObj: {},
      leaseInfo: {},
      areaName: '',
      industryInfo: {},
      apartmentInfo: {},
      tabList:[
        {
          text:'项目信息'

        },
        {
          text:'楼栋清单'

        }
      ],
      pageObj: {
        pageNum: 1,
        pageSize: 50,
        pageTotal: null
      },
      itemShow:0,
      parkInfo: {},
      buildQueryObj: {},
      BuildDataList: []
    }
  },
  methods:{
    clicktoMap(){
      this.$router.push({
          path: '/park',
          query: {
            parkId: this.parkId
          }
        })
    },
    itemTab(index){
      this.itemShow = index
    },
    initPark () {
      this.$axios.post('/park/queryParkDetail/' + this.parkId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.parkInfo = resp.data.data;
          let cname = getChildArea(this.parkInfo.areaId).areaName;
          let sname = getSuperAraeByChildId(this.parkInfo.areaId).areaName;
          this.areaName = "深圳市/" + sname +"/" +cname ;
        }
      });
    },
    initParkBuild () {
      this.buildQueryObj.parkId = parseInt(this.parkId);
      this.$axios.post('/park/queryParkBuildingList', {
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        orderBy: null,
        param: this.buildQueryObj
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.BuildDataList = resp.data.data;
          this.pageObj.pageTotal = resp.data.pageCount;
        }
      });
    }
  },
  created() {
    this.initPark();
    this.initParkBuild();
  },
  computed: {
    parkId () {
      return this.$route.query.parkId;
    }
  },
}
</script>
<style lang="less" scoped>
.project-detail{
  padding: 20px 30px;
  .top-bread{
    font-size: 12px;
    font-family: SimSun;
    padding-bottom: 10px;
    border-bottom: 1px solid #354352;
  }
}
  .detail-content{
    margin: 20px 0;
    .home-detail{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .detail-left{
        display: flex;
        align-items: baseline;
        .detail-title{
          font-size: 30px;
          font-weight: 700;
          color: #2C3042;
          .span-title{
            font-size: 16px;
          color: #97a8b0;
          margin: 0 0 0 20px;
          }
        }
        .detail-id{
          margin-left: 40px;;
          color: #97a8b0;
          font-size: 16px;
        }
      }
      .detail-add{
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #97a8b0;
        margin-right: 20px;
      }
    }
  }
  .tab-content{
    .ul-content{
      display: flex;
      border-bottom: 1px solid #BFCDD0; 
      color: #8C949D;
      li{
        padding: 0 20px 20px;
        font-weight: bold;
        margin-right: 20px;
        &.active{
          border-bottom: 1px solid #FF7154;
          color: #FF7154;
              margin-bottom: -1px;
        }
      }
    }
  }
</style>