<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户id: ">
              <a-input v-model="queryParam.id" placeholder="请输入用户id"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
           <a-col :md="12" :sm="24">
             <a-form-item label="服务类别: ">
              <el-checkbox-group v-model="checkboxGroup1" size="small">
                <el-checkbox-button v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox-button>
              </el-checkbox-group>
             </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="更新日期">
             <a-range-picker @change="onChange" v-model="queryParam.date"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
           <a-col :md="14" :sm="24">
             <a-form-item label="系统状态: ">
              <el-checkbox-group v-model="checkboxGroup2" size="small">
                <el-checkbox-button v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox-button>
              </el-checkbox-group>
             </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator" style="margin-bottom:50px">
      <span class="table-page-search-submitButtons" :style="{ float: 'left', overflow: 'hidden' } || {} ">
      <a-button type="primary" @click="query()">查询</a-button>
      <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
      </span>
      <span style="float:right">
        <a-button type="primary" @click="handleEdit()">操作</a-button>
      </span>
    </div>
      <a-table :columns="columns" :dataSource="data" bordered  ref="table"  :customRow="click" :rowClassName="changeclassname" :pagination="false">
        <span slot="userid" slot-scope="text" href="javascript:;" >{{text}}</span>
        <span slot="customTitle"> 用户id</span>
      </a-table>
      <a-pagination showQuickJumper :defaultCurrent="2" :total="14" @change="pageChange" style="margin-top:20px"/>
    <!-- 这个不可以删除  是用来展示模态框的 -->
    <BookTest ref="modal" @ok="handleOk"/>
  </a-card>

</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import BookTest from './modules/BookTest'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'

const cityOptions1 = ['全部', '体检预约', '咨询服务'];
const cityOptions2 = ['全部', '已服务', '未服务', '信息有误']
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    BookTest
  },
  data () {
    return {
      currentRowIndex:'',
      checkboxGroup1: ['全部'],
      checkboxGroup2: ['全部'],
      cities1: cityOptions1,
      cities2: cityOptions2,
      mdl: {},
      // 查询参数
      queryParam: {
        
      },
      // 表头
      columns:[
        {
          dataIndex: 'userid',
          key: 'userid',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'userid' },
        }, 
        {
          title: '用户昵称',
          dataIndex: 'username',
          key: 'username',
        }, 
        {
          title: '联系方式',
          dataIndex: 'phone',
          key: 'phone',
        }, 
        {
          title: '服务类别',
          key: 'type',
          dataIndex: 'type',
        }, 
        {
          title: '问题描述',
          key: 'des',
          dataIndex: 'des',
        }, 
        {
          title: '最后提交时间',
          key: 'lasttime',
          dataIndex: 'lasttime',
        }, 
        {
          title: '反馈信息',
          key: 'message',
          dataIndex: 'message',
        }, 
        {
          title: '反馈人',
          key: 'person',
          dataIndex: 'person',
        }, 
        {
          title: '服务状态',
          key: 'systemstatus',
          dataIndex: 'systemstatus',
        }, 
      ],
      data:[
        {
          key: '1',
          userid:'111',
          username: 'John Brown',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        }, 
        {
          key: '2',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '3',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '4',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '5',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '6',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '7',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '8',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '9',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '10',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '11',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '12',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
        {
          key: '13',
          userid:'222',
          username: 'John Brown66',
          phone: '12345678912',
          type: '体检预约',
          des: '没问题',
          lasttime: '2019-07-20 9:20',
          message: '材料不全',
          person: '小明',
          systemstatus: '已服务',
        },
      ]
    }
  },
  filters: {
  },
  created () {
   
  },
  methods: {
    // 分页
    pageChange(pageNumber) {
    console.log('Page: ', pageNumber);
    },
    // 点击当前行
    click(record, index){
        return {
            on: {
               click: () => {
                    console.log('点击当前行的index',index)
                    this.currentRowIndex = index
               }
            }
        }
    },
    // 点击当前行使其高亮
    changeclassname(record, index){
      /* console.log('changeclassname1',index)
      console.log('changeclassname2',this.currentRowIndex); */
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 改变时间
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    
    // 查询
    query(){
      console.log('查询数据',this.queryParam);
      console.log('checkboxGroup1',this.checkboxGroup1);
      console.log('checkboxGroup2',this.checkboxGroup2);
    },

    handleOk () {
      //this.$refs.table.refresh()
    },

    // 操作
    handleEdit () {
      console.log('this.refs',this.$refs)
      this.$refs.modal.edit()
    },
    /* onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }, */

    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  },
}
</script>
<style lang="less">
 .active {
   background-color: rgba(42, 130, 228, 0.3);
 }
</style>

