<template>
	<div class="editActivitiesWrapper">
		<h1>精彩活动-编辑活动</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<a-form layout="horizontal"
				:form="form">
				<a-form-item :label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<span slot='label'><em style="color:red;">*</em> 图片上传</span>
					<div style="display:flex;justify-content:flex-start">
						<single-img-upload title="上传图片"
							:actionUrl="`${uploadUrl.upload}?id=${id}`"
							:uploadInfo="uploadInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="handleUploadChange"
							@handleRemoveUpload="handleRemoveUpload"
							@handleDeleteUpload="handleDeleteUpload">
						</single-img-upload>
					</div>
					<p style="color:red;margin:0;">图片尺寸：678*382（推荐）</p>
					<p style="color:red;margin:0;">图片格式：JPG,JPEG,PNG,GIF(图片大小不超过1M)</p>
				</a-form-item>
				<a-form-item label="活动名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="填写活动主题名称"
						maxLength="100"
						v-decorator="['activityName',
						{rules: [{ required: true, message: '填写活动主题名称!', trigger: 'change' }]}
					]" />
				</a-form-item>
				<a-form-item label="活动时间："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-range-picker placeholder="请选择活动举办时间"
						:disabledDate="disabledDate"
						v-decorator="['activityTime',
							{rules: [{ required: true, message: '请选择活动举办时间!', trigger: 'change',type: 'array' }]}
						]" />
				</a-form-item>
				<a-form-item label="活动地区："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<v-distpicker only-province
						@selected="handleCity"
						v-decorator="['activityArea',
						{rules: [{ required: true, message: '请选择所在地区!', trigger: 'change' }]}
					]"
						ref="citySelec"></v-distpicker>
				</a-form-item>
				<a-form-item label="活动地址："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写活动主办详细地址"
						maxLength="100"
						v-decorator="['activityLoc',
						{rules: [{ required: true, message: '请填写活动主办详细地址!', trigger: 'change' }]}
					]" />
				</a-form-item>
				<a-form-item label="参与人数："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写活动参与人数（例如：500）"
						:maxLength="5"
						style="width:300px;"
						v-decorator="['activityInNum',
							{rules: [{ required: true, message: '请填写活动参与人数（例如：500）!'},{validator: checkNum}]}
						]" />
				</a-form-item>
				<a-form-item label="截止日期"
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-date-picker placeholder="请选择活动截止日期"
						:disabledDate="disabledEndDate"
						v-decorator="['activityEndTime',
							{rules: [{ required: true, message: '请选择活动截止日期!', trigger: 'change',type: 'object' }]}
						]" />
				</a-form-item>
				<a-form-item label="活动介绍："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 20 }">
					<Ue ref="ue"
						v-decorator="['activityIntroduce',
							{rules: [{ required: true, message: '请填写活动介绍!' }]}
						]"></Ue>
				</a-form-item>
				<a-form-item label="官方申明："
					class="textareaWrapper specialLabel"
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-textarea placeholder="请填写活动主办方官方声明及最终解释权等，本内容在活动页面底部展示，最多500字。"
						:autosize="{ minRows: 2, maxRows: 6 }"
						maxLength="500"
						v-decorator="['activityBroadCast']"
						@change="e => handleIntroduceInput(e)" />
					<p class="tip">已填写{{hasInput}} / 500 字</p>
				</a-form-item>
			</a-form>
			<div class="btnWrapper">
				<a-button @click="handleBack"
					style="background:rgba(42, 130, 228, 1);color:white;">返回</a-button>
				<a-button @click="handlePreviewAll"
					style="background:rgba(42, 130, 228, 1);color:white;">预览</a-button>
				<a-popconfirm title="确认信息无误并保存?"
					@confirm="handleSave(false)"
					okText="是"
					cancelText="再看看">
					<a-button style="background:rgba(42, 130, 228, 1);color:white;">保存</a-button>
				</a-popconfirm>
				<a-popconfirm title="确认信息无误并发布?"
					v-auth="$route.meta.dutyName"
					@confirm="handleSave(true)"
					okText="是"
					cancelText="再看看">
					<a-button style="background:rgba(7, 150, 66, 1);color:white;">发布</a-button>
				</a-popconfirm>
			</div>
		</a-card>
		<preview-img-modal :modalInfo="modalInfo"
			@handlePreviewCancel="obj => modalInfo = obj"></preview-img-modal>
	</div>
</template>

<script>
import moment from 'moment'
import store from '@/store'
import { PreviewImgModal, Ue, SingleImgUpload } from '@/components'
import VDistpicker from '../components/Distpicker'
import {
  uploadUrl,
  showSingleActivityInformation,
  removeActivityInformationPic,
  eidtStartActivityInformation,
  previewButton,
  getActivityInformationQrCode,
  auditingPublish
} from '@/api/institution/excitingActivities'

export default {
  components: {
    VDistpicker,
    SingleImgUpload,
    PreviewImgModal,
    Ue
  },
  data () {
    return {
      form: this.$form.createForm(this),
      uploadUrl: {},
      uploadInfo: {
        fileList: [],
        showOffList: {}
      },
      city: '',
      hasInput: 0,
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      }
    }
  },
  created () {
    this.uploadUrl = uploadUrl
    this.id = this.$route.query.id
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const {
        form: { setFieldsValue },
        backupImgInfo
      } = this
      let res = await showSingleActivityInformation({ id: this.id })

      const {
        code,
        data: {
          titlePic,
          activityName,
          activityTime,
          activityClosingTime,
          closingDate,
          activityArea,
          activityAddress,
          numberOfParticipants,
          activityIntroduce,
          officialStatement
        }
      } = res
      if (code === 200) {
        setFieldsValue({
          activityName: activityName,
          activityTime: [moment(activityTime), moment(activityClosingTime)],
          activityEndTime: moment(closingDate),
          activityArea: activityArea,
          activityLoc: activityAddress,
          activityInNum: Number(numberOfParticipants),
          activityIntroduce: activityIntroduce,
          activityBroadCast: officialStatement
        })
        this.uploadInfo.showOffList = backupImgInfo(titlePic)

        this.$nextTick(() => {
          this.$refs.citySelec.province = activityArea
          this.$refs.ue.content = activityIntroduce
        })
      }
    },
    // 回绑头像
    backupImgInfo (titlePic) {
      if (titlePic) {
        let arr = titlePic.split(';')
        return {
          winPath: arr[0],
          fileUrl: arr[1]
        }
      }
      return {
        winPath: '',
        fileUrl: ''
      }
    },
    handleCity (val) {
      this.city = `${val.province.value}`
      if (val.province.value === '请选择所在地区') {
        this.form.setFieldsValue({
          activityArea: ''
        })
        return
      }
      this.form.setFieldsValue({
        activityArea: val.province.value
      })
    },
    disabledDate (current) {
      let endTime = this.form.getFieldValue('activityEndTime')
      if (endTime) {
        return current && current < endTime.startOf('day')
      }
      return current && current < moment().endOf('day')
    },
    disabledEndDate (current) {
      let arr = this.form.getFieldValue('activityTime')
      if (arr && arr.length) {
        return (
          current &&
					(current < moment().startOf('day') || current > arr[0].endOf('day'))
        )
      }
      return current && current < moment().startOf('day')
    },
    // 简介 - 添加
    handleIntroduceInput (e) {
      this.hasInput = e.target.value.length
    },
    handleUploadChange ({ fileList }) {
      this.uploadInfo.fileList = fileList
    },
    async handleRemoveUpload ({
      response: {
        data: { fileUrl }
      }
    }) {
      let res = await removeActivityInformationPic({
        fileUrl,
        id: this.id
      })
      if (res.code === 200) {
        this.uploadInfo.fileList = []
      } else {
        this.$notification.error({
          message: res.msg || '删除失败，请重试！'
        })
      }
    },
    // 删除已上传
    async handleDeleteUpload (item, type) {
      let res = await removeActivityInformationPic({
        fileUrl: item,
        id: this.id
      })
      if (res.code === 200) {
        this.uploadInfo.showOffList = {}
      } else {
        this.$notification.error({
          message: res.msg || '删除失败，请重试！'
        })
      }
    },
    checkNum (rule, value, callback) {
      let str = Number(value)
      let Expression = /^[0-9]*$/
      let objExp = new RegExp(Expression)
      if (objExp.test(str) !== true) {
        // eslint-disable-next-line
				callback('请输入整数纯数字！')
      }
      callback()
    },
    handlePreviewImg (file) {
      this.modalInfo = {
        title: '查看大图',
        src: file.url || file.thumbUrl || file.winPath || file,
        previewVisible: true
      }
    },
    handleImgUrl () {
      const { uploadInfo } = this
      let titlePic = ''
      if (uploadInfo.fileList.length && uploadInfo.fileList[0].response) {
        titlePic = `${uploadInfo.fileList[0].response.data.winPath};${uploadInfo.fileList[0].response.data.fileUrl}`
      } else if (uploadInfo.showOffList.winPath) {
        titlePic = `${uploadInfo.showOffList.winPath};${uploadInfo.showOffList.fileUrl}`
      } else {
        titlePic = ''
      }
      return { titlePic }
    },
    handlePreviewAll () {
      const {
        form: { setFieldsValue, getFieldsValue, validateFields },
        $refs: {
          ue: { content }
        },
        $notification: { error, success },
        id,
        handleGetCode,
        uploadInfo: { fileList, showOffList }
      } = this
      setFieldsValue({
        activityIntroduce: content
      })
      const {
        activityName,
        activityTime,
        activityEndTime,
        activityArea,
        activityLoc,
        activityInNum,
        activityIntroduce,
        activityBroadCast
      } = getFieldsValue([
        'activityName',
        'activityTime',
        'activityEndTime',
        'activityArea',
        'activityLoc',
        'activityInNum',
        'activityIntroduce',
        'activityBroadCast'
      ])
      const { titlePic } = this.handleImgUrl()
      const param = {
        id,
        titlePic,
        activityName,
        activityTime: activityTime
          ? moment(activityTime[0]).format('YYYY-MM-DD')
          : '',
        activityClosingTime: activityTime
          ? moment(activityTime[1]).format('YYYY-MM-DD')
          : '',
        closingDate: moment(activityEndTime).format('YYYY-MM-DD'),
        activityArea,
        activityAddress: activityLoc,
        numberOfParticipants: activityInNum,
        activityIntroduce,
        officialStatement: activityBroadCast
      }
      if (!fileList.length && !showOffList.winPath) {
        this.$notification.error({
          message: '请上传活动图片！'
        })
        return
      }
      validateFields(async err => {
        if (!err) {
          try {
            let res = await previewButton(param)
            if (res.code === 200) {
              handleGetCode()
            } else {
              throw new Error(res.msg)
            }
          } catch ({ message }) {
            this.$notification.error({
              message: message || '网络故障，请重试！'
            })
          }
        }
      })
    },
    async handleGetCode (bool) {
      try {
        const param = {
          id: this.id,
          url: `${uploadUrl.code}${this.id}?type=prev`
        }
        const res = await getActivityInformationQrCode(param)
        const { code, data, msg } = res
        if (code === 200) {
          this.handlePreviewImg(data)
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleSave (isPub) {
      const {
        form: { setFieldsValue, getFieldsValue, validateFields },
        $refs: {
          ue: { content }
        },
        $notification: { error, success },
        id,
        handleSubmit,
        uploadInfo: { fileList, showOffList }
      } = this
      setFieldsValue({
        activityIntroduce: content
      })
      const {
        activityName,
        activityTime,
        activityEndTime,
        activityArea,
        activityLoc,
        activityInNum,
        activityIntroduce,
        activityBroadCast
      } = getFieldsValue([
        'activityName',
        'activityTime',
        'activityEndTime',
        'activityArea',
        'activityLoc',
        'activityInNum',
        'activityIntroduce',
        'activityBroadCast'
      ])
      const param = {
        id,
        activityName,
        activityTime: activityTime
          ? moment(activityTime[0]).format('YYYY-MM-DD')
          : '',
        activityClosingTime: activityTime
          ? moment(activityTime[1]).format('YYYY-MM-DD')
          : '',
        closingDate: moment(activityEndTime).format('YYYY-MM-DD'),
        activityArea,
        activityAddress: activityLoc,
        numberOfParticipants: activityInNum,
        activityIntroduce,
        officialStatement: activityBroadCast
      }
      if (!fileList.length && !showOffList.winPath) {
        this.$notification.error({
          message: '请上传活动图片！'
        })
        return
      }
      validateFields(
        [
          'activityName',
          'activityTime',
          'activityEndTime',
          'activityArea',
          'activityLoc',
          'activityInNum',
          'activityIntroduce',
          'activityBroadCast'
        ],
        async err => {
          if (!err) {
            try {
              let res = await eidtStartActivityInformation(param)
              if (res.code === 200) {
                if (isPub) {
                  handleSubmit()
                } else {
                  success({
                    message: res.msg || '保存成功！'
                  })
                }
              } else {
                throw new Error(res.msg)
              }
            } catch ({ message }) {
              this.$notification.error({
                message: message || '网络故障，请重试！'
              })
            }
          }
        }
      )
    },
    async handleSubmit () {
      const {
        $notification: { success, error },
        $router,
        id
      } = this
      try {
        const param = {
          id,
          publish: 1
        }
        const res = await auditingPublish(param)
        const { code, data, msg } = res
        if (code === 200) {
          success({
            message: res.msg || '发布成功'
          })
          $router.push({
            path: '/policy/activityManagement'
          })
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleBack () {
      this.$router.push('/policy/activityManagement')
    }
  }
}
</script>

<style lang="less">
.editActivitiesWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mainWrapper {
		.textareaWrapper {
			.ant-form-item-control {
				textarea {
					max-width: 600px;
				}
				.ant-form-item-children {
					position: relative;
				}
				.tip {
					margin: 0;
					position: absolute;
					right: 15px;
					bottom: -35px;
				}
			}
		}
		.specialLabel {
			.ant-input {
				width: 100%;
			}
		}
		.ant-form-item-label {
			text-align: center;
			p {
				font-size: 12px;
				margin: -20px 0 0 -10px;
			}
			label:after {
				content: '';
			}
		}
		.ant-input {
			width: 300px;
		}
		.ant-input-affix-wrapper {
			width: 300px;
		}
		.btnWrapper {
			margin-top: 50px;
			.ant-btn {
				margin-right: 10px;
			}
		}
	}
}
</style>
