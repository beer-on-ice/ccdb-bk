<template>
	<div class="searchCompanyWrapper">
		<a-form-item label="所属公司："
			:label-col="{ span: 2 }"
			:wrapper-col="{ span: 9 }">
			<a-select showSearch
				style="width: 360px"
				:disabled="belongCompanyAble"
				placeholder="请填写公司名称或关键字检索"
				v-decorator="[
				'belongCompany',
					{rules: [{ required: true, message: '请输入所属公司！', trigger: 'change' }]}
				]"
				:defaultActiveFirstOption="false"
				:showArrow="false"
				:filterOption="false"
				@search="handleSearch"
				@change="handleChange"
				:notFoundContent="'请填写公司名称或关键字检索'">
				<a-select-option v-for="d in searchData"
					:key="String(d.companyName)">{{d.companyName}}</a-select-option>
			</a-select>
		</a-form-item>
	</div>
</template>

<script>
import { getBussiness } from '@/api/institution/addBrand'
export default {
  props: ['belongCompanyAble'],
  data () {
    return {
      searchData: []
    }
  },
  methods: {
    // async getSearch (val) {
    //   let res = await getBussiness({ name: val })
    //   this.searchData = res.data
    // },
    handleSearch (value) {
      this.fnThrottle(async () => {
        let res = await getBussiness({ name: value })
        this.searchData = res.data
      }, 1000)
    },
    handleChange (value) {
      this.fnThrottle(async () => {
        let res = await getBussiness({ name: value })
        this.searchData = res.data
      }, 1000)
    },
    fnThrottle (fn) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        fn()
        this.timer = null
      }, 500)
    }
  }
}
</script>

<style lang="less">
.searchCompanyWrapper {
}
</style>
