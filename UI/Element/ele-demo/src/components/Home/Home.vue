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
            <router-link to="/button">Button</router-link>
          </li>
          <li>
            <router-link to="/color">Color</router-link>
          </li>
          <li>
            <router-link to="/container">Container</router-link>
          </li>
          <li>
            <router-link to="/icon">Icon</router-link>
          </li>
          <li>
            <router-link to="/layout">Layout</router-link>
          </li>
          <li>
            <router-link to="/typography">Typography</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Date</div>
        <ul class="item_content">
          <li>
            <router-link to="/progress">Progress</router-link>
          </li>
          <li>
            <router-link to="/table">Table</router-link>
          </li>
          <li>
            <router-link to="/tag">Tag</router-link>
          </li>
          <li>
            <router-link to="/tree">Tree</router-link>
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
            <router-link to="/cascader">Cascader</router-link>
          </li>
          <li>
            <router-link to="/checkbox">Checkbox</router-link>
          </li>
          <li>
            <router-link to="/colorPicker">ColorPicker</router-link>
          </li>
          <li>
            <router-link to="/datePicker">DatePicker</router-link>
          </li>
          <li>
            <router-link to="/dateTimePicker">DateTimePicker</router-link>
          </li>
          <li>
            <router-link to="/input">Input</router-link>
          </li>
          <li>
            <router-link to="/inputNumber">InputNumber</router-link>
          </li>
          <li>
            <router-link to="/radio">Radio</router-link>
          </li>
          <li>
            <router-link to="/rate">Rate</router-link>
          </li>
          <li>
            <router-link to="/select">Select</router-link>
          </li>
          <li>
            <router-link to="/slider">Slider</router-link>
          </li>
          <li>
            <router-link to="/switch">Switch</router-link>
          </li>
          <li>
            <router-link to="/timePicker">TimePicker</router-link>
          </li>
          <li>
            <router-link to="/transfer">Transfer</router-link>
          </li>
          <li>
            <router-link to="/upload">Upload</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Navigation</div>
        <ul class="item_content">
          <li>
            <router-link to="/breadcrumb">Breadcrumb</router-link>
          </li>
          <li>
            <router-link to="/dropdown">Dropdown</router-link>
          </li>
          <li>
            <router-link to="/navMenu">NavMenu</router-link>
          </li>
          <li>
            <router-link to="/steps">Steps</router-link>
          </li>
          <li>
            <router-link to="/tabs">Tabs</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Notice</div>
        <ul class="item_content">
          <li>
            <router-link to="/alert">Alert</router-link>
          </li>
          <li>
            <router-link to="/loading">Loading</router-link>
          </li>
          <li>
            <router-link to="/message">Message</router-link>
          </li>
          <li>
            <router-link to="/messageBox">MessageBox</router-link>
          </li>
          <li>
            <router-link to="/notification">Notification</router-link>
          </li>
        </ul>
      </section>

      <section class="item">
        <div class="item_title">Others</div>
        <ul class="item_content">
          <li>
            <router-link to="/card">Card</router-link>
          </li>
          <li>
            <router-link to="/carousel">Carousel</router-link>
          </li>
          <li>
            <router-link to="/collapse">Collapse</router-link>
          </li>
          <li>
            <router-link to="/dialog">Dialog</router-link>
          </li>
          <li>
            <router-link to="/popover">Popover</router-link>
          </li>
          <li>
            <router-link to="/tooltip">Tooltip</router-link>
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
