<template>
	<div style="padding:20px">
		<!--  <el-row>
            <el-col :span="12">
                <div class="listTitle">用户列表</div>
            </el-col>
            <el-col :span="8" :offset="2">
                <div class="formTitle">添加用户</div>
            </el-col>
        </el-row> -->
		<el-row>
			<el-col :span="12">
				<el-col>
					<div class="listTitle">用户列表</div>
				</el-col>
				<el-table :data="tableData"
					stripe>
					<el-table-column type="index"
						label="序号"
						width="60"></el-table-column>
					<el-table-column prop="username"
						label="用户名"
						min-width>
					</el-table-column>
					<!-- <el-table-column
                    prop="password"
                    label="密码">
                </el-table-column> -->
					<!-- <el-table-column
                    prop="mobile"
                    label="手机号"
                    min-width>
                </el-table-column> -->
					<el-table-column prop="writeOff"
						label="是否可用"
						min-width>
						<template slot-scope="scope">
							<!-- <span v-if="scope.row.writeOff == '0'">无效</span>
                    <span v-if="scope.row.writeOff == '1'">有效</span> -->
							<span v-if="scope.row.writeOff == '1'">无效</span>
							<span v-if="scope.row.writeOff == '0'">有效</span>
						</template>
					</el-table-column>
					<el-table-column label="操作"
						width="200">
						<template slot-scope="scope">
							<el-button type="warning"
								size="small"
								@click="handleEdit(scope.row)">编辑
							</el-button>
							<el-button type="danger"
								size="small"
								@click="showUserRole(scope.row)">分配角色
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
						<el-form-item style="">添加用户</el-form-item>
						<el-form-item label="用户名:"
							prop="username">
							<el-input v-model="formListAdd.username"></el-input>
						</el-form-item>
						<el-form-item label="密码:"
							prop="password">
							<el-input v-model="formListAdd.password"
								placeholder="密码由6-22位数字或字母组成"></el-input>
						</el-form-item>
						<!-- <el-form-item label="手机号:" prop="mobile">
                            <el-input  v-model="formListAdd.mobile"></el-input>
                        </el-form-item> -->
						<el-form-item label="状态:"
							prop="writeOff">
							<el-radio-group v-model="formListAdd.writeOff">
								<!-- <el-radio label="1" >有效</el-radio>
                            <el-radio label="0" >无效</el-radio> -->
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
						<el-form-item>编辑用户 (忘记原始密码请联系后端人员)</el-form-item>
						<!-- <el-form-item label="用户名:" prop="username">
                            <el-input v-model="formListEditor.username"></el-input>
                        </el-form-item> -->
						<el-form-item label="原始密码:"
							prop="oldPassword">
							<!-- <el-input  v-model="formListEditor.oldPassword" type="password" aria-disabled="true"></el-input> -->
							<el-input v-model="formListEditor.oldPassword"></el-input>
						</el-form-item>
						<el-form-item label="新密码:"
							prop="password">
							<el-input v-model="formListEditor.password"></el-input>
						</el-form-item>
						<!-- <el-form-item label="手机号:" prop="mobile">
                            <el-input  v-model="formListEditor.mobile"></el-input>
                        </el-form-item> -->
						<!-- <el-form-item label="状态:" prop="writeOff" >
                            <el-radio-group v-model="formListEditor.writeOff">
                            <el-radio label="1">有效</el-radio>
                            <el-radio label="0">无效</el-radio>
                            </el-radio-group>
                        </el-form-item> -->
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

		<!-- 给用户分配角色对话框 -->
		<el-dialog title="分配角色"
			:visible.sync="isShowUserRole">
			<el-form label-width="80px"
				:model="userRoleForm">
				<el-form-item label="用户名">
					<el-tag type="info">{{ userRoleForm.username }}</el-tag>
				</el-form-item>
				<el-form-item label="角色列表">
					<!--
                el-select 下拉框组件
                    v-model="value" 表示选中项的value

                el-option 下拉框的每一项
                    :label="item.label" 下拉框选项的名称（负责展示给用户看的）
                    :value="item.value" 下拉框选项的值（ 给程序用的，要发送给服务器的数据 ）
                -->
					<el-select v-model="userRoleForm.rid"
						placeholder="请选择"
						multiple>
						<el-option v-for="item in userRoleList"
							:key="item.id"
							:label="item.roleName"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<div slot="footer"
				class="dialog-footer">
				<el-button @click="isShowUserRole = false">取 消</el-button>
				<el-button type="primary"
					@click="assignRole">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {
  getAllUser,
  getAllRoles,
  getInsertUser,
  getModifyPassword,
  getUser,
  getUserRoleMap
} from '@/api/rights'
// 导入axios和qs
export default {
  data () {
    return {
      tableData: [], // 全部用户列表
      total: 0, // 用户总条数
      pageNum: 1, // 当前页
      pageSize: 5, // 每页条数
      formListAdd: {
        // 添加时的列表
        username: '',
        password: '',
        writeOff: ''
      },
      formListEditor: {
        // 编辑时的列表
        oldPassword: '',
        password: ''
      },
      isAdd: true, // 判断展示添加还是编辑

      isShowUserRole: false, // dialog默认不展示
      userRoleForm: {
        // 当前用户的名称
        username: '',
        // 当前用户的角色id
        // 默认为空值，此时，select中就会展示：请选择
        rid: '',
        // 用户id
        userId: -1
      },
      userRoleList: []
    }
  },

  created () {
    this.getAllUsers(1)
  },

  methods: {
    // 封装分页
    async getAllUsers (startPage, pageSize) {
      getAllUser({
        startPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log('获取全部用户列表', res.data)
        const data = res.data
        this.tableData = data.list
        this.total = data.total
        this.pageNum = data.pageNum
      })
    },

    // 改变页码
    changePage (pageNum) {
      console.log('改变页码:', pageNum)
      this.pageNum = pageNum
      this.getAllUsers(pageNum)
    },

    // 新增用户保存按钮
    submitFormAdd () {
      console.log('添加保存按钮', this.formListAdd)
      // 所有项为必填项
      if (
        this.formListAdd.username === '' ||
				this.formListAdd.password === '' ||
				this.formListAdd.writeOff === ''
      ) {
        this.$message({
          type: 'error',
          message: '请完善数据!'
        })
        return false
      } else {
        getInsertUser(this.formListAdd).then(res => {
          console.log('添加保存按钮的返回值', res)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            // 刷新列表
            this.getAllUsers(1)
          } else if (res.code === 0) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }
    },

    // 点击编辑  只有手机号是可以修改的
    handleEdit (row) {
      // 清空列表
      this.formListEditor.oldPassword = ''
      this.formListEditor.password = ''
      // console.log('点击编辑按钮',row )
      this.isAdd = false
      this.formListEditor.id = row.id
    },

    // 编辑保存按钮
    submitFormEditor () {
      if (
        this.formListEditor.oldPassword === '' ||
				this.formListEditor.password === ''
      ) {
        this.$message({
          type: 'error',
          message: '请完善数据!'
        })
        return false
      } else {
        console.log('走了else', this.formListEditor)
        getModifyPassword(this.formListEditor).then(res => {
          console.log('修改密码请求', res)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }
    },

    // 编辑取消按钮
    resetFormEditor () {
      this.isAdd = true
      // 清空列表
      // this.$refs[formListEditor].resetFields()
      this.formListEditor = {}
    },

    // 分配角色
    showUserRole (row) {
      console.log(row)
      // 一进入页面就清空之前所选,否则如果当前用户没有选择角色的话, 点击一个有角色的用户,再点击没角色的用户,就会显示有角色用户的角色
      this.userRoleForm.rid = []
      this.isShowUserRole = true
      this.userRoleForm.username = row.username
      this.userRoleForm.userId = row.id
      // this.userRoleForm.rid = [10,12]
      // 获取所有的角色
      getAllRoles().then(res => {
        console.log('获取所有的角色', res.data)
        this.userRoleList = res.data
      })
      // 获取当前用户的角色
      getUser({
        id: row.id
      }).then(res => {
        // console.log('获取当前用户的权限', res.data.data.userRoles)
        console.log('获取当前用户的权限', res)
        let arr = []
        let roledata = res.data.userRoles
        for (let i = 0; i < roledata.length; i++) {
          arr.push(roledata[i].id)
        }
        this.userRoleForm.rid = arr
      })
    },

    // 分配角色给用户---点击保存
    assignRole () {
      console.log(this.userRoleForm)
      let str = this.userRoleForm.rid.join(',')
      let data = {
        userId: this.userRoleForm.userId,
        roleIds: str
      }
      getUserRoleMap(data).then(res => {
        console.log('点击模态框保存返回值', res)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.isShowUserRole = false
        }
      })
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
