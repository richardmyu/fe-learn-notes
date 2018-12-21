<template>
  <div class="container">
    <div class="container-title">
      <h1>Container 布局容器</h1>
      <p>el-container ：外层容器。当子元素中包含 el-header 或 el-footer 时，全部子元素会垂直上下排列，否则会水平左右排列。</p>
      <p>el-header ：顶栏容器。</p>
      <p>el-aside ：侧边栏容器。</p>
      <p>el-main ：主要区域容器。</p>
      <p>el-footer ：底栏容器。</p>
      <p>以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，el-container 的子元素只能是后四者，后四者的父元素也只能是 el-container。</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>常见页面布局</h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-aside>Aside</el-aside>
            <el-main>Main</el-main>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-header>Header</el-header>
            <el-container>
              <el-aside >Aside</el-aside>
              <el-main>Main</el-main>
            </el-container>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-header>Header</el-header>
            <el-container>
              <el-aside>Aside</el-aside>
              <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
              </el-container>
            </el-container>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-aside>Aside</el-aside>
            <el-container>
              <el-header>Header</el-header>
              <el-main>Main</el-main>
            </el-container>
          </el-container>
        </div>
        <div class="item-demo">
          <el-container>
            <el-aside>Aside</el-aside>
            <el-container>
              <el-header>Header</el-header>
              <el-main>Main</el-main>
              <el-footer>Footer</el-footer>
            </el-container>
          </el-container>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {}
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
<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
