<template>
	<div class="CheckConsultantWrapper">
		<h1>机构管理 - 顾问审核</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form"
				:label-col="{ span: 2 }"
				:wrapper-col="{ span: 12 }">
				<a-form-item label="上传图片："
					class="imgUploaderWrapper">
					<div style="display:flex;justify-content:flex-start;">
						<div class="avatarWrapper"
							v-if="consultantInfo.headUrl !== ''"
							@click="handlePreviewImg(consultantInfo.headUrl)">
							<img :src="consultantInfo.headUrl"
								alt="头像">
							<div class="action">查看头像</div>
						</div>
						<div class="avatarWrapper"
							v-if="consultantInfo.backgroundUrl !== ''"
							@click="handlePreviewImg(consultantInfo.backgroundUrl)">
							<img :src="consultantInfo.backgroundUrl"
								alt="背景">
							<div class="action">查看背景</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="顾问姓名：">
					<p>{{consultantInfo.adviserName}}</p>
				</a-form-item>
				<a-form-item label="所属公司：">
					<p>{{consultantInfo.belongToCompany}}</p>
				</a-form-item>
				<a-form-item label="当前职位：">
					<p>{{consultantInfo.currentPosition}}</p>
				</a-form-item>
				<a-form-item label="从业年份：">
					<p>{{consultantInfo.yearOfEmployment}}</p>
				</a-form-item>
				<a-form-item label="顾问认证：">
					<p>{{consultantInfo.adviserIdentification === '0' ?'未认证':'已认证'}}</p>
				</a-form-item>
				<a-form-item label="顾问电话："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 9 }">
					<p v-for="(item,index) in consultantInfo.phone"
						:key="index">{{item}}</p>
				</a-form-item>
				<a-form-item label="个人简介：">
					<p style="word-break:break-all;">{{consultantInfo.individualResume}}</p>
				</a-form-item>
				<a-form-item label="个人标签：">
					<p>{{consultantInfo.personalLabel}}</p>
				</a-form-item>
				<a-form-item label="资质证书："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }">
					<ul class="certWrapper clearfix">
						<li v-for="item in consultantInfo.competenceUrlList"
							:key="item.filePath"
							@click="handlePreviewImg(item.winPath)">
							<img :src="item.winPath"
								alt="资质">
							<div class="name">{{item.name}}</div>
							<div class="action">查看大图</div>
						</li>
					</ul>
				</a-form-item>
				<a-form-item label="荣誉证书："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }">
					<ul class="certWrapper clearfix">
						<li v-for="item in consultantInfo.honourUrlList"
							:key="item.filePath"
							@click="handlePreviewImg(item.winPath)">
							<img :src="item.winPath"
								alt="荣誉">
							<div class="name">{{item.name}}</div>
							<div class="action">查看大图</div>
						</li>
					</ul>
				</a-form-item>
				<!-- 工作经历 -->
				<a-form-item label="工作经历："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }"
					class="workExpWrapper">
					<p v-for="item in workExpInfo"
						:key="item.id">
						<span>{{item.startTime}} 至 {{item.upToNow?'至今':item.endTime}}</span>
						<span>{{item.positionName}}</span>
						<span>{{item.companyName}}</span>
					</p>
				</a-form-item>
				<!-- 学校经历 -->
				<a-form-item label="教育经历："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }"
					class="
					workExpWrapper">
					<p>
						<span>{{consultantInfo.startTime}} 至 {{consultantInfo.endTime}}</span>
						<span>{{consultantInfo.schoolName}}</span>
						<span>{{consultantInfo.professionalTitle}}</span>
						<span>{{consultantInfo.highestEducation}}</span>
					</p>
				</a-form-item>
				<a-form-item label="风采展示："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }">
					<ul class="certWrapper clearfix">
						<li v-for="item in consultantInfo.mienUrlList"
							:key="item.filePath"
							@click="handlePreviewImg(item.winPath)">
							<img :src="item.winPath"
								alt="风采">
							<div class="name">{{item.name}}</div>
							<div class="action">查看大图</div>
						</li>
					</ul>
				</a-form-item>
				<a-form-item label="操作："
					:label-col="{ span: 2 }"
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
					:label-col="{ span: 2 }"
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
  showSingleCompanyAdviser,
  showWorkExperiences,
  auditingAdviser,
  showAuditingAdviser
} from '@/api/consultantManagement'
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
      showrejectReason: '',
      consultantId: '',
      userName: '',
      form: this.$form.createForm(this),
      consultantInfo: {},
      workExpInfo: [],
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
    this.consultantId = id
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
    this.showAuditingAdviser()
    this.showWorkExperiences()
  },
  methods: {
    async showAuditingAdviser () {
      try {
        let res = await showAuditingAdviser({ adviserId: this.consultantId })
        if (res.code === 200) {
          this.editRecordList(res.data)
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
        let res = await showSingleCompanyAdviser({ id: this.consultantId })
        if (res.code === 200) {
          this.consultantInfo = res.data
          const {
            headUrl,
            backgroundUrl,
            phone,
            yearOfEmployment
          } = this.consultantInfo
          if (headUrl !== '') {
            this.consultantInfo.headUrl = headUrl.split(';')[0]
          }
          if (backgroundUrl !== '') {
            this.consultantInfo.backgroundUrl = backgroundUrl.split(';')[0]
          }
          if (phone !== '') {
            this.consultantInfo.phone = phone.split(';')
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
    async showWorkExperiences () {
      try {
        let res = await showWorkExperiences({ adviserId: this.consultantId })
        if (res.code === 200) {
          this.workExpInfo = [...res.data]
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    editRecordList (historyList) {
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
        adviserId: this.consultantId,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        auditor: this.userName,
        auditStatus: 2,
        rejectDescribe: ''
      }
      try {
        let res = await auditingAdviser(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/consultantManagement',
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
        adviserId: this.consultantId,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        auditor: this.userName,
        auditStatus: 3,
        rejectDescribe: this.rejectDescribe.trim()
      }
      try {
        let res = await auditingAdviser(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/consultantManagement',
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
    // 返回
    handleBack () {
      const {
        $route: { query }
      } = this
      this.$router.push({
        path: '/institutionsmanage/consultantManagement',
        query
      })
    }
  }
}
</script>

<style lang="less">
.CheckConsultantWrapper {
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
			.avatarWrapper {
				margin-right: 50px;
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

		.certWrapper {
			margin: 0;
			padding: 0;
			li {
				list-style: none;
				margin: 0;
				float: left;
				margin-right: 20px;
				position: relative;
				width: 184px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
