<template>
	<div class="vue-dropdown">
		<div class="search-module clearfix">
			<input class="search-text"
				placeholder="请填写公司名称或关键字检索"
				v-model="inputText"
				@keyup='handleSearch'
				@blur="handleBlur"
				@focus="handleFocus"
				:disabled="belongCompanyAble" />
		</div>
		<ul class="list-module"
			v-show="isShowData"
			@mousedown.stop.prevent>
			<li v-for="item in searchData"
				:key="item.companyUrl"
				@click="itemClick(item)">
				{{item.companyName}}
			</li>
		</ul>
		<div class="tip__nodata"
			v-show="isShowNone">
			暂无数据关联到此公司
		</div>
	</div>
</template>

<script>
import debounce from 'lodash/debounce'
import { getBussiness } from '@/api/institution/addBrand'
export default {
  data () {
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      inputText: '',
      isShowData: false,
      isShowNone: false,
      isChosen: true, // 判断是否已经选中或者失焦
      searchData: []
    }
  },
  props: ['belongCompanyAble'],
  methods: {
    async handleSearch () {
      try {
        const res = await getBussiness({ name: this.inputText })
        this.searchData = res.data
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    itemClick (item) {
      this.inputText = item.companyName
      this.handleHidden()
    },
    handleBlur (item) {
      this.handleHidden()
    },
    handleFocus () {
      this.isChosen = false
      this.handleSearch()
    },
    handleHidden () {
      this.isChosen = true
      this.searchData = []
      this.isShowNone = false
      this.isShowData = false
    }
  },
  updated () {
    if (this.isChosen) return
    if (this.searchData && this.searchData.length) {
      this.isShowData = true
      this.isShowNone = false
    } else {
      this.isShowNone = true
      this.isShowData = false
    }
  }
}
</script>

<style lang="less" scoped>
.vue-dropdown {
	position: absolute;
	width: 300px;
	display: inline-block;
	z-index: 99;
	&._self-show {
		display: block !important;
	}

	.search-module {
		position: relative;
		.search-text {
			width: 100%;
			height: 30px;
			padding-right: 2em;
			padding-left: 0.5em;
			border-radius: 0.5em;
			box-shadow: none;
			border: 1px solid #ccc;
			&::placeholder {
				color: #d0d0d0;
			}
			&:focus {
				border-color: #2198f2;
			}
		}

		.search-icon {
			position: absolute;
			top: 24%;
			right: 0.5em;
			color: #aaa;
		}
	}

	.list-module {
		max-height: 200px;
		overflow-y: auto;
		margin: 0;
		padding: 0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		li {
			&._self-hide {
				display: none;
			}
			list-style: none;
			background: #fff;
			padding: 0.5em;
			// &:hover {
			// 	cursor: pointer;
			// 	color: #fff;
			// 	background: #00a0e9;
			// }
		}
	}
}
.tip__nodata {
	position: relative;
	z-index: 999;
	font-size: 12px;
	background: #fff;
	padding: 5px 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
