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
				slot-scope="text">
				{{ +text === 2?'审核通过':+text===3?'审核驳回':'待审核' }}
			</span>

			<span slot="rejectDescribe"
				slot-scope="text">
				<span style="word-break:break-all;">{{text}}</span>
			</span>
		</a-table>
	</div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['recordList'],
  data () {
    return {
      recordColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '审核时间',
          dataIndex: 'auditTime'
        },
        {
          title: '审核人',
          dataIndex: 'auditor'
        },
        {
          title: '审核状态',
          dataIndex: 'auditStatus',
          scopedSlots: { customRender: 'auditStatus' }
        },
        {
          title: '驳回理由',
          dataIndex: 'rejectDescribe',
          scopedSlots: { customRender: 'rejectDescribe' }
        }
      ]
    }
  }
}
</script>

<style lang="less">
.checkRecordWrapper {
}
</style>
