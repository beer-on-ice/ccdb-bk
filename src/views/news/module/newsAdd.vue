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
				<a-form-item label="标签：">
					<a-checkbox-group :options="plainOptions"
						v-decorator="['checkedList']" />
				</a-form-item>
			</div>
			<div class="block">
				<a-form-item label="上传封面图片：">
					<a-upload listType="picture-card"
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
	</div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Ue } from '@/components'
import moment from 'moment'

import {
  getDangerList,
  getNewsAdd,
  getRemoveUpload,
  getNewsAddBanner
} from '@/api/newsManage'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions: ['热门', '置顶', '启用', '生成快报'], // 多选项
      queryParam: {
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
      isBanner: '' // 是否生成查到快报
    }
  },
  created () {
    this.getDangerList()
  },
  methods: {
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
        return
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

          getNewsAdd(this.queryParam).then(res => {
            this.$notification.success({
              message: '保存成功！'
            })
            if (this.isBanner === '1') {
              let params = {
                bannerFlag: '1',
                informationId: res.data,
                title: this.queryParam.title,
                infomationUrl:
									'https://testinfo.aifound.cn/newDetail.html?id=' + res.data
              }
              getNewsAddBanner(params).then(resp => {
                if (resp.code === 200) {
                  console.log('快报生成成功')
                  // 跳转到编辑
                  this.$router.push({
                    path: '/news/newsedit',
                    query: {
                      id: res.data,
                      isBanner: '1'
                    }
                  })
                }
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
	.block {
		margin-top: 20px;
	}
}
</style>
