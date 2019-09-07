<template>
  <div class="container">
    <div class="container-title">
      <h1>Table 表格</h1>
      <p>用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。</p>
    </div>
    <div class="container-content">
      <section class="content-item">

        <div class="item-title">
          <h3>表格</h3>
          <p>当 el-table 元素中注入 data 对象数组后，在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。可以使用 width 属性来定义列宽。</p>
          <el-radio-group v-model="baseTanle" @change="handelRadio">
            <el-radio :label="1">基础</el-radio>
            <el-radio :label="2">带斑马纹</el-radio>
            <el-radio :label="3">带(竖)边框</el-radio>
            <el-radio :label="4">带状态</el-radio>
          </el-radio-group>
          <ul>注释：
            <li class="text-indent">
              <p>斑马纹：stripe 属性可以创建带斑马纹的表格。它接受一个 Boolean，默认为 false，设置为 true 即为启用。改变条纹背景色：</p>
              <pre><code class="language-css">.el-table--striped .el-table__body tr.el-table__row--striped td {background-color: rgba(25, 68, 209, 0.5);}</code></pre>
              </li>
            <li class="text-indent">
              <p>带(竖)边框：默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用 border 属性，它接受一个 Boolean，设置为 true 即可启用。本质上是给 el-table 增加一个类名：el-table--border</p>
              <pre><code class="language-css">.el-table--border th {border-right: 1px solid #EBEEF5;}</code></pre>
              </li>
          </ul>
        </div>
        <div class="item-demo">
          <template>
            <el-table
              :data="tableData"
              :stripe="isStripe"
              :border="isBorder"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </template>
        </div>

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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      baseTanle: 1,
      isStripe: false,
      isBorder: false,
      isStatus: false
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.isStatus) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 2) {
          return 'success-row'
        }
      }
      return ''
    },
    handelRadio(val) {
      switch (val) {
        case 1:
          this.isStripe = false
          this.isBorder = false
          this.isStatus = false
          break
        case 2:
          this.isStripe = true
          this.isBorder = false
          this.isStatus = false
          break
        case 3:
          this.isStripe = false
          this.isBorder = true
          this.isStatus = false
          break
        case 4:
          this.isStripe = false
          this.isBorder = false
          this.isStatus = true
          break
        case 5:
          this.isStripe = false
          this.isBorder = false
          this.isStatus = false
          break

        default:
          this.isStripe = false
          this.isBorder = false
          this.isStatus = false
          break
      }
    }
  },
  beforeCreated() {},
  created() {},
  mounted() {}
}
</script>

<style>
.el-table .warning-row {
  background-color: rgb(241, 15, 15);
  color: #000;
}
.el-table .success-row {
  background-color: rgb(13, 238, 107);
  color: #000;
}

/* 斑马纹颜色 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(25, 68, 209, 0.5);
}
</style>
