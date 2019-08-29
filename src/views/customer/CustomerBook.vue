<template>
	<div class="custormerBookWrapper">
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
				<span slot="userId"
					slot-scope="text">{{text}}</span>
				<span slot="cos"
					slot-scope="text">
					{{text == 0?'体检预约':'保单咨询'}}
				</span>
				<span slot="serviceState"
					slot-scope="text">
					{{text == 0?'未服务':text == 1?'已服务':'信息有误'}}
				</span>
			</s-table>
			<!-- 这个不可以删除  是用来展示模态框的 -->
			<BookTest ref="bookTest"
				@saveOk="$refs.table.refresh(true)" />
			<FeedBack ref="feedBack"
				@saveOk="$refs.table.refresh(true)" />
		</a-card>
	</div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import BookTest from './modules/BookTest'
import FeedBack from './modules/FeedBack'
import { getMultipleConsultServiceList } from '@/api/customer'

export default {
  name: 'customerBook',
  components: {
    STable,
    BookTest,
    FeedBack
  },
  data () {
    return {
      form: this.$form.createForm(this),
      currentRowIndex: '',
      id: '',
      type: '',
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 0,
          name: '体检预约',
          isChosen: false
        },
        {
          id: 1,
          name: '保单咨询',
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
          name: '未服务',
          isChosen: false
        },
        {
          id: 1,
          name: '已服务',
          isChosen: false
        },
        {
          id: 2,
          name: '信息有误',
          isChosen: false
        }
      ],
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        userId: '',
        cosStr: '',
        serviceStateStr: '',
        queryTimeStr: '',
        queryEndTimeStr: ''
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
          title: '用户ID',
          dataIndex: 'userId',
          align: 'center',
          width: 10
        },
        {
          title: '用户昵称',
          dataIndex: 'petName',
          align: 'center',
          width: 10
        },
        {
          title: '联系方式',
          dataIndex: 'mobile',
          align: 'center',
          width: 10
        },
        {
          title: '服务类别',
          dataIndex: 'cos',
          align: 'center',
          scopedSlots: { customRender: 'cos' },
          width: 10
        },
        {
          title: '问题描述',
          dataIndex: 'problemDescription',
          width: 10
        },
        {
          title: '提交时间',
          align: 'center',
          dataIndex: 'updateTime',
          width: 10
        },
        {
          title: '反馈信息',
          align: 'center',
          dataIndex: 'feedbackInformation',
          width: 20
        },
        {
          title: '反馈人',
          align: 'center',
          dataIndex: 'feedbackPerson',
          width: 20
        },
        {
          title: '服务状态',
          align: 'center',
          dataIndex: 'serviceState',
          scopedSlots: { customRender: 'serviceState' },
          width: 20
        }
      ],
      loadData: () => {
        return getMultipleConsultServiceList(this.queryParam).then(res => {
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
        userId: '',
        cosStr: '0,1',
        serviceStateStr: '0,1,2',
        queryTimeStr: '',
        queryEndTimeStr: ''
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
        this.queryParam.cosStr = ''
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })
      this.queryParam.cosStr = result.join(',')
    },
    handleTypeChose2 (item) {
      if (item.name === '全部') {
        this.allBtn2.isChosen = true
        this.btnGroups2.map(item => (item.isChosen = false))
        this.queryParam.serviceStateStr = ''
        return
      }

      item.isChosen = !item.isChosen

      let len = this.btnGroups2.filter(item => item.isChosen === true).length
      this.allBtn2.isChosen = !len

      let result = []
      this.btnGroups2.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })

      this.queryParam.serviceStateStr = result.join(',')
    },
    // 点击当前行
    columnsClick (record, index) {
      return {
        on: {
          click: () => {
            this.currentRowIndex = index
            this.id = record.id
            this.type = record.cos
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
      if (this.id === '') {
        this.$notification.error({
          message: '请先选择一条信息再体检'
        })
        return
      }
      if (this.type) {
        this.$refs.feedBack.edit(this.id)
      } else {
        this.$refs.bookTest.edit(this.id)
      }
    }
  }
}
</script>
<style lang="less">
.custormerBookWrapper {
	.active {
		background-color: rgba(42, 130, 228, 0.3);
	}
}
</style>
