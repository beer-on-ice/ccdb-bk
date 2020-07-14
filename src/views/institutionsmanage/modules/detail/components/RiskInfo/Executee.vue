<template>
	<div class="executee-wrapper">
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
    title: '立案日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '执行标的',
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
    title: '被执行人',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '身份证号码/组织机构代码',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 被执行人
  name: 'executee',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.executee-wrapper {
}
</style>
