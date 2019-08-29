<template>
  <div class="monitorEditWrapper">
    <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
      <div class="newsEditWrapper">
        <a-form layout="horizontal" :form="form">
          <a-row>
            <a-col :span="6">
              <a-form-item>
                <a-upload class="uploadWrapper" listType="picture-card" :headers='myHeaders' :action="uploadUrl"
                  :fileList="fileList" @preview="handlePreviewImg" @change="handleUploadChange" :remove="handleRemoveUpload"
                  name="multipartFile">
                  <div v-if="fileList.length<1">
                    <a-icon type="plus"></a-icon>
                    <div className="ant-upload-text">选择封面</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :span="18">
              <a-form-item label="标题：" :label-col="{span:1}">
                <a-input style="max-width:250px;" placeholder="最长不超过30字(包含字母和字符)" v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入标题！', trigger: 'change' }]}
          ]" />
              </a-form-item>
              <a-form-item label="作者：" :label-col="{span:1}">
                <a-input style="max-width:250px;" placeholder="请输入" v-decorator="['editor']" />
              </a-form-item>
              <a-row>
                <!-- 发布时间 -->
                <a-col :span="8">
                  <a-form-item label="发布时间：" :label-col="{span:5}">
                    <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" v-decorator="['pTime']" />
                  </a-form-item>
                </a-col>
                <!-- 操作单选框 -->
                <a-col :span="12">
                  <a-form-item label="操作：" :label-col="{span:2}">
                    <a-radio-group :options="plainOptions" v-decorator="['checkedList']" :defaultValue="value2" />
                  </a-form-item>
                </a-col>
                <!-- 操作单选框 -->
              </a-row>
            </a-col>
          </a-row>
          <a-row style="margin:50px;">
            <a-col :span="6">
              <a-form-item label="资讯类型：" :label-col="{span:5}">
                <a-select style="max-width:200px;" placeholder="请选择" v-decorator="[
            'inforDomain',
            {rules: [{ required: true, message: '请选择资讯类型！', trigger: 'change' }]}
          ]">
                  <a-select-option value="1">选项一</a-select-option>
                  <a-select-option value="2">选项二</a-select-option>
                  <a-select-option value="3">选项三</a-select-option>

                </a-select>
              </a-form-item>
              <a-form-item label="资讯性质：" :label-col="{span:5}">
                <a-select style="max-width:200px;" placeholder="请选择" v-decorator="[
                'categoryType',
                {rules: [{ required: true, message: '请选择资讯性质！', trigger: 'change' }]}
              ]">
                  <a-select-option value="2126">性质1</a-select-option>
                  <a-select-option value="2127">性质2</a-select-option>
                  <a-select-option value="2128">性质3</a-select-option>
                </a-select>
              </a-form-item>
              <!-- 内容分类 -->
              <a-form-item label="内容分类：" :label-col="{span:5}">
                <a-select placeholder="请选择" style="max-width:200px;" v-decorator="[
            'category',
            {rules: [{ required: true, message: '请选择内容分类！', trigger: 'change' }]}
          ]">
                  <a-select-option value="110">分类1</a-select-option>
                  <a-select-option value="111">分类2</a-select-option>
                  <a-select-option value="111">分类3</a-select-option>
                </a-select>
              </a-form-item>
              <!-- 风险分类 -->
              <a-form-item label="风险分类：" :label-col="{span:5}">
                <a-cascader :options="dangerList" :displayRender="displayRender" expandTrigger="hover" placeholder="请选择"
                  style="max-width:200px;" v-decorator="['danger']" />
              </a-form-item>
              <!-- 信源 -->
              <a-form-item label="信源：" :label-col="{span:5}">
                <a-input placeholder="" style="max-width:200px;" v-decorator="[
            'sourceform',
            {rules: [{ required: true, message: '请输入来源网站！', trigger: 'change' }]}
          ]" />
              </a-form-item>
              <!-- 标签 -->
              <a-form-item label="标签：" :label-col="{span:5}">
                <a-input placeholder="多个标签之间用英文逗号隔开" style="max-width:230px;" v-decorator="['tags']" />
              </a-form-item>
              <!-- 关键字 -->
              <a-form-item label="关键字：" :label-col="{span:5}">
                <!-- <a-auto-complete
                  v-module="keyworld"
                  style="max-width:230px;"
                  v-decorator="['topics']"
                  :dataSource="handleSearch"
                  placeholder="请输入关键词"
                   /> -->
                <el-row class="demo-autocomplete">
                  <el-col :span="12">
                    <el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容"
                      :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                  </el-col>
                </el-row>
              </a-form-item>
              <!-- <ul>
                <li class="searchitem" v-for="(option, index) in options" @click="openUnify(option)" :key="index">
                  <div class="itm_pic">
                  </div>
                </li>
              </ul> -->
            </a-col>
            <a-col :span="18">
              <Ue ref="ue" />
            </a-col>
          </a-row>
        </a-form>
        <div>
          <a-button type="primary" @click="save">
            保存
          </a-button>
          <a-button type="primary" @click="handlePreview" v-show="isSave" style="margin-left:20px;">
            预览
          </a-button>
          <a-button type="primary" @click="handleBack" style="margin-left:20px;">
            返回
          </a-button>
        </div>
        <a-modal :title="modalTitle" :visible="previewVisible" :footer="null" class="previewModal" @cancel="handlePreviewCancel">
          <img :src="qrCode" style="width:100%;">
        </a-modal>
      </div>
    </a-form>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import {
    Ue
  } from '@/components'
  import moment from 'moment'

  import {
    getDangerList,
    getNewsAdd,
    getRemoveUpload,
    getNewsAddBanner,
    getFastCode,
    specialUrl
  } from '@/api/newsManage'
  export default {
    components: {
      Ue
    },
    data() {
      return {
        checkedList: [this.propertyValueId],
        myHeaders: {
          Authorization: Vue.ls.get(ACCESS_TOKEN)
        }, // 上传图片用到
        form: this.$form.createForm(this),
        plainOptions: ['自身舆情', '周边舆情'], // 单选
        value2: '周边舆情',
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
        restaurants: [],
        state2: '',
        // handleSearch: [
        //   '华社',
        //   '华社监督',
        //   '华社好',
        //   '华社坏',
        //   '恒大',
        //   '恒大足球',
        //   '恒大篮球',
        //   '恒大冰泉'
        // ],

      }
    },
    created() {
      this.uploadUrl = specialUrl.upload

      this.getDangerList()
    },
    methods: {
      getDangerList() {
        getDangerList().then(res => {
          this.dangerList = res.data
        })
      },
      displayRender({
        labels
      }) {
        return labels[labels.length - 1]
      },
      // 处理多选
      handleRadio(list) {
        this.queryParam.isHot = list && list.includes('热门') ? '1' : '0'
        this.queryParam.isTop = list && list.includes('置顶') ? '1' : '0'
        this.queryParam.state = list && list.includes('启用') ? '1' : '0'
        this.isBanner = list && list.includes('生成快报') ? '1' : '0'
      },
      // 处理时间
      handlePtime(value) {
        if (!value) return
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      },
      handleUploadChange({
        fileList
      }) {
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
      handleRemoveUpload() {
        getRemoveUpload({
          fileName: this.fileName
        }).then(res => {
          if (res.code === 200) this.fileName = ''
        })
      },
      save() {
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
                  path: '/news/newsedit',
                  query: {
                    id: res.data
                  }
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
      //搜索
      // filterOption(input, option) {
      //   return option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      // },
      
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 预览图片
      handlePreviewImg(file) {
        this.qrCode = file.url || file.thumbUrl
        this.modalTitle = '查看大图'
        this.previewVisible = true
      },
      // 预览 // 生成快报二维码
      handlePreview() {
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
      handlePreviewCancel() {
        this.qrCode = ''
        this.previewVisible = false
      },
      handleBack() {
        this.$router.push('/news')
      }

    }
  }
</script>

<style lang="less">
  .newsEditWrapper {
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
  }
</style>
