<template>
	<div class="checkCorporateWrapper">
		<h1>机构管理 - 企业信息审核</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">驳回原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form"
				:label-col="{ span: 2 }"
				:wrapper-col="{ span: 12 }">
				<a-form-item label="企业LOGO"
					class="imgUploaderWrapper">
					<div style="display:flex;justify-content:flex-start;">
						<div class="avatarWrapper"
							v-if="corporateInfo.logoUrl !== ''"
							@click="handlePreviewImg(corporateInfo.logoUrl)">
							<img :src="corporateInfo.logoUrl"
								alt="LOGO">
							<div class="action">查看大图</div>
						</div>
						<div class="avatarWrapper"
							v-if="corporateInfo.backgroundUrl !== ''"
							@click="handlePreviewImg(corporateInfo.backgroundUrl)">
							<img :src="corporateInfo.backgroundUrl"
								alt="LOGO">
							<div class="action">查看大图</div>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="企业名称：">
					<p>{{corporateInfo.companyName}}</p>
				</a-form-item>
				<a-form-item label="联系地址：">
					<p>{{corporateInfo.address}}</p>
				</a-form-item>
				<a-form-item label="企业网址：">
					<p>{{corporateInfo.website}}</p>
				</a-form-item>
				<a-form-item label="联系电话：">
					<p>{{corporateInfo.tel}}</p>
				</a-form-item>
				<!-- <a-form-item label="共享账号："
					>
					<p>{{corporateInfo.username}}</p>
				</a-form-item>
				<a-form-item label="分享权限设置："
					>
					<p>{{corporateInfo.resource}}</p>
				</a-form-item> -->
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
		<preview-img-modal :modalInfo="modalInfo"
			@handlePreviewCancel="obj => modalInfo = obj"></preview-img-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import moment from 'moment'
import { detail, judge } from '@/api/institution/corporateCheck'
import CheckRecord from './../../components/CheckRecord'
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
      showrejectReason: '',
      form: this.$form.createForm(this),
      corporateInfo: {},
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
    const { id, type } = this.$route.query
    this.id = id
    this.type = type
    this.userName = JSON.parse(Vue.ls.get('USERINFO')).username
    this.getCheckInfo()
  },
  methods: {
    async getCheckInfo () {
      try {
        let res = await detail({ id: this.id, examineState: this.type })
        if (res.code === 200) {
          this.corporateInfo = res.data
          const {
            logoUrl,
            backgroundUrl,
            companyList,
            historyList,
            tel
          } = this.corporateInfo
          if (logoUrl !== '') {
            this.corporateInfo.logoUrl = logoUrl.split(';')[0]
          }
          if (backgroundUrl !== '') {
            this.corporateInfo.backgroundUrl = backgroundUrl.split(';')[0]
          }
          if (tel !== '') {
            this.corporateInfo.tel = tel.split(';').join('、')
          }

          this.editRecordList(this.corporateInfo)
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
        id: this.id,
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
            path: '/institutionsmanage/corporateManagement',
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
        id: this.id,
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
            path: '/institutionsmanage/corporateManagement',
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
        path: '/institutionsmanage/corporateManagement',
        query: {
          type: Number(type)
        }
      })
    }
  }
}
</script>

<style lang="less">
.checkCorporateWrapper {
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
