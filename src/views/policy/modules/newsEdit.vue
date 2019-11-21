<template>
	<div class="newsEditWrapper">
		<a-form layout="horizontal"
			:form="form">
			<a-row>
				<a-col :span="6">
					<a-form-item>
						<a-upload class="uploadWrapper"
							v-if="covePicturePath == ''"
							listType="picture-card"
							:headers='myHeaders'
							:action="uploadUrl"
							:fileList="fileList"
							@preview="handlePreviewImg"
							@change="handleUploadChange"
							:remove="handleRemoveUpload"
							name="multipartFile">
							<div v-if="fileList.length<1">
								<a-icon type="plus"></a-icon>
								<div className="ant-upload-text">选择封面</div>
							</div>
						</a-upload>
						<div v-else>
							<img :src="covePicturePath"
								style="width:100px;margin-right:20px;">
							<a-button type="danger"
								@click="handleRemoveUpload">删除图片</a-button>
						</div>
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<a-form-item label="标题："
						:label-col="{span:1}">
						<a-input style="max-width:450px;"
							placeholder="请输入"
							v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
        ]" />
					</a-form-item>
					<a-form-item label="作者："
						:label-col="{span:1}">
						<a-input style="max-width:250px;"
							placeholder="请输入"
							v-decorator="['editor']" />
					</a-form-item>
					<a-row>
						<a-col :span="8">
							<a-form-item label="发布时间："
								:label-col="{span:5}">
								<a-date-picker showTime
									format="YYYY-MM-DD HH:mm:ss"
									placeholder="选择时间"
									v-decorator="['pTime']" />
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="操作："
								:label-col="{span:2}">
								<a-checkbox-group :options="plainOptions"
									v-decorator="['checkedList']" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="9">
							<a-form-item label="发布到："
								:label-col="{span:4}">
								<a-radio-group v-decorator="[
          'showType',
          {rules: [{ required: true, message: '请选择发布位置！', trigger: 'change' }]}
        ]">
									<a-radio value="3">保险课堂</a-radio>
								</a-radio-group>
							</a-form-item>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
			<a-row style="margin:50px;">
				<a-col :span="6">
					<a-form-item label="资讯类型："
						:label-col="{span:5}">
						<a-select style="max-width:200px;"
							placeholder="请选择"
							v-decorator="[
          'inforDomain',
          {rules: [{ required: true, message: '请选择资讯类型！', trigger: 'change' }]}
        ]">
							<a-select-option value="3">保险课堂</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="内容分类："
						:label-col="{span:5}">
						<a-select placeholder="请选择"
							style="max-width:250px;"
							v-decorator="[
          'category',
          {rules: [{ required: true, message: '请选择内容分类！', trigger: 'change' }]}
        ]">
							<a-select-option value="110">监管类</a-select-option>
							<a-select-option value="111">信批类</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="资讯性质："
						:label-col="{span:5}">
						<a-select style="max-width:250px;"
							placeholder="请选择"
							v-decorator="[
          'categoryType',
          {rules: [{ required: true, message: '请选择资讯性质！', trigger: 'change' }]}
        ]">
							<a-select-option value="2126">正面</a-select-option>
							<a-select-option value="2127">负面</a-select-option>
							<a-select-option value="2128">中性</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="风险分类："
						:label-col="{span:5}">
						<a-cascader :options="dangerList"
							:displayRender="displayRender"
							expandTrigger="hover"
							placeholder="请选择"
							style="max-width:250px;"
							v-decorator="['danger']" />
					</a-form-item>
					<a-form-item label="来源网站："
						:label-col="{span:5}">
						<a-input placeholder="请输入"
							style="max-width:250px;"
							v-decorator="[
          'sourceform',
          {rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
        ]" />
					</a-form-item>
					<a-form-item label="关键字："
						:label-col="{span:5}">
						<a-input placeholder="多个关键字之间用英文逗号隔开"
							style="max-width:230px;"
							v-decorator="['topics']" />
					</a-form-item>
					<a-form-item label="标签："
						:label-col="{span:5}">
						<a-input placeholder="多个标签之间用英文逗号隔开"
							style="max-width:230px;"
							v-decorator="['tags']" />
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<Ue ref="ue" />
				</a-col>
			</a-row>
			<div class="block">
				<a-form-item>
					<a-button type="primary"
						@click="handleSave">
						保存
					</a-button>
					<a-button type="primary"
						@click="handleBack"
						style="margin-left:20px;">
						返回
					</a-button>
				</a-form-item>
			</div>
		</a-form>
		<div class="qrcode">
			<img :src="qrCode">
			<p>预览扫一扫</p>
		</div>
		<a-modal title="查看大图"
			:visible="previewVisible"
			:footer="null"
			@cancel="handlePreviewCancel">
			<img :src="imgUrl"
				style="width:100%;">
		</a-modal>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Ue } from '@/components'
import {
  getDangerList,
  getRemoveUpload,
  getNewsAddBanner,
  getFastCode,
  getCurrentInfo,
  specialUrl
} from '@/api/newsManage'
import { getUpdateInsurance } from '@/api/policy'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions: ['置顶', '启用'], // 多选项
      covePicturePath: '',
      queryParam: {
        id: '',
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        editor: '',
        sourceform: '',
        showType: '',
        topCategory: '',
        twoLevel: '',
        isEssence: '',
        tags: '',
        topics: '',
        isTop: '',
        state: '',
        type1: [],
        content: '',
        imgName: '',
        opinionType: '' || 2
      }, // 最终添加的参数
      uploadUrl: '',
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      isBanner: '', // 是否生成查到快报
      previewVisible: false,
      id: '',
      bannerFlag: '',
      qrCode: '',
      imgUrl: ''
    }
  },
  created () {
    this.uploadUrl = specialUrl.upload
    this.id = this.$route.query.id
    this.bannerFlag = this.$route.query.isBanner

    this.getDangerList()
    this.generateFastCode()
    this.getCurrentPageInfo()
  },
  methods: {
    // 获取当前页面信息
    getCurrentPageInfo () {
      getCurrentInfo({ id: this.id }).then(res => {
        const data = res.data
        this.bannerFlag = data.bannerFlag
        // 回绑
        this.handleCoverImg(data)
        this.handleBackUe(data)
        this.opinionType = data.opinionType || 2
        this.form.setFieldsValue({
          title: data.title,
          editor: data.editor,
          sourceform: data.sourceform,
          topics: data.topics,
          tags: data.tags,
          showType: data.showType.toString(),
          danger: this.handelBackDanger(data),
          inforDomain: data.inforDomain.toString(),
          category: data.category.toString(),
          categoryType: data.categoryType.toString(),
          pTime: moment(data.releaseDate),
          checkedList: this.handleBackCheckbox(data)
        })
      })
    },
    // 反向回绑ue
    handleBackUe (data) {
      this.$refs.ue.content = data.content
    },
    // 反向回绑图片
    handleCoverImg (data) {
      let str = data.covePicturePath
      this.covePicturePath = str
      this.fileName = str.substring(str.lastIndexOf('/') + 1)
    },
    // 反向回绑多选
    handleBackCheckbox (data) {
      let arr = []
      if (data && Number(data.isTop)) {
        arr.push('置顶')
      }
      if (data && Number(data.state)) {
        arr.push('启用')
      }
      return arr
    },
    // 处理回绑风险
    handelBackDanger (data) {
      let arr = []
      if (data.twoLevel) {
        arr.push(data.topCategory)
        arr.push(data.twoLevel)
      }
      arr = arr.length === 0 ? '' : arr
      return arr
    },
    // 生成快报二维码
    generateFastCode () {
      getFastCode({
        url: specialUrl.code + this.id,
        id: this.id
      }).then(res => {
        this.qrCode = res.data
      })
    },
    // 获取风险分类
    getDangerList () {
      getDangerList().then(res => {
        this.dangerList = res.data
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    // 处理多选
    handleCheckbox (list) {
      this.queryParam.isTop = list && list.includes('置顶') ? '1' : '0'
      this.queryParam.state = list && list.includes('启用') ? '1' : '0'
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleUploadChange ({ fileList }) {
      this.fileList = fileList

      if (
        fileList[0] &&
				fileList[0].response &&
				fileList[0].response.code === 200
      ) {
        this.fileName = fileList[0].response.data
      }
    },
    // 移除上传的图片
    handleRemoveUpload () {
      getRemoveUpload({
        fileName: this.fileName
      }).then(res => {
        if (res.code === 200) {
          this.fileName = ''
          this.covePicturePath = ''
        }
      })
    },
    handleSave () {
      let formObj = this.form.getFieldsValue([
        'title',
        'editor',
        'inforDomain',
        'category',
        'categoryType',
        'sourceform',
        'pTime',
        'danger',
        'topics',
        'tags',
        'showType',
        'checkedList'
      ])
      if (this.$refs.ue.content === '') {
        this.$notification.warning({
          message: '请在编辑器中输入内容'
        })
        return
      }
      if (this.fileName === '') {
        this.$notification.warning({
          message: '请上传封面图片'
        })
        return
      }

      this.form.validateFields(err => {
        if (!err) {
          this.handleCheckbox(formObj.checkedList)
          let pTime = this.handlePtime(formObj.pTime)

          this.queryParam.title = formObj.title || ''
          this.queryParam.editor = formObj.editor || ''
          this.queryParam.inforDomain = formObj.inforDomain || '3'
          this.queryParam.category = formObj.category || ''
          this.queryParam.categoryType = formObj.categoryType || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.topCategory = formObj.danger ? formObj.danger[0] : ''
          this.queryParam.twoLevel = formObj.danger ? formObj.danger[1] : ''
          this.queryParam.sourceform = formObj.sourceform || ''
          this.queryParam.topics = formObj.topics || ''
          this.queryParam.tags = formObj.tags || ''
          this.queryParam.showType = formObj.showType || '3'
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.id = this.id

          getUpdateInsurance(this.queryParam).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '更新成功！'
              })
              this.generateFastCode()

              if (this.isBanner) {
                let params = {
                  bannerFlag: this.isBanner,
                  informationId: this.id,
                  title: this.queryParam.title,
                  infomationUrl: specialUrl.code + this.id
                }
                getNewsAddBanner(params).then(res => {
                  console.log('快报生成/删除成功')
                })
              }
            } else {
              this.$notification.error({
                message: res.msg || '更新失败，请重试'
              })
            }
          })
        }
      })
    },
    // 预览图片
    handlePreviewImg (file) {
      this.imgUrl = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handlePreviewCancel () {
      this.imgUrl = ''
      this.previewVisible = false
    },
    handleBack () {
      this.$router.push('/policy/roomPolicyManagement')
    }
  }
}
</script>

<style lang="less" >
.newsEditWrapper {
	position: relative;
	.uploadWrapper {
		.ant-upload {
			width: 250px;
			height: 150px;
		}
	}
	.qrcode {
		position: absolute;
		right: 10px;
		top: 0;
		text-align: center;
		img {
			width: 180px;
		}
	}
}
</style>
