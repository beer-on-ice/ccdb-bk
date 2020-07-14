<template>
	<div class="CheckConsultantWrapper">
		<h1>机构管理 - 特色服务审核</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form"
				:label-col="{ span: 2 }"
				:wrapper-col="{ span: 12 }">
				<a-form-item label="企业名称：">
					<p>{{companyName}}</p>
				</a-form-item>
				<a-form-item label="特色服务：">
					<p>{{serviceInfo.join('、')}}</p>
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
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import {
  showCompanyFeatures,
  auditingCompanyFeature,
  showAuditingCompanyFeature
} from '@/api/sServiceManagement'
import CheckRecord from './../../components/CheckRecord'
import { mapState } from 'vuex'

export default {
  components: {
    CheckRecord
  },
  data () {
    return {
      id: '',
      companyUrl: '',
      userName: '',
      form: this.$form.createForm(this),
      serviceInfo: [],
      showrejectReason: '',
      rejectDescribe: '',
      checkRecord: {
        recordVisible: false,
        recordList: []
      }
    }
  },
  created () {
    const { companyUrl, id, companyName } = this.$route.query
    this.companyUrl = companyUrl
    this.id = id
    this.companyName = companyName
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
    this.showAuditingCompanyFeature()
  },
  methods: {
    async showAuditingCompanyFeature () {
      try {
        let res = await showAuditingCompanyFeature({
          companyFeatureId: this.id
        })
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
        let res = await showCompanyFeatures({ companyUrl: this.companyUrl })
        if (res.code === 200) {
          this.serviceInfo = res.data.characteristicService.split(';')
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
    // 按钮组
    handlePreviewAll () {},
    async handlePass () {
      let params = {
        companyUrl: this.companyUrl,
        companyFeatureId: this.id,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        auditor: this.userName,
        auditStatus: 2,
        rejectDescribe: ''
      }
      try {
        let res = await auditingCompanyFeature(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/sServiceManagement',
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
        companyUrl: this.companyUrl,
        companyFeatureId: this.id,
        auditStatus: 3,
        auditor: this.userName,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        rejectDescribe: this.rejectDescribe.trim()
      }
      try {
        let res = await auditingCompanyFeature(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/sServiceManagement',
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
        path: '/institutionsmanage/sServiceManagement',
        query: {
          type: Number(type)
        }
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
		.btnWrapper {
			.ant-btn {
				margin-right: 10px;
			}
		}
	}
}
</style>
