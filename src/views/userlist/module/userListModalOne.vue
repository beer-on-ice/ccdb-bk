<template>
	<div class="userlistDetailOne">
		<a-modal :title="modalInfo.status | titleFilter"
			class="modalSpecicalOne"
			:destroyOnClose="true"
			:visible="modalInfo.visible"
			@cancel="handleModalCancel">
			<template slot="footer">
				<a-button type="primary"
					@click="handleModalCancel">
					关闭
				</a-button>
			</template>
			<a-table rowKey="id"
				:columns="currentColumns"
				:dataSource="modalInfo.data.list"
				:pagination="paginationOption"
				bordered>
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
			</a-table>
		</a-modal>
	</div>
</template>
<script>
export default {
  name: 'userListModalOne',
  props: {
    modalInfo: Object
  },
  data () {
    return {
      // 页码选项
      paginationOption: {
        total: 0,
        defaultPageSize: 5,
        onChange: page => this.hanldePageChange(page),
        size: 'small',
        hideOnSinglePage: true
      },
      // 添加关注表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: () => {
            let filter = this.$options.filters['columnFilter']
            return filter(this.modalInfo.status)
          },
          dataIndex: 'managerName',
          align: 'center'
        },
        {
          title: '关注日期',
          dataIndex: 'follower',
          align: 'center'
        }
      ],
      // 系统预警表头
      columnsTwo: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '系统舆情推送',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '公司名称',
          dataIndex: 'tag',
          align: 'center'
        },
        {
          title: '推送日期',
          dataIndex: 'releaseDate',
          align: 'center'
        }
      ],
      // 人工预警表头
      columnsThree: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '人工舆情推送',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '公司名称',
          dataIndex: 'tag',
          align: 'center'
        },
        {
          title: '推送日期',
          dataIndex: 'releaseDate',
          align: 'center'
        },
        {
          title: '推送人',
          dataIndex: 'pushName',
          align: 'center'
        }
      ],
      // 顾问帮填表头
      columnsFour: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '关联顾问',
          dataIndex: 'managerName',
          align: 'center'
        },
        {
          title: '顾问类型',
          dataIndex: 'follower',
          align: 'center'
        },
        {
          title: '帮填次数',
          dataIndex: 'followers',
          align: 'center'
        },
        {
          title: '关联日期',
          dataIndex: 'uses',
          align: 'center'
        }
      ]
    }
  },
  updated () {
    this.paginationOption.total = this.modalInfo.data.total || 0
  },
  methods: {
    // 翻页
    hanldePageChange (page) {
      this.$emit('hanldeModalPageChange', page)
    },
    // 关闭模态框
    handleModalCancel () {
      this.$emit('closeModal')
    }
  },
  computed: {
    currentColumns () {
      if (
        this.modalInfo.status === 1 ||
				this.modalInfo.status === 2 ||
				this.modalInfo.status === 3 ||
				this.modalInfo.status === 4
      ) {
        return this.columns
      } else if (this.modalInfo.status === 5) {
        return this.columnsTwo
      } else if (this.modalInfo.status === 6) {
        return this.columnsThree
      } else if (this.modalInfo.status === 7) {
        return this.columnsFour
      }
      return this.columns
    }
  },
  filters: {
    // 类型
    columnFilter (type) {
      switch (type) {
        case 1:
          return '关注公司'
        case 2:
          return '关注高管'
        case 3:
          return '关注产品'
        case 4:
          return '关注资讯'
      }
    },
    titleFilter (type) {
      if (type === 1 || type === 2 || type === 3 || type === 4) {
        return '查看明细-添加关注'
      } else if (type === 5) {
        return '查看明细-系统舆情预警'
      } else if (type === 6) {
        return '查看明细-人工舆情预警'
      } else if (type === 7) {
        return '查看明细-顾问帮填'
      }
    }
  }
}
</script>

<style lang="less">
.modalSpecicalOne {
	.ant-modal-footer {
		text-align: center;
	}
}
</style>
