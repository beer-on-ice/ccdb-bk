<template>
	<div class="activeUserWrapper">
		<a-form layout="inline"
			:form="form">
			<div class="flex-b"
				style="margin-top:30px;">
				<a-form-item label="日期：">
					<a-range-picker @change="onDatePickChange" />
					<a-button type="primary"
						@click="$refs.table.refresh(false)"
						style="margin-left:30px;">查询</a-button>
				</a-form-item>
				<a-button @click="exportCSV">导出CSV</a-button>
			</div>
		</a-form>
		<s-table ref="table"
			style="margin-top:30px;"
			size="default"
			rowKey="id"
			bordered
			:columns="columns"
			:data="loadData"
			:pagination="pagination">
		</s-table>
	</div>
</template>

<script>
import { STable } from '@/components'
import { getActiveUser, getActiveUserExcel } from '@/api/datawatching'
export default {
  name: 'activeUser',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      targetType: '1',
      columns: [
        {
          title: '日期',
          dataIndex: 'recordTime'
        },
        {
          title: '总注册用户数',
          dataIndex: 'totalRegUser'
        },
        {
          title: '当日新增注册',
          dataIndex: 'newRegUser'
        },
        {
          title: '启动次数',
          dataIndex: 'startCn'
        },
        {
          title: '当日活跃用户数',
          dataIndex: 'activeUser'
        },
        {
          title: '月活跃用户数',
          dataIndex: 'activeUserPerMonth'
        },
        {
          title: '人均使用时长（秒）',
          dataIndex: 'useTimeAvg'
        },
        {
          title: '人均使用频次',
          dataIndex: 'useCntAvg'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        start: '',
        end: ''
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
        return getActiveUser(this.queryParam).then(res => {
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
    // 改变时间
    onDatePickChange (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    exportCSV () {
      let prefixUrl = getActiveUserExcel()
      let url = `${prefixUrl}?start=${this.queryParam.start}&end=${
        this.queryParam.end
      }`
      window.open(url)
    }
  }
}
</script>

<style lang="less">
.activeUserWrapper {
	.ant-divider {
		margin: 0;
	}
	.flex-b {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
