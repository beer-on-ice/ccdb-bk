<template>
	<div class="break-faith-wrapper">
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
    title: '立案日期',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '案号',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '执行法院',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '履行情况',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '执行依据文号',
    dataIndex: 'creater2',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 失信信息
  name: 'break-faith',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.break-faith-wrapper {
}
</style>
