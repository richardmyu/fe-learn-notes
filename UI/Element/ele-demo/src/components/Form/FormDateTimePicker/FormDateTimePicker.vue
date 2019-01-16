<template>
  <div class="container">
    <div class="container-title">
      <h1>DateTimePicker 日期时间选择器</h1>
      <p>DateTimePicker 由 DatePicker 和 TimePicker 派生，Picker Options 或者其他选项可以参照 DatePicker 和 TimePicker。</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>日期和时间点</h3>
          <p></p>
          <p>注释：通过设置 type 属性为 datetime，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">设置默认时间</span>
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>日期和时间范围</h3>
          <p></p>
          <p>注释：设置 type 为 datetimerange 即可选择日期和时间范围</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="value4"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
              v-model="value5"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </div>

        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>默认的起始与结束时刻</h3>
          <p></p>
          <p>注释：使用 datetimerange 进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的 00:00:00 作为起始与结束的时刻；通过选项 default-time 可以控制选中起始与结束日期时所使用的具体时刻。default-time 接受一个数组，数组每项值为字符串，形如 12:00:00，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。</p>
        </div>
        <div class="item-demo">

          <div class="block">
            <span class="demonstration">起始日期时刻为 12:00:00</span>
            <el-date-picker
              v-model="value6"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>
            <el-date-picker
              v-model="value7"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
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
      // 日期和时间点
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
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
      value1: "",
      value2: "",
      value3: "",

      // 日期和时间范围
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: "",

      // 默认的起始与结束时刻
      value6: "",
      value7: ""
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
