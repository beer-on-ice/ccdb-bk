<template>
	<div class="policyManagementWrapper">
		<a-row :gutter="24"
			class="policyWrapper">
			<a-col :xl="8"
				:lg="8"
				:md="8"
				:sm="8"
				:xs="8">
				<img class="policyImg"
					:src="policyImg" />
			</a-col>
			<a-col :xl="16"
				:lg="16"
				:md="16"
				:sm="16"
				:xs="16">
				<div class="policyRightWrapper">
					<div class="policyRightTop">
						<h3>预约体检</h3>
						<div>
							<p>
								<span>图片素材</span>
								<span>图片要求：111*111 小于2MB</span>
								<a-upload name="file"
									:action="uploadUrl"
									:headers="myHeaders"
									:beforeUpload="beforePicUpload"
									:data="uploadData"
									:showUploadList="false"
									@change="handleImgChange"
									class="btn">
									<a-button>
										{{isImgLoad?'再次上传':'上传'}}
									</a-button>
								</a-upload>
							</p>
							<p>
								<span>文档素材</span>
								<span>文档要求：PDF、JPG、PNG 小于2MB</span>
								<a-upload name="file"
									:action="uploadUrl"
									:headers="myHeaders"
									:beforeUpload="beforeFileUpload"
									:data="uploadData"
									:showUploadList="false"
									@change="handleFileChange"
									class="btn">
									<a-button>
										{{isFileLoad?'再次上传':'上传'}}
									</a-button>
								</a-upload>
							</p>
						</div>
					</div>
					<div class="policyRightMiddle">
						<h3>最新政策</h3>
						<div>
							<a-row>
								<a-col :xl="12"
									:lg="12"
									:md="12"
									:sm="12"
									:xs="12"
									v-for="(item,index) in newPolicy"
									:key="item.id"
									class="policyItem">
									<p class="clearfix">
										<span>{{index + 1}}.</span>
										<span>{{item.title}}</span>
										<a-button class="btn"
											type='danger'
											@click="handleDelPolicy(item.id)"
											v-auth="$route.meta.dutyName">删除</a-button>
										<a-button class="btn"
											type='primary'
											@click="handleNewPolicyEdit(item.id)">{{item.state?'已发布':'待发布'}}</a-button>
										<span style="float:right;">{{item.releaseDate}}</span>
									</p>
								</a-col>
								<a-col :xl="12"
									:lg="12"
									:md="12"
									:sm="12"
									:xs="12"
									class="policyItem policyItemS">
									<p>
										<a-button class="btn"
											@click="$router.push({ path: '/policy/newpolicyadd' })">新增</a-button>
									</p>
								</a-col>
							</a-row>
						</div>
					</div>
					<div class="policyRightBottom">
						<h3>保单服务</h3>
						<div class="tablePageWrapper">
							<div class="tablePageSearchWrapper">
								<a-form layout="inline">
									<div class="searchBtnWrapper">
										<a-form-item label="服务类别：">
											<a-button-group>
												<a-button @click="handleTypeChose(allBtn)"
													type="primary"
													:ghost="!allBtn.isChosen">{{allBtn.name}}</a-button>
												<a-button v-for="item in btnGroups"
													:key="item.name"
													@click="handleTypeChose(item)"
													type="primary"
													:ghost="!item.isChosen">{{item.name}}</a-button>
											</a-button-group>
										</a-form-item>
									</div>
									<div>
										<a-form-item label="二级类别">
											<a-select v-model="queryParam.twoClassOfService"
												placeholder="请选择"
												style="min-width:150px;">
												<a-select-option :value="item.productName"
													v-for="item in twoClassOfServiceList"
													:key="item.productCode">{{item.productName}}</a-select-option>
											</a-select>
										</a-form-item>
									</div>
									<div>
										<a-row>
											<a-col :xl="16"
												:lg="16"
												:md="16"
												:sm="16"
												:xs="16">
												<a-form-item label="保险公司：">
													<a-select v-model="queryParam.insuranceName"
														placeholder="请选择"
														style="min-width:150px;">
														<a-select-option value="友邦">友邦</a-select-option>
														<a-select-option value="保诚">保诚</a-select-option>
														<a-select-option value="安盛">安盛</a-select-option>
														<a-select-option value="大都会">大都会</a-select-option>
														<a-select-option value="宏利">宏利</a-select-option>
														<a-select-option value="富通">富通</a-select-option>
													</a-select>
												</a-form-item>
											</a-col>
											<a-col :xl="8"
												:lg="8"
												:md="8"
												:sm="8"
												:xs="8"
												class="searchBtnWrapper">
												<a-button @click="$refs.table.refresh(false)">查询</a-button>
												<a-button style="margin:0 20px;"
													@click="resetSearchForm">重置</a-button>
												<a-button @click="warrantyAddVisible = true"
													v-auth="$route.meta.dutyName">新增</a-button>
											</a-col>
										</a-row>
									</div>
								</a-form>
							</div>
							<s-table ref="table"
								size="default"
								rowKey="id"
								:columns="columns"
								:data="loadData"
								:pagination="pagination"
								:rowClassName="changeclassname"
								style="margin-top:20px;"
								bordered>
								<span slot="serial"
									slot-scope="text,record,index">
									{{ index + 1 }}
								</span>
								<span slot="blank"
									slot-scope="text,record">
									<a-checkbox :checked="record.documentFlag==0||record.documentFlag==2" />
								</span>
								<span slot="example"
									slot-scope="text,record">
									<a-checkbox :checked="record.documentFlag==1||record.documentFlag==2" />
								</span>
								<span slot="action"
									slot-scope="text,record">
									<template>
										<a-button type="primary"
											@click="handleWarrantyEdit(record.id)">编辑</a-button>
										<a-divider type="vertical" />
										<a-button type="danger"
											@click="handleWarrantyDelete(record)">删除</a-button>
									</template>
								</span>
							</s-table>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
		<WarrantyEdit ref="warrantyEdit"
			:visible="warrantyEditVisible"
			@viewPdfOrImg="viewPdfOrImg"
			@handleWarrantyEditClose="handleWarrentyClose"></WarrantyEdit>
		<WarrantyAdd :visible="warrantyAddVisible"
			@viewPdfOrImg="viewPdfOrImg"
			@handleWarrantyAddClose="handleWarrentyClose"></WarrantyAdd>
		<a href=""
			ref="a"
			target="_blank"
			style="display:none">预览</a>
	</div>

</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import { STable, WarrantyEdit, WarrantyAdd } from '@/components'
import {
  getPagingInsuranceConfigure,
  getShowTwoStageCosByCosMoreover,
  getListPolicy,
  getRemoveInfo,
  getDeleteInsuranceConfigure,
  specialUrl
} from '@/api/policy'

export default {
  components: {
    STable,
    WarrantyEdit,
    WarrantyAdd
  },
  data () {
    return {
      isImgLoad: false,
      isFileLoad: false,
      uploadUrl: '',
      uploadData: {
        docFlag: 'pic'
      },
      myHeaders: { Authorization: Vue.ls.get(ACCESS_TOKEN) }, // 上传图片用到
      // 左边大图
      policyImg: require('./img/policyManagement.png'),
      // 按钮
      allBtn: {
        name: '全部',
        isChosen: true
      },
      btnGroups: [
        {
          id: 0,
          name: '保单服务',
          isChosen: false
        },
        {
          id: 1,
          name: '理赔服务',
          isChosen: false
        },
        {
          id: 2,
          name: '信息更改',
          isChosen: false
        }
      ],
      twoClassOfServiceList: [],

      // 保单编辑是否显示
      warrantyEditVisible: false,
      warrantyAddVisible: false,
      newPolicy: [], // 政策
      currentRowIndex: '', // 当前点击的列表行的index
      // 查询参数
      queryParam: {
        startPage: 1,
        pageSize: 10,
        twoClassOfService: '',
        classOfService: '',
        insuranceName: ''
      },
      // 表头
      columns: [
        {
          title: '序号',
          align: 'center',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '类别',
          align: 'center',
          dataIndex: 'classOfService'
        },
        {
          title: '二级类别',
          align: 'center',
          dataIndex: 'twoClassOfService'
        },
        {
          title: '保险公司',
          align: 'center',
          dataIndex: 'insuranceName'
        },
        {
          title: '空白文档',
          align: 'center',
          dataIndex: 'blank',
          scopedSlots: { customRender: 'blank' }
        },
        {
          title: '样例',
          align: 'center',
          dataIndex: 'example',
          scopedSlots: { customRender: 'example' }
        },
        {
          title: '最后更新时间',
          align: 'center',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) =>
          (this.queryParam.pageSize = pageSize),
        onChange: page => (this.queryParam.startPage = page),
        showQuickJumper: true
      },
      loadData: parameter => {
        return getPagingInsuranceConfigure(this.queryParam).then(res => {
          if (res.data.pageNum > res.data.navigateLastPage) {
            // 解决当点击的页码超过实际页数重复请求bug
            this.queryParam.startPage = res.data.navigateLastPage
          }
          res.data.data = res.data.list
          res.data.pageNo = res.data.pageNum
          res.data.totalPage = res.data.pages
          res.data.totalCount = res.data.total

          // console.log(res.data)
          delete res.data.list
          delete res.data.pageNum
          delete res.data.pages
          delete res.data.total
          return res.data
        })
      }
    }
  },
  created () {
    this.uploadUrl = specialUrl.policyUpload
    this.getNewestPolicy()
    this.classOfServiceChange(this.queryParam.classOfService)
  },
  methods: {
    // 重置搜索表单
    resetSearchForm () {
      this.queryParam = {
        startPage: 1,
        pageSize: 10,
        classOfService: '',
        twoClassOfService: '',
        insuranceName: ''
      }
      this.resetBtnGroups()

      this.$refs.table.refresh(true)
    },
    resetBtnGroups () {
      this.btnGroups.map(item => (item.isChosen = false))
      this.allBtn.isChosen = true
      this.classOfServiceChange('0,1,2')
    },
    // 获取政策列表
    getNewestPolicy () {
      getListPolicy().then(res => {
        this.newPolicy = res.data
      })
    },
    // 获取二级分类
    async classOfServiceChange (val) {
      let res = await getShowTwoStageCosByCosMoreover({ cosFlags: val })
      this.twoClassOfServiceList = res.data
    },
    // 删除政策
    handleDelPolicy (id) {
      getRemoveInfo({ informationId: id }).then(res => {
        if (res.code === 200) {
          this.$notification.success({
            message: '删除成功！'
          })
          this.getNewestPolicy()
        } else {
          this.$notification.success({
            message: '删除失败，稍后重试！'
          })
        }
      })
    },
    // 服务类别点击
    handleTypeChose (item) {
      if (item.name === '全部') {
        this.allBtn.isChosen = true
        this.btnGroups.map(item => (item.isChosen = false))
        this.queryParam.classOfService = ''
        this.classOfServiceChange(this.queryParam.classOfService)
        return
      }
      item.isChosen = !item.isChosen

      let len = this.btnGroups.filter(item => item.isChosen === true).length
      this.allBtn.isChosen = !len

      let result = []
      let result2 = []
      this.btnGroups.map(item => {
        if (item.isChosen === true) {
          result.push(item.name)
          result2.push(item.id)
        }
      })

      this.queryParam.classOfService = result.join(',')
      this.classOfServiceChange(result2.join(','))
    },
    // 点击当前行使其高亮
    changeclassname (record, index) {
      return index === this.currentRowIndex ? 'active' : ''
    },
    // 保单编辑
    handleWarrantyEdit (id) {
      this.warrantyEditVisible = true
      if (id) {
        this.$refs.warrantyEdit.getInfo(id)
      }
    },
    // 删除保单
    handleWarrantyDelete (record) {
      let param = {
        insuranceCode: record.insuranceCode,
        twoClassOfServiceCode: record.twoClassOfServiceCode
      }
      getDeleteInsuranceConfigure(param).then(res => {
        if (res.code === 200) {
          this.$notification.success({
            message: '删除成功！'
          })
          this.$refs.table.refresh(true)
        } else {
          this.$notification.error({
            message: '删除失败，请重试！'
          })
        }
      })
    },
    // 政策编辑
    handleNewPolicyEdit (id) {
      this.$router.push({ path: '/policy/newpolicyedit', query: { id } })
    },
    beforePicUpload () {
      this.uploadData.docFlag = 'pic'
    },
    beforeFileUpload () {
      this.uploadData.docFlag = 'pdf'
    },
    handleImgChange (file) {
      this.isImgLoad = true
    },
    handleFileChange (file) {
      this.isFileLoad = true
    },
    viewPdfOrImg (file) {
      if (file.type === 'application/pdf') {
        this.$refs.a.href = file.thumbUrl
        this.$refs.a.click()
      } else {
        const img = new Image()
        img.src = file.thumbUrl
        const newWin = window.open('', '_blank')
        newWin.document.write(img.outerHTML)
        newWin.document.title = '预览大图'
        newWin.document.close()
      }
    },
    handleWarrentyClose () {
      this.warrantyEditVisible = false
      this.warrantyAddVisible = false
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less">
.policyWrapper {
	.clearfix::after {
		display: block;
		content: '';
		clear: both;
	}
	.active {
		background-color: rgba(42, 130, 228, 0.3);
	}

	.policyImg {
		width: 80%;
		background-size: contain;
	}
	.policyRightWrapper {
		h3 {
			font-size: 14px;
			font-weight: bold;
		}
		.policyRightTop {
			div {
				width: 100%;
				padding: 0 28px;
				background: #fff;
				border-radius: 10px;
				p {
					padding: 15px 0;
					line-height: 32px;
					margin: 0;
					border-bottom: 1px dashed rgba(229, 229, 229, 1);
					&:nth-of-type(2) {
						border-bottom: none;
					}
					span:nth-of-type(1) {
						font-size: 14px;
						margin-right: 60px;
					}
					span:nth-of-type(2) {
						font-size: 12px;
						color: rgba(166, 166, 166, 1);
					}
					.btn {
						float: right;
					}
				}
			}
		}
		.policyRightMiddle {
			margin-top: 35px;
			div {
				background: #fff;
				padding: 5px 0;
				border-radius: 10px;
				.policyItem {
					border-bottom: 1px dashed #ccc;
					padding: 0 0 0 28px;
					margin-bottom: 5px;
					&.policyItemS {
						border-bottom: none;
					}
					p {
						margin: 0;
						border-right: 1px solid #ccc;
						line-height: 32px;
						&:nth-of-type(odd) {
							border-right: none;
						}
						span {
							display: inline-block;
							overflow: hidden;
							font-size: 14px;
							line-height: 32px;
							margin-right: 2px;
						}
						span:nth-of-type(2) {
							width: 150px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						span:nth-of-type(3) {
							margin: 0 20px 0 60px;
							font-size: 12px;
							line-height: 32px;
							color: rgba(166, 166, 166, 1);
						}
						.btn {
							margin-right: 8px;
							float: right;
						}
					}
				}
			}
		}
		.policyRightBottom {
			margin-top: 35px;
			.tablePageWrapper {
				background: #fff;
				padding: 20px;
				border-radius: 10px;
			}
		}
	}
}
</style>
