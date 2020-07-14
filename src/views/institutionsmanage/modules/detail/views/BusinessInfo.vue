<template>
	<div class="businessInfoWrapper">
		<a-card class="maskP"
			title="工商信息">
			<a slot="extra"
				href="javascript:;">数据更新时间： {{businessInfo.lastModifiedTime}}</a>
			<div class="tip"
				v-if="businessInfo.auditStatus === 1">当前页面数据正在等待审核更新，您暂时无法提交修改申请，请等待审核完毕后再进行操作。</div>
			<a-form layout="horizontal"
				:form="form">
				<div class="both">
					<com-business-info class="mt-20"
						ref="comBusinessInfo"
						:businessInfo="businessInfo"
						:form="form"></com-business-info>
					<com-share-holder class="mt-20"
						ref="comShareHolder"
						:businessInfo="businessInfo"
						:form="form"></com-share-holder>
					<com-main-member class="mt-20"
						ref="comMainMember"
						:businessInfo="businessInfo"
						:form="form"></com-main-member>
					<com-branches class="mt-20"
						ref="comBranches"
						:businessInfo="businessInfo"
						:form="form"></com-branches>
				</div>
				<bottom-opt :disabled="businessInfo.auditStatus === 1"
					@submit="submit"
					@back="back"></bottom-opt>
			</a-form>
			<div v-if="businessInfo.auditStatus==1"
				class="maskC"></div>
		</a-card>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import {
  ComBusinessInfo,
  ComMainMember,
  ComShareHolder,
  ComBranches
} from './../components/BusinessInfo/'
import {
  showIACDetails,
  editIACDetails
} from '@/api/institution/institutionArchives'
import BottomOpt from './../components/BottomOpt'

export default {
  name: 'BusinessInfo',
  components: {
    ComBusinessInfo,
    ComMainMember,
    ComShareHolder,
    ComBranches,
    BottomOpt
  },
  data () {
    return {
      form: this.$form.createForm(this),
      businessInfo: {}
    }
  },
  mounted () {
    this.showIACDetails()
  },
  methods: {
    async showIACDetails () {
      try {
        const res = await showIACDetails({
          id: this.$route.query.id
        })
        if (res.code === 200) {
          this.businessInfo = res.data
          this.initialData(res.data)
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async editIACDetails (params) {
      try {
        let res = await editIACDetails(params)
        if (res.code === 200) {
          this.back()
          this.$notification.success({
            message: res.msg || '提交成功！'
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
    handleBusinessTerm (businessTerm) {
      let businessTermArr = businessTerm.split('至')
      if (businessTermArr[0] !== '') {
        if (businessTermArr[1] === '无固定期限') {
          businessTermArr[1] = ''
          this.$refs.comBusinessInfo.isNotime = true
          return [moment(businessTermArr[0]), '']
        } else {
          return [moment(businessTermArr[0]), moment(businessTermArr[1])]
        }
      } else {
        return ['', '']
      }
    },
    initialData (businessInfo) {
      const {
        $nextTick,
        form: { setFieldsValue },
        handleBusinessTerm
      } = this
      const {
        companyName,
        englishName,
        legalPerson,
        generalManager,
        registeredCapital,
        paidInCapital,
        establishmentDate,
        operationStatus,
        creditCode,
        registrationNumber,
        identificationNumber,
        organizationalCode,
        companyType,
        industry,
        registrationAuthority,
        personnelScale,
        insuredPersons,
        approvalDate,
        address,
        businessTerm,
        businessScope,
        actualControllingPerson,
        modificationRecord,
        dismissTheField,
        auditStatus
      } = businessInfo
      const businessTermArr = handleBusinessTerm(businessTerm)
      businessInfo.notPassList =
				dismissTheField && dismissTheField !== ''
				  ? dismissTheField.split(';')
				  : []
      $nextTick(() => {
        setFieldsValue({
          companyName,
          englishName,
          legalPerson,
          generalManager,
          registeredCapital,
          paidInCapital,
          establishmentDate,
          operationStatus,
          creditCode,
          registrationNumber,
          identificationNumber,
          organizationalCode,
          companyType,
          industry,
          registrationAuthority,
          personnelScale,
          insuredPersons,
          approvalDate,
          address,
          operatingPeriodS: businessTermArr[0],
          operatingPeriodE: businessTermArr[1],
          businessScope,
          actualControllingPerson,
          modificationRecord: auditStatus === 3 ? modificationRecord : ''
        })
      })
    },
    getBusinessTerm (operatingPeriodS, operatingPeriodE, isNotime) {
      if (!operatingPeriodS) return ``
      let s = operatingPeriodS
        ? moment(operatingPeriodS).format('YYYY-MM-DD')
        : ''
      let e = operatingPeriodE
        ? moment(operatingPeriodE).format('YYYY-MM-DD')
        : ''
      if (isNotime || !e) {
        return `${s}至无固定期限`
      } else {
        return `${s}至${e}`
      }
    },
    handleArrTimes (arr) {
      return arr.map(item => {
        item.establishmentDate = item.establishmentDate
          ? moment(item.establishmentDate).format('YYYY-MM-DD')
          : ''
        return { ...item, establishmentDate: item.establishmentDate }
      })
    },
    submit () {
      const {
        form: { getFieldValue, getFieldsValue },
        $route: {
          query: { id, companyUrl }
        },
        $refs: {
          comBusinessInfo: { isNotime },
          comShareHolder: { shareHolderList },
          comMainMember: { mainMemberList },
          comBranches: { branchesList }
        },
        editIACDetails,
        getBusinessTerm,
        handleArrTimes
      } = this
      const {
        companyName,
        englishName,
        legalPerson,
        generalManager,
        registeredCapital,
        paidInCapital,
        establishmentDate,
        operationStatus,
        creditCode,
        registrationNumber,
        identificationNumber,
        organizationalCode,
        companyType,
        industry,
        approvalDate,
        registrationAuthority,
        personnelScale,
        insuredPersons,
        address,
        operatingPeriodS,
        operatingPeriodE,
        businessScope,
        actualControllingPerson,
        modificationRecord
      } = getFieldsValue([
        'companyName',
        'englishName',
        'legalPerson',
        'generalManager',
        'registeredCapital',
        'paidInCapital',
        'establishmentDate',
        'operationStatus',
        'creditCode',
        'registrationNumber',
        'identificationNumber',
        'organizationalCode',
        'companyType',
        'industry',
        'approvalDate',
        'registrationAuthority',
        'personnelScale',
        'insuredPersons',
        'address',
        'operatingPeriodS',
        'operatingPeriodE',
        'businessScope',
        'actualControllingPerson',
        'modificationRecord'
      ])
      const params = {
        id,
        companyUrl,
        companyName,
        englishName,
        legalPerson,
        generalManager,
        registeredCapital,
        paidInCapital,
        establishmentDate: establishmentDate
          ? moment(establishmentDate).format('YYYY-MM-DD')
          : '',
        operationStatus,
        creditCode,
        registrationNumber,
        identificationNumber,
        organizationalCode,
        modificationRecord,
        companyType,
        industry,
        approvalDate: approvalDate
          ? moment(approvalDate).format('YYYY-MM-DD')
          : '',
        registrationAuthority,
        personnelScale,
        insuredPersons,
        address,
        businessTerm: getBusinessTerm(
          operatingPeriodS,
          operatingPeriodE,
          isNotime
        ),
        businessScope,
        actualControllingPerson,
        branchs: handleArrTimes(branchesList),
        holders: shareHolderList,
        staffs: mainMemberList,
        lastModifier: JSON.parse(Vue.ls.get('USERINFO')).username,
        lastModifiedTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      editIACDetails(params)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.businessInfoWrapper {
	margin-top: 50px;
	.notPass {
		color: white;
		background: red !important;
	}
	.topIndex {
		position: relative;
		z-index: 9999;
	}
	.ant-form-item {
		margin-bottom: 0;
	}
	.maskP {
		position: relative;
		.maskC {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
		}
	}
	.tip {
		line-height: 35px;
		height: 35px;
		color: rgba(212, 48, 48, 1);
		background-color: rgba(212, 48, 48, 0.07142857142857138);
		border: rgba(212, 48, 48, 1) solid 1px;
		font-size: 14px;
		text-align: center;
	}
	.addBtn {
		width: 100%;
		display: block;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		text-align: center;
		color: #ccc;
	}
	.ant-card-grid {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		> div {
			margin-left: 10px;
		}

		&.special-h-2 {
			height: 140px;
		}
		&.special-w-5 {
			width: 50%;
		}
		&.special-w-1 {
			width: 100%;
		}
	}
	.both {
		.ant-card-grid {
			padding-left: 1px;
			padding-top: 1px;
			padding-bottom: 0px;
			p {
				margin: 0;
				text-align: center;
				&:nth-of-type(odd) {
					width: 186px;
					height: 69px;
					line-height: 69px;
					background: rgb(236, 243, 253);
				}
			}
		}
	}
}
</style>
