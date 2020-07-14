<template>
	<div class="businessAuthListWrapper">
		<h2>申请列表</h2>
		<div class="nameWrapper">
			<h3>{{companyName}}</h3>
			<a-button ghost
				disabled>{{Number(companyStatus)===0?'未认证':Number(companyStatus)===1?'认证中':Number(companyStatus)===2?'已认证':'已过期'}}</a-button>
		</div>
		<a-card :bordered="false">
			<div class="table-page-search-wrapper">
				<a-form layout="inline"
					:form="form">
					<a-row :gutter="24"
						style="margin-top:30px;">
						<a-col :span="3">
							<a-form-item label="联系人姓名：">
								<a-input v-model="queryParam.name"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="联系人电话：">
								<a-input v-model="queryParam.phone"
									placeholder="请输入" />
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item label="创建来源：">
								<a-select v-model="queryParam.createSources">
									<a-select-option v-for="item in belongNameList"
										:value="item"
										:key="item">
										{{item}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="企业状态： ">
								<a-select v-model="queryParam.companyStatus">
									<a-select-option v-for="item in actionList"
										:value="item.id"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="3">
							<a-form-item label="工单状态： ">
								<a-select v-model="queryParam.workOrderStatus">
									<a-select-option v-for="item in ticketList"
										:value="item.id"
										:key="item.id">
										{{item.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-button type="primary"
								@click="$refs.table.refresh(false)">查询</a-button>
							<a-button style="margin-left: 8px"
								@click="resetSearchForm">重置</a-button>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<div style="display:flex;justify-content:space-between;">
				<a-button type="primary"
					@click="handleBack">返回</a-button>
				<a-button type="primary"
					@click="handleBatchFenPei"
					v-auth="$route.meta.dutyName">批量分配</a-button>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="phone"
					slot-scope="text">
					{{text.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}}
				</span>
				<span slot="communicationStatus"
					slot-scope="text"
					:style="{color:Number(text)===0?'#000':Number(text)===1?'#000':Number(text)===2?'green':'red'}">
					{{Number(text)===0?'未沟通':Number(text)===1?'已签约':Number(text)===2?'有意向':Number(text)===3?'仅咨询':Number(text)===4?'无意向':'其他'}}
				</span>
				<span slot="workOrderStatus"
					slot-scope="text"
					:style="{color:Number(text)===0?'#000':Number(text)===1?'#000':Number(text)===2?'green':'red'}">
					{{Number(text)===0?'等待处理':Number(text)===1?'处理中':Number(text)===2?'已完结':'已过期'}}
				</span>
				<span slot="companyStatus"
					slot-scope="text"
					:style="{color:Number(text)===0?'#000':Number(text)===1?'#000':Number(text)===2?'green':'red'}">
					{{Number(text)===0?'未认证':Number(text)===1?'认证中':Number(text)===2?'已认证':'已过期'}}
				</span>
				<span slot="operate"
					slot-scope="text,record"
					style="cursor:pointer;">
					<a-button @click="handleOperate(record)"
						style="margin-right:10px;background:rgb(67, 207, 124);color:#fff;">处理</a-button>
					<a-button @click="handleSingleFenpei(record)"
						style="margin-right:10px;background:rgb(42, 130, 228);color:#fff;"
						v-auth="$route.meta.dutyName">分配</a-button>
					<a-button @click="handleAuth(record)"
						style="margin-right:10px;background:rgb(255, 141, 26);color:#fff;">认证</a-button>
					<a-button @click="handleSet(record)"
						style="background:rgb(166, 166, 166);color:#fff;"
						v-auth="$route.meta.dutyName">设置</a-button>
				</span>
			</s-table>
		</a-card>
		<auth-modal :modalInfo="modalInfo"
			@modalSubmit="modalSubmit"
			@modalCancel="modalCancel">
			<template v-if="modalInfo.isFenpei&&modalInfo.isBatch">
				<p>
					企业名称：
					<span>
						{{companyName}}
					</span>
				</p>
				<div style="margin-top:10px;">
					<span style="color:red;">{{modalInfo.subTitle}}</span>
					<a-select style="width: 40%"
						showSearch
						placeholder="搜索员工姓名或关键字"
						labelInValue
						:filterOption="false"
						:showArrow="false"
						:value="searchKey"
						:notFoundContent="fetching ? undefined : '暂无数据'"
						@search="fetchUser"
						@change="handleSearchDataChange">
						<a-spin v-if="fetching"
							slot="notFoundContent"
							size="small" />
						<a-select-option v-for="d in searchData"
							:key="d.id">{{d.username}}</a-select-option>
					</a-select>
				</div>
			</template>
			<template v-else-if="modalInfo.isFenpei&&!modalInfo.isBatch">
				<p>
					申请认证企业：
					<span>
						{{singleTickerInfo.companyName}}
					</span>
				</p>
				<p>
					提交申请日期：
					<span>
						{{singleTickerInfo.applicationTime}}
					</span>
				</p>
				<a-card>
					<a-card-grid style="width:25%;textAlign:'center'">联系人姓名</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">{{singleTickerInfo.name}}</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">联系人职位</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">{{singleTickerInfo.position}}</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">联系人电话</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">{{singleTickerInfo.phone.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}}</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">创建来源</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">{{singleTickerInfo.createSources}}</a-card-grid>
				</a-card>
				<div style="margin-top:10px;">
					<span>{{modalInfo.subTitle}}</span>
					<a-select style="width: 40%"
						placeholder="搜索员工姓名或关键字："
						showSearch
						labelInValue
						:value="searchKey"
						:showArrow="false"
						:filterOption="false"
						:notFoundContent="fetching ? undefined : '暂无数据'"
						@search="fetchUser"
						@change="handleSearchDataChange">
						<a-spin v-if="fetching"
							slot="notFoundContent"
							size="small" />
						<a-select-option v-for="d in searchData"
							:key="d.id">{{d.username}}</a-select-option>
					</a-select>
				</div>
			</template>
			<template v-else>
				<div>
					<p>
						企业名称：
						<span>
							{{companyName}}
						</span>
					</p>
					<p>
						工单归属：
						<span>
							{{workOrderAttribution}}
						</span>
					</p>
					<p>
						工单状态：
						<span>
							<a-radio-group :options="plainOptions"
								v-model="workOrderStatus" />
						</span>
					</p>
				</div>
			</template>
		</auth-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { AuthModal } from './../../components/index'
import { STable } from '@/components'
import {
  workforceMultipleConditional,
  createSources,
  getBackendUserData,
  singleWorkforce,
  assignment,
  setWorkOrderStatus,
  identificationButton
} from '@/api/businessAuth'
import debounce from 'lodash/debounce'

const plainOptions = [
  { value: 0, label: '等待处理' },
  { value: 1, label: '处理中' },
  { value: 2, label: '已完结' },
  { value: 3, label: '已过期' }
]

const actionList = [
  {
    id: 9,
    name: '请选择'
  },
  {
    id: 0,
    name: '未认证'
  },
  {
    id: 1,
    name: '认证中'
  },
  {
    id: 2,
    name: '已认证'
  },
  {
    id: 3,
    name: '已过期'
  }
]

const ticketList = [
  {
    id: 9,
    name: '请选择'
  },
  {
    id: 0,
    name: '等待处理'
  },
  {
    id: 1,
    name: '处理中'
  },
  {
    id: 2,
    name: '已完结'
  },
  {
    id: 3,
    name: '已过期'
  }
]

const belongNameList = ['请选择']

const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '联系人名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '联系人职位',
    dataIndex: 'position',
    align: 'center'
  },
  {
    title: '联系人电话',
    dataIndex: 'phone',
    align: 'center',
    scopedSlots: { customRender: 'phone' }
  },
  {
    title: '创建来源',
    dataIndex: 'createSources',
    align: 'center'
  },
  {
    title: '申请时间',
    align: 'center',
    dataIndex: 'applicationTime'
  },
  {
    title: '沟通状态',
    dataIndex: 'communicationStatus',
    align: 'center',
    scopedSlots: { customRender: 'communicationStatus' }
  },
  {
    title: '工单归属',
    dataIndex: 'workOrderAttribution',
    align: 'center'
  },
  {
    title: '工单状态',
    dataIndex: 'workOrderStatus',
    align: 'center',
    scopedSlots: { customRender: 'workOrderStatus' }
  },
  {
    title: '企业状态',
    dataIndex: 'companyStatus',
    align: 'center',
    scopedSlots: { customRender: 'companyStatus' }
  },
  {
    title: '最后更新时间',
    align: 'center',
    dataIndex: 'lastUpdateTime'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'operate' }
  }
]

export default {
  name: 'businessAuthList',
  components: {
    STable,
    AuthModal
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      form: this.$form.createForm(this),
      actionList,
      ticketList,
      belongNameList,
      rowSelection: {
        selectedRowKeys: this.selectedRowKeys
      },
      columns,
      plainOptions,
      singleTickerInfo: {},
      workOrderAttribution: '',
      workOrderStatus: 0,
      companyName: '',
      companyStatus: '',
      selectedRowKeys: [],
      searchKey: '',
      searchData: [],
      fetching: false,
      modalInfo: {
        title: '',
        subTitle: '',
        visible: false,
        isBatch: false,
        isFenpei: false
      },
      queryParam: {
        startPage: 1,
        pageSize: 10,
        companyUrl: '',
        name: '',
        phone: '',
        createSources: '请选择',
        companyStatus: 9,
        workOrderStatus: 9
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
        let param = {
          ...this.queryParam,
          createSources:
						this.queryParam.createSources === '请选择'
						  ? ''
						  : this.queryParam.createSources
        }
        return workforceMultipleConditional(param).then(res => {
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
  computed: {
    hasSelected () {
      return this.selectedRowKeys
    }
  },
  created () {
    const {
      $route: {
        query: { companyUrl, companyName, companyStatus, companyStyle }
      }
    } = this

    this.queryParam.companyUrl = companyUrl
    this.companyName = companyName
    this.companyStatus = companyStatus
    this.companyType = companyStyle
    this.getCreateResources()
  },
  methods: {
    async getCreateResources () {
      try {
        const { code, data, msg } = await createSources()
        if (code === 200) {
          this.belongNameList = [...this.belongNameList, ...data]
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async getSingleTicket ({ id }) {
      try {
        const { code, data, msg } = await singleWorkforce({ id })
        if (code === 200) {
          this.singleTickerInfo = data
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async assignment () {
      const {
        searchKey: { key },
        modalInfo: { isBatch },
        selectedRowKeys,
        singleTickerInfo: { id },
        $notification: { success, error }
      } = this
      let param = {
        backendUserId: key,
        operatingPersonnel: JSON.parse(Vue.ls.get('USERINFO')).username,
        resourceIds: isBatch ? selectedRowKeys.join(',') : id
      }
      try {
        const { code, data, msg } = await assignment(param)
        if (code === 200) {
          success({
            message: msg || '分配成功'
          })
          this.$refs.table.refresh()
          this.searchKey = ''
          this.modalInfo.visible = false
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async fetchUser (value) {
      this.fetching = true
      try {
        const { code, data, msg } = await getBackendUserData({
          username: value
        })
        if (code === 200) {
          this.searchData = data.list
          this.fetching = false
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.fetching = false
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async setWorkOrderStatus () {
      const {
        singleTickerInfo: { id },
        workOrderStatus
      } = this
      const param = {
        id,
        workOrderStatus
      }
      try {
        const { code, data, msg } = await setWorkOrderStatus(param)
        if (code === 200) {
          this.$refs.table.refresh()
          this.modalInfo.visible = false
          this.$notification.success({
            message: msg || '修改成功！'
          })
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async identificationButton () {
      const {
        companyName,
        companyType,
        singleTickerInfo: { id },
        $route: {
          query: { companyUrl }
        }
      } = this
      const param = {
        id,
        companyUrl,
        operatingPersonnel: JSON.parse(Vue.ls.get('USERINFO')).username
      }

      try {
        const { code, data, msg } = await identificationButton(param)
        if (code === 200) {
          this.$router.push({
            name:
							data.editFlag === 0
							  ? 'addInstitution'
							  : data.editFlag === 1
							    ? 'editInstitution'
							    : 'viewInstitution',
            query: {
              isAuth: true,
              id: data.insId,
              ticketId: id,
              companyName,
              companyUrl,
              companyType,
              type: data.examineState
            }
          })
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = Object.assign(this.queryParam, {
        startPage: 1,
        pageSize: 10,
        name: '',
        phone: '',
        createSources: '请选择',
        companyStatus: 9,
        workOrderStatus: 9
      })

      this.$refs.table.refresh(true)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleSingleFenpei (record) {
      Object.assign(this.modalInfo, {
        title: '分配工单',
        subTitle: '设置工单分配对象',
        visible: true,
        isBatch: false,
        isFenpei: true
      })
      this.getSingleTicket(record)
    },
    handleBatchFenPei () {
      Object.assign(this.modalInfo, {
        title: '批量分配工单',
        subTitle: `将 ${this.selectedRowKeys.length} 条工单批量分配给员工：`,
        visible: true,
        isBatch: true,
        isFenpei: true
      })
    },
    handleSearchDataChange (value) {
      Object.assign(this, {
        searchKey: value,
        searchData: [],
        fetching: false
      })
    },
    handleOperate (record) {
      this.$router.push({
        name: 'businessAuthHandle',
        query: {
          id: record.id
        }
      })
    },
    handleAuth (record) {
      this.singleTickerInfo.id = record.id
      this.identificationButton()
    },
    handleSet (record) {
      Object.assign(this.modalInfo, {
        title: '设置工单状态',
        subTitle: '',
        visible: true,
        isBatch: false,
        isFenpei: false
      })
      this.workOrderAttribution = record.workOrderAttribution
      this.workOrderStatus = record.workOrderStatus
      this.singleTickerInfo.id = record.id
    },
    modalSubmit () {
      if (this.modalInfo.isFenpei) {
        this.assignment()
      } else {
        this.setWorkOrderStatus()
      }
    },
    modalCancel () {
      this.searchKey = ''
      this.modalInfo.visible = false
    },
    handleBack () {
      this.$router.push({
        path: '/institutionsmanage/businessAuth'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.businessAuthListWrapper {
	h2 {
		font-weight: bold;
	}
	.nameWrapper {
		margin-bottom: 20px;
		h3 {
			font-weight: bold;
			display: inline-block;
		}
		.ant-btn {
			margin-left: 20px;
			color: #000;
			border-color: #000;
		}
	}
}
</style>
