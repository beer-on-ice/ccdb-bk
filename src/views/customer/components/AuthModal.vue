<template>
	<a-modal :title="modalInfo.title"
		v-model="modalInfo.visible"
		class="authModal">
		<template slot="footer">
			<a-button key="submit"
				type="primary"
				@click="handleSubmitModal">
				提交
			</a-button>
			<a-button key="back"
				@click="handleCancelModal">取消</a-button>
		</template>
		<slot></slot>
	</a-modal>
</template>

<script>
export default {
  props: {
    modalInfo: {
      required: true,
      default: {
        title: '',
        visible: false
      }
    }
  },
  methods: {
    handleSubmitModal () {
      this.$emit('modalSubmit')
    },
    handleCancelModal () {
      this.$emit('modalCancel')
    }
  }
}
</script>

<style lang="less">
.authModal {
	width: 50% !important;
	.ant-modal-header {
		background: rgba(42, 130, 228, 1);
		div {
			color: #fff;
			font-weight: bold;
		}
	}
	.ant-modal-footer {
		text-align: center;
	}
}
</style>
