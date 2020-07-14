<template>
	<a-card title="主要人员"
		class="comMainMemberWrapper">
		<section v-for="(item,index) in mainMemberList"
			:key="index">
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">姓名({{index+1}})</p>
				<div class="flex-s-c">
					<a-input type="text"
						placeholder="请输入姓名"
						v-model="item.name" />
					<a-popconfirm title="是否清空?"
						@confirm="handleClear(index)"
						okText="是"
						cancelText="否">
						<a-button type="danger">清空</a-button>
					</a-popconfirm>
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">职位</p>
				<div>
					<a-input type="text"
						placeholder="请输入职位"
						v-model="item.position" />
				</div>
			</a-card-grid>
		</section>
		<a-card-grid class="special-w-1"
			@click="handleAdd">
			<span class="addBtn">+ 增加主要人员信息</span>
		</a-card-grid>
	</a-card>
</template>

<script>
export default {
  data () {
    return {
      currData: {
        notPassList: []
      },
      mainMemberList: []
    }
  },
  props: ['businessInfo'],
  methods: {
    handleAdd () {
      const {
        mainMemberList,
        $notification: { error }
      } = this
      const len = mainMemberList.length
      const { name, position } = mainMemberList[len - 1]
      this.mainMemberList.push({
        name: '',
        position: ''
      })
    },
    handleClear (idx) {
      const defaultVal = {
        name: '',
        position: ''
      }
      const obj = Object.assign(this.mainMemberList[idx], defaultVal)
      this.$set(this.mainMemberList, idx, { ...obj })
    }
  },
  watch: {
    businessInfo (newVal, oldVal) {
      const branches =
				newVal && newVal.staffs && newVal.staffs.length
				  ? newVal.staffs
				  : [
				    {
				      name: '',
				      position: ''
				    }
					  ]
      this.$nextTick(() => {
        this.currData = { ...newVal }
        this.mainMemberList = [...branches]
      })
    }
  }
}
</script>

<style lang="less">
</style>
