<template>
  <div class="operation-container">
    <div class="select-box">
      <div class="select-item">
        <Select v-model="requestObj.userId" clearable style="width:280px" placeholder="选择操作账户">
          <Option v-for="item in userList" :value="item.userId" :key="item.userId">{{ item.userName }}</Option>
        </Select>
      </div>
      <div class="select-item">
        <DatePicker v-model="requestObj.dateObj" clearable format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="操作起止时间" style="width: 300px"></DatePicker>
      </div>
      <div class="select-item">
        <Input v-model="requestObj.projectName" clearable placeholder="请输入项目名称" style="width: 280px" />
      </div>
      <Button type="primary" @click="logData" style="margin-right: 5px">确定</Button>
    </div>
    <div class="table-box">
      <div class="title">
        <div class="h1-title">操作列表</div>
        <div class="index-end">检索结果<span>50</span>条</div>
      </div>
    </div>
    <Table stripe  :columns="columns" :data="tableList"></Table>
  </div>
</template>

<script>
import { getDictByDictName } from '@/utils/index.js'
import dayjs from 'dayjs'
export default {
   data(){
     return {
       startDate:'',
       projectItem:'',
       columns: [
          {
              title: '操作时间',
              key: 'dateStr'
          },
          {
              title: '操作账户',
              key: 'userName'
          },
          {
              title: '类别',
              key: 'logType',
              render: (h,params) => {
                let opList = getDictByDictName("系统操作类型");
                let show = '';
                opList.forEach(dict => {
                  if (dict.dictValue === params.row.logType) {
                    show = dict.dictItem;
                  }
                })
                return h('div',{}, show)
              },
          },
          {
              title: '项目名称',
              key: 'projectName'
          },
          {
              title: '相关模板',
              key: 'modualName'
          }
      ],
      tableList: [],
      userList: [],
      requestObj: {},
      paramObj:{
        orderBy: null,
        pageNum: 1,
        pageSize: 50,
      }
     }
   },
   mounted(){
     this.logData();
     this.initUser();
   },
   methods:{
     logData () { 
      if (this.requestObj.dateObj[0]) {
        this.requestObj.startDate = parseInt(dayjs(this.requestObj.dateObj[0]).format("YYYYMMDD")) ;
      }
      if (this.requestObj.dateObj[1]) {
        this.requestObj.endDate = parseInt(dayjs(this.requestObj.dateObj[1]).format("YYYYMMDD")) ;
      }
      
      this.$axios.post('/system/getOporationLogs', {
        param: this.requestObj,
        ...this.paramObj
      })
      .then((resp) => {
        if(resp.data.code === 1){
          if (resp.data.data) {
            this.tableList = resp.data.data
          }
        }
      });
    },
    initUser () { 
      this.$axios.post('/system/getAllUser',)
      .then((resp) => {
        if(resp.data.code === 1){
          this.userList = resp.data.data
        }
      });
    }
   }
}
</script>

<style lang="less" scoped>
  .operation-container{
    padding: 0 20px;
    .select-box{
      font-size: 14px;
      color: #97a8b0;
      margin-top: 20px;
      padding: 20px;
      background: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #fff;
      .select-item{
        margin-right: 20px;
      }
    }
  }
  .table-box{
    margin: 20px 0;
    .title{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 20px;
      .h1-title {
        font-size: 18px;
        font-weight: 700;
        color: #d1deed;
        margin-right: 20px;
      }
      .index-end{
        font-size: 12px;
        color: #8ba2b9;
        span{
          color: #fe6c6b;
        }
      }
    }
  }
</style>