<template>
	<div class="userlistWrapper">
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<h2>全部用户列表</h2>
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="48">
						<a-col>
							<a-radio-group @change="onSearchTypeChange"
								v-model="queryParam.targetType">
								<a-radio-button :value="1">全部用户</a-radio-button>
								<!-- <a-radio-button :value="2">VIP用户</a-radio-button> -->
								<!-- <a-radio-button :value="3">VIP订单管理</a-radio-button> -->
							</a-radio-group>
						</a-col>
					</a-row>
					<a-row :gutter="24"
						style="margin-top:30px;">
						<a-col :span="3">
							<a-form-item label="用户ID：">
								<a-input v-model="queryParam.userId"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="手机号：">
								<a-input v-model="queryParam.phoneNumber"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="行为: ">
								<a-select v-model="queryParam.actionType">
									<a-select-option :value="item.id"
										v-for="item in actionList"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="风险评估: ">
								<a-select v-model="queryParam.riskAssessment">
									<a-select-option :value="item.id"
										v-for="item in riskAssessmentList"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item label="注册时间: ">
								<a-range-picker @change="onDatePickChange"
									v-decorator="['dateRange']" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-button type="primary"
								@click="$refs.table.refresh(false)">查询</a-button>
							<a-button style="margin-left: 8px"
								@click="resetSearchForm">重置</a-button>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="mobile"
					slot-scope="text">
					{{handleTel(text)}}
				</span>
				<span slot="danger"
					slot-scope="text"
					style="color:blue;">
					{{text}}
				</span>
				<span slot="riskAssessment"
					slot-scope="text"
					:style="{color: text===2005?'#6e4be4':text===2006?'#3262f3':text===2007?'#fec401':text===2008?'#ff90fb':text===2009?'#ff4956':''}">
					{{text | riskAssessmentFilter}}
				</span>
				<span slot="registTime"
					slot-scope="text">
					{{handlePtime(text)}}
				</span>
				<span slot="operate"
					slot-scope="text,record"
					style="cursor:pointer;"
					@click="handleDetail(record)">
					详情
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getList } from '@/api/userlist'

const riskAssessmentList = [
  {
    id: 0,
    name: '请选择'
  },
  {
    id: 2005,
    name: '保守型'
  },
  {
    id: 2006,
    name: '稳健型'
  },
  {
    id: 2007,
    name: '平衡型'
  },
  {
    id: 2008,
    name: '进取型'
  },
  {
    id: 2009,
    name: '激进型'
  }
]
const actionList = [
  {
    id: 0,
    name: '请选择'
  },
  {
    id: 1,
    name: '记账'
  },
  {
    id: 2,
    name: '顾问帮填'
  },
  {
    id: 3,
    name: '保单管理'
  }
]
export default {
  name: 'userlist',
  components: {
    STable
  },
  data () {
    return {
      actionList,
      riskAssessmentList,
      form: this.$form.createForm(this),
      queryParam: {
        startPage: 1,
        pageSize: 10,
        userId: '',
        phoneNumber: '',
        actionType: 0,
        riskAssessment: 0,
        startTime: '',
        endTime: '',
        targetType: 1
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' },
          align: 'center'
        },
        {
          title: '用户ID',
          dataIndex: 'userId',
          align: 'center'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          scopedSlots: { customRender: 'mobile' },
          align: 'center'
        },
        // {
        //   title: '用户姓名',
        //   dataIndex: 'nickName',
        //   align: 'center'
        // },
        {
          title: '邀请码填写',
          dataIndex: 'shareCode',
          align: 'center'
        },
        {
          title: '记账笔数',
          dataIndex: 'bookAmount',
          align: 'center'
        },
        {
          title: '顾问帮填',
          align: 'center',
          dataIndex: 'adviserFilled'
        },
        {
          title: '保单管理',
          dataIndex: 'policyManagement',
          align: 'center'
        },
        {
          title: '风险评估',
          dataIndex: 'riskAssessment',
          align: 'center',
          scopedSlots: { customRender: 'riskAssessment' }
        },
        {
          title: '用户注册时间',
          dataIndex: 'registTime',
          scopedSlots: { customRender: 'registTime' },
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) =>
          (this.queryParam.pageSize = pageSize),
        onChange: page => (this.queryParam.startPage = page),
        showQuickJumper: true
      },
      loadData: () => {
        return getList(this.queryParam).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.pageNum > res.data.navigateLastPage) {
              this.queryParam.startPage = res.data.navigateLastPage
            }
            res.data.data = res.data.list
            res.data.pageNo = res.data.pageNum
            res.data.totalPage = res.data.pages
            res.data.totalCount = res.data.total

            delete res.data.list
            delete res.data.pageNum
            delete res.data.pages
            delete res.data.total

            return res.data
          } else {
            res.data = {}
            res.data.data = []
            res.data.pageNo = 0
            res.data.totalPage = 0
            res.data.totalCount = 0
            return res.data
          }
        })
      }
    }
  },
  methods: {
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        userId: '',
        phoneNumber: '',
        actionType: 0,
        riskAssessment: 0,
        startTime: '',
        endTime: '',
        targetType: 1
      }

      this.resetDatePicker()
      this.$refs.table.refresh(true)
    },
    // 改变类型
    onSearchTypeChange () {
      this.$refs.table.refresh(true)
    },
    // 改变日期
    onDatePickChange (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    handleTel (tel) {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return tel.replace(reg, '$1****$2')
    },
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    // 重置时间
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    // 去往详情
    handleDetail (record) {
      this.$router.push({
        path: '/userlist/detail',
        query: {
          id: record.userId
        }
      })
    }
  },
  filters: {
    // 类型
    riskAssessmentFilter (code) {
      switch (code) {
        case 2005:
          return '保守型'
        case 2006:
          return '稳健型'
        case 2007:
          return '平衡型'
        case 2008:
          return '进取型'
        case 2009:
          return '激进型'
        case -1:
          return '未评测'
        default:
          return '未评测'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
	h2 {
		font-weight: bold;
	}
}
</style>
