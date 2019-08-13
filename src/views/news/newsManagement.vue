<template>
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
						<a-form-item label="资讯类型">
							<a-select v-model="queryParam.inforDomain"
								placeholder="请选择类型">
								<a-select-option value="1">信托</a-select-option>
								<a-select-option value="2">房产</a-select-option>
								<a-select-option value="3">私募基金</a-select-option>
								<a-select-option value="4">保险</a-select-option>
								<a-select-option value="5 ">理财</a-select-option>
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
							@click="handleAddNew"
							v-auth="$route.meta.dutyName">新增</a-button>
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
			<span slot="isTop"
				slot-scope="text">
				{{text == 0?'否':'是'}}
			</span>
			<span slot="isHot"
				slot-scope="text">
				{{text == 0?'否':'是'}}
			</span>
			<span slot="scannCount"
				slot-scope="text,record">
				<span @click="handleEditScannCount(record)">{{text}}</span>
			</span>
			<span slot="action"
				slot-scope="text, record"
				v-auth="$route.meta.dutyName">
				<template>
					<a-popconfirm :title="`是否确定要${Number(record.isTop)?'取消置顶':'置顶'}？`"
						@confirm="confirmTop(record)"
						okText="确定"
						cancelText="取消">
						<a>{{Number(record.isTop)?'取消置顶':'置顶'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a-popconfirm :title="`是否确定要${Number(record.isHot)?'取消热门':'热门'}？`"
						@confirm="confirmHot(record)"
						okText="确定"
						cancelText="取消">
						<a>{{Number(record.isHot)?'取消热门':'热门'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a-popconfirm :title="`是否确定要${record.state?'禁用':'启用'}？`"
						@confirm="confirmForbidden(record)"
						okText="确定"
						cancelText="取消">
						<a>{{record.state?'禁用':'启用'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a v-if="record.isNotified">{{record.isNotified?'已推送':'推送'}}</a>
					<a-popconfirm v-if="!record.isNotified"
						title="是否确定要推送？"
						@confirm="confirmPushNew(record)"
						okText="确定"
						cancelText="取消">
						<a>{{record.isNotified?'已推送':'推送'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a @click="handleEdit(record)">编辑</a>
				</template>
			</span>
		</s-table>
		<a-modal title="输入浏览量"
			:visible="scannVisible"
			@ok="handleScannOk"
			@cancel="handleScannCancel">
			<a-input-number :min="initScannValue"
				v-model="scannValue"
				autoFocus
				style="width:200px;" />
			<p style='color:red;'>仅支持增加点击量</p>
		</a-modal>
	</a-card>
</template>

<script>
import qs from 'qs'
import { STable } from '@/components'
import {
  getNewsList,
  getTop,
  getHot,
  getEnable,
  getBroadcast,
  getUserNameList,
  getUpdateScannCount
} from '@/api/newsManage'

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
      initScannValue: 0,
      scannVisible: false, // 编辑浏览量
      scannValue: 0,
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 0,
          name: '已置顶',
          isChosen: false
        },
        {
          id: 1,
          name: '已热门',
          isChosen: false
        },
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
        isTop: '', // 置顶
        isHot: '', // 热门
        isNotified: '', // 已推送
        state: '', // 启用
        start: '', // 开始时间
        end: '', // 结束时间
        sort: '', // 排序
        orderName: '', // 排序字段
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
          title: '类型',
          dataIndex: 'inforDomain',
          scopedSlots: { customRender: 'inforDomain' }
        },
        {
          title: '热门',
          dataIndex: 'isHot',
          scopedSlots: { customRender: 'isHot' }
        },
        {
          title: '置顶',
          dataIndex: 'isTop',
          scopedSlots: { customRender: 'isTop' }
        },
        {
          title: '发布时间',
          dataIndex: 'release'
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
          title: '编辑浏览量',
          dataIndex: 'scannCount',
          scopedSlots: { customRender: 'scannCount' }
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
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
        onChange: page => (this.queryParam.startPage = page)
      },
      loadData: () => {
        if (this.queryParam.orderName !== '' && this.queryParam.sort === '') {
          this.queryParam.sort = 'DESC'
        }
        if (this.queryParam.orderName === '' && this.queryParam.sort !== '') {
          this.queryParam.sort = ''
        }
        return getNewsList(this.queryParam).then(res => {
          res.data.data = res.data.list
          res.data.pageNo = res.data.pageNum
          res.data.totalPage = res.data.pages
          res.data.totalCount = res.data.total

          delete res.data.list
          delete res.data.pageNum
          delete res.data.pages
          delete res.data.total
          return res.data
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
          return '信托'
        case 2:
          return '房产'
        case 3:
          return '私募基金'
        case 4:
          return '保险'
        case 5:
          return '理财'
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
        isTop: '', // 置顶
        isHot: '', // 热门
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
    // 表格行-置顶
    confirmTop (record) {
      let param = { id: record.id, isTop: Number(record.isTop) ? 0 : 1 }
      getTop(param).then(res => {
        if (res.code === 200) {
          record.isTop = !Number(record.isTop)
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-热门
    confirmHot (record) {
      let param = { id: record.id, isHot: Number(record.isHot) ? 0 : 1 }
      getHot(param).then(res => {
        if (res.code === 200) {
          record.isHot = !Number(record.isHot)
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-禁用
    confirmForbidden (record) {
      let param = { id: record.id, state: record.state ? 0 : 1 }
      getEnable(param).then(res => {
        if (res.code === 200) {
          record.state = !record.state
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-推送
    confirmPushNew (record) {
      if (record.isNotified) return
      let param = { infoId: record.id }
      getBroadcast(param).then(res => {
        if (res.code === 200) {
          record.isNotified = !record.isNotified
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-编辑
    handleEdit (record) {
      this.$router.push({
        path: '/news/newsedit',
        query: {
          id: record.id
        }
      })
    },
    // 表格行-编辑浏览量
    handleEditScannCount (record) {
      this.scannValue = record.scannCount
      this.initScannValue = record.scannCount
      this.id = record.id
      this.scannVisible = true
    },
    // 新增->跳转到编辑页
    handleAddNew () {
      this.$router.push({
        path: '/news/newsadd'
      })
    },
    // 操作状态点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.isTop = ''
        this.queryParam.isHot = ''
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
      this.queryParam.isTop = result.includes(0) ? 1 : ''
      this.queryParam.isHot = result.includes(1) ? 1 : ''
      this.queryParam.state = result.includes(2) ? 1 : ''
      this.queryParam.isNotified = result.includes(3) ? 1 : ''
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    // 修改浏览量
    handleScannOk () {
      let param = {
        id: this.id,
        scannCount: this.scannValue
      }
      getUpdateScannCount(param).then(res => {
        if (res.code === 200) {
          this.$notification.success({
            message: '编辑成功！'
          })
          this.scannVisible = false
          this.$refs.table.refresh(true)
        } else {
          this.$notification.success({
            message: '编辑失败，请重试！'
          })
        }
      })
    },
    handleScannCancel () {
      this.scannVisible = false
      this.id = ''
    }
  }
}
</script>
