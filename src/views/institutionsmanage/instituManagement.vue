<template>
	<div class="instituManagementWrapper">
		<h1>机构管理 - 机构/品牌列表审核</h1>
		<a-card :bordered="false">
			<a-form layout="horizontal"
				:form="form">
				<div class="filterWrapper">
					<a-form layout="inline"
						:form="form">
						<a-form-item label="机构名称">
							<a-input v-model="queryParam.name"
								placeholder="请填写品牌或机构名称" />
						</a-form-item>
						<a-button-group>
							<a-button @click="$refs.table.refresh(true)">搜索</a-button>
							<a-button @click="handleRestQueryParam()">重置</a-button>
						</a-button-group>
					</a-form>
				</div>
				<a-button-group class="btnWrapper">
					<a-button :type="queryParam.examineState===1?'primary':'default'"
						@click="handleSwitch(1)">
						待审核({{nowStatus[0].num}})
					</a-button>
					<a-button :type="queryParam.examineState===2?'primary':'default'"
						@click="handleSwitch(2)">
						审核通过({{nowStatus[1].num}})
					</a-button>
					<a-button :type="queryParam.examineState===3?'primary':'default'"
						@click="handleSwitch(3)">
						审核驳回({{nowStatus[2].num}})
					</a-button>
				</a-button-group>
				<s-table ref="table"
					rowKey="id"
					:columns="currentColumns"
					:data="loadData"
					:pagination="pagination"
					bordered
					style="margin-top:20px;">
					<span slot="serial"
						slot-scope="text, record, index">
						{{ index + 1 }}
					</span>
					<span slot="examineState"
						slot-scope="text">
						{{+text === 1 ? '待审核': +text === 2 ? '审核通过':+text === 3 ?'审核驳回':'待上传'}}
					</span>
					<span slot="action"
						slot-scope="text, record">
						<template>
							<!-- check 下 待审核 有 -->
							<a-button type="danger"
								@click="handleApprove(record, queryParam.examineState)"
								v-if="queryParam.examineState === 1"
								style="margin-right:10px;">
								审核
							</a-button>

							<!-- check 下 通过 有 -->
							<a-button type="primary"
								@click="handleApprove(record, 6)"
								v-if="(queryParam.examineState === 2 )"
								style="margin-right:10px;">
								查看
							</a-button>

							<a-button type="primary"
								@click="handleApprove(record, 5)"
								v-if="queryParam.examineState === 3"
								style="margin-right:10px;">
								查看
							</a-button>

							<!-- bd 下 驳回 有 -->
							<a-popconfirm v-if="queryParam.examineState === 3&&record.show"
								title="是否确认清空该机构的认证材料?"
								@confirm="handleReset(record)"
								okText="确认"
								cancelText="取消">
								<a-button type="primary">
									重置
								</a-button>
							</a-popconfirm>

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
  queryListNum,
  queryDicList,
  queryBrandDicList,
  queryListWithState,
  multipleBranchOrganizations,
  resetIns
} from '@/api/institution/institutionList'

export default {
  name: 'instituManagement',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      searchInstitutionVisible: false,
      searchBrandVisible: false,
      brandSearchKey: '',
      searchInstitutionColumns: [
        {
          title: '名称',
          dataIndex: 'companyName'
        },
        {
          title: '类型',
          dataIndex: 'companyType',
          scopedSlots: { customRender: 'companyType' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      searchBrandColumns: [
        {
          title: '名称',
          dataIndex: 'brandName'
        },
        {
          title: '类型',
          dataIndex: 'brandType',
          scopedSlots: { customRender: 'brandType' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      institutionData: [
        {
          id: 1,
          name: 123,
          type: 'haha'
        }
      ],
      brandData: [
        {
          id: 1,
          name: 123,
          type: 'haha'
        }
      ],
      nowStatus: [
        {
          num: 0
        },
        { num: 0 },
        { num: 0 }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        name: '',
        examineState: 1
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' },
          align: 'center'
        },
        {
          title: '公司',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '性质',
          dataIndex: 'dicType',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'brandType',
          align: 'center'
        },
        {
          title: '法定代表人',
          dataIndex: 'hasArtificialPerson',
          align: 'center'
        },
        {
          title: '合同数',
          dataIndex: 'contractNum',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'examineState',
          align: 'center',
          scopedSlots: { customRender: 'examineState' }
        },
        {
          title: '审核人',
          dataIndex: 'examineBy',
          align: 'center'
        },
        {
          title: '审核时间',
          dataIndex: 'examineTime',
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
        return queryListWithState(this.queryParam).then(res => {
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
      if (this.queryParam.examineState === 1) {
        let columns = this.columns.filter(item => item.title !== '审核人')
        columns = columns.filter(item => item.title !== '审核时间')
        return columns
      } else {
        return this.columns
      }
    }
  },
  created () {
    const { type } = this.$route.query
    if (type && (type === 2 || type === 6)) {
      this.queryParam.examineState = 2
    } else if (type && (type === 3 || type === 5)) {
      this.queryParam.examineState = 3
    } else {
      this.queryParam.examineState = 1
    }
    this.queryListNum()
  },
  methods: {
    async handleReset (record) {
      const param = {
        id: record.id,
        dicType: record.dicType,
        examineUser: JSON.parse(Vue.ls.get('USERINFO')).username
      }
      try {
        let res = await resetIns(param)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '网络故障，请重试！'
          })
          this.$refs.table.refresh(true)
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async queryBrandDicList (name, type) {
      try {
        let res = await queryBrandDicList({
          name
        })
        if (res.code === 200) {
          this.brandData = res.data
          if (!res.data.length && type === 'add') {
            this.goAddBrand(null, type)
          }
          this.searchBrandVisible = true
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async getQueryDicList (name) {
      try {
        let res = await queryDicList({
          name
        })
        if (res.code === 200) {
          this.institutionData = res.data
          this.searchInstitutionVisible = true
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async queryListNum () {
      let res = await queryListNum()
      if (res.code === 200) {
        this.nowStatus = res.data
      }
    },
    handleRestQueryParam () {
      this.queryParam = {
        ...{
          startPage: 1,
          pageSize: 10,
          name: '',
          examineState: 1
        }
      }
      this.$refs.table.refresh(true)
    },
    handleSwitch (type) {
      this.queryParam.examineState = type
      this.$refs.table.refresh(false)
    },
    handleApprove (record, type) {
      if (record.dicType === '机构') {
        this.$router.push({
          name: 'institutionCheck',
          query: { id: record.id, type }
        })
      } else {
        this.$router.push({
          name: 'brandCheck',
          query: { id: record.id, type }
        })
      }
    },
    handleEditApply (record, type) {
      if (record.dicType === '机构') {
        this.$router.push({
          name: 'editInstitution',
          query: {
            id: record.id,
            type
          }
        })
      } else {
        this.$router.push({
          name: 'editBrand',
          query: {
            id: record.id,
            type
          }
        })
      }
    },
    handleSearchInstitution (val) {
      if (!val) return
      this.getQueryDicList(val)
    },
    handleSearchBrand (type) {
      if (!this.brandSearchKey) return
      this.queryBrandDicList(this.brandSearchKey, type)
    },
    goAddInstitution (record) {
      const { companyName, companyUrl, companyType } = record
      this.$router.push({
        name: 'addInstitution',
        query: {
          companyName,
          companyUrl,
          companyType
        }
      })
    },
    goAddBrand (record, type) {
      if (type === 'add') {
        this.$router.push({
          name: 'addBrand',
          query: {
            brandName: this.brandSearchKey
          }
        })
      } else {
        const { brandName, id } = record
        this.$router.push({
          name: 'addBrand',
          query: {
            brandName,
            id
          }
        })
      }
    }
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
.instituManagementWrapper {
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
