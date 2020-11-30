<template>
  <div class="project-detail">
    <!-- <div class="top-bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">项目列表</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">{{superArea.areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{area.areaName}}</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <div class="detail-content">
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-title">{{projectInfo.projectName}}</div>
          <div class="small-title" v-show="projectInfo.projectAlias">（{{projectInfo.projectAlias}}）</div>
          <div class="detail-status">{{projectStatusName}}</div>
          <div  class="detail-id">ID：{{projectId}}</div>
        </div>
        <Button type="primary" class="btn-primary" @click="edit" v-show="funcObj.func">编辑</Button>
      </div>
      <div class="home-detail">
        <div class="detail-left">
          <div class="detail-add">{{projectInfo.areaDetail}}</div>
          <Button type="primary" class="btn-primary" @click="clicktoMap"><Icon type="md-pin" />查看地图</Button>
        </div>
        <div class="updata">上次更新：{{oporationLog.dateStr}}</div>
      </div>
      <ul class="img-detail">
        <li v-for="(item,index) in imgList" :key="index">
          <div class="list-box">
            <div class="img-box" @click="showImgBox(item.imgList,index)">
              <img :src="item.imgsrc" alt="">
            </div>
            <div class="img-title">{{item.imgName}}({{item.imgSize}})</div>
          </div>
        </li>
      </ul>
      <div class="project-progress">
        <div class="datasource">
          <div >数据源：</div>
          <div class="centern-data">{{projectInfo.datasource || '--'}}</div>
        </div>
        <div class="project-box">
            <div class="project-title">项目进度</div>
            <Row>
              <Col span="14">
                <div class="progress">
                  <div class="box-t" :style="{width: stepItem*20-10 +'%'}"></div>
                  <ul>
                    <li v-for="(item,index) in stepList" :key="index">
                      <div class="icon-item iconXZ" :class="{iconCurrent:stepItem == index + 1}"></div>
                      <div class="itemColorPre" :class="{itemColorCurrent:stepItem == index + 1}">{{item.title}}</div>
                    </li>
                  </ul>
                </div>
                <div  class="about-box">
                  <div class="about-title">{{describeDate}}</div>
                  <div class="about-text">{{progressInfo.progressDescribe}}</div>
                </div>
              </Col>
              <Col span="10">
                <div class="right-progree">
                  <ul class="r-list">
                    <li v-for="(item,index) in timeList" :key="index">
                      <div class="r-title">{{item.title}}</div>
                      <div class="r-data">{{item.year}}</div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
        </div>
        <div class="basic-info">
          <!-- 项目基本信息 -->
          <div class="l-info">
            <div class="project-box">
              <div class="project-title">项目基本信息</div>
              <div class="basic-info-list">
                <ul class="info-box">
                  <li>
                    <span>责任单位：</span>
                    <span>{{projectOrg}}</span>
                  </li>
                  <li>
                    <span>纳入计划年份：</span>
                    <span>{{projectInfo.planYear}}</span>
                  </li>
                  <li>
                    <span>项目总建筑面积（万㎡）：</span>
                    <span>{{projectInfo.projectArea}}</span>
                  </li>
                  <li>
                    <span>住宅类总建筑面积（万㎡）：</span>
                    <span>{{projectInfo.residenceArea}}</span>
                  </li>
                  <li>
                    <span>公共住房计划建筑面积（万㎡）：</span>
                    <span>{{projectInfo.publicPlanArea}}</span>
                  </li>
                  <li>
                    <span>公共住房实际建筑面积（万㎡）：</span>
                    <span>{{projectInfo.publicRealArea}}</span>
                  </li>
                </ul>
                <ul class="info-box r-basic-info">
                  <li>
                    <span>组织建设单位：</span>
                    <span>{{projectInfo.projectUnit}}</span>
                  </li>
                  <li>
                    <span>建设方式：</span>
                    <span>{{projectType}}</span>
                  </li>
                  <li>
                    <span>建设渠道：</span>
                    <span>{{projectChannel}}</span>
                  </li>
                  <li>
                    <span>间数：</span>
                    <span>{{projectInfo.projectNum}}</span>
                  </li>
                  <li>
                    <span>公共住房计划总套数：</span>
                    <span>{{projectInfo.publicPlanNum}}</span>
                  </li>
                  <li>
                    <span>公共住房实际总套数：</span>
                    <span>{{projectInfo.publicRealNum}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 宗地信息 和其他信息 -->
          <div class="r-info">
              <div class="project-box basic-r-info">
                <ul class="info-box  zd-info">
                  <div class="project-title">宗地信息</div>
                  <li>
                    <span>宗地号：</span><span>{{parcelInfo.parcelId}}</span>
                  </li>
                  <li>
                    <span>土地出让时间：</span><span>{{parcelInfo.parcelDate}}</span>
                  </li>
                  <li>
                    <span>选址意见书号：</span><span>{{parcelInfo.parcelCode}}</span>
                  </li>
                  <li>
                    <span>容积率：</span><span>{{parcelInfo.parcelRate}}</span>
                  </li>
                  <li>
                    <span>用地单位：</span><span>{{parcelInfo.parcelOrg}}</span>
                  </li>
                  <li>
                    <span>用地面积：</span><span>{{parcelInfo.parcelArea}}</span>
                  </li>
                </ul>
                <ul class="info-box other-info">
                  <div class="project-title">其他信息</div>
                  <li><span>项目联系人：</span><span>{{otherInfo.projectEmp}}</span></li>
                  <li><span>联系方式：</span><span>{{otherInfo.projectPhone}}</span></li>
                  <li><span>设计单位：</span><span>{{otherInfo.projectDesignOrg}}</span></li>
                  <li><span>施工单位：</span><span>{{otherInfo.projectBuildOrg}}</span></li>
                  <li><span>监理单位：</span><span>{{otherInfo.projectMonitorOrg}}</span></li>
                </ul>
              </div>
          </div>
        </div>

        <div class="basic-info">
          <div class="l-info" v-show="type_show">
            <div class="project-box">
              <div class="project-title">各类型住房分布</div>
              <div class="content-info">{{projectTypeDescribute}}</div>
              <div class="tu-box" ref="ref1"></div>
            </div>
          </div>
          <div class="r-info" v-show="layout_show">
            <div class="project-box" style="margin-right:0">
              <div class="project-title">户型结构分布</div>
              <div class="content-info">{{layoutInfo.layoutDescribe}}</div>
              <div class="tu-box">
                <Row style="height:100%">
                  <Col style="height:100%" span="12">
                    <div ref="ref2" style="height:100%; width:100%" ></div>
                  </Col>
                  <Col style="height:100%" span="12">
                    <div ref="ref3" style="height:100%; width:100%"></div></Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <!-- 资金和回购信息 -->
        <div class="project-box" v-show="fundInfo.planInvest > 0 && fundInfo.realInvest > 0">
          <div class="project-title">资金情况</div>
          <div class="zj-status">
            <div class="zj-info">
              <span class="zj-text">资金总投资：</span>
              <span class="zj-data">{{fundInfo.planInvest}}万元</span>
            </div>
            <div class="zj-info">
              <span class="zj-text">已完成投资：</span>
              <span class="zj-data">{{fundInfo.realInvest}}万元</span>
            </div>
          </div>
          <div class="zj-box">
            <div class="title">资金组成渠道</div>
            <ul class="qd-list">
              <li><div class="item-title">市财数</div><div class="item-content">{{fundObj.A}}</div></li>
              <li><div class="item-title">区财数</div><div class="item-content">{{fundObj.B}}</div></li>
              <li><div class="item-title">社会投资</div><div class="item-content">{{fundObj.C}}</div></li>
              <li><div class="item-title">其他</div><div class="item-content">{{fundObj.D}}</div></li>
            </ul>
          </div>
          <div class="zj-box" v-show="buybackInfo.buybackFlag === '1'">
            <div class="title">是否要回购：<span>{{buybackInfo.buybackFlag === '1' ? '是': '否'}}</span></div>
            <ul class="qd-list">
              <li><div class="item-title">回购单位</div><div class="item-content">{{buybackInfo.buybackOrg}}</div></li>
              <li><div class="item-title">回购套数</div><div class="item-content">{{buybackInfo.buybackNum}}</div></li>
              <li><div class="item-title">回购资金类型</div><div class="item-content">{{buybackInfo.buybackType}}</div></li>
              <li><div class="item-title">回购资金金额</div><div class="item-content">{{buybackInfo.buybackAccount}}</div></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box" v-show="isImgShow">
      <div class="bg-color" @click="closeImgBox"></div>
      <div class="modal-content">
        <ul>
          <li v-for="(item,index) in imgBoxList" :key="index" v-show="indexImg == index">
            <div class="left-icon" @click="provItem(index)" :class="{active:indexImg == 0}">
              <i class="ivu-icon ivu-icon-ios-arrow-dropleft"></i>
            </div>
            <div class="img-item"><img :src="item.url" alt=""></div>
            <div class="right-icon" @click="nextItem(index)" :class="{active:indexImg == imgBoxList.length-1}"><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></div>
          </li>
        </ul>
        <div class="select-tj">
          <div class="select-txt slecdOne" @click="provImgBox">上一图集</div>
          <div class="select-txt slecdTwo" @click="nextImgBox">下一图集</div>
      </div>
      <div class="closeBtn" @click="closeImgBox"><i class="ivu-icon ivu-icon-ios-close-circle-outline"></i></div>
    </div>
  </div>
  </div>
</template>
<script>
import { getChildArea, getSuperAraeByChildId, getDictByItem, getDictByDictName } from '@/utils/index.js'
export default {
  data(){
    return {
      isImgShow:false, //控制图片弹窗
      imgBoxList:[],
      indexImg:0,
      idxBox:0,
      projectInfo: {},
      progressInfo: {},
      parcelInfo: {},
      typeInfo: {},
      layoutInfo: {},
      fundInfo: {},
      buybackInfo: {},
      otherInfo: {},
      projectImages: {},
      superArea: {},
      area: {},
      projectStatusName: '',
      oporationLog: {},
      describeDate: '',
      projectOrg: '',
      projectType: '',
      projectChannel: '',
      fundObj: {
        A: '-',
        B: '-',
        C: '-',
        D: '-'
      },
      projectTypeDescribute: '',
      imgList:[],
      stepList:[
        {
          title:'前期',
          step:'10%',
        },
        {
          title:'开工',
          step:'30%',
        },
        {
          title:'基本建成',
          step:'50%',
        },
        {
          title:'竣工',
          step:'70%',
        },
        {
          title:'供应',
          step:'90%',
        }
      ],
      stepItem:2,
      timeList:[
        {
          year:'-',
          title:'计划开工'
        },
        {
          year:'-',
          title:'计划基本建成'
        },
        {
          year:'-',
          title:'上报竣工'
        },
        {
          year:'-',
          title:'计划供应'
        },
        {
          year:'-',
          title:'实际开工'
        },
        
        {
          year:'-',
          title:'实际基本建成'
        },
        {
          year:'-',
          title:'实际竣工'
        },
        {
          year:'-',
          title:'实际供应'
        },
      ],
      type_series_data: {},
      type_show: true,
      layout_series_data: {},
      area_series_data: {},
      layout_show: true,
    }
  },
  methods:{
    showImgBox(list,index){
      this.imgBoxList = []
      if(!list || !list.length) return false
      this.isImgShow = true
      this.imgBoxList = list
      this.idxBox = index
    },
    provItem(){
      if(this.indexImg == 0) return false
      this.indexImg = this.indexImg - 1
    },
    nextItem(){
      if(this.indexImg == this.imgBoxList.length - 1) return false
      this.indexImg = this.indexImg + 1
    },
    closeImgBox(){
      this.isImgShow = false
      this.indexImg = 0
    },
    provImgBox(){
      if(this.idxBox == 0) return false
      this.idxBox = this.idxBox-1
      this.imgBoxList = this.imgList[this.idxBox].imgList
      if(!this.imgBoxList.length) {this.provImgBox()}
    },
    nextImgBox(){
      if(this.idxBox == this.imgList.length -1) return false
      this.idxBox = this.idxBox+1
      this.imgBoxList = this.imgList[this.idxBox].imgList
      if(!this.imgBoxList.length) {this.nextImgBox()}
      this.indexImg = 0
    },
    initPorjectInfo () {
      this.$axios.post('project/queryProjectById/'+ this.projectId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.projectInfo = resp.data.data.projectInfo;
          if (resp.data.data.progressInfo) {
            this.progressInfo = resp.data.data.progressInfo;
            if ( Object.keys(this.progressInfo).length > 0 && this.progressInfo.describeDate) {
              let desData = this.progressInfo.describeDate + '';
              this.describeDate = desData.substring(0,4)+ '-' + desData.substring(4,6) + '-' + desData.substring(6,8);
            }
            if (Object.keys(this.progressInfo).length === 0 || !this.progressInfo.progressDescribe) {
              this.progressInfo.progressDescribe = null;
            }
            this.handProgress();
          }
          if (resp.data.data.parcelInfo) {
            this.parcelInfo = resp.data.data.parcelInfo;
          }
          if (resp.data.data.typeInfo) {
            this.type_show = resp.data.data.typeInfo.length > 0
            this.typeInfo = resp.data.data.typeInfo;
          } else {
            this.type_show = false;
          }
          if (resp.data.data.layoutInfo) {
            this.layout_show = resp.data.data.layoutInfo.layoutAreas|| resp.data.data.layoutInfo.layoutItems > 0;
            this.layoutInfo = resp.data.data.layoutInfo;
          } else {
            this.layout_show = false;
          }
          if (resp.data.data.fundInfo) {
            this.fundInfo = resp.data.data.fundInfo;
          }
          if (resp.data.data.buybackInfo) {
            this.buybackInfo = resp.data.data.buybackInfo;
          }
          
          if (resp.data.data.otherInfo) {
            this.otherInfo = resp.data.data.otherInfo;
          }
          
          if (this.projectInfo.areaId) {
            this.area = getChildArea(this.projectInfo.areaId);
            this.superArea = getSuperAraeByChildId(this.projectInfo.areaId);
          }
          
          if (this.projectInfo.projectStatus) {
            this.projectStatusName = getDictByItem('项目状态', this.projectInfo.projectStatus).dictItem;
          }
          
          if (this.projectInfo.projectOrg) {
            this.projectOrg = getDictByItem('责任单位', this.projectInfo.projectOrg).dictItem;
          }
          if (this.projectInfo.projectType) {
            this.projectType = getDictByItem('建设方式', this.projectInfo.projectType).dictItem;
          }
          if (this.projectInfo.projectChannel) {
            this.projectChannel = getDictByItem('建设渠道', this.projectInfo.projectChannel).dictItem;
          }
          
          // 资金渠道
          if (Object.keys(this.fundInfo).length > 0 && this.fundInfo.fundChannels && this.fundInfo.fundChannels.length > 0) {
            for (let item in this.fundObj) {
              this.fundInfo.fundChannels.forEach (fund => {
                if (fund.fundChannelName === item) {
                  this.fundObj[item] = fund.fundChannelNum + '万';
                }
              })
            }
          }

          // 渲染echarts
          this.initEcharts();
        }
      });
    },
    initProjectImage () {
      this.$axios.post('/project/queryProjectImgs', {
        projectId: this.projectId
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.projectImages = resp.data.data
          let imgItems = getDictByDictName('图片类型');
          imgItems.forEach(item => {
            let imgObj = {};
            imgObj.imgName = item.dictItem;
            imgObj.imgSize = 0;
            imgObj.imgList = [];
            imgObj.imgsrc = 'data:image/png;base64,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'
            for (let img in this.projectImages) {
              if (item.dictValue === img) {
                imgObj.imgSize = this.projectImages[img].length;
                imgObj.imgsrc = this.projectImages[img][0].url;
                imgObj.imgList = this.projectImages[img];
              }
            }
            this.imgList.push(imgObj);
          })
        }
      });
    },
    initOporationLog () {
      this.$axios.post('/system/getOporationLogs', {
        pageNum: 0,
        pageSize: 1,
        orderBy: null,
        param: {
          projectId: this.projectId
        }
      })
      .then((resp) => {
        if(resp.data.code === 1){
          if (Array.isArray(resp.data.data) && resp.data.data.length > 0){
            this.oporationLog = resp.data.data[0];
          }
        }
      });
    },
    handProgress () {
       this.handProgressTime('planOpen', 0);
       this.handProgressTime('planBuild', 1);
       this.handProgressTime('submitClose', 2);
       this.handProgressTime('planSupply', 3);
       this.handProgressTime('realOpen', 4);
       this.handProgressTime('realBuild', 5);
       this.handProgressTime('realClose', 6);
       this.handProgressTime('realSupply', 7);

       if (this.progressInfo.progressStatus === 'A'){
         this.stepItem = 1;
       } else if (this.progressInfo.progressStatus === 'B') {
         this.stepItem = 2;
       } else if (this.progressInfo.progressStatus === 'C') {
         this.stepItem = 3;
       } else if (this.progressInfo.progressStatus === 'D') {
         this.stepItem = 4;
       } else if (this.progressInfo.progressStatus === 'E') {
         this.stepItem = 5;
       }
    },
    handProgressTime (item, index) {
      if (this.progressInfo[item]) {
        let planBuild = this.progressInfo[item] + '';
        let planBuildStr = planBuild.substring(0,4) + "-" + planBuild.substring(4,6);
        this.$set(this.timeList[index], 'year', planBuildStr)
      } else {
        this.$set(this.timeList[index], 'year', '-')
      }
      
    },
    clicktoMap () {
      if (this.projectInfo.longitude && this.projectInfo.latitude) {
        this.$router.push({
          path: '/area',
          query: {
            projectId: this.projectInfo.projectId
          }
        })
      } else {
        this.$Message.warning('该项目尚未设置经纬度');
      }
      
    },
    initEcharts () {
      this.type_series_data = {
        series_data: [],
        legend_data: []
      };
      this.layout_series_data = {
        series_data: [],
        legend_data: []
      };
      this.area_series_data = {
        series_data: [],
        legend_data: []
      };
      let typeStrArray = [];
      this.typeInfo.forEach(data => {
        if (data.typeNum) {
          let typeName = getDictByItem('住房类型', data.typeName).dictItem;
          this.type_series_data.legend_data.push(typeName);
          let obj = {};
          obj.name = typeName;
          obj.value = data.typeNum;
          this.type_series_data.series_data.push(obj);
          typeStrArray.push(typeName + " " + data.typeNum + '套');
        }
      })
      this.projectTypeDescribute = typeStrArray.join("、")
      this.drowEcharts(this.$refs.ref1, this.type_series_data);

      if (this.layoutInfo.layoutItems && this.layoutInfo.layoutItems.length > 0) {
        this.layoutInfo.layoutItems.forEach(data => {
          if (data.layoutItemNum) {
            let layoutItemName = getDictByItem('户型类型', data.layoutItemName).dictItem;
            this.layout_series_data.legend_data.push(layoutItemName);
            let obj = {};
            obj.name = layoutItemName;
            obj.value = data.layoutItemNum;
            this.layout_series_data.series_data.push(obj);
          } 
        })
        this.drowEcharts(this.$refs.ref2, this.layout_series_data);
      }
      
      if (this.layoutInfo.layoutAreas && this.layoutInfo.layoutAreas.length > 0) {
        this.layoutInfo.layoutAreas.forEach(data => {
          if (data.layoutAreaNum) {
            let layoutAreaName = getDictByItem('户型面积', data.layoutAreaName).dictItem;
            this.area_series_data.legend_data.push(layoutAreaName);
            let obj = {};
            obj.name = layoutAreaName;
            obj.value = data.layoutAreaNum;
            this.area_series_data.series_data.push(obj);
          } 
        })
        this.drowEcharts(this.$refs.ref3, this.area_series_data);
      }
      
    },
    drowEcharts (el, data) {
      // 实例化echarts对象
      let myChart = this.$echarts.init(el)
      // 绘制条形图
      myChart.setOption({ 
          color:['#FF7154','#317EF3','#FD4A92','#44C2FC','#FF52F5','#747BFF','#589ff8','#dd90f0','#90dbf0','#e5ee7c'],
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              itemGap :  5,
              left: '65%',
              top : 'middle',
              textStyle:{
                color: '#a8a8a8',
                fontSize :10
              },
              icon: 'circle',
              data: data.legend_data
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['45%', '60%'],
                  center: ['35%', '50%'],
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
                  data: data.series_data
              }
          ]
      })
    },
    edit(){
      this.$router.push({
        path: '/projectEdit',
        query: {
          projectId: this.projectId
        }
      })
    }
  },
  computed: {
    projectId () {
      return this.$route.query.projectId;
    },
    funcObj () {
      let obj = {};
      let list = this.$store.getters.getUserFunc;
      let a = list.filter(item => item.funcId == 3 ) ||[];
      obj.func = a.length > 0;
      return obj
    },
  },
  created() {
    this.initPorjectInfo();
    this.initProjectImage();
    this.initOporationLog();
  }
}
</script>
<style lang="less" scoped>
.basic-info{
  display: flex;
  justify-content: space-between;
  .l-info{
    width: 50%;
  }
  .project-box{
      background: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 20px;
      margin-top: 20px;
      margin-right: 20px;
  }
  .basic-info-list{
    display: flex;
  }
  .info-box{
        width: 50%;
        li{
          margin: 10px 0;
          color: #5A6C7E;
          font-size: 14px;
          span:first-child {
              display: inline-block;
              color: #506173;
              font-size: 12px;
              width: 190px;
          }
        }
    }
  .basic-r-info{
    display: flex;
    margin-right: 0;
  }
  .r-basic-info {
      position: relative;
      &::after{
        width: 1px;
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        background: hsla(0,0%,88.2%,.233);
        top: 0;
        left: -20px;
      }
      li{
        span{
          &:first-child{
            width: 125px;
          }
        }
      }
  }
  .r-info{
    flex: 1;
  }
}
.project-detail{
  padding: 20px 30px;
  .top-bread{
    font-size: 12px;
    font-family: SimSun;
    padding-bottom: 10px;
    border-bottom: 1px solid hsla(0,0%,88.2%,.233);
  }
  .detail-content{
    // margin: 0 20px 0 0;
    .home-detail{
      display: flex;
      justify-content: space-between;
      .detail-left{
        display: flex;
        align-items: center;
        .detail-title{
          font-size: 30px;
          font-weight: 700;
          color: #2C3042;
        }
        .small-title{
          font-size: 16px;
          color: #97a8b0;
          margin: 0 0 0 20px;
        }
        .detail-status {
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          width: 52px;
          font-weight: 700;
          text-align: center;
          background: rgba(14, 177, 141, 0.2);
          border-radius: 2px;
          margin: 0 10px 0 40px;
          color: #0EB18D;
        }
        .detail-id{
          color: #97a8b0;
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
      .updata {
          color: #A1B1B9;
          font-size: 12px;
          font-family: SimSun;
      }
    }
  }
  .img-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    li{
      text-align: center;
      width: 20%;
      .list-box{
        padding: 0 10px 10px 0;
        .img-box{
          width: auto;
          height: 200px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .img-title{
        font-size: 12px;
        font-family: SimSun;
        color: #475768;
      }
    }
  }
  .project-progress{
    margin: 20px 0;
    .datasource{
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      color: #97a8b0;
      .centern-data{
          margin: 0 5px;
      }
    }
    .project-box{
      background: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      padding: 20px;
      margin-top: 20px;
    }
  }
}
.progress{
  margin-top: 30px;
    height: 6px;
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    position: relative;
    .box-t{
      position: absolute;
      height: 6px;
      width: 10%;
      background: #FF7154;
    }
    ul{
      display: flex;
      justify-content: space-around;
      position: absolute;
      width: 100%;
      top: -7px;
      li{
        text-align: center;
      }
      .icon-item{
        width: 18px;
        height: 18px;
        background: #313c46;
        border-radius: 50%;
        margin: auto;
      }
      .iconXZ{
        background: #FF7154;
        border: 3px solid #FFFFFF;
        box-shadow: 0px 0px 10px 2px rgba(255, 113, 84, 0.2);
      }
      .iconCurrent{
          height: 20px;
          width: 20px;
          border: 5px solid #FF7154;
          background: #fff;
          border-radius: 50%;
          box-shadow: none;
      }
    }
}
.itemColorPre{
    color: #475768;
    margin-top: 7px;
}
.itemColorCurrent {
    color: #FF7154;
    margin-top: 7px;
}
.about-box{
  background: #F8F8F8;
    border-radius: 4px;
    padding: 20px;
    margin-top: 50px;
    height: 98px;
    .about-title{
        color: #333;
        font-size: 18px;
    }
    .about-text{
        color: #5A6C7E;
        font-size: 14px;
    }
}
.right-progree{
    margin-left: 20px;
    position: relative;
    &::after{
      position: absolute;
      top: 50%;
      left: 0;
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      border-bottom: 1px solid hsla(0,0%,88.2%,.233);
    }
    .r-list {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    li{
      width: 25%;
      margin: 20px 0;
      .r-title {
          color: #506173;
          font-size: 14px;
          margin-bottom: 10px;
      }
      .r-data{
          color: #5A6C7E;
          font-size: 14px;
      }
    }
}
}
.content-info {
    font-size: 14px;
    font-weight: 400;
    color: #5A6C7E;
    line-height: 24px;
    margin: 10px 0;
    height: 48px;
}
.tu-box{
    background: #F8F8F8;
    border-radius: 4px;
    // padding: 20px;
    margin-top: 50px;
    height: 270px;
}
.zj-status{
    display: flex;
    margin: 20px 0;
    .zj-info{
        margin-right: 80px;
        .zj-text{
          color: #506173;
          font-size: 14px;
      }
      .zj-data{
          color: #5A6C7E;
          font-weight: bold;
          font-size: 14px;
      }
    }
}
.zj-box{
  margin-bottom: 20px;
  .title{
    font-size: 14px;
    color: #5A6C7E;
    line-height: 30px;
    span{
      color: #fff;
    }
  }
  .qd-list{
    display: flex;
    // margin-top: 10px;
    border: 1px solid #E6EAEE;
    li{
      width: 25%;
      text-align: center;
      .item-title{
        height: 50px;
        line-height: 50px;
        background: #E6EAEE;
        // border-radius: 4px 4px 0 0;
        font-size: 14px;
        color: #55707B;
        // border-bottom: 1px solid #E6EAEE;
        // border-top: 1px solid #E6EAEE;
      }
      .item-content {
          height: 50px;
          line-height: 50px;
          // background: #263240;
          // border-radius: 4px 4px 0 0;
          font-size: 14px;
          color: #2B313C;
              border-top: 1px solid #E6EAEE;
      }
    }
  }
}
.basic-info .other-info li span:first-child,.basic-info .zd-info li span:first-child{
    width: 100px;
}
.modal-box{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    .bg-color{
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100%;
  }
  .modal-content{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -459px;
    margin-top: -287px;
    li{
      display: flex;
      align-items: center;
      .left-icon{
        position: absolute;
        left: -60px;
        font-size: 40px;
        cursor: pointer;
        &:hover{
          color: #0eb18d;
        }
        &.active{
          cursor: inherit;
          color: #8a8787
        }
      }
      .right-icon{
          position: absolute;
          right: -60px;
          font-size: 40px;
          cursor: pointer;
          &:hover{
            color: #0eb18d;
          }
          &.active{
          cursor: inherit;
          color: #8a8787
        }
      }
      .img-item{
        width: 919px;
        height: 574px;
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
    .select-tj{
      display: flex;
      justify-content: center;
      width: 320px;
      height: 44px;
      line-height: 44px;
      background: hsla(0,0%,100%,.16);
      border-radius: 22px;
      color: #fff;
      margin: 20px auto;
      .slecdOne {
          position: relative;
          &::after{
            content: "";
            display: block;
            width: 1px;
            height: 24px;
            background: hsla(0,0%,100%,.3);
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -12px;
            cursor: pointer;
          }
          &:hover{
            color: #0eb18d;
          }
      }
      .slecdTwo {
          position: relative;
          &:hover{
            color: #0eb18d;
          }
      }
      .select-txt{
          text-align: center;
          width: 160px;
          cursor: pointer;
      }
    }
    .closeBtn{
        position: absolute;
        right: -60px;
        top: -50px;
        font-size: 40px;
        cursor: pointer;
        &:hover{
          color: red;
        }
    }
  }
}
</style>