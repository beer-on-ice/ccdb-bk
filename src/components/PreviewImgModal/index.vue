<template>
	<a-modal class="consultantPreviewModal"
		:title="modalInfo.title"
		:visible="modalInfo.previewVisible"
		:footer="null"
		@cancel="handlePreviewCancel">
		<img :src="modalInfo.src"
			style="width:100%;">
	</a-modal>
</template>

<script>
export default {
  props: ['modalInfo'],
  methods: {
    handlePreviewCancel () {
      this.$emit('handlePreviewCancel', {
        title: '查看大图',
        src: '',
        previewVisible: false
      })
    }
  }
}
</script>

<style lang="less">
.consultantPreviewModal {
	.ant-modal {
		width: 60% !important;
	}
	.pdfWrapper {
		width: 100%;
		overflow-y: scroll;
	}
	.ant-modal-body {
		text-align: center;
		padding: 35px;
	}
}
</style>
