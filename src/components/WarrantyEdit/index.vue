<template>
	<a-modal title="保单管理-保单服务编辑"
		:visible="visible"
		@cancel="handleModalCancel"
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
					<a-form layout="inline">
						<div>
							<a-form-item label="服务类别">
								<a-select placeholder="请选择"
									v-model="queryParam.serviceType"
									default-value="0"
									style="width:120px;"
									@change="handleServiceTypeChange">
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
								</a-select>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="二级类别">
								<a-select placeholder="请选择"
									v-model="queryParam.secondLevel"
									default-value="0"
									style="width:120px;"
									@change="handleSecondLevelChange">
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
								</a-select>
								<a-form-item style="margin-left: 10px;">
									<a-input v-model="queryParam.secondLevel"
										placeholder="自定义" />
								</a-form-item>
							</a-form-item>
						</div>
						<div>
							<a-form-item label="
								保险公司">
								<a-select placeholder="请选择"
									v-model="queryParam.company"
									default-value="0"
									style="width:120px;"
									@change="handleCompanyChange">
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
								</a-select>
								<a-form-item style="margin-left: 10px;">
									<a-input v-model="queryParam.company"
										placeholder="自定义" />
								</a-form-item>
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
						<a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							:fileList="blankList"
							@change="handleBlankUpload"
							:class="blankList.length>0 ? '':'spec' ">
							<div v-if="blankList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">空白文档</div>
							</div>
						</a-upload>
					</div>
					<div>
						<p>支持格式：JPG、JPRG、PNG、PDF</p>
						<p>存储要求：单个文件小于2MB</p>
					</div>
				</a-col>
				<a-col :xl="12"
					:lg="12"
					:md="12"
					:sm="12"
					:xs="12">
					<h3>样例上传</h3>
					<div class="clearfix">
						<a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							:fileList="exampleList"
							@change="handleExampleUpload"
							:class="exampleList.length>0?'':'spec'">
							<div v-if="exampleList.length < 2">
								<a-icon type="plus" />
								<div class="ant-upload-text">空白文档</div>
							</div>
						</a-upload>
					</div>
					<div>
						<p>支持格式：JPG、JPRG、PNG、PDF</p>
						<p>存储要求：单个文件小于2MB</p>
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
export default {
  props: ['visible'],
  data () {
    return {
      queryParam: {},
      blankList: [],
      exampleList: []
    }
  },
  methods: {
    // 关闭模态框
    handleModalCancel (e) {
      this.$emit('handleWarrantyEditClose')
    },
    // 选择服务类别
    handleServiceTypeChange () {},
    // 选择等级
    handleSecondLevelChange () {},
    // 选择服务公司
    handleCompanyChange () {},
    // 保存
    handleSave () {},
    // 处理上传空白文档
    handleBlankUpload ({ fileList }) {
      this.blankList = fileList
    },
    // 处理上传样例
    handleExampleUpload ({ fileList }) {
      this.exampleList = fileList
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
