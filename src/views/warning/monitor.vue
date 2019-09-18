<template>
	<div class="monitorWrapper">
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="48">
						<a-col :span="4">
							<a-form-item :label="queryParam.targetType==1?'公司：':queryParam.targetType==2?'产品名称：':'高管姓名：'">
								<a-input v-model="queryParam.keyword"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="区间: ">
								<a-select v-model="queryParam.periodType">
									<a-select-option :value="item.id"
										v-for="item in dayRange"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="7">
							<a-form-item>
								<a-dropdown>
									<a href="javascript:;">
										{{columnName}}
										<a-icon type="down" />
									</a>
									<a-menu slot="overlay"
										@click="onSortRangeClick">
										<a-menu-item v-for="(item,index) in sortRange"
											:key="index">
											<a href="javascript:;">{{item.name}}</a>
										</a-menu-item>
									</a-menu>
								</a-dropdown>
								<a-input-number :min="0"
									:step="1"
									v-model="queryParam.startNum"
									placeholder="请输入数字" />
								到
								<a-input-number :min="queryParam.startNum"
									:step="1"
									v-model="queryParam.endNum"
									placeholder="请输入数字" />
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
					<a-row>
						<a-col>
							<a-radio-group @change="onSearchTypeChange"
								v-model="queryParam.targetType">
								<a-radio-button :value="1">公司舆情</a-radio-button>
								<a-radio-button :value="2">产品舆情</a-radio-button>
								<a-radio-button :value="3">高管舆情</a-radio-button>
							</a-radio-group>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="queryParam.targetType == 1?companyColumns:queryParam.targetType==2?productColumns:bossColumns"
				:data="loadData"
				:pagination="pagination"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="boss"
					slot-scope="text,record"
					style="color:blue;"
					@click="showInfo(record,3)">
					{{text}} [查看]
				</span>
				<span slot="product"
					slot-scope="text,record"
					style="color:blue;"
					@click="showInfo(record,4)">
					{{text}}[查看]
				</span>
				<span slot="self"
					slot-scope="text,record"
					style="color:blue;"
					@click="showInfoTwo(record,2)">
					{{text}}[查看]
				</span>
				<!-- <span slot="administratorName"
					slot-scope="text,record"
					@click="showInfo(record,7)">
					{{text}}[查看]
				</span> -->
				<span slot="around"
					slot-scope="text,record"
					style="color:blue;"
					@click="showInfoTwo(record,1)">
					{{text}}[查看]
				</span>
				<span slot="operate"
					slot-scope="text,record"
					@click="handleAdd(record)">
					<a-icon type="edit" />
				</span>
			</s-table>
		</a-card>
		<monitor-detail :title="modalTitle"
			:modalData="modalData"
			:modalVisible="modalVisible"
			:modalStatus="modalStatus"
			@closeModal="handleModalClose"
			@hanldeModalPageChange="hanldeModalPageChange" />
	</div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getList, getColumn, getColumnsp } from '@/api/warning'
import monitorDetail from './module/monitorDetail'

// 区间列表
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
// 筛选方式
const sortRangeA = [
  {
    id: 1,
    name: '关注数'
  },
  {
    id: 2,
    name: '记账数'
  },
  {
    id: 3,
    name: '高管数'
  },
  {
    id: 4,
    name: '产品数'
  },
  {
    id: 5,
    name: '自身舆情'
  },
  {
    id: 6,
    name: '周边舆情'
  }
]
const sortRangeB = [
  {
    id: 1,
    name: '关注数'
  },
  {
    id: 2,
    name: '记账数'
  },
  {
    id: 5,
    name: '自身舆情'
  },
  {
    id: 6,
    name: '周边舆情'
  }
]
const sortRangeC = [
  {
    id: 1,
    name: '关注数'
  },
  {
    id: 5,
    name: '自身舆情'
  },
  {
    id: 6,
    name: '周边舆情'
  }
]

export default {
  name: 'monitor',
  components: {
    STable,
    monitorDetail
  },
  data () {
    return {
      form: this.$form.createForm(this),
      dayRange,
      sortRange: sortRangeA,
      columnName: sortRangeA[0].name,
      modalVisible: false,
      modalStatus: 3,
      modalTitle: '',
      modalData: {},
      modalQueryParam: {
        startPage: 1,
        pageSize: 5,
        targetId: '',
        targetType: '',
        periodType: '',
        type: '',
        productType: ''
      },
      queryParam: {
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
      companyColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '公司',
          dataIndex: 'administratorName',
          align: 'center'
        },
        {
          title: '关注',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '记账',
          dataIndex: 'bill',
          align: 'center'
        },
        {
          title: '高管',
          dataIndex: 'managerFollower',
          align: 'center',
          scopedSlots: { customRender: 'boss' }
        },
        {
          title: '产品',
          dataIndex: 'productFollower',
          align: 'center',
          scopedSlots: { customRender: 'product' }
        },
        {
          title: '自身舆情',
          align: 'center',
          dataIndex: 'selfWarning',
          scopedSlots: { customRender: 'self' }
        },
        {
          title: '周边舆情',
          align: 'center',
          dataIndex: 'surroundingWarning',
          scopedSlots: { customRender: 'around' }
        },
        {
          title: '最后推送时间',
          dataIndex: 'latestPushTime',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      productColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          align: 'center'
        },
        {
          title: '关注',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '记账',
          dataIndex: 'bill',
          align: 'center'
        },
        {
          title: '公司',
          dataIndex: 'administratorName',
          align: 'center'
        },
        {
          title: '自身舆情',
          align: 'center',
          dataIndex: 'selfWarning',
          scopedSlots: { customRender: 'self' }
        },
        {
          title: '周边舆情',
          align: 'center',
          dataIndex: 'surroundingWarning',
          scopedSlots: { customRender: 'around' }
        },
        {
          title: '最后推送时间',
          align: 'center',
          dataIndex: 'latestPushTime'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      bossColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '高管姓名',
          dataIndex: 'managerName',
          align: 'center'
        },
        {
          title: '关注',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '公司',
          dataIndex: 'administratorName',
          align: 'center',
          scopedSlots: { customRender: 'administratorName' }
        },
        {
          title: '自身舆情',
          align: 'center',
          dataIndex: 'selfWarning',
          scopedSlots: { customRender: 'self' }
        },
        {
          title: '周边舆情',
          align: 'center',
          dataIndex: 'surroundingWarning',
          scopedSlots: { customRender: 'around' }
        },
        {
          title: '最后推送时间',
          align: 'center',
          dataIndex: 'latestPushTime'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      loadData: () => {
        return getList(this.queryParam).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.pageNum > res.data.navigateLastPage) {
              // 解决当点击的页码超过实际页数重复请求bug
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
        keyword: '',
        periodType: 1,
        targetType: '' || 1,
        startTime: '',
        endTime: '',
        column: 1,
        startNum: 0,
        endNum: 10000
      }

      this.resetDatePicker()
      this.resetSortRange()
      this.$refs.table.refresh(true)
    },
    // 重置时间
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    // 重置搜索条件
    resetSortRange () {
      this.columnName = this.sortRange[0].name
      this.queryParam.column = this.sortRange[0].id
    },
    // 改变日期
    onDatePickChange (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    // 改变数量筛选方式
    onSortRangeClick ({ key }) {
      this.columnName = this.sortRange[key].name
      this.queryParam.column = this.sortRange[key].id
    },
    // 切换舆情种类
    onSearchTypeChange (e) {
      this.sortRange =
				this.queryParam.targetType === 1
				  ? sortRangeA
				  : this.queryParam.targetType === 2
				    ? sortRangeB
				    : sortRangeC
      this.columnName = this.sortRange[0].name
      this.queryParam.column = this.sortRange[0].id
      this.$refs.table.refresh(true)
    },
    // 查看明细
    showInfo (record, type) {
      switch (type) {
        case 3:
          this.modalTitle = '高管明细'
          break
        case 4:
          this.modalTitle = '产品明细'
          break
        case 7:
          this.modalTitle = '公司名称'
          break
      }
      this.modalStatus = type
      this.modalVisible = true
      let param = {
        targetType: this.queryParam.targetType,
        targetId: record.administratorId,
        column: type,
        periodType: this.queryParam.periodType
      }
      getColumn(param).then(res => {
        let newRes = {}
        newRes.list = res.data
        this.modalData = newRes
      })
    },
    showInfoTwo (record, type) {
      switch (type) {
        case 2:
          this.modalTitle = '自身舆情'
          break
        case 1:
          this.modalTitle = '周边舆情'
          break
      }
      this.modalStatus = type
      this.modalVisible = true

      let param = {
        targetId:
					this.queryParam.targetType === 3
					  ? record.managerId
					  : this.queryParam.targetType === 2
					    ? record.productId
					    : record.administratorId,
        targetType: this.queryParam.targetType,
        periodType: this.queryParam.periodType,
        type,
        productType: record.productType || ''
      }
      this.modalQueryParam = Object.assign(this.modalQueryParam, param)
      this.getInfoTwoList(record)
    },
    getInfoTwoList (record) {
      getColumnsp(this.modalQueryParam).then(res => {
        this.modalData = res.data
        this.modalData.modalInfo = record
      })
    },
    hanldeModalPageChange (page) {
      this.modalQueryParam.startPage = page
      this.getInfoTwoList()
    },
    handleModalClose () {
      this.modalVisible = false
      this.modalQueryParam.startPage = 1
      this.modalData = {}
    },
    // 新增
    handleAdd (record) {
      let info = {
        modalInfo: record,
        type: this.queryParam.targetType
      }
      this.$router.push({
        // path: '/warning/monitorAdd',
        name: 'monitorAdd',
        params: {
          info
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.monitorWrapper {
	.active {
		background-color: rgba(42, 130, 228, 0.3);
	}
}
</style>
