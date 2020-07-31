<template>
	<div class="quaManagement">
		<h1>机构管理 - 企业资质审核</h1>
		<a-card :bordered="false">
			<div class="filterWrapper">
				<a-form layout="inline"
					:form="form">
					<a-form-item label="企业名称">
						<a-input v-model="queryParam.companyName"
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
						<a-button :type="queryParam.auditStatus===1?'primary':'default'"
							@click="handleSwitch(1)">
							待审核({{nowStatus.toBeReviewed}})
						</a-button>
						<a-button :type="queryParam.auditStatus===2?'primary':'default'"
							@click="handleSwitch(2)">
							审核通过({{nowStatus.passTheAudit}})
						</a-button>
						<a-button :type="queryParam.auditStatus===3?'primary':'default'"
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
				<span slot="auditStatus"
					slot-scope="text">
					{{+text === 1 ? '待审核': +text === 2 ? '审核通过':+text === 3 ?'审核驳回':'待上传'}}
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-button type="danger"
							@click="handleApprove(record,1)"
							v-if="queryParam.auditStatus === 1 ">审核</a-button>
						<a-button type="primary"
							@click="handleApprove(record,record.auditStatus)"
							v-if="queryParam.auditStatus === 2 || queryParam.auditStatus === 3 ">查看</a-button>
					</template>
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import { STable } from '@/components'
import {
  showCompanyAptitudesCount,
  multipleCompanyAptitudes
} from '@/api/quaManagement'
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
  name: 'quaManagement',
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
        companyName: '',
        auditStatus: 1
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
          title: '资质类型',
          dataIndex: 'aptitudeName',
          align: 'center'
        },
        {
          title: '申请时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '申请人',
          dataIndex: 'creater',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'auditStatus',
          align: 'center',
          scopedSlots: { customRender: 'auditStatus' }
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
        return multipleCompanyAptitudes(this.queryParam).then(res => {
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
      if (this.queryParam.auditStatus === 1) {
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
      this.queryParam.auditStatus = 2
    } else if (type && type === 3) {
      this.queryParam.auditStatus = 3
    } else {
      this.queryParam.auditStatus = 1
    }
    this.showCompanyAptitudesCount()
  },
  methods: {
    async showCompanyAptitudesCount () {
      let res = await showCompanyAptitudesCount()
      if (res.code === 200) {
        this.nowStatus = res.data
      }
    },
    handleRestQueryParam () {
      this.queryParam = {
        ...{
          startPage: 1,
          pageSize: 10,
          companyName: '',
          auditStatus: 1
        }
      }
      this.$refs.table.refresh(true)
    },
    handleSwitch (type) {
      this.queryParam.auditStatus = type
      this.$refs.table.refresh(false)
    },
    handleApprove (record, type) {
      this.$router.push({
        name: 'quaCheck',
        query: {
          id: record.id,
          type
        }
      })
    },
    batchOperate () {}
  }
}
</script>

<style lang="less">
.quaManagement {
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
