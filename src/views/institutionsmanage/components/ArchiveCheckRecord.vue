<template>
	<div class="checkRecordWrapper">
		<a-table :columns="recordColumns"
			:dataSource="recordList"
			size="small"
			rowKey="id">
			<span slot="serial"
				slot-scope="text, record, index">
				{{ index + 1 }}
			</span>

			<span slot="auditStatus"
				slot-scope="text"
				:style="{color: +text===3 ? 'red':+text === 2?'blue':'#000'}">
				{{ +text === 2?'审核通过':+text===3?'审核驳回':+text===4?'重置':'待审核' }}
			</span>

			<span slot="reasonForRejection"
				slot-scope="text">
				<span style="word-break:break-all;">{{text}}</span>
			</span>

			<span slot="opt"
				slot-scope="text,record">
				<span style="cursor:pointer;"
					@click="handleDetail(record)">查看</span>
			</span>
		</a-table>
		<a-modal class="archiveCheckRecordWrapper"
			v-model="visible"
			title="查看修改记录">
			<template slot="footer">
				<a-button key="back"
					@click="handleCancel">
					关闭
				</a-button>
			</template>
			<div class="flex-b-c">
				<span>修改人：{{detailInfo.lastModifier || '--'}}</span>
				<p style="margin:0;">
					审核状态：<span :style="{color: +detailInfo.auditStatus===3 ? 'red':+detailInfo.auditStatus === 2?'blue':'#000'}">{{+detailInfo.auditStatus=== 2?'审核通过':+detailInfo.auditStatus===3?'审核驳回':+detailInfo.auditStatus===4?'重置':'待审核'}}</span>
					<span style="margin-left:10px;">审核人：{{detailInfo.verifier || '--'}}</span>
				</p>
			</div>
			<a-table class="font-red"
				:columns="detailColumns"
				:data-source="detailInfo.changeList"
				size="small"
				:pagination="false"
				:scroll="{ y: 200 }"
				rowKey="name">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="name"
					slot-scope="text,record">
					<span v-if="handleISvHtml(record.type)"
						v-html="text"></span>
					<span v-else>{{text | rejectProFilter }}</span>
				</span>
				<span slot="oldVal"
					slot-scope="text,record">
					<img class="changeImg"
						:src="text"
						v-if="record.name==='logoUrl' && text!=='' ">
					<span v-else-if="handleISvHtml(record.type) || record.name==='institutionalType'"
						v-html="text"></span>
					<span v-else>{{text}}</span>
				</span>
				<span slot="newVal"
					slot-scope="text,record">
					<img class="changeImg"
						:src="text"
						v-if="record.name==='logoUrl' && text!=='' ">
					<span v-else-if="handleISvHtml(record.type) || record.name==='institutionalType'"
						v-html="text"></span>
					<span v-else>{{text}}</span>
				</span>
			</a-table>
			<p class="rejectReason">驳回字段：{{detailInfo.reason}}{{detailInfo.moduleChange}}{{detailInfo.reasonForRejection}}</p>
		</a-modal>
	</div>
</template>

<script>
import moment from 'moment'
import {
  viewModificationRecords,
  auditLogging
} from '@/api/institution/institutionArchives'
import rejectDataMixin from '@/views/institutionsmanage/mixin/rejectDataMixin' // 引入mixin文件

const recordColumns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '修改人',
    dataIndex: 'lastModifier'
  },
  {
    title: '提交日期',
    dataIndex: 'createTime'
  },
  {
    title: '申请修改内容',
    dataIndex: 'modificationRecord',
    scopedSlots: { customRender: 'modificationRecord' }
  },
  {
    title: '审核时间',
    dataIndex: 'auditTime'
  },
  {
    title: '审核人',
    dataIndex: 'verifier'
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    scopedSlots: { customRender: 'auditStatus' }
  },
  {
    title: '修改记录',
    scopedSlots: { customRender: 'opt' }
  }
]
const detailColumns = [
  {
    title: '序号',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '字段名称',
    align: 'center',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '修改前数据',
    align: 'center',
    dataIndex: 'oldVal',
    scopedSlots: { customRender: 'oldVal' }
  },
  {
    title: '申请修改的数据',
    align: 'center',
    dataIndex: 'newVal',
    scopedSlots: { customRender: 'newVal' }
  }
]
export default {
  mixins: [rejectDataMixin],
  data () {
    return {
      recordColumns,
      detailColumns,
      visible: false,
      detailInfo: {},
      recordList: []
    }
  },
  mounted () {
    this.getAduitInfo()
  },
  methods: {
    async getAduitInfo () {
      try {
        let res = await auditLogging({
          companyUrl: this.$route.query.companyUrl
        })
        if (res.code === 200) {
          this.recordList = [...res.data]
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async handleDetail ({ id }) {
      const {
        handleChangeList,
        handleReason,
        $notification: { error }
      } = this
      try {
        const res = await viewModificationRecords({ id })
        if (res.code === 200) {
          const {
            change,
            applicationForAmendment,
            moduleChange,
            reasonForRejection
          } = res.data
          const changeList = handleChangeList(change)
          const reason = `${handleReason(applicationForAmendment)}`
          this.detailInfo = {
            ...res.data,
            changeList,
            reason,
            moduleChange: moduleChange || '',
            reasonForRejection: reasonForRejection || ''
          }
          this.visible = true
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        error({
          message: message || '网络故障，请重试！'
        })
      }
    },

    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.checkRecordWrapper {
}
.archiveCheckRecordWrapper {
	.changeImg {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.flex-b-c {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.rejectReason {
		margin-top: 10px;
		color: red;
	}
	.font-red {
		.ant-table-body {
			margin: 0 !important;
			.ant-table-row {
				td:nth-of-type(4) {
					span {
						color: red !important;
					}
				}
			}
		}
	}
}
</style>
