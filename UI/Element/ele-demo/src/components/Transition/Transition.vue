<template>
  <div class="container">
    <div class="container-title">
      <h1>内置过渡动画</h1>
      <p>Element 内应用在部分组件的过渡动画，你也可以直接使用</p>
    </div>
    <div class="container-content">
      <!-- fade 淡入淡出 -->
      <section class="content-item">
        <div class="item-title">
          <h3>fade 淡入淡出</h3>
          <p>提供 el-fade-in-linear 和 el-fade-in 两种效果。</p>
          <p>注释：transition name="el-fade-in-linear"</p>
        </div>
        <div class="item-demo">
          <el-button @click="show = !show">Click Me</el-button>
          <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="el-fade-in-linear">
              <div v-show="show" class="transition-box">.el-fade-in-linear</div>
            </transition>
            <transition name="el-fade-in">
              <div v-show="show" class="transition-box">.el-fade-in</div>
            </transition>
          </div>
        </div>
      </section>
      <!-- zoom 缩放 -->
      <section class="content-item">
        <div class="item-title">
          <h3>zoom 缩放</h3>
          <p>提供 el-zoom-in-center，el-zoom-in-top 和 el-zoom-in-bottom 三种效果。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button @click="show2 = !show2">Click Me</el-button>

          <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="el-zoom-in-center">
              <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
            </transition>

            <transition name="el-zoom-in-top">
              <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
            </transition>

            <transition name="el-zoom-in-bottom">
              <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
            </transition>
          </div>
        </div>
      </section>
      <!-- collapse 展开折叠 -->
      <section class="content-item">
        <div class="item-title">
          <h3>collapse 展开折叠</h3>
          <p>使用 el-collapse-transition 组件实现折叠展开效果。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-button @click="show3 = !show3">Click Me</el-button>

          <div style="margin-top: 20px; height: 200px;">
            <el-collapse-transition>
              <div v-show="show3">
                <div class="transition-box">el-collapse-transition</div>
                <div class="transition-box">el-collapse-transition</div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      show: true,
      show2: true,
      show3: true,
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
<style scoped lang="less">
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
