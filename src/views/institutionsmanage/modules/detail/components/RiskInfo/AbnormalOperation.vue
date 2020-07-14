<template>
	<div class="abnormal-operation-wrapper">
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
    title: '列入日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '列入经营异常名录原因',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '作出决定机关',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '移出日期',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '移出经营异常名录原因',
    dataIndex: 'creater',
    align: 'center'
  }
]
export default {
  // 经营异常
  name: 'abnormal-operation',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.abnormal-operation-wrapper {
}
</style>
