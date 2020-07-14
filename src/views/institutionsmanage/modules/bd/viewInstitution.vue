<template>
	<div class="insititutionCheckWrapper">
		<h1>企业认证-认证详情</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 class="rejectReason">认证信息审核中</h3>
			<a-form layout="horizontal"
				:form="form">
				<a-form-item label="公司名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.institutionName}}</p>
				</a-form-item>
				<a-form-item label="公司类型："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.institutionType|companyTypeFilter}}</p>
				</a-form-item>
				<a-form-item label="营业执照编号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.institutionNo}}</p>
					<div class="backImg">
						<img @click="handlePreviewImg(institutionInfo.institutionUrl)"
							:src="institutionInfo.institutionUrl"
							alt="营业执照编号">
					</div>
				</a-form-item>
				<a-form-item label="法定代表人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.artificialPerson}}</p>
					<div class="specUpWrapper">
						<div class="backImg">
							<img @click="handlePreviewImg(institutionInfo.pnoFront)"
								v-if="institutionInfo.pnoFront !==''"
								:src="institutionInfo.pnoFront"
								alt="身份证正面">
						</div>
						<div class="backImg">
							<img @click="handlePreviewImg(institutionInfo.pnoBack)"
								v-if="institutionInfo.pnoBack !==''"
								:src="institutionInfo.pnoBack"
								alt="身份证背面">
						</div>
					</div>
				</a-form-item>
				<a-form-item label="合同上传："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<div class="muchUpWrapper">
						<div class="backImg"
							v-for="item in institutionInfo.contractList"
							:key="item.id"
							@click="handlePreviewImg(item.url)">
							<pdf class="pdfWrapper"
								:src="item.url"
								v-if="item.url.endsWith('.pdf')"></pdf>
							<img v-else
								:src="item.url"
								alt="合同">
							<p>{{item.ctype | certTypeListFilter}}</p>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="机构账号管理人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.manageUse}}</p>
				</a-form-item>
				<a-form-item label="身份证号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.managePno}}</p>
					<div class="specUpWrapper">
						<div class="backImg">
							<img @click="handlePreviewImg(institutionInfo.manageFront)"
								:src="institutionInfo.manageFront"
								alt="身份证正面">
						</div>
						<div class="backImg">
							<img @click="handlePreviewImg(institutionInfo.manageBack)"
								:src="institutionInfo.manageBack"
								alt="身份证背面">
						</div>
					</div>
				</a-form-item>
				<a-form-item label="联系电话："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.phone}}</p>
				</a-form-item>
				<a-form-item label="职位名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.occupation}}</p>
				</a-form-item>
				<a-form-item label="邮箱："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.email}}</p>
				</a-form-item>
				<a-form-item label="权限设置："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{institutionInfo.powerSee}}</p>
				</a-form-item>
				<a-form-item label="服务期限："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }"
					class="specRangeWrapper">
					<p>{{_handlePtime(institutionInfo.startTime)}} - {{_handlePtime(institutionInfo.endTime)}}</p>
				</a-form-item>
				<a-form-item label="操作："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }">
					<div class="btnWrapper">
						<a-button @click="handleBack">返回</a-button>
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
import { axios } from '@/utils/request'
import { editViewIns, examineOption } from '@/api/institution/addInstitution'
import { PreviewImgModal } from '@/components/index'
import CheckRecord from './../../components/CheckRecord'
import pdf from 'vue-pdf'
const certTypeList = [
  {
    id: '0',
    name: '机构合作协议'
  },
  {
    id: '1',
    name: '平台服务协议'
  },
  {
    id: '2',
    name: '平台补充协议'
  },
  {
    id: '3',
    name: '平台服务费协议'
  },
  {
    id: '4',
    name: '其他合作协议'
  }
]
export default {
  components: {
    PreviewImgModal,
    CheckRecord,
    pdf
  },
  data () {
    return {
      certTypeList,
      institutionInfo: {},
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      },
      checkRecord: {
        recordVisible: false,
        recordList: []
      },
      form: this.$form.createForm(this)
    }
  },
  created () {
    const { id, type } = this.$route.query
    this.id = id
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
  },
  methods: {
    // 获取相关信息
    async getCheckInfo () {
      const { type } = this.$route.query
      let examineState = Number(type)
      if (Number(type) === 1 || Number(type) === 7) {
        examineState = 1
      } else if (Number(type) === 6 || Number(type) === 9) {
        examineState = 2
      } else if (Number(type) === 5 || Number(type) === 8) {
        examineState = 3
      }
      try {
        const param = {
          insId: this.id,
          examineState
        }
        let res = await editViewIns(param)
        if (res.code === 200) {
          this.institutionInfo = res.data

          this.editImgUrl(this.institutionInfo)
          this.editRecordList(this.institutionInfo)
          this.editPowerSee(this.institutionInfo)
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    editImgUrl ({
      institutionUrl,
      pnoFront,
      pnoBack,
      manageFront,
      manageBack,
      contractList
    }) {
      this.institutionInfo.institutionUrl =
				institutionUrl !== '' ? institutionUrl.split(';')[0] : ''
      this.institutionInfo.pnoFront =
				pnoFront !== '' ? pnoFront.split(';')[0] : ''
      this.institutionInfo.pnoBack = pnoBack !== '' ? pnoBack.split(';')[0] : ''
      this.institutionInfo.contractList.map(item => {
        item.url = item.url !== '' ? item.url.split(';')[0] : ''
      })
      this.institutionInfo.manageFront =
				manageFront !== '' ? manageFront.split(';')[0] : ''
      this.institutionInfo.manageBack =
				manageBack !== '' ? manageBack.split(';')[0] : ''
    },
    editRecordList ({ historyList }) {
      this.checkRecord.recordList = historyList || []
      if (historyList && historyList.length) {
        this.checkRecord.recordVisible = !!this.checkRecord.recordList.length
      }
    },
    editPowerSee ({ insResourceMapList }) {
      let str = ''
      let result = insResourceMapList.filter(item => item.checked === 1)
      result.forEach(item => {
        str += `${item.nodeName}、`
      })
      this.institutionInfo.powerSee = str
    },
    // 预览照片 - 打开
    handlePreviewImg (file) {
      if (file.endsWith('.pdf')) {
        window.open(file, '_blank')
        return
      }
      this.modalInfo = {
        title: file.name || '查看大图',
        src: file.thumbUrl || file.winPath || file,
        previewVisible: true
      }
    },
    // 处理时间
    _handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD')
    },
    // 返回
    handleBack () {
      this.$router.go(-1)
    }
  },
  filters: {
    companyTypeFilter (val) {
      switch (Number(val)) {
        case 1:
          return '基金'
        case 2:
          return '信托'
        case 3:
          return '基金且信托'
        case 4:
          return '银行'
        case 5:
          return '保险'
        case 6:
          return '基金且银行'
        case 7:
          return '基金且保险'
        case 8:
          return '证券'
        case 9:
          return '基金且证券'
        default:
          return ''
      }
    },
    certTypeListFilter (val) {
      switch (Number(val)) {
        case 0:
          return '机构合作协议'
        case 1:
          return '平台服务协议'
        case 2:
          return '平台补充协议'
        case 3:
          return '平台服务费协议'
        case 4:
          return '其他合作协议'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less">
.insititutionCheckWrapper {
	position: relative;
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mainWrapper {
		.rejectReason {
			background: rgba(212, 48, 48, 0.24);
			box-shadow: rgba(212, 48, 48, 0.74) solid 1px;
			padding: 10px;
			border: 1px solid red;
			word-break: break-all;
			font-weight: bold;
		}
		.backImg {
			width: 180px;
			height: 120px;
			position: relative;
			margin-right: 10px;
			img {
				width: 100%;
				height: 100%;
				background-size: cover;
			}
			.pdfWrapper {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			p {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 28px;
				background: rgba(0, 0, 0, 0.4);
				color: #fff;
				margin: 0;
				text-align: center;
				line-height: 28px;
				font-size: 16px;
			}
		}
		.ant-input {
			width: 180px;
		}
		.btnWrapper {
			.ant-input {
				width: 100%;
			}
			.ant-btn {
				margin-right: 10px;
			}
		}
		.specRangeWrapper {
			.ant-input {
				width: 100%;
			}
		}
		.specUpWrapper {
			display: flex;
			justify-content: flex-start;
		}
		.muchUpWrapper {
			display: flex;
			justify-content: flex-start;

			& > div {
				margin-right: 10px;
			}
		}
	}
}
</style>
