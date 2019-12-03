<template>
	<div class="policyManagementWrapper">
		<div class="popWrapper">
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
				style="display:none">
				预览
			</a>
		</div>
		<div class="policyWrapper">
			<div class="policyFirst">
				<h3>轮播图</h3>
				<div>
					<a-row>
						<a-col class="slideShowItem"
							:xl="12"
							:lg="12"
							:md="12"
							:sm="12"
							:xs="12"
							:key="item.id"
							v-for="(item, index) in slideShow">
							<p class="clearfix">
								<span>{{ index + 1 }}.</span>
								<span>{{ item.title }}</span>
								<a-button class="btn"
									type="danger"
									@click="handleDelSlideShow(item.id)"
									v-auth="$route.meta.dutyName">删除</a-button>
								<a-button class="btn"
									type="primary"
									@click="handleSlideShowEdit(item.id, 'slideHk',true)">{{ item.state ? "已发布" : "待发布" }}</a-button>
								<span style="float:right;">{{ item.releaseDate }}</span>
							</p>
						</a-col>
						<a-col class="slideShowItem slideShowItemS"
							:xl="12"
							:lg="12"
							:md="12"
							:sm="12"
							:xs="12">
							<p>
								<a-button class="btn"
									@click="handleSlideShowAdd('slideHk', true)">新增</a-button>
							</p>
						</a-col>
					</a-row>
				</div>
			</div>
			<first-table-list @handleWarrantyEdit="handleWarrantyEdit"
				@handleWrrantyAdd="handleWrrantyAdd"
				ref="firstTable"></first-table-list>
			<second-table-list @handleEdit="handleSlideShowEdit(arguments[0],'topHk',false)"
				@handleAdd="handleSlideShowAdd('topHk',false)"
				ref="secondTable"></second-table-list>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { WarrantyEdit, WarrantyAdd } from '@/components'
import { FirstTableList, SecondTableList } from './components'
import { getListInsuranceBanner, getRemoveInfo } from '@/api/policy'

export default {
  components: {
    FirstTableList,
    SecondTableList,
    WarrantyEdit,
    WarrantyAdd
  },
  data () {
    return {
      // 保单编辑是否显示
      warrantyEditVisible: false,
      warrantyAddVisible: false,
      slideShow: [] // 轮播图
    }
  },
  created () {
    this.getNewestPolicy()
  },
  methods: {
    // 保单 - 新增
    handleWrrantyAdd () {
      this.warrantyAddVisible = true
    },
    // 保单 - 编辑
    handleWarrantyEdit (id) {
      this.warrantyEditVisible = true
      if (id) {
        this.$refs.warrantyEdit.getInfo(id)
      }
    },
    // 保单 - 关闭
    handleWarrentyClose () {
      this.warrantyEditVisible = false
      this.warrantyAddVisible = false
      this.$refs.firstTable.refreshTable()
    },
    // 保单 - 预览
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
    // 轮播 - 获取
    getNewestPolicy () {
      getListInsuranceBanner({ serviceType: 7 }).then(res => {
        this.slideShow = res.data
      })
    },
    // 轮播 - 编辑
    handleSlideShowEdit (id, type, noSource) {
      this.$router.push({
        path: '/policy/slideshowedit',
        query: { id, type, noSource }
      })
    },
    // 轮播 - 新增
    handleSlideShowAdd (type, noSource) {
      this.$router.push({
        path: '/policy/slideshowadd',
        query: { type, noSource }
      })
    },
    // 轮播 - 删除
    handleDelSlideShow (id) {
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
    }
  }
}
</script>

<style lang="less">
.policyManagementWrapper {
	.policyWrapper {
		.clearfix::after {
			display: block;
			content: '';
			clear: both;
		}
		h3 {
			font-size: 14px;
			font-weight: bold;
		}
		.policyFirst {
			margin-top: 35px;
			div {
				background: #fff;
				padding: 5px 0;
				border-radius: 10px;
				.slideShowItem {
					border-bottom: 1px dashed #ccc;
					padding: 0 0 0 28px;
					margin-bottom: 5px;
					&.slideShowItemS {
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
	}
}
</style>
