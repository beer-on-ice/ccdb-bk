<template>
	<div class="newPolicyEditWrapper">
		<a-form layout="inline"
			:form="form">
			<a-row :gutter="48">
				<a-col :xl="5"
					:lg="5"
					:md="5"
					:sm="5"
					:xs="5">
					<div class="newPolicyEditLeft">
						<a-upload listType="picture-card"
							class="avatar-uploader"
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
					</div>
					<div style="clear:both;display:block;height:0;" />
					<a-form-item label="标签"
						style="margin-top:30px;">
						<a-input v-decorator="['tags']"
							placeholder="多个标签请用英文“,”表示"
							style="min-width:200px;" />
					</a-form-item>
					<div style="clear:both;display:block;height:0;" />
					<div class="keywordWrapper">
						<h3>关键字:</h3>
						<a-textarea placeholder="请输入关键字"
							v-model="queryParam.topics" />
						<p>多个关键字之间用英文“,”表示</p>
					</div>
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
			<a-button @click="previewVisible=true"
				v-show="isSave"
				style="background:red;color:white;">预览</a-button>
			<a-button @click="handleBack">返回</a-button>
		</div>
		<a-modal :title="modalTitle"
			:visible="previewVisible"
			:footer="null"
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
  getAddPolicy,
  getRemoveUpload,
  getInfomationQrCode,
  specialUrl
} from '@/api/policy'
import { Ue } from '@/components'
import moment from 'moment'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      modalTitle: '',
      id: '',
      state: 0,
      isSave: false, // 是否保存
      qrCode: '',
      previewVisible: false,
      // 编辑参数
      queryParam: {
        title: '',
        releaseDate: '',
        editor: '',
        tags: '',
        topics: '',
        content: '',
        imgName: '',
        state: 0,
        covePicturePath: ''
      }
    }
  },
  created () {
    this.uploadUrl = specialUrl.upload
  },
  methods: {
    // 上传图片
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
    // 发布
    handlePublish () {
      this.state = 1
      this.handleSave()
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    // 保存
    handleSave () {
      let formObj = this.form.getFieldsValue([
        'title',
        'tags',
        'editor',
        'pTime'
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

      this.form.validateFields(err => {
        if (!err) {
          let pTime = this.handlePtime(formObj.pTime)
          this.queryParam.title = formObj.title || ''
          this.queryParam.tags = formObj.tags || ''
          this.queryParam.editor = formObj.editor || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.state = this.state
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.imgName = this.fileName || ''

          console.log('newPolicyAdd', this.queryParam)

          getAddPolicy(this.queryParam).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: this.state === 1 ? '发布成功！' : '保存成功！'
              })
              this.id = res.data
              this.isSave = true
              this.$router.push({
                path: '/policy/newpolicyedit',
                query: { id: res.data }
              })
            } else {
              this.$notification.error({
                message: '保存失败，稍后重试！'
              })
              this.isSave = false
            }
          })
        }
      })
    },
    // 预览图片
    handlePreviewImg (file) {
      this.qrCode = file.url || file.thumbUrl
      this.modalTitle = '查看大图'
      this.previewVisible = true
    },
    // 预览// 生成快报二维码
    handlePreview () {
      getInfomationQrCode({
        url: specialUrl.code + this.id,
        id: this.id
      }).then(res => {
        if (res.code === 200) {
          this.modalTitle = '扫码预览'
          this.qrCode = res.data
          this.previewVisible = true
        } else {
          this.$notification.error({
            message: '生成二维码失败，请重试！'
          })
        }
      })
    },
    handlePreviewCancel () {
      this.qrCode = ''
      this.previewVisible = false
    },
    // 返回
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" >
.newPolicyEditWrapper {
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
