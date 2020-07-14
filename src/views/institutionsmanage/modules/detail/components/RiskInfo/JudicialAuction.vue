<template>
	<div class="judicial-auction-wrapper">
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
    title: '公告日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '拍卖公告',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '拍卖标的',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '执行法院',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 司法拍卖
  name: 'judicial-auction',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.judicial-auction-wrapper {
}
</style>
