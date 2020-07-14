<template>
	<a-card title="股东信息"
		class="comShareHolderWrapper">
		<a-card-grid class="special-w-1">
			<p :class="{'notPass':currData.notPassList.includes('actualControllingPerson')}">实际控股人</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入实际控股人"
						v-decorator="['actualControllingPerson']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<section v-for="(item,index) in shareHolderList"
			:key="index">
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">股东信息({{index+1}})</p>
				<div class="flex-s-c">
					<a-input type="text"
						placeholder="请输入股东信息"
						v-model="item.shareholder" />
					<a-popconfirm title="是否清空?"
						@confirm="handleClear(index)"
						okText="是"
						cancelText="否">
						<a-button type="danger">清空</a-button>
					</a-popconfirm>
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">股东身份</p>
				<div>
					<a-input type="text"
						placeholder="请输入股东身份"
						v-model="item.holderTags" />
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">认缴出资额</p>
				<div>
					<a-input type="text"
						placeholder="请输入认缴出资额"
						v-model="item.contributions" />
				</div>
			</a-card-grid>
			<a-card-grid class="special-w-5">
				<p :class="{'notPass':item.spotMark === 1}">出资比例</p>
				<div>
					<a-input type="text"
						placeholder="请输入出资比例"
						v-model="item.shareholding" />
				</div>
			</a-card-grid>
		</section>
		<a-card-grid class="special-w-1"
			@click="handleAdd">
			<span class="addBtn">+ 增加股东信息</span>
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
      shareHolderList: []
    }
  },
  props: ['businessInfo'],
  methods: {
    handleAdd () {
      const {
        shareHolderList,
        $notification: { error }
      } = this
      const len = shareHolderList.length
      const {
        shareholder,
        holderTags,
        contributions,
        shareholding
      } = shareHolderList[len - 1]
      this.shareHolderList.push({
        shareholder: '',
        holderTags: '',
        contributions: '',
        shareholding: ''
      })
    },
    handleClear (idx) {
      const defaultVal = {
        shareholder: '',
        holderTags: '',
        contributions: '',
        shareholding: ''
      }
      const obj = Object.assign(this.shareHolderList[idx], defaultVal)
      this.$set(this.shareHolderList, idx, { ...obj })
    }
  },
  watch: {
    businessInfo (newVal, oldVal) {
      const holders =
				newVal && newVal.holders && newVal.holders.length
				  ? newVal.holders
				  : [
				    {
				      shareholder: '',
				      holderTags: '',
				      contributions: '',
				      shareholding: ''
				    }
					  ]
      this.$nextTick(() => {
        this.currData = { ...newVal }
        this.shareHolderList = [...holders]
      })
    }
  }
}
</script>

<style lang="less">
.comShareHolderWrapper {
}
</style>
