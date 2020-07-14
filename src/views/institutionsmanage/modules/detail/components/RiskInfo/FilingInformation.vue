<template>
	<div class="filing-information-wrapper">
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
    title: '被执行人',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '股权数额',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '执行法院',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '执行通知书文号',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '类型|状态',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '执行事项',
    dataIndex: 'creater2',
    align: 'center'
  },
  {
    title: '执行裁定文书号',
    dataIndex: 'creater3',
    align: 'center'
  },
  {
    title: '被执行人持有股权、其他投资权益的数额',
    dataIndex: 'creater4',
    align: 'center'
  },
  {
    title: '被执行人证件种类',
    dataIndex: 'creater5',
    align: 'center'
  },
  {
    title: '被执行人证件号码',
    dataIndex: 'creater5',
    align: 'center'
  },
  {
    title: '冻结期限自',
    dataIndex: 'creater6',
    align: 'center'
  },
  {
    title: '冻结期限至',
    dataIndex: 'creater7',
    align: 'center'
  },
  {
    title: '冻结期限',
    dataIndex: 'creater8',
    align: 'center'
  },
  {
    title: '公示日期',
    dataIndex: 'creater9',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 立案信息
  name: 'filing-information',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.filing-information-wrapper {
}
</style>
