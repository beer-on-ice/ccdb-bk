<template>
	<div class="equity-pledge-wrapper">
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
    title: '股权出质设立登记日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '登记编号',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '出质人',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '出质人证件号码',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '质权人',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '出质人证件号码',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '质权人证件号码',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '出质股权数额',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '备注',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 股权出质
  name: 'equity-pledge',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.equity-pledge-wrapper {
}
</style>
