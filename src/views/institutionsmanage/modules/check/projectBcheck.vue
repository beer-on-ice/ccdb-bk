<template>
	<div class="checkProjectBWrapper">
		<h1>机构管理 - 项目品牌审核</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form"
				:label-col="{ span: 2 }"
				:wrapper-col="{ span: 12 }">
				<a-form-item label="品牌LOGO"
					class="imgUploaderWrapper">
					<div style="display:flex;justify-content:flex-start;">
						<div class="avatarWrapper"
							v-if="projectBInfo.logoUrl !== ''"
							@click="handlePreviewImg(projectBInfo.logoUrl)">
							<img :src="projectBInfo.logoUrl"
								alt="LOGO">
							<div class="action">查看LOGO</div>
						</div>
						<div class="avatarWrapper"
							v-if="projectBInfo.workAddressUrl !== ''"
							@click="handlePreviewImg(projectBInfo.workAddressUrl)">
							<img :src="projectBInfo.workAddressUrl"
								alt="办公地点">
							<div class="action">查看背景</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="项目品牌：">
					<p>{{projectBInfo.brandName}}</p>
				</a-form-item>
				<a-form-item label="所属公司：">
					<p>{{projectBInfo.belongCompany}}</p>
				</a-form-item>
				<a-form-item label="联系地址：">
					<p>{{projectBInfo.address}}</p>
				</a-form-item>
				<a-form-item label="企业网址：">
					<p>{{projectBInfo.net}}</p>
				</a-form-item>
				<a-form-item label="联系电话：">
					<p>{{projectBInfo.contact.split(';').join('、')}}</p>
				</a-form-item>
				<a-form-item label="品牌介绍：">
					<p>{{projectBInfo.description}}</p>
				</a-form-item>
				<a-form-item label="关联公司：">
					<p v-for="item in projectBInfo.companyList"
						:key="item.companyUrl">{{item.companyName}}</p>
				</a-form-item>
				<a-form-item label="公司环境：">
					<div v-if="projectBInfo.environment !== ''">
						<div class="avatarWrapper"
							@click="handlePreviewImg(item)"
							v-for="item in projectBInfo.environmentList"
							:key="item">
							<img :src="item"
								alt="环境">
							<div class="action">查看大图</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="大事记："
					:wrapper-col="{ span: 24 }">
					<huge-event-list :recordList="projectBInfo.eventList.descList"></huge-event-list>
				</a-form-item>
				<a-form-item label="操作："
					:wrapper-col="{ span: 22 }">
					<div class="btnWrapper">
						<!-- <a-button @click="handlePreviewAll">预览</a-button> -->
						<a-button @click="handleBack">返回</a-button>
						<a-popconfirm v-if="Number($route.query.type) === 1"
							title="确认此操作?"
							@confirm="handlePass"
							okText="是"
							cancelText="否">
							<a-button>审核通过</a-button>
						</a-popconfirm>
						<a-popconfirm v-if="Number($route.query.type) === 1"
							title="确认此操作?"
							@confirm="handleReject"
							okText="是"
							cancelText="否">
							<a-button>审核驳回</a-button>
						</a-popconfirm>
						<a-textarea v-if="Number($route.query.type) === 1"
							placeholder="* 请填写驳回理由或修改意见"
							maxLength="200"
							:autosize="{ minRows: 2, maxRows: 6 }"
							v-model="rejectDescribe" />
					</div>
				</a-form-item>
				<a-form-item label="审核记录："
					:wrapper-col="{ span: 22 }"
					v-if="checkRecord.recordVisible">
					<check-record :recordList="checkRecord.recordList"></check-record>
				</a-form-item>
			</a-form>
		</a-card>
		<preview-img-modal :modalInfo="modalInfo"
			@handlePreviewCancel="obj => modalInfo = obj"></preview-img-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import moment from 'moment'
import { detail, judge } from '@/api/institution/projectBcheck'
import { CheckRecord, HugeEventList } from './../../components/index'
import { PreviewImgModal } from '@/components/index'

export default {
  components: {
    CheckRecord,
    PreviewImgModal,
    HugeEventList
  },
  data () {
    return {
      id: '',
      type: '',
      userName: '',
      showrejectReason: '',
      form: this.$form.createForm(this),
      projectBInfo: {},
      rejectDescribe: '',
      checkRecord: {
        recordVisible: false,
        recordList: []
      },
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      }
    }
  },
  created () {
    const { id, type } = this.$route.query
    this.id = id
    this.type = type
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
  },
  methods: {
    async getCheckInfo () {
      try {
        let res = await detail({ brandId: this.id, examineState: this.type })
        if (res.code === 200) {
          this.projectBInfo = res.data
          const {
            rejectDescribe,
            logoUrl,
            environment,
            workAddressUrl,
            companyList,
            historyList
          } = this.projectBInfo
          if (logoUrl !== '') {
            this.projectBInfo.logoUrl = logoUrl.split(';')[0]
          }
          if (workAddressUrl !== '') {
            this.projectBInfo.workAddressUrl = workAddressUrl.split(';')[0]
          }
          if (environment !== '') {
            let arr = []
            environment.split(',').map(item => {
              if (item !== '') {
                arr.push(item.split(';')[0])
              }
            })
            this.projectBInfo.environmentList = arr
          }
          this.editRecordList(this.projectBInfo)
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    editRecordList ({ historyList }) {
      this.checkRecord.recordList = historyList || []
      if (historyList && historyList.length) {
        this.checkRecord.recordVisible = !!this.checkRecord.recordList.length
        this.showrejectReason =
					historyList[historyList.length - 1].rejectDescribe || ''
      }
    },
    // 预览照片 - 打开
    handlePreviewImg (file) {
      this.modalInfo = {
        title: file.name || '查看大图',
        src: file,
        previewVisible: true
      }
    },
    // 按钮组
    handlePreviewAll () {},
    async handlePass () {
      let params = {
        brandId: this.id,
        examineState: 2,
        auditor: this.userName,
        rejectDescribe: ''
      }
      try {
        let res = await judge(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/projectBManagement',
            query: {
              type: 2
            }
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async handleReject () {
      if (this.rejectDescribe.trim().length < 5) {
        this.$notification.error({
          message: '请填写5-200字驳回理由！'
        })
        return
      }
      let params = {
        brandId: this.id,
        examineState: 3,
        auditor: this.userName,
        rejectDescribe: this.rejectDescribe.trim()
      }
      try {
        let res = await judge(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/projectBManagement',
            query: {
              type: 3
            }
          })
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleBack () {
      const {
        $route: {
          query: { type }
        }
      } = this
      this.$router.push({
        path: '/institutionsmanage/projectBManagement',
        query: {
          type: Number(type)
        }
      })
    }
  }
}
</script>

<style lang="less">
.checkProjectBWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mainWrapper {
		h3 {
			color: red;
			padding: 10px;
			border: 1px solid red;
		}
		.imgUploaderWrapper {
			.ant-form-item-label {
				margin-top: 35px;
			}
		}
		.avatarWrapper {
			margin-right: 50px;
			position: relative;
			display: inline-block;
			img {
				width: 104px;
				height: 104px;
			}
			.action {
				position: absolute;
				bottom: 0;
				right: 0;
				color: #fff;
				background: rgba(0, 0, 0, 0.7);
				font-size: 12px;
				padding: 2px 3px;
				line-height: 12px;
			}
		}

		.certWrapper {
			margin: 0;
			padding: 0;
			li {
				list-style: none;
				margin: 0;
				float: left;
				margin-right: 20px;
				position: relative;
				img {
					width: 184px;
					height: 86px;
				}
				.name {
					margin-top: 10px;
					line-height: 16px;
					height: 30px;
					line-height: 30px;
					color: #000;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.action {
					position: absolute;
					bottom: 40px;
					right: 0;
					color: #fff;
					background: rgba(0, 0, 0, 0.7);
					font-size: 12px;
					padding: 2px 3px;
					line-height: 12px;
				}
			}
		}

		.workExpWrapper {
			p {
				span {
					margin-right: 20px;
				}
			}
		}

		.btnWrapper {
			.ant-btn {
				margin-right: 10px;
			}
		}
	}
}
</style>
