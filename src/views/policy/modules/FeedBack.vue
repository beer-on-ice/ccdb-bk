<template>
	<a-modal title="保单管理-保单咨询反馈"
		:visible="visible"
		@cancel="handleCancel"
		width="800px"
		:footer="null"
		:destroyOnClose="true"
		class="operateModal">
		<a-form layout="horizontal"
			:form="form">
			<div class="modalTop">
				<h3>基本信息</h3>
				<a-row>
					<a-col class="modalTopLeft"
						:xl="18"
						:lg="18"
						:md="18"
						:sm="18"
						:xs="18">
						<a-row style="margin-bottom:10px">
							<span>用户ID:</span>
							<span>{{userInfo.userId}}</span>
						</a-row>
						<a-row style="margin-bottom:10px">
							<a-col :span="8">
								<span>用户昵称:</span>
								<span>{{userInfo.petName}}</span>
							</a-col>
							<a-col :span="6"
								:offset="4">
								<a-input size="small"
									placeholder="用户姓名备注"
									v-model="userInfo.usernameRemark"></a-input>
							</a-col>
						</a-row>
						<a-row style="margin-bottom:10px">
							<a-col :span="8">
								<span>联系方式:</span>
								<span>{{userInfo.mobile}}</span>
							</a-col>
							<a-col :span="2"
								:offset="2">
								<div :class="userInfo.serviceState==2?'isWrong active':'isWrong'"
									@click="handleServeState">信息有误</div>
							</a-col>
							<a-col :span="6"
								:offset="4">
								<a-input size="small"
									placeholder="联系方式备注"
									v-model="userInfo.mobileRemark"></a-input>
							</a-col>
						</a-row>
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
			<a-row class="modalCenter">
				<a-row>
					<a-col :span="8">
						<div>
							<span style="margin-right:10px">服务类别: </span>
							<a-tag color="#87d068">{{userInfo.cos==0?'体检预约':'保单咨询'}}</a-tag>
						</div>
					</a-col>
					<a-col :span="8">
						<span>保险公司: </span>
						<span>{{userInfo.insuranceCompanyName}}</span>
					</a-col>
					<a-col :span="8">
						<span>保险产品: </span>
						<span>{{userInfo.insuranceProduct}}</span>
					</a-col>
				</a-row>
				<a-row style="margin-top:10px">
					<a-col :span="2"
						style="margin-right:10px">问题描述:</a-col>
					<a-col :span="20">
						<div style="background-color:rgba(230, 230, 230, 1)">
							<p>{{userInfo.problemDescription}}</p>
						</div>
					</a-col>
				</a-row>
			</a-row>
			<div class="modalBottom">

				<a-row>
					<a-col :span="16"
						style="border-right:1px dashed rgba(229, 229, 229, 1);">
						<h3><i style="color:rgba(212, 48, 48, 1)">*</i>反馈信息</h3>
						<div class="clearfix">
							<a-form-item>

								<a-textarea placeholder="请在此输入反馈信息"
									style="width: 470px;height: 165px;resize:none"
									v-decorator="[
          'feedbackInformation',
          {rules: [{ required: true, message: '请在此输入反馈信息', trigger: 'change' }]}
        ]" />
							</a-form-item>

						</div>
					</a-col>
					<a-col :span="7"
						:offset="1">
						<h3><i style="color:rgba(212, 48, 48, 1)">*</i>反馈人</h3>
						<div class="clearfix">
							<a-form-item>

								<a-input placeholder="请输入姓名"
									v-decorator="[
          'feedbackPerson',
          {rules: [{ required: true, message: '请输入姓名', trigger: 'change' }]}
        ]" />
							</a-form-item>

						</div>
					</a-col>
				</a-row>
			</div>
		</a-form>
		<div class="modalBtnClose">
			<a-button @click="handleCancel"
				type="primary"
				block>关闭</a-button>
		</div>
	</a-modal>
</template>

<script>
import {
  getInsuranceConsultationFeedback,
  getShowConsultService
} from '@/api/customer'
import { userInfo } from 'os'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      userInfo: {
        petName: '',
        mobile: '',
        usernameRemark: '',
        mobileRemark: '',
        serviceState: '', // 服务类别
        insuranceCompanyName: '', // 保险公司
        insuranceProduct: '', // 保险产品
        problemDescription: '',
        feedbackInformation: '',
        feedbackPerson: ''
      },
      visible: false
    }
  },
  methods: {
    getInfo (id) {
      getShowConsultService({ id }).then(res => {
        this.userInfo = { ...res.data }
        this.form.setFieldsValue({
          feedbackInformation: res.data.feedbackInformation,
          feedbackPerson: res.data.feedbackPerson
        })
      })
    },
    handleServeState () {
      if (this.userInfo.serviceState === 2) {
        this.userInfo.serviceState = ''
      } else {
        this.userInfo.serviceState = 2
      }
    },
    // 打开模态框
    edit (id) {
      this.visible = true
      this.getInfo(id)
    },
    // 关闭模态框
    handleCancel () {
      this.visible = false
    },
    // 保存
    handleSave () {
      let formObj = this.form.getFieldsValue([
        'feedbackInformation',
        'feedbackPerson'
      ])

      this.form.validateFields(err => {
        if (!err) {
          let param = {
            id: this.userInfo.id,
            serviceState: this.userInfo.serviceState === 2 ? 2 : 1,
            feedbackInformation: formObj.feedbackInformation,
            feedbackPerson: formObj.feedbackPerson,
            usernameRemark: this.userInfo.usernameRemark || '',
            mobileRemark: this.userInfo.mobileRemark || ''
          }
          console.log(param)
          getInsuranceConsultationFeedback(param).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '保存成功！'
              })
              this.$emit('saveOk')
              this.handleCancel()
            } else {
              this.$notification.error({
                message: res.msg || '保存失败，请重试'
              })
            }
          })
        }
      })
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
	.isWrong {
		background: #ccc;
		font-size: 16px;
		padding: 5px;
		&.active {
			background: red;
			color: #fff;
		}
	}
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
	.modalCenter {
		padding-top: 15px;
		padding-bottom: 15px;
		border-bottom: 1px dashed #ccc;
	}
	.modalBottom {
		padding-top: 25px;
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
		margin: 30px auto 0;
		.ant-btn {
			background: rgba(42, 130, 228, 1);
			border: none;
		}
	}
}
</style>
