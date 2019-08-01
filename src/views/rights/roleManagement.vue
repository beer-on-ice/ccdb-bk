<template>
	<div style="padding:20px">
		<el-row>
			<el-col :span="8">
				<el-col>
					<div class="listTitle">角色列表</div>
				</el-col>
				<el-table :data="tableData"
					stripe>
					<el-table-column type="index"
						label="序号"
						width="60">
					</el-table-column>
					<el-table-column prop="roleName"
						label="角色名称">
					</el-table-column>
					<el-table-column prop="activation"
						label="是否可用">
						<template slot-scope="scope">
							<span v-if="scope.row.activation == '1'">无效</span>
							<span v-if="scope.row.activation == '0'">有效</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="warning"
								size="small"
								@click="handleEdit(scope.row)">编辑
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="8"
				:offset="2">
				<!-- 添加角色 -->
				<div class="rightAdd"
					v-if="isAdd">
					<el-form :model="formListAdd"
						ref="formListAdd"
						label-width="100px"
						class="demo-ruleForm">
						<el-form-item>添加角色</el-form-item>
						<el-form-item label="角色名称:"
							prop="roleName">
							<el-input v-model="formListAdd.roleName"></el-input>
						</el-form-item>
						<el-form-item label="可见菜单:"
							prop="menu">
							<el-tree :data="data"
								show-checkbox
								default-expand-all
								node-key="id"
								ref="tree"
								highlight-current
								:props="defaultProps">
							</el-tree>
						</el-form-item>
						<el-form-item label="角色身份">
							<el-radio-group v-model="formListAdd.duty">
								<el-radio label="0">管理者</el-radio>
								<el-radio label="1">员工</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="角色描述:"
							prop="roleDescribe">
							<el-input type="textarea"
								v-model="formListAdd.roleDescribe"></el-input>
						</el-form-item>
						<el-form-item label="状态:">
							<el-radio-group v-model="formListAdd.activation">
								<el-radio label="0">有效</el-radio>
								<el-radio label="1">无效</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"
								@click="submitFormAdd()">保存</el-button>
							<!-- <el-button type="primary" @click="resetFormAdd()">取消</el-button> -->
						</el-form-item>
					</el-form>
				</div>
				<!-- 编辑角色 -->
				<div class="rightEditor"
					v-else>
					<el-form :model="formListEditor"
						ref="formListEditor"
						label-width="100px"
						class="demo-ruleForm">
						<el-form-item style="">编辑角色</el-form-item>
						<el-form-item label="角色名称:"
							prop="roleName">
							<el-input v-model="formListEditor.roleName"></el-input>
						</el-form-item>
						<el-form-item label="可见菜单:"
							prop="menu">
							<el-tree :data="data"
								show-checkbox
								:default-checked-keys="formListEditor.menu"
								node-key="id"
								ref="tree"
								highlight-current
								:props="defaultProps">
							</el-tree>
						</el-form-item>
						<el-form-item label="角色身份">
							<el-radio-group v-model="formListEditor.duty">
								<el-radio label="0">管理者</el-radio>
								<el-radio label="1">员工</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="角色描述:"
							prop="roleDescribe">
							<el-input type="textarea"
								v-model="formListEditor.roleDescribe"></el-input>
						</el-form-item>
						<el-form-item label="状态:"
							prop="activation">
							<el-radio-group v-model="formListEditor.activation">
								<el-radio label="0">有效</el-radio>
								<el-radio label="1">无效</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"
								@click="submitFormEditor()">保存</el-button>
							<el-button type="primary"
								@click="resetFormEditor('formListEditor')">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>

		<!-- 分页 -->
		<el-pagination :page-size="pageSize"
			:current-page='pageNum'
			layout="prev, pager, next"
			@current-change="changePage"
			:total="total">
		</el-pagination>
	</div>
</template>
<script>
// 导入axios和qs
import {
  getShowResource,
  getInsertResource,
  getModifyResource,
  getAllRole,
  getShowSingleRole,
  getInsertRoleAndDistributionResouce,
  getModifyRole
} from '@/api/rights'
export default {
  data () {
    return {
      tableData: [],
      // 添加时的列表
      formListAdd: {
        roleName: '', // 角色名称
        roleDescribe: '', // 角色描述
        activation: '', // 是否可用 0表示可用
        resourceIds: '', // 菜单的id  可多个
        duty: '' // 角色是管理者(0)还是员工(1)
      },
      // 编辑时的列表
      formListEditor: {
        roleName: ''
      },
      data: [],
      defaultProps: {
        children: 'resourceItems',
        label: 'nodeName'
      },
      isAdd: true, // 判断展示添加还是编辑

      pageNum: 1, // 当前页
      pageSize: 10, // 每页条数
      total: 0, // 总条数

      currentId: '' // 编辑当前角色的id
    }
  },
  created () {
    this.getResoueces()
    this.getAllRoles(1)
  },
  methods: {
    // 封装获取全部权限
    async getResoueces () {
      getShowResource().then(res => {
        this.data = res.data
      })
    },

    // 封装分页
    async getAllRoles (startPage) {
      this.pageNum = startPage
      getAllRole({
        pageSize: this.pageSize,
        startPage
      }).then(res => {
        console.log(res)

        const data = res.data
        this.tableData = data.list
        this.total = data.total
      })
    },

    // 改变页码
    changePage (pageNum) {
      this.getAllRoles(pageNum)
    },

    // 编辑
    handleEdit (row) {
      // 在点击编辑后 将之前选中的节点清除  否则会展示当前的节点和之前的节点
      this.$refs.tree.setCheckedKeys([])
      console.log('编辑当前角色的id', row.id)
      this.currentId = row.id
      this.isAdd = false
      getShowSingleRole({
        id: row.id
      }).then(res => {
        let data = res.data
        let arr = []
        console.log('点击编辑按钮返回数据', res.data)

        // 遍历获取选中的id
        for (let i = 0; i < data.resourceItems.length; i++) {
          arr.push(data.resourceItems[i].id)
        }
        console.log('遍历得到的数组', arr)

        this.formListEditor = {
          roleName: data.roleName,
          roleDescribe: data.roleDescribe,
          activation: data.activation + '',
          menu: arr, // 回显选中的菜单
          duty: data.duty + ''
        }
      })
    },

    // 添加的保存按钮
    submitFormAdd () {
      // console.log('添加保存时的数据',this.formListAdd)
      let ids = this.$refs.tree.getCheckedNodes(false, true)
      // console.log('ids', ids);
      let arr = []
      for (let i = 0; i < ids.length; i++) {
        arr.push(ids[i].id)
      }
      // console.log(arr)
      let str = arr.join(',')
      this.formListAdd.resourceIds = str
      console.log('提交的参数', this.formListAdd)
      if (
        this.formListAdd.roleName == '' ||
				this.formListAdd.roleDescribe == '' ||
				this.formListAdd.activation == '' ||
				this.formListAdd.resourceIds == '' ||
				this.formListAdd.duty == ''
      ) {
        this.$message({
          type: 'error',
          message: '请完善数据!'
        })
        return false
      } else {
        console.log('走了else', this.formListAdd)
        getInsertRoleAndDistributionResouce(this.formListAdd).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })

            // 刷新列表
            this.getAllRoles(1)
          } else {
            this.$message({
              type: 'error',
              // message: res.msg  //参数校验异常：For input string: ""
              message: '新增失败'
            })
          }
        })
      }
    },

    // 编辑的保存按钮
    submitFormEditor () {
      let ids = this.$refs.tree.getCheckedNodes(false, true)
      // console.log('编辑保存时的ids',ids);
      let arr = []
      // 遍历获取选中的id
      for (let i = 0; i < ids.length; i++) {
        arr.push(ids[i].id)
      }
      let str = arr.join(',')
      let data = {
        roleName: this.formListEditor.roleName,
        activation: this.formListEditor.activation,
        roleDescribe: this.formListEditor.roleDescribe,
        id: this.currentId,
        resourceIds: str,
        duty: this.formListEditor.duty
      }
      console.log('编辑保存时上传的数据', data)
      if (
        data.roleName == ' ' ||
				data.roleDescribe == '' ||
				data.activation == '' ||
				data.resourceIds == '' ||
				data.duty == ''
      ) {
        this.$message({
          type: 'error',
          message: '请完善数据!'
        })
        return false
      } else {
        console.log('走了else')
        getModifyRole(data).then(res => {
          console.log('编辑保存的返回值', res)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            // 刷新角色列表
            this.getAllRoles(1)
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败'
            })
          }
        })
      }
    },

    // 编辑时取消按钮(切换到添加页面,清空编辑框,清空tree)
    resetFormEditor (formListEditor) {
      this.isAdd = true
      this.$refs[formListEditor].resetFields()
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
<style lang="less" scoped>
.listTitle {
	background-color: rgb(52, 152, 219);
	height: 30px;
	line-height: 30px;
	color: #fff;
	padding-left: 5px;
}
</style>
