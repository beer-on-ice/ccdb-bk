<template>
	<div class="slideManagementWrapper">
		<h1>轮播图管理</h1>
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
							<a-form-item label="分类">
								<a-select v-model="queryParam.bannerType"
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
								<a-select v-model="queryParam.order"
									placeholder="请选择"
									style="width:150px;">
									<a-select-option value="1">升序</a-select-option>
									<a-select-option value="2">降序</a-select-option>
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
				<span slot="bannerType"
					slot-scope="text">
					{{text | bannerTypeFilter}}
				</span>
				<span slot="action"
					slot-scope="text, record">
					<template>
						<a-popconfirm :title="`是否确定要${record.state?'禁用':'启用'}？`"
							@confirm="confirmForbidden(record)"
							okText="确定"
							cancelText="取消">
							<a>{{record.state?'禁用':'启用'}}</a>
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
								{rules: [{ required: true, message: '请选择广告分类!', trigger: 'change',type: 'number' }]}
							]"
							@change="handleTypeChange">
							<a-select-option :value="item.code"
								v-for="item in inforDomainList"
								:key="item.code">{{item.msg}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<span slot="label"><em style="color:red;">*</em> 图片</span>
						<p style="color:red;margin:0;">{{tip}}</p>
						<single-img-upload :actionUrl="`${uploadUrl}`"
							:uploadInfo="uploadInfo"
							@handleUploadChange="handleUploadChange"
							@handleRemoveUpload="handleRemoveUpload"
							@handleDeleteUpload="handleDeleteUpload"></single-img-upload>
					</a-form-item>
					<a-form-item label="顺序："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-input-number :min="1"
							v-decorator="['subParamOrder']"></a-input-number>
					</a-form-item>
					<a-form-item label="标题："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-input maxLength="50"
							placeholder="请填写广告标题"
							v-decorator="['subParamTitle',
								{rules: [{ required: true, message: '请填写广告标题!', trigger: 'change' }]}
							]"></a-input>
					</a-form-item>
					<a-form-item label="链接："
						:label-col="{ span: 3 }"
						:wrapper-col="{ span: 12 }">
						<a-input maxLength="200"
							placeholder="请填写跳转的链接地址"
							v-decorator="['subParamWeb']"></a-input>
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
import qs from 'qs'
import Vue from 'vue'
import { STable, SingleImgUpload } from '@/components'
import {
  getBannerList,
  getBannerType,
  getUserNameList,
  removeBannerImg,
  uploadUrl,
  addBanner,
  updateBanner,
  getBannerById
} from '@/api/banner'

export default {
  name: 'slideManagement',
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
      slideVisible: false,
      tip: '',
      uploadUrl: '',
      uploadInfo: {
        fileList: [],
        showOffList: {}
      },
      inforDomainList: [],
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
        start: '', // 开始时间
        end: '', // 结束时间
        bannerType: '',
        backendUserName: '', // 账号用户名
        order: '', // 排序
        state: '' // 启用
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
          dataIndex: 'bannerType',
          scopedSlots: { customRender: 'bannerType' }
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
          dataIndex: 'clicks'
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '顺序',
          dataIndex: 'bannerOrder'
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
        return getBannerList(this.queryParam).then(res => {
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
    this.getBannerType()
  },
  methods: {
    async getNameList () {
      try {
        const res = await getUserNameList()
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
    async getBannerType () {
      try {
        const res = await getBannerType()
        if (res.code === 200) {
          this.inforDomainList = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    // 删除上传的图片
    async handleRemoveImg (fileUrl) {
      try {
        const res = await removeBannerImg({
          fileName: fileUrl
        })
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '删除成功！'
          })
          return res
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '删除失败，请重试！'
        })
      }
    },
    // 移除待上传
    async handleRemoveUpload ({ response: { data } }) {
      const fileUrl = data
      const res = await this.handleRemoveImg(fileUrl)
      if (res && res.code === 200) {
        this.uploadInfo.fileList = []
      }
    },
    // 删除已上传图片
    async handleDeleteUpload (item) {
      if (!item) return
      const res = await this.handleRemoveImg(item)
      if (res && res.code === 200) {
        this.uploadInfo.showOffList = {}
      }
    },
    async handleEdit (record) {
      this.rowId = record.id
      try {
        let res = await getBannerById({ id: record.id })
        if (res.code === 200) {
          this.slideVisible = true

          this.uploadInfo.showOffList.winPath = res.data.imageUrl
          this.uploadInfo.showOffList.fileUrl = res.data.imgName
          this.$nextTick(() => {
            this.forms.setFieldsValue({
              subParamType: res.data.bannerType,
              subParamTitle: res.data.title,
              subParamWeb: res.data.activityUrl,
              subParamOrder: res.data.bannerOrder
            })
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    // 重置
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        title: '',
        start: '', // 开始时间
        end: '', // 结束时间
        bannerType: '',
        backendUserName: '', // 账号用户名
        order: '', // 排序
        state: '' // 启用
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
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
    },
    // 表格行-禁用
    confirmForbidden (record) {
      let param = {
        id: record.id,
        backendUserName: JSON.parse(Vue.ls.get('USERINFO')).username,
        state: record.state ? 0 : 1
      }
      updateBanner(param).then(res => {
        if (res.code === 200) {
          record.state = !record.state
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
        this.queryParam.state = ''
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
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    // 直接上传
    handleUploadChange ({ fileList }, type) {
      this.uploadInfo.fileList = fileList
    },
    handleTypeChange (value) {
      if (value === 2620) {
        this.tip = '个人中心轮播图尺寸：706*204'
      } else if (value === 2621) {
        this.tip = '首页轮播图尺寸：678*228'
      } else {
        this.tip = '证券频道尺寸：678*188'
      }
    },
    handleReset () {
      this.forms.setFieldsValue({
        subParamType: '',
        subParamTitle: '',
        subParamWeb: '',
        subParamOrder: ''
      })
      this.rowId = ''
      if (this.uploadInfo.fileList) {
        this.uploadInfo.fileList = []
      }
      if (this.uploadInfo.showOffList.winPath) {
        this.uploadInfo.showOffList = {}
      }
      // if (this.uploadInfo.fileList.length) {
      //   this.handleRemoveUpload(this.uploadInfo.fileList[0])
      // }
    },
    handleSubmit () {
      const {
        forms: { getFieldsValue, validateFields },
        uploadInfo: { fileList, showOffList },
        $notification: { success, error },
        rowId,
        $refs: { table },
        handleCancel
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

      const param = {
        imgName: fileList.length
          ? fileList[0].response.data
          : showOffList.fileUrl,
        backendUserName: JSON.parse(Vue.ls.get('USERINFO')).username,
        title: subParamTitle,
        bannerType: subParamType,
        bannerOrder: subParamOrder,
        activityUrl: subParamWeb,
        state: 1
      }
      validateFields(['subParamTitle', 'subParamType'], async err => {
        if (!err) {
          try {
            let res = {}
            if (!rowId) {
              res = await addBanner(param)
            } else {
              param.id = rowId
              res = await updateBanner(param)
            }
            if (res.code === 200) {
              success({
                message: res.msg || '提交成功！'
              })
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
      this.slideVisible = true
    },
    handleCancel () {
      this.slideVisible = false
      this.handleReset()
    }
  },
  filters: {
    // 类型
    bannerTypeFilter (type) {
      switch (type) {
        case 2620:
          return '个人中心轮播图'
        case 2621:
          return '首页轮播图'
        case 2622:
          return '证券频道'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less">
.slideManagementWrapper {
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
