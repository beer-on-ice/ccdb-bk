<template>
	<div class="datalogDetailWrapper">
		<div class="operatorWrapper">
			<h3>{{pageTitle}}</h3>
			<a-form layout="inline"
				:form="form"
				class="filterFormWrapper">
				<a-row>
					<a-col :span="4">
						<a-form-item label="日期: ">
							<a-date-picker @change="onDateChange" />
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
								<a-radio-button value="0">设备号</a-radio-button>
								<a-radio-button value="1">登录账号</a-radio-button>
								<a-radio-button value="2"
									v-if="detailType==='alive'">全部</a-radio-button>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<!-- <a-col :span="2">
						<a-form-item>
							<a-button type="primary">导出</a-button>
						</a-form-item>
					</a-col> -->
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
		</s-table>
	</div>
</template>

<script>
import { STable } from '@/components'
import { getActivitySituationNumExcel } from '@/api/datawatching'
export default {
  name: 'datalogDetail',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      pageTitle: '用户日活/启动次数明细 2019-07-29',
      detailType: 'active',
      activeEquipColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '设备号',
          dataIndex: 'title'
        },
        {
          title: '操作系统',
          dataIndex: 'inforDomain'
        },
        {
          title: '启动次数',
          dataIndex: 'isHot'
        }
      ],
      activeAccountColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '登录账号',
          dataIndex: 'title'
        },
        {
          title: '启动次数',
          dataIndex: 'inforDomain'
        },
        {
          title: '姓名',
          dataIndex: 'isHot'
        }
      ],
      aliveEquipColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '设备号',
          dataIndex: 'title'
        },
        {
          title: '操作系统',
          dataIndex: 'inforDomain'
        }
      ],
      aliveAccountColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '登录账号',
          dataIndex: 'title'
        },
        {
          title: '姓名',
          dataIndex: 'inforDomain'
        }
      ],
      aliveAllColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '设备号',
          dataIndex: 'title'
        },
        {
          title: '操作系统',
          dataIndex: 'inforDomain'
        },
        {
          title: '登录账号',
          dataIndex: 'isHot'
        },
        {
          title: '姓名',
          dataIndex: 'isTop'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        type: '1'
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
        return getActivitySituationNumExcel(this.queryParam).then(res => {
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
    this.detailType = this.$route.query.type
  },
  computed: {
    tipWord () {
      if (this.detailType === 'active') {
        switch (this.queryParam.targetType) {
          case '0':
            return '统计1天内用户启动及访问APP的次数（一个设备号代表一个用户）'
          case '1':
            return '统计1天内用户启动及访问APP的次数（一个登陆账号代表一个用户）'
        }
      } else {
        switch (this.queryParam.targetType) {
          case '0':
            return '次日留存：统计当天新增的设备号在注册第二天仍有登陆的设备号'
          case '1':
            return '次日留存：统计当天新增的登陆账号在注册第二天仍有登陆的账号'
          case '2':
            return '次日留存：统计当天新增的用户在注册第二天仍有登陆的用户（设备号与登陆账号可能存在重复的情况）'
        }
      }
      return ''
    },
    currentColumns () {
      if (this.detailType === 'active') {
        switch (this.queryParam.targetType) {
          case '0':
            return this.activeEquipColumns
          case '1':
            return this.aliveAccountColumns
        }
      } else {
        switch (this.queryParam.targetType) {
          case '0':
            return this.aliveEquipColumns
          case '1':
            return this.aliveAccountColumns
          case '2':
            return this.aliveAllColumns
        }
      }
      return ''
    }
  },
  methods: {
    getData () {
      this.$refs.table.refresh(true)
    },
    onRadioChange () {
      this.$refs.table.refresh(true)
    },
    // 日期选择器
    onDateChange (date, dateString) {
      this.queryParam.date = dateString
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
