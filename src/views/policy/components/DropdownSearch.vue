<template>
	<div class="vue-dropdown default-theme">
		<div class="search-module clearfix">
			<input class="search-text"
				@keyup='search($event)'
				placeholder="请输入关键词"
				v-model="inputText"
				@blur="inputblur" />
		</div>
		<ul class="list-module"
			v-show="isShowData"
			@mousedown.stop.prevent>
			<li v-for="(item,index) in itemlist"
				:key="index">
				<span class="list-item-text"
					v-html="keywordscolorful(item,inputText)"></span>
			</li>
		</ul>
		<div class="tip__nodata"
			v-show="isShowNone">暂无数据关联到此关键词</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      inputText: '',
      isShowData: false,
      isShowNone: false,
      isClick: false
    }
  },
  props: ['itemlist'],
  methods: {
    // itemClick (item) {
    //   this.inputText = item
    //   this.isClick = true
    //   this.isShowNone = false
    //   this.isShowData = false
    //   this.$emit('itemClick', item)
    // },
    inputblur (item) {
      this.isClick = true
      this.isShowData = false
      this.isShowNone = false
      this.$emit('itemClick', this.inputText)
    },
    search (e) {
      let searchvalue = e.currentTarget.value
      this.isClick = false
      this.$emit('inputValue', searchvalue)
    },
    keywordscolorful (str, key) {
      var reg = new RegExp('(' + key + ')', 'g')
      var newstr = str.replace(reg, "<font style='color:red;'>$1</font>")
      return newstr
    }
  },
  updated () {
    if (this.isClick) return
    if (this.itemlist && this.itemlist.length) {
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
.vue-dropdown.default-theme {
	position: absolute;
	width: 70%;
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
	padding: 10px;
}
</style>
