<template>
	<div class="policyTableWrapper">
		<h3>保单服务</h3>
		<div class="tablePageWrapper">
			<div class="tablePageSearchWrapper">
				<a-form layout="inline">
					<div class="searchBtnWrapper">
						<a-form-item label="服务类别：">
							<a-button-group>
								<a-button @click="handleTypeChose(allBtn)"
									type="primary"
									:ghost="!allBtn.isChosen">{{ allBtn.name }}</a-button>
								<a-button v-for="item in btnGroups"
									:key="item.name"
									@click="handleTypeChose(item)"
									type="primary"
									:ghost="!item.isChosen">{{ item.name }}</a-button>
							</a-button-group>
						</a-form-item>
					</div>
					<div>
						<a-form-item label="二级类别">
							<a-select v-model="queryParam.twoClassOfService"
								placeholder="请选择"
								style="min-width:150px;">
								<a-select-option :value="item.productName"
									v-for="item in twoClassOfServiceList"
									:key="item.productCode">{{ item.productName }}</a-select-option>
							</a-select>
						</a-form-item>
					</div>
					<div>
						<a-row>
							<a-col :xl="16"
								:lg="16"
								:md="16"
								:sm="16"
								:xs="16">
								<a-form-item label="保险公司：">
									<a-select v-model="queryParam.insuranceName"
										placeholder="请选择"
										style="min-width:150px;">
										<a-select-option value="友邦">友邦</a-select-option>
										<a-select-option value="保诚">保诚</a-select-option>
										<a-select-option value="安盛">安盛</a-select-option>
										<a-select-option value="大都会">大都会</a-select-option>
										<a-select-option value="宏利">宏利</a-select-option>
										<a-select-option value="富通">富通</a-select-option>
									</a-select>
								</a-form-item>
							</a-col>
							<a-col class="searchBtnWrapper"
								:xl="8"
								:lg="8"
								:md="8"
								:sm="8"
								:xs="8">
								<a-button @click="$refs.table.refresh(false)">查询</a-button>
								<a-button style="margin:0 20px;"
									@click="resetSearchForm">重置</a-button>
								<a-button @click="handleWrrantyAdd"
									v-auth="$route.meta.dutyName">新增</a-button>
							</a-col>
						</a-row>
					</div>
				</a-form>
			</div>
			<s-table ref="table"
				size="default"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				style="margin-top:20px;"
				bordered>
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="blank"
					slot-scope="text, record">
					<a-checkbox :checked="record.documentFlag == 0 || record.documentFlag == 2" />
				</span>
				<span slot="example"
					slot-scope="text, record">
					<a-checkbox :checked="record.documentFlag == 1 || record.documentFlag == 2" />
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-button type="primary"
							@click="handleWarrantyEdit(record.id)">编辑</a-button>
						<a-divider type="vertical" />
						<a-button type="danger"
							@click="handleWarrantyDelete(record)">删除</a-button>
					</template>
				</span>
			</s-table>
		</div>
	</div>
</template>

<script>
import { STable } from '@/components'
import {
  getPagingInsuranceConfigure,
  getShowTwoStageCosByCosMoreover,
  getDeleteInsuranceConfigure
} from '@/api/policy'

export default {
  components: {
    STable
  },
  data () {
    return {
      // 按钮
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 0,
          name: '保单服务',
          isChosen: false
        },
        {
          id: 1,
          name: '理赔服务',
          isChosen: false
        },
        {
          id: 2,
          name: '信息更改',
          isChosen: false
        }
      ],
      twoClassOfServiceList: [],
      currentRowIndex: '', // 当前点击的列表行的index
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        twoClassOfService: '',
        classOfService: '',
        insuranceName: ''
      },
      // 表头
      columns: [
        {
          title: '序号',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '类别',
          align: 'center',
          dataIndex: 'classOfService'
        },
        {
          title: '二级类别',
          align: 'center',
          dataIndex: 'twoClassOfService'
        },
        {
          title: '保险公司',
          align: 'center',
          dataIndex: 'insuranceName'
        },
        {
          title: '空白文档',
          align: 'center',
          dataIndex: 'blank',
          scopedSlots: { customRender: 'blank' }
        },
        {
          title: '样例',
          align: 'center',
          dataIndex: 'example',
          scopedSlots: { customRender: 'example' }
        },
        {
          title: '最后更新时间',
          align: 'center',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
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
      loadData: parameter => {
        return getPagingInsuranceConfigure(this.queryParam).then(res => {
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
  created () {
    this.getClassOfServiceChange(this.queryParam.classOfService)
  },
  methods: {
    refreshTable () {
      this.$refs.table.refresh(true)
    },
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        classOfService: '',
        twoClassOfService: '',
        insuranceName: ''
      }
      this.resetBtnGroups()
      this.refreshTable()
    },
    // 重置按钮组
    resetBtnGroups () {
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
      this.getClassOfServiceChange('0,1,2')
    },
    // 获取二级分类
    async getClassOfServiceChange (val) {
      let res = await getShowTwoStageCosByCosMoreover({ cosFlags: val })
      this.twoClassOfServiceList = res.data
    },
    // 服务类别点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.classOfService = ''
        this.getClassOfServiceChange(this.queryParam.classOfService)
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      let result2 = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) {
          result.push(item.name)
          result2.push(item.id)
        }
      })

      this.queryParam.classOfService = result.join(',')
      this.getClassOfServiceChange(result2.join(','))
    },
    handleWrrantyAdd () {
      this.$emit('handleWrrantyAdd')
    },
    // 保单 - 编辑
    handleWarrantyEdit (id) {
      this.$emit('handleWarrantyEdit', id)
    },
    // 保单 - 删除
    handleWarrantyDelete (record) {
      let param = {
        insuranceCode: record.insuranceCode,
        twoClassOfServiceCode: record.twoClassOfServiceCode
      }
      getDeleteInsuranceConfigure(param).then(res => {
        if (res.code === 200) {
          this.$notification.success({
            message: '删除成功！'
          })
          this.refreshTable()
        } else {
          this.$notification.error({
            message: '删除失败，请重试！'
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.policyTableWrapper {
	margin-top: 35px;
	h3 {
		font-size: 14px;
		font-weight: bold;
	}
	.tablePageWrapper {
		background: #fff;
		padding: 20px;
		border-radius: 10px;
	}
}
</style>
