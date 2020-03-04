<template>
	<div class="hugeEventListWrapper">
		<a-table :columns="recordColumns"
			:dataSource="recordList"
			:pagination="false"
			:scroll="{ y: 500 }"
			size="middle"
			rowKey="id">
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
          title: '时间',
          dataIndex: 'eventTime',
          width: '234px',
          scopedSlots: { customRender: 'auditTime' }
        },
        {
          title: '标题',
          width: '234px',
          dataIndex: 'eventName'
        },
        {
          title: '内容',
          width: '534px',
          dataIndex: 'description'
        }
      ]
    }
  },
  methods: {
    _handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:MM:SS')
    }
  }
}
</script>

<style lang="less">
.hugeEventListWrapper {
}
</style>
