<template>
	<div class="businessAuthTicketWrapper">
		<h1>新建工单</h1>
		<a-card>
			<a-card title="基本信息">
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p >企业名称</p>
						<p>
							<a-input placeholder="请填写企业名称"></a-input>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>企业类型</p>
						<p>{{overViewInfo.type | typeFilter}}</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>联系人姓名</p>
						<p>
							<a-input placeholder="请填写联系人姓名"></a-input>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:50%;textAlign:'center'">
					<div>
						<p>联系人职位</p>
						<p>
							<a-input placeholder="请填写联系人职位"></a-input>
						</p>
					</div>
				</a-card-grid>
				<a-card-grid style="width:100%;textAlign:'center'">
					<div>
						<p>联系人电话</p>
						<p>
							<a-input placeholder="请填写联系人电话"></a-input>
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
						<a-radio checked>电话沟通</a-radio>
					</a-form-item>
					<a-form-item label="处理结果："
						:label-col="{ span: 2 }"
						:wrapper-col="{ span: 9 }">
						<a-select style="width: 120px"
							v-model="queryParam.result">
							<a-select-option value="0">有意向合作</a-select-option>
							<a-select-option value="1">仅咨询</a-select-option>
							<a-select-option value="2">无意向合作</a-select-option>
							<a-select-option value="3">其他</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="填写记录："
						:label-col="{ span: 2 }"
						:wrapper-col="{ span: 9 }">
						<a-textarea placeholder="请填写沟通记录"
							:autosize="{ minRows: 2, maxRows: 6 }"
							v-decorator="['record',
							{rules: [{ required: true, message: '请在此输入反馈信息', trigger: 'change' }]}
						]" />
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
import { deal } from '@/api/businessAuth'

export default {
  name: 'businessAuthBeg',
  data () {
    return {
      form: this.$form.createForm(this),
      overViewInfo: {},
      queryParam: {
        infoId: '',
        method: 0,
        result: '0',
        record: '',
        checkBy: JSON.parse(Vue.ls.get('USERINFO')).username
      }
    }
  },
  created () {
    this.overViewInfo = JSON.parse(this.$route.params.info)
    this.queryParam.infoId = this.overViewInfo.id
  },
  methods: {
    hanldeBack () {
      this.$router.push({
        path: '/customer/businessAuth'
      })
    },
    hanldeSubmit () {
      const {
        form: { getFieldValue, validateFields }
      } = this
      this.queryParam.record = getFieldValue('record')
      validateFields(async err => {
        if (!err) {
          try {
            let res = await deal(this.queryParam)
            if (res.code === 200) {
              this.$notification.success({
                message: res.msg || '提交成功！'
              })
            } else {
              throw new Error(res.msg)
            }
          } catch (error) {
            this.$notification.error({
              message: error || '网络故障，请重试！'
            })
          }
        }
      })
    }
  },
  filters: {
    // 类型
    typeFilter (code) {
      switch (Number(code)) {
        case 1:
          return '基金'
        case 2:
          return '信托'
        case 3:
          return '基金且信托'
        case 4:
          return '银行'
        case 5:
          return '保险'
        case 6:
          return '基金且银行'
        case 7:
          return '基金且保险'
        default:
          return '未知'
      }
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
			p {
				margin: 0;
				padding:14px 54px;
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
				cursor: pointer;
				color: rgba(42, 130, 228, 1);
			}
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
