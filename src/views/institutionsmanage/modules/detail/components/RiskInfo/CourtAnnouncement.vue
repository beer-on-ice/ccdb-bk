<template>
	<div class="court-announcement-wrapper">
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
    title: '刊登日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '上诉方',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '被诉方',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '公告类型',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '法院',
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
  // 法院公告
  name: 'court-announcement',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.court-announcement-wrapper {
}
</style>
