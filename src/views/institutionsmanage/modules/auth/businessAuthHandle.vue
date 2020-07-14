<template>
	<div class="businessAuthHandleWrapper">
		<h1>工单处理</h1>
		<a-card>
			<a-card title="基本信息">
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>申请时间</p>
						<p>{{overViewInfo.applicationTime}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>工单状态</p>
						<p :style="{color: Number(overViewInfo.workOrderStatus)===0?'#000':Number(overViewInfo.workOrderStatus)===1?'green':Number(overViewInfo.workOrderStatus)===2?'#3262f3':'#ff4956'}">{{Number(overViewInfo.workOrderStatus)===0?'待处理':Number(overViewInfo.workOrderStatus)===1?'处理中':Number(overViewInfo.workOrderStatus)===2?'已完结':'已过期'}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>企业名称</p>
						<p>{{overViewInfo.companyName}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>企业类型</p>
						<p>{{overViewInfo.companyStyle}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>联系人姓名</p>
						<editable-info @editSave="editSave"
							:value="overViewInfo.name"
							:type="'name'"></editable-info>
					</div>

				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>联系人职位</p>
						<editable-info @editSave="editSave"
							:value="overViewInfo.position"
							:type="'position'"></editable-info>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>联系人电话</p>
						<editable-info @editSave="editSave"
							:value="overViewInfo.phone"
							:type="'phone'"></editable-info>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>创建来源</p>
						<p>{{overViewInfo.createSources}}</p>
					</div>
				</a-card-grid>
			</a-card>
			<a-card title="沟通记录">
				<a-table :columns="columns"
					:dataSource="recordData"
					size="small"
					bordered
					:scroll="{ y: 500 }">
					<span slot="serial"
						slot-scope="text, record, index">
						{{ index + 1 }}
					</span>
					<span slot="processingMode"
						slot-scope="text">{{+text===0?'':'电话沟通'}}</span>
					<span slot="communicationIntention"
						slot-scope="text">{{text | communicationIntentionFilter}}</span>
				</a-table>
			</a-card>
			<a-card title="操作">
				<a-form layout="horizontal"
					:form="form">
					<a-form-item label="处理方式："
						:label-col="{ span: 2 }"
						:wrapper-col="{ span: 9 }">
						<a-radio checked
							v-decorator="['method',
							{initialValue:1,rules: [{ required: true, message: '请选择处理方式', trigger: 'change',type: 'number' }]}
						]">电话沟通</a-radio>
					</a-form-item>
					<a-form-item label="处理结果："
						:label-col="{ span: 2 }"
						:wrapper-col="{ span: 9 }">
						<a-select style="width: 120px"
							v-decorator="['result',
							{initialValue:'0',rules: [{ required: true, message: '请选择处理结果', trigger: 'change' }]}
						]">
							<a-select-option value="0">未沟通</a-select-option>
							<a-select-option value="1">已签约</a-select-option>
							<a-select-option value="2">有意向合作</a-select-option>
							<a-select-option value="3">仅咨询</a-select-option>
							<a-select-option value="4">无意向合作</a-select-option>
							<a-select-option value="5">其他</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="填写记录："
						class="textareaWrapper specialLabel"
						:label-col="{ span: 2 }"
						:wrapper-col="{ span: 9 }">
						<a-textarea placeholder="请填写沟通记录"
							maxLength="500"
							:autosize="{ minRows: 2, maxRows: 6 }"
							v-decorator="['record',
							{rules: [{ required: true, message: '请在此输入反馈信息', trigger: 'change' },{validator:checkNum}]}
						]"
							@change="e => handleIntroduceInput(e)" />
						<p class="tip">已填写{{hasInput}} / 500 字</p>
					</a-form-item>
				</a-form>
			</a-card>
			<div class="btnWrapper">
				<a-button type="primary"
					@click="hanldeBack">
					返回
				</a-button>
				<a-button type="primary"
					@click="hanldeSubmit">
					提交
				</a-button>
			</div>
		</a-card>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import {
  singleWorkforce,
  submitProveCommunicationRecord,
  showProveCommunicationRecords,
  editNPP
} from '@/api/businessAuth'
import { EditableInfo } from './../../components/'
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    align: 'center',
    width: '60px',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '处理时间',
    dataIndex: 'processTime',
    width: '234px',
    align: 'center'
  },
  {
    title: '处理方式',
    dataIndex: 'processingMode',
    align: 'center',
    width: '234px',
    scopedSlots: { customRender: 'processingMode' }
  },
  {
    title: '沟通意向',
    dataIndex: 'communicationIntention',
    align: 'center',
    width: '234px',
    scopedSlots: { customRender: 'communicationIntention' }
  },
  {
    title: '记录',
    dataIndex: 'records',
    align: 'center'
  },
  {
    title: '操作人',
    dataIndex: 'operatingPersonnel',
    width: '100px',
    align: 'center'
  }
]

export default {
  name: 'businessAuthHandle',
  components: {
    EditableInfo
  },
  data () {
    return {
      columns,
      id: '',
      form: this.$form.createForm(this),
      hasInput: 0,
      isEditingName: false,
      isEditingPosition: false,
      isEditingPhone: false,
      overViewInfo: {},
      recordData: [],
      queryParam: {
        checkBy: JSON.parse(Vue.ls.get('USERINFO')).username
      }
    }
  },
  created () {
    this.singleWorkforce()
    this.showProveCommunicationRecords()
  },
  methods: {
    async singleWorkforce () {
      try {
        const res = await singleWorkforce({
          id: this.$route.query.id
        })
        const { code, data, msg } = res
        if (code === 200) {
          this.overViewInfo = data
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async showProveCommunicationRecords () {
      try {
        const res = await showProveCommunicationRecords({
          proveWorkOrderCertificationId: this.$route.query.id
        })
        const { code, data, msg } = res
        if (code === 200) {
          this.recordData = data
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async submitProveCommunicationRecord () {
      const {
        $route: {
          query: { id }
        },
        queryParam: { checkBy },
        form: { getFieldsValue, validateFields },
        $notification: { success, error },
        hanldeBack
      } = this
      const formObj = getFieldsValue(['record', 'method', 'result'])
      const param = {
        proveWorkOrderCertificationId: id,
        processTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        processingMode: formObj.method,
        communicationIntention: formObj.result,
        records: formObj.record,
        operatingPersonnel: checkBy
      }
      validateFields(['record', 'method', 'result'], async err => {
        if (!err) {
          try {
            const res = await submitProveCommunicationRecord(param)
            const { code, data, msg } = res
            if (code === 200) {
              hanldeBack()
              success({
                message: msg || '提交成功！'
              })
            } else {
              throw new Error(msg)
            }
          } catch ({ message }) {
            error({
              message: message || '网络故障，请重试！'
            })
          }
        }
      })
    },
    checkNum (rule, value, callback) {
      if (value && value.length < 5) {
        // eslint-disable-next-line
				callback('5个字以上')
      }
      callback()
    },
    async editSave ({ type, val }) {
      const param = Object.assign(
        {
          proveWorkOrderCertificationId: this.$route.query.id,
          name: '',
          position: '',
          phone: '',
          operatingPersonnel: this.queryParam.checkBy
        },
        { [type]: val }
      )
      const res = await editNPP(param)
      if (res.code === 200) {
        this.overViewInfo[type] = val
        this.showProveCommunicationRecords()
        this.$notification.success({ message: res.msg })
      } else {
        this.$notification.error({ message: res.msg })
      }
    },
    handleIntroduceInput (e) {
      this.hasInput = e.target.value.length
    },
    hanldeSubmit () {
      this.submitProveCommunicationRecord()
    },
    hanldeBack () {
      this.$router.go(-1)
    }
  },
  filters: {
    communicationIntentionFilter (code) {
      switch (Number(code)) {
        case 0:
          return '未沟通'
        case 1:
          return '已签约'
        case 2:
          return '有意向'
        case 3:
          return '仅咨询'
        case 4:
          return '无意向'
        case 5:
          return '其他'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less">
.businessAuthHandleWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.ant-card {
		margin-top: 20px;
	}
	.ant-card-head {
		background: rgba(240, 240, 240, 1);
	}
	.ant-card-head-title {
		font-weight: bold;
	}
	.ant-card-grid {
		padding: 0;
		div {
			display: flex;
			align-items: center;

			p {
				margin: 0;
				padding: 24px;
				text-align: center;
				&:nth-of-type(odd) {
					padding: 24px 0;
					width: 150px;
					border-right: 1px solid #e8e8e8;
					font-weight: bold;
				}
				&:nth-of-type(even) {
					width: calc(100% - 150px);
				}
			}
			.editable {
				width: calc(100% - 150px);
				div {
					width: 100%;
					padding-left: 20px;
				}
				p {
					width: 100%;
					border-right: none;
				}
				button {
					color: #888;
					background: #ccc;
					border: 1px solid #ccc;
					padding: 3px;
					margin-right: 10px;
					width: 50px;
					outline: none;
					border-radius: 10px;
					&.active {
						color: #fff;
						background: rgba(42, 130, 228, 1);
					}
				}
			}
			span {
				cursor: pointer;
				color: rgba(42, 130, 228, 1);
			}
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
	.specialLabel {
		.ant-input {
			width: 100%;
		}
	}
	.rowCardCls {
		.ant-card {
			margin-top: 20px;
		}
	}
	.btnWrapper {
		margin-top: 50px;
		.ant-btn {
			margin-right: 20px;
		}
	}
}
</style>
