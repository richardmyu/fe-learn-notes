<template>
	<div class="">
		{{name}}
		<br>
		<button @click="handleChange">change me</button>
		<br>
		<!-- {{slotDefault}} -->
		<VNodes :vnodes="slotDefault"></VNodes>
		<br>
		<VNodes :vnodes="slotTitle"></VNodes>
		<br>
		<VNodes :vnodes="slotScopeItem({value:'vue'})"></VNodes>
	</div>
</template>

<script>
export default {
  name: "DemoBigProps",
  components: {
    // VNodes
    VNodes: {
      functional: true,
      render: (h, ctx) => {
        console.log(ctx);
        console.log(ctx.props);
        return ctx.props.vnodes;
      }
    }
  },
  props: {
    name: String,
    onChange: {
      type: Function,
      default: () => {}
    },
    slotDefault: Array,
    slotTitle: Array,
    slotScopeItem: {
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
    handleChange() {
      this.onChange(
        this.name === "Hello world!" ? "Hello vue!" : "Hello world!"
      );
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>
