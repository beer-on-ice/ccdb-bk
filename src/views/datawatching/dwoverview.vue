<template>
	<div class="dwoverviewWrapper">
		<div class="dwoverviewOperateWrapper">
			<a-radio-group v-model="tabValue"
				buttonStyle="solid">
				<a-radio-button value="0">用户注册统计</a-radio-button>
				<a-radio-button value="1">留存率统计</a-radio-button>
			</a-radio-group>
		</div>
		<component :is="currentTabComponent[Number(tabValue)]"></component>
	</div>
</template>

<script>
import AliveUser from './components/aliveuser'
import ActiveUser from './components/activeuser'
export default {
  components: {
    AliveUser,
    ActiveUser
  },
  data () {
    return {
      tabValue: '0',
      currentTabComponent: ['active-user', 'alive-user']
    }
  }
}
</script>

<style lang="less">
.dwoverviewWrapper {
	.dwoverviewOperateWrapper {
		.ant-radio-group {
			label {
				margin: 0 20px;
				border-radius: 4px;
				&:nth-of-type(1) {
					margin: 0;
				}
			}
		}
	}
}
</style>
