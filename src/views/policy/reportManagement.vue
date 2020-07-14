<template>
	<div class="reportWrapper">
		<h1>行研报告</h1>
		<a-card>
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row>
						<a-col :span="8">
							<a-form-item label="标题：">
								<a-input v-model="queryParam.title"
									placeholder="请输入标题" />
							</a-form-item>
						</a-col>
						<a-col :span="8"
							:offset="4">
							<a-form-item label="发布时间: ">
								<a-range-picker @change="onDateChange"
									v-decorator="['dateRange']" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="8">
							<a-form-item label="报告类型">
								<a-select v-model="queryParam.inforDomain"
									placeholder="请选择类型">
									<a-select-option value="1">私募</a-select-option>
									<a-select-option value="2">信托</a-select-option>
									<a-select-option value="3">银行</a-select-option>
									<a-select-option value="4">保险</a-select-option>
									<a-select-option value="5">证券</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8"
							:offset="4">
							<a-form-item label="发布账号">
								<a-select v-model="queryParam.backendUserName"
									placeholder="请选择账号">
									<a-select-option v-for="item in nameList"
										:value="item"
										:key="item">{{item}}</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-item label="操作状态：">
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
						<a-col :span="12">
							<a-form-item label="排序：">
								<a-select v-model="queryParam.orderName"
									placeholder="请选择"
									style="width:150px;">
									<a-select-option value="read_count">阅读数</a-select-option>
									<a-select-option value="attention_count">关注数</a-select-option>
									<a-select-option value="resend_count">转发数</a-select-option>
								</a-select>
								<a-select v-model="queryParam.sort"
									placeholder="请选择"
									style="width:150px;">
									<a-select-option value="ASC">升序</a-select-option>
									<a-select-option value="DESC">降序</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="20">
							<a-button type="primary"
								@click="$refs.table.refresh(true)">查询</a-button>
							<a-button style="margin-left: 8px"
								@click="resetSearchForm">重置</a-button>
						</a-col>
						<a-col :span="4">
							<a-button style="margin-left: 8px"
								@click="handleAddNew">新增</a-button>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<s-table ref="table"
				style="margin-top:30px;"
				size="default"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="state"
					slot-scope="text,record">
					{{record.state?'启用':'禁用'}}
				</span>
				<span slot="inforDomain"
					slot-scope="text">
					{{text | inforDomainFilter}}
				</span>
				<span slot="orderNum"
					slot-scope="text,record">
					<a-select style="width:100px;"
						:disabled="!record.state"
						:value="(!record.orderNum || record.orderNum === 100) ? '默认' : record.orderNum"
						@change="val => handleOrder(val, record)">
						<a-select-option v-for="item in ['默认',1,2,3,4,5,6,7,8]"
							:key="item"
							:value="item">{{item}}</a-select-option>
					</a-select>
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-popconfirm :title="`是否确定要${record.state?'禁用':'启用'}？`"
							v-auth="$route.meta.dutyName"
							@confirm="confirmForbidden(record)"
							okText="确定"
							cancelText="取消">
							<a>{{record.state?'禁用':'启用'}}</a>
						</a-popconfirm>
						<a-divider type="vertical"
							v-auth="$route.meta.dutyName" />
						<a v-if="record.isNotified"
							v-auth="$route.meta.dutyName">{{record.isNotified?'已推送':'推送'}}</a>
						<a-popconfirm v-else
							v-auth="$route.meta.dutyName"
							title="是否确定要推送？"
							@confirm="confirmPushNew(record)"
							okText="确定"
							cancelText="取消">
							<a>{{record.isNotified?'已推送':'推送'}}</a>
						</a-popconfirm>
						<a-divider type="vertical"
							v-auth="$route.meta.dutyName" />
						<a @click="handleEdit(record)">编辑</a>
					</template>
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import qs from 'qs'
import { STable } from '@/components'
import {
  getReportByList,
  forbidReportById,
  broadcast,
  setReportOrder,
  getUserNameList
} from '@/api/report'

export default {
  name: 'newsManagement',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      nameList: [], // 发布人账号列表
      id: '',
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 2,
          name: '已启用',
          isChosen: false
        },
        {
          id: 3,
          name: '已推送',
          isChosen: false
        }
      ],
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        title: '',
        inforDomain: '',
        isNotified: '', // 已推送
        state: '', // 启用
        start: '', // 开始时间
        end: '', // 结束时间
        orderName: '', // 排序字段
        sort: '', // 排序
        backendUserName: '' // 账号用户名
      },
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '报告类型',
          dataIndex: 'inforDomain',
          scopedSlots: { customRender: 'inforDomain' }
        },
        {
          title: '发布时间',
          dataIndex: 'releaseDate'
        },
        {
          title: '发布账号',
          dataIndex: 'backendUserName'
        },
        {
          title: '阅读数',
          dataIndex: 'readCount'
        },
        {
          title: '关注数',
          dataIndex: 'attentionCount'
        },
        {
          title: '转发数',
          dataIndex: 'resendCount'
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '排序',
          dataIndex: 'orderNum',
          scopedSlots: { customRender: 'orderNum' }
        },
        {
          title: '操作',
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
      loadData: () => {
        if (this.queryParam.orderName !== '' && this.queryParam.sort === '') {
          this.queryParam.sort = 'DESC'
        }
        if (this.queryParam.orderName === '' && this.queryParam.sort !== '') {
          this.queryParam.sort = ''
        }
        return getReportByList(this.queryParam).then(res => {
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
    this.getNameList()
  },
  filters: {
    // 类型
    inforDomainFilter (type) {
      switch (type) {
        case 1:
          return '私募'
        case 2:
          return '信托'
        case 3:
          return '银行'
        case 4:
          return '保险'
        case 5:
          return '证券'
      }
    }
  },
  methods: {
    getNameList () {
      getUserNameList().then(res => {
        this.nameList = res.data
      })
    },
    // 重置
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        title: '',
        inforDomain: '',
        isNotified: '', // 已推送
        state: '', // 启用
        start: '', // 开始时间
        end: '', // 结束时间
        sort: '', // 排序
        orderName: '', // 排序字段
        backendUserName: '' // 账号用户名
      }
      this.resetDatePicker()
      this.resetBtnGroups()
      this.$refs.table.refresh(true)
    },
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    resetBtnGroups () {
      this.secondLevelDIY = ''
      this.companyDIY = ''
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
    },
    // 表格行-推送
    confirmPushNew (record) {
      if (record.isNotified) return
      else if (!record.state) {
        this.$notification.error({
          message: '先启用，再推送！'
        })
        return
      }
      let param = { reportId: record.id }
      broadcast(param).then(res => {
        if (res.code === 200) {
          record.isNotified = !record.isNotified
          this.$notification.success({
            message: '操作成功'
          })
        } else {
          this.$notification.error({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-禁用
    confirmForbidden (record) {
      let param = { id: record.id, type: record.state ? 0 : 1 }
      forbidReportById(param).then(res => {
        if (res.code === 200) {
          record.state = !record.state
          if (!record.state) {
            record.orderNum = '默认'
            // 禁用时恢复默认
            this.handleOrder(record.orderNum, record)
          }
          this.$notification.success({
            message: '操作成功'
          })
        } else {
          this.$notification.error({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-排序
    async handleOrder (val, record) {
      let order = val
      if (val === '默认') order = 100
      const param = {
        id: record.id,
        order
      }
      try {
        const res = await setReportOrder(param)
        if (res.code === 200) {
          record.orderNum = order
          this.$notification.success({
            message: res.msg || '排序成功！'
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        record.orderNum = 100
        this.$notification.error({
          message: message || '最多设置8个排序推荐，请调整或取消其他排序后再试!'
        })
      }
    },
    // 新增->跳转到编辑页
    handleAddNew () {
      this.$router.push({
        name: 'reportAdd'
      })
    },
    // 表格行-编辑
    handleEdit (record) {
      this.$router.push({
        name: 'reportEdit',
        query: {
          id: record.id
        }
      })
    },
    // 操作状态点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.state = ''
        this.queryParam.isNotified = ''
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })
      this.queryParam.state = result.includes(2) ? 1 : ''
      this.queryParam.isNotified = result.includes(3) ? 1 : ''
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    }
    // 修改浏览量
  }
}
</script>

<style lang="less">
.reportWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
}
</style>
