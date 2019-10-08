<template>
	<div class="bankFirstSlotWrapper">
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
					<p>预期收益率（年化 %）</p>
					<p>{{info.expectedAnnualYield}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>预计收益</p>
					<p>{{info.expectProfit}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投资性质</p>
					<p>{{info.investmentType}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>期限类型</p>
					<p>{{info.termType|termTypeFilter}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:100%;textAlign:'center'">
				<div>
					<p>运作模式</p>
					<p>{{info.operationMode|operationModeFilter}}</p>
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
			<a-card-grid style="width:50%;textAlign:'center'">
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
    },
    operationModeFilter (type) {
      switch (type) {
        case 2001:
          return '封闭式非净值型'
        case 2002:
          return '封闭式净值型'
        case 2003:
          return '开放式非净值型'
        case 2004:
          return '开放式净值型'
      }
    },
    termTypeFilter (type) {
      switch (type) {
        case 2010:
          return 'T+0产品'
        case 2011:
          return '7天（含）以内'
        case 2012:
          return '小于一个月（含）'
        case 2013:
          return '1-3个月（含）'
        case 2014:
          return '3-6个月（含）'
        case 2015:
          return '6-12个月（含）'
        case 2016:
          return '1年以上'
      }
    }
  }
}
</script>
