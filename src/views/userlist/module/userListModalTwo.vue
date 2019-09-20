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
						v-model="currentRadio"
						@change="handleRadioChange">
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
						:customRow="columnsClick"
						:rowClassName="changeclassname"
						bordered>
						<p slot="serial"
							slot-scope="text, record, index"
							style="margin:0;">
							<span style="text-align:center;float:left;">
								{{ index + 1 }}
							</span>
							<a-icon class="iconNowSelect"
								type="caret-left"
								v-show="currentRowIndex === index" />
						</p>
					</a-table>
				</a-card>
				<a-card class="userlistDetailTwoRight">
					<component :is="currentViewArr[currentViewIndex]"></component>
				</a-card>
			</div>
		</a-modal>
	</div>
</template>
<script>
import fundSlot from './userlistDetailTwoRightSlot/fundSlot'
import trustSlot from './userlistDetailTwoRightSlot/trustSlot'
import insuranceSlot from './userlistDetailTwoRightSlot/insuranceSlot'
import outerInsuranceSlot from './userlistDetailTwoRightSlot/outerInsuranceSlot'
import houseSlot from './userlistDetailTwoRightSlot/houseSlot'
import bankFirstSlot from './userlistDetailTwoRightSlot/bankFirstSlot'
import bankSecSlot from './userlistDetailTwoRightSlot/bankSecSlot'
import bankThrSlot from './userlistDetailTwoRightSlot/bankThrSlot'
import bankFourSlot from './userlistDetailTwoRightSlot/bankFourSlot'
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
  components: {
    fundSlot,
    trustSlot,
    insuranceSlot,
    outerInsuranceSlot,
    houseSlot,
    bankFirstSlot,
    bankSecSlot,
    bankThrSlot,
    bankFourSlot
  },
  data () {
    return {
      fakeData,
      currentRadio: 1, // 当前radio
      currentRowIndex: 0, // 当前行
      currentViewIndex: 0, // 当前组件
      currentViewArr: [
        'fund-slot',
        'trust-slot',
        'insurance-slot',
        'outer-insurance-slot',
        'house-slot',
        'bank-first-slot',
        'bank-sec-slot',
        'bank-thr-slot',
        'bank-four-slot'
      ],
      // 页面
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
    handleRadioChange (e) {
      switch (e.target.value) {
        case 1:
          this.currentViewIndex = 5
          break
        case 2:
          this.currentViewIndex = 6
          break
        case 3:
          this.currentViewIndex = 7
          break
        case 4:
          this.currentViewIndex = 8
          break
      }
      this.$emit('changeInfoType', e.target.value)
    },
    // 点击当前行
    columnsClick (record, index) {
      return {
        on: {
          click: () => {
            this.currentRowIndex = index
            this.$emit('changeInfoMain', record)
          }
        }
      }
    },
    // 点击当前行使其高亮
    changeclassname (record, index) {
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 翻页
    hanldePageChange (page) {
      this.$emit('hanldeModalPageChange', page)
    },
    // 关闭模态框
    handleModalCancel () {
      this.currentRadio = 1
      this.$emit('closeModal')
    }
  },
  updated () {
    this.paginationOption.total = this.modalInfo.data.total || 0
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
        return '查看明细-境外资产记账'
      } else if (type === 6) {
        return '查看明细-不动产记账'
      }
    }
  },
  computed: {
    status () {
      return this.modalInfo.status
    }
  },
  watch: {
    status (newValue, oldValue) {
      switch (newValue) {
        case 1:
          this.currentViewIndex = 0
          break
        case 2:
          this.currentViewIndex = 5
          break
        case 3:
          this.currentViewIndex = 1
          break
        case 4:
          this.currentViewIndex = 2
          break
        case 5:
          this.currentViewIndex = 3
          break
        case 6:
          this.currentViewIndex = 4
          break
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
			.active {
				background-color: rgba(42, 130, 228, 0.3);
			}
			.iconNowSelect {
				font-size: 28px;
				color: rgba(255, 87, 51, 1);
				position: relative;
				top: 0;
				left: 300px;
			}
		}
	}
}
.userlistDetailTwoRight {
	width: 774px;
	height: 600px;
	overflow-y: scroll;
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
