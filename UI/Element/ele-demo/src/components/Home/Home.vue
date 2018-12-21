<template>
  <div class="container">
    <div class="title">
      <h1>Element UI</h1>
    </div>

    <div class="content">
      <section class="item">
        <div class="item_title">Transition</div>
        <ul class="item_content">
          <li>
            <router-link to="/transition">Transition</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Basic</div>
        <ul class="item_content">
          <li>
            <router-link to="/basic/button">Button</router-link>
          </li>
          <li>
            <router-link to="/basic/color">Color</router-link>
          </li>
          <li>
            <router-link to="/basic/container">Container</router-link>
          </li>
          <li>
            <router-link to="/basic/icon">Icon</router-link>
          </li>
          <li>
            <router-link to="/basic/layout">Layout</router-link>
          </li>
          <li>
            <router-link to="/basic/typography">Typography</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Date</div>
        <ul class="item_content">
          <li>
            <router-link to="/date/progress">Progress</router-link>
          </li>
          <li>
            <router-link to="/date/table">Table</router-link>
          </li>
          <li>
            <router-link to="/date/tag">Tag</router-link>
          </li>
          <li>
            <router-link to="/date/tree">Tree</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Form</div>
        <ul class="item_content">
          <li>
            <router-link to="/form">Form</router-link>
          </li>
          <li>
            <router-link to="/form/cascader">Cascader</router-link>
          </li>
          <li>
            <router-link to="/form/checkbox">Checkbox</router-link>
          </li>
          <li>
            <router-link to="/form/colorPicker">ColorPicker</router-link>
          </li>
          <li>
            <router-link to="/form/datePicker">DatePicker</router-link>
          </li>
          <li>
            <router-link to="/form/dateTimePicker">DateTimePicker</router-link>
          </li>
          <li>
            <router-link to="/form/input">Input</router-link>
          </li>
          <li>
            <router-link to="/form/inputNumber">InputNumber</router-link>
          </li>
          <li>
            <router-link to="/form/radio">Radio</router-link>
          </li>
          <li>
            <router-link to="/form/rate">Rate</router-link>
          </li>
          <li>
            <router-link to="/form/select">Select</router-link>
          </li>
          <li>
            <router-link to="/form/slider">Slider</router-link>
          </li>
          <li>
            <router-link to="/form/switch">Switch</router-link>
          </li>
          <li>
            <router-link to="/form/timePicker">TimePicker</router-link>
          </li>
          <li>
            <router-link to="/form/transfer">Transfer</router-link>
          </li>
          <li>
            <router-link to="/form/upload">Upload</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Navigation</div>
        <ul class="item_content">
          <li>
            <router-link to="/navigation/breadcrumb">Breadcrumb</router-link>
          </li>
          <li>
            <router-link to="/navigation/dropdown">Dropdown</router-link>
          </li>
          <li>
            <router-link to="/navigation/navMenu">NavMenu</router-link>
          </li>
          <li>
            <router-link to="/navigation/steps">Steps</router-link>
          </li>
          <li>
            <router-link to="/navigation/tabs">Tabs</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Notice</div>
        <ul class="item_content">
          <li>
            <router-link to="/notice/alert">Alert</router-link>
          </li>
          <li>
            <router-link to="/notice/loading">Loading</router-link>
          </li>
          <li>
            <router-link to="/notice/message">Message</router-link>
          </li>
          <li>
            <router-link to="/notice/messageBox">MessageBox</router-link>
          </li>
          <li>
            <router-link to="/notice/notification">Notification</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Others</div>
        <ul class="item_content">
          <li>
            <router-link to="/other/card">Card</router-link>
          </li>
          <li>
            <router-link to="/other/carousel">Carousel</router-link>
          </li>
          <li>
            <router-link to="/other/collapse">Collapse</router-link>
          </li>
          <li>
            <router-link to="/other/dialog">Dialog</router-link>
          </li>
          <li>
            <router-link to="/other/popover">Popover</router-link>
          </li>
          <li>
            <router-link to="/other/tooltip">Tooltip</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "home",
  data() {
    return {};
  },
  props: "",
  components: {},
  computed: {},
  watch: {},
  methods: {},
  beforeCreated() { },
  created() { },
  mounted() { }
};
</script>

<style></style>
<style scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 200px;
  font-size: 20px;
}

.title h1 {
  margin-bottom: 60px;
  font-size: 52px;
  text-align: center;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}

.item {
  width: 50%;
  margin-bottom: 40px;
}

.item .item_title {
  font-size: 30px;
  margin-bottom: 20px;
}

.item .item_content {
  padding-left: 40px;
}

.item .item_content li {
  margin-bottom: 20px;
}
</style>
