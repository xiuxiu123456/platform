<template>
  <div class="project-content">
    <!-- <div class="top-bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">项目列表</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">{{superArea.areaName}}</BreadcrumbItem>
        <BreadcrumbItem>{{area.areaName}}</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <!-- 编辑基础信息 start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑基本信息</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateProject">保存</Button>
      </div>
      <!-- 项目名称 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">项目名称</div>
          <Input v-model="projectInfo.projectName" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">项目别名</div>
          <Input v-model="projectInfo.projectAlias" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">项目状态</div>
          <Select v-model="projectInfo.projectStatus" style="width:140px">
            <Option v-for="(item, index) in projectStatusList" :key="index" :value="item.dictValue" >{{item.dictItem}}</Option>
          </Select>
        </div>
      </div>
      <!-- 项目地址 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">项目地址</div>
          <Select value="深圳市" style="width:140px;margin-right: 20px;">
            <Option value="深圳市" >深圳市</Option>
          </Select>
          <Select v-model="projectInfo.superAreaId" style="width:140px;margin-right: 20px;" @on-change="changeArea">
            <Option v-for="(item, index) in superAreaList" :key="index" :value="item.areaId" >{{item.areaName}}</Option>
          </Select>
          <Select v-model="projectInfo.areaId" style="width:140px;margin-right: 20px;">
            <Option v-for="(item, index) in childAreaList" :key="index" :value="item.areaId" >{{item.areaName}}</Option>
          </Select>
          <Input v-model="projectInfo.areaDetail" placeholder="请输入" style="width: 300px" />
        </div>
      </div>
      <!-- 经纬度 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">经纬度</div>
          <Input v-model="projectInfo.longitude" placeholder="请输入" style="width: 140px;margin-right: 20px;" />
          <Input v-model="projectInfo.latitude" placeholder="请输入" style="width: 140px;" />
        </div>
        <div class="edit-content">
          <div class="name">数据源</div>
          <Input v-model="projectInfo.datasource" placeholder="请输入" style="width: 300px;" />
        </div>
        <div class="edit-content">
          <div class="name">项目ID</div>
          <Input v-model="projectInfo.projectId" disabled placeholder="请输入" style="width: 300px;" />
        </div>
        <div class="edit-content">
          <div class="name">责任单位</div>
          <Select v-model="projectInfo.projectOrg" style="width:140px"> 
            <Option v-for="(item, index) in projectOrgList" :key="index" :value="item.dictValue" >{{item.dictItem}}</Option>
          </Select>
        </div>
        <div class="edit-content">
          <div class="name">组织建设单位</div>
          <Input v-model="projectInfo.projectUnit" placeholder="请输入" style="width: 300px;" />
        </div>
        <div class="edit-content">
          <div class="name">纳入计划年限</div>
          <Select v-model="projectInfo.planYear" style="width:140px"> 
            <Option v-for="(item, index) in planYearList" :key="index" :value="item.value" >{{item.label}}</Option>
          </Select>
        </div>
      </div>
      <!-- 建设方式 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">建设方式</div>
          <Select v-model="projectInfo.projectType" style="width:140px" @on-change="projectTypeChange">
            <Option v-for="(item, index) in projectTypeList" :key="index" :value="item.dictValue" >{{item.dictItem}}</Option>
          </Select>
        </div>
        <div class="edit-content">
          <div class="name">建设渠道</div>
          <Select v-model="projectInfo.projectChannel" style="width:140px">
            <Option v-for="(item, index) in projectChannelList" :key="index" :value="item.dictValue" >{{item.dictItem}}</Option>
          </Select>
        </div>
        <div class="edit-content">
          <div class="name">间数</div>
          <Input v-model="projectInfo.projectNum" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">项目总建筑面积（万m2）</div>
          <Input v-model="projectInfo.projectArea" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">公共住房计划建筑面积（万m2）</div>
          <Input v-model="projectInfo.publicPlanArea" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">公共住房计划总套数</div>
          <Input v-model="projectInfo.publicPlanNum" placeholder="请输入" style="width: 300px" />
        </div>
      </div>
      <!-- 住宅类 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">住宅楼总建筑面积（万m2）</div>
          <Input v-model="projectInfo.residenceArea" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">公共住房实际建筑面积（万m2）</div>
          <Input v-model="projectInfo.publicRealArea" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">公共住房实际总套数</div>
          <Input v-model="projectInfo.publicRealNum" placeholder="请输入" style="width: 300px" />
        </div>
      </div>
      <!-- 备注 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">备注</div>
          <Input v-model="projectInfo.remark" placeholder="请输入" style="width: 900px" />
        </div>
      </div>
      <!-- 编辑基础信息end -->
    </div>
    <!-- 编辑基础信息 end -->
    <!-- 编辑项目进度 start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑项目进度</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateProgress">保存</Button>
      </div>
      <!-- 最新进度 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">最新进度</div>
          <Select v-model="progressInfo.progressStatus" style="width:140px">
            <Option v-for="(item, index) in progressStatusList" :key="index" :value="item.dictValue" >{{item.dictItem}}</Option>
          </Select>
        </div>
        <div class="edit-content">
          <div class="name">具体说明</div>
          <Input v-model="progressInfo.progressDescribe" placeholder="请输入" style="width: 620px" />
        </div>
        <div class="edit-content">
          <div class="name">说明时间</div>
          <DatePicker v-model="progressInfo.describeDate" clearable type="date" placeholder="说明时间" style="width: 140px"></DatePicker>
        </div>
      </div>
       <!-- 计划开工 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">计划开工</div>
          <DatePicker v-model="progressInfo.planOpen" clearable type="month" placeholder="计划开工" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">计划基础建成</div>
          <DatePicker v-model="progressInfo.planBuild" clearable type="month" placeholder="计划基础建成" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">上报竣工</div>
          <DatePicker v-model="progressInfo.submitClose" clearable type="month" placeholder="上报竣工" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">实际开工</div>
          <DatePicker v-model="progressInfo.realOpen" clearable type="month" placeholder="实际开工" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">实际基本建成</div>
          <DatePicker v-model="progressInfo.realBuild" clearable type="month" placeholder="实际基本建成" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">实际竣工</div>
          <DatePicker v-model="progressInfo.realClose" clearable type="month" placeholder="实际竣工" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">计划供应</div>
          <DatePicker v-model="progressInfo.planSupply" clearable type="month" placeholder="计划供应" style="width: 140px"></DatePicker>
        </div>
        <div class="edit-content">
          <div class="name">实际供应</div>
          <DatePicker v-model="progressInfo.realSupply" clearable type="month" placeholder="实际供应" style="width: 140px"></DatePicker>
        </div>
      </div>
    </div>
    <!-- 编辑项目进度end -->
    <!-- 编辑宗地信息start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑宗地信息</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateParcelInfo">保存</Button>
      </div>
      <!-- 宗地号 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">宗地号</div>
          <Input v-model="parcelInfo.parcelId" placeholder="宗地号" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">土地出让时间</div>
          <DatePicker v-model="parcelInfo.parcelDate" clearable type="year" placeholder="土地出让时间" style="width: 140px"></DatePicker>
        </div>
      </div>
      <!-- 选址意见书号 -->
      <div class="project-box">
        <div class="edit-content">
          <div class="name">选址意见书号</div>
          <Input v-model="parcelInfo.parcelCode" placeholder="选址意见书号" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">容积率</div>
          <Input v-model="parcelInfo.parcelRate" placeholder="容积率" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">用地单位</div>
          <Input v-model="parcelInfo.parcelOrg" placeholder="用地单位" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">用地面积（公顷）</div>
          <Input v-model="parcelInfo.parcelArea" placeholder="用地面积（公顷）" style="width: 300px" />
        </div>
      </div>
    </div>
     <!-- 编辑宗地信息end -->
     <!-- 编辑住房类型start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑住房类型</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updatePorjectType">保存</Button>
      </div>
      <div class="text">选择本项目包含住房类型，并填写套数：安居型商品房、经济适用房、廉租住房</div>
      <div class="project-box">
        <div class="edit-content" v-for="(typeItem) in typeObjArray" :key="typeItem.type">
          <div class="name"><Checkbox v-model="typeItem.checked">{{typeItem.typeName}}</Checkbox></div>
          <Input v-model="typeItem.typeNum" :disabled="!typeItem.checked" placeholder="请输入" style="width: 140px" />
        </div>
      </div>
    </div>
    <!-- 编辑住房类型end -->
    <!-- 编辑户型结构start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑户型结构</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateLayoutInfo">保存</Button>
      </div>
      <div class="project-box">
        <div class="edit-content">
          <div class="name">户型结构描述</div>
          <Input v-model="layoutInfo.layoutDescribe" placeholder="请输入" style="width: 620px" />
        </div>
      </div>
      <div class="text txt-b">选择本项目户型包含面积，并填写该面积段内套数：50-70平、120平以上</div>
      <div class="project-box">
        <div class="edit-content" v-for="(item,index) in layoutAreaArray" :key="index">
          <div class="name"><Checkbox v-model="item.checked">{{item.layoutName}}</Checkbox></div>
          <Input v-model="item.layoutAreaNum" :disabled="!item.checked" placeholder="请输入" style="width: 140px" />
        </div>
      </div>
      <div class="text txt-b">选择本项目包含户型，并填写该户型的套数：二房</div>
      <div class="project-box">
        <div class="edit-content" v-for="(item,index) in layoutHomeArray" :key="index">
          <div class="name"><Checkbox v-model="item.checked">{{item.layoutName}}</Checkbox></div>
          <Input v-model="item.layoutItemNum" :disabled="!item.checked" placeholder="请输入" style="width: 140px" />
        </div>
      </div>
    </div>
    <!-- 编辑户型结构end -->
    <!-- 编辑资金情况start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑资金情况</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateFund">保存</Button>
      </div>
      <div class="project-box">
        <div class="edit-content">
          <div class="name">计划总投资（万元）</div>
          <Input v-model="fundInfo.planInvest" placeholder="请输入" style="width: 140px" />
        </div>
        <div class="edit-content">
          <div class="name">已完成投资（2014年）</div>
          <Input v-model="fundInfo.realInvest" placeholder="请输入" style="width: 140px" />
        </div>
      </div>
      <div class="text txt-b">选择资金渠道，并填写金额（万元）：区财政</div>
      <div class="project-box">
        <div class="edit-content" v-for="fund in fundChannelArray" :key="fund.fundChannelType">
          <div class="name"><Checkbox v-model="fund.checked">{{fund.fundChannelName}}</Checkbox></div>
          <Input v-model="fund.fundChannelNum" :disabled="!fund.checked" placeholder="请输入" style="width: 140px" />
        </div>
      </div>
      <div class="text txt-b"> 选择是否需要回购：
        <RadioGroup v-model="buybackInfo.buybackFlag">
            <Radio label="1">需要回购</Radio>
            <Radio label="0">不需要回购</Radio>
        </RadioGroup>
      </div>
      <div class="project-box">
        <div class="edit-content">
          <div class="name">回购单位</div>
          <Input v-model="buybackInfo.buybackOrg" :disabled="buybackInfo.buybackFlag === '0'" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">回购资金类型</div>
          <Input v-model="buybackInfo.buybackType" :disabled="buybackInfo.buybackFlag === '0'" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">回购套数</div>
          <Input v-model="buybackInfo.buybackNum" :disabled="buybackInfo.buybackFlag === '0'" placeholder="请输入" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">回购资金金额</div>
          <Input v-model="buybackInfo.buybackAccount" :disabled="buybackInfo.buybackFlag === '0'" placeholder="请输入" style="width: 300px" />
        </div>
      </div>
    </div>
     <!-- 编辑资金情况end -->
     <!-- 其他信息start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">其他信息</div>
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateOtherInfo">保存</Button>
      </div>
      <div class="project-box">
        <div class="edit-content">
          <div class="name">施工单位</div>
          <Input v-model="otherInfo.projectBuildOrg" placeholder="施工单位" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">设计单位</div>
          <Input v-model="otherInfo.projectDesignOrg" placeholder="设计单位" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">监理单位</div>
          <Input v-model="otherInfo.projectMonitorOrg" placeholder="监理单位" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">项目联系人</div>
          <Input v-model="otherInfo.projectEmp" placeholder="项目联系人" style="width: 300px" />
        </div>
        <div class="edit-content">
          <div class="name">联系方式</div>
          <Input v-model="otherInfo.projectPhone" placeholder="联系方式" style="width: 300px" />
        </div>
      </div>
    </div>
    <!-- 其他信息end -->
    <!-- 编辑项目图册start -->
    <div class="project-select">
      <div class="top-content">
        <div class="project-title">编辑项目图册</div>
          <Button type="primary" size="small" style="margin-right: 5px">保存</Button>
      </div>
      <!-- 实景图 -->
      <div class="upload-info" v-for="(imgObj, index) in imgList" :key="index">
        <div class="upload-title">{{imgObj.imgName}}</div>
        <div class="demo-upload-list" v-for="img in imgObj.imgList" :key="img.imgId">
          <img :src="img.url">
          <div class="demo-upload-list-cover">
            <div class="hover-text mrt" @click="setMainImg(img)">设为封面</div>
            <div class="hover-text" @click="removeImg(img)">删除图片</div>
          </div>
        </div>
         <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-exceeded-size="handleMaxSize"
          type="drag"
          :data="{projectId:imgObj.projectId,imgType:imgObj.imgType,isMain:'0'}"
          :on-success="imgSuccess"
          action="/project/uploadImg"
          style="display: inline-block;width:300px;">
          <div style="width:300px;height:180px;line-height: 180px;">
              <Icon type="ios-camera" size="80"></Icon>
          </div>
        </Upload>
      </div>
      
     </div>
     <!-- 编辑项目图册end -->
     <div class="btn-box">
      <div class="btn-left">
         <Button type="primary" size="small" style="margin-right: 5px">返回</Button>
      </div>
      <div class="btn-right">上次更新：2020-04-28  17:34:36</div></div>
  </div>
</template>
<script>
import {getChildArea, getDictByDictName, getChildAreaBySuperId ,getSuperAraeByChildId } from '@/utils/index.js'
import dayjs from 'dayjs'

export default {
  data(){
    return {
      projectItem:'',
      disabledGroup:'',
      oporationLog: {},
      imgList: [],
      projectInfo: {
        projectName: null,
        projectAlias: null,
        projectStatus: null,
        superAreaId: null,
        areaId: null,
        areaDetail: null,
        latitude: null,
        longitude: null,
        datasource: null,
        planYear: null,
        projectOrg: null,
        projectUnit: null,
        projectType: null,
        projectChannel: null,
        projectNum: null,
        projectArea: null,
        residenceArea: null,
        publicPlanArea: null,
        publicRealArea: null,
        publicPlanNum: null,
        publicRealNum: null,
        remark: null
      },
      progressInfo: {},
      parcelInfo: {},
      typeInfo: [],
      typeObjArray: [],
      layoutInfo: {},
      fundInfo: {},
      buybackInfo: {},
      otherInfo: {},
      superArea: {},
      area: {},
      projectStatusList: getDictByDictName('项目状态'),
      projectOrgList: getDictByDictName('责任单位'),
      projectTypeList: getDictByDictName('建设方式'),
      progressStatusList: getDictByDictName('进度状态'),
      typeInfoList: getDictByDictName('住房类型'),
      layoutAreaList: getDictByDictName('户型面积'),
      layoutHomeList: getDictByDictName('户型类型'),
      fundChannelList: getDictByDictName('资金渠道'),
      projectChannelList: [],
      childAreaList: [],
      layoutAreaArray: [],
      layoutHomeArray: [],
      fundChannelArray: []
    }
  },
  methods: {
    initPorjectInfo () {
      this.$axios.post('project/queryProjectById/'+ this.projectId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.projectInfo = resp.data.data.projectInfo;
          if (this.projectInfo.areaId) {
            this.projectInfo.superAreaId = getSuperAraeByChildId(this.projectInfo.areaId).areaId;
            this.changeArea(this.projectInfo.superAreaId);
            this.area = getChildArea(this.projectInfo.areaId);
            this.superArea = getSuperAraeByChildId(this.projectInfo.areaId);
          }
          if (this.projectInfo.projectType) {
            this.projectTypeChange(this.projectInfo.projectType);
          }
          this.progressInfo = resp.data.data.progressInfo;
          this.handlerProgress();
          this.parcelInfo = resp.data.data.parcelInfo;
          this.parcelInfo.parcelDate = new Date(this.parcelInfo.parcelDate+"-"+"01"+"-"+"01");
          this.typeInfo = resp.data.data.typeInfo;
          this.handlerTypeInfo();

          this.layoutInfo = resp.data.data.layoutInfo;
          this.handerLayoutInfo();
          this.handertHomeList();
          this.fundInfo = resp.data.data.fundInfo;
          this.handerFundInfo();
          this.buybackInfo = resp.data.data.buybackInfo;
          this.otherInfo = resp.data.data.otherInfo;

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
          imgItems.forEach((item, index) => {
            let imgObj = {};
            imgObj.imgName = item.dictItem;
            imgObj.imgList = [];
            imgObj.projectId = this.projectId;
            imgObj.imgType = item.dictValue;
            for (let img in this.projectImages) {
              if (item.dictValue === img) {
                imgObj.imgList = this.projectImages[img];
              }
            }
            this.imgList.push(imgObj);
            this.$set(this.imgList[index],'imgList', imgObj.imgList);
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
          projectId:  this.projectId
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
    handlerProgress () {
      this.progressInfo.describeDate = this.progressInfo.describeDate + '';
          if (this.progressInfo.describeDate.length === 8) {
            let date = this.progressInfo.describeDate.substring(0,4)+"-"
                      +this.progressInfo.describeDate.substring(4,6)+"-"+this.progressInfo.describeDate.substring(6,8);
            this.progressInfo.describeDate = new Date(date)
          } else{
            this.progressInfo.describeDate = null;
          }
          this.progressInfo.planOpen = this.progressInfo.planOpen + '';
          if (this.progressInfo.planOpen.length === 6) {
            let date = this.progressInfo.planOpen.substring(0,4)+"-" +this.progressInfo.planOpen.substring(4,6) + "-01";
            this.progressInfo.planOpen = new Date(date)
          } else{
            this.progressInfo.planOpen = null;
          }
          this.progressInfo.planBuild = this.progressInfo.planBuild + '';
          if (this.progressInfo.planBuild.length === 6) {
            let date = this.progressInfo.planBuild.substring(0,4)+"-" +this.progressInfo.planBuild.substring(4,6) + "-01";
            this.progressInfo.planBuild = new Date(date)
          } else{
            this.progressInfo.planBuild = null;
          }
          this.progressInfo.submitClose = this.progressInfo.submitClose + '';
          if (this.progressInfo.submitClose.length === 6) {
            let date = this.progressInfo.submitClose.substring(0,4)+"-"+this.progressInfo.submitClose.substring(4,6) + "-01";
            this.progressInfo.submitClose = new Date(date)
          } else{
            this.progressInfo.submitClose = null;
          }
          this.progressInfo.realOpen = this.progressInfo.realOpen + '';
          if (this.progressInfo.realOpen.length === 6) {
            let date = this.progressInfo.realOpen.substring(0,4)+"-" +this.progressInfo.realOpen.substring(4,6) + "-01";
            this.progressInfo.realOpen = new Date(date)
          } else{
            this.progressInfo.realOpen = null;
          }
          this.progressInfo.realBuild = this.progressInfo.realBuild + '';
          if (this.progressInfo.realBuild.length === 6) {
            let date = this.progressInfo.realBuild.substring(0,4)+"-" +this.progressInfo.realBuild.substring(4,6) + "-01";
            this.progressInfo.realBuild = new Date(date)
          } else{
            this.progressInfo.realBuild = null;
          }
          this.progressInfo.realClose = this.progressInfo.realClose + '';
          if (this.progressInfo.realClose.length === 6) {
            let date = this.progressInfo.realClose.substring(0,4)+"-"+this.progressInfo.realClose.substring(4,6) + "-01";
            this.progressInfo.realClose = new Date(date)
          } else{
            this.progressInfo.realClose = null;
          }
          this.progressInfo.planSupply = this.progressInfo.planSupply + '';
          if (this.progressInfo.planSupply.length === 6) {
            let date = this.progressInfo.planSupply.substring(0,4)+"-" +this.progressInfo.planSupply.substring(4,6) + "-01";
            this.progressInfo.planSupply = new Date(date)
          } else{
            this.progressInfo.planSupply = null;
          }
          this.progressInfo.realSupply = this.progressInfo.realSupply + '';
          if (this.progressInfo.realSupply.length === 6) {
            let date = this.progressInfo.realSupply.substring(0,4)+"-"+this.progressInfo.realSupply.substring(4,6) + "-01";
            this.progressInfo.realSupply = new Date(date)
          } else{
            this.progressInfo.realSupply = null;
          }
    },
    handlerTypeInfo () {
      this.typeInfoList.forEach(item =>{
        let obj = {};
        obj.checked = false;
        obj.typeNum = null;
        obj.type = item.dictValue;
        obj.typeName = item.dictItem;
        if (this.typeInfo) {
          this.typeInfo.forEach(type => {
            if (item.dictValue === type.typeName && type.typeNum > 0) {
              obj.checked = true;
              obj.typeNum = type.typeNum;
            }
          })
        }
        this.typeObjArray.push(obj);
      })
    },
    handerLayoutInfo () {
      this.layoutAreaList.forEach(dict => {
        let obj = {}
        obj.layoutName = dict.dictItem;
        obj.layoutAreaName = dict.dictValue;
        obj.checked = false;
        if (this.layoutInfo && this.layoutInfo.layoutAreas ) {
          this.layoutInfo.layoutAreas.forEach(lay => {
            if (dict.dictValue === lay.layoutAreaName) {
              obj.layoutAreaNum = lay.layoutAreaNum;
              obj.checked = true;
            }
          })
        }
        this.layoutAreaArray.push(obj);
      })
    },
    handertHomeList () {
      this.layoutHomeList.forEach(dict => {
        let obj = {}
        obj.layoutName = dict.dictItem;
        obj.layoutItemName = dict.dictValue;
        obj.checked = false;
        if (this.layoutInfo && this.layoutInfo.layoutItems) {
          this.layoutInfo.layoutItems.forEach(lay => {
            if (dict.dictValue === lay.layoutItemName) {
              obj.layoutItemNum = lay.layoutItemNum;
              obj.checked = true;
            }
          })
        } 
        
        this.layoutHomeArray.push(obj);
      })
    },
    handerFundInfo () {
      this.fundChannelList.forEach(dict => {
        let obj = {}
        obj.fundChannelName = dict.dictItem;
        obj.fundChannelType = dict.dictValue;
        obj.checked = false;
        obj.fundChannelNum = null;
        if (this.fundInfo && this.fundInfo.fundChannels) {
          this.fundInfo.fundChannels.forEach(fund =>{
            if (dict.dictValue === fund.fundChannelName) {
              obj.checked = true;
              obj.fundChannelNum = fund.fundChannelNum;
            }
          })
        }
        
        this.fundChannelArray.push(obj);
      })
    },
    handleMaxSize () {
      this.$Notice.error({
          title: '上传的图片尺寸不得大于2M'
      });
    },
    imgSuccess () {
      this.initProjectImage();
      this.$Notice.success({
          title: '图片上传成功'
      });
    },
    setMainImg (img) {
      this.$axios.post('/project/setMainProjectImg/'+ img.imgId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.initProjectImage();
          this.$Notice.success({
            title: '图片设置成功'
          });
        }
      });
    },
    removeImg (img) {
      this.$axios.post('/project/removeProjectImg/'+ img.imgId)
      .then((resp) => {
        if(resp.data.code === 1){
          this.initProjectImage();
          this.$Notice.success({
            title: '图片删除成功'
          });
        }
      });
    },
    changeArea (areaId) {
      this.childAreaList  = getChildAreaBySuperId(areaId);
    },
    projectTypeChange (projectType) {
      let channel = getDictByDictName('建设渠道');
      let type = getDictByDictName('建设方式');
      let id  = null;
      type.forEach(item => {
        if(item.dictValue === projectType) {
          id = item.dictId;
        }
      })
      this.projectChannelList = [];
      channel.forEach(ch => {
        if (ch.superDictId === id) {
          this.projectChannelList.push(ch);
        }
      })
    },
    updateProject () {
      this.$axios.post('/project/updateProjectInfo', this.projectInfo)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updateProgress () {
      let data = Object.assign({}, this.progressInfo);
      data.planOpen     = parseInt(dayjs(data.planOpen).format("YYYYMM"));
      data.realOpen     = parseInt(dayjs(data.realOpen).format("YYYYMM"));
      data.planBuild    = parseInt(dayjs(data.planBuild).format("YYYYMM"));
      data.realBuild    = parseInt(dayjs(data.realBuild).format("YYYYMM"));
      data.submitClose  = parseInt(dayjs(data.submitClose).format("YYYYMM"));
      data.realClose    = parseInt(dayjs(data.realClose).format("YYYYMM"));
      data.planSupply   = parseInt(dayjs(data.planSupply).format("YYYYMM"));
      data.realSupply   = parseInt(dayjs(data.realSupply).format("YYYYMM"));
      data.describeDate = parseInt(dayjs(data.describeDate).format("YYYYMM"));
    
      this.$axios.post('/project/updateProgressInfo', data)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updateParcelInfo () {
      let data = Object.assign({}, this.parcelInfo)
      data.parcelDate = parseInt(dayjs(data.parcelDate).format("YYYY"));
      this.$axios.post('/project/updateParcelInfo', data)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updatePorjectType () {
      let data = [];
      this.typeObjArray.forEach ( item  => {
        if (item.checked) {
          let obj = {};
          obj.projectId = this.projectId;
          obj.typeNum = item.typeNum;
          obj.typeName = item.type;
          data.push(obj)
        }
      });
      this.$axios.post('/project/updateBatchTypeInfo', data)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updateLayoutInfo () {
      let data = {}
      data.projectId = this.projectId;
      data.layoutDescribe = this.layoutInfo.layoutDescribe;
      let layoutAreas = [];
      this.layoutAreaArray.forEach(area => {
        if (area.checked) {
          let obj = {};
          obj.projectId = this.projectId;
          obj.layoutAreaName = area.layoutAreaName;
          obj.layoutAreaNum = area.layoutAreaNum;
          obj.checked = area.checked;
          layoutAreas.push(obj);
        }
      })
      data.layoutAreas = layoutAreas;
      let layoutItems = [];
      this.layoutHomeArray.forEach(item => {
        if (item.checked) {
          let obj = {};
          obj.projectId = this.projectId;
          obj.layoutItemName = item.layoutItemName;
          obj.layoutItemNum = item.layoutItemNum;
          obj.checked = item.checked;
          layoutItems.push(obj);
        }
      })
      data.layoutItems = layoutItems

      this.$axios.post('/project/updateLayoutInfo', data)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updateFund () {
      let data = {};
      data.projectId = this.projectId;
      data.planInvest = this.fundInfo.planInvest;
      data.realInvest = this.fundInfo.realInvest;
      let fundChannels = [];
      this.fundChannelArray.forEach(channel => {
        if (channel.checked) {
          let obj = {};
          obj.projectId = this.projectId;
          obj.fundChannelName = channel.fundChannelType;
          obj.fundChannelNum = channel.fundChannelNum;
          fundChannels.push(obj);
        }
      })
      data.fundChannels = fundChannels;
      this.$axios.post('/project/updateFundInfo', data)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: '资金信息' + resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
      this.updateBackInfo();
    },
    updateBackInfo () {
      this.$axios.post('/project/updateBuybackInfo', this.buybackInfo)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title: '回购信息' + resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    },
    updateOtherInfo () {
      this.$axios.post('/project/updateOtherInfo', this.otherInfo)
      .then((resp) => {
        if(resp.data.code === 1){
          this.$Notice.success({
              title:  resp.data.msg,
          });
        } else {
          this.$Notice.error({
              title:  '保存失败',
          });
        }
      });
    }
  },
  created() {
    this.initPorjectInfo();
    this.initProjectImage();
    this.initOporationLog();
  },
  computed: {
    projectId () {
      return this.$route.query.projectId;
    },
    superAreaList () {
      return this.$store.getters.getSuperArea;
    },
    planYearList () {
      let start = 2006;
      let end = (new Date()).getFullYear();
      let array = [];
      for(let i = start ; i <= end; i++) {
        let obj = {};
        obj.value = i;
        obj.label = i;
        array.push(obj);
      }
      return array.reverse();
    }
  },
}
</script>
<style lang="less" scoped>
  .project-content{
    padding: 0 20px 20px;
    .top-bread{
      font-size: 12px;
      font-family: SimSun;
      padding-bottom: 10px;
      border-bottom: 1px solid hsla(0,0%,88.2%,.233);
    }
  }
  .project-select{
    font-size: 14px;
    color: #97a8b0;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    // border: 1px solid #324251;
    border-radius: 4px;
    .text{
      color: #8ba2b9;
      font-size: 12px;
    }
    .txt-b{
        margin-top: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
  }
  .upload-info{
    margin-top: 20px;
    min-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    .upload-title{
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 700;
      color: #FF7154;
      margin-bottom: 10px;
    }
  }
  .demo-upload-list{
      display: inline-block;
      width: 300px;
      height: 180px;
      text-align: center;
      line-height: 180px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #1a2631;
      position: relative;
      -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.2);
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 20px;
      img{
        width: 100%;
        height: 100%;
      }
      .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        .hover-text{
          line-height: 40px;
          cursor: pointer;
          &:hover{
            color: #FF7154;
          }
        }
        .mrt{
          margin-top: 50px;
        }
      }
      &:hover{
          .demo-upload-list-cover{
            display: block;
          }
        }
  }
  .project-box{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      .edit-content{
          margin-right: 20px;
          margin-top: 15px;
          .name{
            font-size: 12px;
            color: #5A6C7E;
            margin-bottom: 10px;
          }
      }
  }
  .top-content{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
  }
  .btn-box {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    margin: 40px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #fff;
    color: #1a2631;
  }
</style>