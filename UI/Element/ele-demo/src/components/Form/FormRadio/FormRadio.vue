<template>
  <div class="container">
    <div class="container-title">
      <h1>Radio 单选框</h1>
      <p>在一组备选项中进行单选</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>基础用法</h3>
          <p>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</p>
          <p>注释：要使用 Radio 组件，只需要设置 v-model 绑定变量，选中意味着变量的值为相应 Radio label属性的值，label 可以是 String、Number 或 Boolean。</p>
        </div>
        <div class="item-demo">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>禁用状态</h3>
          <p>单选框不可用的状态。</p>
          <p>注释：只要在 el-radio 元素中设置 disabled 属性即可，它接受一个 Boolean，true 为禁用。</p>
        </div>
        <div class="item-demo">
          <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
          <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>单选框组</h3>
          <p>适用于在多个互斥的选项中选择的场景</p>
          <p>注释：结合 el-radio-group 元素和子元素 el-radio 可以实现单选组，在 el-radio-group 中绑定 v-model，在 el-radio 中设置好 label 即可，无需再给每一个 el-radio 绑定变量，另外，还提供了 change 事件来响应变化，它会传入一个参数 value。</p>
        </div>
        <div class="item-demo">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>按钮样式</h3>
          <p>按钮样式的单选组合。</p>
          <p>注释：只需要把 el-radio 元素换成 el-radio-button 元素即可，此外，Element 还提供了 size 属性。</p>
        </div>
        <div class="item-demo">

          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>

          <div style="margin-top: 20px">
            <el-radio-group v-model="radio4" size="medium">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>

          <div style="margin-top: 20px">
            <el-radio-group v-model="radio5" size="small">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京" disabled></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>

          <div style="margin-top: 20px">
            <el-radio-group v-model="radio6" disabled size="mini">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>带有边框</h3>
          <p></p>
          <p>注释：设置 border 属性可以渲染为带有边框的单选框。</p>
        </div>
        <div class="item-demo">

          <div>
            <el-radio v-model="radio7" label="1" border>备选项1</el-radio>
            <el-radio v-model="radio7" label="2" border>备选项2</el-radio>
          </div>

          <div style="margin-top: 20px">
            <el-radio v-model="radio8" label="1" border size="medium">备选项1</el-radio>
            <el-radio v-model="radio8" label="2" border size="medium">备选项2</el-radio>
          </div>

          <div style="margin-top: 20px">
            <el-radio-group v-model="radio9" size="small">
              <el-radio label="1" border>备选项1</el-radio>
              <el-radio label="2" border disabled>备选项2</el-radio>
            </el-radio-group>
          </div>

          <div style="margin-top: 20px">
            <el-radio-group v-model="radio10" size="mini" disabled>
              <el-radio label="1" border>备选项1</el-radio>
              <el-radio label="2" border>备选项2</el-radio>
            </el-radio-group>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo"></div>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // Radio 单选框
      radio: '1',

      // 禁用状态
      radio1: '选中且禁用',

      // 单选框组
      radio2: 3,

      // 按钮样式
      radio3: '上海',
      radio4: '上海',
      radio5: '上海',
      radio6: '上海',

      // 带有边框
      radio7: '1',
      radio8: '1',
      radio9: '1',
      radio10: '1',
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
<style scoped lang="less"></style>
