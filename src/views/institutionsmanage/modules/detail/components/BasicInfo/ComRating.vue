<template>
	<a-card class="cardRatingWrapper"
		:hoverable="false"
		:bordered="false">
		<a-descriptions bordered
			title="评分评级"
			:column="4">
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('comprehensiveScoreCorrection')}">综合分值</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.comprehensiveScore}}</span>
						<span>{{basicInfo.comprehensiveScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['comprehensiveScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2"
				label="模型得分">
				<a-form-item>
					<span>{{basicInfo.systemScore}}</span>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('vietinbanhScoreCorrection')}">工商得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.vietinbanhScore}}</span>
						<span>{{basicInfo.vietinbanhScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['vietinbanhScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('creditScoreCorrection')}">信用得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.creditScore}}</span>
						<span>{{basicInfo.creditScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['creditScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('recordScoreCorrection')}">备案得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.recordScore}}</span>
						<span>{{basicInfo.recordScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['recordScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('productScoreCorrection')}">产品得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.productScore}}</span>
						<span>{{basicInfo.productScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['productScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('performanceScoreCorrection')}">业绩得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.performanceScore}}</span>
						<span>{{basicInfo.performanceScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['performanceScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('hierarchyScoreCorrection')}">平台得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.hierarchyScore}}</span>
						<span>{{basicInfo.hierarchyScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['hierarchyScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('situationScoreCorrection')}">舆情得分</span>
				<a-form-item>
					<div class="flex-a-c">
						<span>{{basicInfo.situationScore}}</span>
						<span>{{basicInfo.situationScoreSystem}} (系统值)</span>
						<span>修正分值：<a-input style="width:50px"
								v-decorator="['situationScoreCorrection']"></a-input>
						</span>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('includedInTheList')||currData.notPassList.includes('includedInTheListShowhidden')}">入选榜单</span>
				<a-form-item>
					<div>
						<a-tag @click="addTag"> + 添加榜单</a-tag>
						<a-tag closable
							v-for="(item,index) in tagList"
							:key="index">
							{{item}}
						</a-tag>
						<a-radio-group style="margin-left: 20px"
							name="radioGroup"
							:default-value="0"
							v-decorator="['includedInTheListShowhidden']">
							<a-radio :value="0">
								显示
							</a-radio>
							<a-radio :value="1">
								隐藏
							</a-radio>
						</a-radio-group>
					</div>
				</a-form-item>
			</a-descriptions-item>
		</a-descriptions>
	</a-card>
</template>

<script>
export default {
  data () {
    return {
      currData: {
        notPassList: []
      },
      tagList: []
    }
  },
  props: {
    basicInfo: {
      default: {},
      required: true
    }
  },
  methods: {
    addTag () {
      alert('此版本不实现')
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
.cardRatingWrapper {
	.ant-card-body {
		padding: 0;
	}
}
</style>
