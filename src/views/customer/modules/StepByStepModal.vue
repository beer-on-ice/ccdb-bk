<template>
        <a-modal
          title="保单服务-审批"
          :width="1200"
          :visible="visible"
          @cancel="handleCancel"
          class="operateModal"
        >
        <a-row style="font-size: 16px;font-weight: bold;margin-bottom:10px">基本信息</a-row>
        <a-row>
          <a-col :span="12">用户ID:</a-col>
          <a-col :span="12">服务类别:</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">用户昵称:</a-col>
          <a-col :span="12">服务类别(二级):</a-col>
        </a-row>
        <a-row>
          <a-col :span="12">用户邮箱:</a-col>
          <a-col :span="12">最后提交时间:</a-col>
          <span style="float:right">
            <a-button type="primary" @click="selectAll()" style="background-color: #1890ff;
          border-color: #1890ff;">全选</a-button>
            <a-button type="primary" @click="download()" style="margin-left: 8px;background-color: #1890ff;
          border-color: #1890ff;" class="download('imgs')">下载</a-button>
          </span>
        </a-row>
        <div style=" height:1px;border-bottom:1px dashed #ccc"></div>
        <template slot="footer" >
          <div class="closebtn">
            <a-button key="cancel" @click="handleCancel">关闭</a-button>
          </div>
        </template>
      
        <p style="font-size: 14px;font-weight: bold;margin-top:10px">上传文件材料</p>
        <ul>
          <li v-for="(item, index) in imglist" :key='index'>
              <div :class="item.ischecked ? 'active check' : 'check' " @click="checkTab(item)">✓</div>
              <!-- <img :src="item.url" alt="" style="width:100px; height:100px;margin-left:10px" preview="0"> -->
              <img :src="item.url" alt="" style="width:100px; height:100px;margin-left:10px" preview="0">
          </li>
        </ul>
      
        <p style="font-size: 14px;font-weight: bold;margin-top:10px">上传证明材料</p>
        <ul>
          <li v-for="(item, index) in imglist1" :key='index'>
              <div :class="item.ischecked ? 'active check' : 'check' " @click="checkTabProvid(item)">✓</div>
              <img :src="item.url" alt="" style="width:100px; height:100px;margin-left:10px" preview="1">
          </li>
        </ul>

        <a-row>
          <a-col :span="16" style="font-size: 16px;font-weight:bold"><i style="color:red">*</i>审批结果</a-col>
          <a-col :span="6" style="font-size: 16px;font-weight:bold"><i style="color:red">*</i>审批人</a-col>
        </a-row>
        <!-- 底部展示 -->
        <div style="overflow:hidden; height:130px ; padding-top:10px;">
          <div class="pass" >
            审批通过
          </div>
          <div class="back">
            <div class="nopass">审批退回</div>
            <div class="textvalue">
              <p>反馈内容</p>
              <a-textarea placeholder="填写反馈信息（如：告知用户缺少那些材料等）" style="width: 490px;height: 66px;resize:none"></a-textarea>
            </div>
          </div>
          <div class="right">
            <!-- <p style="font-weight: bold;	font-size: 16px;">审批人</p> -->
            <a-input placeholder="请输入姓名"></a-input>
          </div>
        </div>
        </a-modal>
</template>
<script>
      import pick from 'lodash.pick'
      import FileSaver from "file-saver";
      var JSZip = require("jszip");
      const stepForms = [
        ['name', 'desc'],
        ['target', 'template', 'type'],
        ['time', 'frequency']
      ]
      
      export default {
        name: 'StepByStepModal',
        data () {
          return {
            // 展示的文字
            showWords:'',
            imglist1:[
              {url:'http://img.zcool.cn/community/01c92f56597f686ac7251c94e76e51.jpg',id:'1',ischecked:false},
              {url:'http://img.zcool.cn/community/01888f5922bad7b5b3086ed4cc3711.jpg',id:'2', ischecked:false},
              {url:'http://ci.xiaohongshu.com/94cabc89-aaae-3608-bba3-c6a3d8098aa6?imageView2/2/w/1080/format/webp',id:'3', ischecked:false},
              {url:'https://geekjc-img.geekjc.com/logo.png',id:'3', ischecked:false},
              {url:require('../img/微信图片.jpg'),id:'4', ischecked:false},
            ],
            imglist:[
              {url:require('../img/1.1.jpg'),id:'5',ischecked:false},
              {url:require('../img/1.jpg'),id:'6', ischecked:false},
              {url:require('../img/2.jpg'),id:'7', ischecked:false},
              {url:require('../img/3.png'),id:'8', ischecked:false},
            ],
            checkedList: [],
      
            visible: false,
            confirmLoading: false,
            form: this.$form.createForm(this),
      
          }
        },
        created(){
          // 获取所有图片的路径

        },
        methods: {
          /* 上传文件材料 */
          checkTab (item) {
            console.log('item',item);
            let id = item.id
            let index = this.checkedList.indexOf(id)
            // lj的方法 => 使代码优化
            item.ischecked = !item.ischecked
            /* if (index === -1) {
                this.checkedList.push(id)
                // 给当前的添加类名active
                item.ischecked = true
      
            } else {
                this.checkedList.splice(index, 1)
                item.ischecked = false
            }
            console.log('checkedList1111',this.checkedList); */
          },
          /* 上传证明材料 */
          checkTabProvid(item) {
            console.log('item',item);
            let id = item.id
            let index = this.checkedList.indexOf(id)
            item.ischecked = !item.ischecked
           /*  if (index === -1) {
                this.checkedList1.push(id)
                // 给当前的添加类名active
                item.ischecked = true
      
            } else {
                this.checkedList1.splice(index, 1)
                item.ischecked = false
            }
            console.log('checkedList1111',this.checkedList1); */
          },
          /* 全选功能 */
          selectAll(){
            for(let i = 0; i < this.imglist.length; i++){
              this.imglist[i].ischecked = true
            }
            for(let i = 0; i < this.imglist1.length; i++){
              this.imglist1[i].ischecked = true
            }

          },

          /* 下载功能 */
          download(blogTitle){
            console.log('点击下载了');
            var zip = new JSZip();
            var imgs = zip.folder("images");
            var baseList = [];
            var _this = this;
            console.log('查看文件图片中的ischecked:', this.imglist)
            let arr = []
            console.log(this.imglist);
            
            for(let i = 0; i < this.imglist.length; i++ ){
              arr.push(this.imglist[i].url)
            }
            // 遍历所有图片 找出ischecked为true的图片
            this.imglist.filter((ele, i) => {
              //return ele.ischecked = 

            })
            console.log('arr',arr);
            debugger
            // arr 就是 url
            for (var i = 0; i < arr.length; i++) {
              let image = new Image();
              // 解决跨域 Canvas 污染问题
              image.setAttribute("crossOrigin", "anonymous");
              image.onload = function() {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let url = canvas.toDataURL(); // 得到图片的base64编码数据 let url = canvas.toDataURL('image/png')
                baseList.push(url.substring(22));
                if (baseList.length === arr.length) {
                  if (baseList.length > 0) {
                    _this.$notify({
                      title: "成功",
                      message: "即将下载",
                      type: "success"
                    });
                    for (let k = 0; k < baseList.length; k++) {
                      imgs.file("photo" + k + ".png", baseList[k], { base64: true });
                    }
                    zip.generateAsync({ type: "blob" }).then(function(content) {
                      // see FileSaver.js
                      saveAs(content, "images.zip");
                    });
                  } else {
                    _this.$notify.error({
                      title: "错误",
                      message: "暂无图片可下载"
                    });
                  }
                }
              };
              image.src = arr[i].replace("webp", "png"); //替换打包后的图片后缀
            }
          },
      
          edit (record) {
            this.visible = true
          },
          
          handleCancel () {
            this.visible = false
          },
      
          
      
          
        }
      }
</script>
<style scoped lang="less">
        /* you can make up upload button and sample style by using stylesheets */
        .ant-upload-select-picture-card i {
          font-size: 32px;
          color: #999;
        }
      
        .ant-upload-select-picture-card .ant-upload-text {
          margin-top: 8px;
          color: #666;
        }
        .ant-row {
          margin-bottom: 10px;
        }
        .operateModal {
          .ant-modal-header{
            background-color: rgba(42, 130, 228, 1);
          }
        .ant-modal-title{
          color: rgba(255, 255, 255, 1);
            font-size: 16px;
          font-weight: bold;
        }

        }
        .pass,
        .nopass{
          float: left;
          width: 88px;
          height: 100px;
          background-color: rgba(42, 130, 228, 1);
          font-size: 16px;
          font-weight: bold; 
          line-height: 88px;
          text-align: center;
          color: #fff
        }
        .nopass{
          background-color: rgba(67, 207, 124, 1);
          margin-right: 20px;
        }
        .back{
          height: 130px;
          float: left;
          margin-left: 25px;
          border-left:1px dashed #ccc; 
          border-right:1px dashed #ccc;
          padding-left: 25px; 
      
        }
        .textvalue{
          padding-left:110px;
          padding-right:10px;
          box-sizing:border-box;
        }
        .right{
          float: left;
          margin-left: 20px;
        }
      ul{
          overflow: hidden;
      }
          
      ul li {
          list-style: none;
          float: left;
          position: relative;
      }
      .check {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0px;
          right: 0px;
          background-color: #999;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
          color: #fff;
          
      }
      .active {
          color: red;
      }
      .ant-modal-footer {
        .closebtn {
          text-align: center;
          button{
            background-color: rgba(42, 130, 228, 1);
            color: #fff
          }
        }
      }
</style>
