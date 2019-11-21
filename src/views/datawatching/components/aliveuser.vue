<template>
	<div class="aliveUserWrapper">
		<div class="operateWrapper">
			<div class="operate">
				<a-radio-group v-model="queryParam.discern"
					buttonStyle="solid"
					@change="onAliveFChange">
					<a-radio-button value="1">新增用户留存</a-radio-button>
					<a-radio-button value="2">活跃用户留存</a-radio-button>
				</a-radio-group>
				<a-radio-group v-model="queryParam.flag"
					buttonStyle="solid"
					@change="onAliveSChange">
					<a-radio-button value="0">留存率</a-radio-button>
					<a-radio-button value="1">留存数</a-radio-button>
					<a-button @click="exportCSV">导出CSV</a-button>
				</a-radio-group>
			</div>
			<a-divider></a-divider>
		</div>
		<s-table ref="table"
			style="margin-top:30px;"
			size="default"
			rowKey="id"
			bordered
			:columns="queryParam.flag === '0'?aliveFcolumns:aliveScolumns"
			:data="loadData"
			:pagination="pagination">
		</s-table>
	</div>
</template>

<script>
import { STable } from '@/components'
import {
  getAppNewRegSituation,
  getNewRegSituationExcel,
  getNewRegSituationNumExcel,
  getAactivitySituationExcel,
  getActivitySituationNumExcel
} from '@/api/datawatching'
export default {
  name: 'aliveUser',
  components: {
    STable
  },
  data () {
    return {
      aliveFcolumns: [
        {
          title: '日期',
          dataIndex: 'date'
        },
        {
          title: '新用户数',
          dataIndex: 'newRegUser'
        },
        {
          title: '次日',
          dataIndex: 'day1'
        },
        {
          title: '2天后',
          dataIndex: 'day2'
        },
        {
          title: '3天后',
          dataIndex: 'day3'
        },
        {
          title: '4天后',
          dataIndex: 'day4'
        },
        {
          title: '5天后',
          dataIndex: 'day5'
        },
        {
          title: '6天后',
          dataIndex: 'day6'
        },
        {
          title: '7天后',
          dataIndex: 'day7'
        }
      ],
      aliveScolumns: [
        {
          title: '日期',
          dataIndex: 'date'
        },
        {
          title: '用户数',
          dataIndex: 'newRegUser'
        },
        {
          title: '次日',
          dataIndex: 'day1Num'
        },
        {
          title: '2天后',
          dataIndex: 'day2Num'
        },
        {
          title: '3天后',
          dataIndex: 'day3Num'
        },
        {
          title: '4天后',
          dataIndex: 'day4Num'
        },
        {
          title: '5天后',
          dataIndex: 'day5Num'
        },
        {
          title: '6天后',
          dataIndex: 'day6Num'
        },
        {
          title: '7天后',
          dataIndex: 'day7Num'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        discern: '1',
        flag: '0'
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
        return getAppNewRegSituation(this.queryParam).then(res => {
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
    onAliveFChange () {
      this.aliveFcolumns[1].title =
				this.queryParam.discern === '1' ? '新用户数' : '用户数'
      this.aliveScolumns[1].title =
				this.queryParam.discern === '1' ? '新用户数' : '用户数'
      this.$refs.table.refresh(true)
    },
    onAliveSChange () {
      this.$refs.table.refresh(true)
    },
    exportCSV () {
      let prefixUrl = ''
      if (this.queryParam.discern === '1' && this.queryParam.flag === '0') {
        prefixUrl = getNewRegSituationExcel()
      } else if (
        this.queryParam.discern === '1' &&
				this.queryParam.flag === '1'
      ) {
        prefixUrl = getNewRegSituationNumExcel()
      } else if (
        this.queryParam.discern === '2' &&
				this.queryParam.flag === '0'
      ) {
        prefixUrl = getAactivitySituationExcel()
      } else if (
        this.queryParam.discern === '2' &&
				this.queryParam.flag === '1'
      ) {
        prefixUrl = getActivitySituationNumExcel()
      }
      let url = `${prefixUrl}`
      window.open(url)
    }
  }
}
</script>

<style lang="less">
.aliveUserWrapper {
	.operateWrapper {
		margin-top: 50px;
		.operate {
			display: flex;
			justify-content: space-between;
			.ant-radio-group:nth-of-type(2) {
				label {
					border-radius: 4px;
					margin: 0 10px;
				}
			}
		}
		.ant-divider {
			margin: 0;
		}
	}
}
</style>
