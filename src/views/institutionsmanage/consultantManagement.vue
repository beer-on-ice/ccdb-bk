<template>
	<div class="consultantListWrapper">
		<h1>机构管理 - 顾问审核</h1>
		<a-card :bordered="false">
			<div class="filterWrapper">
				<a-form layout="inline"
					:form="form">
					<a-form-item label="姓名">
						<a-input v-model="queryParam.adviserName"
							placeholder="请输入" />
					</a-form-item>
					<a-form-item label="职位">
						<a-input v-model="queryParam.currentPosition"
							placeholder="请输入" />
					</a-form-item>
					<a-button-group>
						<a-button @click="$refs.table.refresh(true)">搜索</a-button>
						<a-button @click="handleRestQueryParam()">重置</a-button>
					</a-button-group>
				</a-form>
			</div>
			<a-row class="btnWrapper">
				<a-col :span="20">
					<a-button-group>
						<a-button :type="queryParam.approve===1?'primary':'default'"
							@click="handleSwitch(1)">
							待审核({{nowStatus.toBeReviewed}})
						</a-button>
						<a-button :type="queryParam.approve===2?'primary':'default'"
							@click="handleSwitch(2)">
							审核通过({{nowStatus.passTheAudit}})
						</a-button>
						<a-button :type="queryParam.approve===3?'primary':'default'"
							@click="handleSwitch(3)">
							审核驳回({{nowStatus.rejectedAudit}})
						</a-button>
					</a-button-group>
				</a-col>
				<!-- <a-col :span="4">
					<a-popconfirm title="是否确认操作？"
						ok-text="确认"
						cancel-text="取消"
						@confirm="batchOperate"
						@cancel="cancel">
						<a-button>
							批量审核
						</a-button>
					</a-popconfirm>
				</a-col> -->
			</a-row>
			<s-table ref="table"
				rowKey="id"
				:columns="currentColumns"
				:data="loadData"
				:pagination="pagination"
				:row-selection="rowSelection"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="yearOfEmployment"
					slot-scope="text">
					{{ handleYear(text) }}
				</span>
				<span slot="adviserIdentification"
					slot-scope="text">
					{{+text ? '是':'否'}}
				</span>
				<span slot="stick"
					slot-scope="text">
					{{+text ? '是':'否'}}
				</span>
				<span slot="approve"
					slot-scope="text">
					{{+text === 1 ? '待审核': +text === 2 ? '审核通过':+text === 3 ?'审核驳回':'待上传'}}
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-button type="danger"
							@click="handleApprove(record,1)"
							v-if="queryParam.approve === 1 ">审核</a-button>
						<a-button type="primary"
							@click="handleApprove(record,2)"
							v-if="queryParam.approve === 2">查看</a-button>
						<a-button type="primary"
							@click="handleApprove(record,3)"
							v-if="queryParam.approve === 3 ">查看</a-button>
					</template>
				</span>
			</s-table>
		</a-card>
	</div>

</template>

<script>
import { STable } from '@/components'
import {
  showAuditCount,
  multipleScreeningAdvisers
} from '@/api/consultantManagement'

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
  name: 'ConsultantManagement',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      rowSelection,
      nowStatus: {
        passTheAudit: 0,
        rejectedAudit: 0,
        toBeReviewed: 0
      },
      queryParam: {
        startPage: 1,
        pageSize: 10,
        adviserName: '',
        currentPosition: '',
        approve: 1
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '姓名',
          dataIndex: 'adviserName',
          align: 'center'
        },
        {
          title: '公司',
          dataIndex: 'companyName',
          align: 'center'
        },
        {
          title: '职位',
          dataIndex: 'currentPosition',
          align: 'center'
        },
        {
          title: '从业年限',
          dataIndex: 'yearOfEmployment',
          align: 'center',
          scopedSlots: { customRender: 'yearOfEmployment' }
        },
        {
          title: '认证',
          dataIndex: 'adviserIdentification',
          align: 'center',
          scopedSlots: { customRender: 'adviserIdentification' }
        },
        {
          title: '置顶',
          dataIndex: 'stick',
          align: 'center',
          scopedSlots: { customRender: 'stick' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '创建人',
          dataIndex: 'creater',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'approve',
          align: 'center',
          scopedSlots: { customRender: 'approve' }
        },
        {
          title: '审核人',
          dataIndex: 'auditor',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
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
        return multipleScreeningAdvisers(this.queryParam).then(res => {
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
  computed: {
    currentColumns () {
      if (this.queryParam.approve === 1) {
        let columns = this.columns.filter(item => item.title !== '审核人')
        return columns
      } else {
        return this.columns
      }
    }
  },
  created () {
    const { type } = this.$route.query
    if (type && type === 2) {
      this.queryParam.approve = 2
    } else if (type && type === 3) {
      this.queryParam.approve = 3
    } else {
      this.queryParam.approve = 1
    }
    this.showAuditCount()
  },
  methods: {
    async showAuditCount () {
      let res = await showAuditCount()
      if (res.code === 200) {
        this.nowStatus = res.data
      }
    },
    handleRestQueryParam () {
      this.queryParam = {
        ...{
          startPage: 1,
          pageSize: 10,
          adviserName: '',
          currentPosition: '',
          approve: 1
        }
      }
      this.$refs.table.refresh(false)
    },
    handleSwitch (type) {
      this.queryParam.approve = type
      this.$refs.table.refresh(false)
    },
    handleYear (regTime) {
      let dateStart = new Date(regTime)
      let dateEnd = new Date(new Date().getTime())
      let difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
      if (difValue < 365) {
        return '不足一年'
      } else if (difValue > 365) {
        let num = Math.floor(difValue / 365)
        return `从业${num}年`
      } else {
        return `时间有误`
      }
    },
    handleApprove (record, type) {
      this.$router.push({
        name: 'consultantCheck',
        query: { id: record.id, type }
      })
    },
    batchOperate () {}
  }
}
</script>

<style lang="less">
.consultantListWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.filterWrapper {
		margin-top: 20px;
		.ant-btn-group {
			margin-top: 4px;
		}
	}
	.btnWrapper {
		margin-top: 20px;
	}
}
</style>
