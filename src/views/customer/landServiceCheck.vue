<template>
	<div class="customerWrapper">
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="48">
						<a-col :md="8"
							:sm="24">
							<a-form-item label="用户id: ">
								<a-input v-model="queryParam.userId"
									placeholder="请输入用户id" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :md="12"
							:sm="24">
							<a-form-item label="服务类别: ">
								<a-button-group>
									<a-button @click="handleTypeChose(allBtn)"
										type="primary"
										:ghost="!allBtn.isChosen">{{allBtn.name}}</a-button>
									<a-button v-for="item in btnGroups"
										:key="item.id"
										@click="handleTypeChose(item)"
										type="primary"
										:ghost="!item.isChosen">{{item.name}}</a-button>
								</a-button-group>
							</a-form-item>
						</a-col>
						<a-col :md="8"
							:sm="24">
							<a-form-item label="提交时间">
								<a-range-picker @change="onDatePickChange"
									v-decorator="['dateRange']" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :md="14"
							:sm="24">
							<a-form-item label="系统状态: ">
								<a-button-group>
									<a-button @click="handleTypeChose2(allBtn)"
										type="primary"
										:ghost="!allBtn2.isChosen">{{allBtn.name}}</a-button>
									<a-button v-for="item in btnGroups2"
										:key="item.id"
										@click="handleTypeChose2(item)"
										type="primary"
										:ghost="!item.isChosen">{{item.name}}</a-button>
								</a-button-group>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<div class="table-operator"
				style="margin-bottom:50px">
				<span class="table-page-search-submitButtons"
					:style="{ float: 'left', overflow: 'hidden' } || {} ">
					<a-button type="primary"
						@click="$refs.table.refresh(false)">查询</a-button>
					<a-button style="margin-left: 8px"
						@click="resetSearchForm">重置</a-button>
				</span>
				<span style="float:right">
					<a-button type="primary"
						@click="handleEdit()">操作</a-button>
				</span>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				:customRow="columnsClick"
				:rowClassName="changeclassname"
				bordered>
				<span slot="userid"
					slot-scope="text"
					href="javascript:;">{{text}}</span>
				<span slot="customTitle"> 用户id</span>
				<span slot="action"
					slot-scope="text, record"
					v-if="record.shiny == 3">
					<span style="margin-right:10px">表格文件</span>
					<span>证明文件</span>
				</span>

				<span slot="action"
					slot-scope="text, record"
					v-else-if="record.shiny == 4">
					<span>暂无上传资料</span>
				</span>

				<span slot="action"
					slot-scope="text, record"
					v-else>
					<span v-if="record.shiny == 1 "
						style="margin-right:10px">表格文件</span>
					<span v-if="record.shiny == 2 ">证明文件</span>
				</span>
			</s-table>
			<!-- 这个不可以删除  是用来展示模态框的 -->
			<step-by-step-modal ref="modal"
				@saveOk="$refs.table.refresh(true)" />
		</a-card>
	</div>
</template>

<script>
import moment from 'moment'
import { STable, StepByStepModal } from '@/components'
import { getAllList } from '@/api/landCustomer'

export default {
  name: 'customerBook',
  components: {
    STable,
    StepByStepModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentRowIndex: '',
      id: '',
      type: '',
      modalUserId: '',
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: '保单服务',
          name: '保单服务',
          isChosen: false
        },
        {
          id: '理赔服务',
          name: '理赔服务',
          isChosen: false
        },
        {
          id: '信息更改',
          name: '信息更改',
          isChosen: false
        }
      ],
      allBtn2: {
        name: '全部',
        isChosen: true
      },
      btnGroups2: [
        {
          id: 0,
          name: '上传中',
          isChosen: false
        },
        {
          id: 1,
          name: '审批中',
          isChosen: false
        },
        {
          id: 2,
          name: '审批通过',
          isChosen: false
        },
        {
          id: 3,
          name: '审批退回',
          isChosen: false
        }
      ],
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        userId: '',
        queryTimeStr: '',
        queryEndTimeStr: '',
        cos: '',
        systemState: ''
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
      // 表头
      columns: [
        {
          dataIndex: 'userId',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: '用户昵称',
          dataIndex: 'petName'
        },
        {
          title: '邮箱地址',
          dataIndex: 'emailAddress'
        },
        {
          title: '服务类别',
          dataIndex: 'titleName'
        },
        {
          title: '服务类别(二级)',
          dataIndex: 'productName'
        },
        {
          title: '最后提交时间',
          dataIndex: 'dateOfLatestSubmission'
        },
        {
          title: '反馈信息',
          dataIndex: 'remark'
        },
        {
          title: '审核人',
          dataIndex: 'auditor'
        },
        {
          title: '系统状态',
          dataIndex: 'auditStatus'
        },
        {
          title: '用户上传资料',
          key: 'userinfo',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: () => {
        return getAllList(this.queryParam).then(res => {
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
            this.currentRowIndex = ''

            return res.data
          } else {
            res.data = {}
            console.log('走了else', res.data)
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
        userId: '',
        queryTimeStr: '',
        queryEndTimeStr: '',
        cos: '',
        systemState: ''
      }

      this.resetBtnGroups()
      this.resetDatePicker()
      this.$refs.table.refresh(true)
    },
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    resetBtnGroups () {
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
      this.btnGroups2.map(item => (item.isChosen = false))
      this.allBtn2.isChosen = true
    },
    // 服务类别点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.cos = ''
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })
      this.queryParam.cos = result.join(',')
    },
    handleTypeChose2 (item) {
      if (item.name === '全部') {
        this.allBtn2.isChosen = true
        this.btnGroups2.map(item => (item.isChosen = false))
        this.queryParam.systemState = ''
        return
      }

      item.isChosen = !item.isChosen

      let len = this.btnGroups2.filter(item => item.isChosen === true).length
      this.allBtn2.isChosen = !len

      let result = []
      this.btnGroups2.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })

      this.queryParam.systemState = result.join(',')
    },
    // 点击当前行
    columnsClick (record, index) {
      return {
        on: {
          click: () => {
            this.currentRowIndex = index
            this.modalUserId = record.id
          }
        }
      }
    },
    // 点击当前行使其高亮
    changeclassname (record, index) {
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 改变时间
    onDatePickChange (date, dateString) {
      this.queryParam.queryTimeStr = dateString[0]
      this.queryParam.queryEndTimeStr = dateString[1]
    },
    // 操作
    handleEdit () {
      if (this.modalUserId === '') {
        this.$notification.error({
          message: '请先选择一条信息'
        })
        return
      }
      this.$refs.modal.edit(this.modalUserId)
    }
  }
}
</script>
<style lang="less">
.customerWrapper {
	.active {
		background-color: rgba(42, 130, 228, 0.3);
	}
}
</style>
