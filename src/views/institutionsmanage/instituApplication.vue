<template>
	<div class="instituManagementWrapper">
		<h1>机构管理 - 机构/品牌申请</h1>
		<a-card :bordered="false">
			<a-form layout="horizontal"
				:form="form">
				<a-row>
					<a-col :span="12">
						<a-form-item label="搜索机构："
							:label-col="{ span: 3 }"
							:wrapper-col="{ span: 12 }">
							<a-input-search placeholder="请填写机构名称"
								@search="handleSearchInstitution"
								maxLength="50"
								enterButton="搜索" />
						</a-form-item>
						<a-table class="institutionSearchTable"
							size="small"
							v-if="searchInstitutionVisible"
							:columns="searchInstitutionColumns"
							:dataSource="institutionData"
							:pagination="false"
							:scroll="{ y: 110 }"
							rowKey="companyUrl">
							<span slot="companyType"
								slot-scope="text">
								{{text | companyTypeFilter}}
							</span>
							<span slot="action"
								slot-scope="text, record">
								<span @click="goAddInstitution(record)"
									style="cursor:pointer;color:red;">开通
								</span>
							</span>
						</a-table>
					</a-col>
					<a-col :span="12">
						<a-form-item label="搜索品牌："
							:label-col="{ span: 3 }"
							:wrapper-col="{ span: 12 }">
							<a-input placeholder="请填写品牌名称"
								maxLength="50"
								v-model="brandSearchKey">
								<div slot="addonAfter"
									style="width: 80px">
									<span style="padding: 0 5px;cursor:pointer;color:red;"
										@click="handleSearchBrand('add')">+新增</span>
									<span style="padding: 0 5px;cursor:pointer;"
										@click="handleSearchBrand('search')">搜索</span>
								</div>
							</a-input>
						</a-form-item>
						<a-table class="institutionSearchTable"
							size="small"
							v-if="searchBrandVisible"
							:columns="searchBrandColumns"
							:dataSource="brandData"
							:pagination="false"
							:scroll="{ y: 110 }"
							rowKey="id">
							<span slot="brandType"
								slot-scope="text">
								{{text | brandTypeFilter}}
							</span>
							<span slot="action"
								slot-scope="text, record">
								<span @click="goAddBrand(record,'search')"
									style="cursor:pointer;color:red;">开通</span>
							</span>
						</a-table>
					</a-col>
				</a-row>
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
							<!-- bd 下 待审核 有 -->
							<a-button type="primary"
								@click="handleApprove(record, 7)"
								v-if="(queryParam.examineState === 1)"
								style="margin-right:10px;">
								查看
							</a-button>

							<!-- bd 下 通过 有 -->
							<a-button type="primary"
								@click="handleApprove(record, 9)"
								v-if="queryParam.examineState === 2"
								style="margin-right:10px;">
								查看账号
							</a-button>

							<a-button type="primary"
								@click="handleApprove(record, 8)"
								v-if="queryParam.examineState === 3"
								style="margin-right:10px;">
								查看
							</a-button>

							<!-- bd 下 通过和驳回 都有 -->
							<a-button type="primary"
								@click="handleEditApply(record, queryParam.examineState)"
								v-if="(queryParam.examineState === 2 || queryParam.examineState === 3)"
								style="margin-right:10px;">
								修改
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
  queryListNum,
  queryDicList,
  queryBrandDicList,
  queryListWithState,
  validateBrand,
  multipleBranchOrganizations
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
          width: '250px',
          dataIndex: 'companyName'
        },
        {
          title: '类型',
          width: '250px',
          dataIndex: 'type',
          scopedSlots: { customRender: 'companyType' }
        },
        {
          title: '操作',
          width: '250px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      searchBrandColumns: [
        {
          title: '名称',
          width: '250px',
          dataIndex: 'brandName'
        },
        {
          title: '类型',
          width: '250px',
          dataIndex: 'brandType',
          scopedSlots: { customRender: 'brandType' }
        },
        {
          title: '操作',
          width: '250px',
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
    if (type && (type === 2 || type === 9)) {
      this.queryParam.examineState = 2
    } else if (type && (type === 3 || type === 8)) {
      this.queryParam.examineState = 3
    } else {
      this.queryParam.examineState = 1
    }
    this.queryListNum()
  },
  methods: {
    async validateBrand (name, type) {
      try {
        let res = await validateBrand({
          brandName: name
        })
        if (res.code === 200) {
          this.queryBrandDicList(name, type)
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
      if (!val.trim()) return
      this.getQueryDicList(val.trim())
    },
    handleSearchBrand (type) {
      if (!this.brandSearchKey.trim()) return
      this.validateBrand(this.brandSearchKey.trim(), type)
    },

    goAddInstitution (record) {
      const { companyName, companyUrl, type } = record
      this.$router.push({
        name: 'addInstitution',
        query: {
          companyName,
          companyUrl,
          companyType: type
        }
      })
    },
    goAddBrand (record, type) {
      if (type === 'add') {
        this.$router.push({
          name: 'addBrand',
          query: {
            brandName: this.brandSearchKey.trim()
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
        case 8:
          return '证券'
        case 9:
          return '基金且证券'
        default:
          return '暂无'
      }
    },
    brandTypeFilter (val) {
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
