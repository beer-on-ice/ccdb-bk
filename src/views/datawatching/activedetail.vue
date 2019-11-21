<template>
	<div class="datalogDetailWrapper">
		<div class="operatorWrapper">
			<h3>用户日活/启动次数明细 {{pageTitleTime}}</h3>
			<a-form layout="inline"
				:form="form"
				class="filterFormWrapper">
				<a-row>
					<a-col :span="4">
						<a-form-item label="日期: ">
							<a-date-picker @change="onDateChange"
								v-decorator="['dateRange']"
								showToday
								:allowClear="false" />
						</a-form-item>
					</a-col>
					<a-col :span="2">
						<a-form-item>
							<a-button type="primary"
								@click="getData">查询</a-button>
						</a-form-item>
					</a-col>
					<a-col :span="10">
						<a-form-item label="筛选: ">
							<a-radio-group v-model="queryParam.type"
								buttonStyle="solid"
								@change="onRadioChange">
								<a-radio-button value="1">设备号</a-radio-button>
								<a-radio-button value="2">登录账号</a-radio-button>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :span="2">
						<a-form-item>
							<a-button type="primary"
								@click="exportCSV">导出</a-button>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
			<p>{{tipWord}}</p>
		</div>
		<s-table ref="table"
			style="margin-top:15px;"
			size="default"
			rowKey="id"
			bordered
			:columns="currentColumns"
			:data="loadData"
			:pagination="pagination">
			<span slot="serial"
				slot-scope="text, record, index">
				{{ index + 1 }}
			</span>
			<span slot="mobile"
				slot-scope="text">
				{{ handleTel(text) }}
			</span>
			<span slot="osType"
				slot-scope="text">
				{{ text == 1? 'ios' : 'android' }}
			</span>
		</s-table>
	</div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getStartData, getStartDataExcel } from '@/api/datawatching'
export default {
  name: 'activedetail',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      pageTitleTime: '',
      activeEquipColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '设备号',
          dataIndex: 'deviceId'
        },
        {
          title: '操作系统',
          dataIndex: 'osType',
          scopedSlots: { customRender: 'osType' }
        },
        {
          title: '启动次数',
          dataIndex: 'count'
        }
      ],
      activeAccountColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '登录账号',
          dataIndex: 'mobile',
          scopedSlots: { customRender: 'mobile' }
        },
        {
          title: '启动次数',
          dataIndex: 'count'
        },
        {
          title: '姓名',
          dataIndex: 'nickName'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        type: '1',
        date: ''
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
        return getStartData(this.queryParam).then(res => {
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
  computed: {
    tipWord () {
      switch (this.queryParam.type) {
        case '1':
          return '统计1天内用户启动及访问APP的次数（一个设备号代表一个用户）'
        case '2':
          return '统计1天内用户启动及访问APP的次数（一个登陆账号代表一个用户）'
      }
      return ''
    },
    currentColumns () {
      switch (this.queryParam.type) {
        case '1':
          return this.activeEquipColumns
        case '2':
          return this.activeAccountColumns
      }
      return []
    }
  },
  mounted () {
    this.resetDatePicker()
  },
  methods: {
    handleTel (tel) {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return tel.toString().replace(reg, '$1****$2')
    },
    getData () {
      this.pageTitleTime = this.queryParam.date
      this.$refs.table.refresh(false)
    },
    onRadioChange () {
      this.resetParam()
      this.$refs.table.refresh(true)
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.date = dateString
    },
    resetParam () {
      this.queryParam = Object.assign(this.queryParam, {
        pageSize: 10
      })
    },
    resetDatePicker () {
      this.form.setFieldsValue({
        dateRange: moment()
      })
      this.queryParam.date = moment().format('YYYY-MM-DD')
      this.pageTitleTime = this.queryParam.date
    },
    exportCSV () {
      let prefixUrl = getStartDataExcel()
      let url = `${prefixUrl}?date=${this.queryParam.date}&type=${
        this.queryParam.type
      }`
      window.open(url)
    }
  }
}
</script>

<style lang="less">
.datalogDetailWrapper {
	.operatorWrapper {
		h3 {
			font-size: 20px;
			font-weight: bold;
			color: rgba(80, 80, 80, 1);
		}
		.filterFormWrapper {
			margin-top: 20px;
		}
		p {
			color: rgba(166, 166, 166, 0.8);
			font-size: 14px;
			margin: 15px 0 0;
		}
	}
}
</style>
