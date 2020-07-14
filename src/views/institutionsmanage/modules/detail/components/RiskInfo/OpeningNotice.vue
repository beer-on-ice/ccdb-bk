
<template>
	<div class="opening-notice-wrapper">
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
    title: '开庭日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '案号',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '案由',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '公诉人/原告/上诉人/申请人',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '被告人/被告/被上诉人/被申请人',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 开庭公告
  name: 'opening-notice',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.opening-notice-wrapper {
}
</style>
