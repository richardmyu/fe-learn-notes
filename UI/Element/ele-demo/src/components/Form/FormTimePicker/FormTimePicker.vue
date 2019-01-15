<template>
  <div class="container">
    <div class="container-title">
      <h1>TimePicker 时间选择器</h1>
      <p>用于选择或输入日期</p>
    </div>
    <div class="container-content">
      <section class="content-item">
        <div class="item-title">
          <h3>固定时间点</h3>
          <p>提供几个固定的时间点供用户选择</p>
          <p>注释：使用 el-time-select 标签，分别通过star、end和step指定可选的起始时间、结束时间和步长</p>
        </div>
        <div class="item-demo">
          <el-time-select
            v-model="value1"
            :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '18:30'
            }"
            placeholder="选择时间">
          </el-time-select>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>任意时间点</h3>
          <p>可以选择任意时间</p>
          <p>注释：使用 el-time-picker 标签，通过selectableRange限制可选时间范围。提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开arrow-control属性则通过界面上的箭头进行选择。</p>
        </div>
        <div class="item-demo">
          <el-time-picker
            v-model="value2"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="任意时间点">
          </el-time-picker>
          <el-time-picker
            arrow-control
            v-model="value3"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="任意时间点">
          </el-time-picker>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>固定时间范围</h3>
          <p>若先选择开始时间，则结束时间内备选项的状态会随之改变</p>
          <p>注释：</p>
        </div>
        <div class="item-demo">
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }">
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime
            }">
          </el-time-select>
        </div>
      </section>

      <section class="content-item">
        <div class="item-title">
          <h3>任意时间范围</h3>
          <p>可选择任意的时间范围</p>
          <p>注释：添加is-range属性即可选择时间范围，同样支持arrow-control属性。</p>
        </div>
        <div class="item-demo">
          <el-time-picker
            is-range
            v-model="value4"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          <el-time-picker
            is-range
            arrow-control
            v-model="value5"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
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
      // 固定时间点
      value1: "",
      // 任意时间点(默认时间)
      value2: new Date(2016, 9, 10, 18, 40),
      value3: new Date(),
      // 固定时间范围
      startTime: "",
      endTime: "",
      // 任意时间范围
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
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
<style scoped lang="less"></style>
