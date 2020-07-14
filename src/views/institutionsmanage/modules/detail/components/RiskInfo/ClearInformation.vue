<template>
	<div class="clear-information-wrapper">
		<a-card class="both">
			<a-card-grid class="special-w-1">
				<p>清算组负责人</p>
				<div>上海诺亚财富控股有限公司</div>
			</a-card-grid>
			<a-card-grid class="special-w-1 ">
				<p>清算组成员</p>
				<div>上海诺亚财富控股有限公司</div>
			</a-card-grid>
		</a-card>
	</div>
</template>

<script>
export default {
  // 清算信息
  name: 'clear-information',
  props: ['list'],
  data () {
    return {}
  }
}
</script>

<style lang="less">
.clear-information-wrapper {
	.both {
		.ant-card-grid {
			padding-left: 1px;
			padding-top: 1px;
			padding-bottom: 0px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			&.special-w-1 {
				width: 100%;
			}
			p {
				margin: 0;
				text-align: center;
				&:nth-of-type(odd) {
					width: 186px;
					height: 69px;
					line-height: 69px;
					background: rgb(236, 243, 253);
				}
			}
		}
	}
}
</style>
