<template>
	<div class="legal-proceedings-wrapper">
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
    title: '发布日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '案件名称',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '案由',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '案件身份',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '案号',
    dataIndex: 'createTime2',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 法律诉讼
  name: 'legal-proceedings',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.legal-proceedings-wrapper {
}
</style>
