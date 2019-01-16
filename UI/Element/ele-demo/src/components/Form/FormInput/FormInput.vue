<template>
  <div class="container">
    <div class="container-title">
      <h1>Input 输入框</h1>
      <p>通过鼠标或键盘输入字符</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>基础用法</h3>
          <p></p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>禁用状态</h3>
          <p></p>
          <p>注释：通过 disabled 属性指定是否禁用 input 组件</p>
        </div>
        <div class="item-demo">
          <el-input placeholder="请输入内容" v-model="input1" :disabled="true"></el-input>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>可清空</h3>
          <p></p>
          <p>注释：使用 clearable 属性即可得到一个可清空的输入框</p>
        </div>
        <div class="item-demo">
          <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>带 icon 的输入框</h3>
          <p>带有图标标记输入类型</p>
          <p>注释：可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot 来放置图标。</p>
        </div>
        <div class="item-demo">
          <div class="demo-input-suffix">属性方式：
            <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>

            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
          </div>

          <div class="demo-input-suffix">slot 方式：
            <el-input placeholder="请选择日期" v-model="input22">
              <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>

            <el-input placeholder="请输入内容" v-model="input23">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>文本域</h3>
          <p>用于输入多行文本信息，通过将 type 属性的值指定为 textarea。</p>
          <p>注释：文本域高度可通过 rows 属性控制</p>
        </div>
        <div class="item-demo">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>可自适应文本高度的文本域</h3>
          <p>通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2"></el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea3"
          ></el-input>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>复合型输入框</h3>
          <p>可前置或后置元素，一般为标签或按钮</p>
          <p>注释：可通过 slot 来指定在 input 中前置或者后置内容。</p>
        </div>
        <div class="item-demo">
          <div>
            <el-input placeholder="请输入内容" v-model="input3">
              <template slot="prepend">Http://</template>
            </el-input>
          </div>

          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input4">
              <template slot="append">.com</template>
            </el-input>
          </div>

          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>尺寸</h3>
          <p></p>
          <p>注释：可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。</p>
        </div>
        <div class="item-demo">
          <div class="demo-input-size">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input6"></el-input>
            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input7"></el-input>
            <el-input size="small" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input8"></el-input>
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="input9"></el-input>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>带输入建议</h3>
          <p>根据输入内容提供对应的输入建议</p>
          <p>注释：autocomplete 是一个可带输入建议的输入框组件，fetch-suggestions 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。</p>
        </div>
        <div class="item-demo">
          <el-row class="demo-autocomplete">
            <el-col :span="12">
              <div class="sub-title">激活即列出输入建议</div>
              <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>

            <el-col :span="12">
              <div class="sub-title">输入后匹配输入建议</div>
              <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>
          </el-row>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>自定义模板</h3>
          <p>可自定义输入建议的显示</p>
          <p>注释：使用 scoped slot 自定义输入建议的模板。该 scope 的参数为 item，表示当前输入建议对象。</p>
        </div>
        <div class="item-demo">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state3"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>远程搜索</h3>
          <p>从服务端搜索数据</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
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
      // 基础用法
      input: '',

      // 禁用状态
      input1: '',

      // 可清空
      input10: '',

      // 带 icon 的输入框
      input2: '',
      input21: '',
      input22: '',
      input23: '',

      // 文本域
      textarea: '',

      // 可自适应文本高度的文本域
      textarea2: '',
      textarea3: '',

      // 复合型输入框
      input3: '',
      input4: '',
      input5: '',
      select: '',

      // 尺寸
      input6: '',
      input7: '',
      input8: '',
      input9: '',

      // 带输入建议
      restaurants: [],
      state1: '',
      state2: '',

      // 自定义模板
      // restaurants: [],
      state3: '',

      // 远程搜索
      // restaurants: [],
      state4: '',
      timeout: null
    }
  },
  props: '',
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 带输入建议
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },

    // 自定义模板
    // querySearch(queryString, cb){}
    // createFilter(queryString)
    // loadAll()
    // handleSelect(item)
    handleIconClick(ev) {
      console.log(ev);
    },

    // 远程搜索
    // loadAll()
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // handleSelect(item)
  },
  beforeCreated() { },
  created() { },
  mounted() {
    // 带输入建议
    this.restaurants = this.loadAll();
    // 自定义模板
    // this.restaurants = this.loadAll();
    // 远程搜索
    // this.restaurants = this.loadAll();
  },
}
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.demo-input-size .el-input {
  margin-bottom: 30px;
}
</style>
<style scoped lang="less">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
