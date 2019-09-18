<template>
	<div class="userlistWrapper">
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="48">
						<a-col>
							<a-radio-group @change="onSearchTypeChange"
								v-model="queryParam.targetType">
								<a-radio-button :value="1">全部用户</a-radio-button>
								<a-radio-button :value="2">VIP用户</a-radio-button>
								<a-radio-button :value="3">VIP订单管理</a-radio-button>
							</a-radio-group>
						</a-col>
					</a-row>
					<a-row :gutter="48"
						style="margin-top:30px;">
						<a-col :span="4">
							<a-form-item label="用户ID：">
								<a-input v-model="queryParam.userid"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="手机号：">
								<a-input v-model="queryParam.mobile"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="行为: ">
								<a-select v-model="queryParam.action">
									<a-select-option :value="item.id"
										v-for="item in actionList"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="风险评估: ">
								<a-select v-model="queryParam.topCategory">
									<a-select-option :value="item.id"
										v-for="item in topCategoryList"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item label="最后推送时间: ">
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
				<span slot="danger"
					slot-scope="text"
					style="color:blue;">
					{{text}}
				</span>
				<span slot="operate"
					slot-scope="text,record"
					@click="handleDetail(record)">
					详情
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import { STable } from '@/components'
import { getList } from '@/api/userlist'

const dayRange = [
  {
    id: 1,
    name: '30天'
  },
  {
    id: 3,
    name: '90天'
  },
  {
    id: 6,
    name: '180天'
  }
]
export default {
  name: 'userlist',
  components: {
    STable
  },
  data () {
    return {
      actionList: dayRange,
      topCategoryList: dayRange,
      form: this.$form.createForm(this),
      queryParam: {
        startPage: 1,
        pageSize: 5,
        userid: '',
        mobile: '',
        action: 1,
        topCategory: 1,
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
          dataIndex: 'administratorName',
          align: 'center'
        },
        {
          title: '手机号',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '用户姓名',
          dataIndex: 'bill',
          align: 'center'
        },
        {
          title: '邀请码填写',
          dataIndex: 'managerFollower',
          align: 'center'
        },
        {
          title: '记账笔数',
          dataIndex: 'productFollower',
          align: 'center'
        },
        {
          title: '顾问帮填',
          align: 'center',
          dataIndex: 'selfWarning',
          scopedSlots: { customRender: 'self' }
        },
        {
          title: '保单管理',
          align: 'center',
          dataIndex: 'surroundingWarning'
        },
        {
          title: '风险评估',
          dataIndex: 'topCategory',
          align: 'center',
          scopedSlots: { customRender: 'danger' }
        },
        {
          title: '用户注册时间',
          dataIndex: 'latestPushTime',
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
        let param = {
          startPage: 1,
          pageSize: 10,
          keyword: '',
          periodType: 1,
          targetType: '' || 1,
          startTime: '',
          endTime: '',
          column: 1,
          startNum: 0,
          endNum: 10000
        }
        return getList(param).then(res => {
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
        pageSize: 5,
        userid: '',
        mobile: '',
        action: 1,
        topCategory: 1,
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
          id: record.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
