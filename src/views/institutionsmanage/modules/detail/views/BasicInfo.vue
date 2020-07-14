<template>
	<div class="insitubasicInfoWrapper mt-20">
		<a-card class="maskP"
			title="基本信息">
			<a slot="extra"
				href="javascript:;">数据更新时间： {{basicInfo.lastModifiedTime}}</a>
			<div class="tip"
				v-if="basicInfo.auditStatus === 1">当前页面数据正在等待审核更新，您暂时无法提交修改申请，请等待审核完毕后再进行操作。</div>
			<a-form layout="horizontal"
				:form="form">
				<com-basic-info class="mt-20"
					ref="comBasicInfo"
					:basicInfo="basicInfo"
					:form="form">
				</com-basic-info>
				<com-platform-data class="mt-20"
					:basicInfo="basicInfo"
					:form="form">
				</com-platform-data>
				<com-rating class="mt-20"
					ref="comRating"
					:basicInfo="basicInfo"
					:form="form">
				</com-rating>
				<com-seo class="mt-20"
					:basicInfo="basicInfo"
					:form="form">
				</com-seo>
				<com-introduce class="mt-20"
					ref="comIntroduce"
					:basicInfo="basicInfo"
					:form="form">
				</com-introduce>
				<bottom-opt :disabled="basicInfo.auditStatus === 1"
					@submit="submit"
					@back="back"></bottom-opt>
			</a-form>
			<div v-if="basicInfo.auditStatus==1"
				class="maskC"></div>
		</a-card>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import { axios } from '@/utils/request'
import {
  ComBasicInfo,
  ComPlatformData,
  ComRating,
  ComSeo,
  ComIntroduce
} from './../components/BasicInfo/'
import BottomOpt from './../components/BottomOpt'
import {
  showBasicInformation,
  basicInformationSubmissionRecord,
  uploadUrl
} from '@/api/institution/institutionArchives'

export default {
  name: 'insitubasicInfo',
  components: {
    ComBasicInfo,
    ComPlatformData,
    ComRating,
    ComSeo,
    ComIntroduce,
    BottomOpt
  },
  data () {
    return {
      form: this.$form.createForm(this),
      basicInfo: {}
    }
  },
  mounted () {
    this.showBasicInformation()
  },
  methods: {
    initialData (basicInfo) {
      const {
        $nextTick,
        form: { setFieldsValue }
      } = this
      const {
        organizationName,
        establishmentDate,
        tel,
        goPublic,
        stockCode,
        website,
        institutionStatus,
        includedInTheListShowhidden,
        institutionStatusShowhidden,
        problemTime,
        assetManagementScale,
        goodAtTo,
        actualController,
        actualControllerShowhidden,
        characterOfStructure,
        seoTitle,
        seoTag,
        seoDescription,
        comprehensiveScoreCorrection,
        vietinbanhScoreCorrection,
        recordScoreCorrection,
        performanceScoreCorrection,
        situationScoreCorrection,
        creditScoreCorrection,
        productScoreCorrection,
        hierarchyScoreCorrection,
        modificationRecord,
        introductionToDescribe,
        mechanismPortraitLabel,
        includedInTheList,
        dismissTheField,
        auditStatus
      } = basicInfo
      setFieldsValue({
        organizationName,
        establishmentDate: establishmentDate ? moment(establishmentDate) : '',
        characterOfStructure,
        tel,
        goPublic: +goPublic,
        stockCode,
        website,
        institutionStatus,
        includedInTheListShowhidden: +includedInTheListShowhidden,
        institutionStatusShowhidden: +institutionStatusShowhidden,
        problemTime: problemTime ? moment(problemTime) : '',
        assetManagementScale,
        goodAtTo,
        actualController,
        actualControllerShowhidden: +actualControllerShowhidden,
        seoTitle,
        seoTag,
        seoDescription,
        introductionToDescribe,
        comprehensiveScoreCorrection,
        vietinbanhScoreCorrection,
        recordScoreCorrection,
        performanceScoreCorrection,
        situationScoreCorrection,
        creditScoreCorrection,
        productScoreCorrection,
        hierarchyScoreCorrection,
        modificationRecord: auditStatus === 3 ? modificationRecord : ''
      })
      basicInfo.notPassList =
				dismissTheField && dismissTheField !== ''
				  ? dismissTheField.split(';')
				  : []
      $nextTick(() => {
        this.$refs.comIntroduce.tagsList = mechanismPortraitLabel
          ? JSON.parse(mechanismPortraitLabel)
          : ''
        this.$refs.comRating.tagList = includedInTheList
          ? JSON.parse(includedInTheList)
          : ''
      })

      return basicInfo
    },
    async showBasicInformation () {
      try {
        const res = await showBasicInformation({
          id: this.$route.query.id
        })
        if (res.code === 200) {
          let basicInfo = this.initialData(res.data)
          this.basicInfo = { ...basicInfo }
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async basicInformationSubmissionRecord (params) {
      try {
        let res = await basicInformationSubmissionRecord(params)
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
    async saveLogo (uploadInfo) {
      const formData = new FormData()
      uploadInfo.fileList.forEach(file => {
        formData.append('a', file)
      })
      try {
        const res = await axios({
          url: `${uploadUrl}?id=${this.basicInfo.id}`,
          method: 'post',
          processData: false,
          data: formData
        })
        const { code, data, msg } = res
        if (code === 200) {
          return res.data.winPath
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '提交失败，请重试!'
        })
      }
    },
    async submit () {
      const {
        form: { getFieldValue, getFieldsValue },
        $route: {
          query: { id }
        },
        $refs: {
          comBasicInfo: { uploadInfo, selectedCity, institutionalTypeList },
          comRating: {
            tagList // 入选榜单
          },
          comIntroduce: {
            tagsList // 机构画像标签
          }
        },
        basicInfo: {
          logoUrl,
          companyName,
          comprehensiveScore,
          vietinbanhScore,
          recordScore,
          performanceScore,
          situationScore,
          creditScore,
          productScore,
          hierarchyScore,
          systemScore
        },
        saveLogo,
        basicInformationSubmissionRecord
      } = this
      const {
        organizationName,
        establishmentDate,
        characterOfStructure,
        goPublic,
        stockCode,
        tel,
        website,
        institutionStatus,
        institutionStatusShowhidden,
        includedInTheListShowhidden,
        problemTime,
        assetManagementScale,
        goodAtTo,
        actualController,
        actualControllerShowhidden,
        comprehensiveScoreCorrection,
        vietinbanhScoreCorrection,
        recordScoreCorrection,
        performanceScoreCorrection,
        situationScoreCorrection,
        creditScoreCorrection,
        productScoreCorrection,
        hierarchyScoreCorrection,
        seoTitle,
        seoTag,
        seoDescription,
        introductionToDescribe,
        modificationRecord
      } = getFieldsValue([
        'organizationName',
        'establishmentDate',
        'characterOfStructure',
        'goPublic',
        'stockCode',
        'tel',
        'website',
        'institutionStatus',
        'institutionStatusShowhidden',
        'includedInTheListShowhidden',
        'problemTime',
        'assetManagementScale',
        'goodAtTo',
        'actualController',
        'actualControllerShowhidden',
        'comprehensiveScoreCorrection',
        'vietinbanhScoreCorrection',
        'recordScoreCorrection',
        'performanceScoreCorrection',
        'situationScoreCorrection',
        'creditScoreCorrection',
        'productScoreCorrection',
        'hierarchyScoreCorrection',
        'seoTitle',
        'seoTag',
        'seoDescription',
        'introductionToDescribe',
        'modificationRecord'
      ])

      let logoUrlStr = {}
      if (uploadInfo.fileList.length) {
        logoUrlStr = await saveLogo(uploadInfo)
      } else if (
        !uploadInfo.fileList.length &&
				uploadInfo.showOffList &&
				uploadInfo.showOffList.winPath
      ) {
        logoUrlStr = uploadInfo.showOffList.winPath
      } else {
        logoUrlStr = ''
      }
      const params = {
        id,
        companyName,
        organizationName,
        establishmentDate: establishmentDate
          ? moment(establishmentDate).format('YYYY-MM-DD')
          : '',
        tel,
        website,
        provinceName: selectedCity[0],
        cityName: selectedCity[1],
        characterOfStructure,
        institutionStatus,
        institutionStatusShowhidden,
        assetManagementScale,
        actualController,
        actualControllerShowhidden,
        problemTime: problemTime
          ? moment(problemTime).format('YYYY-MM-DD')
          : '',
        goodAtTo,
        includedInTheList: tagList.length ? JSON.stringify(tagList) : '',
        includedInTheListShowhidden,
        seoTitle,
        seoTag,
        seoDescription,
        introductionToDescribe,
        mechanismPortraitLabel: tagsList.length ? JSON.stringify(tagsList) : '',
        modificationRecord,
        goPublic,
        stockCode,
        institutionalType: JSON.stringify(
          _.uniqWith(institutionalTypeList, _.isEqual)
        ),
        comprehensiveScoreCorrection: comprehensiveScoreCorrection || ' ',
        vietinbanhScoreCorrection: vietinbanhScoreCorrection || ' ',
        recordScoreCorrection: recordScoreCorrection || ' ',
        performanceScoreCorrection: performanceScoreCorrection || ' ',
        situationScoreCorrection: situationScoreCorrection || ' ',
        creditScoreCorrection: creditScoreCorrection || ' ',
        productScoreCorrection: productScoreCorrection || ' ',
        hierarchyScoreCorrection: hierarchyScoreCorrection || ' ',
        lastModifier: JSON.parse(Vue.ls.get('USERINFO')).username,
        lastModifiedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        logoUrl: logoUrlStr
      }
      basicInformationSubmissionRecord(params)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.insitubasicInfoWrapper {
	.ant-form-item {
		margin-bottom: 0;
	}
	.notPass {
		color: white;
		background: red !important;
	}
	.notPassT {
		color: white;
		background: red !important;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
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
	.ant-card-grid {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		> div {
			margin-left: 10px;
		}
	}
	.ant-descriptions {
		.ant-descriptions-item-label {
			text-align: center;
			background: rgb(236, 243, 253);
			width: 160px;
			position: relative;
		}
	}
}
</style>
