<template>
	<a-card class="cardIntroduceWrapper"
		:hoverable="false"
		:bordered="false">
		<a-descriptions bordered
			title="机构简介"
			:column="4">
			<a-descriptions-item :span="4">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('introductionToDescribe')}">简介描述</span>
				<a-form-item>
					<a-input placeholder="请输入简介描述"
						v-decorator="['introductionToDescribe']"></a-input>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('mechanismPortraitLabel')}">机构画像标签</span>
				<a-form-item>
					<a-tag @click="addTag"> + 新增标签</a-tag>
					<a-tag closable
						v-for="(item,index) in tagsList"
						:key="index">
						{{item}}
					</a-tag>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2"
				label="档案最后更新时间">
				<a-form-item>
					{{basicInfo.lastModifiedTime}}
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2"
				label="操作人">
				<a-form-item>
					{{basicInfo.lastModifier}}
				</a-form-item>
			</a-descriptions-item>
		</a-descriptions>
		<a-modal title="新增标签"
			:visible="visible"
			@ok="handleOk"
			@cancel="handleCancel">
			<a-input type="text"
				v-model="newTag"></a-input>
		</a-modal>
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
      },
      visible: false,
      newTag: '',
      tagsList: []
    }
  },
  methods: {
    addTag () {
      this.visible = true
    },
    handleOk () {
      this.tagsList = [...this.tagsList, this.newTag]
      this.newTag = ''
      this.visible = false
    },
    handleCancel () {
      this.newTag = ''
      this.visible = false
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
.cardIntroduceWrapper {
	.ant-card-body {
		padding: 0;
	}
}
</style>
