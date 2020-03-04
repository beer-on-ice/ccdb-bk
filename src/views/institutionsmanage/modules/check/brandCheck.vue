<template>
	<div class="brandCheckWrapper">
		<h1>机构管理 - 品牌审核详情</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="(Number($route.query.type) === 3||Number($route.query.type) === 8||Number($route.query.type) === 5)&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form">
				<a-form-item label="品牌LOGO："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<div class="backImg">
						<img @click="handlePreviewImg(brandInfo.logoUrl)"
							:src="brandInfo.logoUrl"
							alt="营业执照编号">
					</div>
				</a-form-item>
				<a-form-item label="品牌名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.brandName}}</p>
				</a-form-item>
				<a-form-item label="品牌介绍："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p style="word-break: break-all;">{{brandInfo.description}}</p>
				</a-form-item>
				<a-form-item label="所属公司："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.belongCompany}}</p>
				</a-form-item>
				<a-form-item label="营业执照编号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.licenseNo}}</p>
					<div class="backImg"
						v-if="brandInfo.licenseUrl">
						<img @click="handlePreviewImg(brandInfo.licenseUrl)"
							:src="brandInfo.licenseUrl"
							alt="营业执照编号">
					</div>
				</a-form-item>
				<a-form-item label="法定代表人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.artificialPerson}}</p>
					<div class="specUpWrapper">
						<div class="backImg">
							<img @click="handlePreviewImg(brandInfo.pnoFront)"
								v-if="brandInfo.pnoFront !==''"
								:src="brandInfo.pnoFront"
								alt="身份证正面">
						</div>
						<div class="backImg">
							<img @click="handlePreviewImg(brandInfo.pnoBack)"
								v-if="brandInfo.pnoBack !==''"
								:src="brandInfo.pnoBack"
								alt="身份证背面">
						</div>
					</div>
				</a-form-item>
				<a-form-item label="合同上传："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<div class="muchUpWrapper">
						<div class="backImg"
							v-for="item in brandInfo.contractList"
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
				<a-form-item label="品牌账号管理人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.manageUse}}</p>
				</a-form-item>
				<a-form-item label="身份证号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.pno}}</p>
					<div class="specUpWrapper">
						<div class="backImg"
							v-if="brandInfo.manageFront">
							<img @click="handlePreviewImg(brandInfo.manageFront)"
								:src="brandInfo.manageFront"
								alt="身份证正面">
						</div>
						<div class="backImg"
							v-if="brandInfo.manageBack">
							<img @click="handlePreviewImg(brandInfo.manageBack)"
								:src="brandInfo.manageBack"
								alt="身份证背面">
						</div>
					</div>
				</a-form-item>
				<a-form-item label="联系电话："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.phone}}</p>
				</a-form-item>
				<a-form-item label="职位名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.occupation}}</p>
				</a-form-item>
				<a-form-item label="邮箱："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{brandInfo.email}}</p>
				</a-form-item>
				<a-form-item label="关联公司："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p v-for="item in brandInfo.companyList"
						:key="item.companyUrl">{{item.companyName}}</p>
				</a-form-item>
				<a-form-item label="服务期限："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }"
					class="specRangeWrapper">
					<p>{{_handlePtime(brandInfo.startTime)}} - {{_handlePtime(brandInfo.endTime)}}</p>
				</a-form-item>
				<a-form-item label="操作："
					:label-col="{ span: 2 }"
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
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 22 }"
					v-if="checkRecord.recordVisible">
					<check-record :recordList="checkRecord.recordList"></check-record>
				</a-form-item>
			</a-form>
		</a-card>
		<a-card class="pwdWrapper"
			title="账号密码已生成，请妥善保存"
			style="width: 300px"
			v-if="Number($route.query.type) === 9">
			<p>账号：{{gengerateUserInfo.username}}</p>
			<p>密码：{{gengerateUserInfo.password}}</p>
		</a-card>
		<preview-img-modal :modalInfo="modalInfo"
			@handlePreviewCancel="obj => modalInfo = obj"></preview-img-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { axios } from '@/utils/request'
import { editViewBrand, examineOption } from '@/api/institution/addBrand'
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
  name: 'brandCheck',
  components: {
    PreviewImgModal,
    CheckRecord,
    pdf
  },
  data () {
    return {
      certTypeList,
      brandInfo: {},
      gengerateUserInfo: {},
      showrejectReason: '',
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      },
      checkRecord: {
        recordVisible: false,
        recordList: []
      },
      form: this.$form.createForm(this),
      rejectDescribe: ''
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
          brandId: this.id,
          examineState
        }
        let res = await editViewBrand(param)
        if (res.code === 200) {
          this.brandInfo = res.data
          this.editImgUrl(this.brandInfo)
          this.editRecordList(this.brandInfo)

          this.gengerateUserInfo = res.data.loginUser
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
      logoUrl,
      licenseUrl,
      pnoFront,
      pnoBack,
      manageFront,
      manageBack,
      contractList
    }) {
      this.brandInfo.logoUrl = logoUrl !== '' ? logoUrl.split(';')[0] : ''
      this.brandInfo.licenseUrl =
				licenseUrl !== '' ? licenseUrl.split(';')[0] : ''
      this.brandInfo.pnoFront = pnoFront !== '' ? pnoFront.split(';')[0] : ''
      this.brandInfo.pnoBack = pnoBack !== '' ? pnoBack.split(';')[0] : ''
      this.brandInfo.contractList &&
				this.brandInfo.contractList.map(item => {
				  item.url = item.url !== '' ? item.url.split(';')[0] : ''
				})
      this.brandInfo.manageFront =
				manageFront !== '' ? manageFront.split(';')[0] : ''
      this.brandInfo.manageBack =
				manageBack !== '' ? manageBack.split(';')[0] : ''
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
    // 通过
    async handlePass () {
      const {
        userName,
        brandInfo: { phone }
      } = this
      let params = {
        brandId: this.id,
        examineUser: userName,
        examineState: 2,
        rejectReason: '',
        phone: phone
      }
      try {
        let res = await examineOption(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/instituManagement',
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
    // 拒绝
    async handleReject () {
      if (this.rejectDescribe.trim().length < 5) {
        this.$notification.error({
          message: '请填写5-200字驳回理由！'
        })
        return
      }
      const {
        userName,
        brandInfo: { phone },
        rejectDescribe
      } = this
      let params = {
        brandId: this.id,
        examineUser: userName,
        examineState: 3,
        rejectReason: rejectDescribe.trim(),
        phone: phone
      }
      try {
        let res = await examineOption(params)
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '提交成功！'
          })
          this.$router.push({
            path: '/institutionsmanage/instituManagement',
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
        $route: {
          query: { type }
        }
      } = this
      if (Number(type) === 7 || Number(type) === 8 || Number(type) === 9) {
        this.$router.push({
          path: '/institutionsmanage/instituApplication',
          query: {
            type: Number(type)
          }
        })
      } else if (
        Number(type) === 5 ||
				Number(type) === 6 ||
				Number(type) === 1
      ) {
        this.$router.push({
          path: '/institutionsmanage/instituManagement',
          query: {
            type: Number(type)
          }
        })
      }
    }
  },
  filters: {
    companyTypeFilter (val) {
      switch (Number(val)) {
        case 0:
          return '品牌'
        case 1:
          return '私募管理人'
        case 2:
          return '信托公司'
        case 3:
          return '银行'
        case 4:
          return '保险公司'
        default:
          return '品牌'
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
        case 5:
          return '其他费用协议'
        case 6:
          return '其他协议'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less">
.brandCheckWrapper {
	position: relative;
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
	.pwdWrapper {
		position: absolute;
		top: 40px;
		right: 0;
	}
}
</style>
