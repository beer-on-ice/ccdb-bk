<template>
	<a-modal title="保单管理-保单服务编辑"
		:visible="visible"
		@cancel="handleModalCancel"
		width="800px"
		:destroyOnClose="true"
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
					<a-form layout="inline">
						<div>
							<a-form-item label="服务类别">
								<p>{{info.classOfService}}</p>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="二级类别">
								<p>{{info.twoClassOfService}}</p>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="
								保险公司">
								{{info.insuranceName}}
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
							:fileList="blankList"
							:beforeUpload="beforeDocUpload"
							:remove="handleDocRemove"
							:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
							v-if="!info.docUrl.length"
							:class="blankList.length>0 ? '':'spec' ">
							<div v-if="blankList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">空白文档</div>
							</div>
						</a-upload>
						<div v-else
							class="hasPhoto">
							<a-popconfirm title="确定要删除此图片吗？"
								v-for="item in info.docUrl"
								:key="item.path"
								@confirm="deleteUpload(item,0)"
								okText="确定"
								cancelText="取消">
								<div class="pho"
									style="width:50%;">
									<img style="width:100%;"
										:src="item.path"
										v-if="item.type!=='PDF'" />
									<pdf :src="item.path"
										v-else
										style="width:100px; height:100px;margin-left:10px"></pdf>
									<span class="operate">
										<a-icon type="delete"
											style="font-size:16px;color:#fff;" />
									</span>
								</div>
							</a-popconfirm>
							<a-upload listType="picture-card"
								:beforeUpload="beforeDocUpload"
								:remove="handleDocRemove"
								:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
								:fileList="blankList"
								v-if="info.docUrl.length===1">
								<div v-if="(blankList.length+info.docUrl.length) < 2">
									<a-icon type="plus" />
									<div class="ant-upload-text">空白文档</div>
								</div>
							</a-upload>
						</div>
					</div>
					<p>支持格式：JPG、JPEG、PNG、PDF</p>
				</a-col>
				<a-col :xl="12"
					:lg="12"
					:md="12"
					:sm="12"
					:xs="12">
					<h3>样例上传</h3>
					<div class="clearfix">
						<a-upload listType="picture-card"
							v-if="!info.picUrl.length"
							:beforeUpload="beforeExpUpload"
							:remove="handlePicRemove"
							:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
							:fileList="exampleList"
							:class="exampleList.length > 0 ? '' : 'spec' ">
							<div v-if="exampleList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">样例模板</div>
							</div>
						</a-upload>
						<div v-else
							class="hasPhoto">
							<a-popconfirm title="确定要删除此图片吗？"
								v-for="item in info.picUrl"
								:key="item.path"
								@confirm="deleteUpload(item,1)"
								okText="确定"
								cancelText="取消">
								<div class="pho"
									style="width:50%;">
									<img style="width:100%;"
										:src="item.path"
										v-if="item.type!=='PDF'" />
									<pdf :src="item.path"
										v-else
										style="width:100px; height:100px;margin-left:10px"></pdf>
									<span class="operate">
										<a-icon type="delete"
											style="font-size:16px;color:#fff;" />
									</span>
								</div>
							</a-popconfirm>
							<a-upload listType="picture-card"
								:beforeUpload="beforeExpUpload"
								:remove="handlePicRemove"
								:showUploadList="{ showPreviewIcon: false, showRemoveIcon: true }"
								v-if="info.picUrl.length===1"
								:fileList="exampleList">
								<div v-if="(exampleList.length+info.picUrl.length) < 2">
									<a-icon type="plus" />
									<div class="ant-upload-text">样例模板</div>
								</div>
							</a-upload>
						</div>
					</div>
					<p>支持格式：JPG、JPEG、PNG、PDF</p>
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
import {
  getShowInsurancePolicy,
  getSaveUploadInsurancePolicy,
  getEditRemoveInsurancePolicy,
  getUploadInsurancePolicyDoc,
  getUploadInsurancePolicyPic
} from '@/api/policy'
import pdf from 'vue-pdf'

export default {
  props: ['visible'],
  components: {
    pdf
  },
  data () {
    return {
      info: {
        classOfService: '',
        twoClassOfService: '',
        insuranceName: '',
        docFlag: '',
        docUrl: [],
        picUrl: []
      },
      blankList: [],
      exampleList: []
    }
  },
  methods: {
    // 关闭模态框
    handleModalCancel (e) {
      this.blankList = []
      this.exampleList = []
      this.info = {
        classOfService: '',
        twoClassOfService: '',
        insuranceName: '',
        docFlag: '',
        docUrl: [],
        picUrl: []
      }
      this.$emit('handleWarrantyEditClose')
    },
    // 获取相关信息
    async getInfo (id) {
      if (id) {
        let res = await getShowInsurancePolicy({ id })
        this.info = { ...res.data }
      }
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
    // 保存
    handleSave () {
      if (this.blankList.length === 0 && this.exampleList.length === 0) {
        this.handleModalCancel()
        return
      }
      if (this.blankList.length === 0 && this.exampleList.length === 0) {
        this.info.docFlag = ''
      } else if (this.blankList.length !== 0 && this.exampleList.length !== 0) {
        this.info.docFlag = 2
      } else if (this.blankList.length !== 0 && this.exampleList.length === 0) {
        this.info.docFlag = 0
      } else if (this.blankList.length === 0 && this.exampleList.length !== 0) {
        this.info.docFlag = 1
      }

      if (this.blankList.length !== 0) {
        this.blankList.forEach(file => {
          let formData = new FormData()
          formData.append('multipartFile', file)
          formData.append('insuranceCode', this.info.insuranceCode)
          formData.append(
            'twoClassOfServiceCode',
            this.info.twoClassOfServiceCode
          )
          formData.append('docFlag', this.info.docFlag)
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
          formData.append('insuranceCode', this.info.insuranceCode)
          formData.append(
            'twoClassOfServiceCode',
            this.info.twoClassOfServiceCode
          )
          formData.append('docFlag', this.info.docFlag)
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
    },
    // 删除-本地的
    handleDocRemove (file) {
      const index = this.blankList.indexOf(file)
      const newFileList = this.blankList.slice()
      newFileList.splice(index, 1)
      this.blankList = newFileList
    },
    // 删除-本地的
    handlePicRemove (file) {
      const index = this.exampleList.indexOf(file)
      const newFileList = this.exampleList.slice()
      newFileList.splice(index, 1)
      this.exampleList = newFileList
    },
    // 删除-已存在的
    deleteUpload (item, type) {
      let param = {
        fileNames: item.name,
        docFlag: type,
        insuranceCode: this.info.insuranceCode,
        twoClassOfServiceCode: this.info.twoClassOfServiceCode
      }
      getEditRemoveInsurancePolicy(param).then(res => {
        if (res.code === 200) {
          this.$notification.success({
            message: '已删除'
          })

          if (type === 0) {
            this.info.docUrl = this.info.docUrl.filter(
              el => el.path !== item.path
            )
          } else {
            console.log(this.info.picUrl, item.path)
            this.info.picUrl = this.info.picUrl.filter(
              el => el.path !== item.path
            )
          }
        } else {
          this.$notification.success({
            message: '删除失败，请重试'
          })
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
		.hasPhoto {
			display: flex;
			justify-content: space-between;
			.pho {
				position: relative;
				&:hover::before {
					opacity: 1;
				}
				&:hover {
					.operate {
						opacity: 1;
					}
				}
				&::before {
					content: '';
					position: absolute;
					z-index: 1;
					background-color: rgba(0, 0, 0, 0.5);
					transition: all 0.3s;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				.operate {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 10;
					white-space: nowrap;
					opacity: 0;
					transition: all 0.3s;
				}
			}
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
