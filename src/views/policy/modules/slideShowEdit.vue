<template>
	<div class="newPolicyEditWrapper">
		<h2 class="newPolicyEditTitle">保单管理 - {{handlePageTitle()}}</h2>
		<a-form layout="inline"
			:form="form">
			<a-row :gutter="48">
				<a-col :xl="5"
					:lg="5"
					:md="5"
					:sm="5"
					:xs="5">
					<div class="newPolicyEditLeft">
						<a-upload v-if="covePicturePath == ''"
							listType="picture-card"
							class="avatar-uploader"
							:headers='myHeaders'
							:action="uploadUrl"
							:fileList="fileList"
							@change="handleUploadChange"
							@preview="handlePreviewImg"
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
						<p style="color:red;margin:0;">图片尺寸：678*166</p>
					</div>
					<div style="clear:both;display:block;height:0;" />

					<a-form-item label="来源网站："
						style="margin-top:100px;min-width:200px;"
						v-if="sourceFromVisible">
						<a-input v-decorator="['sourceform',
          {rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
        ]" />
					</a-form-item>
					<a-form-item label="标签"
						style="margin-top:30px;">
						<a-input v-decorator="['tags']"
							placeholder="多个标签请用英文“,”表示"
							style="min-width:200px;" />
					</a-form-item>
					<div style="clear:both;display:block;height:0;" />
					<a-form-item label="关键字:"
						style="margin-top:30px;"
						class="keywordWrapper">
						<a-textarea v-model="queryParam.topics" />
						<p>多个关键字之间用英文“,”表示</p>
					</a-form-item>
				</a-col>
				<a-col :xl="19"
					:lg="19"
					:md="19"
					:sm="19"
					:xs="19">
					<div class="newPolicyEditRight">
						<div style="margin:20px 0;">
							<a-form-item label="标题：">
								<a-input placeholder="最长不超过30字（包含字母和符号）"
									style="min-width:400px;"
									v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
        ]" />
							</a-form-item>
						</div>
						<div style="margin:20px 0;">
							<a-form-item label="作者：">
								<a-input v-decorator="['editor']"
									placeholder="请输入" />
							</a-form-item>
						</div>
						<a-row style="margin:20px 0;">
							<a-col :xl="8"
								:lg="8"
								:md="8"
								:sm="8"
								:xs="8">
								<a-form-item label="发布日期">
									<a-date-picker v-decorator="['pTime']"
										showTime
										format="YYYY-MM-DD HH:mm:ss"
										placeholder="选择时间" />
								</a-form-item>
							</a-col>
						</a-row>
						<div>
							<p class='tip'>(单图上传大小不能超过2M)</p>
							<Ue ref="ue" />
						</div>
					</div>
				</a-col>
			</a-row>
		</a-form>
		<div class="btnGroups">
			<a-button @click="handlePublish"
				v-auth="$route.meta.dutyName">发布</a-button>
			<a-button type="primary"
				@click="handleSave">保存</a-button>
			<a-button @click="handlePreview"
				style="background:red;color:white;">预览</a-button>
			<a-button @click="handleBack">返回</a-button>
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
import {
  getRemoveUpload,
  getById,
  getUpdateInsurance,
  getInfomationQrCode,
  specialUrl
} from '@/api/policy'
import { Ue } from '@/components'
import moment from 'moment'
import { setTimeout } from 'timers'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      covePicturePath: '', // 预览
      modalTitle: '',
      id: '', // 当前的政策id
      state: 0,
      qrCode: '',
      previewVisible: false,
      sourceFromTitle: '',
      sourceFromVisible: false, // 是否有来源网站选项
      // 编辑参数
      queryParam: {
        id: '',
        title: '',
        releaseDate: '',
        editor: '',
        tags: '',
        topics: '',
        content: '',
        state: 0,
        imgName: '',
        sourceform: '',
        serviceType: ''
      }
    }
  },
  created () {
    this.uploadUrl = specialUrl.upload
    this.id = this.$route.query.id

    this.sourceFromVisible = !this.$route.query.noSource
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const { data } = await getById({
        id: this.id
      })

      this.handleCoverImg(data)
      this.handleBackUe(data)
      this.handleBackTopics(data)

      this.form.setFieldsValue({
        title: data.title,
        sourceform: data.sourceform,
        editor: data.editor,
        tags: data.tags,
        pTime: moment(data.releaseDate)
      })
    },
    handlePageTitle () {
      if (this.sourceFromVisible) {
        switch (this.$route.query.type) {
          case 'topHk':
            return '头条推荐编辑(香港)'
          case 'topLand':
            return '头条推荐编辑(国内)'
          default:
            return '头条推荐编辑'
        }
      } else {
        switch (this.$route.query.type) {
          case 'slideHk':
            return '轮播图编辑(香港)'
          case 'slideLand':
            return '轮播图编辑(国内)'
          default:
            return '轮播图编辑'
        }
      }
    },
    /// // 反向回绑 /////
    handleBackTopics (data) {
      this.queryParam.topics = data.topics
    },
    handleBackUe (data) {
      this.$refs.ue.content = data.content
    },
    handleCoverImg (data) {
      let str = data.covePicturePath
      this.covePicturePath = str
      this.fileName = str.substring(str.lastIndexOf('/') + 1)
    },
    /// // 上传图片 //////
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
        if (res.code === 200) {
          this.fileName = ''
          this.covePicturePath = ''
        }
      })
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    // 发布
    handlePublish () {
      this.state = 1
      this.handleSave()
    },
    // 保存
    handleSave () {
      let formObj = this.form.getFieldsValue([
        'title',
        'tags',
        'editor',
        'pTime',
        'sourceform'
      ])
      if (this.$refs.ue.content === '') {
        this.$notification.warning({
          message: '请在编辑器中输入内容'
        })
        return
      }
      if (this.fileName === '') {
        this.$notification.warning({
          message: '请上传封面图片'
        })
        return
      }
      this.form.validateFields(async err => {
        if (!err) {
          let pTime = this.handlePtime(formObj.pTime)
          this.queryParam.id = this.id
          this.queryParam.title = formObj.title || ''
          this.queryParam.sourceform = formObj.sourceform || ''
          this.queryParam.tags = formObj.tags || ''
          this.queryParam.editor = formObj.editor || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.state = this.state
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.imgName = this.fileName || ''
          if (this.sourceFromVisible) {
            // 如果是头条推荐过来的
            this.queryParam.serviceType =
							this.$route.query.type === 'topHk'
							  ? 5
							  : this.$route.query.type === 'topLand'
							    ? 4
							    : ''
          } else {
            // 如果是轮播图过来
            this.queryParam.serviceType =
							this.$route.query.type === 'slideHk'
							  ? 7
							  : this.$route.query.type === 'slideLand'
							    ? 6
							    : ''
          }
          let res
          try {
            res = await getUpdateInsurance(this.queryParam)
            if (res.code === 200) {
              this.$notification.success({
                message: this.state === 1 ? '发布成功！' : '更新成功！'
              })
            } else {
              this.$notification.error({
                message: res.msg || '失败，请重试'
              })
            }
          } catch ({ message }) {
            console.log(message)
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
    // 预览 // 生成快报二维码
    handlePreview () {
      getInfomationQrCode({
        url: specialUrl.code + this.id,
        id: this.id
      }).then(res => {
        if (res.code === 200) {
          this.qrCode = res.data
          this.modalTitle = '扫码预览'
          this.previewVisible = true
        } else {
          this.$notification.error({
            message: '生成二维码失败，请重试！'
          })
        }
      })
    },
    handlePreviewCancel () {
      this.previewVisible = false
    },
    // 返回
    handleBack () {
      if (
        this.$route.query.type === 'topHk' ||
				this.$route.query.type === 'slideHk'
      ) {
        this.$router.push('/policy/hkPolicyManagement')
      } else {
        this.$router.push('/policy/landPolicyManagement')
      }
    }
  }
}
</script>

<style lang="less" >
.newPolicyEditWrapper {
	.newPolicyEditTitle {
		font-size: 26px;
		font-weight: bold;
		color: #333;
	}
	.avatar-uploader {
		.ant-upload {
			width: 220px;
			height: 112px;
			font-size: 20px;
			color: rgba(42, 130, 228, 1);
		}
	}
	.keywordWrapper {
		margin-top: 50px;
		h3 {
			font-size: 14px;
			font-weight: normal;
		}
		.ant-input {
			width: 220px;
		}
		p {
			font-size: 14px;
			color: rgba(212, 48, 48, 1);
		}
	}
	.newPolicyEditRight {
		.tip {
			margin: 0;
			color: red;
		}
	}
	.btnGroups {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
		.ant-btn {
			margin: 0 10px;
		}
	}
}
</style>
