<template>
	<div class="activitiesWrapper">
		<h1>首页精彩活动</h1>
		<a-card :bordered="false">
			<div class="filterWrapper">
				<a-form layout="inline"
					:form="form">
					<a-form-item label="活动名称">
						<a-input v-model="queryParam.activityName"
							placeholder="请输入" />
					</a-form-item>
					<a-button-group>
						<a-button @click="$refs.table.refresh(true)">查询</a-button>
					</a-button-group>
				</a-form>
			</div>
			<div class="addConsultWrapper">
				<a-button size="large"
					@click="handleAdd"
					style="background:rgba(7, 150, 66, 1);">添加活动</a-button>
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
				<span slot="sequence"
					slot-scope="text,record">
					<a-select v-if="record.publish === 1 || record.activityType === 0"
						style="width:100px;"
						:disabled="record.valid === 1"
						:defaultValue="(!record.homePageOrder || record.homePageOrder === 99) ? '默认' :  record.homePageOrder"
						@change="val => handleOrder(val, record)">
						<a-select-option v-for="item in ['默认',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
							:key="item"
							:value="item">{{item}}</a-select-option>
					</a-select>
					<span v-else
						style="color:red;">未发布</span>
				</span>
				<span slot="valid"
					slot-scope="text, record">
					<span :style="{color: record.valid===0?'green':record.valid===1?'red':'#000'}">{{record.valid===0?'运营中':record.valid===1?'已过期':'待运营'}}</span>
				</span>
				<span slot="activityTime"
					slot-scope="text, record">
					<span v-if="record.activityTime!==record.activityClosingTime">{{record.activityTime}} 至 {{record.activityClosingTime}}</span>
					<span v-else>{{record.activityTime}}</span>
				</span>
				<span slot="action"
					slot-scope="text, record">
					<div class="btnWrapper">
						<a-button type="primary"
							@click="handleView(record)">查看</a-button>
						<a-button v-if="record.activityType !== 0"
							type="primary"
							@click="handleEdit(record)">编辑</a-button>
						<a-popconfirm v-auth="$route.meta.dutyName"
							v-if="record.activityType !== 0"
							title="是否确定要删除？"
							@confirm="handleDel(record)"
							okText="确定"
							cancelText="取消">
							<a-button type="danger">删除</a-button>
						</a-popconfirm>
					</div>
				</span>
				<span slot="appoint"
					slot-scope="text, record">
					<a-button type="primary"
						v-if="record.activityType"
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
				<span>{{appointData.activityLocation}}</span>
				<span>活动时间：{{appointData.activityTime}}</span>
				<span>共有<em>{{appointData.activityNum}}</em>人预约</span>
			</div>
			<a-table size="small"
				:columns="appointColumns"
				:dataSource="appointData.list"
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
import {
  pagingStartActivityInformation,
  removeActivityInformation,
  showBespeak,
  eidtStartSequence
} from '@/api/institution/excitingActivities'

export default {
  name: 'activityManagement',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      appointmentVisible: false,
      appointData: {
        activityLocation: '',
        activityTime: '',
        activityNum: 0,
        list: []
      },
      appointColumns: [
        {
          title: '序号',
          width: '234px',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '姓名',
          width: '234px',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '电话',
          width: '234px',
          dataIndex: 'phone',
          align: 'center'
        },
        {
          title: '预约时间',
          width: '234px',
          dataIndex: 'bookingTime',
          align: 'center'
        }
      ],
      queryParam: {
        startPage: 1,
        pageSize: 10,
        activityName: ''
      },
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '地区',
          dataIndex: 'activityArea',
          align: 'center'
        },
        {
          title: '活动名称',
          width: '234px',
          dataIndex: 'activityName',
          align: 'center'
        },
        {
          title: '活动地点',
          width: '234px',
          dataIndex: 'activityAddress',
          align: 'center'
        },
        {
          title: '活动日期',
          dataIndex: 'activityTime',
          align: 'center',
          scopedSlots: { customRender: 'activityTime' }
        },
        {
          title: '截止日期',
          dataIndex: 'closingDate',
          align: 'center'
        },
        {
          title: '规模人数',
          dataIndex: 'numberOfParticipants',
          align: 'center'
        },
        {
          title: '顺序',
          dataIndex: 'sequence',
          align: 'center',
          scopedSlots: { customRender: 'sequence' }
        },
        {
          title: '活动状态',
          dataIndex: 'valid',
          align: 'center',
          scopedSlots: { customRender: 'valid' }
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '活动预约',
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
        return pagingStartActivityInformation(this.queryParam).then(res => {
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
    async getAppointmentData (id) {
      try {
        let res = await showBespeak({
          id: id
        })
        if (res.code === 200) {
          this.appointData = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async handleDel (record) {
      try {
        let res = await removeActivityInformation({
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
        homePageOrder: sequence
      }
      try {
        const res = await eidtStartSequence(param)
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
    handleCheckAppointor (record) {
      this.getAppointmentData(record.id)
      this.appointmentVisible = true
    },
    handlePreviewCancel () {
      this.appointData = {
        activityLocation: '',
        activityTime: '',
        activityNum: 0,
        list: []
      }
      this.appointmentVisible = false
    },
    handleAdd () {
      this.$router.push({
        name: 'addActivities'
      })
    },
    handleView (record) {
      this.$router.push({
        name: 'viewActivities',
        query: { id: record.id }
      })
    },
    handleEdit (record) {
      this.$router.push({
        name: 'editActivities',
        query: { id: record.id }
      })
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
