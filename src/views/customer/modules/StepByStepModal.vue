<template>
	<div class="customerWrapper">
		<a-modal title="保单服务-审批"
			:width="1200"
			:visible="visible"
			:destroyOnClose="true"
			@cancel="handleCancel"
			class="operateModal">
			<a-row style="font-size: 16px;font-weight: bold;margin-bottom:10px">基本信息</a-row>
			<a-row>
				<a-col :span="12">用户ID: {{userId}}</a-col>
				<a-col :span="12">服务类别: {{servertype}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="12">用户昵称: {{username}}</a-col>
				<a-col :span="12">服务类别(二级): {{twoservertype}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="12">用户邮箱: {{email}}</a-col>
				<a-col :span="12">最后提交时间: {{lasttime}}</a-col>
				<span style="float:right">
					<a-button type="primary"
						@click="selectAll()"
						style="background-color: #1890ff;
      border-color: #1890ff;">全选</a-button>
					<a-button type="primary"
						@click="download()"
						style="margin-left: 8px;background-color: #1890ff;
      border-color: #1890ff;"
						class="download('imgs')">下载</a-button>
				</span>
			</a-row>
			<div style=" height:1px;border-bottom:1px dashed #ccc"></div>
			<template slot="footer">
				<div class="closebtn">
					<a-button key="cancel"
						@click="handleCancel">关闭</a-button>
				</div>
			</template>

			<p style="font-size: 14px;font-weight: bold;margin-top:10px">上传文件材料</p>
			<ul>
				<li v-for="(item, index) in docUrl"
					:key='index'
					@click="previewPDf(item)">
					<div :class="item.ischecked ? 'active check' : 'check' "
						@click.stop="checkTab(item,index)">✓</div>
					<img :src="item.path"
						style="width:100px; height:100px;margin-left:10px"
						preview="0"
						v-if="item.type != 'PDF' ">
					<pdf :src="item.path"
						v-else
						style="width:100px; height:100px;margin-left:10px"></pdf>
				</li>
			</ul>

			<p style="font-size: 14px;font-weight: bold;margin-top:10px">上传证明材料</p>

			<ul>
				<li v-for="(item, index) in picUrl"
					:key='index'
					@click="previewPDf(item)">
					<div :class="item.ischecked ? 'active check' : 'check' "
						@click.stop="checkTabProvid(item,index)">✓</div>
					<img :src="item.path"
						alt=""
						style="width:100px; height:100px;margin-left:10px"
						preview="1"
						v-if="item.type != 'PDF' ">
					<pdf :src="item.path"
						v-else
						style="width:100px; height:100px;margin-left:10px"></pdf>
				</li>
			</ul>

			<a-row>
				<a-col :span="16"
					style="font-size: 16px;font-weight:bold"><i style="color:red">*</i>审批结果</a-col>
				<a-col :span="6"
					style="font-size: 16px;font-weight:bold"><i style="color:red">*</i>审批人</a-col>
			</a-row>
			<!-- 底部展示 -->
			<div style="overflow:hidden; height:130px ; padding-top:10px;">
				<div class="pass"
					v-if="isShowGrey"
					style="background-color:#ccc">
					审批通过
				</div>
				<div class="pass"
					@click="approvalPass"
					v-else>
					审批通过
				</div>
				<div class="back">
					<div class="nopass"
						v-if="isShowGrey"
						style="background-color:#ccc">审批退回</div>
					<div class="nopass"
						@click="approvalFalse"
						v-else>审批退回</div>
					<div class="textvalue">
						<p style="margin-top:-14px;margin-bottom:0px">反馈内容</p>
						<a-textarea placeholder="填写反馈信息（如：告知用户缺少那些材料等）"
							style="width: 490px;height: 66px;resize:none;margin-top:5px"
							v-model="remark"></a-textarea>
					</div>
				</div>
				<div class="right">
					<!-- <p style="font-weight: bold;	font-size: 16px;">审批人</p> -->
					<a-input placeholder="请输入姓名"
						v-model="auditor"></a-input>
				</div>
			</div>
			<a href=""
				ref="a"
				target="_blank"
				style="display:none">预览</a>
		</a-modal>
	</div>
</template>
<script>
import pick from 'lodash.pick'
import FileSaver from 'file-saver'
import { getCurrentUser, updatePolicy, getAllList } from '@/api/customer'
import { Bus } from '../../../main.js'
import pdf from 'vue-pdf'

var JSZip = require('jszip')
const stepForms = [
  ['name', 'desc'],
  ['target', 'template', 'type'],
  ['time', 'frequency']
]

export default {
  name: 'StepByStepModal',
  components: {
    pdf
  },
  data () {
    return {
      listid: '',
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      // 回显的数据
      userId: '',
      servertype: '',
      username: '',
      twoservertype: '',
      email: '',
      lasttime: '',
      auditor: '', // 审批人
      remark: '', // 反馈内容
      // 展示的文字
      showWords: '',
      isShowGrey: false, // 是否展示灰色div
      // 上传文件材料
      docUrl: [],
      imglist: [],
      // 上传证明材料
      picUrl: [],
      checkedList: [],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    /* 上传文件材料 */
    checkTab (item, idx) {
      console.log('item', item, idx)
      item.ischecked = !item.ischecked
      this.docUrl[idx].ischecked = item.ischecked
    },
    /* 上传证明材料 */
    checkTabProvid (item, idx) {
      console.log('item', item, idx)
      item.ischecked = !item.ischecked
      this.picUrl[idx].ischecked = item.ischecked
      console.log('上传证明文件', this.picUrl)

      // let id = item.id
      // let index = this.checkedList.indexOf(id)

      /*  if (index === -1) {
                this.checkedList1.push(id)
                // 给当前的添加类名active
                item.ischecked = true

            } else {
                this.checkedList1.splice(index, 1)
                item.ischecked = false
            }
            console.log('checkedList1111',this.checkedList1); */
    },
    /* 全选功能 */
    selectAll () {
      for (let i = 0; i < this.docUrl.length; i++) {
        this.docUrl[i].ischecked = true
      }
      for (let i = 0; i < this.picUrl.length; i++) {
        this.picUrl[i].ischecked = true
      }
    },

    /* 预览PDF */
    previewPDf (item) {
      if (item.type !== 'PDF') return
      this.$refs.a.href = item.path
      this.$refs.a.click()
    },

    /* 下载图片功能 */
    download () {
      var zip = new JSZip()
      // var imgs = zip.folder("images")
      var imgs = zip.folder(this.userId + '-' + this.lasttime)
      var baseList = []
      var _this = this
      let arr = []
      let arr1 = []
      let arr2 = []
      // 遍历pdf
      let newarr = this.docUrl.filter(item => item.ischecked === true)
      for (let i = 0; i < newarr.length; i++) {
        arr1.push(newarr[i].path)
      }
      console.log('选中的arr1', arr1)
      // 遍历所有图片 找出ischecked为true的图片
      let newarr1 = this.picUrl.filter(item => item.ischecked === true)
      for (let i = 0; i < newarr1.length; i++) {
        arr2.push(newarr1[i].path)
      }
      console.log('选中的arr2', arr2)
      arr = arr1.concat(arr2)
      console.log('合并后的arr', arr)
      // arr 就是 url的集合
      for (var i = 0; i < arr.length; i++) {
        let image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function () {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          let context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          let url = canvas.toDataURL() // 得到图片的base64编码数据 let url = canvas.toDataURL('image/png')
          baseList.push(url.substring(22))
          if (baseList.length === arr.length) {
            if (baseList.length > 0) {
              _this.$notify({
                title: '成功',
                message: '即将下载',
                type: 'success'
              })
              for (let k = 0; k < baseList.length; k++) {
                imgs.file('photo' + k + '.png', baseList[k], { base64: true })
              }
              zip.generateAsync({ type: 'blob' }).then(function (content) {
                FileSaver.saveAs(content, _this.userId + '-' + _this.lasttime)
              })
            } else {
              _this.$notify.error({
                title: '错误',
                message: '暂无图片可下载'
              })
            }
          }
        }
        image.src = arr[i].replace('webp', 'png') // 替换打包后的图片后缀
      }
    },

    // 使模态框显示
    edit (record) {
      this.visible = true
      console.log('record', record)
      let data = {
        id: record
      }
      // 回显数据
      getCurrentUser(data).then(res => {
        console.log('res', res)
        let onlyData = res.data[0]
        // 给pdf添加ischecked
        if (res.data[0].fileUrls.docUrl.length > 0) {
          for (let i = 0; i < res.data[0].fileUrls.docUrl.length; i++) {
            res.data[0].fileUrls.docUrl[i].ischecked = false
          }
        }
        // 给图片添加ischecked
        if (res.data[0].fileUrls.picUrl.length > 0) {
          for (let i = 0; i < res.data[0].fileUrls.picUrl.length; i++) {
            res.data[0].fileUrls.picUrl[i].ischecked = false
          }
        }

        this.docUrl = onlyData.fileUrls.docUrl
        this.picUrl = onlyData.fileUrls.picUrl
        this.$previewRefresh()

        console.log('9999999', this.docUrl, this.picUrl)

        this.userId = onlyData.userId
        this.listid = onlyData.id
        this.username = onlyData.petName
        this.twoservertype = onlyData.productName
        this.servertype = onlyData.titleName
        this.email = onlyData.emailAddress
        this.lasttime = onlyData.dateOfLatestSubmission
        this.auditor = onlyData.auditor || ''
        this.remark = onlyData.remark || ''
        // 用来判断如果是审批通过 => 就显示灰色框 0表示通过 1表示驳回
        if (onlyData.approvalStatus == 0) {
          this.isShowGrey = true
        } else {
          this.isShowGrey = ''
        }
      })
    },

    // 审批通过
    approvalPass () {
      console.log('审核人', this.auditor)
      let data = {
        approvalStatus: 0, // 通过为0
        auditor: this.auditor,
        id: this.listid,
        remark: this.remark || ''
      }
      console.log('data', data)
      if (data.auditor === '') {
        this.$message({
          type: 'error',
          message: '审核人为必填项'
        })
      } else {
        updatePolicy(data).then(res => {
          console.log('审核通过的返回值', res)
          // 刷新数据  => 发现并不能刷新  所以采用了bus总线
          /* getAllList().then( res => {
                  console.log('我是在模态框里调用的数据', res)
                  this.dataList = res.data.list
                  this.total = res.data.total - 0
                  this.pageNum = res.data.pageNum - 0
                }) */
          // 关闭模态框
          this.visible = false
          // 刷新页面
          Bus.$emit('resetData')
        })
      }
    },
    // 审批退回
    approvalFalse () {
      console.log('审核人', this.auditor)
      let data = {
        approvalStatus: 1, // 通过为0
        auditor: this.auditor,
        id: this.listid,
        remark: this.remark
      }
      console.log('data', data)
      if (data.auditor === '' || data.remark === '') {
        this.$message({
          type: 'error',
          message: '审核人和反馈内容为必填项'
        })
      } else {
        updatePolicy(data).then(res => {
          console.log('审核通过的返回值', res)

          this.visible = false
          Bus.$emit('resetData')
        })
      }
    },
    // 关闭模态框
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style  lang="less" scoped>
.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
.ant-row {
	margin-bottom: 10px;
}
.operateModal {
	.ant-modal-header {
		background-color: rgba(42, 130, 228, 1);
	}
	.ant-modal-title {
		color: rgba(255, 255, 255, 1);
		font-size: 16px;
		font-weight: bold;
	}
}
.pass,
.nopass {
	float: left;
	width: 88px;
	height: 100px;
	background-color: rgba(42, 130, 228, 1);
	font-size: 16px;
	font-weight: bold;
	line-height: 88px;
	text-align: center;
	color: #fff;
	margin-top: 10px;
}
.nopass {
	background-color: rgba(67, 207, 124, 1);
	margin-right: 20px;
}
.back {
	height: 130px;
	float: left;
	margin-left: 25px;
	border-left: 1px dashed #ccc;
	border-right: 1px dashed #ccc;
	padding-left: 25px;
}
.textvalue {
	padding-left: 110px;
	padding-right: 10px;
	box-sizing: border-box;
}
.right {
	float: left;
	margin-left: 20px;
	margin-top: 10px;
}
ul {
	overflow: hidden;
}

ul li {
	list-style: none;
	float: left;
	position: relative;
}
.check {
	width: 20px;
	height: 20px;
	position: absolute;
	z-index: 999;
	top: 0px;
	right: 0px;
	background-color: #999;
	border-radius: 10px;
	text-align: center;
	line-height: 20px;
	color: #fff;
}
.active {
	color: red;
}
.ant-modal-footer {
	.closebtn {
		text-align: center;
		button {
			background-color: rgba(42, 130, 228, 1);
			color: #fff;
		}
	}
}
.el-checkbox-button--small .el-checkbox-button__inner {
	padding: 7px 14px;
}
</style>
