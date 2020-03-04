<template>
	<div class="editInsititutionWrapper">
		<h1>机构管理 - 修改机构申请</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<h3 style="word-break:break-all;"
				v-if="Number($route.query.type) === 3&&showrejectReason">审核未通过,原因：{{showrejectReason}}</h3>
			<a-form layout="horizontal"
				:form="form">
				<a-form-item label="公司名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{companyName}}</p>
				</a-form-item>
				<a-form-item label="公司类型："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<p>{{companyType | companyTypeFilter}}</p>
				</a-form-item>
				<a-form-item label="营业执照编号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写营业执照编号"
						maxLength="50"
						v-decorator="['licenceNumber',
						{rules: [{ required: true, message: '请填写营业执照编号!', trigger: 'change' }]}
					]"></a-input>
					<single-img-upload-new title="上传营业执照副本"
						:actionUrl="`${uploadUrl}?dic=1`"
						:uploadInfo="uploadLicenseInfo"
						@handleRemoveUpload="files=>handleRemoveUpload(files,'licence')"
						@handlePreviewImg="handlePreviewImg"
						@handleUploadChange="files=>handleUploadChange(files,'licence')"
						@handleDeleteUpload="file=>handleDeleteUpload(file,'licence')"></single-img-upload-new>
				</a-form-item>
				<a-form-item label="法定代表人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写法人姓名"
						maxLength="50"
						v-decorator="['lawMan']"></a-input>
					<div class="specUpWrapper">
						<single-img-upload-new title="上传身份证（正面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadLawManFrontInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'lawmanFront')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'lawmanFront')"
							@handleDeleteUpload="file=>handleDeleteUpload(file,'lawmanFront')">
						</single-img-upload-new>
						<single-img-upload-new title="上传身份证（反面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadLawManBackInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'lawmanBack')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'lawmanBack')"
							@handleDeleteUpload="file=>handleDeleteUpload(file,'lawmanBack')">
						</single-img-upload-new>
					</div>
				</a-form-item>
				<a-form-item label="合同上传："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<div class="muchUpWrapper">
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeOne',
								{rules: [{ required: true, message: '请选择协议类型!', trigger: 'change' }]}
							]">
								<a-select-option v-for="(item) in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractOneInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractOne')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractOne')"
								@handleDeleteUpload="file=>handleDeleteUpload(file,'contractOne')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeTwo',
          		{rules: [{ required: true, message: '请选择协议类型!', trigger: 'change' }]}
        		]">
								<a-select-option v-for="(item) in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractTwoInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractTwo')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractTwo')"
								@handleDeleteUpload="file=>handleDeleteUpload(file,'contractTwo')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeThree',
          		{rules: [{ required: true, message: '请选择协议类型!', trigger: 'change' }]}
        		]">
								<a-select-option v-for="(item) in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractThreeInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractThree')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractThree')"
								@handleDeleteUpload="file=>handleDeleteUpload(file,'contractThree')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeFour',
          		{rules: [{ required: true, message: '请选择资质类型!', trigger: 'change' }]}
        		]">
								<a-select-option v-for="(item) in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractFourInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractFour')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractFour')"
								@handleDeleteUpload="file=>handleDeleteUpload(file,'contractFour')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeFive',
          		{rules: [{ required: true, message: '请选择协议类型!', trigger: 'change' }]}
        		]">
								<a-select-option v-for="(item) in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractFiveInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractFive')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractFive')"
								@handleDeleteUpload="file=>handleDeleteUpload(file,'contractFive')">
							</single-img-upload-new>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="机构账号管理人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写姓名"
						maxLength="50"
						v-decorator="['managerName',
								{rules: [{ required: true, message: '请填写姓名!', trigger: 'change' }]}
							]"></a-input>
				</a-form-item>
				<a-form-item label="身份证号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder=" 请填写身份证号"
						maxLength="50"
						v-decorator="['idCardNum',
								{rules: [{ required: true, message: '请填写身份证号!', trigger: 'change' }]}
							]"></a-input>
					<div class="specUpWrapper">
						<single-img-upload-new title="上传身份证（正面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadManagerFrontInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'managerFront')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'managerFront')"
							@handleDeleteUpload="file=>handleDeleteUpload(file,'managerFront')">
						</single-img-upload-new>
						<single-img-upload-new title="上传身份证（反面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadManagerBackInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'managerBack')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'managerBack')"
							@handleDeleteUpload="file=>handleDeleteUpload(file,'managerBack')">
						</single-img-upload-new>
					</div>
				</a-form-item>
				<a-form-item label="联系电话："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写联系电话"
						maxLength="50"
						disabled
						v-decorator="['phone',
								{rules: [{ required: true, message: '请填写联系电话!', trigger: 'change' }]}
							]"></a-input>
				</a-form-item>
				<a-form-item label="职位名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写职位名称"
						maxLength="50"
						v-decorator="['position',
								{rules: [{ required: true, message: '请填写职位名称!', trigger: 'change' }]}
							]"></a-input>
				</a-form-item>
				<a-form-item label="邮箱："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写邮箱地址"
						maxLength="50"
						v-decorator="['email',
								{rules: [{ required: true, message: '请填写邮箱!', trigger: 'change' }]}
							]"></a-input>
				</a-form-item>
				<a-form-item label="权限设置："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-checkbox-group :options="plainOptions"
						v-decorator="['powerSee',{initialValue:defaultPowerSee,rules: [{ required: true, message: '请选择权限!', trigger: 'change',type:'array' }]}
							]" />
				</a-form-item>
				<a-form-item label="服务期限："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }"
					class="specRangeWrapper">
					<a-range-picker @change="handleServiceTimeChange"
						:disabledDate="disabledDate"
						v-decorator="['serviceExp', { initialValue: serviceExp,rules: [{ required: true, message: '请选择时间!', trigger: 'change',type:'array' }] }
							]" />
				</a-form-item>
			</a-form>
			<div class="btnWrapper">
				<a-button @click="handleBack">返回</a-button>
				<a-popconfirm title="确认信息无误并提交?"
					@confirm="handleSubmit"
					okText="是"
					cancelText="再看看">
					<a-button>提交审核</a-button>
				</a-popconfirm>
			</div>
		</a-card>
		<preview-img-modal :modalInfo="modalInfo"
			@handlePreviewCancel="obj => modalInfo = obj"></preview-img-modal>
		<div class="canvas-container"
			style="width:750px;">
			<canvas ref="myCanvas"
				class="pdf-container"
				style=" position: relative;">
			</canvas>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { axios } from '@/utils/request'
import {
  uploadUrl,
  editViewIns,
  getAutoDic,
  deleteFile,
  modifyInsPage
} from '@/api/institution/addInstitution'
import { SingleImgUploadNew, PreviewImgModal } from '@/components/index'
import pdfJS from 'pdfjs-dist'

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
  name: 'editInsititution',
  components: {
    SingleImgUploadNew,
    PreviewImgModal
  },
  data () {
    return {
      certTypeList,
      companyName: '',
      companyType: '',
      showrejectReason: '',
      rejectReason: [],
      serviceExp: [],
      plainOptions: [],
      defaultPowerSee: [],
      // 执照
      uploadLicenseInfo: {
        fileList: [],
        showOffList: {}
      },
      // 法人身份证前
      uploadLawManFrontInfo: {
        fileList: [],
        showOffList: {}
      },
      // 法人身份证后
      uploadLawManBackInfo: {
        fileList: [],
        showOffList: {}
      },
      // 合同一
      uploadContractOneInfo: {
        fileList: [],
        showOffList: {}
      },
      // 合同二
      uploadContractTwoInfo: {
        fileList: [],
        showOffList: {}
      },
      // 合同三
      uploadContractThreeInfo: {
        fileList: [],
        showOffList: {}
      },
      // 合同四
      uploadContractFourInfo: {
        fileList: [],
        showOffList: {}
      },
      // 合同五
      uploadContractFiveInfo: {
        fileList: [],
        showOffList: {}
      },
      // 机构管理人身份证
      uploadManagerFrontInfo: {
        fileList: [],
        showOffList: {}
      },
      // 机构管理人身份证后
      uploadManagerBackInfo: {
        fileList: [],
        showOffList: {}
      },
      modalInfo: {
        title: '查看大图',
        previewVisible: false,
        src: ''
      },
      form: this.$form.createForm(this),
      uploadUrl: {},
      serviceStartTime: '',
      serviceEndTime: ''
    }
  },
  created () {
    this.uploadUrl = uploadUrl
    this.id = this.$route.query.id
    this.getInfo()
    this.getAutoDic()
  },
  methods: {
    async getInfo () {
      const { type } = this.$route.query
      let examineState = Number(type)
      const param = {
        insId: this.id,
        examineState
      }
      try {
        const res = await editViewIns(param)
        const { data, code } = res
        if (code === 200) {
          const {
            institutionName,
            institutionType,
            institutionNo,
            artificialPerson,
            manageUse,
            managePno,
            phone,
            occupation,
            email,
            startTime,
            endTime,
            insResourceMapList,
            institutionUrl,
            pnoFront,
            pnoBack,
            manageFront,
            manageBack,
            contractList,
            historyList
          } = data

          this.companyName = institutionName
          this.companyType = institutionType
          this.showrejectReason =
						historyList[historyList.length - 1].rejectDescribe || ''
          this.serviceExp = this.backupServiceExp(startTime, endTime)
          this.defaultPowerSee = this.backupPowerSee(insResourceMapList)
          this.uploadLicenseInfo.showOffList = this.backupImgInfo(
            institutionUrl
          )
          this.uploadLawManFrontInfo.showOffList = this.backupImgInfo(pnoFront)
          this.uploadLawManBackInfo.showOffList = this.backupImgInfo(pnoBack)
          this.uploadManagerFrontInfo.showOffList = this.backupImgInfo(
            manageFront
          )
          this.uploadManagerBackInfo.showOffList = this.backupImgInfo(
            manageBack
          )
          this.backupContract(contractList)

          this.form.setFieldsValue({
            licenceNumber: institutionNo,
            lawMan: artificialPerson,
            licenceTypeOne: contractList[0]
              ? String(contractList[0].ctype)
              : undefined,
            licenceTypeTwo: contractList[1]
              ? String(contractList[1].ctype)
              : undefined,
            licenceTypeThree: contractList[2]
              ? String(contractList[2].ctype)
              : undefined,
            licenceTypeFour: contractList[3]
              ? String(contractList[3].ctype)
              : undefined,
            licenceTypeFive: contractList[4]
              ? String(contractList[4].ctype)
              : undefined,
            managerName: manageUse,
            idCardNum: managePno,
            phone: phone,
            position: occupation,
            email: email
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
    // 获取权限列表
    async getAutoDic () {
      try {
        const res = await getAutoDic()
        if (res.code === 200) {
          let plainOptions = []
          res.data.forEach(item => {
            plainOptions.push({ label: item.nodeName, value: item.id })
          })
          this.plainOptions = plainOptions
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '提交失败，请重试!'
        })
      }
    },
    // 处理时间
    _handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD')
    },
    backupContract (res) {
      let {
        uploadContractOneInfo,
        uploadContractTwoInfo,
        uploadContractThreeInfo,
        uploadContractFourInfo,
        uploadContractFiveInfo
      } = this
      let arr = [
        uploadContractOneInfo,
        uploadContractTwoInfo,
        uploadContractThreeInfo,
        uploadContractFourInfo,
        uploadContractFiveInfo
      ]

      let result = []
      res.forEach(item => {
        let arr = item.url.split(';')
        result.push({
          winPath: arr[0],
          fileUrl: arr[1]
        })
      })
      for (let i = 0; i < result.length; i++) {
        arr[i].showOffList = result[i]
      }
    },
    // 回绑照片
    backupImgInfo (url) {
      if (!url) {
        return {
          winPath: '',
          fileUrl: ''
        }
      }
      let arr = url.split(';')
      return {
        winPath: arr[0],
        fileUrl: arr[1]
      }
    },
    backupPowerSee (arr) {
      let result = []
      arr.filter((item, index) => {
        if (Number(item.checked)) {
          result.push(item.resourceId)
        }
      })
      return result
    },
    backupServiceExp (startTime, endTime) {
      if (startTime) {
        this.serviceStartTime = moment(startTime).format('YYYY-MM-DD')
        this.serviceEndTime = moment(endTime).format('YYYY-MM-DD')
        return [moment(startTime), moment(endTime)]
      }
      return [undefined, undefined]
    },
    // 直接上传
    handleUploadChange ({ fileList }, type) {
      switch (type) {
        case 'licence':
          this.uploadLicenseInfo.fileList = fileList
          break
        case 'lawmanFront':
          this.uploadLawManFrontInfo.fileList = fileList
          break
        case 'lawmanBack':
          this.uploadLawManBackInfo.fileList = fileList
          break
        case 'contractOne':
          this.uploadContractOneInfo.fileList = fileList
          break
        case 'contractTwo':
          this.uploadContractTwoInfo.fileList = fileList
          break
        case 'contractThree':
          this.uploadContractThreeInfo.fileList = fileList
          break
        case 'contractFour':
          this.uploadContractFourInfo.fileList = fileList
          break
        case 'contractFive':
          this.uploadContractFiveInfo.fileList = fileList
          break
        case 'managerFront':
          this.uploadManagerFrontInfo.fileList = fileList
          break
        case 'managerBack':
          this.uploadManagerBackInfo.fileList = fileList
          break
        default:
          break
      }
    },
    // 删除上传的图片
    async handleRemoveImg (fileUrl) {
      try {
        const res = await deleteFile({
          url: fileUrl
        })
        if (res.code === 200) {
          this.$notification.success({
            message: res.msg || '删除成功！'
          })
          return res
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '删除失败，请重试！'
        })
      }
    },
    async handleRemoveUpload ({ response: { data } }, type) {
      const fileUrl = data.split(';')[1]
      const res = await this.handleRemoveImg(fileUrl)
      if (res && res.code === 200) {
        switch (type) {
          case 'licence':
            this.uploadLicenseInfo.fileList = []
            break
          case 'lawmanFront':
            this.uploadLawManFrontInfo.fileList = []
            break
          case 'lawmanBack':
            this.uploadLawManBackInfo.fileList = []
            break
          case 'contractOne':
            this.uploadContractOneInfo.fileList = []
            break
          case 'contractTwo':
            this.uploadContractTwoInfo.fileList = []
            break
          case 'contractThree':
            this.uploadContractThreeInfo.fileList = []
            break
          case 'contractFour':
            this.uploadContractFourInfo.fileList = []
            break
          case 'contractFive':
            this.uploadContractFiveInfo.fileList = []
            break
          case 'managerFront':
            this.uploadManagerFrontInfo.fileList = []
            break
          case 'managerBack':
            this.uploadManagerBackInfo.fileList = []
            break
          default:
            break
        }
      }
    },
    // 删除已上传图片
    async handleDeleteUpload (item, type) {
      const res = await this.handleRemoveImg(item)
      if (res && res.code === 200) {
        switch (type) {
          case 'licence':
            this.uploadLicenseInfo.showOffList = {}
            break
          case 'lawmanFront':
            this.uploadLawManFrontInfo.showOffList = {}
            break
          case 'lawmanBack':
            this.uploadLawManBackInfo.showOffList = {}
            break
          case 'contractOne':
            this.uploadContractOneInfo.showOffList = {}
            break
          case 'contractTwo':
            this.uploadContractTwoInfo.showOffList = {}
            break
          case 'contractThree':
            this.uploadContractThreeInfo.showOffList = {}
            break
          case 'contractFour':
            this.uploadContractFourInfo.showOffList = {}
            break
          case 'contractFive':
            this.uploadContractFiveInfo.showOffList = {}
            break
          case 'managerFront':
            this.uploadManagerFrontInfo.showOffList = {}
            break
          case 'managerBack':
            this.uploadManagerBackInfo.showOffList = {}
            break
          default:
            break
        }
      }
    },
    disabledDate (current) {
      return current && current < moment().startOf('day')
    },
    // 预览照片 - 打开
    handlePreviewImg (file) {
      if (file && file.winPath && file.winPath.endsWith('.pdf')) {
        window.open(file.winPath, '_blank')
        return
      }
      this.modalInfo = {
        title: file.name || '查看大图',
        src: file.thumbUrl || file.winPath,
        previewVisible: true
      }
    },
    handleServiceTimeChange (date, dateString) {
      this.serviceStartTime = dateString[0]
      this.serviceEndTime = dateString[1]
      this.serviceExp = date
    },
    handlePowerSee () {
      const {
        form: { getFieldValue }
      } = this
      const powerSee = getFieldValue('powerSee')
      if (powerSee) {
        let insResourceMapList = []
        powerSee.forEach(item => {
          insResourceMapList.push({ resourceId: item })
        })
        return insResourceMapList
      }
      return []
    },
    handleSubmitImgUrl () {
      const {
        form: { validateFields, getFieldsValue },
        uploadLicenseInfo,
        uploadLawManFrontInfo,
        uploadLawManBackInfo,
        uploadContractOneInfo,
        uploadContractTwoInfo,
        uploadContractThreeInfo,
        uploadContractFourInfo,
        uploadContractFiveInfo,
        uploadManagerFrontInfo,
        uploadManagerBackInfo
      } = this
      const {
        licenceNumber,
        licenceTypeOne,
        licenceTypeTwo,
        licenceTypeThree,
        licenceTypeFour,
        licenceTypeFive,
        idCardNum
      } = getFieldsValue([
        'licenceNumber',
        'licenceTypeOne',
        'licenceTypeTwo',
        'licenceTypeThree',
        'licenceTypeFour',
        'licenceTypeFive',
        'idCardNum'
      ])

      let pnoFront = ''
      let pnoBack = ''
      let institutionUrl = ''
      let manageFront = ''
      let manageBack = ''
      let contractList = []

      pnoFront = uploadLawManFrontInfo.fileList.length
        ? uploadLawManFrontInfo.fileList[0].response.data
        : uploadLawManFrontInfo.showOffList.winPath
          ? `${uploadLawManFrontInfo.showOffList.winPath};${uploadLawManFrontInfo.showOffList.fileUrl}`
          : ''
      pnoBack = uploadLawManBackInfo.fileList.length
        ? uploadLawManBackInfo.fileList[0].response.data
        : uploadLawManBackInfo.showOffList.winPath
          ? `${uploadLawManBackInfo.showOffList.winPath};${uploadLawManBackInfo.showOffList.fileUrl}`
          : ''
      institutionUrl = uploadLicenseInfo.fileList.length
        ? uploadLicenseInfo.fileList[0].response.data
        : uploadLicenseInfo.showOffList.winPath
          ? `${uploadLicenseInfo.showOffList.winPath};${uploadLicenseInfo.showOffList.fileUrl}`
          : ''
      manageFront = uploadManagerFrontInfo.fileList.length
        ? uploadManagerFrontInfo.fileList[0].response.data
        : uploadManagerFrontInfo.showOffList.winPath
          ? `${uploadManagerFrontInfo.showOffList.winPath};${uploadManagerFrontInfo.showOffList.fileUrl}`
          : ''
      manageBack = uploadManagerBackInfo.fileList.length
        ? uploadManagerBackInfo.fileList[0].response.data
        : uploadManagerBackInfo.showOffList.winPath
          ? `${uploadManagerBackInfo.showOffList.winPath};${uploadManagerBackInfo.showOffList.fileUrl}`
          : ''

      // 处理合同
      contractList = [
        {
          url: uploadContractOneInfo.fileList.length
            ? uploadContractOneInfo.fileList[0].response.data
            : uploadContractOneInfo.showOffList.winPath
              ? `${uploadContractOneInfo.showOffList.winPath};${uploadContractOneInfo.showOffList.fileUrl}`
              : '',
          ctype: licenceTypeOne
        },
        {
          url: uploadContractTwoInfo.fileList.length
            ? uploadContractTwoInfo.fileList[0].response.data
            : uploadContractTwoInfo.showOffList.winPath
              ? `${uploadContractTwoInfo.showOffList.winPath};${uploadContractTwoInfo.showOffList.fileUrl}`
              : '',
          ctype: licenceTypeTwo
        },
        {
          url: uploadContractThreeInfo.fileList.length
            ? uploadContractThreeInfo.fileList[0].response.data
            : uploadContractThreeInfo.showOffList.winPath
              ? `${uploadContractThreeInfo.showOffList.winPath};${uploadContractThreeInfo.showOffList.fileUrl}`
              : '',
          ctype: licenceTypeThree
        },
        {
          url: uploadContractFourInfo.fileList.length
            ? uploadContractFourInfo.fileList[0].response.data
            : uploadContractFourInfo.showOffList.winPath
              ? `${uploadContractFourInfo.showOffList.winPath};${uploadContractFourInfo.showOffList.fileUrl}`
              : '',
          ctype: licenceTypeFour
        },
        {
          url: uploadContractFiveInfo.fileList.length
            ? uploadContractFiveInfo.fileList[0].response.data
            : uploadContractFiveInfo.showOffList.winPath
              ? `${uploadContractFiveInfo.showOffList.winPath};${uploadContractFiveInfo.showOffList.fileUrl}`
              : '',
          ctype: licenceTypeFive
        }
      ]
      contractList = contractList.filter(item => item.url !== '')

      return {
        institutionUrl,
        pnoFront,
        pnoBack,
        manageFront,
        manageBack,
        contractList
      }
    },
    // 提交
    handleSubmit () {
      const {
        id,
        form: { validateFields, getFieldsValue, setFieldsValue },
        serviceStartTime,
        serviceEndTime,
        uploadLawManFrontInfo,
        uploadLawManBackInfo
      } = this
      const {
        licenceNumber,
        lawMan,
        licenceTypeOne,
        licenceTypeTwo,
        licenceTypeThree,
        licenceTypeFour,
        licenceTypeFive,
        managerName,
        idCardNum,
        phone,
        email,
        position,
        powerSee
      } = getFieldsValue([
        'licenceNumber',
        'lawMan',
        'licenceTypeOne',
        'licenceTypeTwo',
        'licenceTypeThree',
        'licenceTypeFour',
        'licenceTypeFive',
        'managerName',
        'idCardNum',
        'phone',
        'email',
        'position',
        'powerSee'
      ])
      const {
        institutionUrl,
        pnoFront,
        pnoBack,
        manageFront,
        manageBack,
        contractList
      } = this.handleSubmitImgUrl()

      // const reg = /^[0-9]*$/
      // if (!reg.test(licenceNumber)) {
      //   this.$notification.error({
      //     message: '营业执照编号为纯数字，请修改！'
      //   })
      //   return
      // }
      // 上传了但未选择协议
      const len = contractList.filter(item => item.ctype === undefined).length
      if (!institutionUrl) {
        this.$notification.error({
          message: '请上传营业执照！'
        })
        return
      } else if (!contractList.length) {
        this.$notification.error({
          message: '请至少上传一张合同照片！'
        })
        return
      } else if (len) {
        this.$notification.error({
          message: '请为合同照片选择协议！'
        })
        return
      } else if (!manageFront || !manageBack) {
        this.$notification.error({
          message: '请补全身份证照片！'
        })
        return
      } else if (
        (uploadLawManFrontInfo.fileList.length ||
					uploadLawManBackInfo.fileList.length) &&
				!lawMan
      ) {
        this.$notification.error({
          message: '如上传法人身份证，请填写身份证号'
        })
        return
      }

      let param = {
        id,
        createBy: JSON.parse(Vue.ls.get('USERINFO')).username,
        institutionNo: licenceNumber,
        institutionUrl: institutionUrl,
        artificialPerson: lawMan,
        pnoFront: pnoFront,
        pnoBack: pnoBack,
        manageUse: managerName,
        phone: phone,
        occupation: position,
        managePno: idCardNum,
        manageFront: manageFront,
        manageBack: manageBack,
        email: email,
        startTime: serviceStartTime,
        endTime: serviceEndTime,
        contractList: contractList,
        insResourceMapList: this.handlePowerSee()
      }
      validateFields(
        [
          'licenceNumber',
          'licenceTypeOne',
          'managerName',
          'email',
          'position',
          'phone',
          'idCardNum',
          'powerSee',
          'serviceExp'
        ],
        { first: true, force: true },
        async err => {
          if (!err) {
            try {
              const res = await modifyInsPage(param)
              if (res.code === 200) {
                this.$notification.success({
                  message: res.msg || '提交成功!'
                })
                this.$router.push({
                  path: '/institutionsmanage/instituApplication',
                  query: {
                    type: 1
                  }
                })
              } else {
                throw new Error(res.msg)
              }
            } catch ({ message }) {
              this.$notification.error({
                message: message || '提交失败，请重试!'
              })
            }
          }
        }
      )
    },
    // 返回
    handleBack () {
      const {
        $route: {
          query: { type }
        }
      } = this
      this.$router.push({
        path: '/institutionsmanage/instituApplication',
        query: {
          type: Number(type)
        }
      })
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
        default:
          return '基金'
      }
    }
  }
}
</script>

<style lang="less">
.editInsititutionWrapper {
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
		.ant-input {
			width: 180px;
		}
		.specRangeWrapper {
			.ant-input {
				width: 100%;
			}
		}
		.specUpWrapper {
			display: flex;
			justify-content: flex-start;
			& > div {
				margin-right: 10px;
			}
		}
		.muchUpWrapper {
			display: flex;
			justify-content: space-between;
			& > div {
				margin-right: 10px;
			}
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
