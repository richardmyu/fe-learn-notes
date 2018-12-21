<template>
  <div class="container">
    <div class="container-title">
      <h1>Layout 布局</h1>
      <p>通过基础的 24 分栏，迅速简便地创建布局。</p>
    </div>
    <div class="container-content">
      <!-- 基础布局 -->
      <section class="content-item">
        <div class="item-title">
          <h3>基础布局</h3>
          <p>通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。</p>
          <p>注释：一个 row 组件是一个排，而 一个 col 组件 是 row 组件下的列，默认情况下两者都会被渲染成 div 标签；能一行排列的一行排列（span值加起来不超过24），一行排列不下会自动换行；</p>
        </div>
        <div class="item-demo">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">span="24"</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">span="8"</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">span="4"</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">span="4"</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">span="4"</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">span="4"</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">span="4"</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">span="4"</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">span="6"</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple-light">span="10"</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">span="8"</div>
            </el-col>
          </el-row>
        </div>
      </section>

      <!-- 分栏间隔 -->
      <section class="content-item">
        <div class="item-title">
          <h3>分栏间隔</h3>
          <p>Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。</p>
          <p>注释：排列会在减去间隔宽度后，再按 24 列排布；通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。</p>
        </div>
        <div class="item-demo">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark"></div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>

        </div>
      </section>
      <!-- 分栏偏移 -->
      <section class="content-item">
        <div class="item-title">
          <h3>分栏偏移</h3>
          <p>通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。</p>
          <p>注释：offset 的值表示 col 组件的左边距，span 的值表示 col 组件的宽度；在只有一列的情况下，两者的值若超过 24 不会自动换行，而是超出父级盒子；而在二列及以上时，会自动换行; push 右移，pull 左移，两者同时存在会执行 push 而不执行 pull；</p>
        </div>
        <div class="item-demo">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">span="6"</div>
            </el-col>
            <el-col :span="6" :offset="6">
              <div class="grid-content bg-purple">span="6" offset="6"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="6">
              <div class="grid-content bg-purple">span="6" offset="6"</div>
            </el-col>
            <el-col :span="6" :offset="7">
              <div class="grid-content bg-purple">span="6" offset="7"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="6">
              <div class="grid-content bg-purple">span="12" offset="6"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="13">
              <div class="grid-content bg-purple">span="12" offset="13"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="24">
              <div class="grid-content bg-purple">span="12" offset="24"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :push="6">
              <div class="grid-content bg-purple">span="12" :push="6"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :pull="6">
              <div class="grid-content bg-purple">span="12" pull="6"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :push="12" :pull="6">
              <div class="grid-content bg-purple">span="12" push="12" pull="6"</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :pull="6" :push="12">
              <div class="grid-content bg-purple">span="12" push="12" pull="6"</div>
            </el-col>
          </el-row>
        </div>
      </section>
      <!-- 对齐方式 -->
      <section class="content-item">
        <div class="item-title">
          <h3>对齐方式</h3>
          <p>通过 flex 布局来对分栏进行灵活的对齐。将 type 属性赋值为 'flex'，可以启用 flex 布局，并可通过 justify 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-row type="flex" class="row-bg">
            <el-col :span="6">
              <div class="grid-content bg-purple">justify="start"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <div class="grid-content bg-purple">justify="center"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="6">
              <div class="grid-content bg-purple">justify="end"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">justify="space-between"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="grid-content bg-purple">justify="space-around"</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>
        <div class="item-demo">
          <el-row type="flex" class="row-bg-align" align="top">
            <el-col :span="6" class="align-f">
              <div class="grid-content bg-purple">align="top"</div>
            </el-col>
            <el-col :span="6" class="align-s">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6" class="align-t">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg-align" align="middle">
            <el-col :span="6" class="align-f">
              <div class="grid-content bg-purple">align="middle"</div>
            </el-col>
            <el-col :span="6" class="align-s">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6" class="align-t">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg-align" align="bottom">
            <el-col :span="6" class="align-f">
              <div class="grid-content bg-purple">align="bottom"</div>
            </el-col>
            <el-col :span="6" class="align-s">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :span="6" class="align-t">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>
      </section>

      <!-- 响应式布局 -->
      <section class="content-item">
        <div class="item-title">
          <h3>响应式布局</h3>
          <p>参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-row :gutter="10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>
        </div>
      </section>
      <!-- 基于断点的隐藏类 -->
      <!-- <section class="content-item">
        <div class="item-title">
          <h3>基于断点的隐藏类</h3>
          <p>Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。如果需要，请自行引入以下文件：`import 'element-ui/lib/theme-chalk/display.css';`</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-xs-only>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-sm-only>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" hidden-sm-and-down>
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-sm-and-up>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-md-only>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" hidden-md-and-down>
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-md-and-up>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-lg-only>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" hidden-lg-and-down>
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-lg-and-up>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6" :offset="6" hidden-xl-only>
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>
      </section> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "element-ui/lib/theme-chalk/display.css";
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
.el-row {
  margin-bottom: 20px;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.row-bg-align .align-f .grid-content {
  height: 60px;
  line-height: 60px;
}
.row-bg-align .align-s .grid-content {
  height: 40px;
  line-height: 40px;
}
.row-bg-align .align-t .grid-content {
  height: 20px;
  line-height: 20px;
}
</style>
