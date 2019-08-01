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
        <span slot="action" slot-scope="text, record">
          <span  v-if="record.color == 1 " style="margin-right:10px">表格文件</span>
          <span >证明文件</span>
        </span>
      </a-table>
      <a-pagination showQuickJumper :defaultCurrent="pageNum" :total="12" @change="pageChange" style="margin-top:20px"/>
    <!-- 这个不可以删除  是用来展示模态框的 -->
    <StepByStepModal ref="modal" @ok="handleOk"/>
  </a-card>

</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'
import {getAllList} from '@/api/customer'


const cityOptions1 = ['全部', '保单服务', '理赔服务', '信息修改'];
const cityOptions2 = ['全部', '上传中', '审批中', '审批通过', '审批退回']
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    return {
      currentRowIndex:'',
      checkboxGroup1: ['全部'],
      checkboxGroup2: ['全部'],
      cities1: cityOptions1,
      cities2: cityOptions2,
      mdl: {},
      // 查询参数 => 用于重置/获取用户id
      queryParam: {},
      // 选中的时间
      time:'',
      // 服务类别
      type:'',
      // 系统状态
      systemstatus:'',
      // 
      pageNum:1,
      //
      pageSize:'10',
      // 
      total : '',


      // 表头
      columns:[
        {
          dataIndex: 'userId',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'userId' },
        }, 
        {
          title: '用户昵称',
          dataIndex: 'username',
        }, 
        {
          title: '邮箱地址',
          dataIndex: 'emailAddress',
        }, 
        {
          title: '服务类别',
          dataIndex: 'titleName',
        }, 
        {
          title: '服务类别二级',
          dataIndex: 'twotype',
        }, 
        {
          title: '最后提交时间',
          dataIndex: 'dateOfLatestSubmission',
        }, 
        {
          title: '反馈信息',
          dataIndex: 'remark',
        }, 
        {
          title: '审核人',
          dataIndex: 'person',
        }, 
        {
          title: '系统状态',
          dataIndex: 'systems',
        }, 
        
        {
          title: '用户上传资料',
          key: 'userinfo',
          scopedSlots: { customRender: 'action' },
        }
      ],
      data:[],

    }
  },
  created () {
    getAllList().then( res => {
      console.log('res', res)
      this.data = res.data.list
      this.total = res.data.total
      this.pageNum = res.data.pageNum - 0 

    })
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
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 改变时间
    onChange(date, dateString) {
      console.log(date, dateString);
      this.time = dateString
    },
    
    // 查询
    query(){
      /* console.log('查询数据',this.queryParam)
      console.log('checkboxGroup1',this.checkboxGroup1)
      console.log('checkboxGroup2',this.checkboxGroup2) */
      this.type = this.checkboxGroup1
      this.systemstatus = this.checkboxGroup2
      let data ={
        id : this.queryParam.id,
        data : this.time,
        type : this.type,
        systemstatus : this.systemstatus
      }
      console.log('data',data);
      

    },

    handleOk () {
      //this.$refs.table.refresh()
    },

    // 启用模态框
    handleEdit () {
      console.log('this.refs',this.$refs)
      this.$refs.modal.edit()
    },
   
  },
}
</script>
<style lang="less">
 .active {
   background-color: rgba(42, 130, 228, 0.3);
 }
 .excel {
   display: inline-block;
   width: 60px;
   height: 30px;
   background-color: #ccc;
   line-height: 30px;


 }
</style>

