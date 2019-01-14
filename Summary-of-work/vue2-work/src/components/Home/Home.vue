<template>
  <div class="container">
    <h3>Vue 项目总结</h3>
    <ul>
      <li v-for="item of urlData" :key="item.id">
        <router-link :to="{path:item.url}">{{item.id+' . '+item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Home',
  data() {
    return {
      urlData: [
        {
          id: 1,
          name: 'vue-quill-editor 编辑器双向数据绑定模式',
          url: '/bidirectionalData'
        },
        {
          id: 2,
          name: 'vue-quill-editor 编辑器手动控制数据模式',
          url: '/manuallyControlData'
        },
        {
          id: 3,
          name: 'upload 组件上传图片',
          url: '/imgUpload'
        },
        {
          id: 4,
          name: 'vue-cropper 剪裁图片并上传',
          url: '/imageCropper'
        },
        {
          id: 5,
          name: '在 vue-quill-editro 中上传图片',
          url: '/vueQuillEditorImgUpload'
        },
      ]
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {},
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped>
li {
  margin-bottom: 30px;
}

li a:hover {
  color: #000000;
}
</style>
