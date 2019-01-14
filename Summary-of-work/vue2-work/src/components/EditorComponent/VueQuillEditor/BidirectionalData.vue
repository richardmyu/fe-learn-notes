<template>
  <div class="container">
    <!-- bidirectional data binding（双向数据绑定） -->
    <div class="bidirectionalData">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <!-- 实现文本与富文本编辑时的样式一致，引入一下特定类名，调用相同的样式 -->
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

import { quillEditor } from 'vue-quill-editor';

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

// https://quilljs.com/docs/quickstart/

export default {
  name: 'BidirectionalData',
  data() {
    return {
      // 富文本内容
      content: '',
      // 富文本配置 (只写一个空对象会使用默认设置)
      editorOption: {
        modules: {
          // 可以穿数组，也可以是 ID 字符（即自定义）
          toolbar: toolbarOptions
        }
      }
    }
  },
  props: '',
  components: { quillEditor },
  computed: {
    editor() {
      // 如果你需要得到当前的 editor 对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的 editor 对象，实际上这里的 $refs 对应的是当前组件内所有关联了 ref 属性的组件元素对象
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {},
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', this.content)
    },
    onEditorFocus(quill) {
      console.log('editor focus!')
    },
    onEditorReady(quill) {
      console.log('editor ready!')
    },
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped>
.bidirectionalData {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.bidirectionalData .quill-editor,
.bidirectionalData .content {
  width: 600px;
  min-width: 300px;
}

.bidirectionalData .content {
  height: 500px;
  box-sizing: border-box;
  margin-left: 30px;
  box-shadow: 0 0 6px 1px #aaaaaa, 0 0 8px 2px #cccccc, 0 0 10px 3px #eeeeee;
}
</style>
