<template>
	<a-modal title="保单管理-保单服务编辑(新增)"
		:visible="visible"
		@cancel="handleModalCancel"
		:destroyOnClose="true"
		width="800px"
		:footer="null"
		class="operateModal">
		<div class="modalTop">
			<h3>基本信息</h3>
			<a-row>
				<a-col class="modalTopLeft"
					:xl="20"
					:lg="20"
					:md="20"
					:sm="20"
					:xs="20">
					<a-form layout="inline"
						:form="form">
						<div>
							<a-form-item label="服务类别">
								<a-select placeholder="请选择"
									style="width:180px;"
									@change="classOfServiceChange"
									v-decorator="['classOfService',
          {rules: [{ required: true, message: '请选择！', trigger: 'change' }]}]">
									<a-select-option value="0">保单服务</a-select-option>
									<a-select-option value="1">理赔服务</a-select-option>
									<a-select-option value="2">信息更改</a-select-option>
								</a-select>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="二级类别">
								<a-select placeholder="请选择"
									notFoundContent="请先选择服务类别"
									v-decorator="['twoClassOfServiceCode',
          {rules: [{ required: true, message: '请选择！', trigger: 'change' }]}]"
									style="width:180px;">
									<a-select-option :value="item.productCode"
										v-for="item in twoClassOfServiceList"
										:key="item.productCode">{{item.productName}}</a-select-option>
								</a-select>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="
								保险公司">
								<a-select placeholder="请选择"
									v-decorator="['insuranceCode',
          {rules: [{ required: true, message: '请选择！', trigger: 'change' }]}]"
									style="width:180px;">
									<a-select-option v-for="item in insuranceList"
										:key="item.id"
										:value="String(item.policyCode)">{{item.policyName}}</a-select-option>
								</a-select>
							</a-form-item>
						</div>
					</a-form>
				</a-col>
				<a-col class="modalTopRight"
					:xl="4"
					:lg="4"
					:md="4"
					:sm="4"
					:xs="4">
					<a-button type="primary"
						class="btn"
						@click="handleSave">保存</a-button>
				</a-col>
			</a-row>
		</div>
		<div class="modalBottom">
			<a-row :gutter="48">
				<a-col :xl="12"
					:lg="12"
					:md="12"
					:sm="12"
					:xs="12"
					style="border-right:1px dashed rgba(229, 229, 229, 1);">
					<h3>空白文档上传</h3>
					<div class="clearfix">
						<a-upload listType="picture-card"
							:beforeUpload="beforeDocUpload"
							:fileList="blankList"
							:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
							@preview="handleUploadPreview"
							:remove="handleDocRemove"
							:class="blankList.length>0 ? '':'spec' ">
							<div v-if="blankList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">空白文档</div>
							</div>
						</a-upload>
					</div>
					<div>
						<p>支持格式：JPG、JPRG、PNG、PDF</p>
					</div>
				</a-col>
				<a-col :xl="12"
					:lg="12"
					:md="12"
					:sm="12"
					:xs="12">
					<h3>样例上传</h3>
					<div class="clearfix">
						<a-upload listType="picture-card"
							:beforeUpload="beforeExpUpload"
							:fileList="exampleList"
							:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
							:remove="handlePicRemove"
							@preview="handleUploadPreview"
							:class="exampleList.length>0?'':'spec'">
							<div v-if="exampleList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">样例模板</div>
							</div>
						</a-upload>
					</div>
					<div>
						<p>支持格式：JPG、JPRG、PNG、PDF</p>
					</div>
				</a-col>
			</a-row>
		</div>
		<div class="modalBtnClose">
			<a-button @click="handleModalCancel"
				type="primary"
				block>关闭</a-button>
		</div>
	</a-modal>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import {
  getSaveUploadInsurancePolicy,
  getShowTwoStageCosByCos,
  getUploadInsurancePolicyDoc,
  getUploadInsurancePolicyPic,
  getShowCorporateName
} from '@/api/landPolicy'
export default {
  props: ['visible'],
  data () {
    return {
      form: this.$form.createForm(this),
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      queryParam: {
        classOfService: '',
        twoClassOfServiceCode: '',
        insuranceCode: '',
        docFlag: ''
      },
      insuranceList: [],
      twoClassOfServiceList: [],
      blankList: [],
      exampleList: []
    }
  },
  created () {
    this.getShowCorporateNameList()
  },

  methods: {
    // 关闭模态框
    handleModalCancel (e) {
      this.blankList = []
      this.exampleList = []
      this.twoClassOfServiceList = []
      this.queryParam = {
        classOfService: '',
        twoClassOfServiceCode: '',
        insuranceCode: '',
        docFlag: ''
      }
      this.$emit('handleWarrantyAddClose')
    },
    async getShowCorporateNameList () {
      let res = await getShowCorporateName()
      this.insuranceList = res.data
    },
    // 获取二级分类
    async classOfServiceChange (val) {
      let res = await getShowTwoStageCosByCos({ cosFlag: val })
      this.twoClassOfServiceList = res.data
    },
    beforeDocUpload (file) {
      const flag =
				file.type !== 'image/png' ||
				file.type !== 'image/jpeg' ||
				file.type !== 'application/pdf' ||
				file.type !== 'image/jpg'
      if (!flag) {
        this.$message.info('请上传正确的格式')
        return
      }
      this.blankList = [...this.blankList, file]
      return false
    },
    beforeExpUpload (file) {
      const flag =
				file.type !== 'image/png' ||
				file.type !== 'image/jpeg' ||
				file.type !== 'application/pdf' ||
				file.type !== 'image/jpg'
      if (!flag) {
        this.$message.info('请上传正确的格式')
        return
      }
      this.exampleList = [...this.exampleList, file]
      return false
    },
    handleDocRemove (file) {
      const index = this.blankList.indexOf(file)
      const newFileList = this.blankList.slice()
      newFileList.splice(index, 1)
      this.blankList = newFileList
    },
    handlePicRemove (file) {
      const index = this.exampleList.indexOf(file)
      const newFileList = this.exampleList.slice()
      newFileList.splice(index, 1)
      this.exampleList = newFileList
    },
    // 保存
    handleSave () {
      let formObj = this.form.getFieldsValue([
        'classOfService',
        'twoClassOfServiceCode',
        'insuranceCode'
      ])

      if (this.blankList.length === 0 && this.exampleList.length === 0) {
        this.queryParam.docFlag = ''
      } else if (this.blankList.length !== 0 && this.exampleList.length !== 0) {
        this.queryParam.docFlag = 2
      } else if (this.blankList.length !== 0 && this.exampleList.length === 0) {
        this.queryParam.docFlag = 0
      } else if (this.blankList.length === 0 && this.exampleList.length !== 0) {
        this.queryParam.docFlag = 1
      }

      this.form.validateFields(err => {
        if (!err) {
          this.queryParam.classOfService = formObj.classOfService || ''
          this.queryParam.twoClassOfServiceCode =
						formObj.twoClassOfServiceCode || ''
          this.queryParam.insuranceCode = formObj.insuranceCode || ''

          if (this.blankList.length !== 0) {
            this.blankList.forEach(file => {
              let formData = new FormData()
              formData.append('multipartFile', file)
              formData.append('insuranceCode', this.queryParam.insuranceCode)
              formData.append(
                'twoClassOfServiceCode',
                this.queryParam.twoClassOfServiceCode
              )
              formData.append('docFlag', this.queryParam.docFlag)
              getUploadInsurancePolicyDoc(formData)
              getSaveUploadInsurancePolicy(formData).then(res => {
                if (res.code === 200) {
                  this.$notification.success({
                    message: '上传成功！'
                  })
                  this.handleModalCancel()
                } else {
                  this.$notification.error({
                    message: '上传失败，请重试！'
                  })
                }
              })
            })
          }
          if (this.exampleList.length !== 0) {
            this.exampleList.forEach(file => {
              let formData = new FormData()
              formData.append('multipartFile', file)
              formData.append('insuranceCode', this.queryParam.insuranceCode)
              formData.append(
                'twoClassOfServiceCode',
                this.queryParam.twoClassOfServiceCode
              )
              formData.append('docFlag', this.queryParam.docFlag)
              getUploadInsurancePolicyPic(formData)
              getSaveUploadInsurancePolicy(formData).then(res => {
                if (res.code === 200) {
                  this.$notification.success({
                    message: '上传成功！'
                  })
                  this.handleModalCancel()
                } else {
                  this.$notification.error({
                    message: '上传失败，请重试！'
                  })
                }
              })
            })
          }
        }
      })
    },
    // 预览
    handleUploadPreview (file) {
      this.$emit('viewPdfOrImg', file.thumbUrl)
    }
  }
}
</script>

<style lang="less">
.clearfix::after {
	clear: both;
	display: block;
	content: '';
}
.operateModal {
	h3 {
		font-size: 16px;
		color: rgba(80, 80, 80, 1);
		font-weight: bold;
	}
	.ant-modal-header {
		background: rgba(42, 130, 228, 1);
		.ant-modal-title {
			color: #fff;
			font-weight: bold;
		}
	}
	.modalTop {
		padding-bottom: 10px;
		border-bottom: 1px dashed #ccc;

		.modalTopRight {
			.btn {
				width: 101px;
				height: 115px;
				background: rgba(67, 207, 124, 1);
				color: #fff;
				border: none;
				font-size: 20px;
				float: right;
			}
		}
	}
	.modalBottom {
		padding-top: 30px;
		h3 {
			font-size: 14px;
		}
		.spec {
			.ant-upload {
				width: 100%;
			}
		}
		.ant-upload,
		.ant-upload-list-item {
			width: 150px;
			height: 180px;
		}
	}
	.modalBtnClose {
		width: 80px;
		margin: 10px auto 0;
		.ant-btn {
			background: rgba(42, 130, 228, 1);
			border: none;
		}
	}
}
</style>
