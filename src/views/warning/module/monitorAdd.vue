<template>
	<div class="monitorAddWrapper">
		<a-form layout="horizontal"
			:form="form">
			<a-form-item label="标题："
				:label-col="{span:1}">
				<a-input style="max-width:90%;"
					placeholder="请输入"
					v-decorator="[
							'title',
							{rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
						]" />
			</a-form-item>
			<a-row>
				<a-col :span="12">
					<a-form-item label="来源网站："
						:label-col="{span:1}">
						<a-input placeholder="请输入"
							style="max-width:50%;"
							v-decorator="[
							'sourceform',
							{rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
						]" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="作者："
						:label-col="{span:1}">
						<a-input style="max-width:50%;"
							placeholder="请输入"
							v-decorator="['editor']" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-form-item label="操作："
				:label-col="{span:1}">
				<a-radio-group :options="plainOptions"
					v-model="queryParam.opinionType" />
			</a-form-item>
			<a-form-item label="发布时间："
				:label-col="{span:1}">
				<a-radio-group :options="publishOptions"
					v-decorator="[
						'publishType']" />
				<a-date-picker showTime
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="请选择时间"
					v-decorator="['pTime',
						{rules: [{ required: true, message: '请选择发布时间！', trigger: 'change' }]}
					]" />
			</a-form-item>
			<a-form-item label="封面图："
				:label-col="{span:1}">
				<a-radio-group :options="coverOptions"
					v-decorator="[
						'coverType',
						{rules: [{ required: true, message: '请选择封面图类型！', trigger: 'change' }]}
					]" />
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
			<a-row>
				<a-col :span="8">
					<a-form-item label="资讯类型："
						:label-col="{span:1}">
						<a-select style="width:50%;"
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
				</a-col>
				<a-col :span="16">
					<a-form-item label="资讯外链："
						:label-col="{span:1}">
						<a-checkbox>启用</a-checkbox>
						<a-input palceholder="请输入外链"
							style="width:50%;"></a-input>
					</a-form-item>
				</a-col>
			</a-row>
			<a-form-item label="摘要："
				:label-col="{span:1}"
				:wrapper-col="{span:22}">
				<a-textarea placeholder="请输入摘要"
					maxLength="200"
					allowClear
					v-decorator="['abstractContent',
						{rules: [{required: true, message: '请输入摘要!', trigger: 'change',type:'string' }]}
					]" />
			</a-form-item>
			<a-form-item label="正文："
				:label-col="{span:1}"
				:wrapper-col="{span:22}">
				<Ue ref="ue"
					v-decorator="['content',
						{rules: [{required: true, message: '请输入正文!', trigger: 'change',type:'string' }]}
					]" />
			</a-form-item>
			<a-row>
				<a-col :span="8">
					<a-form-item label="内容分类："
						:label-col="{span:1}">
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
				</a-col>
				<a-col :span="8">
					<a-form-item label="资讯性质："
						:label-col="{span:1}">
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
				</a-col>
				<a-col :span="8">
					<a-form-item label="风险分类："
						:label-col="{span:1}">
						<a-cascader :options="dangerList"
							:displayRender="displayRender"
							expandTrigger="hover"
							placeholder="请选择"
							style="max-width:200px;"
							v-decorator="['danger']" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-form-item label="关键字："
				:label-col="{span:5}">
				<a-input placeholder="多个关键字之间用英文逗号隔开"
					style="max-width:230px;"
					v-decorator="['topics']" />
				<a-button type="primary"
					@click="addTopics">添加</a-button>
			</a-form-item>
			<a-form-item label="自定义标签："
				:label-col="{span:5}">
				<a-input style="max-width: 230px"
					placeholder="多个标签请用英文逗号隔开"
					v-decorator="['tags']" />
				<a-button type="primary"
					@click="addTags">添加</a-button>
			</a-form-item>
			<a-form-item label="
							标签搜索："
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
							:key="item.id"
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
  specialUrl,
  getkeywordSystem
} from '@/api/warning'

const plainOptions = [
  {
    value: 1,
    label: '周边舆情'
  },
  {
    value: 2,
    label: '自身舆情'
  }
]
const publishOptions = [
  {
    value: 1,
    label: '立即发布'
  },
  {
    value: 2,
    label: '定时发布'
  }
]

const coverOptions = [
  {
    value: 1,
    label: '单图（小）'
  },
  {
    value: 2,
    label: '单图（大）'
  },
  {
    value: 3,
    label: '三图组合'
  }
]

export default {
  name: 'monitorAdd',
  components: { Ue },
  data () {
    return {
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      form: this.$form.createForm(this),
      plainOptions,
      publishOptions,
      coverOptions,
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
      tagsSearchResult: [], // 搜索到的标签列表
      searchkey: ''
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
      let arr = []
      let modalInfo = this.$route.params.info.modalInfo
      let type = this.$route.params.info.type

      if (type === 1) {
        arr = [
          {
            keywordId: modalInfo.administratorId,
            keyword: modalInfo.administratorName,
            type: 1
          }
        ]
      } else if (type === 2) {
        arr = [
          {
            keywordId: modalInfo.administratorId,
            keyword: modalInfo.administratorName,
            type: 1
          },
          {
            keywordId: modalInfo.productId,
            keyword: modalInfo.productName,
            type: modalInfo.productType === 1 ? 2 : 3
          }
        ]
      } else if (type === 3) {
        arr = [
          {
            keywordId: modalInfo.administratorId,
            keyword: modalInfo.administratorName,
            type: 1
          },
          {
            keywordId: modalInfo.managerId,
            keyword: modalInfo.managerName,
            type: 4
          }
        ]
      } else {
        arr = []
      }
      this.oldTags = [].concat(arr)
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
            keywordId: item.keywordId,
            type: item.type,
            id: item.id
          })
        })
      })
      return arr
    },
    // 实时搜索标签 - 选择标签
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
    addTopics () {},
    addTags () {},
    // 实时搜索标签 - 删除标签
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
    // 保存
    handleSave () {
      let {
        title,
        editor,
        inforDomain,
        category,
        categoryType,
        sourceform,
        tags,
        pTime,
        danger,
        showType,
        topics,
        checkedList,
        abstractContent
      } = this.form.getFieldsValue([
        'title',
        'editor',
        'inforDomain',
        'category',
        'categoryType',
        'sourceform',
        'tags',
        'pTime',
        'danger',
        'showType',
        'topics',
        'checkedList',
        'abstractContent'
      ])
      let {
        form: { validateFields },
        fileName,
        $refs: {
          ue: { content }
        },
        newTags,
        oldTags,
        $notification: { success, error, warning },
        isBanner
      } = this

      if (this.$refs.ue.content === '') {
        warning({
          message: '请在编辑器中输入内容'
        })
      }
      this.form.validateFields(err => {
        if (!err) {
          let pTimes = this.handlePtime(pTime)

          this.queryParam.title = title || ''
          this.queryParam.editor = editor || ''
          this.queryParam.inforDomain = inforDomain || ''
          this.queryParam.category = category || ''
          this.queryParam.categoryType = categoryType || ''
          this.queryParam.releaseDate = pTimes || ''
          this.queryParam.topCategory = danger ? danger[0] : ''
          this.queryParam.twoLevel = danger ? danger[1] : ''
          this.queryParam.sourceform = sourceform || ''
          this.queryParam.topics = topics || ''
          this.queryParam.showType = showType || ''
          this.queryParam.imgName = fileName || ''
          this.queryParam.content = content || ''
          this.queryParam.tags = tags || ''
          this.queryParam.tagList = newTags.concat(oldTags)
          this.queryParam.abstractContent = abstractContent || ''

          getNewsAdd(this.queryParam).then(res => {
            if (res.code === 200) {
              success({
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
                name: 'monitorEdit',
                params: {
                  info: {
                    id: res.data
                  }
                }
              })
            } else {
              error({
                message: res.msg || '保存失败，请重试'
              })
              this.isSave = false
            }
          })
        }
      })
    },
    handleBack () {
      this.$router.push('/warning/monitor')
    }
  }
}
</script>

<style lang="less" >
.monitorAddWrapper {
	.ant-form-item-label {
		width: 100px !important;
	}
	.uploadWrapper {
		margin-left: 100px;
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
