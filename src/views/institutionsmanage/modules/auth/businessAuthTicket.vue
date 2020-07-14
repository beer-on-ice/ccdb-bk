<template>
	<div class="businessAuthTicketWrapper">
		<h1>新建工单</h1>
		<a-card>
			<a-card :hoverable="false"
				title="基本信息">
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p><span style="color:red;">*</span>企业名称</p>
						<p>
							<a-select style="width:100%;"
								showSearch
								placeholder="请填写企业名称"
								labelInValue
								:filterOption="false"
								:showArrow="false"
								:value="searchKey"
								:notFoundContent="fetching ? undefined : '暂无数据'"
								@search="fetchUser"
								@change="handleSearchDataChange">
								<a-spin v-if="fetching"
									slot="notFoundContent"
									size="small" />
								<a-select-option v-for="d in searchData"
									:key="d.companyUrl">{{d.companyName}}</a-select-option>
							</a-select>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>企业类型</p>
						<p>{{type}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p><span style="color:red;">*</span>联系人姓名</p>
						<p>
							<a-input placeholder="请填写联系人姓名"
								v-model="queryParam.name"></a-input>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p><span style="color:red;">*</span>联系人职位</p>
						<p>
							<a-input placeholder="请填写联系人职位"
								v-model="queryParam.position"></a-input>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:100%;textAlign:'center'">
					<div>
						<p><span style="color:red;">*</span>联系人电话</p>
						<p>
							<a-input placeholder="请填写联系人电话"
								v-model="queryParam.phone"></a-input>
						</p>
					</div>
				</a-card-grid>
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
							:autosize="{ minRows: 2, maxRows: 6 }"
							maxLength="500"
							v-decorator="['record',
							{rules: [{ required: true, message: '请在此输入沟通记录', trigger: 'change' },{validator:checkNum}]}
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
import debounce from 'lodash/debounce'
import { searchCompany, bdSubmitIdentification } from '@/api/businessAuth'

export default {
  name: 'businessAuthTicket',
  data () {
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      form: this.$form.createForm(this),
      type: '',
      hasInput: 0,
      searchKey: '',
      searchData: [],
      fetching: false,
      queryParam: {
        name: '',
        position: '',
        phone: '',
        checkBy: JSON.parse(Vue.ls.get('USERINFO')).username
      }
    }
  },
  methods: {
    async fetchUser (value) {
      this.fetching = true
      try {
        const { code, data, msg } = await searchCompany({
          companyName: value
        })
        if (code === 200) {
          this.searchData = data
          this.fetching = false
        } else {
          throw new Error(msg)
        }
      } catch ({ message }) {
        this.fetching = false
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleIntroduceInput (e) {
      this.hasInput = e.target.value.length
    },
    handleSearchDataChange (value) {
      let nowCompany = this.searchData.filter(
        item => item.companyUrl === value.key
      )
      this.type =
				nowCompany.length && nowCompany[0].companyStyle
				  ? nowCompany[0].companyStyle
				  : ''
      Object.assign(this, {
        searchKey: value,
        searchData: [],
        fetching: false
      })
    },
    checkNum (rule, value, callback) {
      if (value && value.length < 5) {
        // eslint-disable-next-line
				callback('5个字以上')
      }
      callback()
    },
    async hanldeSubmit () {
      const {
        searchKey: { key, label },
        type,
        queryParam: { name, position, phone, checkBy },
        form: { getFieldsValue, validateFields },
        $notification: { success, error },
        hanldeBack
      } = this
      const formObj = getFieldsValue(['record', 'method', 'result'])
      const param = {
        companyUrl: key,
        companyName: label,
        companyStyle: type,
        name,
        position,
        phone,
        processingMode: formObj.method,
        communicationIntention: formObj.result,
        records: formObj.record,
        operatingPersonnel: checkBy,
        processTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        applicationTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      if (
        label === '' ||
				name.trim() === '' ||
				position.trim() === '' ||
				phone.trim() === ''
      ) {
        error({ message: '请补全基本信息' })
        return
      }
      validateFields(['record', 'method', 'result'], async err => {
        if (!err) {
          try {
            const res = await bdSubmitIdentification(param)
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

    hanldeBack () {
      this.$router.push({
        path: '/institutionsmanage/businessAuth'
      })
    }
  }
}
</script>

<style lang="less">
.businessAuthTicketWrapper {
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
			width: 100%;
			text-align: left;
			p {
				margin: 0;
				padding: 14px 54px;
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
			span {
				// cursor: pointer;
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
	.ant-select-selection {
		width: 100%;
	}
}
</style>
