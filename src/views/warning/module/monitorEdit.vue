<template>
	<div class="monitorEditWrapper">
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
								<a-radio-group :options="plainOptions"
									v-model="queryParam.opinionType" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-form-item label="摘要："
						:label-col="{span:1}"
						:wrapper-col="{ span: 22 }">
						<a-textarea placeholder="请输入摘要"
							maxLength="200"
							allowClear
							v-decorator="['abstractContent',
								{rules: [{ required: true, message: '请输入摘要!', trigger: 'change',type:'string' }]}
							]" />
					</a-form-item>
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
							<a-select-option value="6">证券</a-select-option>
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
					<a-form-item label="自定义标签："
						:label-col="{span:5}">
						<a-input style="max-width: 230px"
							placeholder="多个标签请用英文逗号隔开"
							v-decorator="['tags']" />
					</a-form-item>
					<a-form-item label="标签搜索："
						:label-col="{span:5}">
						<a-auto-complete class="global-search"
							style="max-width: 230px"
							@select="handleTagsSelect"
							@search="tagsQuerySearch"
							v-model="searchkey"
							placeholder="请输入内容"
							optionLabelProp="text">
							<template slot="dataSource">
								<a-select-option v-for="item in tagsSearchResult"
									:key="item.category"
									:text="delHtmlTag(item.category).split(' ')[0]"
									:obj="item">
									<div v-html="item.category"></div>
								</a-select-option>
							</template>
						</a-auto-complete>
						<p style="color:red;margin-left:80px;">* 请不要添加重复标签</p>
					</a-form-item>
					<div v-if="newTags.length">
						<h4>新增标签：</h4>
						<ul class='newTagWrapper'>
							<li v-for="item in newTags"
								:key="item.keywordId">
								<span>{{item.keyword}}</span>
								<a-icon type="close"
									@click="handleDelTag(item,0)" />
							</li>
						</ul>
					</div>
					<div v-if="oldTags.length">
						<h4>默认标签：</h4>
						<ul class='newTagWrapper'>
							<li v-for="item in oldTags"
								:key="item.keywordId">
								<span>{{item.keyword}}</span>
								<a-popconfirm title="确定要删除默认标签吗？"
									@confirm="handleDelTag(item,1)"
									okText="确认"
									cancelText="取消">
									<a-icon type="close" />
								</a-popconfirm>
							</li>
						</ul>
					</div>
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
  getUpdate,
  specialUrl,
  getCurrentInfo,
  getkeywordSystem
} from '@/api/warning'

export default {
  name: 'monitorEdit',
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
      ], // 单选
      covePicturePath: '',
      // 最终添加的参数
      queryParam: {
        id: '',
        title: '',
        inforDomain: '',
        category: '',
        categoryType: '',
        releaseDate: '',
        oldReleaseDate: '',
        editor: '',
        sourceform: '',
        showType: '',
        topCategory: '',
        twoLevel: '',
        isEssence: '',
        tags: '',
        tagList: [],
        topics: '',
        content: '',
        imgName: '',
        type1: [],
        opinionType: 1,
        oldOpinionType: ''
      },
      imgUrl: '', // 查看大图的地址
      uploadUrl: '', // 上传的图片地址
      fileList: [], // 上传的图片列表
      fileName: '', // 上传后返回的图片名称
      dangerList: [], // 级联列表-风险
      isBanner: '', // 是否生成查到快报
      previewVisible: false, // 能否预览
      qrCode: '', // 二维码地址
      info: {}, // 舆情信息
      newTags: [], // 新添加的标签
      oldTags: [], // 已存在的标签
      tagsSearchResult: [], // 搜索到的标签列表
      searchkey: ''
    }
  },
  created () {
    this.handleBackCurrentTag()

    this.getDangerList()
    this.generateFastCode()
    this.getCurrentPageInfo()
  },
  methods: {
    // 获取当前页面信息
    getCurrentPageInfo () {
      getCurrentInfo({ id: this.info.id }).then(res => {
        const data = res.data

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
          abstractContent: data.abstractContent
        })
        this.queryParam.oldReleaseDate = data.releaseDate
        this.queryParam.opinionType = data.opinionType
        this.queryParam.oldOpinionType = data.opinionType

        if (data && data.tagList && data.tagList.length) {
          this.oldTags = [].concat(data.tagList)
        }
      })
    },
    // 反向-绑定已有标签
    handleBackCurrentTag () {
      this.uploadUrl = specialUrl.upload
      this.info = this.$route.params.info
    },
    // 反向-回绑ue
    handleBackUe (data) {
      this.$refs.ue.content = data.content
    },
    // 反向-回绑图片
    handleCoverImg (data) {
      let str = data.covePicturePath
      this.covePicturePath = str
      this.fileName = str.substring(str.lastIndexOf('/') + 1)
    },
    // 反向-回绑风险
    handelBackDanger (data) {
      let arr = []
      if (data.twoLevel) {
        arr.push(data.topCategory)
        arr.push(data.twoLevel)
      }
      arr = arr.length === 0 ? '' : arr
      return arr
    },
    // 实时搜索标签
    tagsQuerySearch (queryString) {
      this.tagsSearchResult = queryString ? this.searchResult(queryString) : []
    },
    searchResult (query) {
      let arr = []
      getkeywordSystem({ keyword: query }).then(res => {
        res.data.forEach(item => {
          arr.push({
            query,
            category: item.keyword,
            identity: item.identity,
            keywordId: item.keywordId,
            type: item.type,
            id: item.id
          })
        })
      })
      return arr
    },
    // 选择标签
    handleTagsSelect (item, option) {
      let str = this.delHtmlTag(option.data.attrs.text)
      let obj = option.data.attrs.obj
      let result = {
        keyword: str,
        keywordId: obj.keywordId,
        type: obj.type
      }
      this.newTags.push(result)
      this.newTags = this.uniqueTag(this.newTags)
      this.searchkey = ''
    },
    uniqueTag (arr) {
      const res = new Map()
      return arr.filter(a => !res.has(a.keywordId) && res.set(a.keywordId, 1))
    },
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    },
    handleDelTag (el, type) {
      if (type) {
        this.oldTags = this.oldTags.filter(
          item => item.keywordId !== el.keywordId
        )
      } else {
        this.newTags = this.newTags.filter(
          item => item.keywordId !== el.keywordId
        )
      }
    },
    // 生成快报二维码
    generateFastCode () {
      getFastCode({
        url: specialUrl.code + this.info.id,
        id: this.info.id
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
    // 渲染风险
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    // 处理时间
    handlePtime (value) {
      if (!value) return
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
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
        'tags',
        'danger',
        'topics',
        'abstractContent'
      ])
      if (this.$refs.ue.content === '') {
        this.$notification.warning({
          message: '请在编辑器中输入内容'
        })
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
          this.queryParam.imgName = this.fileName || ''
          this.queryParam.content = this.$refs.ue.content || ''
          this.queryParam.id = this.info.id
          this.queryParam.tags = formObj.tags || ''
          this.queryParam.tagList = this.newTags.concat(this.oldTags)
          this.queryParam.abstractContent = formObj.abstractContent || ''

          getUpdate(this.queryParam).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '更新成功！'
              })
              this.generateFastCode()

              if (this.isBanner) {
                let params = {
                  bannerFlag: this.isBanner,
                  informationId: this.info.id,
                  title: this.queryParam.title,
                  infomationUrl: specialUrl.code + this.info.id
                }
                getNewsAddBanner(params).then(res => {
                  console.log('快报生成/删除成功')
                })
              }
              this.getCurrentPageInfo()
            } else {
              this.$notification.error({
                message: res.msg || '更新失败，请重试'
              })
              this.isSave = false
            }
          })
        }
      })
    },
    // 上传图片
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
    // 预览图片
    handlePreviewImg (file) {
      this.imgUrl = file.url || file.thumbUrl
      this.previewVisible = true
    },
    // 取消预览
    handlePreviewCancel () {
      this.imgUrl = ''
      this.previewVisible = false
    },
    // 返回
    handleBack () {
      this.$router.push('/warning/monitor')
    }
  }
}
</script>

<style lang="less" >
.monitorEditWrapper {
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
