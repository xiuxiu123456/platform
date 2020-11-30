<template>
  <div class="project-detail">
    <!-- <div class="top-bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">写字楼</BreadcrumbItem>
        <BreadcrumbItem>{{officeInfo.officeName}}</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <div class="detail-content">
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-title">{{officeInfo.officeName}} <span class="span-title">({{officeInfo.officeAlias}})</span> </div>
          <div  class="detail-id">ID：{{officeInfo.officeId}}</div>
          <div  class="detail-id">{{areaName}}</div>
        </div>
      </div>
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-add">{{officeInfo.officeAddress}}</div>
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
        :officeInfo="officeInfo" 
      />
      </div>
      <div v-show="itemShow==1">
        <buildingInfo 
          :buildQueryObj="buildQueryObj"
          :BuildDataList="BuildDataList"
          :pageObj="pageObj"
          @on-queryBuild="initOfficeBuild"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {getChildArea, getSuperAraeByChildId} from '@/utils/index.js'
import basicInfo from '../component/officeInfo.vue'
import buildingInfo from '../component/officeBuild.vue'
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
      officeInfo: {},
      buildQueryObj: {},
      BuildDataList: []
    }
  },
  methods:{
    clicktoMap(){
      this.$router.push({
          path: '/office',
          query: {
            officeId: this.officeId
          }
        })
    },
    itemTab(index){
      this.itemShow = index
    },
    initOffice () {
      this.$axios.post('/office/queryOfficeDetail/' + this.officeId)
      .then((resp) => {
        if(resp.data.code === 1){
          console.log(resp.data);
          this.officeInfo = resp.data.data;
          let cname = getChildArea(this.officeInfo.areaId).areaName;
          let sname = getSuperAraeByChildId(this.officeInfo.areaId).areaName;
          this.areaName = "深圳市/" + sname +"/" +cname ;
        }
      });
    },
    // initVillageBuild () {
    //   this.buildQueryObj.villageId = parseInt(this.villageId);
    //   this.$axios.post('/office/queryOfficeBuildingList', {
    //     pageNum: this.pageObj.pageNum,
    //     pageSize: this.pageObj.pageSize,
    //     orderBy: null,
    //     param: this.buildQueryObj
    //   })
    //   .then((resp) => {
    //     if(resp.data.code === 1){
    //       this.BuildDataList = resp.data.data;
    //       this.pageObj.pageTotal = resp.data.pageCount;
    //     }
    //   });
    // },
    initOfficeBuild () {
      this.buildQueryObj.officeId = parseInt(this.officeId);
      this.$axios.post('/office/queryOfficeBuildingList', {
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
    this.initOffice();
    this.initOfficeBuild();
  },
  computed: {
    officeId () {
      return this.$route.query.officeId;
    }
  },
}
</script>
<style lang="less" scoped>
.project-detail{
  padding: 0 30px 20px;
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
          color: #8C949D;
          font-size: 16px;
        }
      }
      .detail-add{
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #8C949D;
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
          border-bottom: 2px solid #FF7154;
          color: #FF7154;
          margin-bottom: -1px;
        }
      }
    }
  }
</style>