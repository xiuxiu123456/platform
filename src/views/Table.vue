<template>
  <div>
    表格的运用
    <ktable :tableObj="tableObj"></ktable>
  </div>
</template>

<script>
import ktable from '../components/ktable.vue'
export default {
  components: {
    ktable
  },
  data() {
    return {
      tableObj: {
        url: '',
        req: {
          col: 5,
          showLabel: true,
          labelWidth: 80,
          items: [
            {label: 'Name', key:'name', form: 'Input'},
            {label: 'Sex', key:'sex', form: 'Select', options:[{name:'男', value:'1'},{name:'女', value:'0'}]},
            {label: 'Birthday', key:'birthday', form: 'Date'}
          ]
        },
        btn: {
          col: 4,
          showDefault: true,
          buttons: [

          ]
        },
        tools: [
          {
            toolName: '新增',
            toolFunc: () => {
              console.log("ssssss")
            }
          }
        ],
        columns: [
          {title: 'Name',key: 'name'},
          {title: 'Age',key: 'age'},
          {title: 'Sex',key: 'sex'},
          {title: 'Address',key: 'address'},
          {title: 'Phone',key: 'phone'},
          {title: 'Birthday', key:'birthday'}
        ],
        data: [
          {name: 'harden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'harden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'harden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'harden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'lucy', age: '28', sex: '女', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jack', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'jonden', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'},
          {name: 'alex', age: '28', sex: '男', address: '广东省深圳市', phone: '12345678901', birthday:'1900-01-01'}
        ]
      }
    }
  },
}
</script>

<style>

</style>