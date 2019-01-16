<template>
  <div class="container">
    <div class="container-title">
      <h1>DatePicker 日期选择器</h1>
      <p>用于选择或输入日期</p>
    </div>
    <div class="container-content">

      <section class="content-item">
        <div class="item-title">
          <h3>选择日</h3>
          <p>以「日」为基本单位，基础的日期选择控件</p>
          <p>注释：基本单位由 type 属性指定。快捷选项需配置 picker-options 对象中的 shortcuts，禁用日期通过 disabledDate 设置，传入函数</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="value0"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">带禁止日期</span>
            <el-date-picker
              v-model="value1"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>其他日期单位</h3>
          <p>通过扩展基础的日期选择，可以选择周、月、年或多个日期</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">周</span>
            <el-date-picker
              v-model="value3"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">月</span>
            <el-date-picker
              v-model="value4"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">年</span>
            <el-date-picker
              v-model="value5"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">多个日期</span>
            <el-date-picker
              type="dates"
              v-model="value6"
              placeholder="选择一个或多个日期">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>选择日期范围</h3>
          <p>可在一个选择器中便捷地选择一个时间范围</p>
          <p>注释：在选择日期范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前月份，可以使用unlink-panels属性解除联动。</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">默认</span>
            {{value6}}
            <el-date-picker
              v-model="value7"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">独立切换</span>
            <el-date-picker
              v-model="value8"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
              v-model="value9"
              type="daterange"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>日期格式</h3>
          <p>使用 format 指定输入框的格式；使用 value-format 指定绑定值的格式</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">默认为 Date 对象</span>
            <div class="demonstration">值：{{ value10 }}</div>
            <el-date-picker
              v-model="value10"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">使用 format</span>
            <div class="demonstration">值：{{ value11 }}</div>
            <el-date-picker
              v-model="value11"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">使用 value-format</span>
            <div class="demonstration">值：{{ value12 }}</div>
            <el-date-picker
              v-model="value12"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">使用 format + value-format</span>
            <div class="demonstration">值：{{ value13 }}</div>
            <el-date-picker
              v-model="value13"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">时间戳</span>
            <div class="demonstration">值：{{ value14 }}</div>
            <el-date-picker
              v-model="value14"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>默认显示日期</h3>
          <p>在选择日期范围时，指定起始日期和结束日期的默认时刻。</p>
          <p>注释：选择日期范围时，默认情况下，起始日期和结束日期的时间部分均为当天的 0 点 0 分 0 秒。通过 default-time 可以分别指定二者的具体时刻。default-time 接受一个数组，其中的值为形如 12:00:00 的字符串，第一个值控制起始日期的时刻，第二个值控制结束日期的时刻。</p>
        </div>
        <div class="item-demo">
          <div class="block">
            <p>组件值：{{ value15 }}</p>
            <el-date-picker
              v-model="value15"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>年 - 年</h3>
          <p>test -- 1</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <div class="block">
            <p>组件值：{{ year.start }}-{{year.end}}</p>
            <el-date-picker
              v-model="year.start"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
              :picker-options="pickerOptionsStart"
              ></el-date-picker>-
              <el-date-picker
              v-model="year.end"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
              :picker-options="pickerOptionsEnd"
              ></el-date-picker>
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
      // 选择日
      pickerOptions0: {
        disabledDate(time) {
          // 禁选今天以后的时间
          return time.getTime() > Date.now();
        }
      },
      pickerOptions1: {
        // 快捷选项
        shortcuts: [
          {
            text: "今天",
            // 选中后的回调
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value0: "",
      value1: "",
      value2: "",

      // 其他日期单位
      value3: "",
      value4: "",
      value5: "",
      value6: "",

      // 选择日期范围
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              // 数组
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value7: "",
      value8: "",
      value9: "",

      // 日期格式
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      value14: "",

      // 默认显示日期
      value15: "",

      // test -- 1
      year: {
        start: "",
        end: ""
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let end = this.year.end;
          if (end) {
            return time.getFullYear() >= end;
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let start = this.year.start;
          if (start) {
            return time.getFullYear() <= start;
          }
        }
      }
    };
  },
  props: "",
  components: {},
  computed: {},
  watch: {},
  methods: {},
  beforeCreated() {},
  created() {},
  mounted() {}
};
</script>

<style></style>
<style scoped lang="less">
.item-demo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .block {
    margin-right: 30px;
    margin-bottom: 30px;
  }
}
</style>
