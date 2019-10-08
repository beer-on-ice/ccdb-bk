<template>
	<div class="insuranceSlotWrapper">
		<a-card title="保单基本信息">
			<div slot="extra">
				<span>首次记账日期：{{info.createTime}}</span>
				<span style="margin-left:10px;">最后修改时间：{{info.updateTime}}</span>
			</div>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保单类型</p>
					<p>{{info.codeDesc}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保单编号</p>
					<p>{{info.contractNo}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>公司名称</p>
					<p>{{info.insuranceCompanyName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>首期保费</p>
					<p>{{info.singlePremium}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>已缴费次数</p>
					<p>{{info.paidTimes}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>生效日期</p>
					<p>{{info.infectiveDate}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投保人</p>
					<p>{{info.customerName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>被投保人</p>
					<p>{{info.insuredName}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="主险">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>主险名称</p>
					<p>{{info.insuranceName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>险种类型</p>
					<p>{{info.insuranceType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保额</p>
					<p>{{info.insuranceAmount}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>缴费时长</p>
					<p>{{info.paymentPeriod}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>缴费方式</p>
					<p>{{info.paymentType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保障年限</p>
					<p>{{info.timeOfGuarantee}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="附加险"
			v-for="item in info.insuranceAdditionalResponses"
			:key="item.id">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>附加险名称</p>
					<p>{{item.guaranteeName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>险种类型</p>
					<p>{{item.insuranceType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保额</p>
					<p>{{item.insuranceAmount}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>缴费时长</p>
					<p>{{item.paymentPeriod}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>缴费方式</p>
					<p>{{item.paymentType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保障年限</p>
					<p>{{item.timeOfGuarantee}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="其他信息">
			<a-card-grid style="width:100%;textAlign:'center'">
				<div>
					<p>是否帮填</p>
					<p>{{info.whetherHelp}}</p>
				</div>
			</a-card-grid>
		</a-card>
	</div>
</template>

<script>
export default {
  props: ['info']
}
</script>
