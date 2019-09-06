<template>
	<div class="monitorDetail">
		<a-modal :title="title"
			class="modalSpecical"
			:destroyOnClose="true"
			:visible="modalVisible"
			@cancel="handleModalCancel">
			<template slot="footer">
				<a-button type="primary"
					@click="handleModalCancel">
					关闭
				</a-button>
			</template>
			<a-table rowKey="id"
				:columns="modalStatus == 3?managerModalColumns:modalStatus == 4?productModalColumns:modalStatus == 7?companyModalColumns:selfAroundModalColumns"
				:dataSource="modalData.list"
				:pagination="paginationOption"
				bordered>
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="operate"
					slot-scope="text,record"
					@click="handleEdit(record)">
					<a-icon type="edit" />
				</span>
			</a-table>
		</a-modal>
	</div>
</template>
<script>
export default {
  props: {
    modalVisible: Boolean,
    title: String,
    modalData: Object,
    modalStatus: Number || String
  },
  data () {
    return {
      paginationOption: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        onChange: page => this.hanldePageChange(page),
        total: 0,
        size: 'small',
        hideOnSinglePage: true
      },
      // 表头
      managerModalColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '高管名称',
          dataIndex: 'managerName',
          align: 'center'
        },
        {
          title: '关注数',
          dataIndex: 'follower',
          align: 'center'
        }
      ],
      productModalColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          align: 'center'
        },
        {
          title: '关注数',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '记账数',
          dataIndex: 'bill',
          align: 'center'
        }
      ],
      selfAroundModalColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '资讯名称',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '推送日期',
          dataIndex: 'releaseDate',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      companyModalColumns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '公司名称',
          dataIndex: 'administratorName',
          align: 'center'
        }
      ]
    }
  },
  updated () {
    this.paginationOption.total = this.modalData.total
  },
  methods: {
    // 翻页
    hanldePageChange (page) {
      this.$emit('hanldeModalPageChange', page)
    },
    // 关闭模态框
    handleModalCancel () {
      this.$emit('closeModal')
    },
    // 编辑
    handleEdit (record) {
      let info = {
        id: record.id,
        modalInfo: this.modalData.modalInfo
      }

      this.$router.push({
        // path: '/warning/monitorEdit',
        name: 'monitorEdit',
        params: {
          info
        }
      })
    }
  }
}
</script>

<style lang="less">
.modalSpecical {
	.ant-modal-footer {
		text-align: center;
	}
}
</style>
