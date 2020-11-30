<template>
  <div class="area-container">
    <div  class="area-left" :class="{active:btnPostion}">
      <div class="btn-area" @click="btnTran">
        <i class="ivu-icon ivu-icon-md-arrow-dropleft"></i>
      </div>
      <div class="left-echarts" v-show="!btnPostion">
        <div class="area-top">
          <div class="data">
            <Date-picker type="year" v-model="queryObj.startDate" placeholder="选择年" style="width: 100px" @on-change="initData('d')"></Date-picker>
            <Date-picker type="year" v-model="queryObj.endDate" placeholder="选择年" style="width: 100px" @on-change="initData('d')"></Date-picker>
            <Select v-model="queryObj.areaId" style="width: 188px" clearable placeholder="所属区域" @on-change="initData">
                <Option v-for="item in superArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
            </Select>
          </div>
        </div>
        <div class="area-content">
        <div class="data-tu">
          <div data-v-e05f896c="" class="title">
            <span data-v-e05f896c="" class="title-txt">各区的项目套数占比</span>
            <div data-v-e05f896c="" class="btn-a">
              <div data-v-e05f896c="" class="big" @click="echartsExpEvent(1)">
                <Icon type="md-expand" />
              </div>
              <div data-v-e05f896c="" class="download" @click="downloadImg('ref1')">
                <Icon type="md-download" />
              </div>
            </div>
          </div>
          <div class="e-box" id="id1" ref="ref1">

          </div>
        </div>
        <div class="data-tu">
          <div data-v-e05f896c="" class="title">
            <span data-v-e05f896c="" class="title-txt">各区的项目占地面积占比</span>
            <div data-v-e05f896c="" class="btn-a">
              <div data-v-e05f896c="" class="big" @click="echartsExpEvent(1)">
                <Icon type="md-expand" />
              </div>
              <div data-v-e05f896c="" class="download" @click="downloadImg('ref2')">
                <Icon type="md-download" />
              </div>
            </div>
          </div>
          <div class="e-box" id="id2" ref="ref2">

          </div>
        </div>
        <div class="data-tu">
          <div data-v-e05f896c="" class="title">
            <span data-v-e05f896c="" class="title-txt">各区的项目建筑面积占比</span>
            <div data-v-e05f896c="" class="btn-a">
              <div data-v-e05f896c="" class="big" @click="echartsExpEvent(1)">
                <Icon type="md-expand" />
              </div>
              <div data-v-e05f896c="" class="download" @click="downloadImg('ref3')">
                <Icon type="md-download" />
              </div>
            </div>
          </div>
          <div class="e-box" id="id3" ref="ref3">

          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="amap-wrapper"  id="container" >
      <div class="dt-data">已选时间 : {{param.startDate}} - {{param.endDate}}</div>
    </div>
    <Modal
        v-model="echartsModel"
        :footer-hide="true"
        :width="1200">
        <div id="expid" ref="expref" style="color:#000; height:670px; width:1165px; text-align=center">
          
        </div>
    </Modal>
  </div>
</template>

<script>
import AMap from 'AMap';
import json from '@/assets/json/sz.json';
import dayjs from 'dayjs'
import { /*getChildArea,*/ getSuperAraeByChildId, getDictByItem } from '@/utils/index.js'

export default {
  data(){
    return {
      btnPostion: false,
      checkAreaId: null,
      mapObj: null,
      queryObj: {
        startDate: new Date('2006-01-01'),
        endDate: new Date()
      },
      param: {
        startDate: dayjs(new Date('2006-01-01')).format('YYYY'),
        endDate: dayjs(new Date()).format('YYYY'),
      },
      dataList: [],
      markerDataList: [],
      markerList: [],
      projectInfos: [],
      subMarkerList: [],
      infoWindow: {},
      pointFlag: false,
      echartsModel: false,
      num_series_data:[],
      area_series_data:[],
      build_series_data:[],
      projectInfo: {},
      progressInfo: {},
      typeInfo: [],
    }
  },
  methods:{
    projectPosition (projectId) {
      this.$axios.post('project/queryProjectById/'+ projectId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.projectInfo = resp.data.data.projectInfo;
          this.progressInfo = resp.data.data.progressInfo;
          this.typeInfo = resp.data.data.typeInfo;
          this.mapObj.setZoom(13);
          this.mapObj.setCenter(new AMap.LngLat(this.projectInfo.longitude, this.projectInfo.latitude))
          this.projectInfo.lng = this.projectInfo.longitude;
          this.projectInfo.lat = this.projectInfo.latitude;
          this.projectInfo.countNum = this.projectInfo.publicRealNum;
          this.projectInfo.progressStatus = this.progressInfo.progressStatus;
          this.projectInfo.areaName = getSuperAraeByChildId(this.projectInfo.areaId).areaName;
          if (this.typeInfo.length > 0) {
            let str = [];
            this.typeInfo.forEach(type => {
              str.push(getDictByItem('住房类型', type.typeName).dictItem);
            })
            this.projectInfo.typeInfos = str.join(",");
          }
          this.projectInfos[0] = this.projectInfo;
          this.showProject()
        }
      })
    },
    initData (areaId) {
      if (areaId < 1000 || areaId === undefined){
        this.checkAreaId = areaId;
      }
      
      this.param.startDate = dayjs(this.queryObj.startDate).format('YYYY');
      this.param.endDate = dayjs(this.queryObj.endDate).format("YYYY");
      this.param.areaId = this.queryObj.areaId;
      this.$axios.post('/map/queryStaticByYear', this.param)
      .then((resp) => {
        if(resp.data.code === 1){
          this.dataList = resp.data.data;
          this.initEcharts();
        }
      });
      if (areaId !== undefined) {
        this.hideMarker();
      }
      
      this.markerList = [];
      this.$axios.post('/map/queryAreaCount', this.param)
      .then((resp) => {
        if(resp.data.code === 1){
          this.markerDataList = resp.data.data;
          if (this.checkAreaId) {
            this.markerDataList.forEach(markerData => {
              if (this.checkAreaId === markerData.areaId) {
                this.clickMarker(markerData);
              }
            })
          } else {
            this.showMarker();
            this.mapObj.setCenter(new AMap.LngLat(114.197428, 22.60923));
            this.mapObj.setZoom(11);
          }
        }
      });
    },
    initMap () {
      this.mapObj = new AMap.Map('container', {
        zoom:11,//级别
        mapStyle: 'amap://styles/blue',
        center: [114.197428, 22.60923],//中心点坐标
      });
      let that = this;
      this.mapObj.plugin(['AMap.ToolBar'], function () {
        that.mapObj.addControl(new AMap.ToolBar({
          offset: new AMap.Pixel(30,30),
          position: 'RB',
          direction: false,
          locate: false
        }))
      });
      // 添加滚动监听事件
      this.mapObj.on('zoomend', this.mapZoomEvent);
      this.mapObj.on('click', this.mapClickEvent)
      json.features.forEach(area => {
        this.showAreaLine(area);
      })
    },
    // 数量点
    showMarker(){
      if (this.markerList.length === 0) {
        this.markerDataList.forEach(markerData => {
          var marker = new AMap.Marker({
            position: new AMap.LngLat(markerData.lng, markerData.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            // title: markerData.areaId,
            content: '<div class="marker-content"><div>' + markerData.areaName + '</div><div>' + markerData.countNum + '套</div></div>'
          });
          let that = this;
          marker.on('click', function(){
            that.clickMarker(markerData)
          });
          this.markerList.push(marker);
          // 将创建的点标记添加到已有的地图实例：
          this.mapObj.add(marker);
        })
      } else {
        this.markerList.forEach(marker => {
          this.mapObj.add(marker);
        })
      }
    },
    // 点击地图点
    clickMarker (markerData) {
      if (markerData.lng && markerData.lat) {
        this.mapObj.setCenter(new AMap.LngLat(markerData.lng,markerData.lat));
        this.mapObj.setZoom(13);
        // this.mapObj.clearMap();
        //标记子级标记
        this.param.startDate = dayjs(this.queryObj.startDate).format('YYYY');
        this.param.endDate = dayjs(this.queryObj.endDate).format("YYYY");
        this.$axios.post('map/queryProjectCountByAreaId/'+markerData.areaId, this.param)
        .then((resp) => {
          if(resp.data.code === 1){
            this.projectInfos = resp.data.data;
            this.showProject();
            this.hideMarker();
          }
        });
      }
      
    },
    hideMarker () {
      this.markerList.forEach(marker => {
        this.mapObj.remove(marker);
      })
    },
    // 展示子级项目
    showProject () {
      this.projectInfos.forEach(pointData => {
        pointData.progressStatus = getDictByItem('进度状态', pointData.progressStatus).dictItem;
        pointData.projectChannel = getDictByItem('建设渠道', pointData.projectChannel).dictItem;
        var marker = new AMap.Marker({
          position: new AMap.LngLat(pointData.lng, pointData.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          // title: pointData.projectId,
          content: '<div style="display: flex;"><div class="point-content"></div>'+
                   '<div style="width:300px">' + pointData.projectName + '</div></div>'
        });
        let that = this;
        marker.on('mouseover', function(){
          //if (!that.pointFlag){
            that.showPoint(pointData)
          //}
        });
        marker.on('mouseout', function(){
          if (!that.pointFlag){
            that.hidePoint(pointData)
          }
        });
        marker.on('click', function(){
          that.clickPoint(pointData)
        });
        this.subMarkerList.push(marker);
        // 将创建的点标记添加到已有的地图实例：
        this.mapObj.add(marker);
      })
    },
    showPoint (pointData) {
      var content = [
          '<div>' + pointData.projectName + '</div>',
          '<div style="color:#0eb18d">' + pointData.countNum + '套</div>'
      ];
      // 创建 infoWindow 实例	
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: '<div class="infohover-box">' + content.join("") + '<div class="amap-info-sharp"></div></div>' //传入 dom 对象，或者 html 字符串
      });
      // 打开信息窗体
      this.infoWindow.open(this.mapObj,[pointData.lng, pointData.lat]);
    },
    hidePoint () {
      this.infoWindow.close();
    },
    clickPoint (pointData) {
      this.pointFlag = true;
      console.log(pointData)
      let progress = pointData.progressStatus ? pointData.progressStatus : '';
      let channel = pointData.projectChannel ? pointData.projectChannel : '';
      let typeInfos = pointData.typeInfos ? pointData.typeInfos : '';
      let area_name = pointData.areaName ? pointData.areaName : '';
      var content = [
          '<div class="title-info-map">' + pointData.projectName + '</div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '纳入计划年份：' + '</div><div class="info-text-area">' + pointData.planYear + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '公共住房实际总套数：' + '</div><div class="info-text-area">' + pointData.countNum + '套</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '进度情况：' + '</div><div class="info-text-area">' + progress + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '建设渠道：' + '</div><div class="info-text-area">' + channel + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '住房类型：' + '</div><div class="info-text-area">' + typeInfos + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '区域：' + '</div><div class="info-text-area">' + area_name + '</div></div>',
          '<div class="btn-info-map" onclick="clickDetail('+ pointData.projectId +')">点击查看详情</div>'
      ];
      let that = this;
      window.clickDetail = function (projectId) {
        that.$router.push({
          path: '/projectDetail',
          query: {
            projectId: projectId
          }
        })
      }

      // 创建 infoWindow 实例	
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: '<div class="infocontent-box">' + content.join("") + '<div class="amap-info-sharp"></div></div>'  //传入 dom 对象，或者 html 字符串
      });
        
      // 打开信息窗体
      this.infoWindow.open(this.mapObj,[pointData.lng, pointData.lat]);
    },
    // 地图缩放事件
    mapZoomEvent () {
      let level = this.mapObj.getZoom();
      if (level >= 13) {
        this.hideMarker();
      }
      if (level <= 11){
        this.showMarker();
        this.mapClickEvent();
        this.subMarkerList.forEach(sub => {
          this.mapObj.remove(sub);
        })
      }
    },
    mapClickEvent () {
      this.pointFlag = false;
      if (Object.keys(this.infoWindow).length > 0){
        this.infoWindow.close();
      }
    },
    // 行政边界
    showAreaLine(areadata){
      let data = areadata.geometry.coordinates[0]
      data.forEach(item => {
        var path = []
        item.forEach(areaItem => {
          path.push(new AMap.LngLat(areaItem[0], areaItem[1]));
        })
        //添加区的地图
        var polyline = new AMap.Polyline({
          path: path,  
          borderWeight: 1, // 线条宽度，默认为 1
          strokeOpacity: 0.4,
          strokeStyle: 'dashed',
          strokeColor: '#0ea4ed', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        });
        // 将折线添加至地图实例
        this.mapObj.add(polyline);
      })
    },
    initEcharts () {
      this.num_series_data = {
        series_data: [],
        legend_data: []
      };
      this.area_series_data = {
        series_data: [],
        legend_data: []
      };
      this.build_series_data = {
        series_data: [],
        legend_data: []
      };
      this.dataList.forEach(data => {
        if (data.countNum) {
          this.num_series_data.legend_data.push(data.planYear);
          let obj = {};
          obj.name = data.planYear;
          obj.value = data.countNum;
          this.num_series_data.series_data.push(obj);
        }
        if (data.areaNum) {
          this.area_series_data.legend_data.push(data.planYear);
          let obj = {};
          obj.name = data.planYear;
          obj.value = data.areaNum;
          this.area_series_data.series_data.push(obj);
        }
        if (data.realBuildNum) {
          this.build_series_data.legend_data.push(data.planYear);
          let obj = {};
          obj.name = data.planYear;
          obj.value = data.realBuildNum;
          this.build_series_data.series_data.push(obj);
        }
      })

      this.drowEcharts(this.$refs.ref1, this.num_series_data);
      this.drowEcharts(this.$refs.ref2, this.area_series_data);
      this.drowEcharts(this.$refs.ref3, this.build_series_data);
    },
    drowEcharts (el, data, title) {
      // 实例化echarts对象
      let myChart = this.$echarts.init(el)
      // 绘制条形图
      myChart.setOption({ 
          color:['#51af8f','#ee7c91','#eeca6e','#a283f2','#67c8c9','#f0997a','#589ff8','#dd90f0','#90dbf0','#e5ee7c'],
          title:[
            {
              show: title,
              text: title,
              textStyle: {
                color: '#fff',
                fontSize : 18,
                fontWeight: 'bold'
              },
              left: 30,
              top: 30
            },  
            {
              show: title,
              text: this.param.startDate + "-" + this.param.endDate,
              textStyle: {
                color: '#fff',
                fontSize : 18,
                fontWeight: 'bold'
              },
              right: 60,
              top: 30
            }
          ],
          toolbox:{
            show: title,
            feature: {
              saveAsImage: {
                show: true,
                backgroundColor: '#304354',
                iconStyle: {
                  color: '#fff',
                },
                icon: 'M26.44,66.43H80.56V12.82h40.52V66.43h53.25l-74,79.73L26.44,66.43Zm147.83,80.21v13.07H26.69V146.64H12.87V186.5H187.13V146.64Z'
              }
            },
            right: 170,
            top: 30
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              itemGap : title ? 15 : 5,
              left: title? 750 : 260,
              top : 'middle',
              textStyle:{
                color: '#a8a8a8',
                fontSize : title ? 20: 10
              },
              icon: 'circle',
              data: data.legend_data
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
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
    echartsExpEvent(data){
      this.echartsModel = true;
      if (data === 1) {
        this.drowEcharts(this.$refs.expref, this.num_series_data, '各区的项目套数占比');
      }
      if (data === 2) {
        this.drowEcharts(this.$refs.expref, this.area_series_data, '各区的项目占地面积占比');
      }
      if (data === 3) {
        this.drowEcharts(this.$refs.expref, this.build_series_data, '各区的项目建筑面积占比');
      }
    },
    btnTran(){
      this.btnPostion = !this.btnPostion
    },
    downloadImg (ref) {
      var image = this.$refs[ref].children[0].children[0].toDataURL("image/jpeg");
      var $a = document.createElement('a');
      $a.setAttribute("href", image);
      $a.setAttribute("download", "下载图片");
      $a.click();
    }
  },
  computed: {
    superArea () {
      return this.$store.getters.getSuperArea;
    }
  },
  mounted() {
    this.initData();
    this.initMap();
    
  },
  beforeRouteEnter (to, from, next) {
      next( (vm) => {
        if (from.name === 'projectDetail') {
          vm.projectPosition(from.query.projectId)
        }
      });
  }
}
</script>

<style lang="less" scoped>
.area-container{
    display: flex;
    height: 100%;
}
.left-echarts {
    height: 100%;
    display: flex;
    flex-direction: column;
    .area-top{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 0 20px;
      .date{
          width: 100%;
      }
  }
  .area-content{
    padding: 0 20px;
    overflow: auto;
    .data-tu{
      margin-top: 10px;
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-txt{
            font-size: 14px;
            &::before{
              content: "";
              display: inline-block;
              width: 2px;
              height: 10px;
              background: #0eb18d;
              margin-right: 10px;
            }
        }
        .btn-a{
            display: flex;
        }
        .big{
          cursor: pointer;
          width: 14px;
          margin-right: 20px;
        }
        .download{
            cursor: pointer;
            width: 14px;
        }
      }
      .e-box{
        margin-top: 10px;
        width: 100%;
        height: 250px;
        background: #304354;
        border-radius: 4px;
    }
    }
  }
}
.area-left{
    width: 440px;
    padding: 20px 0;
    background: #2d3c4b;
    position: relative;
    &.active{
        width: 0;
        transition: all .05s;
    }
}
.btn-area {
    width: 20px;
    height: 90px;
    background: #1a2631;
    border-radius: 0 4px 4px 0;
    position: absolute;
    right: -20px;
    top: 20px;
    z-index: 99;
    cursor: pointer;
    .ivu-icon {
        color: #13a882;
        margin-top: 40px;
    }
}
.amap-wrapper{
  width: 100%;
  height: 100%;
  flex: 1;
}
/deep/.ivu-modal-content {
    background-color: #304354;
}
.dt-data{
    width: 220px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: rgba(26,43,56,.88);
    border: 1px solid hsla(0,0%,100%,.2);
    position: absolute;
    top: 20px;
    left: 50%;
    z-index: 100;
    margin-left: -110px;
    font-size: 14px;
    color: #96acc1;
}
</style>