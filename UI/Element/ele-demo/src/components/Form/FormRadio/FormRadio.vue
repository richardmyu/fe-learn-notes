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
          <p>注释：要使用 Radio 组件，只需要设置v-model绑定变量，选中意味着变量的值为相应 Radio label属性的值，label可以是String、Number或Boolean。</p>
        </div>
        <div class="item-demo">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
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

      <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo"></div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3></h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo"></div>
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
      radio: '1'
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
