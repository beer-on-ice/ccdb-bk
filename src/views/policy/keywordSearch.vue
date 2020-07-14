<template>
	<div class="keywordSearchWrapper">
		<h1>关键词搜索设置</h1>
		<a-card :bordered="false">
			<div class="filterWrapper">
				<a-form layout="inline"
					:form="form">
					<a-form-item label="关键词">
						<a-input v-model="queryParam.keyword"
							placeholder="请输入" />
					</a-form-item>
					<a-form-item label="分类">
						<a-select v-model="queryParam.classify"
							style="width:100px">
							<a-select-option v-for="item in typeList"
								:value="item.id"
								:key="item.id">
								{{item.title}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="点击量">
						<a-select v-model="queryParam.clickRateFlag"
							style="width:100px">
							<a-select-option v-for="item in sortList"
								:value="item.id"
								:key="item.id">
								{{item.title}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-button-group style="margin-top:4px;">
						<a-button @click="$refs.table.refresh(true)">查询</a-button>
						<a-button @click="handleResetSearch">重置</a-button>
					</a-button-group>
				</a-form>
			</div>
			<div class="addConsultWrapper">
				<a-button size="large"
					@click="handleAdd"
					style="background:rgba(7, 150, 66, 1);">添加</a-button>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="classify"
					slot-scope="text">
					{{text | classifyFilter}}
				</span>
				<span slot="sequence"
					slot-scope="text,record">
					<a-select style="width:100px;"
						:defaultValue="(!record.sort || record.sort === 99) ? '默认' :  record.sort"
						@change="val => handleOrder(val, record)">
						<a-select-option v-for="item in ['默认',1,2,3,4,5,6,7,8,9,10]"
							:key="item"
							:value="item">
							{{item}}
						</a-select-option>
					</a-select>
				</span>
				<span slot="action"
					slot-scope="text, record">
					<div class="btnWrapper">
						<a-popconfirm title="是否确定要删除？"
							@confirm="handleDel(record)"
							okText="确定"
							cancelText="取消">
							<a-button type="danger">删除</a-button>
						</a-popconfirm>
					</div>
				</span>
			</s-table>
		</a-card>
		<a-modal class="appointmentModalWrapper"
			title="添加关键词"
			:maskClosable="false"
			:visible="appointmentVisible"
			:footer="null"
			@cancel="handlePreviewCancel">
			<div class="wrapper">
				<section>
					<span style="margin-right:24px;">分类:</span>
					<a-select v-model="classify"
						style="width:100px">
						<a-select-option v-for="item in typeList"
							:value="item.id"
							:key="item.id">
							{{item.title}}
						</a-select-option>
					</a-select>
				</section>
				<section style="margin-top:10px;">
					<span style="margin-right:10px;">关键词:</span>
					<dropdown-search @inputValue="fetchUser"
						:itemlist="searchData"
						@itemClick="itemClick"
						ref="searchkeyWord"></dropdown-search>
					<!-- <a-select style="width: 40%"
						showSearch
						labelInValue
						placeholder="请填写搜索关键词"
						:filterOption="false"
						:showArrow="false"
						:value="searchKey"
						:notFoundContent="fetching ? undefined : '暂无数据'"
						@search="fetchUser"
						@change="handleSearchDataChange">
						<a-spin v-if="fetching"
							slot="notFoundContent"
							size="small" />
						<a-select-option v-for="d in searchData"
							:key="d">{{d}}</a-select-option>
					</a-select> -->
				</section>
				<section style="text-align:center;margin-top:20px;">
					<a-button type="primary"
						@click="handlePreviewCancel">关闭</a-button>
					<a-button type="default"
						style="background:rgba(7, 150, 66, 1);margin:0 10px;color:#fff;"
						@click="handleSubmit">提交</a-button>
					<a-button type="primary"
						@click="handleReset">重置</a-button>
				</section>
			</div>
		</a-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'
import { STable } from '@/components'
import { DropdownSearch } from './components'
import {
  keywordsMultipleQuery,
  lenovoSearch,
  addKeyword,
  removeKeyword,
  editSort
} from '@/api/keyword'

const typeList = [
  {
    id: '',
    title: '请选择'
  },
  {
    id: 2,
    title: '产品'
  },
  {
    id: 3,
    title: '公司'
  },
  {
    id: 4,
    title: '高管'
  },
  {
    id: 5,
    title: '资讯'
  }
]
const sortList = [
  {
    id: 0,
    title: '默认'
  },
  {
    id: 1,
    title: '升序'
  },
  {
    id: 2,
    title: '降序'
  }
]
const columns = [
  {
    title: '序号',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '关键词',
    dataIndex: 'keyword',
    align: 'center'
  },
  {
    title: '分类',
    width: '234px',
    dataIndex: 'classify',
    align: 'center',
    scopedSlots: { customRender: 'classify' }
  },
  {
    title: '点击量',
    width: '234px',
    dataIndex: 'clickRate',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '顺序',
    dataIndex: 'sort',
    align: 'center',
    scopedSlots: { customRender: 'sequence' }
  },
  {
    title: '发布人',
    dataIndex: 'issuer',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'keywordSearch',
  components: {
    STable,
    DropdownSearch
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      form: this.$form.createForm(this),
      searchKey: '',
      fetching: false,
      searchData: [],
      classify: '',
      appointmentVisible: false,
      typeList,
      sortList,
      columns,
      queryParam: {
        startPage: 1,
        pageSize: 10,
        keyword: '',
        classify: '',
        clickRateFlag: 0
      },
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) =>
          (this.queryParam.pageSize = pageSize),
        onChange: page => (this.queryParam.startPage = page),
        showQuickJumper: true
      },
      loadData: () => {
        return keywordsMultipleQuery(this.queryParam).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.pageNum > res.data.navigateLastPage) {
              // 解决当点击的页码超过实际页数重复请求bug
              this.queryParam.startPage = res.data.navigateLastPage
            }
            res.data.data = res.data.list
            res.data.pageNo = res.data.pageNum
            res.data.totalPage = res.data.pages
            res.data.totalCount = res.data.total

            delete res.data.list
            delete res.data.pageNum
            delete res.data.pages
            delete res.data.total

            return res.data
          } else {
            res.data = {}
            res.data.data = []
            res.data.pageNo = 0
            res.data.totalPage = 0
            res.data.totalCount = 0
            return res.data
          }
        })
      }
    }
  },
  methods: {
    async handleDel (record) {
      try {
        let res = await removeKeyword({
          id: record.id
        })
        if (res.code === 200) {
          this.$refs.table.refresh()
          this.$notification.success({
            message: res.msg || '删除成功！'
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async handleOrder (val, record) {
      let sequence = ''
      sequence = val
      if (val === '默认') {
        sequence = 99
      }
      const param = {
        id: record.id,
        classify: record.classify,
        sort: sequence
      }
      try {
        const res = await editSort(param)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '排序成功！'
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '排序失败，请重试!'
        })
      }
    },
    async handleSubmit (val, record) {
      const {
        searchKey: { key },
        classify
      } = this
      const param = {
        keyword: key.trim(),
        classify,
        issuer: JSON.parse(Vue.ls.get('USERINFO')).username
      }
      try {
        const res = await addKeyword(param)
        if (res.code === 200) {
          this.handlePreviewCancel()
          this.$refs.table.refresh()
          this.$notification.success({
            message: res.msg || '添加成功！'
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '添加失败，请重试!'
        })
      }
    },
    async fetchUser (value) {
      this.fetching = true
      this.searchData = []
      try {
        const { code, data, msg } = await lenovoSearch({
          keyword: value,
          classify: this.classify
        })
        if (code === 200) {
          this.searchData = data
          this.fetching = false
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.fetching = false
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    itemClick (item) {
      this.searchKey = { key: item }
    },
    handleSearchDataChange (value) {
      Object.assign(this, {
        searchKey: value,
        searchData: [],
        fetching: false
      })
    },
    handleResetSearch () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        keyword: '',
        classify: '',
        clickRateFlag: 0
      }
      this.$refs.table.refresh()
    },
    handleReset () {
      this.searchKey = ''
      this.$refs.searchkeyWord.inputText = ''
      this.classify = ''
    },
    handlePreviewCancel () {
      this.handleReset()
      this.appointmentVisible = false
    },
    handleAdd () {
      this.appointmentVisible = true
    }
  },
  filters: {
    classifyFilter (val) {
      switch (Number(val)) {
        case 1:
          return ''
        case 2:
          return '产品'
        case 3:
          return '公司'
        case 4:
          return '高管'
        case 5:
          return '资讯'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less">
.keywordSearchWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.addConsultWrapper {
		margin-top: 20px;
		.ant-btn {
			background: rgba(166, 166, 166, 1);
			color: #fff;
			font-weight: bold;
			border-radius: 10px;
		}
	}
	.btnWrapper {
		.ant-btn {
			margin: 0 5px;
		}
	}
}
.appointmentModalWrapper {
	width: 25% !important;
}
</style>
