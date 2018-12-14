<template>
  <div class="container">
    <div class="title">
      <h1>Element UI</h1>
    </div>

    <div class="content">
      <section class="item">
      <div class="item_title">Basic</div>
      <ul class="item_content">
        <li><router-link to="/BasicButton" >Button</router-link></li>
        <li><router-link to="/BasicColor" >Color</router-link></li>
        <li><router-link to="/BasicContainer" >Container</router-link></li>
        <li><router-link to="/BasicIcon" >Icon</router-link></li>
        <li><router-link to="/BasicLayout" >Layout</router-link></li>
        <li><router-link to="/BasicTypography" >Typography</router-link></li>
      </ul>
    </section>

    <section class="item">
      <div class="item_title">Date</div>
      <ul class="item_content">
        <li><router-link to="/DateProgress" >Progress</router-link></li>
        <li><router-link to="/DateTable" >Table</router-link></li>
        <li><router-link to="/DateTag" >Tag</router-link></li>
        <li><router-link to="/DateTree" >Tree</router-link></li>
      </ul>
    </section>

    <section class="item">
      <div class="item_title">Form</div>
      <ul class="item_content">
        <li><router-link to="/Form" >Form</router-link></li>
        <li><router-link to="/FormCheckbox" >Checkbox</router-link></li>
        <li><router-link to="/FormColorPicker" >ColorPicker</router-link></li>
        <li><router-link to="/FormDatePicker" >DatePicker</router-link></li>
        <li><router-link to="/FormDateTimePicker" >DateTimePicker</router-link></li>
        <li><router-link to="/FormInput" >Input</router-link></li>
        <li><router-link to="/FormInputNumber" >InputNumber</router-link></li>
        <li><router-link to="/FormRadio" >Radio</router-link></li>
        <li><router-link to="/FormRate" >Rate</router-link></li>
        <li><router-link to="/FormSelect" >Select</router-link></li>
        <li><router-link to="/FormSlider" >Slider</router-link></li>
        <li><router-link to="/FormSwitch" >Switch</router-link></li>
        <li><router-link to="/FormTimePicker" >TimePicker</router-link></li>
        <li><router-link to="/FormTransfer" >Transfer</router-link></li>
        <li><router-link to="/FormUpload" >Upload</router-link></li>
        <li><router-link to="/FormCascader" >Cascader</router-link></li>
      </ul>
    </section>

    <section class="item">
      <div class="item_title">Navigation</div>
      <ul class="item_content">
        <li><router-link to="/NavigationBreadcrumb" >Breadcrumb</router-link></li>
        <li><router-link to="/NavigationDropdown" >Dropdown</router-link></li>
        <li><router-link to="/NavigationNavMenu" >NavMenu</router-link></li>
        <li><router-link to="/NavigationSteps" >Steps</router-link></li>
        <li><router-link to="/NavigationTabs" >Tabs</router-link></li>
      </ul>
    </section>

    <section class="item">
      <div class="item_title">Notice</div>
      <ul class="item_content">
        <li><router-link to="/NoticeAlert" >Alert</router-link></li>
        <li><router-link to="/NoticeLoading" >Loading</router-link></li>
        <li><router-link to="/NoticeMessage" >Message</router-link></li>
        <li><router-link to="/NoticeMessageBox" >MessageBox</router-link></li>
        <li><router-link to="/NoticeNotification" >Notification</router-link></li>
      </ul>
    </section>

    <section class="item">
      <div class="item_title">Others</div>
      <ul class="item_content">
        <li><router-link to="/OthersCard" >Card</router-link></li>
        <li><router-link to="/OthersCarousel" >Carousel</router-link></li>
        <li><router-link to="/OthersCollapse" >Collapse</router-link></li>
        <li><router-link to="/OthersDialog" >Dialog</router-link></li>
        <li><router-link to="/OthersPopover" >Popover</router-link></li>
        <li><router-link to="/OthersTooltip" >Tooltip</router-link></li>
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
  beforeCreated() {},
  created() {},
  mounted() {}
};
</script>

<style></style>
<style scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 200px;
  font-size: 20px;
  text-align: center;
}

.title h1 {
  margin-bottom: 60px;
  font-size: 52px;
  text-align: center;
}

.content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
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
  padding-left: 30px;
}

.item .item_content li {
  margin-bottom: 20px;
}
</style>
