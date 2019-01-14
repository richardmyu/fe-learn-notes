<template>
  <div class="container">
    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <div class="manuallyControlData">
      <quill-editor :content="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      <div class="content ql-container ql-snow">
        <div class="ql-editor" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

var toolbarOptions = {
  // container: [
  //   ['bold', 'italic', 'underline', 'strike'],
  //   ['blockquote', 'code-block'],
  //   [{ 'header': 1 }, { 'header': 2 }],
  //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //   [{ 'script': 'sub' }, { 'script': 'super' }],
  //   [{ 'indent': '-1' }, { 'indent': '+1' }],
  //   [{ 'direction': 'rtl' }],
  //   [{ 'size': ['small', false, 'large', 'huge'] }],
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //   [{ 'color': [] }, { 'background': [] }],
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],
  //   ['clean']
  // ],
  handlers: {
    // 自定义行为函数
    // handlers object will be merged with default handlers object
    'link': function (value) {
      if (value) {
        var href = prompt('Enter the URL');
        this.quill.format('link', href);
      } else {
        this.quill.format('link', false);
      }
    }
  }
};

export default {
  name: 'ManuallyControlData',
  data() {
    return {
      // 富文本内容
      content: '',
      // 富文本配置
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  props: '',
  components: { quillEditor },
  computed: {},
  watch: {},
  methods: {
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', text)
      this.content = html
    }
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped>
.manuallyControlData {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.manuallyControlData .quill-editor,
.manuallyControlData .content {
  width: 600px;
  min-width: 300px;
}

.manuallyControlData .content {
  height: 500px;
  box-sizing: border-box;
  margin-left: 30px;
  box-shadow: 0 0 6px 1px #aaaaaa, 0 0 8px 2px #cccccc, 0 0 10px 3px #eeeeee;
}
</style>
