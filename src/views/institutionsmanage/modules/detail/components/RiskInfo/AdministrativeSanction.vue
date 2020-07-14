<template>
	<div class="administrative-sanction-wrapper">
		<a-radio-group v-model="value">
			<a-radio-button :value="0">
				行政处罚【工商局】<span class="num">7</span>
			</a-radio-button>
			<a-radio-button :value="1">
				行政处罚【信用中国】<span class="num">8</span>
			</a-radio-button>
		</a-radio-group>
		<a-table style="margin-top:20px;"
			:columns="value===0?columns:columns2"
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
    title: '处罚决定日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '决定书文号',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '违法行为类型',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '行政处罚内容',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '决定机关',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '决定代表人',
    dataIndex: 'creater2',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'creater3',
    align: 'center'
  }
]
const columns2 = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
    align: 'center'
  },
  {
    title: '处罚决定日期',
    dataIndex: 'area',
    align: 'center'
  },
  {
    title: '处罚名称',
    dataIndex: 'area2',
    align: 'center'
  },
  {
    title: '决定书文号',
    dataIndex: 'organizationName',
    align: 'center'
  },
  {
    title: '处罚事由',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '处罚状态',
    dataIndex: 'detailedArea',
    align: 'center'
  },
  {
    title: '处罚决定日期',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '处罚类型1',
    dataIndex: 'creater',
    align: 'center'
  },
  {
    title: '处罚类型2',
    dataIndex: 'creater2',
    align: 'center'
  },
  {
    title: '处罚依据',
    dataIndex: 'creater5',
    align: 'center'
  },
  {
    title: '处罚结果',
    dataIndex: 'creater4',
    align: 'center'
  },
  {
    title: '触发机关',
    dataIndex: 'creater3',
    align: 'center'
  }
]
export default {
  // 行政处罚
  name: 'administrative-sanction',
  props: ['list'],
  data () {
    return {
      columns,
      columns2,
      value: 0
    }
  },
  methods: {
    onChange (e) {
      this.e.target.value = e.target.value
    }
  }
}
</script>

<style lang="less">
.administrative-sanction-wrapper {
	.num {
		color: red;
	}
}
</style>
