<template>
	<div class="houseSlotWrapper">
		<a-card title="基本信息">
			<div slot="extra">
				<span>首次记账日期：{{info.createTime}}</span>
				<span style="margin-left:10px;">最后修改时间：{{info.updateTime}}</span>
			</div>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>小区名称</p>
					<p>{{info.communityName}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>地址</p>
					<p>{{info.address}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="房屋信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>购入价值（万元）</p>
					<p>{{info.purchaseValue}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>购买日期</p>
					<p>{{info.purchaseDate}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>房屋面积（m²）</p>
					<p>{{info.constructionArea}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>楼层</p>
					<p>{{info.floorAndTotal}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:100%;textAlign:'center'">
				<div>
					<p>户型/朝向</p>
					<p>{{info.roomType}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="贷款信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>剩余贷款金额（元）</p>
					<p>{{info.remainingLoan}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>每月还款金额（元）</p>
					<p>{{info.monthlyRepayment}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>还款方式</p>
					<p>{{info.repayment|repaymentFilter}}</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>是否帮填</p>
					<p>{{info.adviserFilled}}</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="附加信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>顾问姓名</p>
					<p>{{info.adviserName}}</p>
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
    repaymentFilter (type) {
      switch (type) {
        case 2290:
          return '等额本息'
        case 2291:
          return '等额本金'
      }
    }
  }
}
</script>
