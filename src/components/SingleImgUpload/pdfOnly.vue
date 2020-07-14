<template>
	<div class="singleImgUploadNewWrapper">
		<div class="avatarWrapper"
			v-if="uploadInfo.showOffList.winPath">
			<pdf class="pdfWrapper"
				:src="uploadInfo.showOffList.winPath"
				v-if="uploadInfo.showOffList.winPath.endsWith('.pdf')"></pdf>
			<img v-else
				:src="uploadInfo.showOffList.winPath">
			<div class="mask">
				<a-icon type="eye"
					@click="handlePreviewImg(uploadInfo.showOffList)" />
				<a-icon type="delete"
					@click="handleDeleteUpload(uploadInfo.showOffList.fileUrl)" />
			</div>
		</div>
		<a-upload class="uploadBtn"
			v-else
			name="multipartFile"
			:headers='myHeaders'
			:action="actionUrl"
			listType="picture-card"
			:fileList="uploadInfo.fileList"
			:beforeUpload="beforeUpload"
			:showUploadList="{ showPreviewIcon: (uploadInfo.fileList&&uploadInfo.fileList.length&&uploadInfo.fileList[0].type!=='application/pdf'?true:false), showRemoveIcon: true }"
			@preview="files => handlePreviewImg(files)"
			@change="files => handleUploadChange(files)"
			:remove="files => handleRemoveUpload(files)">
			<div class="wrapper"
				v-if="uploadInfo.fileList.length<1">
				<a-icon type="plus"></a-icon>
				<p className="ant-upload-text">{{title}}</p>
			</div>
		</a-upload>
	</div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import pdf from 'vue-pdf'

export default {
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) } // 上传图片用到
    }
  },
  props: ['title', 'actionUrl', 'uploadInfo'],
  components: {
    pdf
  },
  methods: {
    beforeUpload (file) {
      const isJPG =
				file.type === 'application/pdf' ||
				file.type ===
					'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
				file.type === 'application/vnd.ms-powerpoint'
      if (!isJPG) {
        this.$notification.error({
          message: '只能上传 ppt/pptx/pdf 格式的文件'
        })
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$notification.error({
          message: '文件必须小于2M'
        })
      }
      return isJPG && isLt2M
    },
    handleDeleteUpload (files) {
      this.$emit('handleDeleteUpload', files)
    },
    handlePreviewImg (files) {
      this.$emit('handlePreviewImg', files)
    },
    handleUploadChange (files) {
      this.$emit('handleUploadChange', files)
    },
    handleRemoveUpload (files) {
      this.$emit('handleRemoveUpload', files)
    }
  }
}
</script>

<style lang="less">
.singleImgUploadNewWrapper {
	.uploadBtn {
		width: 180px;
		height: 114px;
		// background-color: rgba(229, 229, 229, 1);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		.ant-upload-list-picture-card .ant-upload-list-item-info:before {
			left: 0;
			top: 0;
		}
		.ant-upload,
		.ant-upload-list-item {
			margin: 0;
			width: 180px;
			height: 114px;
			.ant-upload-list-item-info {
				span {
					width: 100%;
					height: 100%;
				}
			}
		}
		.wrapper {
			i {
				font-size: 30px;
				font-weight: bold;
				padding-bottom: 20px;
				color: rgba(128, 128, 128, 1);
			}
			p {
				font-size: 14px;
				color: rgba(80, 80, 80, 1);
			}
		}
	}
	.avatarWrapper {
		position: relative;
		display: inline-block;
		margin-right: 10px;
		margin-top: 10px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		padding: 8px;
		width: 180px;
		height: 114px;
		img {
			width: 100%;
			height: 100%;
		}
		.pdfWrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			display: none;
			align-items: center;
			justify-content: center;
			i {
				font-size: 16px;
				color: #fff;
				margin: 0 3px;
			}
		}
		&:hover {
			.mask {
				display: flex;
			}
		}
	}
}
</style>
