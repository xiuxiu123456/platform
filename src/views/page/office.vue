<template>

  <div class="amap-wrapper"  id="container" >
      
  </div>
</template>

<script>
import AMap from 'AMap';
import json from '@/assets/json/sz.json';
export default {
  data() {
    return {
      mapObj: null,
      markerList: [],
      subMarkerList: [],
      markerDataList: [],
      villageInfoList: [],
      infoWindow: {}
    }
  },
  methods: {
    initData () {
      this.$axios.post('/office/queryMapCount', this.param)
      .then((resp) => {
        if(resp.data.code === 1){
          this.markerDataList = resp.data.data;
          this.showMarker();
        }
      });
    },
    initMap () {
      this.mapObj = new AMap.Map('container', {
        zoom:11,//级别
        mapStyle: 'amap://styles/blue',
        center: [114.197428, 22.63023],//中心点坐标
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
      if ( markerData.lng && markerData.lat ) {
        this.mapObj.setCenter(new AMap.LngLat(markerData.lng,markerData.lat));
        this.mapObj.setZoom(13);
        this.$axios.post('office/queryOfficeListByAreaId/'+markerData.areaId)
        .then((resp) => {
          if(resp.data.code === 1){
            this.villageInfoList = resp.data.data;
            this.showProject();
            this.hideMarker();
          }
        });
      }
    },
    // 展示子级项目
    showProject () {
      this.villageInfoList.forEach(pointData => {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(pointData.longitude, pointData.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          content: '<div style="display: flex;"><div class="point-content point-content-F"><div class="point-inset"></div></div>'+
                   '<div style="width:300px">' + pointData.officeName + '</div></div>'
        });
        let that = this;
        marker.on('click', function(){
          that.clickPoint(pointData)
        });
        this.subMarkerList.push(marker);
        // 将创建的点标记添加到已有的地图实例：
        this.mapObj.add(marker);
      })
    },
    clickPoint (pointData) {
      this.pointFlag = true;
      var content = [
          '<div class="title-info-map">' + pointData.officeName + '</div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '占地面积：' + '</div><div class="info-text-area">' + (pointData.officeArea?pointData.officeArea:'') + 'm<sup>2</sup></div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '总建筑面积：' + '</div><div class="info-text-area">' + (pointData.buildArea?pointData.buildArea:'') + 'm<sup>2</sup></div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '总栋数：' + '</div><div class="info-text-area">' + (pointData.officeNum ? pointData.officeNum + '栋' : '') + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '办公楼级别：' + '</div><div class="info-text-area">' + (pointData.officeLevel ? pointData.officeLevel : '') + '</div></div>',
          '<div class="infoconten-row"><div class="infoconten-label">' + '停车位数量：' + '</div><div class="info-text-area">' + (pointData.parkingNum ? pointData.parkingNum + '个' : '') + '</div></div>',
          '<div class="btn-info-map" onclick="clickDetail('+ pointData.officeId +')">点击查看详情</div>'
      ];
      let that = this;
      window.clickDetail = function (officeId) {
        that.$router.push({
          path: '/officeDetail',
          query: {
            officeId: officeId
          }
        })
      }

      // 创建 infoWindow 实例	
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: '<div class="infocontent-box">' + content.join("") + '<div class="amap-info-sharp"></div></div>'  //传入 dom 对象，或者 html 字符串
      });
        
      // 打开信息窗体
      this.infoWindow.open(this.mapObj,[pointData.longitude, pointData.latitude]);
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
    hideMarker () {
      this.markerList.forEach(marker => {
        this.mapObj.remove(marker);
      })
    },
    officePosition (officeId) {
      this.$axios.post('office/queryOfficeDetail/'+ officeId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.villageInfoList = [];
          this.villageInfoList.push(resp.data.data);
          this.mapObj.setZoom(13);
          this.mapObj.setCenter(new AMap.LngLat(resp.data.data.longitude, resp.data.data.latitude))
          this.showProject()
        }
      })
    },
  },
  mounted () {
    this.initMap();
    this.initData();
    //this.showMarker()
  },
  beforeRouteEnter (to, from, next) {
    next( (vm) => {
      if (from.name === 'officeDetail') {
        vm.officePosition(from.query.officeId)
      }
    });
  }
}
</script>

<style lang="less" scoped>
.amap-wrapper{
  width: 100%;
  height: 100%;
}
</style>