<template>
  <div class="project-container">
    <div class="project-select">
      <div class="select-box">
        <div data-v-2b2c8176="" class="select-title">条件筛选：</div>
        <div class="select-list">
          <ul>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.superAreaId" clearable placeholder="所属区域" @on-change="changeArea">
                  <Option v-for="item in superArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
                </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.areaId" clearable placeholder="所属街道">
                  <Option v-for="item in childArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
                </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Input v-model="queryObj.parcelArea" clearable placeholder="用地面积" />
              </div>
            </li>
            <li>
              <div class="item-s">
                <Input v-model="queryObj.publicRealArea" clearable placeholder="实际建筑面积" />
              </div>
            </li>
            <li>
              <div class="item-s">
                <Input v-model="queryObj.publicRealNum" clearable placeholder="实际总套数" />
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.planYear" clearable placeholder="纳入计划年限">
                  <Option v-for="item in planYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.projectOrg" clearable placeholder="责任单位">
                  <Option v-for="item in projectOrgList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.projectType" clearable placeholder="建设方式" @on-change="projectTypeChange">
                  <Option v-for="item in projectTypeList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.projectChannel" clearable placeholder="建设渠道">
                  <Option v-for="item in projectChannelList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.progressStatus" clearable placeholder="进度状态">
                  <Option v-for="item in progressStatusList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.typeName" clearable placeholder="住房类型">
                  <Option v-for="item in typeNameList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li>
            <li>
              <div class="item-s">
                <Select v-model="queryObj.projectStatus" clearable placeholder="项目状态">
                  <Option v-for="item in projectStatusList" :value="item.dictValue" :key="item.dictValue">{{ item.dictItem }}</Option>
              </Select>
              </div>
            </li> 
            <Button type="primary" class="btn-primary" @click="queryPorject" >确定</Button>
          </ul>
        </div>
      </div>
      <div class="target-selcet">
        <div class="select-title">目标搜索：</div>
        <div class="select-text">
          <Input v-model="queryObj.queryStr" clearable placeholder="输入项目名称/项目别名/输入项目ID/输入宗地号"  />
        </div>
        <Button type="primary" class="btn-primary" @click="queryPorject" >确定</Button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-top">
        <div class="table-left">
          <div class="table-title">项目列表</div>
          <div class="table-index">检索结果<span data-v-2b2c8176="">{{pageObj.pageTotal}}</span>条</div>
        </div>
        <div class="btn-table">
          <Upload action="/project/upload" 
            :on-success="uploadSuccess" 
            :on-error="uploadError" 
            :on-exceeded-size="uploadExceed"
            :max-size="1048576" 
            :format="['xlsx']"
            v-show="funcObj.func1"
            :on-format-error="formatError"
            :show-upload-list="false" 
            style="margin-right: 10px;">
              <Button type="primary" icon="ios-cloud-upload-outline">新建项目</Button>
          </Upload> 
          <!-- @click="downlaodExcel" -->
          <Button type="warning" class="btn-primary"  v-show="funcObj.func2" >
            <a href="/project/downloadTemplate" download="保障房导入模板.xlsx" style="color:#fff"> <Icon type="ios-download-outline" />下载模板 </a>
          </Button>
        </div>
      </div>
    </div>
    <Table stripe  :columns="columns" :data="tableData">
      <template slot-scope="{ row, index }" slot="action">
          <!-- @click="show(row, index)" -->
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="remove(row, index)">详情</Button> -->
            <Icon type="md-trash" @click="remove(row,index)"  style="color:red; cursor: pointer;font-size: 20px;"/>
        </template>
    </Table>
    <div style="text-align:center; margin:30px 0px 30px 0px">
      <Page :page-size="pageObj.pageSize" :current="pageObj.pageNum" :total="pageObj.pageTotal" @on-change="pageChange"/>
    </div>
  </div>
</template>

<script>
import {getChildAreaBySuperId, getDictByDictName} from '@/utils/index.js'
export default {
  data(){
    return {
      childArea: [],
      projectOrgList: getDictByDictName('责任单位'),
      projectTypeList: getDictByDictName('建设方式'),
      progressStatusList: getDictByDictName('进度状态'),
      typeNameList: getDictByDictName('住房类型'),
      projectStatusList: getDictByDictName('项目状态'),
      projectChannelList: [],
      queryObj: {
        superAreaId: null,
        areaId: null,
        parcelArea: null,
        publicRealArea: null,
        publicRealNum: null,
        planYear: null,
        projectOrg: null,
        projectType: null,
        projectChannel: null,
        progressStatus: null,
        typeName: null,
        projectStatus: null,
        queryStr: null
      },
      pageObj: {
        pageNum: 1,
        pageSize: 50,
        pageTotal: null
      },
      cityList:[
        {label:"111",
        value:'111'}
      ],
      value: null ,
      columns: [
          {
              title: '项目ID',
              align: 'center',
              key: 'projectId',
              minWidth: 80,
          },
          {
              title: '项目名称',
              align: 'center',
              key: 'projectName',
              width: 300,
              tooltip: true,
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
                                    this.show(params.row)
                                }
                            }
                        }, params.row.projectName);
                }
          },
          {
              title: '所属区位',
              align: 'center',
              key: 'areaName',
              minWidth: 150
          },
          {
              title: '住房类型',
              align: 'center',
              key: 'typeNameStr',
              tooltip: true,
              minWidth: 220
          },
          {
              title: '实际总套数',
              align: 'center',
              key: 'publicRealNum',
              minWidth: 100
          },
          {
              title: '实际建筑面积',
              align: 'center',
              key: 'publicRealArea',
              minWidth: 100
          },
          {
              title: '纳入年份',
              align: 'center',
              key: 'planYear',
              minWidth: 100,
          },
          {
              title: '进度情况',
              align: 'center',
              key: 'progressStatus',
              minWidth: 100,
          },
          {
              title: '状态',
              align: 'center',
              key: 'projectStatus',
              minWidth: 100,
              sortable: true
          },
          {
            title: '删除',
            align: 'center',
            key: 'edit',
            slot: 'action',
            minWidth: 100,
          }
          
      ],
      tableData: []
    }
  },
  methods: {
    show (row) {
      this.$router.push({
        path: '/projectDetail',
        query: {
          projectId: row.projectId
        }
      })
    },
    changeArea (areaId) {
      this.childArea  = getChildAreaBySuperId(areaId);
    },
    downlaodExcel () {
      this.$axios.post('/project/download', {
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        orderBy: null,
        param: this.queryObj
      },{
        responseType: 'blob'
      })
      .then((resp) => {
        if(resp.status === 200){
          const content = resp.data;
          const blob = new Blob([content])
          const fileName = '项目.xlsx'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        }
      });
    },
    queryPorject () {
      this.$axios.post('/project/selectProjectList', {
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        orderBy: null,
        param: this.queryObj
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.tableData = resp.data.data;
          this.pageObj.pageTotal = resp.data.pageCount;
          this.tableData.forEach(item => {
            getDictByDictName('进度状态').forEach(dict => {
              if (item.progressStatus === dict.dictValue) {
                item.progressStatus = dict.dictItem;
              }
            })
            getDictByDictName('项目状态').forEach(dict => {
              if(item.projectStatus === dict.dictValue) {
                item.projectStatus = dict.dictItem;
              }
            })
          })
        }
      });
    },
    pageChange (page) {
      this.pageObj.pageNum = page;
      this.queryPorject();
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
    uploadSuccess (res) {
      this.$Notice.success({
          title: res.msg,
      });
      this.queryPorject();
    },
    uploadError () {
      this.$Notice.error({
          title: '上传失败',
      });
    },
    uploadExceed () {
      this.$Notice.error({
          title: '上传尺寸过大',
      });
    },
    formatError () {
      this.$Notice.error({
          title: '上传仅支持 xlsx 格式',
      });
    },
    remove (row) {
      this.$axios.post('/project/removeProjectById/'+ row.projectId)
      .then((resp) => {
        this.queryPorject();
        if(resp.data.code === 1){
          this.$Notice.success({
              title: '删除成功'
          });
        }
      });
    }
  },
  computed: {
    superArea () {
      return this.$store.getters.getSuperArea;
    },
    funcObj () {
      let obj = {};
      let list = this.$store.getters.getUserFunc;
      let a = list.filter(item => item.funcId == 1 ) ||[];
      let b = list.filter(item => item.funcId == 1 ) ||[];
      obj.func1 = a.length > 0;
      obj.func2 = b.length > 0;
      return obj
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
  created() {
    this.queryPorject();
  },
}
</script>

<style lang="less" scoped>
.project-container{
  padding: 0px 20px 20px 20px;
}
.project-select{
    font-size: 14px;
    color: #97a8b0;
    margin-top: 20px;
    padding: 0 20px 20px;
    background: #fff;
    // border: 1px solid #324251;
    border-radius: 4px;
    .select-title{
        width: 100px;
        color: #5A6C7E;
      }
    .select-box{
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid #D3D3D3;
      .select-list{
        flex: 1;
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 11.11%;
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
.table-content{
  padding: 20px 0 0;
  .table-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .table-left{
      display: flex;
      align-items: center;
      .table-title {
          font-size: 18px;
          font-weight: 700;
          color: #2B313C;
          margin-right: 20px;
      }
      .table-index{
          font-size: 12px;
          font-weight: 400;
          color: #BBBEC3;
          span{
            color: #fe6c6b;
          }
      }
    }
    .btn-table{
      display: flex;
    }
  }
}


</style>