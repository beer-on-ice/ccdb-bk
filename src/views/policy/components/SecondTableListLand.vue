<template>
	<div class="policyTableWrapper">
		<h3>头条推荐</h3>
		<div class="tablePageWrapper">
			<div class="tablePageSearchWrapper">
				<a-form layout="inline">
					<div class="searchBtnWrapper">
						<a-form-item label="搜索：">
							<a-input placeholder="输入资讯标题"
								v-model="queryParam.title" />
						</a-form-item>
						<a-button type="primary"
							@click="$refs.table.refresh(false)">查找</a-button>
						<a-button type="default"
							style="margin-left:20px"
							@click="resetSearchForm">重置</a-button>
						<a-button type="default"
							style="margin-left:20px"
							@click="handleAdd">新增</a-button>
					</div>
				</a-form>
			</div>
			<s-table ref="table"
				size="default"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				style="margin-top:20px;"
				bordered>
				<span slot="serial"
					slot-scope="text,record,index">
					{{ index + 1 }}
				</span>
				<span slot="action"
					slot-scope="text,record">
					<template>
						<a-popconfirm :title="`是否确定要${record.state?'禁用':'启用'}？`"
							@confirm="confirmForbidden(record)"
							okText="确定"
							cancelText="取消">
							<a-button type="danger">{{record.state?'禁用':'启用'}}</a-button>
						</a-popconfirm>
						<a-button type="primary"
							@click="handleEdit(record.id)"
							style="margin-left:10px;">编辑</a-button>
					</template>
				</span>
			</s-table>
		</div>
	</div>
</template>

<script>
import { getEnable } from '@/api/newsManage'
import { getListLeadNews } from '@/api/landPolicy'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      currentRowIndex: '', // 当前点击的列表行的index
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        serviceType: 4,
        title: ''
      },
      // 表头
      columns: [
        {
          title: '序号',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '标题',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '发布日期',
          align: 'center',
          dataIndex: 'releaseDate'
        },
        {
          title: '发布人',
          align: 'center',
          dataIndex: 'backendUserName'
        },
        {
          title: '浏览量',
          align: 'center',
          dataIndex: 'readCount'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'state'
        },
        {
          title: '操作',
          align: 'center',
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
        onChange: page => (this.queryParam.startPage = page),
        showQuickJumper: true
      },
      loadData: parameter => {
        return getListLeadNews(this.queryParam).then(res => {
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
    refreshTable () {
      this.$refs.table.refresh(true)
    },
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        serviceType: 4,
        title: ''
      }
      this.refreshTable()
    },
    // 保单 - 编辑
    handleEdit (id) {
      this.$emit('handleEdit', id)
    },
    // 保单 - 新增
    handleAdd () {
      this.$emit('handleAdd')
    },
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
    }
  }
}
</script>

<style lang="less">
.policyTableWrapper {
	margin-top: 35px;
	h3 {
		font-size: 14px;
		font-weight: bold;
	}
	.tablePageWrapper {
		background: #fff;
		padding: 20px;
		border-radius: 10px;
	}
}
</style>
