<template>
	<div class="addBrandWrapper">
		<h1>机构管理 - 新增/开通品牌</h1>
		<a-card :bordered="false"
			class="mainWrapper">
			<a-form layout="horizontal"
				:form="form">
				<a-form-item :label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<span slot='label'><em style="color:red;">*</em> 品牌LOGO：</span>
					<single-img-upload title="上传LOGO"
						:actionUrl="`${uploadUrl}?dic=0`"
						:uploadInfo="uploadLogoInfo"
						@handlePreviewImg="handlePreviewImg"
						@handleUploadChange="files=>handleUploadChange(files,'logo')"
						@handleRemoveUpload="files=>handleRemoveUpload(files,'logo')"
						@handleDeleteUpload="files => handleDeleteUpload(files,'logo')">
					</single-img-upload>
				</a-form-item>
				<a-form-item label="品牌名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<span>{{id ? brandInfo.brandName:brandName}}</span>
				</a-form-item>
				<a-form-item label="品牌介绍："
					class="textareaWrapper specialLabel"
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-textarea placeholder="请填写企业品牌介绍描述，最多填写500字哦～"
						:autosize="{ minRows: 2, maxRows: 6 }"
						maxLength="500"
						v-decorator="[
						'brandIntroduce',
						{rules: [{ required: true, message: '请输入品牌介绍！', trigger: 'change' }]}
					]"
						@change="e => handleIntroduceInput(e)" />
					<p class="tip">已填写{{hasInput}} / 500 字</p>
				</a-form-item>
				<a-form-item :label-col="{ span: 2 }"
					:wrapper-col="{ span: 9 }">
					<span slot='label'><em style="color:red;">*</em> 所属公司：</span>
					<dropdown-search ref="dropdownSearch"></dropdown-search>
				</a-form-item>
				<a-form-item label="营业执照编号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写营业执照编号"
						maxLength="50"
						v-decorator="['licenceNumber']"></a-input>
					<single-img-upload-new title="上传营业执照副本"
						:actionUrl="`${uploadUrl}?dic=1`"
						:uploadInfo="uploadLicenseInfo"
						@handlePreviewImg="handlePreviewImg"
						@handleUploadChange="files=>handleUploadChange(files,'licence')"
						@handleRemoveUpload="files=>handleRemoveUpload(files,'licence')">
					</single-img-upload-new>
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
							@handleRemoveUpload="files=>handleRemoveUpload(files,'lawmanFront')">
						</single-img-upload-new>
						<single-img-upload-new title="上传身份证（反面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadLawManBackInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'lawmanBack')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'lawmanBack')">
						</single-img-upload-new>
					</div>
				</a-form-item>
				<a-form-item label="合同上传："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<div class="muchUpWrapper">
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeOne']">
								<a-select-option v-for="item in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractOneInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractOne')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractOne')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeTwo']">
								<a-select-option v-for="item in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractTwoInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractTwo')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractTwo')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeThree']">
								<a-select-option v-for="item in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractThreeInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractThree')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractThree')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeFour']">
								<a-select-option v-for="item in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractFourInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractFour')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractFour')">
							</single-img-upload-new>
						</div>
						<div>
							<a-select placeholder="请选择协议类型"
								v-decorator="['licenceTypeFive']">
								<a-select-option v-for="item in certTypeList"
									:key="item.id"
									:value="item.id">{{item.name}}</a-select-option>
							</a-select>
							<single-img-upload-new title="上传合同文件"
								:actionUrl="`${uploadUrl}?dic=1`"
								:uploadInfo="uploadContractFiveInfo"
								@handlePreviewImg="handlePreviewImg"
								@handleUploadChange="files=>handleUploadChange(files,'contractFive')"
								@handleRemoveUpload="files=>handleRemoveUpload(files,'contractFive')">
							</single-img-upload-new>
						</div>
					</div>
				</a-form-item>
				<a-form-item label="品牌账号管理人："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写姓名"
						maxLength="50"
						v-decorator="[
          	'managerName']" />
				</a-form-item>
				<a-form-item label="身份证号："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder=" 请填写身份证号"
						maxLength="50"
						v-decorator="['idCardNum']"></a-input>
					<div class="specUpWrapper">
						<single-img-upload-new title="上传身份证（正面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadManagerFrontInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'managerFront')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'managerFront')">
						</single-img-upload-new>
						<single-img-upload-new title="上传身份证（反面）"
							:actionUrl="`${uploadUrl}?dic=1`"
							:uploadInfo="uploadManagerBackInfo"
							@handlePreviewImg="handlePreviewImg"
							@handleUploadChange="files=>handleUploadChange(files,'managerBack')"
							@handleRemoveUpload="files=>handleRemoveUpload(files,'managerBack')">
						</single-img-upload-new>
					</div>
				</a-form-item>
				<a-form-item label="联系电话："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写联系电话"
						maxLength="50"
						v-decorator="[
          	'phone',
								{rules: [{ required: true, message: '请填写联系电话!', trigger: 'change' }]}
							]" />
				</a-form-item>
				<a-form-item label="职位名称："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写职位名称"
						maxLength="50"
						v-decorator="['position']" />
				</a-form-item>
				<a-form-item label="邮箱："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }">
					<a-input placeholder="请填写邮箱"
						maxLength="50"
						v-decorator="['email']" />
				</a-form-item>
				<relate-company :companyNum="companyNum"
					:companyNumArr="companyNumArr"
					@handleAddCompany="handleAddCompany"
					@handleDelCompany="handleDelCompany"
					@selectCompany="selectCompany"></relate-company>
				<a-form-item label="服务期限："
					:label-col="{ span: 2 }"
					:wrapper-col="{ span: 12 }"
					class="specRangeWrapper">
					<a-range-picker @change="handleServiceTimeChange"
						:disabledDate="disabledDate"
						v-decorator="['serviceExp',
								{rules: [{ required: true, message: '请选择时间!', trigger: 'change',type:'array' }]}
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
	</div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import {
  uploadUrl,
  deleteFile,
  addBrandPageView,
  addBrandPageSave
} from '@/api/institution/addBrand'
import {
  SingleImgUploadNew,
  SingleImgUpload,
  PreviewImgModal
} from '@/components'
import { RelateCompany, DropdownSearch } from './../../components/index'

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
  },
  {
    id: '5',
    name: '其他费用协议'
  },
  {
    id: '6',
    name: '其他协议'
  }
]
export default {
  components: {
    SingleImgUploadNew,
    SingleImgUpload,
    PreviewImgModal,
    RelateCompany,
    DropdownSearch
  },
  data () {
    return {
      form: this.$form.createForm(this),
      id: '',
      brandName: '',
      brandInfo: {},
      certTypeList,
      hasInput: 0,
      companyNum: 0,
      companyNumArr: [],
      uploadLogoInfo: {
        fileList: [],
        showOffList: []
      },
      // 执照
      uploadLicenseInfo: {
        fileList: [],
        showOffList: {}
      },
      uploadLawManFrontInfo: {
        fileList: [],
        showOffList: {}
      },
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
      uploadUrl: {},
      serviceStartTime: '',
      serviceEndTime: ''
    }
  },
  created () {
    const {
      $route: {
        query: { id, brandName }
      }
    } = this
    this.uploadUrl = uploadUrl
    this.brandName = brandName
    this.id = id
    if (id) this.addBrandPageView()
  },
  methods: {
    // 获取概览信息-logo等
    async addBrandPageView () {
      try {
        const res = await addBrandPageView({ brandId: this.id })
        if (res.code === 200) {
          this.brandInfo = res.data
          this.form.setFieldsValue({
            brandIntroduce: res.data.description
          })
          this.$refs.dropdownSearch.inputText = res.data.belongCompany
          this.hasInput = res.data.description.length
          this.uploadLogoInfo.showOffList = this.backupImgInfo(res.data.logoUrl)
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试!'
        })
      }
    },
    // 回绑头像
    backupImgInfo (url) {
      let arr = url.split(';')
      return {
        winPath: arr[0],
        fileUrl: arr[1]
      }
    },
    // 直接上传
    handleUploadChange ({ fileList }, type) {
      switch (type) {
        case 'logo':
          this.uploadLogoInfo.fileList = fileList
          break
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
    // 移除待上传
    async handleRemoveUpload ({ response: { data } }, type) {
      const fileUrl = data.split(';')[1]
      const res = await this.handleRemoveImg(fileUrl)
      if (res && res.code === 200) {
        switch (type) {
          case 'logo':
            this.uploadLogoInfo.fileList = []
            break
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
        this.uploadLogoInfo.showOffList = {}
      }
    },
    disabledDate (current) {
      return current && current < moment().startOf('day')
    },
    handleServiceTimeChange (date, dateString) {
      this.serviceStartTime = dateString[0]
      this.serviceEndTime = dateString[1]
    },
    // 简介 - 添加
    handleIntroduceInput (e) {
      this.hasInput = e.target.value.length
    },
    // 预览照片 - 打开
    handlePreviewImg (file) {
      if (file && file.winPath && file.winPath.endsWith('.pdf')) {
        window.open(file.winPath, '_blank')
        return
      }
      this.modalInfo = {
        title: '查看大图',
        src: file.url || file.thumbUrl || file.winPath,
        previewVisible: true
      }
    },
    handleAddCompany () {
      const {
        form: { getFieldValue }
      } = this
      let companyName = getFieldValue('relateCompany')
      if (!companyName) {
        this.$notification.error({
          message: '请先填写再添加！'
        })
        return
      }
      if (
        this.companyNum > 0 &&
				this.companyNumArr[this.companyNum - 1].companyUrl === ''
      ) {
        this.$notification.error({
          message: '请先填写再添加！'
        })
        return
      }
      if (this.companyNum >= 19) {
        this.$notification.error({
          message: '最多关联20家公司！'
        })
        return
      }
      this.companyNum++
      this.companyNumArr.push({ companyUrl: '', companyName: '' })
    },
    handleDelCompany (item) {
      this.companyNumArr = this.companyNumArr.filter(el => {
        if (el.companyUrl !== item.companyUrl) {
          return true
        }
        this.companyNum--
        return false
      })
    },
    selectCompany (companyUrl) {
      this.companyNumArr[this.companyNum - 1].companyUrl = companyUrl
    },
    handleSubmitImgUrl () {
      const {
        form: { validateFields, getFieldsValue },
        uploadLogoInfo,
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

      let logoUrl = ''
      let pnoFront = ''
      let pnoBack = ''
      let licenseUrl = ''
      let manageFront = ''
      let manageBack = ''
      let contractList = []

      logoUrl = uploadLogoInfo.fileList.length && uploadLogoInfo.fileList[0].response
        ? uploadLogoInfo.fileList[0].response.data
        : uploadLogoInfo.showOffList.winPath
          ? `${uploadLogoInfo.showOffList.winPath};${uploadLogoInfo.showOffList.fileUrl}`
          : ''
      pnoFront = uploadLawManFrontInfo.fileList.length && uploadLawManFrontInfo.fileList[0].response
        ? uploadLawManFrontInfo.fileList[0].response.data
        : ''
      pnoBack = uploadLawManBackInfo.fileList.length && uploadLawManBackInfo.fileList[0].response
        ? uploadLawManBackInfo.fileList[0].response.data
        : ''
      licenseUrl = uploadLicenseInfo.fileList.length && uploadLicenseInfo.fileList[0].response
        ? uploadLicenseInfo.fileList[0].response.data
        : ''
      manageFront = uploadManagerFrontInfo.fileList.length && uploadManagerFrontInfo.fileList[0].response
        ? uploadManagerFrontInfo.fileList[0].response.data
        : ''
      manageBack = uploadManagerBackInfo.fileList.length && uploadManagerBackInfo.fileList[0].response
        ? uploadManagerBackInfo.fileList[0].response.data
        : ''

      // 处理合同
      contractList = [
        {
          url: uploadContractOneInfo.fileList.length
            ? uploadContractOneInfo.fileList[0].response.data
            : '',
          ctype: licenceTypeOne
        },
        {
          url: uploadContractTwoInfo.fileList.length
            ? uploadContractTwoInfo.fileList[0].response.data
            : '',
          ctype: licenceTypeTwo
        },
        {
          url: uploadContractThreeInfo.fileList.length
            ? uploadContractThreeInfo.fileList[0].response.data
            : '',
          ctype: licenceTypeThree
        },
        {
          url: uploadContractFourInfo.fileList.length
            ? uploadContractFourInfo.fileList[0].response.data
            : '',
          ctype: licenceTypeFour
        },
        {
          url: uploadContractFiveInfo.fileList.length
            ? uploadContractFiveInfo.fileList[0].response.data
            : '',
          ctype: licenceTypeFive
        }
      ]
      contractList = contractList.filter(item => item.url !== '')

      return {
        logoUrl,
        licenseUrl,
        pnoFront,
        pnoBack,
        manageFront,
        manageBack,
        contractList
      }
    },
    _uniqueArr (arr) {
      let hash = {}
      arr = arr.reduce((item, next) => {
        // eslint-disable-next-line
				hash[next.companyUrl]
          ? ''
          : (hash[next.companyUrl] = true && item.push(next))
        return item
      }, [])
      return arr
    },
    handleSubmit () {
      const {
        form: { validateFields, getFieldsValue, setFieldsValue },
        $notification: { success, error },
        id,
        brandInfo,
        brandName,
        serviceStartTime,
        serviceEndTime,
        companyUrl,
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
        brandIntroduce,
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
        relateCompany
      } = getFieldsValue([
        'brandIntroduce',
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
        'relateCompany'
      ])

      // const reg = /^[0-9]*$/
      // if (!reg.test(licenceNumber)) {
      //   this.$notification.error({
      //     message: '营业执照编号为纯数字，请修改！'
      //   })
      //   return
      // }
      const {
        logoUrl,
        licenseUrl,
        pnoFront,
        pnoBack,
        manageFront,
        manageBack,
        contractList
      } = this.handleSubmitImgUrl()

      // 上传了但未选择协议
      const len = contractList.filter(item => item.ctype === undefined).length
      if (!logoUrl) {
        error({
          message: '请上传品牌LOGO！'
        })
        return
      } else if (this.$refs.dropdownSearch.inputText === '') {
        error({
          message: '请输入所属公司'
        })
        return
      } else if (len) {
        error({
          message: '请为合同照片选择协议！'
        })
        return
      }
      let companyArr = []
      if (relateCompany !== '' && relateCompany !== undefined) {
        companyArr = this._uniqueArr(
          [{ companyUrl: relateCompany }].concat(this.companyNumArr)
        )
      }
      let param = {
        id,
        logoUrl,
        brandName: id ? brandInfo.brandName : brandName,
        description: brandIntroduce,
        belongCompany: this.$refs.dropdownSearch.inputText,
        licenseNo: licenceNumber,
        licenseUrl: licenseUrl,
        artificialPerson: lawMan,
        pnoFront: pnoFront,
        pnoBack: pnoBack,
        manageUse: managerName,
        pno: idCardNum,
        manageFront: manageFront,
        manageBack: manageBack,
        phone: phone,
        occupation: position,
        email: email,
        startTime: serviceStartTime,
        endTime: serviceEndTime,
        contractList: contractList,
        companyList: companyArr,
        createBy: JSON.parse(Vue.ls.get('USERINFO')).username
      }

      validateFields(
        ['brandIntroduce', 'belongCompany', 'phone', 'serviceExp'],
        { first: true, force: true },
        async err => {
          if (!err) {
            try {
              const res = await addBrandPageSave(param)
              if (res.code === 200) {
                this.$notification.success({
                  message: res.msg || '提交成功!'
                })
                this.handleBack()
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
    handleBack () {
      this.$router.push({
        path: '/institutionsmanage/instituApplication'
      })
    }
  }
}
</script>

<style lang="less">
.addBrandWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mainWrapper {
		.ant-input {
			width: 180px;
		}
		.specRangeWrapper {
			.ant-input {
				width: 100%;
			}
		}
		.muchUpWrapper {
			display: flex;
			justify-content: space-between;
			& > div {
				margin-right: 10px;
			}
		}
		.specialLabel {
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
		.btnWrapper {
			margin-top: 50px;
			.ant-btn {
				margin-right: 10px;
			}
		}
	}
}
</style>
