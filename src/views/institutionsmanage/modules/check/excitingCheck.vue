<template>
	<div class="checkExcitingActivityWrapper">
		<h1>机构管理 - 精彩活动审核</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form"
				:label-col="{ span: 2 }"
				:wrapper-col="{ span: 12 }">
				<a-form-item label="背景图片："
					class="imgUploaderWrapper">
					<div style="display:flex;justify-content:flex-start;">
						<div class="avatarWrapper"
							v-if="activityInfo.titlePic !== ''"
							@click="handlePreviewImg(activityInfo.titlePic)">
							<img :src="activityInfo.titlePic"
								alt="LOGO">
							<div class="action">查看大图</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="活动名称：">
					<p>{{activityInfo.activityName}}</p>
				</a-form-item>
				<a-form-item label="活动时间：">
					<p v-if="activityInfo.activityTime !== activityInfo.activityClosingTime">{{activityInfo.activityTime}} 至 {{activityInfo.activityClosingTime}}</p>
					<p v-else>{{activityInfo.activityTime}}</p>
				</a-form-item>
				<a-form-item label="活动地区：">
					<p>{{activityInfo.activityArea}}</p>
				</a-form-item>
				<a-form-item label="活动地址：">
					<p>{{activityInfo.activityAddress}}</p>
				</a-form-item>
				<a-form-item label="参与人数：">
					<p>{{activityInfo.numberOfParticipants}}</p>
				</a-form-item>
				<a-form-item label="截止日期：">
					<p>{{activityInfo.closingDate}}</p>
				</a-form-item>
				<a-form-item label="活动介绍：">
					<div class="introduceWrapper">
						<div v-html="activityInfo.activityIntroduce"></div>
					</div>
				</a-form-item>
				<a-form-item label="官方声明：">
					<p>{{activityInfo.officialStatement}}</p>
				</a-form-item>
				<a-form-item label="操作："
					:wrapper-col="{ span: 22 }">
					<div class="btnWrapper">
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
						<a-textarea v-if="Number($route.query.type)===1"
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
import moment from 'moment'
import {
  showSingleActivityInformation,
  auditingActivityInformation,
  showAuditingActivityInformation
} from '@/api/institution/excitingActivities'
import CheckRecord from './../../components/CheckRecord'
import { mapState } from 'vuex'
import { PreviewImgModal } from '@/components/index'

export default {
  components: {
    CheckRecord,
    PreviewImgModal
  },
  data () {
    return {
      id: '',
      userName: '',
      form: this.$form.createForm(this),
      activityInfo: {},
      showrejectReason: '',
      rejectDescribe: '',
      checkRecord: {
        recordVisible: false,
        recordList: []
      },
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      },
      uploadInfo: {
        showOffList: []
      }
    }
  },
  created () {
    const { id } = this.$route.query
    this.id = id
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
    this.showAuditingActivityInformation()
  },
  methods: {
    async showAuditingActivityInformation () {
      try {
        let res = await showAuditingActivityInformation({
          activityInformationId: this.id
        })
        if (res.code === 200) {
          this.checkRecord.recordList = res.data
          this.checkRecord.recordVisible = !!this.checkRecord.recordList.length
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async getCheckInfo () {
      try {
        let res = await showSingleActivityInformation({ id: this.id })
        if (res.code === 200) {
          this.activityInfo = res.data
          this.showrejectReason = res.data.rejectDescribe
          const { titlePic } = this.activityInfo
          if (titlePic !== '') {
            this.activityInfo.titlePic = titlePic.split(';')[0]
          }
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
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
    async handlePass () {
      let params = {
        activityInformationId: this.id,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        auditor: this.userName,
        auditStatus: 2,
        rejectDescribe: ''
      }
      try {
        let res = await auditingActivityInformation(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/excitingManagement',
            query: {
              type: 1
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
        activityInformationId: this.id,
        auditStatus: 3,
        auditor: this.userName,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        rejectDescribe: this.rejectDescribe.trim()
      }
      try {
        let res = await auditingActivityInformation(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/excitingManagement',
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
        path: '/institutionsmanage/excitingManagement',
        query: {
          type: Number(type)
        }
      })
    }
  }
}
</script>

<style lang="less">
.checkExcitingActivityWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mainWrapper {
		.introduce {
			padding: 10px;
			border: 1px solid #ccc;
		}
		h3 {
			color: red;
			padding: 10px;
			border: 1px solid red;
		}
		.imgUploaderWrapper {
			.ant-form-item-label {
				margin-top: 35px;
			}
			.avatarWrapper {
				margin-right: 20px;
				position: relative;
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
		}
		.introduceWrapper {
			width: 100%;
			height: 500px;
			padding: 10px;
			border: 1px solid #000;
			overflow-y: scroll;
			word-break: break-all;
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
