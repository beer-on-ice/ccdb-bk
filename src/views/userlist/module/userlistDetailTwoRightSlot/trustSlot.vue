<template>
	<div class="trustSlotWrapper">
		<a-card title="基本信息">
			<div slot="extra">
				<span>首次记账日期：{{info.createTime}}</span>
				<span style="margin-left:10px;">最后修改时间：{{info.updateTime}}</span>
			</div>
			<a-card-grid style="width:100%;textAlign:'center'">
				<div>
					<p>产品名称</p>
					<p>{{info.productName}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="投资信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投资本金</p>
					<p>{{info.purchaseMoney}}{{info.currencyType | currencyTypeFilter}}</p>
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
					<p>投资期限</p>
					<p>{{info.duration}}{{info.durationType | durationTypeFilter}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>预计收益</p>
					<p>{{info.expectedProfit}}</p>
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
		</a-card>
		<a-card title="附加信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>理财经理</p>
					<p>{{info.financialManagerName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>联系电话</p>
					<p>{{info.contactNumber}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:100%;textAlign:'center'">
				<div>
					<p>是否帮填</p>
					<p>{{info.filledByAdviser}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="舆情信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>自身舆情</p>
					<p>{{info.selfWarning}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>周边舆情</p>
					<p>{{info.surroundWarning}}</p>
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
