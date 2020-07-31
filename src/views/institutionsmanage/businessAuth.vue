<template>
	<div class="businessAuthWrapper">
		<h2>机构管理 - 企业认证申请</h2>
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
						<a-col :span="6">
							<a-form-item label="申请时间：">
								<a-range-picker @change="onDatePickChange"
									v-decorator="['dateRange']" />
							</a-form-item>
						</a-col>
						<a-col :span="2">
							<a-form-item>
								<a-select v-model="queryParam.sort">
									<a-select-option v-for="item in sortList"
										:value="item.id"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="成交归属：">
								<a-select v-model="queryParam.ownership">
									<a-select-option v-for="item in belongNameList"
										:value="item"
										:key="item">
										{{item}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="企业状态： ">
								<a-select v-model="queryParam.companyStatus">
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
				<span slot="companyStatus"
					slot-scope="text"
					:style="{color:Number(text)===0?'#000':Number(text)===1?'#000':Number(text)===2?'green':'red'}">
					{{Number(text)===0?'未认证':Number(text)===1?'认证中':Number(text)===2?'已认证':'已过期'}}
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
import { STable } from '@/components'
import {
  companyCertificationMultipleConditional,
  showOwnership
} from '@/api/businessAuth'

const actionList = [
  {
    id: 9,
    name: '请选择'
  },
  {
    id: 0,
    name: '未认证'
  },
  {
    id: 1,
    name: '认证中'
  },
  {
    id: 2,
    name: '已认证'
  },
  {
    id: 3,
    name: '已过期'
  }
]
const belongNameList = ['请选择', '未成交']
const sortList = [
  {
    id: 9,
    name: '排序'
  },
  {
    id: 1,
    name: '申请时间升序'
  },
  {
    id: 2,
    name: '申请时间降序'
  }
]

export default {
  name: 'businessAuth',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      actionList,
      belongNameList,
      sortList,
      queryParam: {
        startPage: 1,
        pageSize: 10,
        companyName: '',
        queryTimeBegin: '',
        queryTimeEnd: '',
        sort: 9,
        ownership: '请选择',
        companyStatus: 9
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
          dataIndex: 'companyStyle',
          align: 'center'
        },
        {
          title: '成交归属',
          dataIndex: 'ownership',
          align: 'center'
        },
        {
          title: '企业状态',
          dataIndex: 'companyStatus',
          align: 'center',
          scopedSlots: { customRender: 'companyStatus' }
        },
        {
          title: '申请时间',
          align: 'center',
          dataIndex: 'applicationTime'
        },
        {
          title: '最后更新时间',
          align: 'center',
          dataIndex: 'lastUpdateTime'
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
          ...this.queryParam,
          ownership:
						this.queryParam.ownership === '请选择'
						  ? ''
						  : this.queryParam.ownership
        }
        return companyCertificationMultipleConditional(param).then(res => {
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
  created () {
    this.getCreateResources()
  },
  methods: {
    async getCreateResources () {
      try {
        const { code, data, msg } = await showOwnership()
        if (code === 200) {
          this.belongNameList = [...this.belongNameList, ...data]
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        companyName: '',
        queryTimeBegin: '',
        queryTimeEnd: '',
        sort: 9,
        ownership: '请选择',
        companyStatus: 9
      }
      this.resetDatePicker()
      this.$refs.table.refresh(true)
    },
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    // 改变时间
    onDatePickChange (date, dateString) {
      this.queryParam.queryTimeBegin = dateString[0]
      this.queryParam.queryTimeEnd = dateString[1]
    },
    handleOperate (record) {
      const { companyUrl, companyName, companyStatus, companyStyle } = record
      this.$router.push({
        name: 'businessAuthList',
        query: {
          companyUrl,
          companyName,
          companyStatus,
          companyStyle
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'businessAuthTicket'
      })
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
