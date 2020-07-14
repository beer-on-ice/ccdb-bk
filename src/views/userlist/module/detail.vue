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
							<p>{{overViewInfo.baseInfo.id}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>姓名</p>
							<p>{{overViewInfo.baseInfo.name}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>手机号</p>
							<p>{{overViewInfo.baseInfo.phoneNumber}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>注册时间</p>
							<p>{{overViewInfo.baseInfo.registTime}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>邀请码</p>
							<p>{{overViewInfo.baseInfo.inviteCode}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>来源</p>
							<p>{{overViewInfo.baseInfo.sourceFrom}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>IP地址</p>
							<p>{{overViewInfo.baseInfo.ipAddress}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>最后登录</p>
							<p>{{overViewInfo.baseInfo.lastLoginTime}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>性别</p>
							<p>{{overViewInfo.baseInfo.sexType}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>年龄</p>
							<p>{{overViewInfo.baseInfo.age}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>婚姻</p>
							<p>{{overViewInfo.baseInfo.marriage}}</p>
						</div>
					</a-card-grid>
					<a-card-grid style="width:25%;textAlign:'center'">
						<div>
							<p>职业</p>
							<p>{{overViewInfo.baseInfo.job}}</p>
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
										<p @click="showModalOne(1)">
											{{overViewInfo.followOverview.followAdmin}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注高管</p>
										<p @click="showModalOne(2)">
											{{overViewInfo.followOverview.followManager}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注产品</p>
										<p @click="showModalOne(3)">
											{{overViewInfo.followOverview.followProduct}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关注资讯</p>
										<p @click="showModalOne(4)">
											{{overViewInfo.followOverview.followNews}}
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
										<p>系统舆情（自身）</p>
										<p @click="showModalOne(5)">
											{{detailInfo.self}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>人工舆情（周边）</p>
										<p @click="showModalOne(6)">
											{{detailInfo.sorround}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="保单管理">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>保单提交</p>
										<p>{{overViewInfo.policyOverview.policyCommitTimes}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>预约体检</p>
										<p>{{overViewInfo.policyOverview.assessmentResult}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>保单咨询</p>
										<p>{{overViewInfo.policyOverview.policyAsk}}</p>
									</div>
								</a-card-grid>
							</a-card>
							<!-- <a-card title="VIP会员">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>是否开通</p>
										<p>{{overViewInfo.baseInfo.id}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>开通日期</p>
										<p>{{overViewInfo.baseInfo.id}}</p>
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
										<p>{{overViewInfo.baseInfo.id}}</p>
									</div>
								</a-card-grid>
							</a-card> -->
						</a-col>
						<a-col :span="11"
							:offset="1">
							<a-card title="记账本">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>总资产金额</p>
										<p>{{overViewInfo.bookOverview.totalAssets}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>总记账笔数</p>
										<p>{{overViewInfo.bookOverview.bookAmount}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>人民币资产（元）</p>
										<p>{{overViewInfo.bookOverview.RMBAsserts}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>外币资产（美元）</p>
										<p>{{overViewInfo.bookOverview.USDAsserts}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>基金记账</p>
										<p @click="showModalTwo(1)">
											{{overViewInfo.bookOverview.fundBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>银行记账</p>
										<p @click="showModalTwo(2)">
											{{overViewInfo.bookOverview.bankBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>信托记账</p>
										<p @click="showModalTwo(3)">
											{{overViewInfo.bookOverview.affianceBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>国内保险</p>
										<p @click="showModalTwo(4)">
											{{overViewInfo.bookOverview.insuranceBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>境外资产</p>
										<p @click="showModalTwo(5)">
											{{overViewInfo.bookOverview.overseasBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>不动产投资</p>
										<p @click="showModalTwo(6)">
											{{overViewInfo.bookOverview.immovablesBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>金交所投资</p>
										<p @click="showModalTwo(7)">
											{{overViewInfo.bookOverview.goldExchangeBook}}
											<span>[查看]</span>
										</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="风险评测">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>风险提交</p>
										<p>{{Number(overViewInfo.riskAssessmentOverview.assessmentTimes)?overViewInfo.riskAssessmentOverview.assessmentTimes:''}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>风测结果</p>
										<p>{{overViewInfo.riskAssessmentOverview.assessmentResult}}</p>
									</div>
								</a-card-grid>
							</a-card>
							<a-card title="顾问帮填">
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>帮填次数</p>
										<p>{{overViewInfo.adviserFilledOverview.adviserFilledTimes}}</p>
									</div>
								</a-card-grid>
								<a-card-grid style="width:50%;textAlign:'center'">
									<div>
										<p>关联顾问</p>
										<p @click="showModalOne(7)">
											{{overViewInfo.adviserFilledOverview.relativeAdviser}}
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
			@closeModal="handleModalTwoClose" />
	</div>
</template>

<script>
import userListModalOne from './userListModalOne'
import userListModalTwo from './userListModalTwo'
import {
  getOverview,
  getFollowdetail,
  getAdviserdetail,
  getBookdetail,
  getPushInfoCount,
  getInfoByUserId
} from '@/api/userlist'

export default {
  name: 'userListDetail',
  components: {
    userListModalOne,
    userListModalTwo
  },
  data () {
    return {
      userId: '',
      type: -1,
      overViewInfo: {},
      detailInfo: {}, // 舆情信息
      modalOneParam: {
        startPage: 1,
        pageSize: 5
      },
      modalOneInfo: {
        status: -1,
        data: {},
        visible: false
      },
      modalTwoInfo: {
        status: 1,
        data: {},
        visible: false
      }
    }
  },
  created () {
    this.userId = this.$route.query.id
    this.getDetailData()
  },
  methods: {
    // 获取当前页详情
    getDetailData () {
      this.getOverviewData()
      this.getPushInfoData()
    },
    // 获取概览信息
    async getOverviewData () {
      try {
        let param = {
          userId: this.userId
        }
        let res = await getOverview(param)
        if (res.code === 200) {
          this.overViewInfo = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
    },
    // 获取舆情预警信息
    async getPushInfoData () {
      try {
        let param = {
          userId: this.userId
        }
        let res = await getPushInfoCount(param)
        if (res.code === 200) {
          this.detailInfo = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
    },
    // 获取添加关注信息-列表
    async getFollowdetail () {
      try {
        let paramOnly = {
          userId: this.userId,
          followType: this.type
        }
        let param = Object.assign(this.modalOneParam, paramOnly)
        let res = await getFollowdetail(param)
        if (res.code === 200) {
          this.modalOneInfo.data = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
    },
    // 获取顾问帮填信息-列表
    async getAdviserdetail () {
      try {
        let paramOnly = {
          userId: this.userId
        }
        let param = Object.assign(this.modalOneParam, paramOnly)
        let res = await getAdviserdetail(param)
        if (res.code === 200) {
          this.modalOneInfo.data = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
    },
    // 获取舆情预警-列表
    async getInfoByUserId () {
      try {
        let paramOnly = {
          userId: this.userId,
          type: this.type
        }
        let param = Object.assign(this.modalOneParam, paramOnly)
        let res = await getInfoByUserId(param)
        if (res.code === 200) {
          this.modalOneInfo.data = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
    },
    // 获取记账信息
    async getBookdetail () {
      try {
        let param = {
          userId: this.userId,
          bookType: this.type
        }
        let res = await getBookdetail(param)
        if (res.code === 200) {
          this.modalTwoInfo.data = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message
        })
      }
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
      } else if (type === 1 || type === 2 || type === 3 || type === 4) {
        switch (type) {
          case 1:
            this.type = 0
            break
          case 2:
            this.type = 1
            break
          case 3:
            this.type = 2
            break
          case 4:
            this.type = 3
            break
        }
        this.getFollowdetail()
      } else if (type === 7) {
        this.getAdviserdetail()
      }
    },
    showModalTwo (type) {
      this.modalTwoInfo.visible = true
      this.modalTwoInfo.status = type
      switch (type) {
        case 1:
          this.type = 0
          break
        case 2:
          this.type = 1
          break
        case 3:
          this.type = 2
          break
        case 4:
          this.type = 3
          break
        case 5:
          this.type = 4
          break
        case 6:
          this.type = 5
          break
        case 7:
          this.type = 6
          break
      }
      this.getBookdetail()
    },
    // 跳页
    hanldeModalOnePageChange (page) {
      this.modalOneParam.startPage = page
      let status = this.modalOneInfo.status
      if (status === 5 || status === 6) {
        this.getInfoByUserId()
      } else if (status === 1 || status === 2 || status === 3 || status === 4) {
        this.getFollowdetail()
      } else if (status === 7) {
        this.getAdviserdetail()
      }
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
