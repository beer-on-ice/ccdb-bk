<template>
	<a-card class="cardBasicInfoWrapper"
		:hoverable="false"
		:bordered="false">
		<a-row>
			<a-col class="item-spec item-spec-left"
				:span="12">
				<a-form-item>
					<p>机构名称</p>
					<div>{{currData.companyName}}</div>
				</a-form-item>
				<a-form-item>
					<p :class="{'notPass':currData.notPassList.includes('organizationName')}">机构简称</p>
					<div>
						<a-input type="text"
							placeholder="请输入机构简称"
							v-decorator="['organizationName']" />
					</div>
				</a-form-item>
			</a-col>
			<a-col class="item-spec item-spec-right"
				:span="12">
				<a-form-item>
					<p :class="{'notPass':currData.notPassList.includes('logoUrl')}">机构LOGO</p>
					<div class="flex-s-c">
						<prev-img-upload uploadTitle="本地上传"
							:uploadInfo="uploadInfo"
							:beforeUpload="beforeUpload"
							:handleRemoveUpload="handleDeleteUpload"
							@handleDeleteUpload="handleDeleteUpload"></prev-img-upload>
						<span style="color:red;">图片格式：JPG , JPEG , PNG , GIF（建议不超过1MB）</span>
					</div>
				</a-form-item>
			</a-col>
		</a-row>
		<a-descriptions bordered
			:column="3"
			:colon="false">
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('provinceName')||currData.notPassList.includes('cityName')}">总部所在地</span>
				<a-form-item>
					<div>
						<area-select type='text'
							v-model="selectedCity"
							:placeholders="['选择省','选择市']"
							:data="pca"></area-select>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('establishmentDate')}">成立时间</span>
				<a-form-item>
					<div>
						<a-date-picker v-decorator="['establishmentDate']" />
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('characterOfStructure')||currData.notPassList.includes('goPublic')||currData.notPassList.includes('stockCode')} ">机构性质</span>
				<a-form-item>
					<div class="flex-s-c">
						<a-select style="width: 120px"
							v-decorator="['characterOfStructure']"
							placeholder="请选择">
							<a-select-option v-for="item in natureList"
								:key="item.name">
								{{item.name}}
							</a-select-option>
						</a-select>
						<a-radio-group style="margin-left: 20px"
							name="radioGroup"
							:default-value="0"
							v-decorator="['goPublic']">
							<a-radio :value="0">
								上市
							</a-radio>
							<a-radio :value="1">
								非上市
							</a-radio>
						</a-radio-group>
						<div>
							<span>股票代码：</span>
							<a-input style="width: 120px"
								type="text"
								v-decorator="['stockCode']"></a-input>
						</div>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('tel')} ">联系电话</span>
				<a-form-item>
					<a-input placeholder="请输入电话号码"
						v-decorator="['tel']"></a-input>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('institutionalType')} ">机构类型</span>
				<a-form-item>
					<div>
						<a-tree-select v-for="(item,idx) in institutionalTypeList"
							:key="idx"
							v-decorator="[`institutionalType${idx}`,{initialValue:item.secondLevel?item.secondLevel:item.firstLevel}]"
							style="width: 200px"
							:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
							:tree-data="treeData"
							@select="(value, node, extra)=>selectTree(value, node, extra,institutionalTypeList[idx])"
							placeholder="请选择">
						</a-tree-select>
						<a-button-group style="margin-left:20px;">
							<a-button @click="handleAddType">+</a-button>
							<a-button @click="institutionalTypeList.pop()"
								:disabled="institutionalTypeList.length === 1">-</a-button>
						</a-button-group>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('website')} ">官方网址</span>
				<a-form-item>
					<a-input placeholder="请输入官方网址"
						v-decorator="['website']"></a-input>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="4"
				label="频道选择/排序">
				<a-form-item>
					<div>
						<div class="channelType"
							v-for="(item,index) in basicInfo.channelSorting"
							:key="index">
							{{item.classes}}： {{item.orderNum}}
						</div>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('institutionStatus')||currData.notPassList.includes('institutionStatusShowhidden')} ">机构状态</span>
				<a-form-item>
					<div>
						<a-tree-select v-decorator="[`institutionStatus`]"
							style="width: 200px"
							:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
							:tree-data="instituStateList"
							placeholder="请选择"
							allow-clear>
						</a-tree-select>
						<a-radio-group style="margin-left: 20px"
							name="radioGroup"
							:default-value="0"
							v-decorator="['institutionStatusShowhidden']">
							<a-radio :value="0">
								显示
							</a-radio>
							<a-radio :value="1">
								隐藏
							</a-radio>
						</a-radio-group>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('problemTime')} ">问题时间</span>
				<a-form-item>
					<a-date-picker v-decorator="['problemTime']" />
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('assetManagementScale')} ">资产管理规模</span>
				<a-form-item>
					<div class="flex-s-c">
						<a-input placeholder="请输入资产管理规模"
							v-decorator="['assetManagementScale']" />
						<div style="width:100px;">万元</div>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('goodAtTo')} ">擅长投向</span>
				<a-form-item>
					<div class="flex-s-c">
						<a-input placeholder="请输入擅长投向"
							v-decorator="['goodAtTo']"></a-input>
					</div>
				</a-form-item>
			</a-descriptions-item>
			<a-descriptions-item :span="2">
				<span slot="label"
					:class="{'notPassT':currData.notPassList.includes('actualController')||currData.notPassList.includes('actualControllerShowhidden')} ">实际控制人</span>
				<a-form-item>
					<div>
						<a-input style="width: 120px"
							v-decorator="['actualController']">
						</a-input>
						<a-radio-group style="margin-left: 20px"
							name="radioGroup"
							:default-value="0"
							v-decorator="['actualControllerShowhidden']">
							<a-radio :value="0">
								显示
							</a-radio>
							<a-radio :value="1">
								隐藏
							</a-radio>
						</a-radio-group>
					</div>
				</a-form-item>
			</a-descriptions-item>
		</a-descriptions>
	</a-card>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import { PrevImgUpload } from '@/components'
import { pca } from 'area-data'

// 机构性质
const natureList = [
  {
    id: 1,
    name: '国企'
  },
  {
    id: 2,
    name: '民营'
  },
  {
    id: 3,
    name: '合资'
  }
]
// 机构状态
const instituStateList = [
  {
    title: '在营',
    value: '在营',
    key: '在营',
    selectable: false,
    children: [
      {
        value: '仅存续',
        key: '仅存续',
        title: '仅存续'
      },
      {
        value: '无存续',
        key: '无存续',
        title: '无存续'
      }
    ]
  },
  {
    title: '产品踩雷',
    value: '产品踩雷',
    key: '产品踩雷'
  },
  {
    title: '经侦介入',
    value: '经侦介入',
    key: '经侦介入'
  },
  {
    title: '高管涉刑',
    value: '高管涉刑',
    key: '高管涉刑'
  },
  {
    title: '失联',
    value: '失联',
    key: '失联'
  },
  {
    title: '争议',
    value: '争议',
    key: '争议'
  }
]
// 机构类型
const treeData = [
  {
    title: '金融集团',
    value: '金融集团',
    key: '金融集团'
  },
  {
    title: '银行',
    value: '银行',
    key: '银行',
    selectable: false,
    children: [
      {
        value: '银行-农信社',
        key: '银行-农信社',
        title: '农信社'
      },
      {
        value: '银行-农合行',
        key: '银行-农合行',
        title: '农合行'
      },
      {
        value: '银行-农商行',
        key: '银行-农商行',
        title: '农商行'
      },
      {
        value: '银行-国有商业银行',
        key: '银行-国有商业银行',
        title: '国有商业银行'
      },
      {
        value: '银行-城市商业银行',
        key: '银行-城市商业银行',
        title: '城市商业银行'
      },
      {
        value: '银行-外资银行',
        key: '银行-外资银行',
        title: '外资银行'
      },
      {
        value: '银行-股份制商业银行',
        key: '银行-股份制商业银行',
        title: '股份制商业银行'
      },
      {
        value: '银行-邮政储蓄银行',
        key: '银行-邮政储蓄银行',
        title: '邮政储蓄银行'
      },
      {
        value: '银行-商业银行理财子公司',
        key: '银行-商业银行理财子公司',
        title: '商业银行理财子公司'
      }
    ]
  },
  {
    title: '私募',
    value: '私募',
    key: '私募',
    selectable: false,
    children: [
      {
        value: '私募-会计事务所',
        key: '私募-会计事务所',
        title: '会计事务所'
      },
      {
        value: '私募-保险公司',
        key: '私募-保险公司',
        title: '保险公司'
      },
      {
        value: '私募-保险公司子公司',
        key: '私募-保险公司子公司',
        title: '保险公司子公司'
      },
      {
        value: '私募-公募基金管理公司',
        key: '私募-公募基金管理公司',
        title: '公募基金管理公司'
      },
      {
        value: '私募-公募基金管理公司子公司',
        key: '私募-公募基金管理公司子公司',
        title: '公募基金管理公司子公司'
      },
      {
        value: '私募-其他机构',
        key: '私募-其他机构',
        title: '其他机构'
      },
      {
        value: '私募-其他私募投资基金管理人',
        key: '私募-其他私募投资基金管理人',
        title: '其他私募投资基金管理人'
      },
      {
        value: '私募-商业银行',
        key: '私募-商业银行',
        title: '商业银行'
      },
      {
        value: '私募-支付结算机构',
        key: '私募-支付结算机构',
        title: '支付结算机构'
      },
      {
        value: '私募-期货公司',
        key: '私募-期货公司',
        title: '期货公司'
      },
      {
        value: '私募-期货公司资管子公司',
        key: '私募-期货公司资管子公司',
        title: '期货公司资管子公司'
      },
      {
        value: '私募-独立服务机构',
        key: '私募-独立服务机构',
        title: '独立服务机构'
      },
      {
        value: '私募-独立第三方销售机构',
        key: '私募-独立第三方销售机构',
        title: '独立第三方销售机构'
      },
      {
        value: '私募-私募股权、创业投资基金管理人',
        key: '私募-私募股权、创业投资基金管理人',
        title: '私募股权、创业投资基金管理人'
      },
      {
        value: '私募-私募证券投资基金管理人',
        key: '私募-私募证券投资基金管理人',
        title: '私募证券投资基金管理人'
      },
      {
        value: '私募-私募资产配置类管理人',
        key: '私募-私募资产配置类管理人',
        title: '私募资产配置类管理人'
      },
      {
        value: '私募-证券公司',
        key: '私募-证券公司',
        title: '证券公司'
      },
      {
        value: '私募-证券公司私募基金子公司',
        key: '私募-证券公司私募基金子公司',
        title: '证券公司私募基金子公司'
      },
      {
        value: '私募-证券公司资管子公司',
        key: '私募-证券公司资管子公司',
        title: '证券公司资管子公司'
      },
      {
        value: '私募-证券投资咨询机构',
        key: '私募-证券投资咨询机构',
        title: '证券投资咨询机构'
      }
    ]
  },
  {
    title: '保险',
    value: '保险',
    key: '保险',
    selectable: false,
    children: [
      {
        value: '保险-人寿相互保险',
        key: '保险-人寿相互保险',
        title: '人寿相互保险'
      },
      {
        value: '保险-人身险',
        key: '保险-人身险',
        title: '人身险'
      },
      {
        value: '保险-保险代理',
        key: '保险-保险代理',
        title: '保险代理'
      },
      {
        value: '保险-保险公估',
        key: '保险-保险公估',
        title: '保险公估'
      },
      {
        value: '保险-保险经纪',
        key: '保险-保险经纪',
        title: '保险经纪'
      },
      {
        value: '保险-健康险',
        key: '保险-健康险',
        title: '健康险'
      },
      {
        value: '保险-养老险',
        key: '保险-养老险',
        title: '养老险'
      },
      {
        value: '保险-再保险',
        key: '保险-再保险',
        title: '再保险'
      },
      {
        value: '保险-农业险',
        key: '保险-农业险',
        title: '农业险'
      },
      {
        value: '保险-控股',
        key: '保险-控股',
        title: '控股'
      },
      {
        value: '保险-政策性公司',
        key: '保险-政策性公司',
        title: '政策性公司'
      },
      {
        value: '保险-财产相互保险',
        key: '保险-财产相互保险',
        title: '财产相互保险'
      },
      {
        value: '保险-财产险',
        key: '保险-财产险',
        title: '财产险'
      },
      {
        value: '保险-责任险',
        key: '保险-责任险',
        title: '责任险'
      },
      {
        value: '保险-资产管理',
        key: '保险-资产管理',
        title: '资产管理'
      },
      {
        value: '保险-集团',
        key: '保险-集团',
        title: '集团'
      }
    ]
  },
  {
    title: '信托',
    value: '信托',
    key: '信托',
    selectable: false,
    children: [
      {
        value: '信托-仅信托公司',
        key: '信托-仅信托公司',
        title: '仅信托公司'
      },
      {
        value: '信托-信托公司及私募管理人',
        key: '信托-信托公司及私募管理人',
        title: '信托公司及私募管理人'
      }
    ]
  },
  {
    title: '证券',
    value: '证券',
    key: '证券',
    selectable: false,
    children: [
      {
        value: '证券-证券公司',
        key: '证券-证券公司',
        title: '证券公司'
      },
      {
        value: '证券-证券公司另类投资子公司',
        key: '证券-证券公司另类投资子公司',
        title: '证券公司另类投资子公司'
      },
      {
        value: '证券-证券公司私募基金子公司',
        key: '证券-证券公司私募基金子公司',
        title: '证券公司私募基金子公司'
      },
      {
        value: '证券-证券公司资管子公司',
        key: '证券-证券公司资管子公司',
        title: '证券公司资管子公司'
      },
      {
        value: '证券-证券投资咨询公司',
        key: '证券-证券投资咨询公司',
        title: '证券投资咨询公司'
      },
      {
        value: '证券-证券资信评级机构',
        key: '证券-证券资信评级机构',
        title: '证券资信评级机构'
      },
      {
        value: '证券-股权交易中心',
        key: '证券-股权交易中心',
        title: '股权交易中心'
      },
      {
        value: '证券-其他机构',
        key: '证券-其他机构',
        title: '其他机构'
      }
    ]
  }
]

export default {
  components: {
    PrevImgUpload
  },
  props: {
    basicInfo: {
      default: {},
      required: true
    },
    form: {
      default: {},
      required: true
    }
  },
  data () {
    return {
      currData: {
        notPassList: []
      },
      selectedCity: [],
      pca,
      natureList,
      instituStateList,
      treeData,
      institutionalTypeList: [
        {
          firstLevel: '',
          secondLevel: ''
        }
      ],
      fileList: [],
      uploadInfo: {
        fileList: [],
        showOffList: {}
      }
    }
  },
  methods: {
    selectTree (value, node, extra, oldItem) {
      const { treeData, institutionalTypeList } = this
      let arr = []
      let tmpObj = {}
      treeData.forEach(item => {
        if (item.hasOwnProperty('children')) {
          item.children.filter(el => {
            if (el.key === value) {
              tmpObj = {
                firstLevel: item.key,
                secondLevel: value
              }
            }
          })
        } else {
          if (item.key === value) {
            tmpObj = {
              firstLevel: item.key,
              secondLevel: ''
            }
          }
        }
      })
      this.institutionalTypeList = institutionalTypeList.map(item => {
        if (
          item.firstLevel === oldItem.firstLevel &&
					item.secondLevel === oldItem.secondLevel
        ) {
          return { ...item, ...tmpObj }
        }
        return { ...item }
      })
    },
    handleAddType () {
      const len = this.institutionalTypeList.length
      const nowItem = this.institutionalTypeList[len - 1]
      if (nowItem.firstLevel === '' && nowItem.secondLevel === '') {
        return this.$notification.error({
          message: '请先填写完整！'
        })
      }
      this.institutionalTypeList.push({ firstLevel: '', secondLevel: '' })
    },
    initialData () {
      const {
        form: { setFieldsValue },
        handleInstitutionalType,
        backupImgInfo,
        currData: { logoUrl, provinceName, cityName, institutionalType }
      } = this
      this.selectedCity = [provinceName, cityName]

      this.uploadInfo.showOffList = backupImgInfo(logoUrl)
      handleInstitutionalType(institutionalType)
    },
    handleInstitutionalType (institutionalType) {
      if (institutionalType) {
        this.institutionalTypeList = JSON.parse(institutionalType)
      }
    },
    // 回绑照片
    backupImgInfo (url) {
      if (!url) {
        return {
          winPath: '',
          fileUrl: ''
        }
      }
      return {
        winPath: url,
        fileUrl: url
      }
    },
    beforeUpload (file) {
      const regp = /,|;/
      const bool = regp.test(file.name)
      if (bool) {
        this.$notification.error({
          message: '图片名称请不要带有 , 或者 ;特殊字符'
        })
        return false
      }
      this.uploadInfo.fileList.length = 0
      this.uploadInfo.fileList = [...this.uploadInfo.fileList, file]
      return false
    },
    handleDeleteUpload (item) {
      this.uploadInfo = {
        fileList: [],
        showOffList: {}
      }
    }
  },
  watch: {
    basicInfo (newVal, oldVal) {
      this.currData = { ...newVal }
      this.$nextTick(() => {
        this.initialData()
      })
    }
  }
}
</script>

<style lang="less">
.cardBasicInfoWrapper {
	.ant-card-body {
		padding: 0;
	}
	.ant-form-item {
		margin: 0;
	}
	.area-select-wrap {
		.area-selected-trigger {
			height: 36px;
			line-height: 36px;
			padding: 0 0 0 40px;
		}
	}

	.ant-upload-list-item-name {
		padding-right: 16px;
	}
	.ant-descriptions-bordered .ant-descriptions-item-label,
	.ant-descriptions-bordered .ant-descriptions-item-content {
		width: 394px;
	}

	.item-spec {
		p {
			width: 162px;
			background: rgb(236, 243, 253);
			margin: 0;
			margin-right: 10px;
			text-align: center;
			height: 96px;
			line-height: 96px;
			border: 1px solid #e8e8e8;
			border-bottom: none;
			border-top: none;
		}
		.ant-form-item {
			border-top: 1px solid #e8e8e8;
			.ant-form-item-children {
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
		&.item-spec-right {
			p {
				height: 193px;
				line-height: 193px;
			}
		}
	}
	.channelType {
		display: inline-block;
		margin-right: 20px;
		.ant-input {
			width: 100px;
			margin-left: 10px;
		}
	}
}
</style>
