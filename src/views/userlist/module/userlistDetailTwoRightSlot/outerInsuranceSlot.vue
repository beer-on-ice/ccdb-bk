<template>
	<div class="outerInsuranceSlotWrapper">
		<a-card title="保单基本信息">
			<div slot="extra">
				<span>记账日期：{{info.createTime}}</span>
			</div>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>保险名称</p>
					<p>{{info.insuranceName}}</p>
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
					<p>保险公司</p>
					<p>{{info.insuranceCompanyName}}</p>
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
					<p>计算货币</p>
					<p>{{info.currencyType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>首期保费</p>
					<p>{{info.firstPremium}}</p>
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
		<a-card title="保单明细">
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
					<p>保障期限（年）</p>
					<p>{{info.protectionDuration}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>是否帮填</p>
					<p>{{info.filledByAdviser}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<!-- <a-card title="舆情信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>自身舆情</p>
					<p>{{info.insuranceName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>周边舆情</p>
					<p>{{info.insuranceName}}</p>
				</div>
			</a-card-grid>
		</a-card> -->
	</div>
</template>

<script>
export default {
  props: ['info']
}
</script>
