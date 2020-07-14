<template>
	<div class="tax-arrears-wrapper">
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
    title: '纳税人类型',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '纳税人识别号',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '负责人姓名',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '证件号码',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '经营地点',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '欠税税种',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '欠税金额',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '欠税余额',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '当前新发生的欠税余额',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '税务机关',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  // 欠税公告
  name: 'tax-arrears',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.tax-arrears-wrapper {
}
</style>
