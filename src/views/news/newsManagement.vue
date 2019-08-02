<template>
	<a-card :bordered="false">
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<a-row :gutter="48">
					<a-col :md="6"
						:sm="24">
						<a-form-item label="标题：">
							<a-input v-model="queryParam.title"
								placeholder="请输入标题" />
						</a-form-item>
					</a-col>
					<a-col :md="6"
						:sm="24">
						<a-form-item label="资讯类型">
							<a-select v-model="queryParam.type"
								placeholder="请选择类型"
								default-value="1"
								@change="onTypeChange">
								<a-select-option value="1">信托</a-select-option>
								<a-select-option value="2">房产</a-select-option>
								<a-select-option value="3">私募基金</a-select-option>
								<a-select-option value="4">保险</a-select-option>
								<a-select-option value="5 ">理财</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :md="4"
						:sm="24">
						<a-form-item>
							<a-checkbox @change="onIsHotChange"
								:checked="queryParam.isHot?true:false">热门</a-checkbox>
							<a-checkbox @change="onIsTopChange"
								:checked="queryParam.isTop?true:false">置顶</a-checkbox>
						</a-form-item>
					</a-col>
					<a-col :md="8"
						:sm="24">
						<span class="table-page-search-submitButtons">
							<a-button type="primary"
								@click="$refs.table.refresh(true)">查询</a-button>
							<a-button style="margin-left: 8px"
								@click="resetSearchForm">重置</a-button>
							<a-button style="margin-left: 8px"
								@click="handleAddNew"
								v-auth="$route.meta.dutyName">新增</a-button>
						</span>
					</a-col>
				</a-row>
			</a-form>
		</div>

		<s-table ref="table"
			size="default"
			rowKey="id"
			:columns="columns"
			:data="loadData"
			:pagination="pagination">
			<span slot="serial"
				slot-scope="text, record, index">
				{{ index + 1 }}
			</span>
			<span slot="state"
				slot-scope="text,record">
				{{record.state?'启用':'禁用'}}
			</span>
			<span slot="inforDomain"
				slot-scope="text">
				{{text | inforDomainFilter}}
			</span>
			<span slot="isTop"
				slot-scope="text">
				{{text == 0?'否':'是'}}
			</span>
			<span slot="isHot"
				slot-scope="text">
				{{text == 0?'否':'是'}}
			</span>
			<span slot="action"
				slot-scope="text, record"
				v-auth="$route.meta.dutyName">
				<template>
					<a-popconfirm :title="`是否确定要${Number(record.isTop)?'取消置顶':'置顶'}？`"
						@confirm="confirmTop(record)"
						okText="确定"
						cancelText="取消">
						<a>{{Number(record.isTop)?'取消置顶':'置顶'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a-popconfirm :title="`是否确定要${Number(record.isHot)?'取消热门':'热门'}？`"
						@confirm="confirmHot(record)"
						okText="确定"
						cancelText="取消">
						<a>{{Number(record.isHot)?'取消热门':'热门'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a-popconfirm :title="`是否确定要${record.state?'禁用':'启用'}？`"
						@confirm="confirmForbidden(record)"
						okText="确定"
						cancelText="取消">
						<a>{{record.state?'禁用':'启用'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a-popconfirm title="是否确定要推送？"
						@confirm="confirmPushNew(record)"
						okText="确定"
						cancelText="取消">
						<a>{{record.isNotified?'已推送':'推送'}}</a>
					</a-popconfirm>
					<a-divider type="vertical" />
					<a @click="handleEdit(record)">编辑</a>
				</template>
			</span>
		</s-table>
	</a-card>
</template>

<script>
import qs from 'qs'
import { STable } from '@/components'
import {
  getNewsList,
  getTop,
  getHot,
  getEnable,
  getBroadcast
} from '@/api/newsManage'

export default {
  name: 'newsManagement',
  components: {
    STable
  },
  data () {
    return {
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        title: '',
        inforDomain: '',
        isTop: '',
        isHot: ''
      },
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '类型',
          dataIndex: 'inforDomain',
          scopedSlots: { customRender: 'inforDomain' }
        },
        {
          title: '热门',
          dataIndex: 'isHot',
          scopedSlots: { customRender: 'isHot' }
        },
        {
          title: '置顶',
          dataIndex: 'isTop',
          scopedSlots: { customRender: 'isTop' }
        },
        {
          title: '发布时间',
          dataIndex: 'release',
          sorter: true
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) =>
          (this.queryParam.pageSize = pageSize),
        onChange: page => (this.queryParam.startPage = page)
      },
      loadData: () => {
        return getNewsList(this.queryParam).then(res => {
          res.data.data = res.data.list
          res.data.pageNo = res.data.pageNum
          res.data.totalPage = res.data.pages
          res.data.totalCount = res.data.total
          return res.data
        })
      }
    }
  },
  filters: {
    // 类型
    inforDomainFilter (type) {
      switch (type) {
        case 1:
          return '信托'
        case 2:
          return '房产'
        case 3:
          return '私募基金'
        case 4:
          return '保险'
        case 5:
          return '理财'
      }
    }
  },
  methods: {
    // 重置
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        title: '',
        inforDomain: '',
        isTop: '',
        isHot: ''
      }
      this.$refs.table.refresh(true)
    },
    // 新增->跳转到编辑页
    handleAddNew () {
      this.$router.push({
        path: '/news/newsadd'
      })
    },
    // 表格行-置顶
    confirmTop (record) {
      let param = { id: record.id, isTop: Number(record.isTop) ? 0 : 1 }
      getTop(param).then(res => {
        if (res.code === 200) {
          record.isTop = !Number(record.isTop)
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-热门
    confirmHot (record) {
      let param = { id: record.id, isHot: Number(record.isHot) ? 0 : 1 }
      getHot(param).then(res => {
        if (res.code === 200) {
          record.isHot = !Number(record.isHot)
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-禁用
    confirmForbidden (record) {
      let param = { id: record.id, state: record.state ? 0 : 1 }
      getEnable(param).then(res => {
        if (res.code === 200) {
          record.state = !record.state
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-推送
    confirmPushNew (record) {
      if (record.isNotified) return
      let param = { infoId: record.id }
      getBroadcast(param).then(res => {
        if (res.code === 200) {
          record.isNotified = !record.isNotified
          this.$notification.open({
            message: '操作成功'
          })
        } else {
          this.$notification.open({
            message: '操作失败，请重试'
          })
        }
      })
    },
    // 表格行-编辑
    handleEdit (record) {
      this.$router.push({
        path: '/news/newsedit',
        query: {
          id: record.id
        }
      })
    },
    // 资讯类型
    onTypeChange (value) {
      this.queryParam.inforDomain = value
    },
    // 热门
    onIsHotChange (e) {
      let flag = e.target.checked ? 1 : 0
      this.queryParam.isHot = flag
    },
    // 置顶
    onIsTopChange (e) {
      let flag = e.target.checked ? 1 : 0
      this.queryParam.isTop = flag
    }
  }
}
</script>
