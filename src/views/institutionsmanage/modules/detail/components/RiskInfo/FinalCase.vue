<template>
	<div class="final-case-wrapper">
		<a-table :columns="columns"
			:data-source="list"
			bordered>
			<span slot="serial"
				slot-scope="text, record, index">
				{{ index + 1 }}
			</span>
		</a-table>
	</div>
</template>

<script>
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '处罚决定日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '决定书文号',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '违法行为类型',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '行政处罚内容',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '处罚决定日期',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '决定机关',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '法定代表人',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '备注',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 终本案件
  name: 'final-case',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.final-case-wrapper {
}
</style>
