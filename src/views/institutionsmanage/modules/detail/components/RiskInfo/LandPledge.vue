<template>
	<div class="land-pledge-wrapper">
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
    title: '土地坐落',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '起止时间',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '行政区',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '抵押面积（公顷）',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '抵押金额（万元）',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '抵押土地用途',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '宗地标示',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '宗地编号',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '土地他项权利人证号',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '土地使用权证号',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '土地抵押人名称',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '土地抵押人性质',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  },
  {
    title: '土地抵押权人',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '抵押土地权属性质与使用权类型',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '评估金额（万元）',
    dataIndex: 'creater',
    align: 'center'
  }
]
export default {
  // 土地抵押
  name: 'land-pledge',
  props: ['list'],
  data () {
    return {
      columns
    }
  }
}
</script>

<style lang="less">
.land-pledge-wrapper {
}
</style>
