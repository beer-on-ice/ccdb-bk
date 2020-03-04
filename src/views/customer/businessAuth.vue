<template>
	<div class="businessAuthWrapper">
		<h2>企业认证申请</h2>
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="24"
						style="margin-top:30px;">
						<a-col :span="3">
							<a-form-item label="企业名称：">
								<a-input v-model="queryParam.companyName"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="申请时间：">
								<a-range-picker @change="onDatePickChange" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="成交归属：">
								<a-select v-model="queryParam.belongName">
									<a-select-option v-for="item in belongNameList"
										:value="item.id"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="企业状态： ">
								<a-select v-model="queryParam.examineState">
									<a-select-option v-for="item in actionList"
										:value="item.id"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
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
			<a-button type="primary"
				@click="handleAdd">新建</a-button>
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
				<span slot="type"
					slot-scope="text">
					{{text | typeFilter}}
				</span>
				<span slot="examineState"
					slot-scope="text"
					:style="{color: Number(text)===1?'#ff4956':'#3262f3'}">
					{{Number(text)===1?'未处理':'已处理'}}
				</span>
				<span slot="createTime"
					slot-scope="text">
					{{_handlePtime(text)}}
				</span>
				<span slot="lastUpdateTime"
					slot-scope="text">
					{{_handlePtime(text)}}
				</span>
				<span slot="operate"
					slot-scope="text,record"
					style="cursor:pointer;">
					<a-button type="primary"
						@click="handleOperate(record)"
						style="margin-right:10px;">操作</a-button>
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { list } from '@/api/businessAuth'

const actionList = [
  {
    id: 0,
    name: '请选择'
  },
  {
    id: 1,
    name: '未认证'
  },
  {
    id: 2,
    name: '认证中'
  },
  {
    id: 3,
    name: '已认证'
  },
  {
    id: 4,
    name: '已过期'
  }
]
const belongNameList = [
  {
    id: 0,
    name: '请选择'
  },
  {
    id: 1,
    name: '未成交'
  },
  {
    id: 2,
    name: '成交人'
  }
]
export default {
  name: 'businessAuth',
  components: {
    STable
  },
  data () {
    return {
      actionList,
      belongNameList,
      form: this.$form.createForm(this),
      queryParam: {
        startPage: 1,
        pageSize: 10,
        start: undefined,
        end: undefined,
        examineState: 0,
        belongName: 0,
        companyName: ''
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' },
          align: 'center'
        },
        {
          title: '企业名称',
          dataIndex: 'companyName',
          align: 'center'
        },
        {
          title: '企业类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' },
          align: 'center'
        },
        {
          title: '成交归属',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '企业状态',
          dataIndex: 'occupation',
          align: 'center'
        },
        {
          title: '申请时间',
          align: 'center',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: '最后更新时间',
          align: 'center',
          dataIndex: 'lastUpdateTime',
          scopedSlots: { customRender: 'lastUpdateTime' }
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
        return list(this.queryParam).then(res => {
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
    _handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:MM:SS')
    },
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        examineState: 0,
        belongName: 0,
        companyName: '',
        start: undefined,
        end: undefined
      }

      this.$refs.table.refresh(true)
    },
    // 改变时间
    onDatePickChange (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    handleOperate (record) {
      this.$router.push({
        name: 'businessAuthBeg',
        params: {
          info: JSON.stringify(record)
        }
      })
    },
    // 去往详情
    handleDetail (record) {
      this.$router.push({
        name: 'businessAuthCheck',
        params: {
          info: JSON.stringify(record)
        }
      })
    },
    handleAdd () {}
  },
  filters: {
    // 类型
    typeFilter (code) {
      switch (Number(code)) {
        case 1:
          return '基金'
        case 2:
          return '信托'
        case 3:
          return '基金且信托'
        case 4:
          return '银行'
        case 5:
          return '保险'
        case 6:
          return '基金且银行'
        case 7:
          return '基金且保险'
        default:
          return '未知'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.businessAuthWrapper {
	h2 {
		font-weight: bold;
	}
}
</style>
