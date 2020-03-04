<template>
	<div class="newsEditWrapper">
		<a-form layout="horizontal"
			:form="form">
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
						<p style="color:red;margin:0;">图片尺寸：202*202(推荐)</p>
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
					</a-form-item>
					<a-row>
						<a-col :span="8">
							<a-form-item label="发布时间："
								:label-col="{span:5}">
								<a-date-picker showTime
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择时间"
									v-decorator="['pTime']" />
							</a-form-item>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
			<a-row style="margin:50px;">
				<a-col :span="6">
					<a-form-item label="类型："
						:label-col="{span:5}">
						<a-select style="max-width:200px;"
							placeholder="请选择"
							v-decorator="[
          'inforDomain',
          {rules: [{ required: true, message: '请选择资讯类型！', trigger: 'change' }]}
        ]">
							<a-select-option value="1">私募</a-select-option>
							<a-select-option value="2">信托</a-select-option>
							<a-select-option value="3">银行</a-select-option>
							<a-select-option value="4">保险</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="分类："
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
					<a-form-item label="性质："
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
					<a-form-item label="来源："
						:label-col="{span:5}">
						<a-input placeholder="请输入"
							style="max-width:200px;"
							v-decorator="[
          'sourceFrom',
          {rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
        ]" />
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<Ue ref="ue" />
				</a-col>
			</a-row>
		</a-form>
		<div>
			<a-button type="primary"
				v-auth="$route.meta.dutyName"
				@click="handleSave(true)">
				发布
			</a-button>
			<a-button type="primary"
				@click="handleSave(false)"
				style="margin-left:20px;">
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
			<img :src="imgUrl"
				style="width:100%;">
		</a-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Ue } from '@/components'
import moment from 'moment'

import {
  addReport,
  specialUrl,
  getRemoveUpload,
  getNewsAddBanner,
  getFastCode,
  forbidReportById
} from '@/api/report'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      previewVisible: false,
      modalTitle: '',
      imgUrl: '',
      id: '',
      uploadUrl: '',
      queryParam: {
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        sourceFrom: '',
        content: '',
        imgName: ''
      }, // 最终添加的参数
      fileList: [], // 上传的图片列表
      fileName: '' // 上传后返回的图片名称
    }
  },
  created () {
    this.uploadUrl = specialUrl.upload
  },
  methods: {
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
    // 移除上传的图片
    handleRemoveUpload () {
      getRemoveUpload({
        fileName: this.fileName
      }).then(res => {
        if (res.code === 200) this.fileName = ''
      })
    },
    handleSave (isPub) {
      let formObj = this.form.getFieldsValue([
        'title',
        'inforDomain',
        'category',
        'categoryType',
        'sourceFrom',
        'pTime'
      ])
      if (this.fileName === '') {
        this.$notification.warning({
          message: '请上传封面图片'
        })
        return
      }
      if (this.$refs.ue.content === '') {
        this.$notification.warning({
          message: '请在编辑器中输入内容'
        })
        return
      }

      this.form.validateFields(err => {
        if (!err) {
          let pTime = this.handlePtime(formObj.pTime)

          this.queryParam.title = formObj.title || ''
          this.queryParam.inforDomain = formObj.inforDomain || ''
          this.queryParam.category = formObj.category || ''
          this.queryParam.categoryType = formObj.categoryType || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.sourceFrom = formObj.sourceFrom || ''
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.content = this.$refs.ue.content || ''

          addReport(this.queryParam).then(res => {
            if (res.code === 200) {
              this.id = res.data
              const params = {
                bannerFlag: '1',
                informationId: res.data,
                title: this.queryParam.title,
                infomationUrl: specialUrl.code + res.data
              }
              getNewsAddBanner(params)
              if (isPub) {
                this.handlePub()
              } else {
                this.$notification.success({
                  message: res.msg || '保存成功，可扫码预览'
                })
                this.$router.push({
                  name: 'reportEdit',
                  query: {
                    id: this.id
                  }
                })
              }
            } else {
              this.$notification.error({
                message: res.msg || '保存失败，请重试'
              })
            }
          })
        }
      })
    },
    handlePub () {
      const {
        $notification: { success, error },
        id,
        $router,
        handleBack
      } = this
      try {
        const param = { id, type: 1 }
        forbidReportById(param).then(res => {
          if (res.code === 200) {
            success({
              message: res.msg || '发布成功'
            })
            handleBack()
          } else {
            throw new Error(res.msg || '发布失败，请重试')
          }
        })
      } catch ({ message }) {
        error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    // 预览图片
    handlePreviewImg (file) {
      this.imgUrl = file.url || file.thumbUrl
      this.modalTitle = '查看大图'
      this.previewVisible = true
    },
    // 预览 // 生成快报二维码
    // handlePreview () {
    //   getFastCode({
    //     url: specialUrl.code + this.id,
    //     id: this.id
    //   }).then(res => {
    //     if (res.code === 200) {
    //       this.imgUrl = res.data
    //       this.modalTitle = '扫码预览'
    //       this.previewVisible = true
    //     } else {
    //       this.$notification.error({
    //         message: '生成二维码失败，请重试！'
    //       })
    //     }
    //   })
    // },
    handlePreviewCancel () {
      this.imgUrl = ''
      this.previewVisible = false
    },
    handleBack () {
      this.$router.push('/policy/reportManagement')
    }
  }
}
</script>

<style lang="less" >
.newsEditWrapper {
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
