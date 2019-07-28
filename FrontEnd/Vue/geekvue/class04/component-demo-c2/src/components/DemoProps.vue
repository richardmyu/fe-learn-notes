<template>
	<div class="">
		name:{{name}}
		<br>
		type:{{type}}
		<br>
		list:{{list}}
		<br>
		isVisible:{{isVisible}}
		<br>
		<button @click="handleClick">change type</button>
	</div>
</template>

<script>
export default {
  name: "DemoProps",
  // inheritAttrs: false,
  // props: ["name", "type", "list", "isVisible"],
  components: {},
  props: {
    name: String,
    type: {
      validator: function(value) {
        // console.log("type-value-validator", value);
        // 这个值必须匹配下列字符串中的一个
        return ["success", "warning", "danger"].includes(value);
      }
    },
    list: {
      type: Array,
      default: () => []
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleClick() {
      // this.type="warning";
      console.log("type-value-click", this.type);
      // 传值 --》onChange
      // this.onChange(this.type === "success" ? "warning" : "success");

      // this.emit
      this.$emit("changeType", this.type === "success" ? "warning" : "success");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
