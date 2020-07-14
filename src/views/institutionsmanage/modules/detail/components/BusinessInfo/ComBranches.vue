<template>
	<a-card title="分支机构"
		class="comBranchesWrapper"
		:hoverable="false">
		<section v-for="(item,index) in branchesList"
			:key="index">
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">企业名称({{index+1}})</p>
				<div class="flex-s-c">
					<a-input type="text"
						placeholder="请输入企业名称"
						v-model="item.companyName" />
					<a-popconfirm title="是否清空?"
						@confirm="handleClear(index)"
						okText="是"
						cancelText="否">
						<a-button type="danger">清空</a-button>
					</a-popconfirm>
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">经营状态</p>
				<div>
					<a-input type="text"
						placeholder="请输入经营状态"
						v-model="item.state" />
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">负责人</p>
				<div>
					<a-input type="text"
						placeholder="请输入负责人"
						v-model="item.header" />
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">成立时间</p>
				<div>
					<a-date-picker placeholder="请输入成立时间"
						v-model="item.establishmentDate" />
				</div>
			</a-card-grid>
		</section>
		<a-card-grid class="special-w-1"
			@click="handleAdd">
			<span class="addBtn">+ 增加分支机构信息</span>
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
      branchesList: []
    }
  },
  props: ['businessInfo'],
  methods: {
    handleAdd () {
      const {
        branchesList,
        $notification: { error }
      } = this
      const len = branchesList.length
      const { companyName, state, header, establishmentDate } = branchesList[
        len - 1
      ]
      this.branchesList.push({
        companyName: '',
        state: '',
        header: '',
        establishmentDate: ''
      })
    },
    handleClear (idx) {
      const defaultVal = {
        companyName: '',
        state: '',
        header: '',
        establishmentDate: ''
      }
      const obj = Object.assign(this.branchesList[idx], defaultVal)
      this.$set(this.branchesList, idx, { ...obj })
    }
  },
  watch: {
    businessInfo (newVal, oldVal) {
      const branchs =
				newVal && newVal.branchs && newVal.branchs.length
				  ? newVal.branchs
				  : [
				    {
				      companyName: '',
				      state: '',
				      header: '',
				      establishmentDate: ''
				    }
					  ]
      this.$nextTick(() => {
        this.currData = { ...newVal }
        this.branchesList = [...branchs]
      })
    }
  }
}
</script>

<style lang="less">
</style>
