<template>
	<a-card class="comBusinessInfoWrapper">
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('companyName')}">公司名称</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入公司名称"
						v-decorator="['companyName']"
						:disabled="true"
						style="width:250px" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('englishName')}">英文名称</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入英文名称"
						v-decorator="['englishName']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('legalPerson')}">法定代表人</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入法定代表人"
						v-decorator="['legalPerson']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('generalManager')}">总经理</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入总经理"
						v-decorator="['generalManager']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('registeredCapital')}">注册资本</p>
			<a-form-item>
				<div class="flex-s-c">
					<a-input placeholder="请输入注册资本"
						v-decorator="['registeredCapital']" />
					<div style="width:100px;">万元</div>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('paidInCapital')}">实缴资本</p>
			<a-form-item>
				<div class="flex-s-c">
					<a-input placeholder="请输入实缴资本"
						v-decorator="['paidInCapital']" />
					<div style="width:100px;">万元</div>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('establishmentDate')}">成立时间</p>
			<a-form-item>
				<div>
					<a-date-picker v-decorator="['establishmentDate']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('operationStatus')}">经营状态</p>
			<a-form-item>
				<div>
					<a-select style="width: 250px"
						v-decorator="['operationStatus']">
						<a-select-option v-for="item in operatingStatusList"
							:key="item">
							{{item}}
						</a-select-option>
					</a-select>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('creditCode')}">统一社会信用代码</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入统一社会信用代码"
						v-decorator="['creditCode']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('registrationNumber')}">工商注册号</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入工商注册号"
						v-decorator="['registrationNumber']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('identificationNumber')}">纳税识别号</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入纳税识别号"
						v-decorator="['identificationNumber']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('organizationalCode')}">组织机构代码</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入法定代表人"
						v-decorator="['organizationalCode']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('companyType')}">公司类型</p>
			<a-form-item>
				<div>
					<a-select style="width: 350px"
						v-decorator="['companyType']">
						<a-select-option v-for="item in companyTypeList"
							:key="item">
							{{item}}
						</a-select-option>
					</a-select>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('industry')}">所属行业</p>
			<a-form-item>
				<div>
					<a-select style="width: 250px"
						v-decorator="['industry']">
						<a-select-option v-for="item in industryList"
							:key="item">
							{{item}}
						</a-select-option>
					</a-select>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('approvalDate')}">核准日期</p>
			<a-form-item>
				<div>
					<a-date-picker v-decorator="['approvalDate']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('registrationAuthority')}">登记机关</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入登记机关"
						v-decorator="['registrationAuthority']" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('personnelScale')}">人员规模</p>
			<a-form-item>
				<div class="flex-s-c">
					<a-input placeholder="请输入人员规模"
						v-decorator="['personnelScale']" />
					<div>人</div>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('insuredPersons')}">参保人数</p>
			<a-form-item>
				<div class="flex-s-c">
					<a-input placeholder="请输入参保人数"
						v-decorator="['insuredPersons']" />
					<div>人</div>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('address')}">公司地址</p>
			<a-form-item>
				<div>
					<a-input type="text"
						placeholder="请输入公司地址"
						v-decorator="['address']"
						style="width:250px;" />
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-5">
			<p :class="{'notPass':currData.notPassList.includes('businessTerm')}">营业期限</p>
			<a-form-item>
				<div>
					<a-date-picker v-decorator="['operatingPeriodS']" /> 至
					<a-date-picker :disabled="isNotime"
						v-decorator="['operatingPeriodE']" />
					<a-checkbox style="margin-left:10px;"
						:checked="isNotime"
						@change="operatingPeriodChange">
						无固定期限
					</a-checkbox>
				</div>
			</a-form-item>
		</a-card-grid>
		<a-card-grid class="special-w-1">
			<p :class="{'sp-a':true,'notPass':currData.notPassList.includes('businessScope')}">经营范围</p>
			<a-form-item class="sp">
				<div>
					<a-textarea :class="{'topIndex':businessInfo.auditStatus === 1}"
						:disabled="businessInfo.auditStatus === 1"
						v-decorator="['businessScope']"
						:autoSize="{ minRows: 4, maxRows: 10 }"></a-textarea>
				</div>
			</a-form-item>
		</a-card-grid>
	</a-card>
</template>

<script>
import {
  showCompanyType,
  showOperationStatus,
  showIndustryInvolved
} from '@/api/institution/institutionArchives'
const operatingStatusList = []
const companyTypeList = []
const industryList = []
export default {
  props: ['businessInfo'],
  data () {
    return {
      currData: {
        notPassList: []
      },
      operatingStatusList,
      companyTypeList,
      industryList,
      isNotime: false
    }
  },
  created () {
    this.getDefaultInfo()
  },
  methods: {
    operatingPeriodChange (e) {
      this.isNotime = e.target.checked
    },
    getDefaultInfo () {
      this.showCompanyType()
      this.showOperationStatus()
      this.showIndustryInvolved()
    },
    async showCompanyType () {
      try {
        const res = await showCompanyType()
        if (res.code === 200) {
          this.companyTypeList = res.data || []
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async showOperationStatus () {
      try {
        const res = await showOperationStatus()
        if (res.code === 200) {
          this.operatingStatusList = res.data || []
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    async showIndustryInvolved () {
      try {
        const res = await showIndustryInvolved()
        if (res.code === 200) {
          this.industryList = res.data || []
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    }
  },
  watch: {
    businessInfo (newVal, oldVal) {
      this.currData = { ...newVal }
    }
  }
}
</script>

<style lang="less">
.comBusinessInfoWrapper {
	.special-w-1 {
		position: relative;
		min-height: 69px;
		.sp {
			width: 70%;
			margin-left: 200px;
		}
		.sp-a {
			min-height: 69px !important;
			position: absolute !important;
			top: 1px !important;
			left: 1px !important;
			bottom: 0 !important;
			right: 0 !important;
			height: 100% !important;
			line-height: 100% !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
