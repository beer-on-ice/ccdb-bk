<template>
	<div class="bankFourSlotWrapper">
		<a-card title="基本信息">
			<div slot="extra">
				<span>首次记账日期：{{info.createTime}}</span>
				<span style="margin-left:10px;">最后修改时间：{{info.updateTime}}</span>
			</div>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>票据名称</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>票据号码</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>票据类型</p>
					<p>10000</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="投资信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>投资本金</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>年化收益率（%）</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>出票日期</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>承兑日期</p>
					<p>10000</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="票面信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>出票人全称</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>承兑人全称</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>承兑信息</p>
					<p>10000</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="附加信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>客户经理</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>联系电话</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>是否帮填</p>
					<p>10000</p>
				</div>
			</a-card-grid>
		</a-card>
		<a-card title="舆情信息">
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>自身舆情</p>
					<p>10000</p>
				</div>
			</a-card-grid>
			<a-card-grid style="width:50%;textAlign:'center'">
				<div>
					<p>周边舆情</p>
					<p>10000</p>
				</div>
			</a-card-grid>
		</a-card>
	</div>
</template>
