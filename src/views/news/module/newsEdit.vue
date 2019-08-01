<template>
	<div class="newsEditWrapper">
		<a-form layout="inline"
			:form="form">
			<div class="block">
				<a-form-item label="标题：">
					<a-input style="min-width:250px;"
						placeholder="请输入"
						v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
        ]" />
				</a-form-item>
				<a-form-item label="作者："
					style="margin-left:50px;">
					<a-input style="min-width:250px;"
						placeholder="请输入"
						v-decorator="['editor']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="咨询类型：">
					<a-select style="min-width:250px;"
						placeholder="请选择"
						v-decorator="[
          'inforDomain',
          {rules: [{ required: true, message: '请选择咨询类型！', trigger: 'change' }]}
        ]">
						<a-select-option value="1">信托</a-select-option>
						<a-select-option value="2">房产</a-select-option>
						<a-select-option value="3">私募基金</a-select-option>
						<a-select-option value="4">保险</a-select-option>
						<a-select-option value="5">理财</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="内容分类："
					style="margin-left:50px;">
					<a-select placeholder="请选择"
						style="min-width:250px;"
						v-decorator="[
          'category',
          {rules: [{ required: true, message: '请选择内容分类！', trigger: 'change' }]}
        ]">
						<a-select-option value="110">监管类</a-select-option>
						<a-select-option value="111">信批类</a-select-option>
					</a-select>
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="咨询性质：">
					<a-select style="min-width:250px;"
						placeholder="请选择"
						v-decorator="[
          'categoryType',
          {rules: [{ required: true, message: '请选择咨询性质！', trigger: 'change' }]}
        ]">
						<a-select-option value="2126">正面</a-select-option>
						<a-select-option value="2127">负面</a-select-option>
						<a-select-option value="2128">中性</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="发布时间："
					style="margin-left:50px;">
					<a-date-picker showTime
						format="YYYY-MM-DD HH:mm:ss"
						placeholder="选择时间"
						v-decorator="['pTime']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="风险分类：">
					<a-cascader :options="dangerList"
						:displayRender="displayRender"
						expandTrigger="hover"
						placeholder="请选择"
						style="min-width:250px;"
						v-decorator="['danger']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="来源网站：">
					<a-input placeholder="请输入"
						style="min-width:250px;"
						v-decorator="[
          'sourceform',
          {rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
        ]" />
				</a-form-item>
				<a-form-item label="关键字：">
					<a-input placeholder="多个关键字之间用英文逗号隔开"
						style="min-width:250px;"
						v-decorator="['topics']" />
				</a-form-item>
				<a-form-item label="标签：">
					<a-input placeholder="多个标签之间用英文逗号隔开"
						style="min-width:250px;"
						v-decorator="['tags']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="操作：">
					<a-checkbox-group :options="plainOptions"
						v-decorator="['checkedList']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="上传封面图片：">
					<a-upload v-if="queryParam.covePicturePath == ''"
						listType="picture-card"
						:headers='myHeaders'
						action="https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload"
						:fileList="fileList"
						:beforeUpload="handleBeforeUpload"
						@change="handleUploadChange"
						:remove="handleRemoveUpload"
						name="multipartFile">
						<div v-if="fileList.length<1">
							<a-icon type="plus"></a-icon>
							<div className="ant-upload-text">选择封面</div>
						</div>
					</a-upload>
					<div v-else>
						<img :src="queryParam.covePicturePath"
							style="width:100px;margin-right:20px;">
						<a-button type="danger"
							@click="deleteImg">删除图片</a-button>
					</div>
				</a-form-item>
			</div>
			<div class="block">
				<Ue ref="ue" />
			</div>
			<div class="block">
				<a-form-item>
					<a-button type="primary"
						@click="save">
						保存
					</a-button>
					<a-button type="primary"
						@click="back"
						style="margin-left:20px;">
						返回
					</a-button>
				</a-form-item>
			</div>
		</a-form>
		<div class="qrcode">
			<img :src="qrCode">
		</div>
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
  getUpdate
} from '@/api/newsManage'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions: ['热门', '置顶', '启用', '生成快报'], // 多选项
      queryParam: {
        id: '',
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        editor: '',
        sourceform: '',
        topCategory: '',
        twoLevel: '',
        isEssence: '',
        tags: '',
        topics: '',
        type1: [],
        content: '',
        imgName: '',
        covePicturePath: ''
      }, // 最终添加的参数
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      isBanner: '', // 是否生成查到快报
      id: '',
      bannerFlag: '',
      qrCode: ''
    }
  },
  created () {
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
        console.log('data', data)

        this.bannerFlag = data.bannerFlag
        // 回绑
        this.handleCoverImg(data)
        this.handleBackUe(data)
        this.form.setFieldsValue({
          title: data.title,
          editor: data.editor,
          sourceform: data.sourceform,
          topics: data.topics,
          tags: data.tags,
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
      this.queryParam.covePicturePath = data.covePicturePath
      this.queryParam.imgName = data.covePicturePath
    },
    // 反向回绑多选
    handleBackCheckbox (data) {
      // 处理多选
      let arr = []
      data && data.isHot ? arr.push('热门') : ''
      data && data.isTop ? arr.push('置顶') : ''
      data && Number(data.state) ? arr.push('启用') : ''
      if (this.bannerFlag === '1') {
        this.queryParam.type1.push('生成快报')
        arr.push('生成快报')
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
        url: 'https://testinfo.aifound.cn/newDetail.html?id=' + this.id,
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
      this.queryParam.isHot = list && list.includes('热门') ? '1' : '0'
      this.queryParam.isTop = list && list.includes('置顶') ? '1' : '0'
      this.queryParam.state = list && list.includes('启用') ? '1' : '0'
      this.isBanner = list && list.includes('生成快报') ? '1' : '0'
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    // 上传图片
    handleBeforeUpload () {},
    handleUploadChange ({ fileList }) {
      this.fileList = fileList
      console.log(fileList)

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
        if (res.code === 200) this.fileName = ''
      })
    },
    // 删除已存在图片
    deleteImg () {
      getRemoveUpload({
        fileName: this.queryParam.covePicturePath
      }).then(res => {
        if (res.code === 200) {
          this.queryParam.covePicturePath = ''
          this.queryParam.imgName = ''
        }
      })
    },
    save () {
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
        'checkedList'
      ])

      if (this.$refs.ue.content === '') {
        this.$notification.warning({
          message: '请在编辑器中输入内容'
        })
        return false
      }

      this.form.validateFields(err => {
        if (!err) {
          this.handleCheckbox(formObj.checkedList)
          let pTime = this.handlePtime(formObj.pTime)

          this.queryParam.title = formObj.title || ''
          this.queryParam.editor = formObj.editor || ''
          this.queryParam.inforDomain = formObj.inforDomain || ''
          this.queryParam.category = formObj.category || ''
          this.queryParam.categoryType = formObj.categoryType || ''
          this.queryParam.releaseDate = pTime || ''
          this.queryParam.topCategory = formObj.danger ? formObj.danger[0] : ''
          this.queryParam.twoLevel = formObj.danger ? formObj.danger[1] : ''
          this.queryParam.sourceform = formObj.sourceform || ''
          this.queryParam.topics = formObj.topics || ''
          this.queryParam.tags = formObj.tags || ''
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.type1 = formObj.checkedList || []
          this.queryParam.id = this.id

          console.log('queryParam', this.queryParam)

          getUpdate(this.queryParam).then(res => {
            this.$notification.success({
              message: '更新成功！'
            })
            this.generateFastCode()

            if (this.isBanner) {
              let params = {
                bannerFlag: this.isBanner,
                informationId: this.id,
                title: this.queryParam.title,
                infomationUrl:
									'https://testinfo.aifound.cn/newDetail.html?id=' + this.id
              }
              getNewsAddBanner(params).then(res => {
                console.log('快报生成/删除成功')
              })
            }
          })
        }
      })
    },
    back () {
      this.$router.push('/news')
    }
  }
}
</script>

<style lang="less" >
.newsEditWrapper {
	position: relative;
	.block {
		margin-top: 20px;
	}
	.qrcode {
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
