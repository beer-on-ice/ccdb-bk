<template>
	<div class="HistoryChangeWrapper">
		<a-card title="历史变更"
			:hoverable="false">
			<a slot="extra"
				href="#">数据更新时间： xxxxxxxx</a>
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
			</s-table>
			<a-button @click="$router.go(-1)">返回</a-button>
		</a-card>
	</div>
</template>

<script>
import { STable } from '@/components'
import { chageRecord } from '@/api/institution/institutionArchives'
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '变更日期',
    dataIndex: 'changeDate',
    align: 'center',
    width: '120px'
  },
  {
    title: '变更项目',
    dataIndex: 'changeItem',
    align: 'center',
    width: '120px'
  },
  {
    title: '变更前',
    dataIndex: 'changeBefore',
    align: 'center'
  },
  {
    title: '变更后',
    dataIndex: 'changeAfter',
    align: 'center'
  }
]
export default {
  name: 'HistoryChange',
  props: ['companyUrl'],
  components: {
    STable
  },
  data () {
    return {
      columns,
      list: [],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        companyUrl: ''
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
        return chageRecord(this.queryParam).then(res => {
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
  created () {
    this.queryParam.companyUrl = this.companyUrl
  }
}
</script>

<style lang="less">
.HistoryChangeWrapper {
	margin-top: 50px;
	.ant-card-grid {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		> div {
			margin-left: 10px;
		}

		&.special-h-2 {
			height: 140px;
		}
		&.special-w-5 {
			width: 50%;
		}
		&.special-w-1 {
			width: 100%;
		}
	}
	.both {
		.ant-card-grid {
			padding-left: 1px;
			padding-top: 1px;
			padding-bottom: 0px;
			p {
				margin: 0;
				text-align: center;
				&:nth-of-type(odd) {
					width: 186px;
					height: 69px;
					line-height: 69px;
					background: rgb(236, 243, 253);
				}
			}
		}
	}
}
</style>
