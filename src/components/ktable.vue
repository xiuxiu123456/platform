<template>
  <div class="table">
    <Row v-if="tableObj.req">
      <Form :model="queryForm" :label-width="80">
        <Col :span="tableObj.req.col" v-for="(item,index) in tableObj.req.items" class="query-from" :key="index">
          <FormItem :label="item.label + `:`" >
            <Input v-model="queryForm[item.key]" :placeholder="item.label" v-if="item.form === 'Input'"></Input>
            <Select v-model="queryForm[item.key]" :placeholder="item.label" v-if="item.form === 'Select'">
              <Option v-for="(opt,i) in item.options" :value="opt.value" :key="i" >{{opt.name}}</Option>
            </Select>
            <DatePicker v-model="queryForm[item.key]" v-if="item.form === 'Date'" type="date"  :placeholder="item.label" style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
        <Col :span="tableObj.btn.col" class="table-col">
          <Button type="info" class="table-btn" @click="refresh">刷新</Button>
          <Button type="primary" class="table-btn" @click="query">查询</Button>
        </Col>
      </Form>
    </Row>
    <div class="table-tools">
      <Button type="primary" class="table-btn" @click="query">新增</Button>
      <Button type="primary" class="table-btn" @click="query">修改</Button>
      <Button type="error" class="table-btn" @click="query">删除</Button>
    </div>
    <div>
      <Table :height="tableHeight" stripe :columns="tableObj.columns" :data="tableObj.data"></Table>
    </div>
    
    <div ref="tableref" class="page-box">
      <Page 
        :total="tableObj.data.length" 
        :show-total= true	 
        :current= "pageObj.pageNum"
        :page-size="pageObj.pageSize" 
        show-elevator 
        show-sizer 
        :page-size-opts = [10,20,30,50,100]
        @on-change="pageChange" 
        @on-page-size-change="pageSizeChange"/>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    tableObj: Object
  },
  data() {
    return {
      queryForm:{},
      pageObj: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    refresh(){
      this.queryForm = {}
    },
    pageChange (num) {
      this.pageObj.pageNum = num;
    },
    pageSizeChange (size) {
      this.pageObj.pageSize = size;
    },
    query(){

    }
  },
  computed: {
    tableHeight: () => `${document.documentElement.clientHeight- 220}px`,
  },
}
</script>

<style lang="less">
.table-tools{
  margin: 10px 10px 10px 10px;
}
.query-from{
  height: 34px;
}
.page-box{
  text-align: right;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
}
.table{
  margin: 5px 5px 5px 5px;
}
.table-col{
  padding-left: 10px;
}
.table-btn{
  margin: 0px 5px 0px 5px;
}
.table .ivu-table td{
  background: #263643;
  border: none;
}
.table .ivu-table th{
  border: none;
}
</style>