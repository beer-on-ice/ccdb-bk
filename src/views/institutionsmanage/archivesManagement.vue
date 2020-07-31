<template>
	<div class="archivesManagementWrapper">
		<h1>机构管理 - 机构档案审核</h1>
		<a-card :bordered="false">
			<a-form layout="horizontal"
				:form="form">
				<div class="filterWrapper">
					<a-form layout="inline"
						:form="form">
						<a-form-item label="机构名称">
							<a-input v-model="queryParam.companyName"
								placeholder="请填写品牌或机构名称" />
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
								待审核({{nowStatus.a1}})
							</a-button>
							<a-button :type="queryParam.auditStatus===2?'primary':'default'"
								@click="handleSwitch(2)">
								审核通过({{nowStatus.a2}})
							</a-button>
							<a-button :type="queryParam.auditStatus===3?'primary':'default'"
								@click="handleSwitch(3)">
								审核驳回({{nowStatus.a3}})
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
					:columns="columns"
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
								@click="handleApprove(record, queryParam.auditStatus)"
								v-if="queryParam.auditStatus === 1"
								style="margin-right:10px;">
								审核
							</a-button>

							<a-button type="primary"
								@click="handleApprove(record, queryParam.auditStatus)"
								v-if="queryParam.auditStatus === 2 ||queryParam.auditStatus === 3 "
								style="margin-right:10px;">
								查看
							</a-button>
						</template>
					</span>
				</s-table>
			</a-form>
		</a-card>
	</div>

</template>

<script>
import Vue from 'vue'
import { STable } from '@/components'
import moment from 'moment'

import {
  listOfaudit,
  numberOfAudit
} from '@/api/institution/archivesManagement'

const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '机构名称',
    dataIndex: 'companyName',
    align: 'center'
  },
  {
    title: '档案类型',
    dataIndex: 'fileType',
    align: 'center'
  },
  {
    title: '申请修改内容',
    dataIndex: 'applicationForAmendment',
    align: 'center'
  },
  {
    title: '申请人',
    dataIndex: 'proposer',
    align: 'center'
  },
  {
    title: '提交日期',
    dataIndex: 'submissionDate',
    align: 'center'
  },
  {
    title: '审核人',
    dataIndex: 'verifier',
    align: 'center'
  },
  {
    title: '审核日期',
    dataIndex: 'auditTime',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'auditStatus',
    align: 'center',
    scopedSlots: { customRender: 'auditStatus' }
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
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
  name: 'archivesManagement',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      rowSelection,
      columns,
      nowStatus: { a1: 0, a2: 0, a3: 0 },
      queryParam: {
        startPage: 1,
        pageSize: 10,
        companyName: '',
        auditStatus: 1
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
        return listOfaudit(this.queryParam).then(res => {
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
    const { type } = this.$route.query
    if (type && type === 2) {
      this.queryParam.auditStatus = 2
    } else if (type && type === 3) {
      this.queryParam.auditStatus = 3
    } else {
      this.queryParam.auditStatus = 1
    }
    this.numberOfAudit()
  },
  methods: {
    async numberOfAudit () {
      let res = await numberOfAudit()
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
    handleApprove ({ id, companyUrl, fileType }, type) {
      this.$router.push({
        name: 'archivesCheck',
        query: { id: id, type, companyUrl: companyUrl, fileType }
      })
    },
    batchOperate () {}
  },
  filters: {
    companyTypeFilter (val) {
      switch (Number(val)) {
        case 0:
          return '品牌'
        case 1:
          return '私募管理人'
        case 2:
          return '信托公司'
        case 3:
          return '银行'
        case 4:
          return '保险公司'
        default:
          return '品牌'
      }
    }
  }
}
</script>

<style lang="less">
.archivesManagementWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.institutionSearchTable {
		.ant-table-body {
			.ant-table-row {
				td:nth-of-type(1) {
					width: 250px;
				}
			}
		}
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
