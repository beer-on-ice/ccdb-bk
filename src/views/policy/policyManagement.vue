<template>
	<div class="policyManagementWrapper">
		<WarrantyEdit :visible="warrantyEditVisible"
			@handleWarrantyEditClose="handleWarrantyEditClose"></WarrantyEdit>
		<a-row :gutter="24"
			class="policyWrapper">
			<a-col :xl="8"
				:lg="8"
				:md="8"
				:sm="8"
				:xs="8">
				<img class="policyImg"
					:src="policyImg" />
			</a-col>
			<a-col :xl="16"
				:lg="16"
				:md="16"
				:sm="16"
				:xs="16">
				<div class="policyRightWrapper">
					<div class="policyRightTop">
						<h3>预约体检</h3>
						<div>
							<p>
								<span>图片素材</span>
								<span>图片要求：111*111 小于2MB</span>
								<a-button class="btn">上传</a-button>
							</p>
							<p>
								<span>文档素材</span>
								<span>文档要求：PDF、JPG、PNG 小于2MB</span>
								<a-button class="btn">上传</a-button>
							</p>
						</div>
					</div>
					<div class="policyRightMiddle">
						<h3>最新政策</h3>
						<div>
							<a-row>
								<a-col :xl="12"
									:lg="12"
									:md="12"
									:sm="12"
									:xs="12"
									v-for="(item,index) in newPolicy"
									:key="item.id"
									class="policyItem">
									<p>
										<span>{{index+1}}.</span>
										<span>{{item.title}}</span>
										<span>{{item.time}}</span>
										<a-button class="btn"
											type='danger'>删除</a-button>
										<a-button class="btn"
											type='primary'
											@click="handleNewPolicyEdit(item.id)">编辑</a-button>
									</p>
								</a-col>
								<a-col :xl="12"
									:lg="12"
									:md="12"
									:sm="12"
									:xs="12"
									class="policyItem">
									<a-button style="float:right;margin-right:8px;">新增</a-button>
								</a-col>
							</a-row>
						</div>
					</div>
					<div class="policyRightBottom">
						<h3>保单服务</h3>
						<div class="tablePageWrapper">
							<div class="tablePageSearchWrapper">
								<a-form layout="inline">
									<div class="searchBtnWrapper">
										<a-form-item label="服务类别：">
											<a-button type="primary"
												:ghost="false">全部</a-button>
											<a-button type="primary"
												ghost>保单服务</a-button>
											<a-button type="primary"
												ghost>理赔服务</a-button>
											<a-button type="primary"
												ghost>信息更改</a-button>
										</a-form-item>
									</div>
									<div>
										<a-form-item label="二级类别">
											<a-select v-model="queryParam.secondLevel"
												placeholder="请选择"
												default-value="0"
												style="min-width:100px;">
												<a-select-option value="0">全部</a-select-option>
												<a-select-option value="1">关闭</a-select-option>
												<a-select-option value="2">运行中</a-select-option>
											</a-select>
										</a-form-item>
										<a-form-item>
											<a-input v-model="queryParam.selectLevel"
												placeholder="输入类别名称" />
										</a-form-item>
									</div>
									<div>
										<a-row>
											<a-col :xl="16"
												:lg="16"
												:md="16"
												:sm="16"
												:xs="16">
												<a-form-item label="保险公司：">
													<a-select v-model="queryParam.company"
														placeholder="请选择"
														default-value="0"
														style="min-width:100px;">
														<a-select-option value="0">全部</a-select-option>
														<a-select-option value="1">关闭</a-select-option>
														<a-select-option value="2">运行中</a-select-option>
													</a-select>
												</a-form-item>
												<a-form-item>
													<a-input v-model="queryParam.id"
														placeholder="输入保险公司名称" />
												</a-form-item>
											</a-col>
											<a-col :xl="8"
												:lg="8"
												:md="8"
												:sm="8"
												:xs="8"
												class="searchBtnWrapper">
												<a-button>查询</a-button>
												<a-button>重置</a-button>
												<a-button>新增</a-button>
											</a-col>
										</a-row>
									</div>
								</a-form>
							</div>
							<s-table ref="table"
								size="default"
								rowKey="key"
								:columns="columns"
								:data="loadData"
								showPagination="auto"
								bordered>
								<span slot="serial"
									slot-scope="text,record,index">
									{{ index + 1 }}
								</span>
								<span slot="action"
									slot-scope="text,record">
									<template>
										<a-button type="primary"
											@click="handleWarrantyEdit(record.id)">编辑</a-button>
										<a-divider type="vertical" />
										<a-button type="danger">删除</a-button>
									</template>
								</span>
								<span slot="blank">
									<a-checkbox />
								</span>
								<span slot="example">
									<a-checkbox />
								</span>
							</s-table>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
	</div>

</template>

<script>
import { STable, WarrantyEdit } from '@/components'
import { getServiceList } from '@/api/manage'

export default {
  components: {
    STable,
    WarrantyEdit
  },
  data () {
    return {
      // 左边大图
      policyImg: require('./img/policyManagement.png'),
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '类别',
          align: 'center',
          dataIndex: 'level'
        },
        {
          title: '二级类别',
          align: 'center',
          dataIndex: 'secondlevel'
        },
        {
          title: '保险公司',
          align: 'center',
          dataIndex: 'company'
        },
        {
          title: '空白文档',
          align: 'center',
          dataIndex: 'blank',
          scopedSlots: { customRender: 'blank' }
        },
        {
          title: '样例',
          align: 'center',
          dataIndex: 'example',
          scopedSlots: { customRender: 'example' }
        },
        {
          title: '最后更新时间',
          align: 'center',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 保单编辑是否显示
      warrantyEditVisible: false,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then(
          res => {
            return res.result
          }
        )
      },
      // 政策
      newPolicy: [
        {
          id: 1,
          title: '最新优惠政策',
          time: '2019-01-02'
        },
        {
          id: 2,
          title: '缴费优惠政策',
          time: '2019-01-02'
        },
        {
          id: 3,
          title: '企业优惠政策',
          time: '2019-01-02'
        }
      ]
    }
  },
  methods: {
    // 政策编辑
    handleNewPolicyEdit (id) {
      this.$router.push({ path: '/policy/newpolicyedit', query: { id } })
    },
    // 保单编辑
    handleWarrantyEdit (id) {
      this.warrantyEditVisible = true
    },
    handleWarrantyEditClose () {
      this.warrantyEditVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.policyWrapper {
	.policyImg {
		width: 80%;
		background-size: contain;
	}
	.policyRightWrapper {
		h3 {
			font-size: 14px;
			font-weight: bold;
		}
		.policyRightTop {
			div {
				width: 100%;
				padding: 0 28px;
				background: #fff;
				border-radius: 10px;
				p {
					padding: 15px 0;
					line-height: 32px;
					margin: 0;
					border-bottom: 1px dashed rgba(229, 229, 229, 1);
					&:nth-of-type(2) {
						border-bottom: none;
					}
					span:nth-of-type(1) {
						font-size: 14px;
						margin-right: 60px;
					}
					span:nth-of-type(2) {
						font-size: 12px;
						color: rgba(166, 166, 166, 1);
					}
					.btn {
						float: right;
					}
				}
			}
		}
		.policyRightMiddle {
			margin-top: 35px;
			div {
				background: #fff;
				padding: 5px 0;
				border-radius: 10px;
				.policyItem {
					border-bottom: 1px dashed #ccc;
					padding: 5px 0 5px 28px;
					p {
						margin: 0;
						border-right: 1px solid #ccc;
						line-height: 32px;
						&:nth-of-type(odd) {
							border-right: none;
						}
						span {
							font-size: 14px;
							margin-right: 2px;
						}
						span:nth-of-type(3) {
							margin: 0 20px 0 60px;
							font-size: 12px;
							color: rgba(166, 166, 166, 1);
						}
						.btn {
							margin-right: 8px;
							float: right;
						}
					}
				}
			}
		}
		.policyRightBottom {
			margin-top: 35px;
			.tablePageWrapper {
				background: #fff;
				padding: 20px;
				border-radius: 10px;
				.tablePageSearchWrapper {
					.searchBtnWrapper {
						.ant-btn {
							margin-left: 5px;
						}
					}
				}
			}
		}
	}
}
</style>
