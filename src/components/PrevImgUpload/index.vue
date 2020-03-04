<template>
	<div class="preImgUploadWrapper">
		<div class="avatarWrapper"
			v-if="uploadInfo.showOffList.winPath">
			<img :src="uploadInfo.showOffList.winPath"
				alt="资质">
			<div class="mask">
				<a-icon type="eye"
					@click="handlePreviewImg(uploadInfo.showOffList)" />
				<a-icon type="delete"
					@click="handleDeleteUpload(uploadInfo.showOffList)" />
			</div>
		</div>
		<a-upload class="uploadBtn"
			v-else
			:fileList="uploadInfo.fileList"
			:beforeUpload="beforeUpload"
			:disabled="uploadInfo.fileList.length !== 0"
			:remove="handleRemoveUpload">
			<div class="wrapper"
				v-if="uploadInfo.fileList.length<1">
				<a-icon type="plus"></a-icon>
				<p className="ant-upload-text">{{uploadTitle}}</p>
			</div>
		</a-upload>
	</div>
</template>

<script>
export default {
  props: ['uploadTitle', 'uploadInfo', 'beforeUpload', 'handleRemoveUpload'],
  methods: {
    handlePreviewImg (file) {
      this.$emit('handlePreviewImg', file)
    },
    handleDeleteUpload (file) {
      this.$emit('handleDeleteUpload', file)
    }
  }
}
</script>

<style lang="less">
.preImgUploadWrapper {
	.uploadBtn {
		width: 180px;
		height: 114px;
		background-color: rgba(229, 229, 229, 1);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
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
	.ant-upload-list.ant-upload-list-text {
		overflow: hidden;
	}
	.avatarWrapper {
		display: inline-block;
		position: relative;
		margin-right: 10px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		padding: 8px;
		img {
			width: 86px;
			height: 86px;
		}
		.mask {
			position: absolute;
			top: 8px;
			left: 8px;
			right: 8px;
			bottom: 8px;
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
