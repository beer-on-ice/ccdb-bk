<template>
	<div class="archivesCheckWrapper">
		<h1>机构管理 - 机构档案审核</h1>
		<a-card>
			<a-descriptions bordered>
				<a-descriptions-item :span="3"
					label="机构名称">
					{{basicInfo.companyName}}
				</a-descriptions-item>
				<a-descriptions-item :span="3"
					label="档案类型">
					{{basicInfo.fileType}}
				</a-descriptions-item>
				<a-descriptions-item :span="3"
					label="申请修改内容">
					{{basicInfo.modificationRecord}}
				</a-descriptions-item>
				<a-descriptions-item :span="3"
					label="涉及修改内容">
					<a-table class="font-red"
						:columns="currColumns"
						:data-source="basicInfo.changeList"
						:pagination="false"
						:scroll="{ y: 200 }"
						size="middle"
						rowKey="name">
						<span slot="serial"
							slot-scope="text, record, index">
							{{ index + 1 }}
						</span>
						<span slot="name"
							slot-scope="text, record">
							<span v-if="handleISvHtml(record.type)"
								v-html="text"></span>
							<span v-else>{{text | rejectProFilter }}</span>
						</span>
						<span slot="oldVal"
							slot-scope="text,record">
							<img class="changeImg"
								:src="text"
								v-if="record.name==='logoUrl'&&text!==''">
							<span v-else-if="handleISvHtml(record.type) || record.name==='institutionalType'"
								v-html="text"></span>
							<span v-else>{{text}}</span>
						</span>
						<span slot="newVal"
							slot-scope="text,record">
							<img class="changeImg"
								:src="text"
								v-if="record.name==='logoUrl'&&text!==''">
							<span v-else-if="handleISvHtml(record.type) || record.name==='institutionalType'"
								v-html="text"></span>
							<span v-else>{{text}}</span>
						</span>
						<span slot="checker"
							slot-scope="text,record">
							<a-checkbox :ref="record.name"
								@change="e=>onChoose(e,record)"
								:checked="record.checked"></a-checkbox>
						</span>
					</a-table>
				</a-descriptions-item>
			</a-descriptions>
		</a-card>
		<a-card class="mt-20">
			<a-form v-if="$route.query.type === 1"
				:form="form">
				<div class="btnWrapper">
					<a-button @click="handleBack">返回</a-button>
					<a-popconfirm title="确认此操作?"
						@confirm="handlePass"
						okText="是"
						cancelText="否">
						<a-button type="primary">审核通过</a-button>
					</a-popconfirm>
					<a-popconfirm title="确认此操作?"
						@confirm="handleReject"
						okText="是"
						cancelText="否">
						<a-button type="danger">审核驳回</a-button>
					</a-popconfirm>
					<a-form-item class="mt-20"
						v-for="(item,index) in rejectList"
						:key="item.name">
						<a-input :addon-before='`字段"${handleName(item,index)}"审核驳回：`'
							v-decorator="[`rejectPro${index}`, {initialValue:item.reason,rules: [{ required: true, message: '请选择！', trigger: 'change' }]}]"
							placeholder="* 请填写驳回理由(必填)"
							@blur="handleChange(item,index)">
							<a-icon slot="addonAfter"
								type="close-circle"
								@click="handleDelReason(item)" />
						</a-input>
					</a-form-item>
					<a-textarea class="mt-20"
						placeholder="* 请填写驳回理由或修改意见(非必填)"
						:maxLength="200"
						:autoSize="{ minRows: 2, maxRows: 6 }"
						v-model="reasonForRejection" />
				</div>
			</a-form>
			<a-button @click="handleBack"
				v-else>返回</a-button>
			<archive-check-record class="mt-20"></archive-check-record>
		</a-card>
	</div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import {
  auditDetails,
  auditOperation
} from '@/api/institution/archivesManagement'
import ArchiveCheckRecord from './../../components/ArchiveCheckRecord'
import rejectDataMixin from '@/views/institutionsmanage/mixin/rejectDataMixin' // 引入mixin文件

const columns = [
  {
    title: '序号',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '字段名称',
    align: 'center',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '修改前数据',
    align: 'center',
    dataIndex: 'oldVal',
    scopedSlots: { customRender: 'oldVal' }
  },
  {
    title: '本次修改申请内容',
    align: 'center',
    dataIndex: 'newVal',
    scopedSlots: { customRender: 'newVal' }
  },
  {
    title: '审核驳回',
    align: 'center',
    scopedSlots: { customRender: 'checker' }
  }
]
export default {
  mixins: [rejectDataMixin],
  components: {
    ArchiveCheckRecord
  },
  data () {
    return {
      form: this.$form.createForm(this),
      basicInfo: {},
      reasonForRejection: '',
      columns,
      rejectList: []
    }
  },
  created () {
    this.getInitialInfo()
  },
  computed: {
    currColumns () {
      const newColumn = this.columns.filter(item => item.title !== '审核驳回')
      return this.$route.query.type === 1 ? this.columns : newColumn
    }
  },
  methods: {
    async getInitialInfo () {
      const {
        $route: {
          query: { companyUrl, fileType }
        },
        handleChangeList
      } = this
      try {
        let res = await auditDetails({
          companyUrl,
          fileType
        })
        if (res.code === 200) {
          const change = res.data.change
          const changeList = handleChangeList(change)
          this.basicInfo = { ...res.data, changeList }
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    // 勾选
    onChoose (e, record) {
      const { rejectList } = this
      record.checked = !record.checked
      if (e.target.checked) this.rejectList.push(record)
      else {
        this.rejectList = rejectList.filter(item => item.name !== record.name)
      }
    },
    handleDelReason (obj) {
      const {
        rejectList,
        basicInfo: { changeList }
      } = this
      this.rejectList = this.rejectList.filter(el => el.name !== obj.name)
      this.basicInfo.changeList = changeList.map(item => {
        if (item.name === obj.name) return { ...item, checked: false }
        return item
      })
    },
    // 整理修改的字段
    handleModifyTheFields () {
      const { rejectList } = this
      let rejectArr = []
      rejectList.map((item, index) => {
        if (item.initData) rejectArr.push(item.type)
        else rejectArr.push(item.name)
      })
      return rejectArr.join(';')
    },
    // 添加理由
    handleChange (item, index) {
      const {
        form: { getFieldValue }
      } = this
      const reason = getFieldValue(`rejectPro${index}`)
      item.reason = reason
      if (item.initData) item.initData.reason = reason
    },
    async handlePass () {
      let params = {
        id: this.$route.query.id,
        companyUrl: this.$route.query.companyUrl,
        auditStatus: 2,
        verifier: JSON.parse(Vue.ls.get('USERINFO')).username,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        reasonForRejection: '',
        applicationForAmendment: '',
        moduleChange: '',
        modifyTheFields: ''
      }
      try {
        const res = await auditOperation(params)
        if (res.code === 200) {
          this.$router.push({
            name: 'archivesManagement',
            query: {
              type: 1
            }
          })
          this.$notification.success({
            message: res.msg || '提交成功！'
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
    handleName (item, index) {
      let f =
				item.type === 'default'
				  ? this.$options.filters.rejectProFilter(item.name)
				  : this.$options.filters.rejectProFilter(item.type)
      // let s = item.type === 'default' ? '' : index + 1
      return f
    },
    classification (type, target) {
      const arr = target.filter(item => {
        return item.type === type
      })
      if (type === 'default') return arr
      let result = []
      arr.forEach(item => {
        result.push(item.initData)
      })
      return result
    },
    handleModuleChange (target) {
      let str = ''
      const arr = target.filter(item => {
        return item.type !== 'default'
      })
      arr.forEach(item => {
        const name = item.name.split('<br/>').join('|')
        str += `字段 "${name}" ,审核驳回，驳回理由：${item.reason}。`
      })
      return str
    },
    handleReject () {
      const {
        rejectList,
        handleModifyTheFields,
        classification,
        form: { validateFields },
        $notification: { success, error },
        $route: {
          query: { id, companyUrl }
        },
        $router,
        reasonForRejection,
        handleModuleChange
      } = this
      const applicationForAmendment = classification('default', rejectList)
      const branchChange = classification('branchChange', rejectList)
      const holderChange = classification('holderChange', rejectList)
      const staffChange = classification('staffChange', rejectList)
      const moduleChange = handleModuleChange(rejectList)
      const params = {
        id,
        companyUrl,
        auditStatus: 3,
        verifier: JSON.parse(Vue.ls.get('USERINFO')).username,
        auditTime: moment(new Date()).format('YYYY-MM-DD'),
        reasonForRejection: reasonForRejection.trim(),
        modifyTheFields: handleModifyTheFields(),
        applicationForAmendment: applicationForAmendment.length
          ? JSON.stringify(applicationForAmendment)
          : '',
        branchChange: branchChange.length ? JSON.stringify(branchChange) : '',
        holderChange: holderChange.length ? JSON.stringify(holderChange) : '',
        staffChange: staffChange.length ? JSON.stringify(staffChange) : '',
        moduleChange
      }
      if (!rejectList.length) {
        error({
          message: '请至少选择一个驳回项！'
        })
        return
      }
      validateFields(async err => {
        if (!err) {
          try {
            let res = await auditOperation(params)
            if (res.code === 200) {
              $router.push({
                name: 'archivesManagement',
                query: {
                  type: 3
                }
              })
              success({
                message: res.msg || '提交成功！'
              })
            } else {
              throw new Error(res.msg)
            }
          } catch ({ message }) {
            error({
              message: message || '网络故障，请重试！'
            })
          }
        }
      })
    },
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.archivesCheckWrapper {
	position: relative;
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.mt-20 {
		margin-top: 20px;
	}
	.btnWrapper {
		.ant-btn {
			margin-right: 10px;
		}
	}
	.changeImg {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.recordlist {
		margin-top: 20px;
	}

	.ant-descriptions {
		.ant-descriptions-item-label {
			text-align: center;
			background: rgb(236, 243, 253);
			width: 160px;
		}
		.ant-descriptions-row:nth-of-type(4) {
			.ant-descriptions-item-content {
				padding: 0;
			}
		}
	}
	.font-red {
		.ant-table-body {
			margin: 0 !important;
			.ant-table-row {
				td:nth-of-type(4) {
					span {
						color: red !important;
					}
				}
			}
		}
	}
}
</style>
