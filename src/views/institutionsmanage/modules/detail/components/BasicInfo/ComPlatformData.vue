<template>
	<a-card class="cardPlatformDataWrapper"
		:hoverable="false"
		:bordered="false">
		<a-descriptions bordered
			title="平台数据"
			:column="4">
			<a-descriptions-item :span="4"
				label="机构浏览量">
				<a-form-item>
					{{basicInfo.organizationViewAmount}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="旗下产品浏览量">
				<a-form-item>
					{{basicInfo.productViewAmount}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="旗下记账数">
				<a-form-item>
					{{basicInfo.productBill}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="机构被关注数">
				<a-form-item>
					{{basicInfo.organizationFollower}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="机构旗下关注数">
				<a-form-item>
					{{basicInfo.institutionsFollower}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="机构被评论数">
				<a-form-item>
					{{basicInfo.organizationNumberOfComments}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="全部舆情数">
				<a-form-item>
					{{basicInfo.popularFeelingsCount}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="最后舆情时间">
				<a-form-item>
					{{basicInfo.popularFeelingsTime}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="全部评论数">
				<a-form-item>
					{{basicInfo.numberOfComments}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="最后评论时间">
				<a-form-item>
					{{basicInfo.lastCommentTime}}
				</a-form-item>
			</a-descriptions-item>
		</a-descriptions>
	</a-card>
</template>

<script>
export default {
  props: {
    basicInfo: {
      default: {},
      required: true
    }
  }
}
</script>

<style lang="less">
.cardPlatformDataWrapper {
	.ant-card-body {
		padding: 0;
	}
}
</style>
