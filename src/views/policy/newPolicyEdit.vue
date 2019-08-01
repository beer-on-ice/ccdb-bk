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
							action="https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload"
							:fileList="fileList"
							@change="handleUploadChange"
							:beforeUpload="handleBeforeUpload"
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
							placeholder="多个标签请用半角“,”表示"
							style="min-width:200px;" />
					</a-form-item>
					<div style="clear:both;display:block;height:0;" />
					<div class="keywordWrapper">
						<h3>关键字:</h3>
						<a-textarea v-decorator="['topics']" />
						<p>多个关键字之间用半角“,”表示</p>
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
								<a-form-item label="是否启用">
									<a-switch defaultChecked
										checkedChildren="已启用"
										unCheckedChildren="已禁用"
										v-model="state" />
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
			<a-button v-auth="'admin'"
				@click="handlePublish">发布</a-button>
			<a-button type="primary"
				@click="handleSave">保存</a-button>
			<a-button @click="handlePreview">预览</a-button>
			<a-button @click="handleBack">返回</a-button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getAddPolicy, getRemoveUpload } from '@/api/policy'
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
      loading: false,
      state: true,
      // 编辑参数
      queryParam: {
        title: '',
        releaseDate: '',
        editor: '',
        tags: '',
        topics: '',
        content: '',
        imgName: ''
      }
    }
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
    // 上传之前，可处理格式等
    handleBeforeUpload () {},
    // 发布
    handlePublish () {},
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
        'topics',
        'editor',
        'pTime',
        'state'
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
          this.queryParam.topics = formObj.topics || ''
          this.queryParam.editor = formObj.editor || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.state = this.state ? 1 : 0
          console.log(this.queryParam)

          getAddPolicy(this.queryParam).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '保存成功！'
              })
              this.$router.push({ path: '/policy/policyManagement' })
            }
          })
        }
      })
    },
    // 发布
    handlePreview () {},
    // 返回
    handleBack () {
      this.$router.push({ path: '/policy/policyManagement' })
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
