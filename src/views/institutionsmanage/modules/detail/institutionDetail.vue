<template>
	<div class="institutionDetailWrapper">
		<h1>机构详情-{{$route.query.companyName}}</h1>
		<a-card>
			<ul class="topMenu">
				<li :class="{'active': current===item.id}"
					v-for="(item) in topTabList"
					:key="item.id"
					@click="current = item.id">{{item.title}}</li>
			</ul>
		</a-card>
		<component :is="currentTabComponent[current]"
			:companyUrl="$route.query.companyUrl"></component>
	</div>
</template>

<script>
import { BasicInfo, BusinessInfo, HistoryChange, InvestInfo } from './views/'
const currentTabComponent = [
  'basic-info',
  'business-info',
  'history-change',
  'invest-info'
]
const topTabList = [
  {
    id: 0,
    title: '基本信息'
  },
  {
    id: 1,
    title: '工商信息'
  },
  {
    id: 2,
    title: '历史变更'
  },
  {
    id: 3,
    title: '对外投资'
  }
]
export default {
  components: {
    BasicInfo,
    BusinessInfo,
    HistoryChange,
    InvestInfo
  },
  data () {
    return {
      currentTabComponent,
      topTabList,
      current: 0
    }
  }
}
</script>

<style lang="less">
.institutionDetailWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mt-20 {
		margin-top: 20px;
	}
	.flex-s-c {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.flex-c-c {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flex-a-c {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.ant-card-head-title {
		font-weight: bold;
	}
	ul.topMenu {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		list-style: none;
		li {
			margin: 0;
			padding: 0;
			list-style: none;
			cursor: pointer;
			color: #2f54eb;
			border: 1px solid #2f54eb;
			padding: 5px 10px;
			border-radius: 10px;
			margin-right: 20px;
			&.active {
				background: #2f54eb;
				color: #fff;
			}
		}
	}
}
</style>
