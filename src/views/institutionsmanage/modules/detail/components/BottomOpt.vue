<template>
	<div class="bottomOptWrapper">
		<a-card class="mt-20"
			title="提交修改申请">
			<a-form-item>
				<a-textarea :disabled="disabled"
					placeholder="请详细描述修改的具体内容及修改原因"
					v-decorator="['modificationRecord']"></a-textarea>
			</a-form-item>
			<a-button class="mt-20"
				type="primary"
				@click="submit">提交</a-button>
			<a-button class="mt-20"
				style="margin-left:10px;"
				@click="back">返回</a-button>
		</a-card>
		<archive-check-record class="mt-20"
			:recordList="recordList"></archive-check-record>
	</div>
</template>

<script>
import ArchiveCheckRecord from './../../../components/ArchiveCheckRecord'
export default {
  components: {
    ArchiveCheckRecord
  },
  props: ['disabled', 'recordList'],
  methods: {
    submit () {
      this.$emit('submit')
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">
.bottomOptWrapper {
	position: relative;
	z-index: 999;
}
</style>
