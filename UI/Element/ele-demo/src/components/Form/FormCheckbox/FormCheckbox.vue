<template>
  <div class="container">
    <div class="container-title">
      <h1>Checkbox 多选框</h1>
      <p>一组备选项中进行多选</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>基础用法</h3>
          <p>单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</p>
          <p>注释：在 el-checkbox 元素中定义 v-model 绑定变量，单一的 checkbox 中，默认绑定变量的值会是 Boolean，选中为 true。</p>
        </div>
        <div class="item-demo">
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>禁用状态</h3>
          <p>多选框不可用状态。</p>
          <p>注释：设置disabled属性即可。</p>
        </div>
        <div class="item-demo">
          <el-checkbox v-model="checked1" disabled>备选项</el-checkbox>
          <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>多选框组</h3>
          <p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
          <p>注释：checkbox-group 元素能把多个 checkbox 管理为一组，只需要在 Group 中使用 v-model 绑定 Array 类型的变量即可。 el-checkbox 的 label 属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。label 与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。</p>
        </div>
        <div class="item-demo">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>indeterminate 状态</h3>
          <p>indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>可选项目数量的限制</h3>
          <p>使用 min 和 max 属性能够限制可以被勾选的项目的数量。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-checkbox-group v-model="checkedCities1" :min="1" :max="2">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>按钮样式</h3>
          <p>按钮样式的多选组合。</p>
          <p>注释：只需要把 el-checkbox 元素替换为 el-checkbox-button 元素即可。此外，Element 还提供了 size 属性。</p>
        </div>
        <div class="item-demo">
          <div>
            <el-checkbox-group v-model="checkboxGroup1">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup2" size="medium">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup3" size="small">
              <el-checkbox-button
                v-for="city in cities"
                :label="city"
                :disabled="city === '北京'"
                :key="city"
              >{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>带有边框</h3>
          <p></p>
          <p>注释：设置 border 属性可以渲染为带有边框的多选框。</p>
        </div>
        <div class="item-demo">
          <div>
            <el-checkbox v-model="checked3" label="备选项1" border></el-checkbox>
            <el-checkbox v-model="checked4" label="备选项2" border></el-checkbox>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox v-model="checked5" label="备选项1" border size="medium"></el-checkbox>
            <el-checkbox v-model="checked6" label="备选项2" border size="medium"></el-checkbox>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup5" size="small">
              <el-checkbox label="备选项1" border></el-checkbox>
              <el-checkbox label="备选项2" border disabled></el-checkbox>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
              <el-checkbox label="备选项1" border></el-checkbox>
              <el-checkbox label="备选项2" border></el-checkbox>
            </el-checkbox-group>
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
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      // 基础用法
      checked: true,

      // 禁用状态
      checked1: false,
      checked2: true,

      // 多选框组
      checkList: ['选中且禁用', '复选框 A'],

      // indeterminate 状态
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,

      // 可选项目数量的限制
      checkedCities1: ['上海', '北京'],
      // cities: cityOptions,

      // 按钮样式
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['上海'],
      checkboxGroup3: ['上海'],
      checkboxGroup4: ['上海'],
      // cities: cityOptions,

      // 带有边框
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: true,
      checkboxGroup5: [],
      checkboxGroup6: [],
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {
    // indeterminate 状态
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  beforeCreated() { },
  created() { },
  mounted() { },
}
</script>

<style></style>
<style scoped lang="less"></style>
