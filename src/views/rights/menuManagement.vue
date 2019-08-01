<template>
	<div>
		<!-- <el-row :span="8">
            <div class="title">菜单管理</div>
        </el-row> -->
		<el-row>
			<el-col :span="8">
				<el-col>
					<div class="title">菜单管理</div>
				</el-col>
				<!-- 新增 -->
				<el-form ref="form"
					:model="form"
					label-width="80px"
					v-if="isadd">
					<el-form-item label="菜单名称">
						<el-input v-model="form.nodeName"></el-input>
					</el-form-item>
					<el-form-item label="所属节点">
						<el-select v-model="form.parentId">
							<!--  <el-option label="0" value="顶级菜单">--顶级菜单--</el-option>
                        <el-option label="1" value="子级菜单">--子级菜单--</el-option> -->
							<el-option label="顶级菜单"
								value="0"></el-option>

							<el-option v-for="item in data"
								:label="item.nodeName"
								:key="item.id"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序">
						<el-input v-model="form.sort"
							placeholder="请输入数字(从1开始),数字越小,权重越大"></el-input>
					</el-form-item>
					<el-form-item label="跳转页面">
						<el-input v-model="form.url"></el-input>
					</el-form-item>
					<el-form-item label="是否显示">
						<el-radio-group v-model="form.showFlag">
							<el-radio label="0">显示</el-radio>
							<el-radio label="1">删除</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="onSubmit">新增保存</el-button>
					</el-form-item>
				</el-form>
				<!-- 编辑 -->
				<el-form ref="formEditor"
					:model="formEditor"
					label-width="80px"
					v-if="!isadd">
					<el-form-item label="菜单名称">
						<el-input v-model="formEditor.nodeName"></el-input>
					</el-form-item>
					<el-form-item label="所属节点">
						<el-select v-model="formEditor.parentId">
							<el-option label="顶级菜单"
								value="0"></el-option>
							<el-option v-for="item in data"
								:label="item.nodeName"
								:key="item.id"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序">
						<el-input v-model="formEditor.sort"
							placeholder="请输入数字,数字越小,权重越大"></el-input>
					</el-form-item>
					<el-form-item label="跳转页面">
						<el-input v-model="formEditor.url"></el-input>
					</el-form-item>
					<el-form-item label="是否显示">
						<el-radio-group v-model="formEditor.showFlag">
							<el-radio label="0">显示</el-radio>
							<el-radio label="1">删除</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="onSubmitEditor">保存编辑</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<!-- 树形结构 -->
			<el-col :span="6"
				:offset="4">
				<el-form>
					<el-form-item>编辑菜单</el-form-item>
					<el-form-item>
						<el-tree :data="data"
							show-checkbox
							default-expand-all
							node-key="id"
							ref="tree"
							:check-strictly="true"
							highlight-current
							:props="defaultProps">
						</el-tree>
						<!-- <el-tree :data="data" :props="defaultProps" default-expand-all></el-tree> -->
						<el-button @click="getCheckedNodes"
							type="primary"
							style="margin-top:20px">编辑</el-button>
					</el-form-item>
				</el-form>
			</el-col>

		</el-row>
	</div>
</template>
<script>
import {
  getShowResource,
  getInsertResource,
  getModifyResource
} from '@/api/rights'
export default {
  data () {
    return {
      form: {
        nodeName: '',
        node: '',
        sort: '',
        url: '',
        showFlag: '',
        parentId: ''
      },
      formEditor: {
        parentId: 0
      },
      data: [],
      defaultProps: {
        children: 'resourceItems',
        label: 'nodeName'
      },
      isadd: true,
      childrenId: '' // 记录当前的子节点的id 用于编辑时给参数id赋值
    }
  },
  created () {
    this.getResoueces()
  },
  methods: {
    // 封装获取全部权限
    async getResoueces () {
      const res = await getShowResource()
      this.data = res.data
      // console.log('获取全部权限', res)
    },

    // 点击编辑按钮获取数据
    getCheckedNodes () {
      console.log(
        '点击编辑获取当前node的数据',
        this.$refs.tree.getCheckedNodes()
      )
      this.isadd = false
      // 如果node为0则表示该节点为顶级菜单,
      if (this.$refs.tree.getCheckedNodes()[0].node == 0) {
        this.$nextTick(function () {
          this.formEditor.parentId = '0'
        })
      }
      this.formEditor = this.$refs.tree.getCheckedNodes()[0]
      this.formEditor.showFlag =
				this.$refs.tree.getCheckedNodes()[0].showFlag + ''
      this.childrenId = this.$refs.tree.getCheckedNodes()[0].id
    },
    // 新增保存按钮
    onSubmit () {
      if (this.form.parentId === '0') {
        this.form.node = 0
        delete this.form['parentId']
      } else {
        this.form.node = 1
      }
      console.log('form', this.form)
      getInsertResource(this.form).then(res => {
        console.log('保存按钮返回数据res:', res)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          // 刷新右侧的展示tree
          this.getResoueces()
          // 清空所填写的from
          this.form = {}
        }
      })
    },
    // 编辑保存按钮
    onSubmitEditor () {
      if (this.formEditor.parentId === '0') {
        this.formEditor.node = 0
        delete this.formEditor['parentId']
      } else {
        this.formEditor.node = 1
      }
      console.log('编辑保存提交数据', this.formEditor)
      getModifyResource({
        nodeName: this.formEditor.nodeName,
        node: this.formEditor.node,
        sort: this.formEditor.sort,
        url: this.formEditor.url,
        showFlag: this.formEditor.showFlag,
        parentId: this.formEditor.parentId,
        id: this.childrenId
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          // 刷新右侧的展示tree
          this.getResoueces()
          // 清空所填写的from
          this.formEditor = {}
          // 变成新增的form
          // this.isadd = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
	height: 30px;
	line-height: 30px;
	background-color: rgb(52, 152, 219);
	margin-bottom: 20px;
	padding-left: 5px;
	color: #ffffff;
}
</style>
