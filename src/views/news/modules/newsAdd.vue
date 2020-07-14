<template>
	<div class="newsAddWrapper">
		<a-form layout="horizontal"
			:form="form"
			:labelAlign="'left'">
			<a-row>
				<a-col :span="6">
					<a-form-item>
						<a-upload class="uploadWrapper"
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
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<a-form-item label="标题："
						:label-col="{span:1}">
						<a-input style="max-width:250px;"
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
						<a-col :span="7">
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
						<a-col :span="9">
							<a-form-item label="发布到："
								:label-col="{span:4}">
								<a-checkbox-group :options="publishOptions"
									v-decorator="['showType',
										{rules: [{ required: true, message: '请选择发布位置！', trigger: 'change',type:'array' }]}
									]"
									@change="onPublishChange" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item label="摘要："
						:label-col="{span:1}"
						:wrapper-col="{ span: 22 }">
						<a-textarea placeholder="请输入摘要"
							:maxLength="200"
							allowClear
							v-decorator="['abstractContent',
								{rules: [{required: true, message: '请输入摘要!', trigger: 'change',type:'string' }]}
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
					<Ue ref="ue" />
				</a-col>
			</a-row>
		</a-form>
		<div>
			<a-button type="primary"
				@click="handleSave">
				保存
			</a-button>
			<!-- <a-button type="primary"
				@click="handlePreview"
				v-show="isSave"
				style="margin-left:20px;">
				预览
			</a-button> -->
			<a-button type="primary"
				@click="handleBack"
				style="margin-left:20px;">
				返回
			</a-button>
		</div>
		<a-modal :title="modalTitle"
			:visible="previewVisible"
			:footer="null"
			class="previewModal"
			@cancel="handlePreviewCancel">
			<img :src="qrCode"
				style="width:100%;">
		</a-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Ue } from '@/components'
import TagSearch from './../components/TagSearch.vue'
import moment from 'moment'

import {
  getDangerList,
  getNewsAdd,
  getRemoveUpload,
  getNewsAddBanner,
  getFastCode,
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
      previewVisible: false,
      modalTitle: '',
      qrCode: '',
      id: '',
      uploadUrl: '',
      // isSave: false, // 是否保存
      queryParam: {
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        editor: '',
        sourceform: '',
        topCategory: '',
        twoLevel: '',
        isEssence: '',
        showType: 0,
        tags: '',
        topics: '',
        type1: [],
        content: '',
        imgName: '',
        covePicturePath: '',
        opinionType: 2
      }, // 最终添加的参数
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      bannerFlag: '', // 是否生成查到快报
      reportState: false
    }
  },
  created () {
    this.uploadUrl = specialUrl.upload

    this.getDangerList()
  },
  methods: {
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
    // 预览
    // async handlePreview () {
    //   try {
    //     const res = await getFastCode({
    //       url: specialUrl.code + this.id,
    //       id: this.id
    //     })
    //     if (res.code === 200) {
    //       this.modalTitle = '扫码预览'
    //       this.qrCode = res.data
    //       this.previewVisible = true
    //     } else {
    //       throw new Error(res.msg)
    //     }
    //   } catch ({ message }) {
    //     this.$notification.error({
    //       message: message || '网络波动，请重试！'
    //     })
    //   }
    // },
    // 移除上传的图片
    async handleRemoveUpload () {
      try {
        const res = await getRemoveUpload({
          fileName: this.fileName
        })
        if (res.code === 200) {
          if (res.code === 200) this.fileName = ''
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
          console.log('快报生成成功')
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '获取失败，请重试！'
        })
      }
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
        $router,
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
        'showType',
        'topics',
        'tags',
        'checkedList',
        'abstractContent'
      ])
      if (ue.content === '') {
        warning({
          message: '请在编辑器中输入内容'
        })
        return
      }

      handleCheckbox(formObj.checkedList)

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
            const res = await getNewsAdd(this.queryParam)
            if (res.code === 200) {
              if (Number(bannerFlag)) {
                let params = {
                  bannerFlag: '1',
                  informationId: res.data,
                  title: this.queryParam.title,
                  infomationUrl: specialUrl.code + res.data,
                  reportState: this.reportState
                }
                getNewsAddBanners(params)
              }
              success({
                message: '保存成功！'
              })
              $router.push({
                path: '/news/newsedit',
                query: { id: res.data }
              })
              // this.id = res.data
              // this.isSave = true  // 是否可在本页预览（已跳转，无需）
            } else {
              throw new Error(res.msg)
            }
          } catch ({ message }) {
            error({
              message: message || '网络波动，请重试！'
            })
            // this.isSave = false
          }
        }
      })
    },
    // 预览图片
    handlePreviewImg (file) {
      this.qrCode = file.url || file.thumbUrl
      this.modalTitle = '查看大图'
      this.previewVisible = true
    },
    handlePreviewCancel () {
      this.qrCode = ''
      this.previewVisible = false
    },
    handleBack () {
      this.$router.push('/news/newsManagement')
    }
  }
}
</script>

<style lang="less" >
.newsAddWrapper {
	.uploadWrapper {
		.ant-upload {
			width: 250px;
			height: 150px;
		}
	}
	.previewModal {
		.ant-modal-body {
			text-align: center;
		}
	}
}
</style>
