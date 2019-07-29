<template>
	<div class="newPolicyEditWrapper">
		<a-form layout="inline">
			<a-row :gutter="48">
				<a-col :xl="4"
					:lg="4"
					:md="4"
					:sm="4"
					:xs="4">
					<div class="newPolicyEditLeft">
						<a-upload listType="picture-card"
							class="avatar-uploader"
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							@change="handleChange"
							:beforeUpload="handleBeforeUpload">
							<div v-if="upImageUrl==''">
								<a-icon type="plus"
									style=""></a-icon>
								<div className="ant-upload-text">选择封面</div>
							</div>
						</a-upload>
					</div>
					<div style="clear:both;display:block;height:0;"></div>
					<div class="keywordWrapper">
						<h3>关键字:</h3>
						<a-input type="textarea"
							v-model="queryParam.keyword" />
						<p>多个关键字之间用半角“,”表示</p>
					</div>
				</a-col>
				<a-col :xl="20"
					:lg="20"
					:md="20"
					:sm="20"
					:xs="20">
					<div class="newPolicyEditRight">
						<div style="margin:20px 0;">
							<a-form-item label="标题：">
								<a-input v-model="queryParam.title"
									placeholder="最长不超过30字（包含字母和符号）"
									style="min-width:400px;" />
							</a-form-item>
						</div>
						<div style="margin:20px 0;">
							<a-form-item label="作者：">
								<a-input v-model="queryParam.author"
									placeholder="请输入" />
							</a-form-item>
						</div>
						<a-row style="margin:20px 0;">
							<a-col :xl="8"
								:lg="8"
								:md="8"
								:sm="8"
								:xs="8">
								<a-form-item label="发布日期">
									<a-date-picker v-model="queryParam.time"
										showTime
										placeholder="请选择日期、时间" />
								</a-form-item>
							</a-col>
							<a-col :xl="12"
								:lg="12"
								:md="12"
								:sm="12"
								:xs="12">
								<a-form-item label="标签">
									<a-input v-model="queryParam.tag"
										placeholder="多个标签请用半角“,”表示" />
								</a-form-item>
							</a-col>
						</a-row>
						<div>
							<p class='tip'>(单图上传大小不能超过2M)</p>
							<Ue />
						</div>
					</div>
				</a-col>
			</a-row>
		</a-form>
		<div class="btnGroups">
			<a-button v-auth="'admin'">发布</a-button>
			<a-button type="primary">保存</a-button>
			<a-button>预览</a-button>
			<a-button>返回</a-button>
		</div>
	</div>
</template>

<script>
import { Ue } from '@/components'
export default {
  components: { Ue },
  data () {
    return {
      upImageUrl: '',
      loading: false,
      // 编辑参数
      queryParam: {}
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.upImageUrl = imageUrl
          this.loading = false
        })
      }
    },
    // 上传之前，可处理格式等
    handleBeforeUpload () {},
    getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }
  }
}
</script>

<style lang="less" >
.newPolicyEditWrapper {
	.avatar-uploader {
		.ant-upload {
			width: 220px;
			height: 112px;
			font-size: 20px;
			color: rgba(42, 130, 228, 1);
		}
	}
	.keywordWrapper {
		margin-top: 50px;
		.ant-input {
			width: 220px;
		}
		p {
			font-size: 14px;
			color: rgba(212, 48, 48, 1);
		}
	}
	.newPolicyEditRight {
		.tip {
			margin: 0;
			color: red;
		}
	}
	.btnGroups {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
		.ant-btn {
			margin: 0 10px;
		}
	}
}
</style>
