<template>
	<a-card class="cardSeoWrapper"
		:hoverable="false"
		:bordered="false">
		<a-descriptions bordered
			title="SEO设置"
			:column="3">
			<a-descriptions-item :span="3">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('seoTitle')}">SEO标题</span>
				<a-form-item>
					<div class="flex-s-c">
						<a-textarea v-decorator="['seoTitle']"></a-textarea>
					</div>
					<span style="line-height:1;">支持:
						$title(当前标题，可代指资讯标题 或 栏目名称 或 平台名称)$cname(当前所属类别名称)$keyword(当前搜索关键字 ， 可代指当前用户的输入关键字)
					</span>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="3">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('seoTag')}">SEO标签</span>
				<a-form-item>
					<a-textarea v-decorator="['seoTag']"></a-textarea>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="3">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('seoDescription')}">SEO描述</span>
				<a-form-item>
					<a-textarea v-decorator="['seoDescription']"></a-textarea>
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
  },
  data () {
    return {
      currData: {
        notPassList: []
      }
    }
  },
  watch: {
    basicInfo (newVal, oldVal) {
      this.currData = { ...newVal }
    }
  }
}
</script>

<style lang="less">
.cardSeoWrapper {
	.ant-card-body {
		padding: 0;
	}
	.ant-card-grid {
		> div {
			width: 60%;
		}
		span {
			width: 350px;
			margin-left: 20px;
		}
	}
}
</style>
