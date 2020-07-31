<template>
	<div class="adManagementWrapper">
		<h1>广告管理</h1>
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
							<a-form-item label="创建时间: ">
								<a-range-picker @change="onDateChange"
									v-decorator="['dateRange']" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="8">
							<a-form-item label="分类">
								<a-select v-model="queryParam.classify"
									placeholder="请选择类型">
									<a-select-option :value="item.code"
										v-for="item in inforDomainList"
										:key="item.code">{{item.msg}}</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8"
							:offset="4">
							<a-form-item label="发布账号">
								<a-select v-model="queryParam.issuer"
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
							<a-form-item label="推广状态：">
								<a-select v-model="queryParam.promotionState"
									placeholder="请选择"
									style="width:150px;">
									<a-select-option :value="0">请选择</a-select-option>
									<a-select-option :value="1">推广中</a-select-option>
									<a-select-option :value="2">等待推广</a-select-option>
									<a-select-option :value="3">已下线</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="排序：">
								<a-select v-model="queryParam.clickRate"
									placeholder="请选择"
									style="width:150px;">
									<a-select-option :value="0">默认</a-select-option>
									<a-select-option :value="1">升序</a-select-option>
									<a-select-option :value="2">降序</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="24">
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
					</a-row>
					<a-row>
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
				<span slot="function"
					slot-scope="text,record">
					{{record.function===1?'启用':'禁用'}}
				</span>
				<span slot="classify"
					slot-scope="text">
					{{text | classifyFilter}}
				</span>
				<span slot="promotionTime"
					slot-scope="text,record">
					{{record.promotionTimeStart}} 至 {{record.promotionTimeEnd}}
				</span>
				<span slot="promotionState"
					slot-scope="text">
					<span :style="{color: text===1?'green':text===3?'red':'#000'}">{{text===1?'推广中':text===3?'已下线':text===2?'等待推广':''}}</span>
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-popconfirm :title="`是否确定要${record.function===1?'禁用':'启用'}？`"
							@confirm="confirmForbidden(record)"
							okText="确定"
							cancelText="取消">
							<a>{{record.function===1?'禁用':'启用'}}</a>
						</a-popconfirm>
						<a-divider type="vertical" />
						<a @click="handleEdit(record)">编辑</a>
					</template>
				</span>
			</s-table>
			<a-modal title="添加/编辑广告图"
				:visible="slideVisible"
				@cancel="handleCancel"
				:footer="null"
				:maskClosable="false"
				:destroyOnClose="true"
				class="slideOperateModal"
				style="width:960px">
				<a-form layout="horizontal"
					:form="forms">
					<a-form-item label="分类："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-select style="width: 180px"
							v-decorator="['subParamType',
								{initialValue:1,rules: [{ required: true, message: '请选择广告分类!', trigger: 'change', type: 'number' }]}
							]"
							@change="handleTypeChange">
							<a-select-option :value="item.code"
								v-for="item in inforDomainList.filter(item=>item.code !== 0)"
								:key="item.code">{{item.msg}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col="{ span: 3 }"
						:wrapper-col="{ span: 20 }">
						<span slot="label"><em style="color:red;">*</em> 图片</span>
						<p style="color:red;margin:0;">{{tip}}</p>
						<single-img-upload :actionUrl="`${uploadUrl}?id=${isEdit?rowId:id}`"
							:uploadInfo="uploadInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="handleUploadChange"
							@handleRemoveUpload="handleRemoveUpload"
							@handleDeleteUpload="handleDeleteUpload"></single-img-upload>
					</a-form-item>
					<!-- <a-form-item label="顺序："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-input-number disabled
							:min="0"
							v-decorator="['subParamOrder']"></a-input-number>
					</a-form-item> -->
					<a-form-item label="标题："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 20 }">
						<a-input :maxLength="50"
							placeholder="请填写广告标题"
							v-decorator="['subParamTitle',
								{rules: [{ required: true, message: '请填写广告标题!', trigger: 'change' }]}
							]"></a-input>
					</a-form-item>
					<a-form-item label="链接："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-input placeholder="请填写跳转的链接地址"
							v-decorator="['subParamWeb']"></a-input>
					</a-form-item>
					<a-form-item label="推广日期："
						:label-col="{ span: 4 }"
						:wrapper-col="{ span: 12 }">
						<a-range-picker show-time
							@change="onDatePickChange"
							v-decorator="['dateRanges', { initialValue: dateRanges,rules: [{ required: true, message: '请选择时间!', trigger: 'change',type:'array' }] }]" />
					</a-form-item>
				</a-form>
				<div class="btnWrapper">
					<a-button @click="handleCancel">关闭</a-button>
					<a-button @click="handleReset">重置</a-button>
					<a-button @click="handleSubmit">提交</a-button>
				</div>
			</a-modal>
		</a-card>
	</div>

</template>

<script>
import moment from 'moment'
import qs from 'qs'
import Vue from 'vue'
import { STable, SingleImgUpload } from '@/components'
import {
  prepareAdvertisement,
  addAdvertisement,
  editAdvertisement,
  showAdvertisement,
  editFunction,
  showOwnership,
  showAdvertisements,
  uploadUrl
} from '@/api/adManagement'

const inforDomainList = [
  {
    code: 0,
    msg: '默认'
  },
  {
    code: 1,
    msg: 'APP闪屏广告-平台'
  },
  {
    code: 2,
    msg: 'APP闪屏广告-广告'
  },
  {
    code: 3,
    msg: '首页插屏广告-平台'
  },
  {
    code: 4,
    msg: '首页插屏广告-广告'
  }
]

export default {
  name: 'adManagement',
  components: {
    SingleImgUpload,
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      forms: this.$form.createForm(this),
      id: '',
      rowId: '',
      isEdit: false,
      slideVisible: false,
      tip: '闪屏广告图片尺寸：375*812,图片大小不能超过1M',
      uploadUrl: '',
      uploadInfo: {
        fileList: [],
        showOffList: {}
      },
      inforDomainList,
      dateRanges: [],
      promotionTimeStart: '',
      promotionTimeEnd: '',
      nameList: [], // 发布人账号列表
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 2,
          name: '已启用',
          isChosen: false
        }
      ],
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        title: '',
        queryTimeBegin: '', // 开始时间
        queryTimeEnd: '', // 结束时间
        classify: 0,
        issuer: '', // 账号用户名
        clickRate: 0, // 排序
        operatingStatus: 0, // 启用
        promotionState: 0
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
          title: '分类',
          dataIndex: 'classify',
          scopedSlots: { customRender: 'classify' }
        },
        {
          title: '发布时间',
          dataIndex: 'updateTime'
        },
        {
          title: '推广时间',
          dataIndex: 'promotionTime',
          scopedSlots: { customRender: 'promotionTime' }
        },
        {
          title: '推广状态',
          dataIndex: 'promotionState',
          scopedSlots: { customRender: 'promotionState' }
        },
        {
          title: '发布账号',
          dataIndex: 'issuer'
        },
        {
          title: '阅读数',
          dataIndex: 'clickRate'
        },
        {
          title: '状态',
          dataIndex: 'function',
          scopedSlots: { customRender: 'function' }
        },
        // {
        //   title: '顺序',
        //   dataIndex: 'bannerOrder'
        // },
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
        return showAdvertisements(this.queryParam).then(res => {
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
    this.uploadUrl = uploadUrl
    this.getNameList()
  },
  methods: {
    async getNameList () {
      try {
        const res = await showOwnership()
        if (res.code === 200) {
          this.nameList = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    async prepareAdvertisement () {
      try {
        const res = await prepareAdvertisement()
        if (res.code === 200) {
          this.id = res.data.id
          this.slideVisible = true
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    async handleEdit (record) {
      this.rowId = record.id
      this.isEdit = true
      try {
        const {
          code,
          data: {
            picUrl,
            classify,
            title,
            link,
            bannerOrder,
            promotionTimeStart,
            promotionTimeEnd
          },
          msg
        } = await showAdvertisement({ id: record.id })
        if (code === 200) {
          this.slideVisible = true
          this.uploadInfo.showOffList.winPath = picUrl
          this.uploadInfo.showOffList.fileUrl = picUrl
          if (classify === 1 || classify === 2) {
            this.tip = '闪屏广告图片尺寸：375*812,图片大小不能超过1M'
          } else {
            this.tip = '插屏广告图片尺寸：316*406,图片大小不能超过1M'
          }
          this.$nextTick(() => {
            this.dateRanges = this.backupServiceExp(
              promotionTimeStart,
              promotionTimeEnd
            )
            this.forms.setFieldsValue({
              subParamType: classify,
              subParamTitle: title,
              subParamWeb: link,
              subParamOrder: bannerOrder
            })
          })
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    backupServiceExp (startTime, endTime) {
      if (startTime) {
        this.promotionTimeStart = startTime
        this.promotionTimeEnd = endTime
        return [moment(startTime), moment(endTime)]
      }
      return [undefined, undefined]
    },
    // 移除待上传
    handleRemoveUpload ({ response: { data } }) {
      this.uploadInfo.fileList = []
    },
    // 删除已上传图片
    handleDeleteUpload (item) {
      this.uploadInfo.showOffList = {}
    },

    // 重置
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        title: '',
        queryTimeBegin: '', // 开始时间
        queryTimeEnd: '', // 结束时间
        classify: 0,
        issuer: '', // 账号用户名
        clickRate: 0, // 排序
        operatingStatus: 0, // 启用
        promotionState: 0
      }
      this.resetDatePicker()
      this.resetBtnGroups()
      this.$refs.table.refresh(true)
    },
    resetDatePickers () {
      this.forms.setFieldsValue({
        dateRanges: undefined
      })
    },
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: undefined
      })
    },
    resetBtnGroups () {
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
    },
    // 表格行-禁用
    confirmForbidden (record) {
      let param = {
        id: record.id,
        function: record.function === 1 ? 2 : 1
      }
      editFunction(param).then(res => {
        if (res.code === 200) {
          record.function = record.function === 1 ? 2 : 1
          this.$notification.success({
            message: res.msg || '操作成功'
          })
        } else {
          this.$notification.error({
            message: res.msg || '操作失败，请重试'
          })
        }
      })
    },
    // 操作状态点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.operatingStatus = 0
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) result.push(item.id)
      })
      this.queryParam.operatingStatus = result.includes(2) ? 1 : 0
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.queryTimeBegin = dateString[0]
      this.queryParam.queryTimeEnd = dateString[1]
    },
    // 预览图片
    handlePreviewImg (file) {
      if (file && (file.winPath || file.response.data.winPath)) {
        window.open(file.winPath || file.response.data.winPath, '_blank')
      }
    },
    // 直接上传
    handleUploadChange ({ fileList }, type) {
      this.uploadInfo.fileList = fileList
    },
    handleTypeChange (value) {
      if (value === 1 || value === 2) {
        this.tip = '闪屏广告图片尺寸：375*812,图片大小不能超过1M'
      } else {
        this.tip = '插屏广告图片尺寸：316*406,图片大小不能超过1M'
      }
    },
    // 改变时间
    onDatePickChange (date, dateString) {
      this.promotionTimeStart = dateString[0]
      this.promotionTimeEnd = dateString[1]
    },
    handleReset () {
      this.forms.setFieldsValue({
        subParamType: 1,
        subParamTitle: '',
        subParamWeb: '',
        subParamOrder: ''
      })
      this.resetDatePickers()
      if (this.uploadInfo.fileList) {
        this.uploadInfo.fileList = []
      }
      if (this.uploadInfo.showOffList.winPath) {
        this.uploadInfo.showOffList = {}
      }
    },
    handleSubmit () {
      const {
        forms: { getFieldsValue, validateFields },
        uploadInfo: { fileList, showOffList },
        $notification: { success, error },
        id,
        rowId,
        $refs: { table },
        handleCancel,
        isEdit,
        promotionTimeStart,
        promotionTimeEnd
      } = this
      if (!fileList.length && !showOffList.winPath) {
        error({
          message: '请上传广告图'
        })
        return
      }
      const {
        subParamTitle,
        subParamType,
        subParamOrder,
        subParamWeb
      } = getFieldsValue([
        'subParamOrder',
        'subParamWeb',
        'subParamTitle',
        'subParamType'
      ])

      let param = {
        issuer: JSON.parse(Vue.ls.get('USERINFO')).username,
        title: subParamTitle,
        classify: subParamType,
        bannerOrder: subParamOrder,
        link: subParamWeb,
        promotionTimeStart,
        promotionTimeEnd
      }
      validateFields(['subParamTitle', 'subParamType'], async err => {
        if (!err) {
          try {
            let res = {}
            if (!isEdit) {
              param.id = id
              res = await addAdvertisement(param)
            } else {
              param.id = rowId
              res = await editAdvertisement(param)
            }
            if (res.code === 200) {
              success({
                message: res.msg || '提交成功！'
              })
              this.id = ''
              this.rowId = ''
              table.refresh(false)
              handleCancel()
            } else {
              throw new Error(res.msg)
            }
          } catch ({ message }) {
            error({
              message: message || '提交失败，请重试！'
            })
          }
        }
      })
    },
    // 新增->跳转到编辑页
    handleAddNew () {
      this.prepareAdvertisement()
    },
    handleCancel () {
      this.slideVisible = false
      this.isEdit = false
      this.handleReset()
    }
  },
  filters: {
    // 类型
    classifyFilter (type) {
      switch (type) {
        case 1:
          return 'APP闪屏广告-平台'
        case 2:
          return 'APP闪屏广告-广告'
        case 3:
          return '首页插屏广告-平台'
        case 4:
          return '首页插屏广告-广告'
        default:
          return '默认'
      }
    }
  }
}
</script>

<style lang="less">
.adManagementWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
}
.slideOperateModal {
	.btnWrapper {
		.ant-btn {
			margin-right: 10px;
		}
	}
}
</style>
