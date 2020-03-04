<template>
	<div class="businessAuthListWrapper">
		<h2>申请列表</h2>
		<div class="nameWrapper">
			<h3>诺亚财富（中国）投资管理有限公司</h3>
			<a-button ghost
				disabled>未认证</a-button>
		</div>
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="24"
						style="margin-top:30px;">
						<a-col :span="3">
							<a-form-item label="联系人姓名：">
								<a-input v-model="queryParam.companyName"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="联系人电话：">
								<a-input v-model="queryParam.phone"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="创建来源：">
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
						<a-col :span="3">
							<a-form-item label="工单状态： ">
								<a-select v-model="queryParam.examineState">
									<a-select-option v-for="item in ticketList"
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
			<div style="display:flex;justify-content:space-between;">
				<a-button type="primary"
					@click="handleBack">返回</a-button>
				<a-button type="primary"
					@click="handleBatchFenPei">批量分配</a-button>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				:rowSelection="rowSelection"
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
						style="margin-right:10px;background:rgb(67, 207, 124);color:#fff;">处理</a-button>
					<a-button type="primary"
						@click="handleOperate(record)"
						style="margin-right:10px;background:rgb(42, 130, 228);color:#fff;">分配</a-button>
					<a-button type="primary"
						@click="handleOperate(record)"
						style="margin-right:10px;background:rgb(255, 141, 26);color:#fff;">认证</a-button>
					<a-button type="primary"
						@click="handleOperate(record)"
						style="background:rgb(166, 166, 166);color:#fff;">设置</a-button>
				</span>
			</s-table>
		</a-card>
		<auth-modal :modalInfo="modalInfo"
			@modalSubmit="modalSubmit"
			@modalCancel="modalCancel">
			<template v-if="modalInfo.isFenpei&&modalInfo.isBatch">
				<p>
					企业名称：
					<span>
						诺亚财富（中国）投资管理有限公司
					</span>
				</p>
				<div style="margin-top:10px;">
					<span>{{modalInfo.subTitle}}</span>
					<a-select mode="multiple"
						style="width: 40%"
						labelInValue
						:value="searchKey"
						placeholder="搜索员工姓名或关键字"
						:filterOption="false"
						@search="fetchUser"
						@change="handleSearchDataChange"
						:notFoundContent="fetching ? undefined : null">
						<a-spin v-if="fetching"
							slot="notFoundContent"
							size="small" />
						<a-select-option v-for="d in searchData"
							:key="d.value">{{d.text}}</a-select-option>
					</a-select>
				</div>
			</template>
			<template v-else-if="modalInfo.isFenpei&&!modalInfo.isBatch">
				<p>
					申请认证企业：
					<span>
						诺亚财富（中国）投资管理有限公司
					</span>
				</p>
				<p>
					提交申请日期：
					<span>
						2019-12-12 15:30:59
					</span>
				</p>
				<a-card>
					<a-card-grid style="width:25%;textAlign:'center'">联系人姓名</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">联系人职位</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">联系人电话</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">创建来源</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">App</a-card-grid>
				</a-card>
				<div style="margin-top:10px;">
					<span>{{modalInfo.subTitle}}</span>
					<a-select mode="multiple"
						style="width: 40%"
						labelInValue
						:value="searchKey"
						placeholder="搜索员工姓名或关键字"
						:filterOption="false"
						@search="fetchUser"
						@change="handleSearchDataChange"
						:notFoundContent="fetching ? undefined : null">
						<a-spin v-if="fetching"
							slot="notFoundContent"
							size="small" />
						<a-select-option v-for="d in searchData"
							:key="d.value">{{d.text}}</a-select-option>
					</a-select>
				</div>
			</template>
			<template v-else>
				<div>
					<p>
						企业名称：
						<span>
							诺亚财富（中国）投资管理有限公司
						</span>
					</p>
					<p>
						工单归属：
						<span>
							BD-季国晟
						</span>
					</p>
					<p>
						工单状态：
						<span>
							<a-radio-group :options="plainOptions" />
						</span>
					</p>
				</div>
			</template>
		</auth-modal>
	</div>
</template>

<script>
import moment from 'moment'
import { AuthModal } from './../components/index'
import { STable } from '@/components'
import { list } from '@/api/businessAuth'

const plainOptions = ['等待处理', '处理中', '已完结', '已过期']

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

const ticketList = [
  {
    id: 0,
    name: '请选择'
  },
  {
    id: 1,
    name: '等待处理'
  },
  {
    id: 2,
    name: '处理中'
  },
  {
    id: 3,
    name: '已完结'
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

const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '联系人名称',
    dataIndex: 'companyName',
    align: 'center'
  },
  {
    title: '联系人职位',
    dataIndex: 'companyPosition',
    align: 'center'
  },
  {
    title: '联系人电话',
    dataIndex: 'companyPhone',
    align: 'center'
  },
  {
    title: '创建来源',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
    align: 'center'
  },
  {
    title: '申请时间',
    align: 'center',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '沟通状态',
    dataIndex: 'occupation',
    align: 'center'
  },
  {
    title: '工单归属',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '工单状态',
    dataIndex: 'occupation2',
    align: 'center'
  },
  {
    title: '企业状态',
    dataIndex: 'occupation3',
    align: 'center'
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
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  name: 'businessAuthList',
  components: {
    STable,
    AuthModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      actionList,
      ticketList,
      belongNameList,
      rowSelection,
      columns,
      plainOptions,
      searchKey: [],
      searchData: [],
      fetching: false,
      modalInfo: {
        title: '',
        subTitle: '',
        visible: false,
        isBatch: false,
        isFenpei: false
      },
      queryParam: {
        startPage: 1,
        pageSize: 10,
        start: undefined,
        end: undefined,
        examineState: 0,
        belongName: 0,
        companyName: ''
      },
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
    handleBatchFenPei () {
      Object.assign(this.modalInfo, {
        title: '批量分配工单',
        subTitle: '将 16 条工单批量分配给员工：',
        visible: true,
        isBatch: true,
        isFenpei: false
      })
    },
    fetchUser (value) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.searchData = []
      this.fetching = true
      fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(body => {
          if (fetchId !== this.lastFetchId) return
          const data = body.results.map(user => ({
            text: `${user.name.first} ${user.name.last}`,
            value: user.login.username
          }))
          this.searchData = data
          this.fetching = false
        })
    },
    handleSearchDataChange (value) {
      Object.assign(this, {
        searchKey: value,
        searchData: [],
        fetching: false
      })
    },
    modalSubmit () {
      this.modalInfo.visible = false
    },
    modalCancel () {
      this.modalInfo.visible = false
    },
    handleBack () {}
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
.businessAuthListWrapper {
	h2 {
		font-weight: bold;
	}
	.nameWrapper {
		margin-bottom: 20px;
		h3 {
			font-weight: bold;
			display: inline-block;
		}
		.ant-btn {
			margin-left: 20px;
			color: #000;
			border-color: #000;
		}
	}
}
</style>
