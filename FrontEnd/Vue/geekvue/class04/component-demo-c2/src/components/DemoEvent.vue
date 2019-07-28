<template>
	<div class="">
		name:{{name||"--"}}
		<br>
		<input type="text" :value="name" @change="handleChange">
		<br>
		<br>
		<div @click="handleDivClick">
			<button @click="handleClick">重置成功</button>&nbsp;&nbsp;&nbsp;
			<button @click.stop="handleClick">重置失败</button>
		</div>
	</div>
</template>

<script>
export default {
  name: "DemoEvent",
  components: {},
  props: {
    name: String
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    handleChange(e) {
      // console.log("event-change", e.target.value);
      this.$emit("change", e.target.value);
    },
    handleDivClick() {
      // console.log("event-reset", this.name);
      this.$emit("change", "");
    },
    handleClick(e) {
			// 都会失败
			// .stop ===
			// e.stopPropagation()
			// console.log(this.name);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
