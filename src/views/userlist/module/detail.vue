<template>
	<div class="userlistDetailWrapper">
		<a-button type="primary"
			@click="hanldeBack">
			返回
		</a-button>
		<div class="userlistMainPart">
			<a-card>
				<a-card title="基本信息">
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>ID</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>姓名</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>手机号</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>注册时间</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>邀请码</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>来源</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>IP地址</p>
							<p>10000</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>最后登录</p>
							<p>10000</p>
						</div>
					</a-card-grid>
				</a-card>
				<a-card title="业务数据"
					:style="{ marginTop: '16px' }"
					:gutter="16">
					<a-row class="rowCardCls">
						<a-col :span="11">
							<a-card title="添加关注">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注公司</p>
										<p @click="showModalOne(1)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注高管</p>
										<p @click="showModalOne(2)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注产品</p>
										<p @click="showModalOne(3)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注资讯</p>
										<p @click="showModalOne(4)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="舆情预警">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>今日推送</p>
										<p>{{detailInfo.currentDayCount}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>总推送</p>
										<p>{{detailInfo.totalCount}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>系统舆情</p>
										<p @click="showModalOne(5)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>人工舆情</p>
										<p @click="showModalOne(6)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="保单管理">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>保单提交</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>预约体检</p>
										<p>10000</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="VIP会员">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>是否开通</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>开通日期</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>开通产品</p>
										<p>1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>到期日期</p>
										<p>10000</p>
									</div>
								</a-card-grid>
							</a-card>
						</a-col>
						<a-col :span="11"
							:offset="1">
							<a-card title="记账本">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>总资产金额</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>总记账笔数</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>人民币资产（元）</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>外币资产（美元）</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>基金记账</p>
										<p @click="showModalTwo(1)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>银行记账</p>
										<p @click="showModalTwo(2)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>信托记账</p>
										<p @click="showModalTwo(3)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>国内保险</p>
										<p @click="showModalTwo(4)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>境外资产</p>
										<p @click="showModalTwo(5)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>不动产投资</p>
										<p @click="showModalTwo(6)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="风险评测">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>风险提交</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>风测结果</p>
										<p>10000</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="顾问帮填">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>帮填次数</p>
										<p>10000</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关联顾问</p>
										<p @click="showModalOne(7)">1
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
						</a-col>
					</a-row>
				</a-card>
			</a-card>
		</div>
		<user-list-modal-one :modalInfo="modalOneInfo"
			@closeModal="handleModalOneClose"
			@hanldeModalPageChange="hanldeModalOnePageChange" />
		<user-list-modal-two :modalInfo="modalTwoInfo"
			@closeModal="handleModalTwoClose"
			@hanldeModalPageChange="hanldeModalTwoPageChange"
			@changeInfoType="handleChangeInfoType"
			@changeInfoMain="handleChangeInfoMain" />
	</div>
</template>

<script>
import userListModalOne from './userListModalOne'
import userListModalTwo from './userListModalTwo'
import { getColumn, getPushInfoCount, getInfoByUserId } from '@/api/userlist'

export default {
  name: 'userListDetail',
  components: {
    userListModalOne,
    userListModalTwo
  },
  data () {
    return {
      userId: 1568698771397,
      type: -1,
      detailInfo: {},
      modalOneParam: {
        startPage: 1,
        pageSize: 5
      },
      modalOneInfo: {
        status: -1,
        data: {},
        visible: false
      },
      modalTwoParam: {
        startPage: 1,
        pageSize: 5
      },
      modalTwoInfo: {
        status: 1,
        data: {},
        visible: false
      }
    }
  },
  created () {
    this.getDetailData()
  },
  methods: {
    // 获取当前页详情
    getDetailData () {
      this.getPushInfoData()
    },
    // 获取舆情预警信息
    async getPushInfoData () {
      try {
        let param = {
          userId: this.userId
        }
        let res = await getPushInfoCount(param)
        this.detailInfo = res.data
      } catch (error) {
        this.$notification.open({
          message: error.msg
        })
      }
    },
    // 获取舆情预警列表
    async getInfoByUserId () {
      try {
        let paramOnly = {
          userId: this.userId,
          type: this.type
        }
        let param = Object.assign(this.modalOneParam, paramOnly)
        let res = await getInfoByUserId(param)
        this.modalOneInfo.data = res.data
      } catch (error) {
        this.$notification.open({
          message: error.msg
        })
      }
    },
    // 改变了二类弹框里radio值
    handleChangeInfoType (i) {
      console.log(i)
    },
    // 改变了查看的行的值
    handleChangeInfoMain (record) {
      console.log(record)
    },
    // 展示模态框
    showModalOne (type) {
      this.modalOneInfo.visible = true
      this.modalOneInfo.status = type
      // 舆情预警弹框
      if (type === 5 || type === 6) {
        switch (type) {
          case 5:
            this.type = 2
            break
          case 6:
            this.type = 1
            break
        }
        this.getInfoByUserId()
      }
    },
    showModalTwo (type) {
      this.modalTwoInfo.visible = true
      this.modalTwoInfo.status = type
    },
    // 跳页
    hanldeModalOnePageChange (page) {
      this.modalOneParam.startPage = page
      if (this.modalOneInfo.status === 5 || this.modalOneInfo.status === 6) {
        this.getInfoByUserId()
      }
    },
    hanldeModalTwoPageChange (page) {
      this.modalTwoParam.startPage = page
    },
    // 关闭模态框
    handleModalOneClose () {
      let initial = {
        status: -1,
        data: {},
        visible: false
      }
      this.modalOneInfo = { ...initial }
      this.modalOneParam.startPage = 1
    },
    handleModalTwoClose () {
      let initial = {
        status: -1,
        data: {},
        visible: false
      }
      this.modalTwoInfo = { ...initial }
      this.modalTwoParam.startPage = 1
    },
    // 返回
    hanldeBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.userlistDetailWrapper {
	.userlistMainPart {
		margin-top: 20px;
		.ant-card-head {
			background: rgba(240, 240, 240, 1);
		}
		.ant-card-head-title {
			font-weight: bold;
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
		.rowCardCls {
			.ant-card {
				margin-top: 20px;
			}
		}
	}
}
</style>
