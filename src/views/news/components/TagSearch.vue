<template>
	<div class="tagSearchWrapper">
		<a-form-item label="标签搜索："
			:label-col="{span:5}">
			<a-auto-complete class="global-search"
				style="max-width: 230px"
				@select="handleTagsSelect"
				@search="tagsQuerySearch"
				v-model="searchkey"
				placeholder="请输入内容"
				option-label-prop="text">
				<template slot="dataSource">
					<a-select-option v-for="item in tagsSearchResult"
						:key="item.id"
						:text="delHtmlTag(item.category).split(' ')[0]"
						:obj="item">
						<div v-html="item.category"></div>
					</a-select-option>
				</template>
			</a-auto-complete>
			<p style="color:red;margin-left:80px;">* 请不要添加重复标签</p>
		</a-form-item>
		<div v-if="newTags.length">
			<h4>新增标签：</h4>
			<ul class='newTagWrapper'>
				<li v-for="item in newTags"
					:key="item.keywordId">
					<span>{{item.keyword}}</span>
					<a-icon type="close"
						@click="handleDelTag(item,0)" />
				</li>
			</ul>
		</div>
		<div v-if="oldTags.length">
			<h4>默认标签：</h4>
			<ul class='newTagWrapper'>
				<li v-for="item in oldTags"
					:key="item.keywordId">
					<span>{{item.keyword}}</span>
					<a-popconfirm title="确定要删除默认标签吗？"
						@confirm="handleDelTag(item,1)"
						okText="确认"
						cancelText="取消">
						<a-icon type="close" />
					</a-popconfirm>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import debounce from 'lodash/debounce'
import { getkeywordSystem } from '@/api/warning'
export default {
  props: ['defaultTags'],
  data () {
    this.tagsQuerySearch = debounce(this.tagsQuerySearch, 400)
    return {
      tagsSearchResult: [], // 搜索到的标签列表
      oldTags: [], // 已存在的标签
      newTags: [], // 新添加的标签
      searchkey: ''
    }
  },
  methods: {
    // 实时搜索标签 - 选择标签
    handleTagsSelect (item, option) {
      let str = this.delHtmlTag(option.data.attrs.text)
      let obj = option.data.attrs.obj
      let result = {
        keyword: str,
        keywordId: obj.keywordId,
        type: obj.type
      }
      this.newTags.push(result)
      this.newTags = this.uniqueTag(this.newTags)
      this.searchkey = ''
    },
    // 实时搜索标签
    tagsQuerySearch (queryString) {
      this.tagsSearchResult = queryString ? this.searchResult(queryString) : []
    },
    // 实时搜索标签 - 搜索结果
    searchResult (query) {
      let arr = []
      getkeywordSystem({ keyword: query }).then(res => {
        res.data.forEach(item => {
          arr.push({
            query,
            category: item.keyword,
            identity: item.identity,
            keywordId: item.keywordId,
            type: item.type,
            id: item.id
          })
        })
      })
      return arr
    },
    uniqueTag (arr) {
      const res = new Map()
      return arr.filter(a => !res.has(a.keywordId) && res.set(a.keywordId, 1))
    },
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    },
    // 实时搜索标签 - 删除标签
    handleDelTag (el, type) {
      if (type) {
        this.oldTags = this.oldTags.filter(
          item => item.keywordId !== el.keywordId
        )
      } else {
        this.newTags = this.newTags.filter(
          item => item.keywordId !== el.keywordId
        )
      }
    }
  }
}
</script>

<style lang="less">
.tagSearchWrapper {
	.newTagWrapper {
		background: #fff;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20px;
		}
	}
}
</style>
