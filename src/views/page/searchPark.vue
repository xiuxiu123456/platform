<template>
  <div class="vil-container">
    <div class="select-box">
      <!-- <div class="select-title">目标搜索：</div> -->
      <div class="select-item">
        <Select v-model="queryObj.superAreaId" clearable placeholder="所属区域" @on-change="changeArea" style="width: 200px">
          <Option v-for="item in superArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
        </Select>
      </div>
      <div class="select-item">
        <Select v-model="queryObj.areaId" clearable placeholder="所属街道" style="width: 200px">
          <Option v-for="item in childArea" :value="item.areaId" :key="item.areaId">{{ item.areaName }}</Option>
        </Select>
      </div>
      <div class="select-item">
        <Input v-model="queryObj.parkUse" clearable placeholder="园区用途" style="width: 200px" />
      </div>
      <!-- <div class="select-item">
        <Input v-model="queryObj.villageNum" clearable placeholder="总栋数" style="width: 200px" />
      </div> -->
      <div class="select-item">
        <Input v-model="queryObj.str" clearable placeholder="输入项目名称/输入项目ID" style="width: 330px" />
      </div>
      <Button type="primary" @click="initTableData" style="margin-right: 5px">确定</Button>
    </div>
    <div class="table-content">
      <div class="table-top">
        <div class="table-left">
          <div class="table-title">项目列表</div>
          <div class="table-index">检索结果<span>{{pageObj.pageTotal}}</span>条</div>
        </div>
        <div class="btn-table">
          <!-- <Button type="primary" class="btn-primary" style="margin-right: 10px;">
            新建项目
          </Button> -->
          <Upload action="/park/upload" 
            :on-success="uploadSuccess" 
            :on-error="uploadError" 
            :on-exceeded-size="uploadExceed"
            :max-size="1048576" 
            :format="['xlsx']"
            :on-format-error="formatError"
            :show-upload-list="false" 
            v-show="funcObj.func10"
            style="margin-right: 10px;">
              <Button type="primary" icon="ios-cloud-upload-outline">新增项目</Button>
          </Upload>
          <Button type="warning" class="btn-primary" v-show="funcObj.func11">
           <a href="/park/download" download="产业园导入模板.xlsx"> <Icon type="ios-download-outline" />下载模板 </a>
          </Button>
        </div>
      </div>
    </div>
    <Table stripe  :columns="columns" :data="tableData">
      <div slot-scope="{ row }" slot="action">
        <Icon type="md-trash" @click="remove(row)"  style="color:red; cursor: pointer;font-size: 20px;"/>
      </div>
    </Table>
    <div style="text-align:center; margin:30px 0px 30px 0px">
      <Page :page-size="pageObj.pageSize" :current="pageObj.pageNum" :total="pageObj.pageTotal" @on-change="pageChange"/>
    </div>
  </div>
</template>

<script>
import {getChildAreaBySuperId, getChildArea, getSuperAraeByChildId} from '@/utils/index.js'
export default {
  data(){
    return {
      requestObj:{
        add:'',
        useInfo:'',
        projectName:'sasdf'
      },
      childArea: [],
      pageObj: {
        pageNum: 1,
        pageSize: 50,
        pageTotal: null
      },
      columns: [
          {
              title: '项目ID',
              align: 'center',
              key: 'parkId',
              minWidth: 80,
          },
          {
              title: '产业园区名称',
              align: 'center',
              key: 'parkName',
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
                        }, params.row.parkName);
                }
          },
          {
              title: '所属区位',
              align: 'center',
              key: 'areaId',
              minWidth: 150,
              render: (h, params) => {
                let cname = getChildArea(params.row.areaId).areaName;
                let sname = getSuperAraeByChildId(params.row.areaId).areaName;
                let name = sname +"/" +cname 
                return h('span', {}, name);
              }
          },
          {
              title: '园区用途',
              align: 'center',
              key: 'parkUse',
              minWidth: 220
          },
          {
              title: '占地面积（m2）',
              align: 'center',
              key: 'parkArea',
              minWidth: 100
          },
          {
              title: '总建筑面积（m2）',
              align: 'center',
              key: 'buildArea',
              minWidth: 100
          },
          {
              title: '首层平均租金(元/m2/月)',
              align: 'center',
              key: 'firstRent',
              minWidth: 100,
          },
          {
              title: '非首层平均租金(元/m2/月)',
              align: 'center',
              key: 'nonfirstRent',
              minWidth: 100,
          },
          {
            title: '删除',
            align: 'center',
            key: 'edit',
            slot: 'action',
            minWidth: 100,
          }
          
      ],
      tableData:[],
      queryObj: {}
    }
  },
  methods:{
    initTableData () {
      this.$axios.post('/park/query', {
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        orderBy: null,
        param: this.queryObj
      })
      .then((resp) => {
        if(resp.data.code === 1){
          this.tableData = resp.data.data;
          this.pageObj.pageTotal = resp.data.pageCount;
        }
      });
    },
    changeArea (areaId) {
      this.childArea  = getChildAreaBySuperId(areaId);
    },
    showDetail(row){
      this.$router.push({
        path: '/parkDetail',
        query: {
          parkId: row.parkId
        }
      })
    },
    uploadSuccess (res) {
      this.$Notice.success({
          title: res.msg,
      });
      this.initTableData();
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
    pageChange (page) {
      this.pageObj.pageNum = page;
      this.initTableData();
    },
    remove (row) {
      this.$axios.post('/park/remove/'+ row.parkId)
      .then((resp) => {
        this.initTableData();
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
      let a = list.filter(item => item.funcId == 10 ) ||[];
      let b = list.filter(item => item.funcId == 11 ) ||[];
      obj.func10 = a.length > 0;
      obj.func11 = b.length > 0;
      return obj
    }
  },
  created() {
    this.initTableData();
  },
}
</script>

<style lang="less" scoped>
a{
  color: #fff;
  &:hover{
    color: #fff;
  }
}
.vil-container{
  padding: 0 20px;
  .select-box{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #97a8b0;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    .select-title{
      width: 100px;
    }
  }
  .select-item{
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