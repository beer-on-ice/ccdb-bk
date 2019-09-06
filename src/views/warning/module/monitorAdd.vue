<template>
	<div class="monitorAddWrapper">
		<a-form layout="horizontal"
			:form="form">
			<a-row>
				<a-col :span="6">
					<a-form-item>
						<a-upload class="uploadWrapper"
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
					</a-form-item>
				</a-col>
				<a-col :span="18">
					<a-form-item label="标题："
						:label-col="{span:1}">
						<a-input style="max-width:250px;"
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
								<a-radio-group :options="plainOptions"
									v-model="queryParam.opinionType" />
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
							<a-select-option value="1">信托</a-select-option>
							<a-select-option value="2">房产</a-select-option>
							<a-select-option value="3">私募基金</a-select-option>
							<a-select-option value="4">保险</a-select-option>
							<a-select-option value="5">理财</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="内容分类："
						:label-col="{span:5}">
						<a-select placeholder="请选择"
							style="max-width:200px;"
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
						<a-select style="max-width:200px;"
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
							style="max-width:200px;"
							v-decorator="['danger']" />
					</a-form-item>
					<a-form-item label="来源网站："
						:label-col="{span:5}">
						<a-input placeholder="请输入"
							style="max-width:200px;"
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
						<a-auto-complete class="global-search"
							style="max-width: 230px"
							@select="handleTagsSelect"
							@search="tagsQuerySearch"
							placeholder="请输入内容"
							optionLabelProp="text">
							<template slot="dataSource">
								<a-select-option v-for="item in tagsSearchResult"
									:key="item.id"
									:text="item.category">
									<div v-html="item.category"></div>
								</a-select-option>
							</template>
						</a-auto-complete>
					</a-form-item>
					<div v-if="newTags.length">
						<h4>新增标签：</h4>
						<ul class='newTagWrapper'>
							<li v-for="item in newTags"
								:key="item">
								<span v-html="item" />
								<a-icon type="close"
									@click="handleDelTag(item,0)" />
							</li>
						</ul>
					</div>
					<div v-if="oldTags.length">
						<h4>默认标签：</h4>
						<ul class='newTagWrapper'>
							<li v-for="item in oldTags"
								:key="item">
								<span v-html="item" />
								<a-icon type="close"
									@click="handleDelTag(item,1)" />
							</li>
						</ul>
					</div>
				</a-col>
				<a-col :span="18">
					<Ue ref="ue" />
				</a-col>
			</a-row>
		</a-form>
		<div>
			<a-button type="primary"
				@click="handleSave">
				保存
			</a-button>
			<a-button type="primary"
				@click="handlePreview"
				v-show="isSave"
				style="margin-left:20px;">
				预览
			</a-button>
			<a-button type="primary"
				@click="handleBack"
				style="margin-left:20px;">
				返回
			</a-button>
		</div>
		<a-modal :title="modalTitle"
			:visible="previewVisible"
			:footer="null"
			class="previewModal"
			@cancel="handlePreviewCancel">
			<img :src="qrCode"
				style="width:100%;">
		</a-modal>
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
  getNewsAddBanner,
  getFastCode,
  specialUrl
} from '@/api/newsManage'
import { getkeywordSystem } from '@/api/warning'

export default {
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions: [
        {
          value: 1,
          label: '周边舆情'
        },
        {
          value: 2,
          label: '自身舆情'
        }
      ],
      previewVisible: false,
      modalTitle: '',
      qrCode: '',
      id: '',
      uploadUrl: '',
      isSave: false, // 是否保存
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
        showType: '',
        tags: '',
        topics: '',
        type1: [],
        content: '',
        imgName: '',
        covePicturePath: '',
        opinionType: 1
      }, // 最终添加的参数
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      isBanner: '', // 是否生成查到快报
      newTags: [], // 新添加的标签
      oldTags: [], // 已存在的标签
      tagsSearchResult: [] // 搜索到的标签列表
    }
  },
  created () {
    this.handleInitInfo()
    this.getDangerList()
  },
  methods: {
    // 获取风险分类
    getDangerList () {
      getDangerList().then(res => {
        this.dangerList = res.data
      })
    },
    handleInitInfo () {
      this.uploadUrl = specialUrl.upload

      if (this.$route.params.info.modalInfo.administratorName) {
        this.oldTags.push(this.$route.params.info.modalInfo.administratorName)
      }
      if (this.$route.params.info.modalInfo.productName) {
        this.oldTags.push(this.$route.params.info.modalInfo.productName)
      }
      if (this.$route.params.info.modalInfo.managerName) {
        this.oldTags.push(this.$route.params.info.modalInfo.managerName)
      }
    },
    // 实时搜索标签
    tagsQuerySearch (queryString) {
      this.tagsSearchResult = queryString ? this.searchResult(queryString) : []
    },
    // 实时搜索标签 - 搜索结果
    searchResult (query) {
      let arr = []
      getkeywordSystem({ keyword: query }).then(res => {
        res.data.forEach(item => {
          arr.push({
            query,
            category: item.keyword,
            identity: item.identity,
            id: item.id
          })
        })
      })
      return arr
    },
    // 实时搜索标签 - 选择标签
    handleTagsSelect (item, option) {
      this.newTags.push(option.data.attrs.text)
      this.newTags = this.unique(this.newTags)
    },
    unique (arr) {
      return [...new Set(arr)]
    },
    // 实时搜索标签 - 删除标签
    handleDelTag (el, type) {
      if (type) {
        this.oldTags = this.oldTags.filter(item => item !== el)
      } else {
        this.newTags = this.newTags.filter(item => item !== el)
      }
    },
    // 保存
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
        'showType',
        'topics',
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
          this.queryParam.showType = formObj.showType || ''
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.content = this.$refs.ue.content || ''
          let tagArr = this.newTags.concat(this.oldTags)
          this.queryParam.tags = tagArr.join(',')

          getNewsAdd(this.queryParam).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '保存成功！'
              })

              if (this.isBanner === '1') {
                let params = {
                  bannerFlag: '1',
                  informationId: res.data,
                  title: this.queryParam.title,
                  infomationUrl: specialUrl.code + res.data
                }
                getNewsAddBanner(params).then(resp => {
                  if (resp.code === 200) console.log('快报生成成功')
                })
              }
              this.id = res.data
              this.isSave = true
              this.$router.push({
                path: '/warning/monitor'
                // query: { id: res.data }
              })
            } else {
              this.$notification.error({
                message: '保存失败，请重试！'
              })
              this.isSave = false
            }
          })
        }
      })
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
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    // 移除上传的图片
    handleRemoveUpload () {
      getRemoveUpload({
        fileName: this.fileName
      }).then(res => {
        if (res.code === 200) this.fileName = ''
      })
    },
    // 预览图片
    handlePreviewImg (file) {
      this.qrCode = file.url || file.thumbUrl
      this.modalTitle = '查看大图'
      this.previewVisible = true
    },
    // 预览 // 生成快报二维码
    handlePreview () {
      getFastCode({
        url: specialUrl.code + this.id,
        id: this.id
      }).then(res => {
        if (res.code === 200) {
          this.modalTitle = '扫码预览'
          this.qrCode = res.data
          this.previewVisible = true
        } else {
          this.$notification.error({
            message: '生成二维码失败，请重试！'
          })
        }
      })
    },
    handlePreviewCancel () {
      this.qrCode = ''
      this.previewVisible = false
    },
    handleBack () {
      this.$router.push('/warning/monitor')
    }
  }
}
</script>

<style lang="less" >
.monitorAddWrapper {
	.uploadWrapper {
		.ant-upload {
			width: 250px;
			height: 150px;
		}
	}
	.previewModal {
		.ant-modal-body {
			text-align: center;
		}
	}
	.newTagWrapper {
		background: #fff;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20px;
		}
	}
}
</style>
