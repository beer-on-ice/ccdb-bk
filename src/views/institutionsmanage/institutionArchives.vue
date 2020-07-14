<template>
	<div class="institutionArchivesWrapper">
		<h1>机构管理 - 机构档案管理</h1>
		<a-card :bordered="false">
			<div class="filterWrapper">
				<a-form layout="inline"
					:form="form">
					<a-form-item label="机构名称">
						<a-input v-model="queryParam.companyName"
							placeholder="请输入" />
					</a-form-item>
					<a-form-item label="频道分类">
						<a-select v-model="queryParam.channel"
							style="width:150px">
							<a-select-option v-for="item in typeList"
								:value="item.name"
								:key="item.type">
								{{item.name}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="产品数量">
						<a-select v-model="queryParam.numberOfSorting"
							style="width:100px">
							<a-select-option v-for="item in sortList"
								:value="item.id"
								:key="item.id">
								{{item.title}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-button-group style="margin-top:4px;">
						<a-button @click="$refs.table.refresh(true)">查询</a-button>
						<a-button @click="handleRestQueryParam">重置</a-button>
					</a-button-group>
				</a-form>
			</div>
			<s-table ref="table"
				rowKey="id"
				:columns="columns"
				:data="loadData"
				:pagination="pagination"
				:row-selection="rowSelection"
				bordered
				style="margin-top:20px;">
				<span slot="serial"
					slot-scope="text, record, index">
					{{ index + 1 }}
				</span>
				<span slot="action"
					slot-scope="text, record">
					<div class="btnWrapper">
						<a-button type="primary"
							@click="goDetail(record)">详情</a-button>
					</div>
				</span>
			</s-table>
		</a-card>
	</div>
</template>

<script>
import Vue from 'vue'
import debounce from 'lodash/debounce'
import { STable } from '@/components'
import {
  theChannelList,
  listOfInstitutions
} from '@/api/institution/institutionArchives'

const sortList = [
  {
    id: 0,
    title: '默认'
  },
  {
    id: 1,
    title: '升序'
  },
  {
    id: 2,
    title: '降序'
  }
]
const columns = [
  {
    title: '序号',
    align: 'center',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '频道分类',
    width: '234px',
    dataIndex: 'channel',
    align: 'center'
  },
  {
    title: '机构名称',
    width: '234px',
    dataIndex: 'companyName',
    align: 'center'
  },
  {
    title: '产品数量',
    width: '234px',
    dataIndex: 'productCount',
    align: 'center'
  },
  {
    title: '最后修改时间',
    dataIndex: 'lastModifiedTime',
    align: 'center'
  },
  {
    title: '最后修改人',
    dataIndex: 'lastModifier',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  name: 'institutionArchives',
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      searchKey: '',
      channel: '',
      typeList: [],
      sortList,
      columns,
      rowSelection,
      queryParam: {
        startPage: 1,
        pageSize: 10,
        companyName: '',
        channel: '',
        numberOfSorting: 0
      },
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
      loadData: () => {
        return listOfInstitutions(this.queryParam).then(res => {
          if (res.code === 200 && res.data) {
            if (res.data.pageNum > res.data.navigateLastPage) {
              // 解决当点击的页码超过实际页数重复请求bug
              this.queryParam.startPage = res.data.navigateLastPage
            }
            res.data.data = res.data.list
            res.data.pageNo = res.data.pageNum
            res.data.totalPage = res.data.pages
            res.data.totalCount = res.data.total

            delete res.data.list
            delete res.data.pageNum
            delete res.data.pages
            delete res.data.total

            return res.data
          } else {
            res.data = {}
            res.data.data = []
            res.data.pageNo = 0
            res.data.totalPage = 0
            res.data.totalCount = 0
            return res.data
          }
        })
      }
    }
  },
  created () {
    this.theChannelList()
  },
  methods: {
    async theChannelList (name) {
      try {
        let res = await theChannelList()
        if (res.code === 200) {
          this.typeList = res.data
        } else {
          throw new Error(res.msg)
        }
      } catch ({ message }) {
        this.$notification.error({
          message: message || '网络故障，请重试！'
        })
      }
    },
    handleRestQueryParam () {
      this.queryParam = {
        ...{
          startPage: 1,
          pageSize: 10,
          companyName: '',
          channel: '',
          numberOfSorting: 0
        }
      }
      this.$refs.table.refresh(true)
    },
    goDetail ({ id, companyUrl, companyName }) {
      this.$router.push({
        name: 'institutionDetail',
        query: {
          id,
          companyUrl,
          companyName
        }
      })
    }
  }
}
</script>

<style lang="less">
.institutionArchivesWrapper {
	h1 {
		font-size: 20px;
		font-weight: bold;
	}
	.btnWrapper {
		.ant-btn {
			margin: 0 5px;
		}
	}
}
</style>
