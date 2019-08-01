<template>
	<a-modal title="保单管理-预约体检反馈"
		:visible="visible"
		@cancel="handleCancel"
		width="800px"
		:footer="null"
		class="operateModal">
		<div class="modalTop">
			<h3>基本信息</h3>
			<a-row>
				<a-col class="modalTopLeft" :xl="18" :lg="18" :md="18" :sm="18" :xs="18">
					<a-row style="margin-bottom:10px">用户ID: 123456</a-row>
					<a-row style="margin-bottom:10px">
                        <a-col :span="8">用户昵称: 123456</a-col>
                        <a-col :span="6" :offset="4">
                            <a-input size="small" placeholder="用户姓名备注"></a-input>
                        </a-col>
                    </a-row>
					<a-row style="margin-bottom:10px">
                        <a-col :span="8">联系方式: 13911855888</a-col>
                        <a-col :span="6" :offset="4">
                            <a-input size="small" placeholder="联系方式备注"></a-input>
                        </a-col>
                    </a-row>
				</a-col>
				<a-col class="modalTopRight" :xl="4" :lg="4" :md="4" :sm="4" :xs="4">
					<a-button type="primary" class="btn" @click="handleSave">保存</a-button>
				</a-col>
			</a-row>
		</div>
        <div class="modalCenter">
            <span style="margin-right:10px">服务类别:</span>
            <a-tag color="#87d068">体检预约</a-tag>
        </div>
		<div class="modalBottom">
			<a-row>
				<a-col :span="16" style="border-right:1px dashed rgba(229, 229, 229, 1);">
					<h3><i style="color:rgba(212, 48, 48, 1)">*</i>反馈信息</h3>
					<div class="clearfix">
						<a-textarea placeholder="请在此输入反馈信息" style="width: 470px;height: 165px;resize:none"></a-textarea>
					</div>
				</a-col>
				<a-col :span="7" :offset="1">
					<h3><i style="color:rgba(212, 48, 48, 1)">*</i>反馈人</h3>
					<div class="clearfix">
						<a-input placeholder="请输入姓名"></a-input>
					</div>
					<div style="margin-top:40px">
						<h3><i style="color:rgba(212, 48, 48, 1)">*</i>意向程度</h3>
                        <template>
                            <a-radio-group name="radioGroup" :defaultValue="1">
                                <a-radio :value="1">较高</a-radio>
                                <a-radio :value="2">一般</a-radio>
                                <a-radio :value="3">较低</a-radio>
                            </a-radio-group>
                        </template>

					</div>
				</a-col>
			</a-row>
		</div>
		<div class="modalBtnClose">
			<a-button @click="handleCancel" type="primary" block>关闭</a-button>
		</div>
	</a-modal>
</template>

<script>
export default {
  data () {
    return {
      queryParam: {},
      blankList: [],
      exampleList: [],
      visible: false
    }
  },
  methods: {
    // 保存
    handleSave () {
        console.log('点击保存按钮');
    },
    // 处理上传空白文档
    handleBlankUpload ({ fileList }) {
      this.blankList = fileList
    },
    // 处理上传样例
    handleExampleUpload ({ fileList }) {
      this.exampleList = fileList
    },
    // 打开模态框
    edit (record) {
        this.visible = true
    },
    // 关闭模态框
    handleCancel () {
        this.visible = false
    },
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
    .modalCenter {
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #ccc;
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
		margin: 30px auto 0;
		.ant-btn {
			background: rgba(42, 130, 228, 1);
			border: none;
		}
	}
}
</style>
