<template>
  <div class="container">

    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      :show-file-list="false"
      :on-change="handleImgSuccess"
      :auto-upload="false"
    ></el-upload>

    <el-row v-loading="quillUpdateImg" class="quillUpdateImg">
      <quill-editor
        ref="textEditor"
        :options="editorOption"
        v-model="localContent"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </el-row>

  </div>
</template>

<script type="text/ecmascript-6">
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { getImgUrl } from "../../../api/api.js";
import { upLoadImg } from "../../../utility/imgUpload.js";
export default {
  data() {
    return {
      // 根据图片上传状态来确定是否显示动画
      quillUpdateImg: false,
      // 图片上传地址
      serverUrl: "",
      // 富文本内容
      localContent: "",
      editorOption: {
        debug: "info",
        modules: {
          toolbar: {
            // 不能传空数组
            container: [["link", "image"]],
            handlers: {
              // 改写 img 上传 handler
              'image': function (value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click();
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
        theme: "snow"
      }
    }
  },
  props: '',
  components: { quillEditor },
  computed: {},
  watch: {},
  methods: {
    // 富文本事件(拦截富文本内容，进行处理再输出)
    onEditorChange(event) {
      let { quill, html, text } = event;
      let textLength = text.length;
      // 过滤
      // 将 <p><br></p> 替换
      let content = this.localContent.replace(/\<p\>\<br\>\<\/p\>/g, '<div class="my-ql-wrap"></div>');

      if (textLength > 10000) {
        // 字数约束
        this.$message.error('最多输入 10000 个字符');
        this.$nextTick(() => {
          // 超过字数，禁止写入
          this.$refs.textEditor.quill.enable(false);
          this.$refs.textEditor.quill.blur();
        })
        return false;
      }
    },

    // 当被禁止写入的富文本再次获取焦点时，解除禁止写入
    onEditorFocus() {
      this.$refs.textEditor.quill.enable(true);
    },

    // 上传成功
    handleImgSuccess(file, fileList) {
      // console.log(file);
      let regImgType = /\.(jpg|jpeg|png|gif|JPG|PNG|GIF)$/;
      if (file.name && file.name.match(regImgType)) {
        file.name = Number(new Date()) + `${regImgType.exec(file.name)[0]}`
        let _this = this;
        // 获取富文本组件实例
        let quill = this.$refs.textEditor.quill;
        let complete = function (res) {
          if (res.key && res.key.match(regImgType)) {
            getImgUrl(res.key).then(res => {
              if (res && res.msg === "ok") {
                _this.$message({
                  message: "上传成功",
                  type: 'success'
                });
                // 获取光标所在的位置
                let length = quill.getSelection().index;
                // 插入图片
                quill.insertEmbed(length, 'image', " " + res.data);
                length = quill.getSelection().index;
                quill.setSelection(length + 2)
              } else {
                _this.$message({
                  message: "上传失败",
                  type: 'error'
                })
              }
            })
          }
        };
        let error = function (err) {
          _this.$message({
            message: "上传失败",
            type: 'error'
          })
        };
        let next = function (res) {
          let total = res.total;
          (total.percent.toFixed(2))
        };
        upLoadImg(file, fileList, complete, error, next);
      } else {
        this.$message({
          message: "请输入jpg,jpeg,png 和 gif 格式的图片",
          type: "error"
        })
      }
    },
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>

<style scoped>
.quill-editor {
  height: 100%;
}
</style>
