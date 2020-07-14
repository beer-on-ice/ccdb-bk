<template>
	<div class="relateCompanyWrapper">
		<a-form-item label="关联公司："
			:label-col="{ span: 2 }"
			:wrapper-col="{ span: 9 }">
			<div class="wrapper">
				<a-select showSearch
					style="width: 360px"
					placeholder="请填写公司名称或关键字检索"
					v-decorator="['relateCompany']"
					allowClear
					:defaultActiveFirstOption="false"
					:showArrow="false"
					:filterOption="false"
					@search="handleSearch2"
					@change="handleChange2"
					:notFoundContent="'请填写公司名称或关键字检索'">
					<a-select-option v-for="d in searchData2"
						:key="String(d.companyUrl)">{{d.companyName}}</a-select-option>
				</a-select>
				<div class="addMinusWrapper">
					<a-icon type="plus-square"
						@click="handleAddCompany" />
				</div>
			</div>
			<div v-if="companyNum > 0">
				<div class="wrapper"
					v-for="(item,index) in companyNumArr"
					:key="index">
					<a-select showSearch
						placeholder="请填写公司名称或关键字检索"
						v-model="item.companyName"
						style="width: 360px"
						:defaultActiveFirstOption="false"
						:showArrow="false"
						:filterOption="false"
						@search="handleSearch3"
						@change="handleChange3"
						:notFoundContent="'请填写公司名称或关键字检索'">
						<a-select-option v-for="d in searchData3"
							:key="String(d.companyName)">{{d.companyName}}</a-select-option>
					</a-select>
					<div class="addMinusWrapper">
						<a-icon type="plus-square"
							@click="handleAddCompany" />
						<a-icon type="minus-square"
							@click="handleDelCompany(item)"
							v-if="companyNum>0" />
					</div>
				</div>
			</div>
		</a-form-item>
	</div>
</template>

<script>
import debounce from 'lodash/debounce'
import { getBussiness } from '@/api/institution/addBrand'
export default {
  props: ['companyNum', 'companyNumArr'],
  data () {
    this.handleSearch2 = debounce(this.handleSearch2, 800)
    this.handleSearch3 = debounce(this.handleSearch3, 800)
    return {
      searchData2: [],
      searchData3: []
    }
  },
  methods: {
    async handleSearch2 (value) {
      try {
        const res2 = await getBussiness({ name: value })
        this.searchData2 = res2.data
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleChange2 (value) {},
    async handleSearch3 (value) {
      try {
        const res3 = await getBussiness({ name: value })
        this.searchData3 = res3.data
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleChange3 (name) {
      let companyArr = this.searchData3.filter(item => {
        if (item.companyName === name) {
          return true
        }
        return ''
      })
      this.$emit('selectCompany', companyArr[0].companyUrl)
    },
    handleAddCompany () {
      this.$emit('handleAddCompany')
    },
    handleDelCompany (item) {
      this.$emit('handleDelCompany', item)
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
.relateCompanyWrapper {
	.anticon-plus-square,
	.anticon-minus-square {
		font-size: 24px;
	}

	.wrapper {
		position: relative;
		.ant-input {
			width: 360px !important;
		}
		.addMinusWrapper {
			position: absolute;
			top: 4px;
			left: 400px;
		}
	}
}
</style>
