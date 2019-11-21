<template>
	<div class="goldSlotWrapper">
		<a-card title="基本信息">
			<div slot="extra">
				<span>首次记账日期：{{info.createTime}}</span>
				<span style="margin-left:10px;">最后修改时间：{{info.updateTime}}</span>
			</div>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>产品名称</p>
					<p>{{info.productName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>备案机构</p>
					<p>{{info.filingAgency}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>产品编号</p>
					<p>{{info.productCode}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>产品类型</p>
					<p>{{info.productTypeStr}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>合同编号</p>
					<p>{{info.contractNumber}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>发行人</p>
					<p>{{info.issuer}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>受托管理人</p>
					<p>{{info.trustee}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="投资详情">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投资本金</p>
					<p>{{info.purchaseMoney}}{{info.currencyType | currencyTypeFilter}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投资期限</p>
					<p>{{info.duration}}{{info.durationType | durationTypeFilter}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>起始日期</p>
					<p>{{info.investmentDate}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>到期日期</p>
					<p>{{info.dueTime}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>年化收益率（%）</p>
					<p>{{info.expectedAnnualYield}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>付息方式</p>
					<p>{{info.interestPaymentMethod}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>产品风险等级</p>
					<p>{{info.productRiskLevel}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="附加信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>回款银行</p>
					<p>{{info.paymentBank}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>银行卡后四位</p>
					<p>{{info.bankCardNumber}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>客户经理</p>
					<p>{{info.financialManagerName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>联系电话</p>
					<p>{{info.contactNumber}}</p>
				</div>
			</a-card-grid>
		</a-card>
	</div>
</template>

<script>
export default {
  props: ['info'],
  filters: {
    currencyTypeFilter (type) {
      switch (type) {
        case 2082:
          return '人民币（CNY）'
        case 2083:
          return '美元（USD）'
        case 2084:
          return 'N/A'
        case 2085:
          return '多币种（00）'
        case 2086:
          return '英镑（GBP）'
        case 2087:
          return '澳大利亚元（AUD）'
        case 2088:
          return '港元（HKD）'
        case 2089:
          return '其他（99）'
        case 2090:
          return '加拿大元（CAD）'
        case 2091:
          return '欧元（EUR）'
        case 2092:
          return '瑞士法郎（CHF）'
        case 2093:
          return '日元（JPY）'
      }
    },
    durationTypeFilter (type) {
      switch (type) {
        case 2254:
          return '年'
        case 2255:
          return '月'
        case 2256:
          return '日'
      }
    }
  }
}
</script>
