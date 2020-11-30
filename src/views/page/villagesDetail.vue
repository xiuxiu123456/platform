<template>
  <div class="project-detail">
    <!-- <div class="top-bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">城中村</BreadcrumbItem>
        <BreadcrumbItem>{{villageInfo.villageName}}</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <div class="detail-content">
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-title">{{villageInfo.villageName}}</div>
          <div  class="detail-id">ID：{{villageInfo.villageId}}</div>
        </div>
      </div>
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-add">{{villageInfo.fourTo}}</div>
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
        :villageInfo="villageInfo" 
        :useDataTable="useDataTable" 
        :echartDataObj="echartDataObj"
        :leaseInfoObj="leaseInfo"
        :industryInfo="industryInfo"
        :apartmentInfo="apartmentInfo"
        :leaseMonth="leaseMonth"
        :industryMonth="industryMonth"
        :apartmentMonth="apartmentMonth"
        @on-leaseMonthChange="initVillageLease"
        @on-industryMonthChange="initVillageIndustry"
        @on-apartmentMonthChange="initVillageApartment"
      />
      </div>
      <div v-show="itemShow==1">
        <buildingInfo 
          :buildQueryObj="buildQueryObj"
          :BuildDataList="BuildDataList"
          :pageObj="pageObj"
          @on-queryBuild="initVillageBuild"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {getDictByItem} from '@/utils/index.js'
import basicInfo from '../component/basicInfo.vue'
import buildingInfo from '../component/buildingInfo.vue'
import dayjs from 'dayjs'
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
      industryInfo: {},
      apartmentInfo: {},
      tabList:[
        {
          text:'村信息'

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
      villageInfo: {},
      buildQueryObj: {},
      BuildDataList: []
    }
  },
  methods:{
    clicktoMap(){
      this.$router.push({
          path: '/villages',
          query: {
            villageId: this.villageId
          }
        })
    },
    itemTab(index){
      this.itemShow = index
    },
    initVillage () {
      this.$axios.post('/village/queryVillageDetail/' + this.villageId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.villageInfo = resp.data.data;
        }
      });
    },
    initVillageUse () {
      this.$axios.post('/village/queryVillageUse/' + this.villageId)
      .then((resp) => {
        if(resp.data.code === 1){
          console.log(resp.data);
          this.useDataTable = resp.data.data;
          this.echartDataObj.legend_data = [];
          this.echartDataObj.series_data = [];
          this.useDataTable.forEach(item => {
            let type = getDictByItem('建筑物使用用途', item.useType).dictItem;
            this.echartDataObj.legend_data.push(type);
            let obj = {};
            obj.name = type;
            obj.value = item.useArea;
            this.echartDataObj.series_data.push(obj);
          })
          this.$refs.basicRef.drowEcharts()
        }
      });
    },
    initVillageLease (date) {
      let month = null;
      if (date && date instanceof Date){
        month = dayjs(date).format("YYYYMM");
      } else if (date) {
        month = parseInt(date.replace("-",""));
      }
      this.$axios.post('/village/queryVillageLease', {
        villageId: parseInt(this.villageId) ,
        createDate: month
      })
      .then((resp) => {
        if(resp.data.code === 1){
          if (resp.data.data) {
            this.leaseInfo = resp.data.data;
            if (this.leaseInfo.villageLeaseTypes && this.leaseInfo.villageLeaseTypes.length > 0) {
              this.leaseInfo.villageLeaseTypes.forEach(lease => {
                let leaseTypeName = getDictByItem('可出租户型', lease.leaseType).dictItem;
                lease.leaseType = leaseTypeName;
                let leaseAreaTypeName = getDictByItem('村单套面积范围', lease.leaseAreaType).dictItem;
                lease.leaseAreaType = leaseAreaTypeName;
                // let leaseRentName = getDictByItem('村平均租金范围', lease.leaseRent).dictItem;
                // lease.leaseRent = leaseRentName;
              })
            }
            let createDate = this.leaseInfo.createDate + "";
            let m = createDate.substring(0,4) + "-" + createDate.substring(4,6) + "-01";
            this.leaseMonth = new Date(m);
          } else {
            this.leaseInfo = {};
            this.leaseMonth = null;
          }
          
        }
      });
    },
    initVillageIndustry (date) {
      let month = null;
      if (date && date instanceof Date){
        month = dayjs(date).format("YYYYMM");
      } else if (date) {
        month = parseInt(date.replace("-",""));
      }
      this.$axios.post('/village/queryVillageIndustry', {
        villageId: parseInt(this.villageId),
        createDate: month
      })
      .then((resp) => {
        if(resp.data.code === 1){
          if (resp.data.data){
            this.industryInfo = resp.data.data;
            if (this.industryInfo.industryMold) {
              let modelArray = this.industryInfo.industryMold.split(",");
              let modelNameArray = [];
              modelArray.forEach(model => {
                modelNameArray.push(getDictByItem('工业区租赁企业所属行业', model).dictItem)
              })
              this.industryInfo.modelName = modelNameArray.join(",");
            } else {
              this.industryInfo.modelName = ""
            }
            let createDate = this.industryInfo.createDate + "";
            let m = createDate.substring(0,4) + "-" + createDate.substring(4,6) + "-01";
            this.industryMonth = new Date(m);
          } else {
            this.industryInfo = {};
            this.industryMonth = null;
          }
        }
      });
    },
    initVillageApartment (date) {
      let month = null;
      if (date && date instanceof Date){
        month = dayjs(date).format("YYYYMM");
      } else if (date) {
        month = parseInt(date.replace("-",""));
      }
      this.$axios.post('/village/queryVillageApartment', {
        villageId: parseInt(this.villageId),
        createDate: month
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.apartmentInfo = resp.data.data;
          let createDate = this.apartmentInfo.createDate + "";
          let m = createDate.substring(0,4) + "-" + createDate.substring(4,6) + "-01";
          this.apartmentMonth = new Date(m);
        }
      });
    },
    initVillageBuild () {
      this.buildQueryObj.villageId = parseInt(this.villageId);
      this.$axios.post('/village/queryVillageBuildingList', {
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
    this.initVillage();
    this.initVillageUse();
    this.initVillageLease();
    this.initVillageIndustry();
    this.initVillageApartment();
    this.initVillageBuild();
  },
  computed: {
    villageId () {
      return this.$route.query.villageId;
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
    margin: 0 0 20px 0;
    .home-detail{
      display: flex;
      justify-content: space-between;
      .detail-left{
        display: flex;
        align-items: baseline;
        .detail-title{
          font-size: 30px;
          font-weight: 700;
          color: #2C3042;
        }
        .detail-id{
          margin-left: 20px;;
          color: #8C949D;
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
        cursor: pointer;
        &.active{
          border-bottom: 2px solid #FF7154;
          color: #FF7154;
        }
      }
    }
  }
</style>