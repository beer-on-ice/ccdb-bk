<template>
	<div class="activitiesWrapper">
		<h1>精彩活动</h1>
		<a-card :bordered="false">
			<div class="addConsultWrapper">
				<a-button size="large"
					@click="handleAdd">添加活动</a-button>
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
				<span slot="auditStatus"
					slot-scope="text">
					{{+text === 0 ? '待审核': +text === 1 ? '审核通过':'审核驳回'}}
				</span>
				<span slot="action"
					slot-scope="text, record">
					<div class="btnWrapper">
						<a-button type="primary"
							@click="handleEdit(record)"
							v-if="record.auditStatus === 0">查看</a-button>
						<a-button type="primary"
							@click="handleEdit(record)"
							v-if="record.auditStatus !== 0">编辑</a-button>
						<a-button type="danger"
							@click="handleDel(record)"
							v-if="record.auditStatus !== 0">删除</a-button>
					</div>
				</span>
				<span slot="appoint"
					slot-scope="text, record">
					<a-button type="primary"
						v-if="record.auditStatus === 0"
						@click="handleCheckAppointor(record)">查看</a-button>
				</span>
			</s-table>
		</a-card>
		<a-modal class="appointmentModalWrapper"
			title="查看预约名单"
			:visible="appointmentVisible"
			:footer="null"
			@cancel="handlePreviewCancel">
			<div class="info">
				<span>2019诺亚财富上海股权年度峰会-上海站</span>
				<span>活动时间：2019-11-22</span>
				<span>共有<em>100</em>人预约</span>
			</div>
			<a-table size="small"
				:columns="appointColumns"
				:dataSource="appointData"
				:pagination="false"
				:scroll="{ y: 300 }"
				rowKey="id">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
			</a-table>
		</a-modal>
	</div>
</template>

<script>
import { STable } from '@/components'
import { showBranchOrganizations, eidtBranchOrganization } from '@/api/branches'

export default {
  name: 'excitingWrapper',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      appointmentVisible: false,
      appointData: [],
      appointColumns: [
        {
          title: '序号',
          width: '234px',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '姓名',
          dataIndex: 'area',
          align: 'center'
        },
        {
          title: '电话',
          dataIndex: 'companyName',
          align: 'center'
        },
        {
          title: '预约时间',
          dataIndex: 'createTime',
          align: 'center'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        organizationName: '',
        companyUrl: 865392756
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '地区',
          dataIndex: 'area',
          align: 'center'
        },
        {
          title: '活动名称',
          dataIndex: 'companyName',
          align: 'center'
        },
        {
          title: '活动地点',
          dataIndex: 'detailedArea',
          align: 'center'
        },
        {
          title: '活动日期',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '规模人数',
          dataIndex: 'people',
          align: 'center'
        },
        {
          title: '审核状态',
          dataIndex: 'auditStatus',
          align: 'center',
          scopedSlots: { customRender: 'auditStatus' }
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '预约',
          align: 'center',
          scopedSlots: { customRender: 'appoint' }
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
      loadData: () => {
        return showBranchOrganizations(this.queryParam).then(res => {
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
    async getAppointmentData () {
      this.appointData = [
        {
          id: 1,
          area: '漳卅',
          companyName: 123123,
          createTime: '2019-32-32'
        },
        { id: 2, area: '漳卅2', companyName: 123123, createTime: '2019-32-32' }
      ]
    },
    handleAdd () {
      this.$router.push({
        name: 'addActivities'
      })
    },
    handleEdit (record) {
      this.$router.push({
        name: 'editActivities',
        query: { id: record.id }
      })
    },
    async handleDel (record) {
      try {
        let res = await eidtBranchOrganization({
          id: record.id,
          state: 1
        })
        if (res.code === 200) {
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
    handleCheckAppointor (record) {
      this.getAppointmentData()
      this.appointmentVisible = true
    },
    handlePreviewCancel () {
      this.appointmentVisible = false
    }
  }
}
</script>

<style lang="less">
.activitiesWrapper {
	min-width: 1200px;
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.addConsultWrapper {
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
	width: 60% !important;
	.info {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 50px;
		span {
			em {
				color: red;
			}
		}
	}
}
</style>
