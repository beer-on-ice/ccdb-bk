<template>
	<div class="userlistDetailTwo">
		<a-modal :title="modalInfo.status | titleFilter"
			class="modalSpecicalTwo"
			width="80%"
			:destroyOnClose="true"
			:visible="modalInfo.visible"
			@cancel="handleModalCancel">
			<template slot="footer">
				<a-button type="primary"
					@click="handleModalCancel">
					关闭
				</a-button>
			</template>
			<a-row style="margin-left:70px;"
				:gutter="48">
				<a-col>
					<a-radio-group v-if="modalInfo.status===2"
						v-model="currentRadio">
						<a-radio-button :value="1">理财产品</a-radio-button>
						<a-radio-button :value="2">定期存款</a-radio-button>
						<a-radio-button :value="3">债券</a-radio-button>
						<a-radio-button :value="4">票据</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
			<div class="main">
				<a-card>
					<a-table style="width:274px;"
						rowKey="id"
						:columns="columns"
						:dataSource="fakeData"
						:pagination="paginationOption"
						bordered>
						<span slot="serial"
							slot-scope="text, record, index">
							{{ index + 1 }}
						</span>
					</a-table>
				</a-card>
				<a-card style="width:774px;height:600px;overflow-y:scroll;"
					class="userlistDetailTwoRight">
					<a-card title="基本信息">
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>基金名称</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>合同编号</p>
								<p>10000</p>
							</div>
						</a-card-grid>
					</a-card>
					<a-card title="投资信息">
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>投资本金</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>投资期限</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>起始日期</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>到期日期</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>年华收益率</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>付息方式</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>预计已付息</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>近期付息日</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:100%;textAlign:'center'">
							<div>
								<p>产品风险等级</p>
								<p>10000</p>
							</div>
						</a-card-grid>
					</a-card>
					<a-card title="附加信息">
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>客户经理</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>联系电话</p>
								<p>10000</p>
							</div>
						</a-card-grid>
						<a-card-grid style="width:50%;textAlign:'center'">
							<div>
								<p>是否帮填</p>
								<p>10000</p>
							</div>
						</a-card-grid>
					</a-card>
				</a-card>
			</div>
		</a-modal>
	</div>
</template>
<script>
const fakeData = [
  {
    name: '哈哈哈',
    id: 1
  },
  {
    name: '嘻嘻嘻',
    id: 2
  },
  {
    name: '呵呵呵吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼',
    id: 3
  }
]
export default {
  name: 'userListModalTwo',
  props: {
    modalInfo: Object
  },
  data () {
    return {
      fakeData,
      currentRadio: 1,
      paginationOption: {
        total: 0,
        defaultPageSize: 5,
        onChange: page => this.hanldePageChange(page),
        size: 'small',
        hideOnSinglePage: true
      },
      columns: [
        {
          title: '序号',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '产品名称',
          dataIndex: 'name',
          align: 'center'
        }
      ]
    }
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
      if (type === 1) {
        return '查看明细-基金产品记账'
      } else if (type === 2) {
        return '查看明细-银行记账'
      } else if (type === 3) {
        return '查看明细-信托记账'
      } else if (type === 4) {
        return '查看明细-保险记账'
      } else if (type === 5) {
        return '查看明细-不动产记账'
      }
    }
  }
}
</script>

<style lang="less">
.modalSpecicalTwo {
	.ant-modal-footer {
		text-align: center !important;
	}
	.ant-modal-body {
		.main {
			margin-top: 20px;
			display: flex;
			justify-content: space-around;
		}
	}
}
.userlistDetailTwoRight {
	.ant-card-head {
		background: rgba(240, 240, 240, 1);
		.ant-card-head-title {
			font-weight: bold;
		}
	}
	.ant-card-grid {
		padding: 0;
		div {
			display: flex;
			align-items: center;
			p {
				margin: 0;
				padding: 24px;
				text-align: center;
				&:nth-of-type(odd) {
					padding: 24px 0;
					width: 150px;
					border-right: 1px solid #e8e8e8;
					font-weight: bold;
				}
				&:nth-of-type(even) {
					width: calc(100% - 150px);
				}
			}
			span {
				cursor: pointer;
				color: rgba(42, 130, 228, 1);
			}
		}
	}
}
</style>
