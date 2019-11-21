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
						<!-- <a-radio-button :value="3">债券</a-radio-button>
						<a-radio-button :value="4">票据</a-radio-button> -->
					</a-radio-group>
				</a-col>
			</a-row>
			<div class="main">
				<a-card>
					<a-table style="width:274px;"
						rowKey="orderId"
						:columns="columns"
						:scroll="{ y: 500 }"
						:dataSource="leftList"
						:pagination="false"
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
					<component :is="currentViewArr[currentViewIndex]"
						:info="currentViewObj"></component>
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
import goldExchangeSlot from './userlistDetailTwoRightSlot/goldExchangeSlot'

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
    bankFourSlot,
    goldExchangeSlot
  },
  data () {
    return {
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
        'bank-four-slot',
        'gold-exchange-slot'
      ],
      columns: [
        {
          title: '序号',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '产品名称',
          dataIndex: 'keyword',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    status () {
      return this.modalInfo.status
    },
    leftList () {
      return this.modalInfo.data[`tab${this.currentRadio}`]
    },
    currentViewObj () {
      if (
        this.modalInfo &&
				this.modalInfo.data &&
				this.modalInfo.data[`tab${this.currentRadio}`] &&
				this.modalInfo.data[`tab${this.currentRadio}`].length
      ) {
        return this.modalInfo.data[`tab${this.currentRadio}`][
          this.currentRowIndex
        ].firstItem
      }
      return {}
    }
  },
  methods: {
    handleRadioChange (e) {
      switch (e.target.value) {
        case 1:
          this.columns[1].title = '产品名称'
          this.currentViewIndex = 5
          break
        case 2:
          this.columns[1].title = '购入银行'
          this.currentViewIndex = 6
          break
        case 3:
          this.columns[1].title = '债券名称'
          this.currentViewIndex = 7
          break
        case 4:
          this.columns[1].title = '票据名称'
          this.currentViewIndex = 8
          break
      }
      this.currentRowIndex = 0
    },
    // 点击当前行
    columnsClick (record, index) {
      return {
        on: {
          click: () => {
            this.currentRowIndex = index
          }
        }
      }
    },
    // 点击当前行使其高亮
    changeclassname (record, index) {
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 关闭模态框
    handleModalCancel () {
      this.currentRadio = 1
      this.currentViewIndex = 0
      this.$emit('closeModal')
    }
  },
  filters: {
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
      } else if (type === 7) {
        return '查看明细-金交所投资详情'
      }
    }
  },
  watch: {
    status (newValue, oldValue) {
      this.currentRowIndex = 0

      switch (newValue) {
        case 1:
          this.columns[1].title = '产品名称'
          this.currentViewIndex = 0
          break
        case 2:
          this.columns[1].title = '产品名称'
          this.currentViewIndex = 5
          break
        case 3:
          this.columns[1].title = '产品名称'
          this.currentViewIndex = 1
          break
        case 4:
          this.columns[1].title = '主险名称'
          this.currentViewIndex = 2
          break
        case 5:
          this.columns[1].title = '保险名称'
          this.currentViewIndex = 3
          break
        case 6:
          this.columns[1].title = '小区名称'
          this.currentViewIndex = 4
          break
        case 7:
          this.columns[1].title = '产品名称'
          this.currentViewIndex = 9
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
				padding: 0 8px;
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
