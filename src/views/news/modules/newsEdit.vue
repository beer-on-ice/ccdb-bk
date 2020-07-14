<template>
	<div class="newsEditWrapper">
		<a-form layout="horizontal"
			:form="form">
			<a-row>
				<a-col :span="6">
					<a-form-item>
						<a-upload class="uploadWrapper"
							v-if="covePicturePath == ''"
							listType="picture-card"
							:headers='myHeaders'
							:action="uploadUrl"
							:fileList="fileList"
							@preview="handlePreviewImg"
							@change="handleUploadChange"
							:remove="handleRemoveUpload"
							name="multipartFile">
							<div v-if="fileList.length<1">
								<a-icon type="plus"></a-icon>
								<div className="ant-upload-text">选择封面</div>
							</div>
						</a-upload>
						<div v-else>
							<img :src="covePicturePath"
								style="width:100px;margin-right:20px;">
							<a-button type="danger"
								@click="handleRemoveUpload">删除图片</a-button>
						</div>
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<a-form-item label="标题："
						:label-col="{span:1}">
						<a-input style="max-width:450px;"
							placeholder="请输入"
							v-decorator="[
							'title',
							{rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
						]" />
						<span style="margin-left:10px;">字数：<em style="color:red;">{{form.getFieldValue('title')?form.getFieldValue('title').length : 0}}</em></span>
					</a-form-item>
					<a-form-item label="作者："
						:label-col="{span:1}">
						<a-input style="max-width:250px;"
							placeholder="请输入"
							v-decorator="['editor']" />
					</a-form-item>
					<a-row>
						<a-col :span="7">
							<a-form-item label="发布时间："
								:label-col="{span:5}">
								<a-date-picker showTime
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择时间"
									v-decorator="['pTime']" />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="操作："
								:label-col="{span:3}">
								<a-checkbox-group v-auth="$route.meta.dutyName"
									:options="plainOptions"
									v-decorator="['checkedList']" />
								<a-checkbox-group v-nuth="$route.meta.dutyName"
									:options="plainOptions2"
									v-decorator="['checkedList']" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item label="发布到："
						:label-col="{span:2}"
						:wrapper-col="{ span: 22 }">
						<a-checkbox-group :options="publishOptions"
							v-decorator="['showType',
									{rules: [{ required: true, message: '请选择发布位置！', trigger: 'change',type:'array' }]}
								]"
							@change="onPublishChange" />
					</a-form-item>
					<a-form-item label="摘要："
						:label-col="{span:1}"
						:wrapper-col="{ span: 22 }">
						<a-textarea placeholder="请输入摘要"
							:maxLength="200"
							allowClear
							v-decorator="['abstractContent',
								{rules: [{ required: true, message: '请输入摘要!', trigger: 'change',type:'string' }]}
							]" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row style="margin:50px;">
				<a-col :span="6">
					<a-form-item label="资讯类型："
						:label-col="{span:5}">
						<a-select style="max-width:200px;"
							placeholder="请选择"
							v-decorator="[
          'inforDomain',
          {rules: [{ required: true, message: '请选择资讯类型！', trigger: 'change' }]}
        ]">
							<a-select-option value="1">信托</a-select-option>
							<a-select-option value="2">房产</a-select-option>
							<a-select-option value="3">私募基金</a-select-option>
							<a-select-option value="4">保险</a-select-option>
							<a-select-option value="5">理财</a-select-option>
							<a-select-option value="6">证券</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="内容分类："
						:label-col="{span:5}">
						<a-select placeholder="请选择"
							style="max-width:200px;"
							v-decorator="[
          'category',
          {rules: [{ required: true, message: '请选择内容分类！', trigger: 'change' }]}
        ]">
							<a-select-option value="110">监管类</a-select-option>
							<a-select-option value="111">信批类</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="资讯性质："
						:label-col="{span:5}">
						<a-select style="max-width:200px;"
							placeholder="请选择"
							v-decorator="[
          'categoryType',
          {rules: [{ required: true, message: '请选择资讯性质！', trigger: 'change' }]}
        ]">
							<a-select-option value="2126">正面</a-select-option>
							<a-select-option value="2127">负面</a-select-option>
							<a-select-option value="2128">中性</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="风险分类："
						:label-col="{span:5}">
						<a-cascader :options="dangerList"
							:displayRender="displayRender"
							expandTrigger="hover"
							placeholder="请选择"
							style="max-width:200px;"
							v-decorator="['danger']" />
					</a-form-item>
					<a-form-item label="来源网站："
						:label-col="{span:5}">
						<a-input placeholder="请输入来源网站"
							style="max-width:230px;"
							v-decorator="[
							'sourceform',
							{rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
						]" />
					</a-form-item>
					<a-form-item label="关键字："
						:label-col="{span:5}">
						<a-input placeholder="多个关键字之间用英文逗号隔开"
							style="max-width:230px;"
							v-decorator="['topics']" />
					</a-form-item>
					<a-form-item label="自定义标签："
						:label-col="{span:5}">
						<a-input placeholder="多个标签之间用英文逗号隔开"
							style="max-width:230px;"
							v-decorator="['tags']" />
					</a-form-item>
					<tag-search ref="tagSearch"></tag-search>
				</a-col>
				<a-col :span="18">
					<Ue ref="ue"
						:selfConf="$route.query.type&&$route.query.state==1?selfConf:{}" />
				</a-col>
			</a-row>
			<div class="block">
				<a-form-item>
					<a-button :hidden="$route.query.type&&$route.query.state==1"
						type="primary"
						@click="handleSave">
						保存
					</a-button>
					<a-button type="primary"
						@click="handleBack"
						style="margin-left:20px;">
						返回
					</a-button>
				</a-form-item>
			</div>
		</a-form>
		<div class="qrcode">
			<img :src="qrCode">
			<p>预览扫一扫</p>
		</div>
		<a-modal title="查看大图"
			:visible="previewVisible"
			:footer="null"
			@cancel="handlePreviewCancel">
			<img :src="imgUrl"
				style="width:100%;">
		</a-modal>
		<div v-if="$route.query.type&&$route.query.state==1"
			class="mask"></div>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Ue } from '@/components'
import TagSearch from './../components/TagSearch.vue'
import {
  getDangerList,
  getRemoveUpload,
  getNewsAddBanner,
  getFastCode,
  getCurrentInfo,
  getUpdate,
  specialUrl
} from '@/api/newsManage'
const plainOptions = ['热门', '置顶', '启用']
const plainOptions2 = ['热门', '置顶']

export default {
  components: { Ue, TagSearch },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions, // 多选项
      plainOptions2,
      publishOptions: [
        {
          label: '看看',
          value: '看看',
          disabled: false
        },
        {
          label: '推荐',
          value: '推荐',
          disabled: false
        },
        {
          label: '快报',
          value: '快报',
          disabled: false
        }
      ],
      covePicturePath: '',
      queryParam: {
        id: '',
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        editor: '',
        sourceform: '',
        showType: 0,
        topCategory: '',
        twoLevel: '',
        isEssence: '',
        tags: '',
        topics: '',
        type1: [],
        content: '',
        imgName: '',
        opinionType: '',
        oldOpinionType: '',
        oldReleaseDate: ''
      }, // 最终添加的参数
      uploadUrl: '',
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      previewVisible: false,
      id: '',
      bannerFlag: '',
      reportState: false,
      qrCode: '',
      imgUrl: '',
      selfConf: { readonly: true }
    }
  },
  created () {
    const {
      $route: {
        query: { id }
      },
      getDangerList,
      generateFastCode,
      getCurrentPageInfo
    } = this
    this.uploadUrl = specialUrl.upload
    this.id = id
    getDangerList()
    generateFastCode()
    getCurrentPageInfo()
  },
  methods: {
    // 获取当前页面信息
    async getCurrentPageInfo () {
      try {
        const res = await getCurrentInfo({ id: this.id })
        const { code, data } = res
        if (code === 200) {
          this.bannerFlag = data.bannerFlag
          // 回绑
          this.handleCoverImg(data)
          this.handleBackUe(data)
          this.handleBackShowType(data)
          this.queryParam.oldReleaseDate = data.releaseDate
          this.queryParam.opinionType = data.opinionType
          this.queryParam.oldOpinionType = data.opinionType
          this.form.setFieldsValue({
            title: data.title,
            editor: data.editor,
            sourceform: data.sourceform,
            topics: data.topics,
            tags: data.tags,
            danger: this.handelBackDanger(data),
            inforDomain: data.inforDomain.toString(),
            category: data.category.toString(),
            categoryType: data.categoryType.toString(),
            pTime: moment(data.releaseDate),
            showType: this.handleBackShowType(data),
            checkedList: this.handleBackCheckbox(data),
            abstractContent: data.abstractContent
          })
          if (data && data.tagList && data.tagList.length) {
            this.$refs.tagSearch.oldTags = [].concat(data.tagList)
          }
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络波动，请重试！'
        })
      }
    },
    // 获取风险分类
    async getDangerList () {
      try {
        const res = await getDangerList()
        if (res.code === 200) {
          this.dangerList = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络波动，请重试！'
        })
      }
    },
    // 生成快报二维码
    async generateFastCode () {
      try {
        const res = await getFastCode({
          url: specialUrl.code + this.id + '&type=preview',
          id: this.id
        })
        if (res.code === 200) {
          this.qrCode = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络波动，请重试！'
        })
      }
    },
    // 移除上传的图片
    async handleRemoveUpload () {
      try {
        const res = await getRemoveUpload({
          fileName: this.fileName
        })
        if (res.code === 200) {
          this.fileName = ''
          this.covePicturePath = ''
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络波动，请重试！'
        })
      }
    },
    async getNewsAddBanners (params) {
      try {
        const res = await getNewsAddBanner(params)
        if (res.code === 200) {
          console.log('快报生成成功/删除成功')
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
    },
    handleBackShowType ({ showType }) {
      let arr = []
      if (showType === 1) {
        arr.push('看看')
        this.publishOptions[1].disabled = true
      } else if (showType === 2) {
        arr.push('推荐')
        this.publishOptions[0].disabled = true
      }
      if (this.bannerFlag === '1') {
        this.queryParam.type1.push('生成快报')
        arr.push('快报')
      }
      return arr
    },
    // 反向回绑ue
    handleBackUe (data) {
      this.$refs.ue.content = data.content
    },
    // 反向回绑图片
    handleCoverImg (data) {
      let str = data.covePicturePath
      this.covePicturePath = str
      this.fileName = str.substring(str.lastIndexOf('/') + 1)
    },
    // 反向回绑多选
    handleBackCheckbox (data) {
      let arr = []
      if (data && Number(data.isHot)) {
        arr.push('热门')
      }
      if (data && Number(data.isTop)) {
        arr.push('置顶')
      }
      if (data && Number(data.state)) {
        arr.push('启用')
      }

      return arr
    },
    // 处理回绑风险
    handelBackDanger (data) {
      let arr = []
      if (data.twoLevel) {
        arr.push(data.topCategory)
        arr.push(data.twoLevel)
      }
      arr = arr.length === 0 ? [] : arr
      return arr
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    // 处理多选
    handleCheckbox (list) {
      this.queryParam.isHot = list && list.includes('热门') ? '1' : '0'
      this.queryParam.isTop = list && list.includes('置顶') ? '1' : '0'
      this.queryParam.state = list && list.includes('启用') ? '1' : '0'
      this.reportState = !!(list && list.includes('启用'))
    },
    onPublishChange (checkedValues) {
      this.publishOptions[1].disabled =
				checkedValues && checkedValues.includes('看看')
      this.publishOptions[0].disabled =
				checkedValues && checkedValues.includes('推荐')
      if (checkedValues && checkedValues.includes('快报')) {
        this.queryParam.type1.push('生成快报')
        this.bannerFlag = '1'
      } else {
        this.queryParam.type1 = this.queryParam.type1.filter(
          item => item !== '生成快报'
        )
        this.bannerFlag = '0'
      }
    },
    handlePublish (list) {
      let showType = 0
      showType =
				list && list.includes('看看') ? '1' : list.includes('推荐') ? '2' : 0
      return showType
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleUploadChange ({ fileList }) {
      this.fileList = fileList

      if (
        fileList[0] &&
				fileList[0].response &&
				fileList[0].response.code === 200
      ) {
        this.fileName = fileList[0].response.data
      }
    },
    handleSave () {
      const {
        form: { getFieldsValue, validateFields },
        $refs: { ue },
        $notification: { warning, success, error },
        handleCheckbox,
        handlePtime,
        handlePublish,
        generateFastCode,
        bannerFlag,
        id,
        fileName,
        getNewsAddBanners
      } = this
      const formObj = getFieldsValue([
        'title',
        'editor',
        'inforDomain',
        'category',
        'categoryType',
        'sourceform',
        'pTime',
        'danger',
        'topics',
        'tags',
        'showType',
        'checkedList',
        'abstractContent'
      ])
      if (ue.content === '') {
        warning({
          message: '请在编辑器中输入内容'
        })
      }

      handleCheckbox(formObj.checkedList)

      this.queryParam.id = id
      this.queryParam.title = formObj.title || ''
      this.queryParam.editor = formObj.editor || ''
      this.queryParam.inforDomain = formObj.inforDomain || ''
      this.queryParam.category = formObj.category || ''
      this.queryParam.categoryType = formObj.categoryType || ''
      this.queryParam.releaseDate = handlePtime(formObj.pTime) || ''
      this.queryParam.topCategory = formObj.danger ? formObj.danger[0] : ''
      this.queryParam.twoLevel = formObj.danger ? formObj.danger[1] : ''
      this.queryParam.sourceform = formObj.sourceform || ''
      this.queryParam.topics = formObj.topics || ''
      this.queryParam.tags = formObj.tags || ''
      this.queryParam.showType = handlePublish(formObj.showType) || 0
      this.queryParam.imgName = fileName || ''
      this.queryParam.content = ue.content || ''
      this.queryParam.type1 = formObj.checkedList || []
      this.queryParam.abstractContent = formObj.abstractContent || ''
      this.queryParam.tagList = this.$refs.tagSearch.newTags.concat(
        this.$refs.tagSearch.oldTags
      )

      validateFields(async err => {
        if (!err) {
          try {
            const res = await getUpdate(this.queryParam)
            if (res.code === 200) {
              success({
                message: '更新成功！'
              })
              generateFastCode()
              let params = {
                bannerFlag: bannerFlag,
                informationId: id,
                title: this.queryParam.title,
                infomationUrl: specialUrl.code + id,
                reportState: this.reportState
              }
              getNewsAddBanners(params)
            } else {
              throw new Error(res.msg)
            }
          } catch ({ message }) {
            error({
              message: message || '网络波动，请重试！'
            })
          }
        }
      })
    },
    // 预览图片
    handlePreviewImg (file) {
      this.imgUrl = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handlePreviewCancel () {
      this.imgUrl = ''
      this.previewVisible = false
    },
    handleBack () {
      this.$router.push('/news/newsManagement')
    }
  }
}
</script>

<style lang="less" >
.newsEditWrapper {
	position: relative;
	.uploadWrapper {
		.ant-upload {
			width: 250px;
			height: 150px;
		}
	}
	.qrcode {
		position: absolute;
		right: 10px;
		top: 0;
		text-align: center;
		img {
			width: 180px;
		}
	}
	.block {
		position: relative;
		z-index: 99;
	}
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
}
</style>
